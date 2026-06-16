(function(){
  const c=document.getElementById('stars'), x=c.getContext('2d'); let w,h,st=[];
  function rs(){ w=c.width=innerWidth; h=c.height=innerHeight; st=Array.from({length:Math.min(120,Math.floor(w*h/14000))},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.4+.3,a:Math.random(),s:Math.random()*.4+.1})); }
  function loop(){ x.clearRect(0,0,w,h); st.forEach(p=>{ p.a+=p.s*.02; const o=.3+Math.abs(Math.sin(p.a))*.6; x.beginPath(); x.arc(p.x,p.y,p.r,0,7); x.fillStyle='rgba(160,200,120,'+o*.5+')'; x.fill(); p.y+=p.s*.15; if(p.y>h)p.y=0; }); requestAnimationFrame(loop); }
  addEventListener('resize',rs); rs(); loop();
})();

const cfg=window.PC_CONFIG;
const MOD_TITLES={perfil:'Perfil',ikigai:'Ikigai',linea_tiempo:'Línea de tiempo',recursos:'Recursos',
  plan_vida:'Plan de vida',ideacion:'Ideación',producto:'Producto/Servicio',propuesta_valor:'Propuesta de valor',
  marketing:'Marketing',pitch:'Pitch',cierre:'Cierre'};
const TOTAL_MODULES=11;
let sb=null, session=null, profiles=[], byUser={};
const $=s=>document.querySelector(s);
function init(){
  if(!cfg||cfg.SUPABASE_URL.includes('TU-PROYECTO')){ $('#msg').textContent='Falta configurar config.js'; $('#msg').className='msg err'; return false; }
  sb=supabase.createClient(cfg.SUPABASE_URL,cfg.SUPABASE_ANON_KEY); return true;
}
async function login(){
  const code=$('#in-code').value.trim().toUpperCase(), pin=$('#in-pin').value;
  if(pin.length<4){ $('#msg').textContent='Escribe tu clave (mínimo 4 caracteres).'; $('#msg').className='msg err'; return; }
  const email=code.toLowerCase()+'@'+cfg.EMAIL_DOMAIN;
  let {data:s,error}=await sb.auth.signInWithPassword({email,password:pin});
  if(error){
    const {error:e2}=await sb.auth.signUp({email,password:pin,options:{data:{codigo:code}}});
    if(e2){ $('#msg').textContent='No se pudo entrar: '+e2.message; $('#msg').className='msg err'; return; }
    await new Promise(r=>setTimeout(r,600));
    s=(await sb.auth.getSession()).data;
  }
  session=s.session||(await sb.auth.getSession()).data.session;
  const {data:p}=await sb.from('bootcamp_pc_profiles').select('rol').eq('id',session.user.id).single();
  if(!p||p.rol!=='admin'){ $('#msg').textContent='Esa clave no corresponde al facilitador.'; $('#msg').className='msg err'; await sb.auth.signOut(); return; }
  $('#login').classList.add('hidden'); $('#app').style.display='block';
  await loadData();
}
async function loadData(){
  const {data:ps}=await sb.from('bootcamp_pc_profiles').select('*').eq('rol','emprendedor').order('codigo');
  profiles=ps||[];
  const {data:rs}=await sb.from('bootcamp_pc_responses').select('user_id,module_key,data');
  byUser={}; (rs||[]).forEach(r=>{ byUser[r.user_id]=byUser[r.user_id]||{}; byUser[r.user_id][r.module_key]=r.data; });
  renderStats(); renderRows();
}
function cellHas(x){ if(!x) return false; if(typeof x==='string') return !!x.trim(); if(typeof x==='object') return Object.values(x).some(y=>y&&String(y).trim()); return !!String(x).trim(); }
function modulesDone(uid){ const d=byUser[uid]||{}; let n=0; Object.keys(d).forEach(k=>{ const has=Object.values(d[k]||{}).some(v=>Array.isArray(v)?v.some(cellHas):(v&&String(v).trim())); if(has)n++; }); return n; }
function modulosDoneSafe(uid){ try{return modulesDone(uid);}catch(e){return 0;} }
function renderStats(){
  const activos=profiles.filter(p=>modulosDoneSafe(p.id)>0).length;
  const conPitch=profiles.filter(p=>{const d=byUser[p.id];return d&&d.pitch&&(d.pitch.pitch_final||'').trim();}).length;
  $('#stats').innerHTML=`
    <div class="stat s1"><div class="n">${profiles.length}</div><div class="l">Emprendedores registrados</div></div>
    <div class="stat s2"><div class="n">${activos}</div><div class="l">Han empezado a trabajar</div></div>
    <div class="stat s3"><div class="n">${conPitch}</div><div class="l">Con pitch escrito</div></div>`;
}
function renderRows(){
  const q=($('#search').value||'').toLowerCase();
  const rows=$('#rows'); rows.innerHTML='';
  const list=profiles.filter(p=>!q||[p.codigo,p.nombre,p.municipio].some(x=>(x||'').toLowerCase().includes(q)));
  if(!list.length){ rows.innerHTML='<tr><td colspan="6" class="empty" style="padding:26px">Aún no hay emprendedores registrados.</td></tr>'; return; }
  list.forEach(p=>{
    const done=modulosDoneSafe(p.id), pct=Math.round(done/TOTAL_MODULES*100);
    const tr=document.createElement('tr'); tr.onclick=()=>openDetail(p);
    tr.innerHTML=`<td><b style="color:#fff">${p.codigo}</b></td><td>${p.nombre||'<span class="empty">—</span>'}</td>
      <td>${p.municipio||'<span class="empty">—</span>'}</td>
      <td><span class="pill">${MOD_TITLES[p.modulo_actual]||'—'}</span></td>
      <td><div style="display:flex;align-items:center;gap:9px"><div class="bar"><div style="width:${pct}%"></div></div><small style="color:var(--muted)">${done}/${TOTAL_MODULES}</small></div></td>
      <td><small style="color:var(--muted)">${p.updated_at?new Date(p.updated_at).toLocaleString('es-CO',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'}):'—'}</small></td>`;
    rows.appendChild(tr);
  });
}
function openDetail(p){
  const d=byUser[p.id]||{};
  let html=`<button class="close" onclick="document.getElementById('overlay').classList.remove('show')">Cerrar ✕</button>
    <h2>${p.codigo} · ${p.nombre||'Sin nombre'}</h2>
    <div class="meta">${p.municipio||''} ${p.edad?('· '+p.edad+' años'):''} ${p.contacto?('· '+p.contacto):''}</div>`;
  const order=['ikigai','linea_tiempo','recursos','plan_vida','ideacion','producto','propuesta_valor','marketing','pitch','cierre'];
  order.forEach(k=>{
    const md=d[k]; if(!md) return;
    const kvs=Object.entries(md).map(([kk,vv])=>{
      let txt=Array.isArray(vv)?vv.filter(x=>x&&(x.c0||x.c1||(typeof x==='string'&&x.trim()))).map(x=>typeof x==='string'?x:Object.values(x).join(' · ')).join(' | '):vv;
      if(!txt||!String(txt).trim()) return '';
      return `<div class="kv"><b>${kk}:</b> ${String(txt).slice(0,400)}</div>`;
    }).filter(Boolean).join('');
    if(kvs) html+=`<div class="mod-block"><h3>${MOD_TITLES[k]||k}</h3>${kvs}</div>`;
  });
  if(!order.some(k=>d[k])) html+='<p class="empty">Aún no ha registrado información.</p>';
  $('#modal').innerHTML=html; $('#overlay').classList.add('show');
}
$('#overlay').onclick=e=>{ if(e.target.id==='overlay') $('#overlay').classList.remove('show'); };
$('#btn-login').onclick=login;
$('#in-pin').addEventListener('keydown',e=>{if(e.key==='Enter')login();});
$('#btn-logout').onclick=async()=>{await sb.auth.signOut();location.reload();};
$('#search').oninput=renderRows;
$('#btn-refresh').onclick=loadData;
(async function(){ if(!init())return; const {data:{session:s}}=await sb.auth.getSession();
  if(s){ session=s; const {data:p}=await sb.from('bootcamp_pc_profiles').select('rol').eq('id',s.user.id).single();
    if(p&&p.rol==='admin'){ $('#login').classList.add('hidden'); $('#app').style.display='block'; await loadData(); } } })();
