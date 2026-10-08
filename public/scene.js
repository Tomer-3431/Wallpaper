/* Living scene: drawing code copied unchanged from living_wallpaper.html (data, geometry, window, monitors).
   Only the runtime (controls, localStorage, auto/tour modes) was replaced. */
const Scene=(()=>{
let cv,g;
const F='tint*,ta,k0*,k1*,k2*,k3*,su,sv,sa,sc*,mu,mv,ma,mf,mc*,st,ca,cc*,rn,sn,fg,fl,rb,au,me,la,lc*,hf*,hn*,gc*,ga,ac*'.split(',');
const R=(n,t,ta,sk,sun,moon,st,cl,wx,lf,h,lt,ac)=>{wx=wx||[];return[n,t,ta,...sk.split(' '),...(sun||[36,58,0,'#ffffff']),...(moon||[36,60,0,0,'#fff4cf']),st,...cl,wx[0]||0,wx[1]||0,wx[2]||0,wx[3]||0,wx[4]||0,wx[5]||0,wx[6]||0,...(lf||[0,'#e07a2a']),...h.split(' '),...lt,ac]};
const S=[
R('Morning','#ffe9a8',.16,'#6fb7ee #9fd2f4 #d6ecf7 #fff1c9',[14,33,1,'#fff3b0'],0,0,[.9,'#ffffff'],0,0,'#7ec27a #5fae5f',['#ffe9a8',.3],'#4a7de8'),
R('Noon','#ffffff',.1,'#2f86e0 #4a9be8 #7bbcf0 #b9dcf6',[47,10,1,'#fffbe3'],0,0,[.8,'#ffffff'],0,0,'#69b86a #4aa656',['#fff6d0',.34],'#3de6ff'),
R('Afternoon','#ffd27a',.17,'#4f9fe3 #7fb9ee #bfd9ef #f6e3b8',[58,25,1,'#ffe9a0'],0,0,[.9,'#fffaf0'],0,0,'#7bb866 #5fa356',['#ffd58a',.32],'#8fb0ff'),
R('Evening','#ff8a3a',.24,'#3d4f9a #8a5aa3 #e8776a #ffd98a',[56,39,1,'#ffd27a'],0,0,[.9,'#ffb28a'],0,0,'#8a5f7d #5a4568',['#ff9a4a',.34],'#ff9a6a'),
R('Night','#1d2a55',.42,'#0b1a3f #13285a #1b3470 #274786',0,[51,14,1,0,'#fff4cf'],.8,[.5,'#22386e'],0,0,'#1d3556 #162a46',['#9fb4ff',.12],'#9fd0ff'),
R('Midnight','#0b1230',.55,'#02040f #060b22 #0a1230 #101a40',0,[36,17,1,1,'#fffbe6'],1,[0,'#22386e'],0,0,'#10182e #0b1224',['#cfe0ff',.16],'#43ff9a'),
R('Dawn','#ff9fb5',.18,'#2a3a7a #6a5aa0 #c77ba0 #ffd199',[22,42,1,'#ffe1a8'],0,.25,[.8,'#f6a9b8'],0,0,'#6a6a98 #4f5a7c',['#ffb7a0',.26],'#ffb0c0'),
R('Dusk','#7b4fa0',.28,'#1f2a5e #3b3b7d #c86a8a #f29a6c',0,0,.4,[.7,'#6b4a8f'],0,0,'#4a3a6a #352a52',['#c9a0e8',.18],'#b080ff'),
R('Rainy','#5a6677',.28,'#5b6673 #76818e #97a2ae #b6bfc8',0,0,0,[1,'#4b5560'],[1],0,'#6e8a78 #587566',['#dfe8f2',.08],'#6dd0ff'),
R('Rainbow','#ffffff',.1,'#5fa8e6 #8cc4f0 #c4e0f5 #eef6fb',[60,11,1,'#fffbe0'],0,0,[.6,'#8091a6'],[0,0,0,0,1],0,'#6dc372 #4fb25d',['#fff0c0',.26],'#ffffff'),
R('Thunderstorm','#2f3548',.45,'#1a1f2b #2a3140 #3c4556 #566073',0,0,0,[1,'#232a36'],[1.4,0,0,1],0,'#3d4f4a #2f4039',['#dfe8ff',.07],'#ffd23f'),
R('Snowy','#dbe8f5',.28,'#aab6c4 #c5cfda #dfe6ee #f2f6fa',0,0,0,[.9,'#e9eef4'],[0,1],0,'#e6eef6 #f5f9fc',['#eaf4ff',.22],'#ff9a4a'),
R('Foggy','#cfd6dc',.35,'#c9d1d8 #d7dde2 #e4e8ec #eef0f2',[58,17,.5,'#fffaf0'],0,0,[.4,'#e4e8ec'],[0,0,1],0,'#aebbc2 #98a9ad',['#f2f4f6',.14],'#e8f0f0'),
R('Overcast','#8f98a3',.22,'#8d97a3 #a3acb6 #bcc4cc #d3d9de',0,0,0,[1,'#8d97a3'],0,0,'#7f9d85 #6a8c73',['#e6ebef',.1],'#dfe6f2'),
R('Aurora','#14304a',.4,'#030816 #061629 #0a2238 #0d2b3c',0,0,.9,[0,'#22386e'],[0,0,0,0,0,1],0,'#0f3a3e #0a2a30',['#3dffa2',.08],'#3dffa2'),
R('Meteor Shower','#121a3d',.5,'#05091d #0c1538 #16235a #24357a',0,0,1,[0,'#22386e'],[0,0,0,0,0,0,1],0,'#142446 #0f1c38',['#9fb4ff',.1],'#9fb8ff'),
R('Blood Moon','#3a0f14',.5,'#12040a #2a0a12 #4a1218 #7a2a1c',0,[38,22,1,1,'#c43a24'],.3,[.3,'#3a0f16'],0,0,'#2a0f14 #1d0a0e',['#ff5a3a',.12],'#ff5a3a'),
R('Solar Eclipse','#1a1a22',.45,'#0b1230 #1b2b5a #3a4d86 #e0a15a',[36,18,1,'#05060a'],0,.3,[0,'#22386e'],0,0,'#3a3a55 #25253f',['#ffffff',.04],'#cfd8ff'),
R('Autumn Wind','#ff9a3a',.14,'#7fb0d8 #a9c9dc #e8d9b8 #f6c98a',[52,18,1,'#ffe7a0'],0,0,[.8,'#fff8ee'],0,[1,'#e07a2a'],'#c58a3c #b2552a',['#ffb050',.28],'#ffb870'),
R('Cherry Blossom','#ffc0d4',.16,'#8fcdf0 #b6def4 #e4f1f6 #fbe9ef',[56,14,1,'#fff8d8'],0,0,[.8,'#ffffff'],0,[1,'#ffc6d9'],'#8fd08a #74c27a',['#ffd0dc',.28],'#ffc0d8')];
const hx=h=>[1,3,5].map(i=>parseInt(h.substr(i,2),16));
const vec=r=>{const v=[];F.forEach((f,i)=>{const a=r[i+1];f.endsWith('*')?v.push(...hx(a)):v.push(a)});return v};
const dec=v=>{const o={};let i=0;F.forEach(f=>{if(f.endsWith('*')){o[f.slice(0,-1)]=v.slice(i,i+3);i+=3}else o[f]=v[i++]});return o};
const V=S.map(vec),rgb=(c,a=1)=>`rgba(${c[0]|0},${c[1]|0},${c[2]|0},${a})`;
const mix=(a,b,t)=>a.map((v,i)=>v+(b[i]-v)*t),lum=c=>(c[0]+c[1]+c[2])/3,cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const rnd=s=>()=>(s=s*16807%2147483647)/2147483647;
// ---------- geometry ----------
const P=(a,b,h=0)=>[470+a-b,255+.214*a+.121*b-h];
const wy=(X,o)=>45+o*(1+.001019*(X-470)),bw=(X,o)=>45+o*(1+.000577*(470-X));
function pg(p,f,al,st){g.beginPath();p.forEach((q,i)=>i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1]));g.closePath();g.globalAlpha=al==null?1:al;g.fillStyle=f;g.fill();if(st){g.strokeStyle=st;g.stroke()}g.globalAlpha=1}
const qA=(a,b0,b1,h0,h1)=>[P(a,b0,h0),P(a,b1,h0),P(a,b1,h1),P(a,b0,h1)],qB=(b,a0,a1,h0,h1)=>[P(a0,b,h0),P(a1,b,h0),P(a1,b,h1),P(a0,b,h1)];
const box=(a0,a1,b0,b1,h0,h1,t,fa,fb)=>{pg(qB(b1,a0,a1,h0,h1),fb);pg(qA(a1,b0,b1,h0,h1),fa);pg([P(a0,b0,h1),P(a1,b0,h1),P(a1,b1,h1),P(a0,b1,h1)],t)};
const pane=(xl,xr,ot,ob,it,ib)=>[[xl,wy(xl,ot)+it],[xr,wy(xr,ot)+it],[xr,wy(xr,ob)-ib],[xl,wy(xl,ob)-ib]];
const PANES=[pane(539,573,70,100,3,2),pane(539,573,100,130,2,3),pane(577,611,70,100,3,2),pane(577,611,100,130,2,3)];
function room0(){ // walls + floor shared by both rooms
 pg([[-104,0],[470,0],[470,255],[-104,324.6]],'#e9dcc9');pg([[470,0],[681,0],[681,300.2],[470,255]],'#d6c7b3');pg([[467,0],[473,0],[473,255],[467,255]],'#c9b9a3');
 pg([[-104,316.6],[470,247],[470,255],[-104,324.6]],'#f3ebdc');pg([[470,247],[681,290.2],[681,300.2],[470,255]],'#e6dccb');
 const fl=[[-104,324.6],[470,255],[681,300.2],[681,441],[-104,441]];pg(fl,'#c8731f');
 g.save();g.beginPath();fl.forEach((q,i)=>i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1]));g.clip();
 const r=rnd(11),tn=['#c8731f','#c46e1b','#cb7823','#c06a1a','#c97520','#c3701d'];g.lineWidth=.45;
 for(let b=0;b<960;b+=30){let a=-r()*260;while(a<720){const a1=a+170+r()*130;pg([P(a,b),P(a1,b),P(a1,b+30),P(a,b+30)],tn[r()*6|0],1,'rgba(156,84,16,.4)');a=a1}}
 g.restore()}
function bedBase(){
 const A0=48,A1=162,B1=186;
 g.save();g.beginPath();[[-104,324.6],[470,255],[681,300.2],[681,441],[-104,441]].forEach((q,i)=>i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1]));g.clip();
 pg([P(A0,2),P(A1,2),P(A1,B1),P(A1-18,B1+45),P(A0-18,B1+45),P(A0-18,47)],'#5a2a0a',.38);g.restore();
 [[69.5,-.01642],[112.6,-.037],[154.9,-.06],[197.7,-.0815]].forEach(([y1,s],si)=>{const CT=['#ff4242','#1e9e1e','#2a82e8','#f7f3ea'],CF=['#a83030','#0b5e0b','#1f3fd1','#c4b8a6'];const yL=y1+s*(-82-355);
  pg([[-82,yL],[355,y1],[343,y1+22],[-94,yL+22]],'#6b5a45',.22);pg([[-82,yL],[-60,yL+4.7],[-60,yL+8.7],[-82,yL+4]],CF[si]);pg([[-60,yL+4.7],[377,y1+4.7],[377,y1+8.7],[-60,yL+8.7]],CF[si]);pg([[-82,yL],[355,y1],[377,y1+4.7],[-60,yL+4.7]],CT[si])});
 pg([[526,wy(526,135)],[624,wy(624,135)],[624,wy(624,135)+4.8],[526,wy(526,135)+4.8]],'#d9cfbd');pg([[531,wy(531,67)],[619,wy(619,67)],[619,wy(619,133)],[531,wy(531,133)]],'#f7f2e8');
 pg(qB(8,A0,A1,12,62),'#7a4d26');pg([P(A0,2,62),P(A1,2,62),P(A1,8,62),P(A0,8,62)],'#a97442');pg(qA(A1,2,8,0,62),'#8a5a2e');
 pg(qA(A1,2,B1,0,12),'#8a5a2e');pg(qB(B1,A0,A1,0,12),'#6f4522');pg([P(A0,181,12),P(A1,181,12),P(A1,B1,12),P(A0,B1,12)],'#a97442');
 pg(qA(159,9,181,12,27),'#e8e2d6');pg(qB(181,51,159,12,27),'#d6cfc1');pg([P(51,9,27),P(159,9,27),P(159,181,27),P(51,181,27)],'#f6f2ea');
 box(58,100,14,46,27,36,'#fffdf8','#e6dfd0','#d3cab8');box(108,152,14,46,27,36,'#fffdf8','#e6dfd0','#d3cab8');
 pg(qA(163,74,187,7,29),'#9a4a2e');pg(qB(187,49,163,7,29),'#843f26');pg([P(49,74,29),P(163,74,29),P(163,187,29),P(49,187,29)],'#b5583a');pg([P(49,74,29),P(163,74,29),P(163,88,29),P(49,88,29)],'#cf6e4d')}
function shelfD(){pg([[446.77,165.4],[322.1,159.9],[310.29,181.49],[439.23,179.05]],'#6b5a45',.22);pg([[473.04,162.35],[344.31,164.59],[344.31,168.25],[473.04,165.81]],'#c4b8a6');pg([[449.62,157.05],[323.53,159.9],[344.31,164.59],[473.04,162.35]],'#f7f3ea')}
function deskBase(){
 shelfD();
 const bX=bw,L=[[3,222],[50,222],[50,354],[108,354],[108,420],[3,420]];
 g.save();g.beginPath();[[-104,324.6],[470,255],[681,300.2],[681,441],[-104,441]].forEach((q,i)=>i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1]));g.clip();
 pg(L.map(p=>P(p[0],p[1])),'#3a1a05',.16);pg(L.map(p=>P(p[0]+14,p[1]+16)),'#5a2a0a',.22);
 pg([P(14,248),P(34,248),P(39,254),P(39,296),P(19,296),P(14,290)],'#3a1a05',.35);pg([P(62,366),P(98,366),P(105,375),P(105,413),P(69,413),P(62,404)],'#3a1a05',.35);
 g.fillStyle='rgba(58,26,5,.3)';g.beginPath();for(let i=0;i<32;i++){const q=P(103+21*Math.cos(i/5.09),300+21*Math.sin(i/5.09));i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1])}g.fill();g.restore();
 const fo=[[304,bX(304,22)],[-64,bX(-64,22)],[-64,bX(-64,127)],[304,bX(304,127)]];pg(fo.map(p=>[p[0]-4,p[1]+4]),'#6b5a45',.2);pg(fo,'#1b1a19');
 pg([[296,bX(296,27)],[-56,bX(-56,27)],[-56,bX(-56,122)],[296,bX(296,122)]],'#3b3d42');
 const no=[[482,wy(482,-10)],[668,wy(668,-10)],[668,wy(668,190)],[482,wy(482,190)]];pg(no.map(p=>[p[0]+4,p[1]+4]),'#6b5a45',.2);pg(no,'#e4efff');
 pg([[490,wy(490,-4.5)],[660,wy(660,-4.5)],[660,wy(660,184.5)],[490,wy(490,184.5)]],'#2e69d2');pg([[520,wy(520,-4.5)],[552,wy(552,-4.5)],[512,wy(512,184.5)],[490,wy(490,184.5)]],'#fff',.09);
 const leg=(a,b)=>{const[X,Y]=P(a,b),Y1=P(a,b,49)[1];g.fillStyle='#e9e9e6';g.fillRect(X-2.2,Y1,4.4,Y-Y1);g.fillStyle='#fff';g.fillRect(X-2.2,Y1,1.4,Y-Y1);g.fillStyle='#c4c4c0';g.beginPath();g.ellipse(X,Y,8,2.8,0,0,7);g.fill()};
 leg(7,228);leg(7,414);
 box(14,34,248,290,2,46,'#23262d','#15171c','#1c1e24');pg(qA(34,249.6,288.4,4,44),'#0e1015');
 box(62,98,366,404,3,42,'#c6e4f8','#a8d4f2','#8ec1e6');for(let k=1;k<4;k++){const h=3+9.75*k;g.strokeStyle='#6fa6cc';g.lineWidth=.5;g.beginPath();g.moveTo(...P(98,366,h));g.lineTo(...P(98,404,h));g.stroke()}
 pg(L.map(p=>P(p[0],p[1],52)),'#f7f7f4',1,'#cfcfc9');pg([P(50,222,52),P(50,354,52),P(50,354,49),P(50,222,49)],'#dcdcd6');pg([P(108,354,52),P(108,420,52),P(108,420,49),P(108,354,49)],'#dcdcd6');pg([P(3,420,52),P(108,420,52),P(108,420,49),P(3,420,49)],'#c9c9c3');
 pg([P(27,258,52.4),P(47,258,52.4),P(47,350,52.4),P(27,350,52.4)],'#30333b');pg([P(32,274,53.4),P(42,274,53.4),P(42,322,53.4),P(32,322,53.4)],'#1b1d22');
 [[239.6,0],[298.6,1]].forEach(([b0])=>{const bm=b0+25.4;box(18,30,bm-7,bm+7,52,53.2,'#3a3d45','#25272d','#1c1e23');box(20.5,23,bm-2,bm+2,53.2,65,'#2f3239','#25272d','#1c1e23');box(21.5,24,b0-1.6,b0+52.4,61,91,'#2a2c32','#15161a','#0f1013')});
 leg(46,228);leg(104,414);
 const ac=98,bc=293;for(let k=0;k<5;k++){const t=.314+k*1.2566;g.strokeStyle='#2b2d33';g.lineWidth=1.5;g.beginPath();g.moveTo(...P(ac,bc,5));g.lineTo(...P(ac+15*Math.cos(t),bc+15*Math.sin(t),2.5));g.stroke()}
 box(ac-1.3,ac+1.3,bc-1.3,bc+1.3,5,19,'#5a5d66','#4a4d56','#34363d');box(ac-12,ac+11,bc-14,bc+14,19,25,'#34373e','#24262c','#1a1c21');
 const RT=[[11,20],[13,28],[15,38],[15.6,48],[14,57],[11.5,63],[8.5,67.5]],bk=a=>[...RT.map(p=>P(a,bc+p[0],p[1])),P(a,bc+5.5,71),P(a,bc-5.5,71),...RT.slice().reverse().map(p=>P(a,bc-p[0],p[1]))];
 pg(bk(ac+8),'#121317');pg(bk(ac+12),'#1f2126');[1,-1].forEach(s=>pg([...RT.slice(1,6).map(p=>P(ac+12,bc+s*p[0],p[1])),...RT.slice(1,6).reverse().map(p=>P(ac+12,bc+s*(p[0]-3.6),p[1]))],'#d8343a'))}
// ---------- window scene (scene units u 0..72, v 0..64) ----------
const rr=rnd(5),STARS=[...Array(90)].map(()=>[rr()*76-2,rr()*44-2,rr()*6.28]),CLD=[[8,12,1,.6],[34,20,.8,.9],[58,9,1.2,.5],[20,27,.7,1.1]];
const RP=[...Array(210)].map(()=>[rr()*90-8,rr()*70-6,.7+rr()*.6]),SP=[...Array(170)].map(()=>[rr()*80-4,rr()*70-6,.5+rr()]),LF=[...Array(44)].map(()=>[rr()*80,rr()*66,.6+rr()*.8,rr()*6]);
function circ(u,v,r,c,a){g.globalAlpha=a==null?1:a;g.fillStyle=c;g.beginPath();g.arc(u,v,r,0,6.2832);g.fill();g.globalAlpha=1}
function win(o,t,dt,fl){
 g.save();g.beginPath();PANES.forEach(p=>{p.forEach((q,i)=>i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1]));g.closePath()});g.clip();g.transform(1,.0703,0,1,539,120);
 const K=[o.k0,o.k1,o.k2,o.k3];for(let i=0;i<16;i++){const q=(i+.5)/16*3,j=Math.min(2,q|0);g.fillStyle=rgb(mix(K[j],K[j+1],q-j));g.fillRect(-10,-6+i*3.4,96,3.5)}
 const dark=cl(1-lum(o.k1)/200,0,1);
 if(o.st>.01)STARS.forEach(s=>{g.globalAlpha=o.st*(.5+.5*Math.sin(t*1.6+s[2]*3));g.fillStyle='#fff';g.fillRect(s[0],s[1]+4,.45,.45)});g.globalAlpha=1;
 if(o.au>.01)for(let k=0;k<3;k++){g.beginPath();const T=[],B=[];for(let u=-4;u<=78;u+=2){const y=17+[0,-3,3][k]+3.2*Math.sin(u*.11+k*1.3+t*.4)+1.6*Math.sin(u*.27+2*k+t*.6);T.push([u,y]);B.push([u,y-5.5-2.6*Math.sin(u*.09+1+k+t*.3)])}
  pg([...T,...B.reverse()],['#3dffa2','#35e6d2','#a05cff'][k],o.au*[.4,.26,.24][k])}
 if(o.sa>.01){const e=cl((90-lum(o.sc))/90,0,1);for(let i=3;i>0;i--)circ(o.su,o.sv,3.6*(1+.75*i),e>.3?'#fff':rgb(o.sc),o.sa*(e>.3?.1:.14));circ(o.su,o.sv,4,rgb(o.sc),o.sa);if(e>.3){for(let i=4;i>0;i--)circ(o.su,o.sv,4+i*1.6,'#fff',.1*e)}}
 if(o.ma>.01){const r=5.2;g.save();g.beginPath();g.rect(-20,-20,140,140);g.arc(o.mu+r*(.5+1.5*o.mf),o.mv-r*.2*(1-o.mf),r*.88,0,6.2832,true);g.clip('evenodd');for(let i=3;i>0;i--)circ(o.mu,o.mv,r*(1+.55*i),rgb(o.mc),.06*o.ma);circ(o.mu,o.mv,r,rgb(o.mc),o.ma);g.restore()}
 if(o.rb>.01)['#e8453c','#f4902c','#f7d23a','#58b947','#3a8fe0','#4a58c4','#8a4fc0'].forEach((c,i)=>{g.globalAlpha=.78*o.rb;g.strokeStyle=c;g.lineWidth=1.7;g.beginPath();g.arc(34,62,40-i*1.6,Math.PI,6.2832);g.stroke()});g.globalAlpha=1;
 if(o.me>.01)for(let i=0;i<5;i++){const p=(t*.4+i*.37)%1.9;if(p<1){const x0=70-p*60-i*9,y0=4+p*30+i*6;g.strokeStyle='#fff';g.globalAlpha=(1-p)*.9*o.me;g.lineWidth=.35;g.beginPath();g.moveTo(x0,y0);g.lineTo(x0+14,y0-7);g.stroke();g.globalAlpha=1}}
 CLD.forEach((c,i)=>{if(o.ca<.01)return;const u=((c[0]+t*c[3]*.6)%100)-16;g.globalAlpha=o.ca;g.fillStyle=rgb(o.cc);g.beginPath();[[0,0,5.2],[-5,1.5,4],[5.5,.5,4.2],[10,2.5,3],[-9.5,3,2.6]].forEach(q=>{g.moveTo(u+c[2]*q[0]+c[2]*q[2],c[1]+c[2]*q[1]);g.arc(u+c[2]*q[0],c[1]+c[2]*q[1],c[2]*q[2],0,6.2832)});g.fill();g.globalAlpha=1});
 const hf=o.hf,hn=o.hn;g.fillStyle=rgb(hf);g.beginPath();g.moveTo(-8,43);g.bezierCurveTo(4,33,16,34,26,40);g.bezierCurveTo(36,45,44,36,56,37);g.bezierCurveTo(66,38,72,42,82,40);g.lineTo(82,76);g.lineTo(-8,76);g.fill();
 if(o.fg>.01){g.fillStyle=rgb([238,241,243],.5*o.fg);g.fillRect(-10,35,96,9)}
 g.fillStyle=rgb(hn);g.beginPath();g.moveTo(-8,52);g.bezierCurveTo(6,44,18,45,30,50);g.bezierCurveTo(40,54,50,47,62,47.5);g.bezierCurveTo(70,48,76,50,82,49);g.lineTo(82,76);g.lineTo(-8,76);g.fill();
 const dm=c=>rgb(mix(hx(c),mix(hn,[0,0,0],.5),dark*.85));
 g.fillStyle=dm('#5a3a22');g.fillRect(10.4,48,1.2,4);circ(11,45.5,3.6,dm('#3f8f4b'));g.fillStyle=dm('#f3e7d0');g.fillRect(45.5,46,9,6.5);pg([[44.3,46.2],[50,41.6],[55.7,46.2]],dm('#c4553a'));pg([[62.2,45.1],[65.5,42.3],[68.8,45.1]],dm('#c4553a'));g.fillStyle=dm('#f3e7d0');g.fillRect(63,45,5,4);
 g.fillStyle=rgb([255,211,107],cl((dark-.5)*4,0,1));g.fillRect(50.8,47.8,2.3,2.1);g.fillRect(64.7,46.2,1.5,1.5);
 if(o.fg>.01){g.fillStyle=rgb([238,241,243],.45*o.fg);g.fillRect(-10,43,96,9);g.fillStyle=rgb([238,241,243],.42*o.fg);g.fillRect(-10,51,96,16)}
 if(o.rn>.01){g.strokeStyle='#dbe6f2';g.lineWidth=.25;g.globalAlpha=.55;g.beginPath();const n=Math.min(210,150*o.rn|0),sl=1+o.rn;RP.slice(0,n).forEach(p=>{p[1]+=dt*45*p[2];p[0]-=dt*12*p[2]*sl;if(p[1]>70){p[1]=-6;p[0]=rr()*90}if(p[0]<-8)p[0]+=90;g.moveTo(p[0],p[1]);g.lineTo(p[0]-sl,p[1]+4.6)});g.stroke();g.globalAlpha=1}
 if(o.sn>.01){g.fillStyle='#fff';g.globalAlpha=.9;SP.slice(0,170*o.sn|0).forEach(p=>{p[1]+=dt*7*p[2];p[0]+=Math.sin(t*1.5+p[1]*.3)*dt*3;if(p[1]>70)p[1]=-6;g.fillRect(p[0],p[1],.5*p[2]+.2,.5*p[2]+.2)});g.globalAlpha=1}
 if(o.la>.01){g.fillStyle=rgb(o.lc);g.globalAlpha=.95*o.la;LF.forEach(p=>{p[1]+=dt*5*p[2];p[0]+=Math.sin(t*1.2+p[3])*dt*6+dt*3;if(p[1]>68){p[1]=-4;p[0]=rr()*76}if(p[0]>80)p[0]=-4;g.save();g.translate(p[0],p[1]);g.rotate(t*p[2]+p[3]);g.beginPath();g.ellipse(0,0,1.2*p[2],.55*p[2],0,0,6.2832);g.fill();g.restore()});g.globalAlpha=1}
 if(o.fl>.01&&fl>.02){g.globalAlpha=Math.min(1,fl)*o.fl;pg([[46,-4],[40,13],[44.5,13],[37,34],[48,16],[43.5,16],[50,-4]],'#fff8c8');g.fillStyle='#e6eeff';g.globalAlpha=.4*fl*o.fl;g.fillRect(-10,-6,96,80);g.globalAlpha=1}
 pg([[4,3],[16,3],[4,26]],'#fff',.24-dark*.16);pg([[42,3],[54,3],[42,26]],'#fff',.24-dark*.16);g.restore()}
// ---------- monitors / PC ----------
function screen(X0,Y0,ox,w,o,t){
 g.save();g.transform(-1,.121,0,-1,X0,Y0);g.beginPath();g.rect(0,0,50.8,26);g.clip();g.fillStyle='#0b1020';g.fillRect(0,0,51,26);const ac=o.ac;
 g.fillStyle=rgb(ac,.12);g.fillRect(0,0,51,26);
 for(let i=0;i<9;i++){const wd=6+(Math.sin(t*.8+i*1.7+w*2)+1)*9;g.fillStyle=i%3?rgb(ac,.85):'rgba(255,255,255,.55)';g.fillRect(2+(i%2)*2,22-i*2.3,wd,.9)}
 if(w==1){g.strokeStyle=rgb(ac,.9);g.lineWidth=.5;g.beginPath();g.arc(40,13,5+Math.sin(t)*.8,0,6.2832);g.stroke();circ(40,13,2.4,rgb(ac),.5)}
 else{g.strokeStyle=rgb(ac,.95);g.lineWidth=.45;g.beginPath();for(let u=0;u<=51;u+=1){const y=6+3*Math.sin(u*.35-t*2)*Math.sin(u*.08+w);u?g.lineTo(u,y):g.moveTo(u,y)}g.stroke()}
 if(o.au>.01){g.fillStyle='rgba(4,16,28,'+o.au*.92+')';g.fillRect(0,0,51,26);[['#3dffa2',.45,0],['#35e6d2',.3,-3],['#a05cff',.28,3]].forEach((c,k)=>{const T=[],B=[];for(let u=-2;u<=53;u+=2){const q=u+ox,y=14+c[2]+3*Math.sin(q*.11+k*1.3+t*.4)+1.5*Math.sin(q*.27+2*k+t*.6);T.push([u,y]);B.push([u,y-5-2.5*Math.sin(q*.09+1+k)])}
  g.globalAlpha=o.au*c[1];g.fillStyle=c[0];g.beginPath();T.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));B.reverse().forEach(p=>g.lineTo(p[0],p[1]));g.fill();g.globalAlpha=1});g.fillStyle='rgba(4,10,16,'+o.au+')';g.fillRect(0,0,51,3)}
 g.restore()}

// ---------- runtime (driven by app.js) ----------
const IDX={morning:0,noon:1,afternoon:2,evening:3,night:4,midnight:5,dawn:6,dusk:7,rainy:8,rainbow:9,thunderstorm:10,snowy:11,foggy:12,overcast:13,aurora:14,meteor_shower:15,blood_moon:16,eclipse:16,solar:17,autumn_wind:18,cherry_blossom:19};
let room=0,cur=V[1].slice(),from=cur.slice(),tgt=1,tp=1,t0=0,last=0,lastDraw=0,flT=0,flN=3,flS=0,FPS=30,MORPH=4500,CW=3840,CH=2160;
const base=document.createElement('canvas'),bg=base.getContext('2d');let W=0,H=0,K=1,OX=0,OY=0;
const tf=(c,m)=>c.setTransform(m?-K:K,0,0,K,OX+(m?680:102.2)*K,OY);
function rebase(){const gg=g;g=bg;bg.setTransform(1,0,0,1,0,0);bg.clearRect(0,0,W,H);tf(bg,room);room0();room?deskBase():bedBase();g=gg}
function init(canvas,r,w,h,rs,fps,morphMs){cv=canvas;g=cv.getContext('2d');room=r;CW=w;CH=h;FPS=fps;MORPH=morphMs;
 W=cv.width=w*rs|0;H=cv.height=h*rs|0;base.width=W;base.height=H;K=Math.max(W/782.2,H/440);OX=(W-782.2*K)/2;OY=(H-440*K)/2;rebase()}
function set(name){const i=IDX[name];if(i==null)return;cur=V[i].slice();from=cur.slice();tgt=i;tp=1}
function goto(name){const i=IDX[name];if(i==null||(i==tgt&&tp>=1))return;from=cur.slice();tgt=i;tp=0;t0=performance.now()}
function frame(now){
 if(!cv||now-lastDraw<1000/FPS)return;lastDraw=now;
 const dt=Math.min(.1,(now-last)/1e3),t=now/1e3;last=now;
 tp=Math.min(1,(now-t0)/MORPH);const e=tp<.5?4*tp*tp*tp:1-Math.pow(-2*tp+2,3)/2;cur=from.map((v,i)=>v+(V[tgt][i]-v)*e);const o=dec(cur);
 if(t>flT){flT=t+flN;flN=3+Math.random()*5;flS=t}const fl=Math.max(0,Math.exp(-(t-flS)*7))*(.7+.3*Math.sin(t*60));
 g=cv.getContext('2d');g.setTransform(1,0,0,1,0,0);g.drawImage(base,0,0);tf(g,room);
 g.fillStyle=rgb(o.tint,o.ta);g.fillRect(-110,0,800,440);if(o.fl>.01){g.fillStyle='rgba(220,230,255,'+.14*fl*o.fl+')';g.fillRect(-110,0,800,440)}
 if(!room){const A=[40,250],B=[125,250],C=[15,340],pp=(s,u)=>P(A[0]+s*(B[0]-A[0])+u*(C[0]-A[0]),A[1]+s*(B[1]-A[1])+u*(C[1]-A[1]));
  [[0,.47],[.53,1]].forEach(s=>[[0,.47],[.53,1]].forEach(u=>{if(o.rb>.5){}pg([pp(s[0],u[0]),pp(s[1],u[0]),pp(s[1],u[1]),pp(s[0],u[1])],rgb(o.gc),o.ga*(1-.4*o.rb))}));
  if(o.rb>.01)['#e8453c','#f4902c','#f7d23a','#58b947','#3a8fe0','#4a58c4','#8a4fc0'].forEach((c,i)=>pg([pp(0,i/7),pp(1,i/7),pp(1,(i+1)/7),pp(0,(i+1)/7)],c,.22*o.rb))}
 else{pg(qA(34,251.6,286.4,4,44),'#0e1015',.9);[37,26,15].forEach((h,i)=>{const c=o.au>.5?['#3dffa2','#35e6d2','#a05cff'][i]:`hsl(${(t*50+i*70+190)%360},90%,60%)`,[X,Y]=P(34,258.6,h);g.strokeStyle=c;g.lineWidth=.9;g.beginPath();g.ellipse(X,Y,4.6,5,0,0,6.2832);g.stroke();circ(X,Y,1.1,c)});
  pg(qA(42,274,322,52.4,53.4),rgb(o.ac),.95);screen(254.4,225.7,0,1,o,t);screen(195.4,232.9,59,2,o,t);
  pg([P(24,240,52.5),P(40,240,52.5),P(40,350,52.5),P(24,350,52.5)],rgb(o.gc),.05+.2*o.ta+.08*o.au)}
 win&&!room&&win(o,t,dt,fl);
}
return{init,set,goto,frame};
})();
