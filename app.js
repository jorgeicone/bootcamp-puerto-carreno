const MODULES = [
  { key:'perfil', day:1, icon:'🪪', title:'Aquí comienza tu historia',
    kicker:'Día 1 · Tú', intro:'Tus datos de contacto. Más que un registro, es el inicio de tu camino.',
    fields:[
      {t:'text', k:'nombre', label:'Nombre completo'},
      {t:'text', k:'edad', label:'Edad'},
      {t:'text', k:'contacto', label:'Número de contacto'},
      {t:'text', k:'municipio', label:'Municipio / vereda donde vives'},
    ]},
  { key:'ikigai', day:1, icon:'🌱', title:'Mi Ikigai personal',
    kicker:'Día 1 · Tú', intro:'Descubre tu propósito emprendedor cruzando lo que amas, lo que haces bien, lo que el mundo necesita y por lo que te podrían pagar.',
    fields:[
      {t:'list', k:'amo', n:5, label:'1. Lo que AMO hacer', hint:'¿Qué disfrutas tanto que el tiempo se te pasa volando? ¿Qué te hace feliz?'},
      {t:'list', k:'doy_bien', n:5, label:'2. Lo que se me DA BIEN', hint:'¿Qué haces con facilidad? ¿Qué te dicen los demás que haces bien?'},
      {t:'list', k:'mundo_necesita', n:5, label:'3. Lo que el MUNDO NECESITA', hint:'¿Qué problema te gustaría resolver? ¿Qué necesita tu comunidad?'},
      {t:'list', k:'pagarian', n:5, label:'4. Por lo que me PODRÍAN PAGAR', hint:'¿Qué habilidades, productos o servicios podrías ofrecer que tengan valor para otros?'},
      {t:'textarea', k:'proposito', label:'5. Mi PROPÓSITO POSIBLE para emprender', hint:'Une todo lo anterior en una idea o dirección de vida que te emocione.'},
    ],
    ai:{ label:'Ayúdame a encontrar mi propósito',
      build:(d)=>({
        system:'Eres un mentor de emprendimiento rural, cálido y concreto. Hablas claro, sin tecnicismos, con ejemplos del campo y la comunidad. Respondes en español.',
        user:`A partir de mi Ikigai, ayúdame a redactar 3 posibles propósitos emprendedores en una frase cada uno, y dime cuál tiene más potencial y por qué.\n\nLo que AMO: ${arr(d.amo)}\nLo que hago BIEN: ${arr(d.doy_bien)}\nLo que el MUNDO NECESITA: ${arr(d.mundo_necesita)}\nPor lo que me PAGARÍAN: ${arr(d.pagarian)}`
      })}
  },
  { key:'linea_tiempo', day:1, icon:'🧭', title:'Mi línea de tiempo personal',
    kicker:'Día 1 · Tú', intro:'Visualiza tu camino: de dónde vienes, dónde estás y hacia dónde vas.',
    fields:[
      {t:'list', k:'pasado', n:5, label:'PASADO', hint:'Momentos clave, aprendizajes o experiencias que marcaron tu vida.'},
      {t:'list', k:'presente', n:5, label:'PRESENTE', hint:'¿Qué estás viviendo, aprendiendo o sintiendo hoy?'},
      {t:'list', k:'futuro_cercano', n:5, label:'FUTURO CERCANO (1–2 años)', hint:'¿Qué te gustaría lograr en el corto plazo?'},
      {t:'list', k:'futuro_medio', n:5, label:'FUTURO MEDIO (3–5 años)', hint:'¿Qué sueñas hacer o cambiar en ese periodo?'},
      {t:'list', k:'futuro_lejano', n:5, label:'FUTURO LEJANO (más de 5 años)', hint:'¿Cómo visualizas tu vida en el futuro?'},
    ]},
  { key:'recursos', day:1, icon:'🧰', title:'Inventario de recursos',
    kicker:'Día 1 · Tú', intro:'Personales y locales. Reconoce todo lo que ya tienes para emprender.',
    fields:[
      {t:'fixedtable', k:'tabla',
        cols:['¿Qué tengo?','¿Cómo puedo usarlo en un negocio?'],
        rows:['Habilidades / talentos','Personas / red de apoyo','Recursos naturales o del entorno','Materiales / herramientas que tengo','Conocimientos / estudios previos']}
    ]},
  { key:'plan_vida', day:1, icon:'🗺️', title:'Mi plan de vida emprendedor',
    kicker:'Día 1 · Tú', intro:'Metas por cada área de tu vida.',
    fields:[
      {t:'fixedtable', k:'tabla',
        cols:['Meta corto plazo (6 meses)','Meta mediano plazo (2 años)','Acción próxima'],
        rows:['Formación / Educación','Emprendimiento / Trabajo','Bienestar personal y salud','Impacto en mi comunidad','Crecimiento espiritual / emocional']}
    ]},
  { key:'ideacion', day:2, icon:'💡', title:'Formato de ideación',
    kicker:'Día 2 · Tu idea', intro:'Conecta tu propósito con un problema real de tu comunidad.',
    fields:[
      {t:'textarea', k:'problema', label:'¿Qué problema quiero resolver en mi comunidad?'},
      {t:'textarea', k:'importancia', label:'¿Por qué ese problema es importante para mí?'},
      {t:'textarea', k:'soluciones', label:'¿Qué soluciones existen ya? ¿Y qué haría diferente?'},
      {t:'textarea', k:'habilidades', label:'¿Qué habilidades o conocimientos tengo que me pueden ayudar?'},
      {t:'textarea', k:'recursos', label:'¿Qué recursos tengo o puedo conseguir para iniciar?'},
      {t:'textarea', k:'a_quien', label:'¿A quién podría ayudar con esta idea?'},
    ],
    ai:{ label:'Ayúdame a afinar mi idea',
      build:(d)=>({
        system:'Eres un mentor de emprendimiento rural, práctico y motivador. Respondes en español, claro y breve.',
        user:`Analiza mi idea y dame: (1) una versión mejorada del problema en una frase, (2) 3 ideas para diferenciarme, (3) un primer paso concreto que pueda dar esta semana.\n\nProblema: ${d.problema||''}\nImportancia: ${d.importancia||''}\nSoluciones existentes: ${d.soluciones||''}\nMis habilidades: ${d.habilidades||''}\nMis recursos: ${d.recursos||''}\nA quién ayuda: ${d.a_quien||''}`
      })}
  },
  { key:'producto', day:2, icon:'📦', title:'Producto / servicio',
    kicker:'Día 2 · Tu idea', intro:'Define con detalle qué vas a ofrecer.',
    fields:[
      {t:'text', k:'nombre', label:'Nombre del producto o servicio'},
      {t:'text', k:'tipo', label:'¿Es un producto o un servicio?'},
      {t:'textarea', k:'beneficio', label:'Beneficio principal que ofrece'},
      {t:'textarea', k:'cliente', label:'¿A quién ayuda? (cliente objetivo)'},
      {t:'textarea', k:'problema', label:'Problema que resuelve'},
    ]},
  { key:'propuesta_valor', day:2, icon:'⭐', title:'Propuesta única de valor',
    kicker:'Día 2 · Tu idea', intro:'Lo que te hace diferente y por qué te elegirían a ti.',
    fields:[
      {t:'textarea', k:'cliente_ideal', label:'Cliente ideal: ¿para quién es esta solución?'},
      {t:'textarea', k:'problema', label:'Problema: ¿qué necesidad o dificultad tiene ese cliente?'},
      {t:'textarea', k:'solucion', label:'Solución propuesta: ¿qué ofreces para resolverlo?'},
      {t:'textarea', k:'beneficio', label:'Beneficio principal: ¿qué mejora concreta obtiene el cliente?'},
      {t:'textarea', k:'diferencial', label:'Diferencial: ¿qué hace tu propuesta diferente o mejor?'},
      {t:'textarea', k:'razon', label:'Razón para elegirte: ¿por qué te elegirían a ti y no a otro?'},
    ],
    ai:{ label:'Redacta mi propuesta de valor',
      build:(d)=>({
        system:'Eres un experto en marketing para pequeños negocios rurales. Escribes frases potentes y sencillas en español.',
        user:`Con esta información, redacta una propuesta de valor en 1–2 frases (clara y memorable) y 2 variantes alternativas:\n\nCliente: ${d.cliente_ideal||''}\nProblema: ${d.problema||''}\nSolución: ${d.solucion||''}\nBeneficio: ${d.beneficio||''}\nDiferencial: ${d.diferencial||''}\nRazón para elegirte: ${d.razon||''}`
      })}
  },
  { key:'marketing', day:2, icon:'📣', title:'Plan de marketing a la medida',
    kicker:'Día 2 · Tu idea', intro:'Cómo vas a comunicar y llegar a tus clientes.',
    fields:[
      {t:'table', k:'filas', min:2,
        cols:['Segmento del cliente','Canal de comunicación','Tipo de contenido','Mensaje clave','Formato','Frecuencia','Objetivo']}
    ],
    ai:{ label:'Sugiéreme un plan de marketing',
      build:(d,all)=>({
        system:'Eres un estratega de marketing para emprendedores rurales con bajo presupuesto. Respondes en español, concreto y accionable.',
        user:`Propón un plan de marketing sencillo (3 acciones) con canal, mensaje clave y frecuencia, pensado para una comunidad como Puerto Carreño (recursos limitados, mucho WhatsApp y voz a voz).\n\nMi negocio: ${(all.producto&&all.producto.nombre)||''} — ${(all.propuesta_valor&&all.propuesta_valor.solucion)||''}\nCliente: ${(all.propuesta_valor&&all.propuesta_valor.cliente_ideal)||''}`
      })}
  },
  { key:'pitch', day:2, icon:'🎤', title:'Mi pitch',
    kicker:'Día 2 · Tu pitch', intro:'Une todo en una presentación clara y poderosa de tu emprendimiento.',
    fields:[
      {t:'textarea', k:'quien_soy', label:'¿Quién soy y qué hago? (presentación personal y propósito)'},
      {t:'textarea', k:'idea', label:'¿Cuál es mi idea de negocio? (producto, servicio o solución)'},
      {t:'textarea', k:'impacto', label:'¿Qué impacto quiero lograr? (comunidad, entorno o sector)'},
      {t:'textarea', k:'diferente', label:'¿Qué me hace diferente? (fortalezas o propuesta de valor)'},
      {t:'textarea', k:'necesito', label:'¿Qué necesito o busco con este pitch? (apoyo, clientes, aliados)'},
      {t:'textarea', k:'pitch_final', label:'✍️ Mi pitch final (60 segundos)', big:true},
    ],
    ai:{ label:'Construye mi pitch de 60 segundos',
      build:(d,all)=>({
        system:'Eres un coach de pitch para emprendedores. Escribes un pitch hablado de 60 segundos, en primera persona, cálido y convincente, en español, listo para leer en voz alta.',
        user:`Escribe mi pitch de 60 segundos uniendo todo esto. Que empiece enganchando, presente el problema, mi solución, lo que me hace diferente, el impacto, y cierre con lo que busco.\n\nQuién soy: ${d.quien_soy||''}\nIdea: ${d.idea||(all.producto&&all.producto.nombre)||''}\nImpacto: ${d.impacto||''}\nDiferente: ${d.diferente||''}\nNecesito: ${d.necesito||''}\nPropuesta de valor: ${(all.propuesta_valor&&all.propuesta_valor.solucion)||''}\nPropósito: ${(all.ikigai&&all.ikigai.proposito)||''}`
      })}
  },
  { key:'cierre', day:2, icon:'🌟', title:'¿Qué te llevas de esta experiencia?',
    kicker:'Día 2 · Cierre', intro:'Tu reflexión final del bootcamp.',
    fields:[
      {t:'list', k:'aprendizajes', n:5, label:'Lo que me llevo'},
      {t:'textarea', k:'reflexion', label:'Una reflexión final'},
    ]},
];

const cfg = window.PC_CONFIG;
let sb=null, session=null, profile=null;
let current='perfil', data={}, saveTimer=null;
function arr(a){ return Array.isArray(a)? a.filter(x=>x&&x.trim()).map((x,i)=>`${i+1}) ${x}`).join('  ') : ''; }
const $ = s=>document.querySelector(s);
function initSb(){
  if(!cfg || cfg.SUPABASE_URL.includes('TU-PROYECTO')){ showMsg('⚠️ Falta configurar Supabase en config.js','err'); return false; }
  sb = supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY); return true;
}
function emailFromCode(code){ return code.toLowerCase()+'@'+cfg.EMAIL_DOMAIN; }
function showMsg(t,type){ const m=$('#login-msg'); m.textContent=t; m.className='msg '+(type||''); }
async function login(){
  const code=$('#in-code').value.trim().toUpperCase(), pin=$('#in-pin').value;
  if(!code){ showMsg('Escribe tu código de acceso.','err'); return; }
  if(pin.length<4){ showMsg('Tu clave debe tener al menos 4 caracteres.','err'); return; }
  const btn=$('#btn-login'); btn.disabled=true; btn.textContent='Entrando...';
  const email=emailFromCode(code);
  let { data:s, error } = await sb.auth.signInWithPassword({ email, password:pin });
  if(error){
    const { data:su, error:eup } = await sb.auth.signUp({ email, password:pin, options:{ data:{ codigo:code } } });
    if(eup){ showMsg(traducirError(eup.message),'err'); btn.disabled=false; btn.textContent='Entrar a mi ruta →'; return; }
    s=su; await new Promise(r=>setTimeout(r,600));
  }
  session = s.session || (await sb.auth.getSession()).data.session;
  if(!session){ showMsg('No se pudo iniciar sesión. Revisa tu clave.','err'); btn.disabled=false; btn.textContent='Entrar a mi ruta →'; return; }
  await afterLogin();
  btn.disabled=false; btn.textContent='Entrar a mi ruta →';
}
function traducirError(m){
  if(/not authorized|no autorizado/i.test(m)) return 'Ese código no está habilitado para el bootcamp.';
  if(/Invalid login/i.test(m)) return 'Código o clave incorrectos. Si es tu primera vez, esa clave quedará registrada.';
  if(/already registered/i.test(m)) return 'Ese código ya tiene una clave. Escribe la clave que creaste.';
  return m;
}
async function afterLogin(){
  const { data:p } = await sb.from('bootcamp_pc_profiles').select('*').eq('id', session.user.id).single();
  profile=p;
  if(profile && profile.rol==='admin'){ window.location.href='admin.html'; return; }
  await loadAll();
  $('#login').classList.add('hidden'); $('#app').style.display='flex';
  $('#user-chip').textContent = (profile&&profile.codigo) || $('#in-code').value.trim().toUpperCase();
  current = (profile&&profile.modulo_actual) || 'perfil';
  buildNav(); renderModule(current);
}
async function loadAll(){
  data={};
  const { data:rows } = await sb.from('bootcamp_pc_responses').select('module_key,data').eq('user_id', session.user.id);
  (rows||[]).forEach(r=> data[r.module_key]=r.data||{});
  data.perfil = Object.assign({nombre:profile?.nombre||'',edad:profile?.edad||'',contacto:profile?.contacto||'',municipio:profile?.municipio||''}, data.perfil||{});
}
function buildNav(){
  const c=$('#nav-inner'); c.innerHTML='';
  [1,2].forEach(day=>{
    const h=document.createElement('div'); h.className='day';
    h.textContent = day===1 ? 'Día 1 · El emprendedor' : 'Día 2 · De la idea al pitch';
    c.appendChild(h);
    MODULES.filter(m=>m.day===day).forEach(m=>{
      const b=document.createElement('button'); b.dataset.key=m.key;
      b.innerHTML=`<span class="dot"></span><span class="n-ic">${m.icon}</span><span>${m.title}</span>`;
      if(isDone(m.key)) b.classList.add('done');
      if(m.key===current) b.classList.add('active');
      b.onclick=()=>{ renderModule(m.key); $('#nav-inner').classList.remove('open'); };
      c.appendChild(b);
    });
  });
  updateProgress();
}
function cellHas(x){ if(!x) return false; if(typeof x==='string') return !!x.trim(); if(typeof x==='object') return Object.values(x).some(y=>y&&String(y).trim()); return !!String(x).trim(); }
function isDone(key){ const d=data[key]; if(!d) return false; return Object.values(d).some(v=> Array.isArray(v)? v.some(cellHas) : (v&&String(v).trim())); }
function updateProgress(){
  const done = MODULES.filter(m=>isDone(m.key)).length, pct=Math.round(done/MODULES.length*100);
  $('#prog-pct').textContent=pct+'%';
  const C=119; $('#prog-ring').style.strokeDashoffset = C - C*done/MODULES.length;
  $('#prog-label').textContent = `${done} de ${MODULES.length} módulos completados`;
  $('#prog-title').textContent = pct===100?'¡Recorrido completo! 🎉':(pct>0?'Vas avanzando':'Tu recorrido');
  document.querySelectorAll('.nav-inner button').forEach(b=>{ if(b.dataset.key) b.classList.toggle('done', isDone(b.dataset.key)); });
}
function val(mod,k){ return (data[mod]&&data[mod][k]); }
function setVal(mod,k,v){ data[mod]=data[mod]||{}; data[mod][k]=v; queueSave(mod); updateProgress(); }
function renderModule(key){
  current=key;
  const m=MODULES.find(x=>x.key===key);
  document.querySelectorAll('.nav-inner button').forEach(b=>b.classList.toggle('active', b.dataset.key===key));
  if(profile) sb.from('bootcamp_pc_profiles').update({modulo_actual:key, updated_at:new Date()}).eq('id',session.user.id);
  const c=$('#content'); c.innerHTML=''; c.classList.remove('view-anim'); void c.offsetWidth; c.classList.add('view-anim');
  const head=document.createElement('div');
  head.innerHTML=`<div class="mod-banner"><div class="mb-emblem"><svg><use href="#leaf"/></svg></div>
      <div><div class="kicker">${m.kicker}</div><h2>${m.icon} ${m.title}</h2></div>
      <svg class="leafwm"><use href="#leaf"/></svg></div><p class="intro">${m.intro}</p>`;
  c.appendChild(head);
  const card=document.createElement('div'); card.className='card';
  m.fields.forEach(f=> card.appendChild(renderField(m.key,f)));
  c.appendChild(card);
  if(m.ai) c.appendChild(renderAI(m));
  const idx=MODULES.findIndex(x=>x.key===key);
  const nb=document.createElement('div'); nb.className='navbtns';
  const prev=document.createElement('button'); prev.className='btn btn-ghost'; prev.textContent='← Anterior';
  prev.disabled=idx===0; prev.onclick=()=>renderModule(MODULES[idx-1].key);
  const next=document.createElement('button'); next.className='btn btn-primary';
  next.textContent = idx===MODULES.length-1 ? '¡Terminé! 🎉' : 'Siguiente →';
  next.onclick=()=>{ if(idx<MODULES.length-1) renderModule(MODULES[idx+1].key); };
  nb.appendChild(prev); nb.appendChild(next); c.appendChild(nb);
  window.scrollTo({top:0,behavior:'smooth'});
}
function renderField(mod,f){
  const wrap=document.createElement('div'); wrap.style.marginBottom='20px';
  if(f.label){ const l=document.createElement('div'); l.className='q-label'; l.textContent=f.label; wrap.appendChild(l); }
  if(f.hint){ const h=document.createElement('div'); h.className='q-hint'; h.textContent=f.hint; wrap.appendChild(h); }
  if(f.t==='text'){
    const i=document.createElement('input'); i.className='inp'; i.type='text'; i.value=val(mod,f.k)||'';
    i.oninput=()=>setVal(mod,f.k,i.value); wrap.appendChild(i);
  } else if(f.t==='textarea'){
    const ta=document.createElement('textarea'); ta.className='inp'; if(f.big) ta.style.minHeight='150px';
    ta.value=val(mod,f.k)||''; ta.oninput=()=>setVal(mod,f.k,ta.value); wrap.appendChild(ta);
  } else if(f.t==='list'){
    let cur=val(mod,f.k); if(!Array.isArray(cur)){ cur=new Array(f.n).fill(''); data[mod]=data[mod]||{}; data[mod][f.k]=cur; }
    for(let i=0;i<f.n;i++){
      const row=document.createElement('div'); row.className='list-row';
      const num=document.createElement('div'); num.className='list-num'; num.textContent=i+1;
      const inp=document.createElement('input'); inp.className='inp'; inp.type='text'; inp.value=cur[i]||'';
      inp.oninput=()=>{ cur[i]=inp.value; setVal(mod,f.k,cur); };
      row.appendChild(num); row.appendChild(inp); wrap.appendChild(row);
    }
  } else if(f.t==='fixedtable'){
    let cur=val(mod,f.k); if(!Array.isArray(cur)){ cur=f.rows.map(()=>({})); data[mod]=data[mod]||{}; data[mod][f.k]=cur; }
    const tbl=document.createElement('div'); tbl.className='ptable';
    f.rows.forEach((rname,ri)=>{
      const pr=document.createElement('div'); pr.className='prow';
      const t=document.createElement('div'); t.className='rt'; t.textContent=rname; pr.appendChild(t);
      f.cols.forEach((col,ci)=>{
        const rc=document.createElement('div'); rc.className='rc';
        const s=document.createElement('small'); s.textContent=col;
        const ta=document.createElement('textarea'); ta.className='inp'; ta.style.minHeight='56px';
        ta.value=(cur[ri]&&cur[ri]['c'+ci])||'';
        ta.oninput=()=>{ cur[ri]=cur[ri]||{}; cur[ri]['c'+ci]=ta.value; setVal(mod,f.k,cur); };
        rc.appendChild(s); rc.appendChild(ta); pr.appendChild(rc);
      });
      tbl.appendChild(pr);
    });
    wrap.appendChild(tbl);
  } else if(f.t==='table'){
    let cur=val(mod,f.k); if(!Array.isArray(cur)||!cur.length){ cur=[]; for(let i=0;i<(f.min||1);i++) cur.push({}); data[mod]=data[mod]||{}; data[mod][f.k]=cur; }
    const tbl=document.createElement('div'); tbl.className='ptable';
    function draw(){
      tbl.innerHTML='';
      cur.forEach((row,ri)=>{
        const pr=document.createElement('div'); pr.className='prow';
        const t=document.createElement('div'); t.className='rt'; t.textContent='Acción '+(ri+1); pr.appendChild(t);
        f.cols.forEach((col,ci)=>{
          const rc=document.createElement('div'); rc.className='rc';
          const s=document.createElement('small'); s.textContent=col;
          const inp=document.createElement('input'); inp.className='inp'; inp.value=row['c'+ci]||'';
          inp.oninput=()=>{ row['c'+ci]=inp.value; setVal(mod,f.k,cur); };
          rc.appendChild(s); rc.appendChild(inp); pr.appendChild(rc);
        });
        tbl.appendChild(pr);
      });
      const add=document.createElement('button'); add.className='addrow'; add.textContent='+ Agregar otra acción';
      add.onclick=()=>{ cur.push({}); setVal(mod,f.k,cur); draw(); };
      tbl.appendChild(add);
    }
    draw(); wrap.appendChild(tbl);
  }
  return wrap;
}
function renderAI(m){
  const box=document.createElement('div'); box.className='ai-box';
  box.innerHTML=`<h4>🤖 Asistente Claude</h4><p class="desc">La inteligencia artificial usa lo que escribiste para darte ideas. Copia lo que te sirva a tus respuestas.</p>`;
  const btn=document.createElement('button'); btn.className='btn-ai'; btn.textContent='✨ '+m.ai.label;
  const out=document.createElement('div'); out.className='ai-out';
  const copy=document.createElement('button'); copy.className='ai-copy hidden'; copy.textContent='📋 Copiar';
  copy.onclick=()=>{ navigator.clipboard.writeText(out.textContent); copy.textContent='✓ Copiado'; setTimeout(()=>copy.textContent='📋 Copiar',1500); };
  btn.onclick=async()=>{
    btn.disabled=true; btn.textContent='Pensando...'; out.classList.add('show'); out.textContent='Claude está pensando en tu idea...';
    const p=m.ai.build(data[m.key]||{}, data);
    try{ const txt=await askClaude(p.system,p.user); out.textContent=txt; copy.classList.remove('hidden'); }
    catch(e){ out.textContent='No se pudo conectar con el asistente. '+(e.message||''); }
    btn.disabled=false; btn.textContent='✨ '+m.ai.label;
  };
  box.appendChild(btn); box.appendChild(out); box.appendChild(copy);
  return box;
}
async function askClaude(system,user){
  const token=session?.access_token;
  const res=await fetch(cfg.CLAUDE_PROXY_URL,{ method:'POST',
    headers:{ 'content-type':'application/json','apikey':cfg.SUPABASE_ANON_KEY,'authorization':'Bearer '+token },
    body: JSON.stringify({ system, messages:[{role:'user',content:user}], max_tokens:900 }) });
  const j=await res.json();
  if(!res.ok || j.error) throw new Error(j.error||('HTTP '+res.status));
  return j.text;
}
function queueSave(mod){ clearTimeout(saveTimer); saveTimer=setTimeout(()=>saveModule(mod),800); }
async function saveModule(mod){
  if(!session) return;
  try{
    await sb.from('bootcamp_pc_responses').upsert({ user_id:session.user.id, module_key:mod, data:data[mod]||{}, updated_at:new Date() }, { onConflict:'user_id,module_key' });
    if(mod==='perfil'){
      const d=data.perfil||{};
      await sb.from('bootcamp_pc_profiles').update({ nombre:d.nombre, edad:d.edad, contacto:d.contacto, municipio:d.municipio, updated_at:new Date() }).eq('id', session.user.id);
      $('#user-chip').textContent = profile?.codigo || $('#user-chip').textContent;
    }
    flashSaved();
  }catch(e){ console.error(e); }
}
function flashSaved(){ const f=$('#save-flag'); f.classList.add('show'); setTimeout(()=>f.classList.remove('show'),1200); }
$('#btn-login').onclick=login;
$('#in-pin').addEventListener('keydown',e=>{ if(e.key==='Enter') login(); });
$('#btn-logout').onclick=async()=>{ await sb.auth.signOut(); location.reload(); };
$('#nav-toggle').onclick=()=>$('#nav-inner').classList.toggle('open');
(async function(){
  if(!initSb()) return;
  const { data:{session:s} } = await sb.auth.getSession();
  if(s){ session=s; await afterLogin(); }
})();
