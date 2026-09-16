const photoFiles = [
  "fotos/foto1.jpg",
  "fotos/foto2.jpg",
  "fotos/foto3.jpg",
  "fotos/foto4.jpg",
  "fotos/foto5.jpg",
  "fotos/foto14.jpg"
];

const photoNames = [
  "Spider foto🕸️", "Fotito con la BIBLIA🙌", "Fotito match", "Y si bailamos??",
  "Fotito en el altar🙌", "Primera Fotito", "Otro recuerdo bonito", "Un día especial juntos",
  "Un recuerdo que quiero guardar", "Momentos que valen", "Un pedacito de nosotros", "Para recordar siempre",
  "Una noche para recordar", "Un momento que se queda", "Entre sonrisas y recuerdos", "Otro pedacito de nosotros",
  "Un recuerdo juntos 💛", "Una tarde para guardar 🌻", "Una foto que me encanta ✨", "Otro momento nuestro 💕",
  "Sonrisas que quiero recordar 💛", "Un instante especial 🌻", "Juntos se siente bonito ✨", "Otro pedacito de nosotros 💕",
  "Un recuerdo más para el corazón 💛", "Siempre nosotros 🌻"
];

const flowerSvg = {
  sunflower: `<svg class="flower-svg sunflower" viewBox="0 0 200 200" aria-hidden="true">
    <defs>
      <radialGradient id="sunPetal"><stop offset="0" stop-color="#ffe98a"/><stop offset=".65" stop-color="#f3c62e"/><stop offset="1" stop-color="#d9a917"/></radialGradient>
      <radialGradient id="sunCenter"><stop offset="0" stop-color="#80601e"/><stop offset=".55" stop-color="#4d3512"/><stop offset="1" stop-color="#281d0d"/></radialGradient>
    </defs>
    <g fill="url(#sunPetal)" transform="translate(100 100)">
      ${Array.from({length:18},(_,i)=>`<ellipse rx="24" ry="67" transform="rotate(${i*20}) translate(0 -48)"/>`).join("")}
    </g>
    <circle cx="100" cy="100" r="48" fill="url(#sunCenter)"/>
    <g fill="#b28b2a" opacity=".75">${Array.from({length:55},(_,i)=>{const a=i*2.399,r=8+(i%8)*4;return `<circle cx="${100+Math.cos(a)*r}" cy="${100+Math.sin(a)*r}" r="2"/>`}).join("")}</g>
  </svg>`,
  lily: `<svg class="flower-svg lily" viewBox="0 0 200 200" aria-hidden="true">
    <defs><radialGradient id="lilyPetal"><stop stop-color="#fffdf5"/><stop offset=".72" stop-color="#fff1a6"/><stop offset="1" stop-color="#e7c54c"/></radialGradient></defs>
    <g fill="url(#lilyPetal)" stroke="#d5ad34" stroke-width="2">
      <path d="M100 105 C55 100 25 72 35 32 C68 35 91 56 100 90 C109 56 132 35 165 32 C175 72 145 100 100 105Z"/>
      <path d="M100 100 C72 72 68 39 100 14 C132 39 128 72 100 100Z"/>
      <path d="M100 100 C74 119 45 122 22 97 C50 80 79 84 100 100Z"/>
      <path d="M100 100 C126 84 155 80 178 97 C155 122 126 119 100 100Z"/>
      <path d="M100 100 C100 134 83 157 50 160 C48 130 67 108 100 100Z"/>
      <path d="M100 100 C133 108 152 130 150 160 C117 157 100 134 100 100Z"/>
    </g>
    <circle cx="100" cy="100" r="7" fill="#9d7821"/>
    <g stroke="#8b6b25" stroke-width="3" stroke-linecap="round">
      <path d="M96 96 L72 64"/><path d="M104 96 L128 64"/><path d="M96 104 L67 108"/><path d="M104 104 L133 108"/>
    </g>
  </svg>`
};

function makeFlower(type, className="") {
  return flowerSvg[type].replace('class="flower-svg', `class="flower-svg ${className}`);
}

function bouquetCard(index) {
  const rot = [-3, 2, -2, 3, -1][index % 5];
  return `
    <article class="bouquet-card reveal" style="--rot:${rot}deg" data-photo="${index}">
      <div class="flower-stem stem1"></div><div class="flower-stem stem2"></div><div class="flower-stem stem3"></div>
      <div class="leaf leaf1"></div><div class="leaf leaf2"></div><div class="leaf leaf3"></div>
      ${makeFlower("sunflower","f1")}
      ${makeFlower("sunflower","f2")}
      ${makeFlower("sunflower","f3")}
      ${makeFlower("lily","l1")}
      ${makeFlower("lily","l2")}
      <img class="photo" src="${photoFiles[index]}" alt="${photoNames[index]}" loading="lazy">
      <div class="photo-label">${photoNames[index]} 💛</div>
    </article>`;
}

function setUpBouquets() {
  const grid = document.getElementById("bouquetGrid");
  grid.innerHTML = photoFiles.map((_,i)=>bouquetCard(i)).join("");
  grid.querySelectorAll(".photo").forEach((img,i)=>{
    img.addEventListener("error",()=>{
      img.classList.add("missing");
      img.src = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500">
          <rect width="400" height="500" fill="#fffaf0"/>
          <text x="200" y="215" text-anchor="middle" font-size="60">📸</text>
          <text x="200" y="285" text-anchor="middle" font-family="Arial" font-size="22" fill="#6c5a2b">foto${i+1}.jpg</text>
          <text x="200" y="320" text-anchor="middle" font-family="Arial" font-size="15" fill="#887a57">Coloca tu foto en /fotos</text>
        </svg>`)}`;
    });
    img.addEventListener("click",(e)=>{
      e.stopPropagation();
      openModal(img.src, img.alt, i);
    });
  });
}

function addGardenFlowers(container, count=8) {
  if (!container) return;
  container.innerHTML = "";
  for(let i=0;i<count;i++){
    const type = i % 3 === 0 ? "lily" : "sunflower";
    const wrap = document.createElement("div");
    wrap.innerHTML = makeFlower(type, `garden-flower g${i}`);
    const flower = wrap.firstElementChild;
    flower.style.left = `${(i/(count-1))*100}%`;
    flower.style.bottom = `${8 + (i%3)*3}%`;
    flower.style.transform = `translateX(-50%) rotate(${(i%2?-1:1)*(5+i%4)}deg)`;
    flower.style.animation = `sway ${4+i%3}s ease-in-out infinite alternate`;
    container.appendChild(flower);
  }
  if (!document.getElementById("swayStyle")){
    const s=document.createElement("style");s.id="swayStyle";
    s.textContent="@keyframes sway{from{margin-left:-5px}to{margin-left:7px}}";
    document.head.appendChild(s);
  }
}

function createPetal() {
  const p=document.createElement("span");
  p.className="petal";
  p.style.left=Math.random()*100+"vw";
  p.style.setProperty("--drift", `${(Math.random()-.5)*35}vw`);
  p.style.animationDuration=(5+Math.random()*5)+"s";
  p.style.transform=`rotate(${Math.random()*180}deg)`;
  document.getElementById("petals").appendChild(p);
  setTimeout(()=>p.remove(),11000);
}

function burstPetals(n=22){
  for(let i=0;i<n;i++) setTimeout(createPetal,i*90);
}

const photos = [
  ...photoFiles,
  "fotos/foto6.jpg",
  "fotos/foto7.jpg",
  "fotos/foto8.jpg",
  "fotos/foto9.jpg",
  "fotos/foto10.jpg",
  "fotos/foto11.jpg",
  "fotos/foto12.jpg",
  "fotos/foto13.jpg",
  "fotos/foto15.jpg",
  "fotos/foto16.jpg",
  "fotos/foto17.jpg",
  "fotos/foto18.jpg",
  "fotos/foto19.jpg",
  "fotos/foto20.jpg",
  "fotos/foto21.jpg",
  "fotos/foto22.jpg",
  "fotos/foto23.jpg",
  "fotos/foto24.jpg",
  "fotos/foto25.jpg",
  "fotos/foto26.jpg",
  "fotos/foto27.jpg",
  "fotos/foto28.jpg",
  "fotos/capa3_01.jpg",
  "fotos/capa3_02.jpg",
  "fotos/capa3_03.jpg",
  "fotos/capa3_04.jpg",
  "fotos/capa3_05.jpg",
  "fotos/capa3_06.jpg",
  "fotos/capa3_07.jpg",
  "fotos/capa3_08.jpg",
  "fotos/capa3_09.jpg",
  "fotos/capa3_10.jpg"
];
let current=0, slideshowTimer=null;

function photoExistsFallback(img){
  const fallback=document.getElementById("photoFallback");
  if(!img.complete || img.naturalWidth===0) fallback.style.display="grid";
  else fallback.style.display="none";
}

function showPhoto(index, animate=true){
  current=(index+photos.length)%photos.length;
  const img=document.getElementById("currentPhoto");
  const fallback=document.getElementById("photoFallback");
  if(animate) img.classList.add("fade-out");
  setTimeout(()=>{
    img.src=photos[current];
    img.alt=photoNames[current];
    updateDots();
    if(animate) setTimeout(()=>img.classList.remove("fade-out"),80);
  },animate?300:0);
  img.onerror=()=>{fallback.style.display="grid"};
  img.onload=()=>{fallback.style.display="none"};
}

function updateDots(){
  const d=document.getElementById("progressDots");
  if(!d) return;
  // En celular mostramos solo 3 puntitos, sin importar cuántas fotos haya.
  // Cada puntito representa un tercio del recorrido de recuerdos.
  const totalDots=3;
  const activeIndex=Math.min(totalDots-1, Math.floor((current / photos.length) * totalDots));
  d.innerHTML=Array.from({length:totalDots},(_,i)=>
    `<span class="dot ${i===activeIndex?"active":""}" aria-hidden="true"></span>`
  ).join("");
}
function toggleSlideshow(){
  const btn=document.getElementById("playSlideshow");
  if(slideshowTimer){
    clearInterval(slideshowTimer); slideshowTimer=null; btn.textContent="▶ Ver recuerdos";
  }else{
    btn.textContent="⏸ Pausar recuerdos";
    slideshowTimer=setInterval(()=>showPhoto(current+1),4000);
  }
}

const photoMessages = [
  "Qué bonito es guardar momentos que, con solo mirarlos, vuelven a hacerme sonreír. 💛",
  " QUE BELLA✨ !! que estabas este día me encanta como te ves con vestidos . 🌻",
  "Guabitos este día combinados, me encanta cada momento que paso a tu lado  . ✨",
  "Y si bailamos??\ Me encantó el video que hiciste💖. 💛",
  "Nos apagaron la luz😔 JAJA pero, tu eras el brillo que necesitaba la fotoocs✨✨ 🌻",
  "Super nervioso estaba este día y tu tan LINDA como todos los días💖✨\ . 🌻💛"
];

function openModal(src,alt,index=0){
  const modal=document.getElementById("photoModal");
  const flip=document.getElementById("photoFlip");
  document.getElementById("modalImage").src=src;
  document.getElementById("modalImage").alt=alt;
  document.querySelector("#modalMessage p").textContent=photoMessages[index] || photoMessages[0];
  flip.classList.remove("flipped");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden","false");
}
function closeModal(){
  document.getElementById("photoModal").classList.remove("open");
  document.getElementById("photoModal").setAttribute("aria-hidden","true");
}

function setupMusic(){
  const audio=document.getElementById("audio"), btn=document.getElementById("musicBtn"), seek=document.getElementById("seek"), label=document.getElementById("timeLabel"), player=document.querySelector(".audio-player");
  if(!audio || !btn) return;

  // Música de la Capa 3: usa la canción original mi-vida-entera.mp3.
  audio.loop = true;

  if(seek){
    audio.addEventListener("loadedmetadata",()=>seek.max=audio.duration||100);
    audio.addEventListener("timeupdate",()=>{
      seek.value=audio.currentTime||0;
      if(label){
        const m=Math.floor((audio.currentTime||0)/60), s=Math.floor((audio.currentTime||0)%60).toString().padStart(2,"0");
        label.textContent=`${m}:${s}`;
      }
    });
  }

  audio.addEventListener("play",()=>{
    btn.textContent="🎶";
    btn.setAttribute("aria-label","Pausar música");
    btn.setAttribute("title","Pausar música");
    btn.classList.add("playing");
    if(player) player.classList.add("audio-playing");
  });
  audio.addEventListener("pause",()=>{
    btn.textContent="🎵";
    btn.setAttribute("aria-label","Reproducir música");
    btn.setAttribute("title","Reproducir música");
    btn.classList.remove("playing");
    if(player) player.classList.remove("audio-playing");
  });
  audio.addEventListener("ended",()=>{
    // Respaldo para navegadores móviles: vuelve a iniciar la canción al terminar.
    audio.currentTime = 0;
    audio.play().catch(()=>{});
  });
  audio.addEventListener("error",()=>{btn.textContent="🎵";btn.classList.remove("playing")});

  btn.addEventListener("click",async()=>{
    if(audio.paused){
      try{
        await audio.play();
        const gate=document.getElementById("musicGate");
        if(gate) gate.classList.add("hidden");
      }catch(e){
        alert("No se pudo reproducir la música. Verifica que el archivo mi-vida-entera.mp3 esté dentro de la carpeta musica.");
      }
    }else{
      audio.pause();
    }
  });
  if(seek) seek.addEventListener("input",()=>{audio.currentTime=Number(seek.value)});
}


function setupReveal(){
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")});
  },{threshold:.12});
  document.querySelectorAll(".reveal").forEach(el=>obs.observe(el));
}

let unlocked = true;

function mostrarCapa(id){
  const audio=document.getElementById("audio");
  const gate=document.getElementById("musicGate");

  // La música ambiental suena en Capas 1, 2 y 4. Capa 3 usa su propia canción.
  if(audio){
    audio.pause();
    audio.currentTime=0;
  }
  if(id==="momentos"){
    detenerMusicaAmbiental();
  }else{
    iniciarMusicaAmbiental();
  }

  document.querySelectorAll(".capa").forEach(c=>c.classList.remove("activa"));
  const destino=document.getElementById(id);
  if(!destino) return;
  destino.classList.add("activa");
  destino.scrollTop=0;

  // Cada vez que se entra nuevamente a Capa 3, la invitación a activar la música reaparece.
  if(id==="momentos" && gate){
    gate.classList.remove("hidden");
  }
}


// Música ambiente para Capas 1, 2 y 4
const audioAmbient = new Audio("musica/flores-amarillas.mp3");
audioAmbient.loop = true;
audioAmbient.preload = "auto";
audioAmbient.addEventListener("ended", () => {
  if(document.getElementById("momentos")?.classList.contains("activa")) return;
  audioAmbient.currentTime = 0;
  audioAmbient.play().catch(()=>{});
});

// En celulares el navegador puede bloquear el autoplay.
// Usamos la primera interacción real del usuario para arrancar la música
// de las Capas 1, 2 y 4. Se mantiene activo para que también funcione
// al volver a entrar a cualquiera de esas capas.
function activarMusicaConInteraccion(){
  const momentos = document.getElementById("momentos");
  if(!momentos || !momentos.classList.contains("activa")){
    iniciarMusicaAmbiental();
  }
}
document.addEventListener("pointerdown", activarMusicaConInteraccion);
document.addEventListener("touchstart", activarMusicaConInteraccion, {passive:true});
document.addEventListener("keydown", activarMusicaConInteraccion);


function iniciarMusicaAmbiental(){
  if(audioAmbient.paused){
    audioAmbient.play().catch(()=>{});
  }
}
function detenerMusicaAmbiental(){
  audioAmbient.pause();
  audioAmbient.currentTime = 0;
}

document.addEventListener("DOMContentLoaded",()=>{
  setUpBouquets();
  addGardenFlowers(document.getElementById("heroGarden"),9);
  addGardenFlowers(document.getElementById("finalGarden"),11);
  updateDots();
  setupMusic();
  setupReveal();

  document.getElementById("discoverBtn").addEventListener("click",()=>{
    burstPetals(28);
    mostrarCapa("ramos");
  });
  document.querySelectorAll(".nav-btn").forEach(btn=>{
    btn.addEventListener("click",()=>mostrarCapa(btn.dataset.go));
  });
  document.getElementById("againBtn").addEventListener("click",()=>mostrarCapa("inicio"));
  document.getElementById("prevBtn").addEventListener("click",()=>showPhoto(current-1));
  document.getElementById("nextBtn").addEventListener("click",()=>showPhoto(current+1));
  document.getElementById("playSlideshow").addEventListener("click",toggleSlideshow);
  document.getElementById("closeModal").addEventListener("click",closeModal);
  document.getElementById("modalImage").addEventListener("click",(e)=>{
    e.stopPropagation();
    document.getElementById("photoFlip").classList.toggle("flipped");
  });
  document.getElementById("modalMessage").addEventListener("click",(e)=>{
    e.stopPropagation();
    document.getElementById("photoFlip").classList.toggle("flipped");
  });
  document.querySelector(".modal-backdrop").addEventListener("click",closeModal);
  document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});

  mostrarCapa("inicio");
});
