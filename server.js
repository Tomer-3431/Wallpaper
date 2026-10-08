const http=require('http'),fs=require('fs'),path=require('path');
const ROOT=__dirname,PUB=path.join(ROOT,'public'),DATA=path.join(ROOT,'data.json'),PORT=1257;
const MIME={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.webp':'image/webp','.gif':'image/gif'};
let data={mode:'clock',event:null,codeFile:null,notes:[]};
try{data=JSON.parse(fs.readFileSync(DATA,'utf8'))}catch{}
const clients=new Set();
http.createServer((req,res)=>{
 const u=decodeURIComponent(req.url.split('?')[0]);
 if(u==='/api/data'){
  if(req.method==='POST'){let b='';req.on('data',c=>b+=c).on('end',()=>{try{data=JSON.parse(b).data;fs.writeFile(DATA,JSON.stringify(data,null,1),()=>{});clients.forEach(c=>c.write(`data: ${b}\n\n`))}catch{}res.end('ok')});return}
  res.setHeader('Content-Type','application/json');return res.end(JSON.stringify(data));
 }
 if(u==='/api/events'){res.writeHead(200,{'Content-Type':'text/event-stream','Cache-Control':'no-cache',Connection:'keep-alive'});res.write(':\n\n');clients.add(res);req.on('close',()=>clients.delete(res));return}
 let f;
 if(u==='/config.json')f=path.join(ROOT,'config.json');
 else if(/^\/monitor[ab]$/i.test(u))f=path.join(PUB,'index.html');
 else f=path.join(PUB,u==='/'?'index.html':u);
 if(!f.startsWith(PUB)&&!f.endsWith('config.json')){res.statusCode=403;return res.end()}
 fs.readFile(f,(e,buf)=>{if(e){res.statusCode=404;return res.end('not found')}res.setHeader('Content-Type',MIME[path.extname(f)]||'application/octet-stream');res.end(buf)});
}).listen(PORT,()=>console.log(`http://localhost:${PORT}/monitorA   http://localhost:${PORT}/monitorB`));
