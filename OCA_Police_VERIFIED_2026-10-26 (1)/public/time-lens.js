/* Map Time Lens | visual time filter for existing room markers. No mutation of server data. */
(()=>{
  'use strict';
  const app="police";
  const viewport=document.getElementById("mapViewport");
  const layer=document.getElementById("markerLayer");
  if(!viewport||!layer)return;
  const maybePaths=document.getElementById("pathLayer");
  const root=document.createElement('section');
  root.className='map-time-lens';
  root.setAttribute('aria-label','Map marker time filter');
  root.innerHTML=`<div class="time-lens-top"><strong>◷ TIME FILTER</strong><button type="button" data-time-latest>NEWEST</button></div><output class="time-lens-clock" data-time-clock>NO MARKS YET</output><input aria-label="Select map marker time" type="range" min="0" max="1000" step="1" value="1000" data-time-slider><div class="time-lens-endpoints"><span data-time-start>OLDER</span><span data-time-end>NEWER</span></div><div class="time-lens-count" data-time-count>0 MARKS</div>`;
  viewport.append(root);
  const slider=root.querySelector('[data-time-slider]');
  const clock=root.querySelector('[data-time-clock]');
  const left=root.querySelector('[data-time-start]');
  const right=root.querySelector('[data-time-end]');
  const count=root.querySelector('[data-time-count]');
  const latest=root.querySelector('[data-time-latest]');
  let minimum=0,maximum=0,lastKey='';
  const clamp=(v,lo,hi)=>Math.min(hi,Math.max(lo,v));
  const isGood=t=>Number.isFinite(t)&&t>1000000000;
  const fmt=(t,short=false)=>{
    if(!isGood(t))return '--';
    try{return new Date(t).toLocaleString([],{month:'short',day:'numeric',hour:'numeric',minute:'2-digit'});}
    catch{return '--'}
  };
  function availableItems(){
    try{
      if(app==='ase')return (typeof annotations!=='undefined'&&Array.isArray(annotations))?annotations:[];
      return (typeof state!=='undefined')?(app==='border'?state.marks:state.items)||[]:[];
    }catch{return []}
  }
  function pairs(){
    const items=availableItems();
    const map=new Map();
    for(const item of items){
      const t=Number(item.time??item.ts??item.timestamp);
      if(isGood(t))map.set(String(item.id),t);
    }
    return map;
  }
  function getTargets(){
    return [...layer.querySelectorAll('[data-map-time]'),...(maybePaths?[...maybePaths.querySelectorAll('[data-map-time]')]:[])];
  }
  function paint(){
    const selected=minimum+(maximum-minimum)*Number(slider.value)/1000;
    const span=Math.max(maximum-minimum,60000);
    clock.textContent=minimum?fmt(selected):'NO MARKS YET';
    count.textContent=minimum?`${getTargets().length} MAP ELEMENT${getTargets().length===1?'':'S'} · BRIGHTER = CLOSER`:'0 MARKS';
    // A mark near the selected time is colorful and bright. Distant marks dim, but remain clickable.
    for(const node of getTargets()){
      const t=Number(node.dataset.mapTime);
      if(!isGood(t))continue;
      const delta=Math.abs(t-selected)/span;
      const closeness=Math.pow(clamp(1-delta/.4,0,1),.75);
      const opacity=.42+.58*closeness;
      const gray=clamp(.93*(1-closeness),0,1);
      const sat=.3+1.35*closeness;
      const bright=.74+.40*closeness;
      const glow=1+14*closeness;
      node.classList.add('map-time-target');
      node.style.setProperty('--time-opacity',opacity.toFixed(3));
      node.style.setProperty('--time-gray',gray.toFixed(3));
      node.style.setProperty('--time-saturation',sat.toFixed(3));
      node.style.setProperty('--time-brightness',bright.toFixed(3));
      node.style.setProperty('--time-glow',glow.toFixed(1)+'px');
      node.style.setProperty('--time-glow-color',app==='ase'?'#ff6b85':app==='police'?'#65caff':'#ffc58e');
    }
  }
  function refresh(){
    // Update on room changes and new/removal events. Keep the slider position while viewing history.
    const ids=pairs();
    // Bind from original objects, without requiring the original server or render functions to change.
    if(app==='border'){
      const marks=availableItems();
      for(const mark of marks){
        const t=ids.get(String(mark.id));if(!t)continue;
        if(mark.kind==='zone'){
          const zones=[...document.getElementById('areaLayer')?.children||[]];
          const idx=marks.filter(x=>x.kind==='zone').findIndex(x=>x.id===mark.id);
          if(zones[idx])zones[idx].dataset.mapTime=String(t);
        }
      }
    }
    const times=[...ids.values()].sort((a,b)=>a-b);
    const nextMin=times.length?(times[0]===times[times.length-1]?times[0]-3600000:times[0]):0;
    const nextMax=times.length?times[times.length-1]:0;
    const key=`${nextMin}/${nextMax}/${times.length}`;
    if(key!==lastKey){minimum=nextMin;maximum=nextMax;left.textContent=minimum?fmt(minimum):'OLDER';right.textContent=maximum?fmt(maximum):'NEWER';lastKey=key;}
    slider.disabled=!times.length;latest.disabled=!times.length;
    paint();
  }
  // Observe replacement of nodes from multiplayer updates and zoom redraws, not style changes.
  const observer=new MutationObserver(()=>refresh());
  observer.observe(layer,{childList:true,subtree:true});
  if(maybePaths)observer.observe(maybePaths,{childList:true,subtree:true});
  slider.addEventListener('input',paint);
  slider.addEventListener('change',paint);
  latest.addEventListener('click',()=>{slider.value='1000';paint()});
  root.addEventListener('pointerdown',e=>e.stopPropagation());
  root.addEventListener('pointerup',e=>e.stopPropagation());
  root.addEventListener('click',e=>e.stopPropagation());
  root.addEventListener('wheel',e=>e.stopPropagation(),{passive:true});
  refresh();
  window.MapTimeLens={refresh,paint,slider};
})();
