const MON=/monitorb/i.test(location.pathname)?'B':'A',ID=Math.random().toString(36).slice(2);
let C,D,S=1,st;
const mk=(t,c,p,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;if(p)p.append(e);return e};
const pos=(e,r)=>Object.assign(e.style,{left:r.x+'px',top:r.y+'px',width:r.w+'px',height:r.h+'px'});
const save=()=>fetch('/api/data',{method:'POST',body:JSON.stringify({from:ID,data:D})});
let dt;const dsave=()=>{clearTimeout(dt);dt=setTimeout(save,500)};
function place(e,r){
 if(!r.quad)return pos(e,r);
 const w=r.w,h=r.h,src=[[0,0],[w,0],[w,h],[0,h]],A=[],B=[];
 src.forEach(([x,y],i)=>{const[u,v]=r.quad[i];A.push([x,y,1,0,0,0,-x*u,-y*u],[0,0,0,x,y,1,-x*v,-y*v]);B.push(u,v)});
 for(let i=0;i<8;i++){let p=i;for(let k=i+1;k<8;k++)if(Math.abs(A[k][i])>Math.abs(A[p][i]))p=k;[A[i],A[p]]=[A[p],A[i]];[B[i],B[p]]=[B[p],B[i]];
  for(let k=i+1;k<8;k++){const f=A[k][i]/A[i][i];for(let c=i;c<8;c++)A[k][c]-=f*A[i][c];B[k]-=f*B[i]}}
 const H=[];for(let i=7;i>=0;i--){let t=B[i];for(let c=i+1;c<8;c++)t-=A[i][c]*H[c];H[i]=t/A[i][i]}
 const[a,b,c,d,e2,f,g,hh]=H;
 Object.assign(e.style,{left:0,top:0,width:w+'px',height:h+'px',transformOrigin:'0 0',transform:`matrix3d(${a},${d},0,${g},${b},${e2},0,${hh},0,0,1,0,${c},${f},0,1)`});
}
const p2=(n,l=2)=>String(n).padStart(l,'0');

(async()=>{
 C=await(await fetch('/config.json')).json();D=await(await fetch('/api/data')).json();
 await loadSpecial();setInterval(loadSpecial,216e5);
 st=document.getElementById('stage');const cvs=mk('canvas','',st);cvs.id='c';const ov=mk('img','',st);ov.id='ov';ov.src=C.overlay[MON];ov.onerror=()=>ov.remove();
 Scene.init(cvs,MON==='A'?1:0,C.width,C.height,C.renderScale||1,C.fps||30,C.morphMs||4500);
 document.addEventListener('pointerdown',e=>{if(!e.target.closest('.pop,.cb'))closePop()});
 const fit=()=>{S=Math.min(innerWidth/C.width,innerHeight/C.height);st.style.transform=`scale(${S})`};fit();onresize=fit;
 await Promise.race([weather(),new Promise(r=>setTimeout(r,3000))]);setInterval(weather,6e5);
 if(MON==='A'){buildRect();buildBoard();if(!D.codeFile)await setCode('index.html',await(await fetch('/index.html')).text());runBoard()}

 renderNotes();
 new EventSource('/api/events').onmessage=e=>{const m=JSON.parse(e.data);if(m.from===ID)return;D=m.data;renderNotes();if(MON==='A')runBoard()};
 requestAnimationFrame(tick);
})();

/* ---------- rectangle (monitor A) ---------- */
const STATES=[['morning','🌅','Morning'],['noon','☀️','Noon'],['afternoon','🌤️','Afternoon'],['evening','🌇','Evening'],['night','🌙','Night'],['midnight','🕛','Midnight'],['dawn','🌄','Dawn'],['dusk','🌆','Dusk'],['rainy','🌧️','Rainy'],['rainbow','🌈','Rainbow'],['thunderstorm','⛈️','Thunderstorm'],['snowy','❄️','Snowy'],['foggy','🌫️','Foggy'],['overcast','☁️','Overcast'],['aurora','🌌','Aurora'],['meteor_shower','☄️','Meteor Shower'],['blood_moon','🩸','Blood Moon'],['solar','🌘','Solar Eclipse'],['autumn_wind','🍂','Autumn Wind'],['cherry_blossom','🌸','Cherry Blossom']];
let sub,resetBtn;
const markState=()=>{if(!sub)return;sub.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x.dataset.k===cur));resetBtn.classList.toggle('on',!D.override)};
let R,bigEl,titleEl,rowsEl,form,fm=null,codeBtn;
function buildRect(){
 const q=C.layout.A.rect;R=mk('div','rect',st);place(R,q);
 const disp=mk('div','disp',R);titleEl=mk('div','ttl',disp);rowsEl=mk('div','rows',disp);bigEl=disp;form=mk('div','form',R);
 const m=mk('div','menu',R);
 const b=(ic,t,f,cls)=>{const x=mk('button',cls||'',m,ic);x.title=t;x.onclick=f;return x},dv=()=>mk('div','dv',m);
 b('🕒','Clock',()=>{D.mode='clock';save()});
 b('⏳','Countdown',()=>{D.mode='countdown';save()});
 dv();
 b('➕','New event',()=>{fm='new';renderForm()});
 b('✏️','Rename event',()=>{if(D.event){fm='rename';renderForm()}});
 b('✖','Cancel event',()=>{D.event=null;save()},'danger');
 dv();
 b('📄','Load local file',()=>fi.click());
 codeBtn=b('🐙','Load code from GitHub',()=>{fm='github';renderForm()});
 dv();
 b('📝','Add note',()=>{D.notes.push({id:ID+Date.now(),x:300,y:600,w:400,h:260,text:'Note',bg:DEF.bg,fg:DEF.fg,fs:28});renderNotes();save()});
dv();
 sub=mk('div','sub',R);
 STATES.forEach(([k,ic,nm])=>{const x=mk('button','',sub,ic);x.title=nm;x.dataset.k=k;x.onclick=()=>{D.override=k;sub.classList.remove('open');markState();save()}});
 b('🎛️','Change state',()=>sub.classList.toggle('open'));
 resetBtn=b('🔄','Reset to auto',()=>{D.override=null;sub.classList.remove('open');markState();save()});
 const fi=mk('input','',R);fi.type='file';fi.hidden=true;
 fi.onchange=async()=>{const f=fi.files[0];if(f)await setCode(f.name,await f.text(),'local file: '+f.name);fi.value=''};
}
function renderForm(){
 form.innerHTML='';bigEl.style.display=fm?'none':'';if(!fm)return;
 if(fm==='github'){
  const u=mk('input','',form),msg=mk('div','msg',form);u.placeholder='GitHub file URL';
  mk('button','',form,'Load').onclick=async()=>{try{msg.textContent='Loading…';
   const raw=u.value.trim().replace('https://github.com/','https://raw.githubusercontent.com/').replace('/blob/','/'),r=await fetch(raw);if(!r.ok)throw new Error('HTTP '+r.status);
   await setCode(raw.split('?')[0].split('/').pop(),await r.text(),raw);fm=null;renderForm()}catch(e){msg.textContent='Failed: '+e.message}};
  mk('button','',form,'Back').onclick=()=>{fm=null;renderForm()};return}
 const t=mk('input','',form),d=mk('input','',form);t.placeholder='Event title';t.value=D.event?.title||'';d.type='datetime-local';d.value=D.event?.at||'';
 if(fm==='rename')d.style.display='none';
 mk('button','',form,'Save').onclick=()=>{if(!t.value)return;if(fm==='new'){if(!d.value)return;D.event={title:t.value,at:d.value}}else D.event.title=t.value;D.mode='countdown';fm=null;renderForm();save()};
 mk('button','',form,'Back').onclick=()=>{fm=null;renderForm()};
}
function tick(ts){
 const n=new Date();
 if(MON==='A'&&rowsEl&&!fm){
  let t,r;
  if(D.mode==='countdown'){
   if(!D.event){t='No event';r=[]}
   else{const d=new Date(D.event.at)-n;t=D.event.title;
    r=d<=0?[['Reached!','']]:[[Math.floor(d/864e5),'days'],[p2(Math.floor(d/36e5)%24),'hours'],[p2(Math.floor(d/6e4)%60),'min'],[p2(Math.floor(d/1e3)%60),'sec'],[p2(d%1000,3),'ms']]}
  }else{t=n.toLocaleDateString('en-GB');r=[[p2(n.getHours()),'hours'],[p2(n.getMinutes()),'min'],[p2(n.getSeconds()),'sec'],[p2(n.getMilliseconds(),3),'ms']]}
  titleEl.textContent=t;rowsEl.innerHTML=r.map(([v,l])=>`<div class="row"><b>${v}</b><i>${l}</i></div>`).join('');
 }
 if(n-lastV>1000){lastV=+n;const v=D.override||variant(n);if(v!==cur){first?Scene.set(v):Scene.goto(v);first=false;cur=v}markState()}
 Scene.frame(ts);
 requestAnimationFrame(tick);
}

/* ---------- code board ---------- */
const COL={cm:'#5c6370',st:'#98c379',nu:'#d19a66',tg:'#e06c75',kw:'#c678dd',fn:'#61afef',at:'#d19a66',pr:'#e06c75',id:'#abb2bf',pu:'#abb2bf'};
const EXT='html htm xml svg js mjs ts jsx tsx css json py sh rb php java c h cpp cs go rs yml yaml'.split(' ');
const KW=/^(?:function|const|let|var|return|if|else|for|while|class|import|export|from|new|this|async|await|def|self|None|True|False|true|false|null|undefined|try|catch|throw|switch|case|break|continue|public|private|static|void|int|string|using|namespace|in|of|typeof|extends|do|default|elif|except|finally|lambda|with|as|pass|raise|yield|package|func|fn|struct|enum|interface|type)\b/;
function tokenize(text,ext){
 const mu=/^(html|htm|xml|svg)$/.test(ext),hs=/^(py|sh|rb|yml|yaml)$/.test(ext);
 const rules=[['cm',hs?/^#.*/:/^(?:\/\/.*|<!--.*?-->|\/\*.*?\*\/)/],['st',/^(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)/],['nu',/^\b\d[\d.]*\b/]];
 if(mu)rules.push(['tg',/^<\/?[A-Za-z!][\w-]*|^\/?>/],['at',/^[A-Za-z-]+(?==)/]);
 rules.push(['kw',KW],['fn',/^[A-Za-z_$][\w$]*(?=\()/],['pr',/^[A-Za-z-]+(?=\s*:)/],['id',/^[A-Za-z_$][\w$]*/],['pu',/^[{}()\[\];,.:=<>+\-*\/!&|?]+/],['ws',/^\s+/]);
 return text.split(/\r?\n/).map(s=>{const o=[];while(s){let m,k;for(const[kk,re]of rules)if(m=re.exec(s)){k=kk;break}if(!m){m=[s[0]];k='id'}o.push([m[0],COL[k]||null]);s=s.slice(m[0].length)}return o});
}
async function setCode(name,text,src){
 const ext=name.split('.').pop().toLowerCase(),ok=EXT.includes(ext);
 if(!ok)console.warn(`No syntax rules for .${ext}: showing all green`);
 D.codeFile={name,source:src||'page default',text,fallback:!ok,lines:ok?tokenize(text,ext):text.split(/\r?\n/).map(l=>[[l,'#98c379']])};
 save();if(bd)runBoard();
}
let bd,cd,raf;
function buildBoard(){bd=mk('div','',st);bd.id='board';place(bd,C.layout.A.board);cd=mk('div','',bd);cd.id='code'}
function runBoard(){
 cancelAnimationFrame(raf);cd.innerHTML='';const cf=D.codeFile;
 codeBtn.title=`Load from GitHub (current: ${cf?cf.name:'none'}${cf?.fallback?' ⚠ plain green':''})`;
 (cf?.lines||[]).forEach(l=>{const d=mk('div','',cd);l.forEach(([t,c])=>{const s=mk('span','',d);s.textContent=t;s.style.color=c||COL.id})});
 cd.style.fontSize=C.board.fontSize+'px';
 const H=bd.clientHeight,tot=cd.scrollHeight;let y=H,last=performance.now(),wait=0;
 const f=ts=>{const dt=Math.min((ts-last)/1000,.1);last=ts;
  if(wait>0){wait-=dt*1000;if(wait<=0)y=H}else{y-=C.board.speed*dt;if(y<=-tot)wait=C.board.loopDelayMs}
  cd.style.transform=`translateY(${y}px)`;raf=requestAnimationFrame(f)};
 raf=requestAnimationFrame(f);
}

async function loadSpecial(){try{const s=await(await fetch('/api/special')).json();C.events.solar=[...new Set([...(C.events.solar||[]),...s.solar])]}catch{}}
let cur,lastV=0,W=null,first=true;
async function weather(){try{W=await(await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${C.lat}&longitude=${C.lon}&current=weather_code,wind_speed_10m,cloud_cover&hourly=precipitation&past_hours=3&forecast_hours=1&daily=sunrise,sunset&forecast_days=1&timezone=auto`)).json()}catch{}}
function variant(n){
 const ymd=`${n.getFullYear()}-${p2(n.getMonth()+1)}-${p2(n.getDate())}`,md=ymd.slice(5),mo=n.getMonth(),h=n.getHours()+n.getMinutes()/60;
 const rise=W?.daily?new Date(W.daily.sunrise[0]):new Date(n.getFullYear(),mo,n.getDate(),6),set=W?.daily?new Date(W.daily.sunset[0]):new Date(n.getFullYear(),mo,n.getDate(),18),M=6e4;
 const night=n<rise-45*M||n>set+45*M,E=C.events;
 let hs=0;for(const c of ymd)hs=(hs*31+c.charCodeAt(0))>>>0;
 const wc=W?.current?.weather_code??0,wind=W?.current?.wind_speed_10m||0,cloud=W?.current?.cloud_cover||0;
 const recent=(W?.hourly?.precipitation||[]).slice(0,3).reduce((a,b)=>a+(b||0),0)>.1;
 // 1) special
 if(!night&&E.solar.includes(ymd))return'solar';
 if(night&&E.bloodMoon.includes(ymd))return'blood_moon';
 if(night&&E.eclipse.includes(ymd))return'eclipse';
 if(night&&E.meteor.includes(md))return'meteor_shower';
 if(night&&hs%100===0)return'aurora';
 if(!night&&(mo===9||mo===10)&&wind>=30)return'autumn_wind';
 if(!night&&(mo===2&&n.getDate()>=15||mo===3&&n.getDate()<=15))return'cherry_blossom';
 // 2) weather
 if(wc>=95)return'thunderstorm';
 if([71,73,75,77,85,86].includes(wc))return'snowy';
 if(wc>=51&&wc<=67||wc>=80&&wc<=82)return'rainy';
 if(wc===45||wc===48)return'foggy';
 if(!night&&wc<=3&&recent&&cloud<90)return'rainbow';
 if(wc===3||cloud>=90)return'overcast';
 // 3) time of day
 if(n>=rise-45*M&&n<rise)return'dawn';
 if(n>=rise&&h<11)return'morning';
 if(h>=11&&h<14&&n<set)return'noon';
 if(h>=14&&n<set-60*M)return'afternoon';
 if(n>=set-60*M&&n<set)return'evening';
 if(n>=set&&n<=set+45*M)return'dusk';
 return h<3?'midnight':'night';
}

const PAL={Red:'#e53935',Orange:'#fb8c00',Yellow:'#fdd835',Green:'#43a047',Cyan:'#00acc1',Blue:'#1e88e5',Purple:'#8e24aa',Pink:'#ec407a',Black:'#111111',White:'#ffffff'},DEF={bg:'#fff59d',fg:'#222222'};
/* ---------- notes (global space 7680x2160) ---------- */
const closePop=()=>document.querySelectorAll('.pop').forEach(p=>p.remove());
function renderNotes(){
 closePop();
 if(document.activeElement?.classList.contains('nb'))return;
 document.querySelectorAll('.note').forEach(e=>e.remove());
 const off=MON==='B'?C.width:0;
 D.notes.forEach(n=>{
  const e=mk('div','note',st),bar=mk('div','bar',e),body=mk('div','nb',e);
  const sty=()=>{e.style.cssText=`left:${n.x-off}px;top:${n.y}px;width:${n.w}px;height:${n.h}px;background:${n.bg};color:${n.fg}`;body.style.fontSize=n.fs+'px'};sty();
  body.contentEditable=true;body.textContent=n.text;body.oninput=()=>{n.text=body.innerText;dsave()};body.onblur=save;
  const btn=(t,f)=>{mk('button','',bar,t).onclick=f},col=k=>{const bt=mk('button','cb',bar,`<span>${k==='bg'?'Bg':'Aa'}</span><i></i>`),dot=bt.querySelector('i');dot.style.background=n[k];bt.title=k==='bg'?'Background colour':'Text colour';
   bt.onclick=ev=>{ev.stopPropagation();const same=document.querySelector('.pop')?._for===bt;closePop();if(same)return;
    const p=mk('div','pop',st),r=bt.getBoundingClientRect();p._for=bt;p.style.left=r.left/S+'px';p.style.top=r.bottom/S+6+'px';
    [['Default',DEF[k]],...Object.entries(PAL)].forEach(([nm,h])=>{const d=mk('i',n[k]===h?'on':'',p);d.style.background=h;d.title=nm;d.onclick=()=>{n[k]=h;sty();dot.style.background=h;closePop();save()}})}}
  mk('span','grip',bar,'⠿');col('bg');col('fg');
  btn('A−',()=>{n.fs=Math.max(8,n.fs-2);sty();save()});btn('A+',()=>{n.fs+=2;sty();save()});
  btn('⧉',()=>{D.notes.push({...n,id:ID+Date.now(),x:n.x+40,y:n.y+40});renderNotes();save()});
  btn('⇄',()=>{n.x=n.x<C.width?n.x+C.width:n.x-C.width;renderNotes();save()});
  btn('🗑',()=>{D.notes=D.notes.filter(x=>x!==n);renderNotes();save()});
  bar.onpointerdown=ev=>{if(ev.target!==bar&&!ev.target.classList.contains('grip'))return;bar.setPointerCapture(ev.pointerId);const sx=n.x,sy=n.y,px=ev.clientX,py=ev.clientY;
   bar.onpointermove=m=>{n.x=sx+(m.clientX-px)/S;n.y=sy+(m.clientY-py)/S;sty()};bar.onpointerup=()=>{bar.onpointermove=bar.onpointerup=null;save()}};
  e.onmouseup=()=>{if(e.offsetWidth!==n.w||e.offsetHeight!==n.h){n.w=e.offsetWidth;n.h=e.offsetHeight;save()}};
 });
}
