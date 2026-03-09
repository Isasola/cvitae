/* ─── STATE ─── */
var S={contents:{},fmt:'latam',plan:'basic',hasPhoto:false,photoData:null};
var FL={latam:'Paraguay/Latam',europass:'Europass',usa:'USA Resume',academico:'Academico'};

/* ─── ACENTO ─── */
var ACCENTS={
  gold:{g:'#c9a84c',g2:'#e8c97a',t:'#0d5c63',t2:'#0a7d87',r:'#c24b2a'},
  teal:{g:'#0d5c63',g2:'#0a7d87',t:'#c9a84c',t2:'#e8c97a',r:'#c24b2a'},
  rust:{g:'#c24b2a',g2:'#e06040',t:'#0d5c63',t2:'#0a7d87',r:'#c9a84c'}
};
function setAccent(a){
  var ac=ACCENTS[a]||ACCENTS.gold;
  var r=document.documentElement.style;
  r.setProperty('--gold',ac.g);r.setProperty('--gold2',ac.g2);
  r.setProperty('--teal',ac.t);r.setProperty('--teal2',ac.t2);
  r.setProperty('--gold-rgb',hexToRgb(ac.g));
  r.setProperty('--grad-gold','linear-gradient(135deg,'+ac.g+','+ac.g2+','+darken(ac.g)+')');
  document.querySelectorAll('.acc-btn').forEach(function(b){b.classList.toggle('on',b.dataset.a===a);});
  try{localStorage.setItem('cvAccent',a);}catch(e){}
}
function hexToRgb(h){
  var r=parseInt(h.slice(1,3),16),g=parseInt(h.slice(3,5),16),b=parseInt(h.slice(5,7),16);
  return r+','+g+','+b;
}
function darken(h){
  var r=Math.max(0,parseInt(h.slice(1,3),16)-30).toString(16).padStart(2,'0');
  var g=Math.max(0,parseInt(h.slice(3,5),16)-30).toString(16).padStart(2,'0');
  var b=Math.max(0,parseInt(h.slice(5,7),16)-30).toString(16).padStart(2,'0');
  return '#'+r+g+b;
}

/* ─── TEMA ─── */
function setTheme(t){
  t==='dark'?document.documentElement.classList.add('dark'):document.documentElement.classList.remove('dark');
  document.getElementById('btnD').classList.toggle('on',t==='dark');
  document.getElementById('btnL').classList.toggle('on',t==='light');
  try{localStorage.setItem('cvTheme',t);}catch(e){}
}
(function(){
  var t='light',a='gold';
  try{
    t=localStorage.getItem('cvTheme')||(window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');
    a=localStorage.getItem('cvAccent')||'gold';
  }catch(e){}
  setTheme(t);setAccent(a);
})();
document.getElementById('btnD').addEventListener('click',function(){setTheme('dark');});
document.getElementById('btnL').addEventListener('click',function(){setTheme('light');});
document.querySelectorAll('.acc-btn').forEach(function(b){b.addEventListener('click',function(){setAccent(b.dataset.a);});});

/* ─── FORMAT SELECTOR ─── */
document.querySelectorAll('#fmtSel .fmt-btn').forEach(function(b){
  b.addEventListener('click',function(){
    document.querySelectorAll('#fmtSel .fmt-btn').forEach(function(x){x.classList.remove('on');});
    b.classList.add('on');S.fmt=b.dataset.f;
  });
});

/* ─── TOAST ─── */
var _tt;
function toast(msg,dur){
  var el=document.getElementById('toast');
  document.getElementById('toastMsg').textContent=msg;
  el.classList.add('show');clearTimeout(_tt);
  _tt=setTimeout(function(){el.classList.remove('show');},dur||2800);
}

/* ─── VALIDACION ─── */
function setErr(fid,eid,show){
  var f=document.getElementById(fid),e=document.getElementById(eid);
  if(f)f.classList.toggle('err',show);if(e)e.classList.toggle('show',show);
}
function clearErrs(){
  document.querySelectorAll('.ferr').forEach(function(e){e.classList.remove('show');});
  document.querySelectorAll('.err').forEach(function(e){e.classList.remove('err');});
}

/* ─── PASOS ─── */
function goStep(n){
  clearErrs();
  if(n===2){
    var ok=true;
    if(!document.getElementById('fname').value.trim()){setErr('fname','e-fname',true);ok=false;}
    if(!document.getElementById('fprof').value.trim()){setErr('fprof','e-fprof',true);ok=false;}
    if(!ok)return;
  }
  document.getElementById('s1').classList.remove('active');
  document.getElementById('s2').classList.remove('active');
  hideAll();
  if(n<=2)document.getElementById('s'+n).classList.add('active');
  [1,2,3].forEach(function(i){
    var s=document.getElementById('p'+i);
    s.classList.remove('active','done');
    if(i<n)s.classList.add('done');
    if(i===n)s.classList.add('active');
  });
}
function hideAll(){
  ['aiLoad','cvResult','payStep','waitDiv'].forEach(function(id){
    var el=document.getElementById(id);
    if(el){el.style.display='';el.classList.remove('show');}
  });
}

/* ─── FOTO ─── */
function togglePhoto(v){
  S.hasPhoto=v;
  document.getElementById('btnNF').classList.toggle('on',!v);
  document.getElementById('btnCF').classList.toggle('on',v);
  document.getElementById('photoZone').classList.toggle('show',v);
}
function handlePhoto(e){
  var f=e.target.files[0];if(!f)return;
  if(f.size>5*1024*1024){toast('Foto muy grande. Max 5MB.');return;}
  var r=new FileReader();
  r.onload=function(ev){S.photoData=ev.target.result;var p=document.getElementById('photoPreview');p.src=S.photoData;p.style.display='block';};
  r.readAsDataURL(f);
}

/* ─── LIMIT ─── */
function getCount(){try{return parseInt(localStorage.getItem('cvPrev')||'0');}catch(e){return 0;}}
function incCount(){try{localStorage.setItem('cvPrev',getCount()+1);}catch(e){}}
function checkLimit(){if(getCount()>=3){toast('Ya usaste tus 3 previews. Compra tu CV!',5000);setTimeout(showPayment,1800);return false;}return true;}

/* ─── PROMPT ─── */
function buildPrompt(fmt){
  var name=document.getElementById('fname').value.trim();
  var prof=document.getElementById('fprof').value.trim();
  var exp=document.getElementById('fexp').value;
  var expt=document.getElementById('fexptext').value.trim();
  var edu=document.getElementById('fedu').value.trim();
  var cert=document.getElementById('fcerts').value.trim();
  var ski=document.getElementById('fskills').value.trim();
  var job=document.getElementById('fjob').value.trim();
  var jd=document.getElementById('fjobdesc').value.trim();

  var fi={
    latam:'Paraguay/Latinoamerica: datos personales completos, perfil objetivo, experiencia con logros cuantificados, educacion, certificaciones, habilidades por categoria, referencias disponibles.',
    europass:'Europass europeo: competencias digitales y linguisticas destacadas, cronologico inverso, perfil por competencias, sin foto.',
    usa:'USA Resume: maximo impacto en 1 pagina, Summary ejecutivo, logros con numeros y porcentajes, verbos de accion fuertes, sin datos personales como edad.',
    academico:'CV Academico: publicaciones, investigaciones, congresos, becas, docencia, produccion cientifica detallada.'
  };

  return 'Sos un headhunter senior con 20 anos de experiencia reclutando talento en Paraguay y Latinoamerica para empresas multinacionales. Tu especialidad es crear CVs que pasan filtros ATS y generan entrevistas.\n\n'+
    'CANDIDATO:\n'+
    'Nombre: '+name+'\nProfesion: '+prof+'\nExperiencia: '+(exp||'No especificado')+'\nDetalle: '+(expt||'No especificado')+
    '\nFormacion: '+(edu||'No especificada')+'\nCertificados: '+(cert||'No especificados')+
    '\nHabilidades: '+(ski||'No especificadas')+'\nFoto: '+(S.hasPhoto?'SI - el candidato adjuntara su foto':'NO - no incluir placeholder de foto')+'\n\n'+
    'PUESTO OBJETIVO: '+job+'\n'+(jd?'DESCRIPCION DEL PUESTO:\n'+jd+'\n':'')+'\n'+
    'FORMATO: '+fi[fmt]+'\n\n'+
    'GENERA EL CV EN HTML usando EXACTAMENTE estas clases (ya definidas en la pagina).\n'+
    'Responde SOLO con el HTML, sin explicaciones ni bloques de codigo.\n\n'+
    '<div class="cv-doc">\n'+
    '  <div class="cvh-stripe"></div>\n'+
    '  <div class="cvh-grid">\n'+
    '    <div>\n'+
    '      <div class="cvh-name">NOMBRE COMPLETO</div>\n'+
    '      <div class="cvh-title">TITULO EXACTO DEL PUESTO AL QUE APLICA</div>\n'+
    '    </div>\n'+
    '    [SI TIENE FOTO: <div class="cvh-photo"><img src="[FOTO]" alt="foto"></div>]\n'+
    '    [SI NO TIENE FOTO: omitir el div cvh-photo]\n'+
    '  </div>\n'+
    '  <div class="cvh-contacts">\n'+
    '    <span class="cvh-c"><i class="fas fa-envelope"></i> email@plausible.com</span>\n'+
    '    <span class="cvh-c"><i class="fas fa-phone"></i> +595 9XX XXX XXX</span>\n'+
    '    <span class="cvh-c"><i class="fas fa-map-marker-alt"></i> Asuncion, Paraguay</span>\n'+
    '    <span class="cvh-c"><i class="fab fa-linkedin"></i> linkedin.com/in/nombre</span>\n'+
    '  </div>\n'+
    '  <div class="cvs">\n'+
    '    <div class="cvs-label">Perfil Profesional</div>\n'+
    '    <div class="cvs-text">[5-6 oraciones impactantes, con keywords EXACTAS del aviso, logros concretos, valor diferencial]</div>\n'+
    '  </div>\n'+
    '  <div class="cvdiv"></div>\n'+
    '  <div class="cvs">\n'+
    '    <div class="cvs-label">Experiencia Profesional</div>\n'+
    '    <div class="cvb">\n'+
    '      <div class="cvb-row"><div class="cvb-title">CARGO — EMPRESA</div><div class="cvb-period">MM/AAAA — Presente</div></div>\n'+
    '      <div class="cvb-sub">Rubro · Ciudad, Paraguay</div>\n'+
    '      <ul class="cvb-list"><li>Logro cuantificado con impacto</li><li>Responsabilidad clave 2</li><li>Competencia especifica del puesto 3</li><li>Resultado medible 4</li></ul>\n'+
    '    </div>\n'+
    '  </div>\n'+
    '  <div class="cvdiv"></div>\n'+
    '  <div class="cvs">\n'+
    '    <div class="cvs-label">Formacion Academica</div>\n'+
    '    <div class="cvb"><div class="cvb-row"><div class="cvb-title">TITULO</div><div class="cvb-period">Ano</div></div><div class="cvb-sub">Institucion · Ciudad</div></div>\n'+
    '  </div>\n'+
    '  <div class="cvdiv"></div>\n'+
    '  <div class="cvs"><div class="cvs-label">Certificaciones</div><div class="cv-tags">[cv-tag para cada certificado]</div></div>\n'+
    '  <div class="cvdiv"></div>\n'+
    '  <div class="cvs">\n'+
    '    <div class="cvs-label">Habilidades</div>\n'+
    '    <div class="cv-skills-grid">\n'+
    '      <div><div class="cv-skill-group-title">Tecnicas</div><div class="cv-tags">[cv-tag para cada una, min 5]</div></div>\n'+
    '      <div><div class="cv-skill-group-title">Blandas</div><div class="cv-tags">[cv-tag soft para cada una, min 5]</div></div>\n'+
    '    </div>\n'+
    '  </div>\n'+
    '  <div class="cvdiv"></div>\n'+
    '  <div class="cvs"><div class="cvs-label">Idiomas</div><div class="cv-langs">[cv-lang para cada idioma]</div></div>\n'+
    '</div>\n\n'+
    'REGLAS CRITICAS:\n'+
    '1. SOLO HTML, sin markdown, sin bloques de codigo, sin explicaciones.\n'+
    '2. JAMAS dejes campos [Entre corchetes] o vacios. Inventa datos plausibles y profesionales para Paraguay.\n'+
    '3. Keywords EXACTAS del aviso en el perfil y en los bullets de experiencia.\n'+
    '4. Minimo 4 bullets de experiencia detallados. Si hay poca info, expande con lo tipico del rubro en PY/Latam.\n'+
    '5. El titulo cvh-title debe ser el cargo EXACTO del puesto al que aplica.\n'+
    '6. CV-lang: formato: <span class="cv-lang"><strong>Espanol</strong> - Nativo</span>';
}

/* ─── GENERAR ─── */
function generateCV(){
  clearErrs();
  if(!document.getElementById('fjob').value.trim()){setErr('fjob','e-fjob',true);return;}
  if(!checkLimit())return;
  var all=document.getElementById('chkAll').checked;
  var fmts=all?['latam','europass','usa','academico']:[S.fmt];
  S.contents={};
  document.getElementById('s2').classList.remove('active');
  document.getElementById('aiLoad').style.display='block';
  var items=['ls1','ls2','ls3','ls4','ls5'],i=0;
  function anim(){
    if(i>=items.length){runGen(fmts);return;}
    var el=document.getElementById(items[i]);
    if(el){el.classList.add('done');el.querySelector('i').className='fas fa-check';el.querySelector('i').style.fontSize='.7rem';}
    i++;setTimeout(anim,560);
  }
  anim();
}

function runGen(fmts){
  if(fmts.length>1){document.getElementById('aiTitle').textContent='Generando '+fmts.length+' formatos...';document.getElementById('aiSub').textContent='Esto tarda un poco mas. Vale la pena.';}
  var i=0;
  function next(){
    if(i>=fmts.length){
      incCount();saveHist(S.contents);
      document.getElementById('aiLoad').style.display='none';
      renderResult(fmts);return;
    }
    var fmt=fmts[i];i++;
    fetch('/.netlify/functions/chat',{
      method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({prompt:buildPrompt(fmt)})
    })
    .then(function(res){
      if(res.status===429){S.contents[fmt]='<div class="cv-doc" style="padding:2rem;text-align:center;color:var(--muted)">Limite alcanzado. Compra tu CV para continuar.</div>';next();return;}
      if(!res.ok){S.contents[fmt]='<div class="cv-doc" style="padding:2rem;text-align:center;color:var(--muted)">Error '+res.status+'. Intenta de nuevo.</div>';next();return;}
      return res.json().then(function(d){
        var txt=(d.content&&d.content[0]&&d.content[0].text)||'';
        txt=txt.replace(/```html[\s\S]*?```/g,function(m){return m.replace(/```html\n?/,'').replace(/\n?```/,'');}).replace(/```/g,'').trim();
        if(S.hasPhoto&&S.photoData){txt=txt.replace('[FOTO]',S.hasPhoto?S.photoData:'');}
        S.contents[fmt]=txt||'<div class="cv-doc" style="padding:2rem;text-align:center;color:var(--muted)">Error procesando. Intenta de nuevo.</div>';
        next();
      });
    })
    .catch(function(){
      S.contents[fmt]='<div class="cv-doc" style="padding:2rem;text-align:center;color:var(--muted)">Error de conexion. Verifica tu internet.</div>';
      next();
    });
  }
  next();
}

/* ─── RENDER RESULTADO ─── */
function renderResult(fmts){
  var tabs=document.getElementById('fmtTabs');
  var panels=document.getElementById('fmtPanels');
  tabs.innerHTML='';panels.innerHTML='';
  fmts.forEach(function(fmt,idx){
    var tab=document.createElement('button');
    tab.type='button';tab.className='fmt-tab'+(idx===0?' on':'');
    tab.textContent=FL[fmt];tab.dataset.f=fmt;
    tab.addEventListener('click',function(){switchTab(fmt);});
    tabs.appendChild(tab);

    var panel=document.createElement('div');
    panel.className='fmt-panel'+(idx===0?' on':'');
    panel.id='fp-'+fmt;
    var html=S.contents[fmt]||'';
    panel.innerHTML=
      '<div class="cv-wrap">'+
        '<div class="cv-wm">PREVIEW</div>'+
        html+
        '<div class="cv-fade"></div>'+
        '<div class="cv-unlock">'+
          '<button onclick="showPayment()" type="button" class="btn btn-ink" style="font-size:.78rem;padding:.55rem 1.4rem;border-radius:3px;box-shadow:0 4px 24px rgba(10,10,15,.4)">'+
            '<i class="fas fa-lock-open"></i> Desbloquear PDF sin marca de agua'+
          '</button>'+
        '</div>'+
      '</div>';
    panels.appendChild(panel);
  });
  S.activeFmt=fmts[0];
  var r=document.getElementById('cvResult');
  r.style.display='block';r.classList.add('show');
  renderHist();
}

function switchTab(fmt){
  S.activeFmt=fmt;
  document.querySelectorAll('.fmt-tab').forEach(function(t){t.classList.toggle('on',t.dataset.f===fmt);});
  document.querySelectorAll('.fmt-panel').forEach(function(p){p.classList.toggle('on',p.id==='fp-'+fmt);});
}

/* ─── HISTORIAL ─── */
function saveHist(c){
  try{
    var h=JSON.parse(localStorage.getItem('cvHist')||'[]');
    var k=Object.keys(c)[0];
    var prev=c[k].replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim().substring(0,80)+'...';
    h.unshift({p:prev,c:c,d:new Date().toLocaleString('es-PY')});
    if(h.length>5)h.pop();
    localStorage.setItem('cvHist',JSON.stringify(h));
  }catch(e){}
}
function renderHist(){
  try{
    var h=JSON.parse(localStorage.getItem('cvHist')||'[]');
    var el=document.getElementById('histList');if(!el)return;
    if(!h.length){el.innerHTML='<div style="font-size:.72rem;color:var(--muted);text-align:center;padding:.4rem">Sin historial</div>';return;}
    el.innerHTML=h.map(function(item,i){
      return '<div class="hist-item"><span>'+item.p+'</span><button onclick="loadHist('+i+')" type="button">Ver</button></div>';
    }).join('');
  }catch(e){}
}
function loadHist(i){
  try{
    var h=JSON.parse(localStorage.getItem('cvHist')||'[]');
    if(h[i]&&h[i].c){S.contents=h[i].c;renderResult(Object.keys(h[i].c));}
  }catch(e){}
}

/* ─── WA SHARE ─── */
function shareWA(){
  var c=S.contents[S.activeFmt]||'';
  if(!c){toast('Primero genera tu CV');return;}
  var plain=c.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim().substring(0,380);
  window.open('https://wa.me/?text='+encodeURIComponent('Mira el CV que genere con CVitae:\n\n'+plain+'...\n\nhttps://cvitaeglobal.netlify.app'),'_blank');
}

/* ─── PAGO ─── */
function showPayment(){
  document.getElementById('cvResult').style.display='none';
  var p=document.getElementById('payStep');p.style.display='block';p.classList.add('show');
  p.scrollIntoView({behavior:'smooth',block:'start'});
}
function selPlan(plan){
  S.plan=plan;
  document.getElementById('pp-basic').classList.toggle('sel',plan==='basic');
  document.getElementById('pp-pro').classList.toggle('sel',plan==='pro');
}
function confirmPay(){
  var lbl=S.plan==='basic'?'CV Digital — 50.000 Gs':'Portafolio Web — 120.000 Gs';
  var name=document.getElementById('fname').value||'cliente';
  var job=document.getElementById('fjob').value||'puesto indicado';
  var wa=document.getElementById('fwa').value||'no indicado';
  var msg='Hola! Acabo de pagar el plan '+lbl+'.\n\nNombre: '+name+'\nPuesto: '+job+'\nMi WhatsApp: '+wa+'\n\nTe mando el comprobante ahora!';
  window.open('https://wa.me/595992954169?text='+encodeURIComponent(msg),'_blank');
  document.getElementById('payStep').style.display='none';
  var w=document.getElementById('waitDiv');w.style.display='block';w.classList.add('show');
}

/* ─── COPY ─── */
function copyText(t,msg){
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(t).then(function(){toast(msg||'Copiado');}).catch(function(){fbCopy(t,msg);});
  }else{fbCopy(t,msg);}
}
function fbCopy(t,msg){
  var ta=document.createElement('textarea');ta.value=t;ta.style.cssText='position:fixed;top:-999px;opacity:0';
  document.body.appendChild(ta);ta.select();
  try{document.execCommand('copy');toast(msg||'Copiado');}catch(e){toast('Copia manualmente: '+t,5000);}
  document.body.removeChild(ta);
}

/* ─── FAQ ─── */
function toggleFaq(el){
  var item=el.parentElement;var open=item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(function(i){i.classList.remove('open');});
  if(!open)item.classList.add('open');
}

/* ─── SCROLL ─── */
document.querySelectorAll('a[href^="#"]').forEach(function(a){
  a.addEventListener('click',function(e){
    var t=document.querySelector(a.getAttribute('href'));
    if(t){e.preventDefault();window.scrollTo({top:t.offsetTop-64,behavior:'smooth'});}
  });
});

/* ─── FADE IN ─── */
(function(){
  var els=document.querySelectorAll('.fi');
  if('IntersectionObserver' in window){
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){if(e.isIntersecting)e.target.classList.add('vis');});
    },{threshold:0.04,rootMargin:'0px 0px -16px 0px'});
    els.forEach(function(el){obs.observe(el);});
  }else{
    els.forEach(function(el){el.classList.add('vis');});
  }
})();

/* ─── ADMIN PANEL ─── */
(function(){
  if(window.location.hash==='#admin'||window.location.search.indexOf('admin')>-1){
    showAdminPanel();
  }
})();

var ADMIN_PW_LOCAL='';

function showAdminPanel(){
  var overlay=document.createElement('div');
  overlay.id='adminOverlay';
  overlay.style.cssText='position:fixed;inset:0;z-index:99999;background:var(--paper);overflow-y:auto;font-family:Outfit,sans-serif';
  overlay.innerHTML=`
  <div style="max-width:900px;margin:0 auto;padding:2rem 1.5rem">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:2rem;border-bottom:1px solid var(--border);padding-bottom:1rem">
      <div style="font-family:Playfair Display,serif;font-size:1.4rem;font-weight:900;color:var(--ink)">CV<em style="color:var(--gold);font-style:italic">itae</em> — Admin</div>
      <button onclick="document.getElementById('adminOverlay').remove()" style="background:transparent;border:1px solid var(--border);color:var(--muted);padding:.4rem 1rem;border-radius:3px;cursor:pointer;font-family:inherit">Cerrar</button>
    </div>
    <div id="adminLogin">
      <div style="max-width:340px;margin:3rem auto;background:var(--offwhite);border:1.5px solid var(--border);border-radius:6px;padding:2rem">
        <div style="font-size:.85rem;color:var(--muted);margin-bottom:1rem">Contraseña admin</div>
        <input type="password" id="adminPwInput" placeholder="Contraseña" style="width:100%;background:var(--paper);border:1.5px solid var(--border);border-radius:3px;padding:.7rem 1rem;color:var(--ink);font-family:inherit;font-size:.9rem;outline:none;margin-bottom:.8rem" onkeydown="if(event.key==='Enter')adminLogin()">
        <button onclick="adminLogin()" style="width:100%;padding:.8rem;background:var(--ink);color:var(--paper);border:none;border-radius:3px;font-family:inherit;font-weight:600;cursor:pointer">Entrar</button>
        <div id="adminLoginErr" style="display:none;color:#c24b2a;font-size:.75rem;text-align:center;margin-top:.5rem">Contraseña incorrecta</div>
      </div>
    </div>
    <div id="adminDash" style="display:none">
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-bottom:2rem" id="adminStats"></div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem">
        <div style="font-family:Playfair Display,serif;font-size:1.1rem;font-weight:700;color:var(--ink)">Pedidos</div>
        <button onclick="adminLoadOrders()" style="background:var(--grad-gold);color:var(--ink);border:none;padding:.4rem 1rem;border-radius:3px;font-family:inherit;font-size:.78rem;font-weight:600;cursor:pointer">Actualizar</button>
      </div>
      <div id="adminOrders"></div>
    </div>
  </div>`;
  document.body.appendChild(overlay);
}

function adminLogin(){
  var pw=document.getElementById('adminPwInput').value;
  ADMIN_PW_LOCAL=pw;
  adminCall('list').then(function(d){
    if(d.error){
      document.getElementById('adminLoginErr').style.display='block';
      ADMIN_PW_LOCAL='';
    }else{
      document.getElementById('adminLogin').style.display='none';
      document.getElementById('adminDash').style.display='block';
      adminRender(d.orders||[]);
    }
  });
}

function adminCall(action,extra){
  return fetch('/.netlify/functions/cvadmin',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(Object.assign({password:ADMIN_PW_LOCAL,action:action},extra||{}))
  }).then(function(r){return r.json();});
}

function adminLoadOrders(){
  adminCall('list').then(function(d){
    if(!d.error)adminRender(d.orders||[]);
  });
}

function adminRender(orders){
  var pending=orders.filter(function(o){return o.status==='pending';});
  var sent=orders.filter(function(o){return o.status==='sent';});
  document.getElementById('adminStats').innerHTML=
    '<div style="background:var(--offwhite);border:1.5px solid var(--border);border-radius:4px;padding:1.2rem"><div style="font-family:Playfair Display,serif;font-size:2rem;font-weight:900;color:var(--ink)">'+orders.length+'</div><div style="font-size:.68rem;text-transform:uppercase;letter-spacing:.1em;color:var(--muted)">Total</div></div>'+
    '<div style="background:var(--offwhite);border:1.5px solid var(--border);border-radius:4px;padding:1.2rem"><div style="font-family:Playfair Display,serif;font-size:2rem;font-weight:900;color:#c24b2a">'+pending.length+'</div><div style="font-size:.68rem;text-transform:uppercase;letter-spacing:.1em;color:var(--muted)">Pendientes</div></div>'+
    '<div style="background:var(--offwhite);border:1.5px solid var(--border);border-radius:4px;padding:1.2rem"><div style="font-family:Playfair Display,serif;font-size:2rem;font-weight:900;color:#1a7a4a">'+sent.length+'</div><div style="font-size:.68rem;text-transform:uppercase;letter-spacing:.1em;color:var(--muted)">Enviados</div></div>';

  if(!orders.length){
    document.getElementById('adminOrders').innerHTML='<div style="text-align:center;padding:3rem;color:var(--muted)">No hay pedidos aún</div>';
    return;
  }
  document.getElementById('adminOrders').innerHTML=orders.map(function(o){
    var date=new Date(o.createdAt).toLocaleString('es-PY',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'});
    var isPending=o.status==='pending';
    return '<div style="background:var(--offwhite);border:1.5px solid var(--border);border-left:3px solid '+(isPending?'#c24b2a':'#1a7a4a')+';border-radius:4px;padding:1rem 1.2rem;margin-bottom:.7rem;display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap">'+
      '<div>'+
        '<div style="font-size:.92rem;font-weight:600;color:var(--ink);margin-bottom:.2rem">'+o.name+'</div>'+
        '<div style="font-size:.72rem;color:var(--muted)">'+o.email+' · '+o.job+' · '+date+'</div>'+
      '</div>'+
      '<div style="display:flex;gap:.5rem;align-items:center">'+
        '<span style="font-size:.62rem;font-weight:700;text-transform:uppercase;padding:.2rem .7rem;border-radius:30px;background:'+(isPending?'rgba(194,75,42,.08)':'rgba(26,122,74,.08)')+';color:'+(isPending?'#c24b2a':'#1a7a4a')+';border:1px solid '+(isPending?'rgba(194,75,42,.2)':'rgba(26,122,74,.2)')+'">'+( isPending?'Pendiente':'Enviado')+'</span>'+
        (isPending?'<button onclick="adminApprove(\''+o.id+'\')" id="abtn-'+o.id+'" style="background:var(--ink);color:var(--paper);border:none;padding:.45rem 1rem;border-radius:3px;font-family:inherit;font-size:.75rem;font-weight:600;cursor:pointer">Aprobar y enviar</button>':'')+
        '<button onclick="adminDelete(\''+o.id+'\')" style="background:transparent;border:1px solid var(--border);color:var(--muted);padding:.45rem .7rem;border-radius:3px;font-family:inherit;font-size:.72rem;cursor:pointer">Borrar</button>'+
      '</div>'+
    '</div>';
  }).join('');
}

function adminApprove(id){
  var btn=document.getElementById('abtn-'+id);
  if(btn){btn.disabled=true;btn.textContent='Enviando...';}
  adminCall('approve',{orderId:id}).then(function(d){
    if(d.error){
      toast('Error: '+d.error);
      if(btn){btn.disabled=false;btn.textContent='Aprobar y enviar';}
    }else{
      toast('Email enviado!');
      adminLoadOrders();
    }
  });
}

function adminDelete(id){
  if(!confirm('Borrar este pedido?'))return;
  adminCall('delete',{orderId:id}).then(function(){adminLoadOrders();toast('Eliminado');});
}

renderHist();
