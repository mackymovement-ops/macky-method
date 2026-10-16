(()=>{
const data=window.MACKY_DATA;if(!data)return;
const imgs=data.slides;let index=0;
const byId=id=>document.getElementById(id);
const main=byId('current-slide');const previous=byId('previous');const next=byId('next');
const label=byId('slide-label'),count=byId('slide-count'),bar=byId('slide-progress'),thumbs=byId('thumbnail-track');
const swipeView=byId('swipe-view'),allView=byId('all-view');
const modes=[byId('mode-swipe'),byId('mode-all')];
function navigate(n){index=Math.max(0,Math.min(imgs.length-1,n));let item=imgs[index];main.src='../assets/slides/'+item.src;main.alt=`Slide ${index+1} of ${imgs.length}: ${item.title}`;label.textContent=item.title;count.textContent=`${String(index+1).padStart(2,'0')} / ${String(imgs.length).padStart(2,'0')}`;bar.style.width=((index+1)/imgs.length*100)+'%';previous.disabled=index===0;next.disabled=index===imgs.length-1;[...thumbs.children].forEach((b,i)=>{b.classList.toggle('is-active',i===index);b.setAttribute('aria-current',i===index?'true':'false')}); const active=thumbs.children[index];if(active&&index!==0)active.scrollIntoView({block:'nearest',inline:'nearest',behavior:'smooth'});}
function setMode(mode){const all=mode==='all';swipeView.classList.toggle('is-hidden',all);allView.classList.toggle('is-hidden',!all);modes[0].classList.toggle('active',!all);modes[1].classList.toggle('active',all);modes[0].setAttribute('aria-pressed',String(!all));modes[1].setAttribute('aria-pressed',String(all));}
imgs.forEach((s,i)=>{let b=document.createElement('button');b.type='button';b.className='thumb';b.setAttribute('aria-label',`Go to slide ${i+1}: ${s.title}`);b.innerHTML=`<img src="../assets/slides/${s.src}" alt="" ${i>5?'loading="lazy"':''}>`;b.addEventListener('click',()=>navigate(i));thumbs.appendChild(b); let fig=document.createElement('figure');fig.className='all-slide';fig.innerHTML=`<img loading="lazy" src="../assets/slides/${s.src}" alt="Slide ${i+1}: ${s.title}"><figcaption><b>${String(i+1).padStart(2,'0')}</b>${s.title}</figcaption>`;allView.appendChild(fig)});
previous.addEventListener('click',()=>navigate(index-1));next.addEventListener('click',()=>navigate(index+1));
modes[0].addEventListener('click',()=>setMode('swipe'));modes[1].addEventListener('click',()=>setMode('all'));
document.addEventListener('keydown',e=>{if(!swipeView.classList.contains('is-hidden')&&['ArrowRight','ArrowLeft'].includes(e.key)&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)){e.preventDefault();navigate(index+(e.key==='ArrowRight'?1:-1))}});
let x0=null;let y0=null;main.addEventListener('touchstart',e=>{x0=e.changedTouches[0].screenX;y0=e.changedTouches[0].screenY},{passive:true});main.addEventListener('touchend',e=>{if(x0===null)return;let dx=e.changedTouches[0].screenX-x0;let dy=e.changedTouches[0].screenY-y0;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.25)navigate(index+(dx<0?1:-1));x0=null;y0=null},{passive:true});
const msg=encodeURIComponent(`Hi, I've read the Macky Movement Method ${data.region==='local'?'South African':'international'} presentation. I'm interested in online coaching. Can you please help me get started?`);
document.querySelectorAll('[data-contact]').forEach(a=>a.href=`https://wa.me/27797827680?text=${msg}`);
const cssTitle=byId('variant-title');if(cssTitle)cssTitle.textContent=data.region==='local'?'South African coaching':'International coaching';
navigate(0);setMode('swipe');
})();
