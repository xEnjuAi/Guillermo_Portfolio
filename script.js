// Routing by hash
var pages=['home','portfolio','contact','projects','pictures','documents'];
function route(){
  var h=(location.hash||'#home').slice(1);if(pages.indexOf(h)<0)h='home';
  pages.forEach(function(p){document.getElementById(p).classList.toggle('on',p===h)});
  document.querySelectorAll('.links a').forEach(function(a){a.classList.toggle('on',a.dataset.p===h)});
  window.scrollTo(0,0);if(h!=='pictures'&&window.clearPic)clearPic();
}
addEventListener('hashchange',route);route();

// Share the avatar between home and portfolio
document.getElementById('avatar2').src=document.getElementById('avatar').src;

// Carousels
document.querySelectorAll('[data-car]').forEach(function(c){
  var t=c.querySelector('.track'),n=t.children.length,d=c.querySelector('.dots'),i=0,tm;
  for(var k=0;k<n;k++){(function(k){var b=document.createElement('i');b.onclick=function(){go(k)};d.appendChild(b)})(k)}
  function go(x){i=(x+n)%n;t.style.transform='translateX(-'+i*100+'%)';
    [].forEach.call(d.children,function(e,j){e.classList.toggle('on',j===i)});reset()}
  function reset(){clearInterval(tm);tm=setInterval(function(){go(i+1)},4000)}
  c.querySelector('.prev').onclick=function(){go(i-1)};
  c.querySelector('.next').onclick=function(){go(i+1)};
  go(0);
});

// Contact form: sends straight to your inbox through Web3Forms (free)
// 1) Get a free access key at https://web3forms.com (enter romeoguillermoit10@gmail.com)
// 2) Paste it below. Until then, the form falls back to opening the visitor's email app.
var WEB3FORMS_KEY='1cf1f1b7-c8a7-40af-ae84-93bebd49b4ff';
(function(){
  var f=document.getElementById('cf'),btn=f.querySelector('button'),st=document.createElement('p');
  st.setAttribute('role','status');st.style.cssText='margin:0;min-height:1.4em';f.appendChild(st);
  f.addEventListener('submit',function(e){
    e.preventDefault();
    if(WEB3FORMS_KEY==='YOUR_ACCESS_KEY_HERE'){
      location.href='mailto:romeoguillermoit10@gmail.com?subject='+encodeURIComponent('Portfolio message from '+f.n.value)+'&body='+encodeURIComponent(f.m.value+'\n\n'+f.n.value+' ('+f.e.value+')');
      return;
    }
    btn.disabled=true;st.style.color='var(--muted)';st.textContent='Sending...';
    fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},
      body:JSON.stringify({access_key:WEB3FORMS_KEY,subject:'Portfolio message from '+f.n.value,name:f.n.value,email:f.e.value,message:f.m.value})})
    .then(function(r){return r.json()})
    .then(function(d){if(!d.success)throw new Error(d.message);st.style.color='#37f0a0';st.textContent='Message sent. Thank you!';f.reset()})
    .catch(function(){st.style.color='#ff7a7a';st.textContent='Could not send. Please email me directly.'})
    .finally(function(){btn.disabled=false});
  });
})();

// Picture albums
(function(){
  var figs=[].slice.call(document.querySelectorAll('.fig')),cur=0,
  bg=document.getElementById('bgblur'),vw=document.getElementById('viewer'),vi=document.getElementById('vimg'),
  cols=[['#1e3a8a','#4c1d95'],['#0c4a6e','#1e3a8a'],['#312e81','#0f172a'],['#164e63','#1e1b4b']];
  function ph(i){var c=cols[i%4];
    return 'data:image/svg+xml,'+encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='"+c[0]+"'/><stop offset='1' stop-color='"+c[1]+"'/></linearGradient></defs><rect width='400' height='300' fill='url(#g)'/><text x='200' y='150' fill='white' fill-opacity='.75' font-family='sans-serif' font-size='22' text-anchor='middle'>Add your picture</text></svg>");}
  figs.forEach(function(f,i){
    f._src=f.dataset.img||ph(i);
    f.innerHTML='<img alt="" loading="lazy"><span class="cap"><b></b><span></span></span>';
    f.querySelector('img').src=f._src;
    f.querySelector('b').textContent=f.dataset.title;
    f.querySelector('.cap span').textContent=f.dataset.desc;
    f.onclick=function(){show(i)};
  });
  function show(i){
    cur=(i+figs.length)%figs.length;var f=figs[cur];
    vi.src=f._src;vi.alt=f.dataset.title;
    document.getElementById('vtitle').textContent=f.dataset.title;
    document.getElementById('vdesc').textContent=f.dataset.desc;
    document.getElementById('valbum').textContent=f.closest('.album').querySelector('h2').firstChild.textContent.trim();
    bg.style.backgroundImage='url("'+f._src+'")';bg.classList.add('on');
    vw.hidden=false;document.body.style.overflow='hidden';
  }
  function close(){vw.hidden=true;document.body.style.overflow=''}
  window.clearPic=function(){close();bg.classList.remove('on')};
  vw.querySelector('.v-x').onclick=close;
  vw.querySelector('.v-p').onclick=function(){show(cur-1)};
  vw.querySelector('.v-nx').onclick=function(){show(cur+1)};
  vw.addEventListener('click',function(e){if(e.target===vw)close()});
  addEventListener('keydown',function(e){
    if(vw.hidden)return;
    if(e.key==='Escape')close();
    if(e.key==='ArrowLeft')show(cur-1);
    if(e.key==='ArrowRight')show(cur+1);
  });
})();

// Particle network background
(function(){
  var cv=document.getElementById('fx'),x=cv.getContext('2d'),P=[],W,H;
  function size(){W=cv.width=innerWidth;H=cv.height=innerHeight}
  size();addEventListener('resize',size);
  for(var i=0;i<50;i++)P.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3});
  if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  (function loop(){
    x.clearRect(0,0,W,H);
    P.forEach(function(p,a){
      p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
      x.fillStyle='rgba(77,163,255,.7)';x.fillRect(p.x,p.y,2,2);
      for(var b=a+1;b<P.length;b++){var q=P[b],dx=p.x-q.x,dy=p.y-q.y,d=dx*dx+dy*dy;
        if(d<16000){x.strokeStyle='rgba(77,163,255,'+(.18*(1-d/16000))+')';x.beginPath();x.moveTo(p.x,p.y);x.lineTo(q.x,q.y);x.stroke()}}
    });
    requestAnimationFrame(loop);
  })();
})();

// Album pagination: 2 rows per page, manual Prev / Next only
(function(){
  document.querySelectorAll('.album').forEach(function(al){
    var grid=al.querySelector('.grid'),items=[].slice.call(grid.children),
        count=al.querySelector('h2 small'),page=0,nav=document.createElement('div');
    nav.className='pager';
    nav.innerHTML='<button type="button" class="pg-prev" aria-label="Previous page">&#8249;</button><span class="pg-info"></span><button type="button" class="pg-next" aria-label="Next page">&#8250;</button>';
    al.appendChild(nav);
    function cols(){return matchMedia('(max-width:600px)').matches?2:matchMedia('(max-width:1000px)').matches?3:4}
    function render(){
      var pp=cols()*2,pages=Math.max(1,Math.ceil(items.length/pp));
      page=Math.min(page,pages-1);
      items.forEach(function(it,i){it.style.display=(i>=page*pp&&i<(page+1)*pp)?'':'none'});
      nav.style.display=pages>1?'':'none';
      nav.querySelector('.pg-info').textContent=(page+1)+' / '+pages;
      nav.querySelector('.pg-prev').disabled=page===0;  
      nav.querySelector('.pg-next').disabled=page===pages-1;
      if(count)count.textContent=items.length+(items.length===1?' item':' items');
    }
    function flip(d){
      if(grid._busy)return;
      grid._busy=true;
      grid.style.transition='opacity .22s ease, transform .22s ease';
      grid.style.opacity='0';
      grid.style.transform='translateX('+(-d*28)+'px)';
      setTimeout(function(){
        page+=d;render();
        grid.style.transition='none';
        grid.style.transform='translateX('+(d*28)+'px)';
        void grid.offsetWidth;
        grid.style.transition='opacity .3s ease, transform .3s ease';
        grid.style.opacity='1';
        grid.style.transform='none';
        setTimeout(function(){grid._busy=false},300);
      },220);
    }
    nav.querySelector('.pg-prev').onclick=function(){flip(-1)};
    nav.querySelector('.pg-next').onclick=function(){flip(1)};
    addEventListener('resize',render);
    render();
  });
})();

// Document tabs (Resume / Cover Letter)
document.querySelectorAll('.doc-tab').forEach(function(b){
  b.onclick=function(){
    document.querySelectorAll('.doc-tab').forEach(function(t){
      t.classList.toggle('on',t===b);
      t.setAttribute('aria-selected',t===b);
    });
    document.querySelectorAll('.doc-panel').forEach(function(p){
      p.classList.toggle('on',p.id==='doc-'+b.dataset.doc);
    });
  };
});