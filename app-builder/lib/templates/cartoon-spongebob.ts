// Auto-generated template export
// Template: cartoon-spongebob

export const template = `< !DOCTYPE html >
  <html lang="id" class="scroll-smooth" >
    <head>
    <meta charset="UTF-8" >
      <meta name="viewport" content = "width=device-width, initial-scale=1.0" >
        <title>Wedding of Nicola & Salsa - Bikini Bottom Edition </title>

          < !--Fonts: Bubble & Playful-- >
            <link rel="preconnect" href = "https://fonts.googleapis.com" >
              <link rel="preconnect" href = "https://fonts.gstatic.com" crossorigin >
                <link href="https://fonts.googleapis.com/css2?family=Luckiest+Guy&family=Fredoka+One&family=Quicksand:wght@500;700&display=swap" rel = "stylesheet" >

                  <script src="https://cdn.tailwindcss.com" > </script>
                    < link href = "https://unpkg.com/aos@2.3.1/dist/aos.css" rel = "stylesheet" >
                      <link rel="stylesheet" href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" >

                        <script>
                        tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: '#FFF000',    /* Sponge Yellow */
          secondary: '#00D1FF',  /* Ocean Blue */
            dark: '#6D4C41',       /* Patrick Brown */
              accent: '#FF94B4',     /* Patrick Pink */
                cream: '#FFF9C4',      /* Sand Light */
            },
      fontFamily: {
        header: ['"Luckiest Guy"', 'cursive'],
          bubble: ['"Fredoka One"', 'cursive'],
            body: ['"Quicksand"', 'sans-serif'],
            }
    }
  }
}
</script>
  
    <style>
  /* Sky Islands Pattern (SpongeBob Flowers) */
  .sky - islands {
  background - color: #00D1FF;
  background - image: radial - gradient(circle at 50 % 50 %, rgba(255, 255, 255, 0.2) 10 %, transparent 10.5 %);
  background - size: 100px 100px;
}
      
      .wavy - border { border - radius: 60px 20px 60px 20px; border: 6px solid #6D4C41; }
      
      .cover - slide - up {
  transform: translateY(-100 %);
  transition: transform 1.2s cubic - bezier(0.7, 0, 0.3, 1);
}
      
      .bubble - float { animation: float 3s ease -in -out infinite; }
@keyframes float { 0 %, 100 % { transform: translateY(0); } 50 % { transform: translateY(-20px); } }
  
      .modal { transition: opacity 0.3s ease; opacity: 0; pointer - events: none; z - index: 5000; }
      .modal.active { opacity: 1; pointer - events: all; }
</style>
  </head>
  < body class="bg-cream text-dark font-body overflow-hidden antialiased" >

    <audio id="bgMusic" loop >
      <source src="https://www.bensound.com/bensound-music/bensound-sunny.mp3" type = "audio/mpeg" >
        </audio>

        < div id = "musicControl" class="fixed top-6 right-6 z-50 hidden opacity-0 transition-opacity duration-1000" >
          <button onclick="toggleMusic()" class="w-14 h-14 bg-accent text-white rounded-full flex items-center justify-center border-4 border-white shadow-xl" >
            <i class="fa-solid fa-fish-fins" id = "musicIcon" > </i>
              </button>
              </div>

              < !--SECTION 1: COVER-- >
                <div id="cover" class="fixed inset-0 z-[100] sky-islands flex flex-col justify-center items-center text-center p-6" >
                  <div class="relative z-10 bg-white/90 p-10 wavy-border max-w-lg shadow-2xl" data - aos="zoom-in" >
                    <div class="bubble-float mb-6 text-5xl text-secondary" > <i class="fa-solid fa-soap" > </i></div >
                      <p class="font-header text-dark tracking-widest text-lg mb-4" > ARRRRRR YOU READY KIDS ? </p>
                        < h1 class="font-header text-5xl md:text-7xl text-secondary stroke-white mb-8" > Nicola & Salsa </h1>
                          < div class="mb-10" >
                            <p class="font-bubble text-dark/60 text-sm mb-2 uppercase" > GUEST PASS TO BIKINI BOTTOM: </p>
                              < p class="font-header text-3xl text-accent" > TAMU UNDANGAN </p>
                                </div>
                                < button onclick = "openInvitation()" class="px-10 py-5 bg-primary text-dark font-header text-xl border-4 border-dark rounded-full shadow-lg hover:scale-105 transition" >
                                  I'M READY! BUKA UNDANGAN
                                    </button>
                                    </div>
                                    </div>

                                    < main id = "mainContent" class="hidden opacity-0 transition-opacity duration-1000" >
                                      <section id="home" class="min-h-screen sky-islands flex flex-col justify-center items-center text-center px-4 pt-32 pb-20" >
                                        <div data - aos="fade-up" >
                                          <div class="wavy-border bg-white p-4 inline-block mb-10 overflow-hidden" >
                                            <img src="https://placehold.co/600x800" class="w-72 h-72 md:w-96 md:h-96 object-cover rounded-[40px]" >
                                              </div>
                                              < h2 class="font-header text-6xl text-white drop-shadow-lg" > WE'RE GETTING MARRIED!</h2>
                                                < p class="font-bubble text-primary text-4xl mt-4" >09 . 10 . 2025 </p>
                                                  </div>
                                                  </section>

                                                  < !--AYAT SECTION-- >
                                                    <section class="py-24 px-6 bg-accent text-white text-center border-y-8 border-dark" >
                                                      <div class="max-w-3xl mx-auto" data - aos="fade-up" >
                                                        <p class="font-bubble text-2xl leading-relaxed italic mb-8" >
                                                          "F is for friends who do stuff together, U is for you and me..."
                                                          </p>
                                                          < p class="font-header text-primary tracking-widest" >— BEST FRIENDS FOREVER —</p>
                                                            </div>
                                                            </section>

                                                            < !--COUPLE SECTION-- >
                                                              <section id="couple" class="py-32 bg-cream" >
                                                                <div class="container mx-auto px-6 text-center" >
                                                                  <h2 class="font-header text-5xl text-secondary mb-20" > MEET THE NEIGHBORS </h2>
                                                                    < div class="flex flex-col md:flex-row justify-center gap-16 max-w-6xl mx-auto" >
                                                                      <div class="text-center" data - aos="fade-right" >
                                                                        <div class="w-64 h-64 mx-auto mb-8 border-8 border-primary rounded-[50px] overflow-hidden bg-white p-2" >
                                                                          <img src="nicola.jpg" class="w-full h-full object-cover rounded-[40px]" >
                                                                            </div>
                                                                            < h3 class="font-header text-3xl text-dark" > Nicola Valentino </h3>
                                                                              < p class="font-bubble text-secondary text-lg mt-2" > The Happy Sponge </p>
                                                                                </div>
                                                                                < div class="text-center" data - aos="fade-left" >
                                                                                  <div class="w-64 h-64 mx-auto mb-8 border-8 border-accent rounded-[50px] overflow-hidden bg-white p-2" >
                                                                                    <img src="salsa.jpg" class="w-full h-full object-cover rounded-[40px]" >
                                                                                      </div>
                                                                                      < h3 class="font-header text-3xl text-dark" > Salsabillah Ekanaiya </h3>
                                                                                        < p class="font-bubble text-accent text-lg mt-2" > The Sweet Starfish </p>
                                                                                          </div>
                                                                                          </div>
                                                                                          </div>
                                                                                          </section>

                                                                                          < !--EVENT SECTION-- >
                                                                                            <section id="event" class="py-32 sky-islands text-white" >
                                                                                              <div class="container mx-auto px-6 text-center" >
                                                                                                <h2 class="font-header text-5xl mb-16" > PARTY AT THE PINEAPPLE! </h2>
                                                                                                  < div class="max-w-xl mx-auto wavy-border bg-white text-dark p-12" data - aos="flip-up" >
                                                                                                    <i class="fa-solid fa-umbrella-beach text-5xl text-secondary mb-8" > </i>
                                                                                                      < h3 class="font-header text-4xl mb-4" > WEDDING DAY </h3>
                                                                                                        < p class="font-bubble text-2xl text-secondary mb-10" >09 OKTOBER 2025 </p>
                                                                                                          < div class="border-t-4 border-dashed border-dark pt-8" >
                                                                                                            <p class="font-header text-lg mb-4" > LOCATION: </p>
                                                                                                              < p class="font-bubble text-sm" > Bocek Karangploso(Toko Pak Mendol) </p>
                                                                                                                </div>
                                                                                                                < button class="mt-8 px-10 py-4 bg-primary text-dark font-header text-lg border-4 border-dark rounded-full" > FOLLOW THE BUBBLES </button>
                                                                                                                  </div>
                                                                                                                  < div id = "countdown" class="flex flex-wrap justify-center gap-6 mt-20" > </div>
                                                                                                                    </div>
                                                                                                                    </section>

                                                                                                                    < !--GALLERY SECTION-- >
                                                                                                                      <section id="gallery" class="py-32 bg-cream" >
                                                                                                                        <div class="container mx-auto px-4 text-center" >
                                                                                                                          <h2 class="font-header text-5xl text-secondary mb-16" > SCRAPBOOK MOMENTS </h2>
                                                                                                                            < div class="grid grid-cols-2 md:grid-cols-4 gap-6" >
                                                                                                                              <img src="prewedding1.jpg" class="wavy-border cursor-pointer hover:rotate-3 transition p-2 bg-white" onclick = "openModal(this.src)" >
                                                                                                                                <img src="prewedding2.jpg" class="wavy-border cursor-pointer hover:-rotate-3 transition p-2 bg-white" onclick = "openModal(this.src)" >
                                                                                                                                  <img src="prewedding3.jpg" class="wavy-border cursor-pointer hover:rotate-3 transition p-2 bg-white" onclick = "openModal(this.src)" >
                                                                                                                                    <img src="prewedding4.jpg" class="wavy-border cursor-pointer hover:-rotate-3 transition p-2 bg-white" onclick = "openModal(this.src)" >
                                                                                                                                      </div>
                                                                                                                                      </div>
                                                                                                                                      </section>

                                                                                                                                      < !--GIFT SECTION-- >
                                                                                                                                        <section id="gift" class="py-32 bg-secondary text-white" >
                                                                                                                                          <div class="container mx-auto px-6 text-center max-w-2xl" >
                                                                                                                                            <h2 class="font-header text-5xl mb-12" > KRABBY PATTY FUND </h2>
                                                                                                                                              < div class="bg-white p-12 wavy-border text-dark" data - aos="zoom-in" >
                                                                                                                                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg" class="h-8 mx-auto mb-10" >
                                                                                                                                                  <p class="font-header text-4xl mb-2 text-secondary" > 8163069596 </p>
                                                                                                                                                    < p class="font-bubble text-lg mb-8 uppercase" > A.N NICOLA VALENTINO </p>
                                                                                                                                                      < button onclick = "copyToClipboard()" class="px-10 py-4 bg-primary text-dark font-header text-xl border-4 border-dark rounded-full" > COLLECT DOUBLOONS </button>
                                                                                                                                                        </div>
                                                                                                                                                        </div>
                                                                                                                                                        </section>

                                                                                                                                                        < !--RSVP SECTION-- >
                                                                                                                                                          <section id="rsvp" class="py-32 sky-islands pb-48" >
                                                                                                                                                            <div class="container mx-auto px-6 max-w-2xl text-center" >
                                                                                                                                                              <h2 class="font-header text-5xl text-white mb-16" > SEND A BOTTLE MESSAGE </h2>
                                                                                                                                                                < div class="bg-white/90 p-10 wavy-border" >
                                                                                                                                                                  <textarea id="guestMsg" rows = "5" class="w-full border-4 border-dark p-6 font-bubble focus:outline-none text-xl" placeholder = "MEEHOY MINOYY..." > </textarea>
                                                                                                                                                                    < button onclick = "sendToWA()" class="w-full mt-8 bg-accent text-white py-5 font-header text-2xl border-4 border-dark rounded-full" > SEND MESSAGE </button>
                                                                                                                                                                      </div>
                                                                                                                                                                      </div>
                                                                                                                                                                      </section>

                                                                                                                                                                      < footer class="py-24 bg-dark text-white text-center border-t-8 border-primary" >
                                                                                                                                                                        <h2 class="font-header text-6xl mb-4 text-primary italic" > Nicola & Salsa </h2>
                                                                                                                                                                          < p class="font-bubble text-xl uppercase" > SEE YOU AT THE SEASHORE! </p>
                                                                                                                                                                            </footer>

                                                                                                                                                                            < nav id = "navbar" class="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-white border-4 border-dark p-4 flex gap-10 rounded-full shadow-2xl transition-all duration-700 translate-y-32 opacity-0" >
                                                                                                                                                                              <a href="#home" class="text-secondary text-3xl" > <i class="fa-solid fa-house-chimney" > </i></a >
                                                                                                                                                                                <a href="#couple" class="text-secondary text-3xl" > <i class="fa-solid fa-user-group" > </i></a >
                                                                                                                                                                                  <a href="#event" class="text-secondary text-3xl" > <i class="fa-solid fa-map-location-dot" > </i></a >
                                                                                                                                                                                    <a href="#gallery" class="text-secondary text-3xl" > <i class="fa-solid fa-camera-retro" > </i></a >
                                                                                                                                                                                      <a href="#gift" class="text-secondary text-3xl" > <i class="fa-solid fa-coins" > </i></a >
                                                                                                                                                                                        </nav>
                                                                                                                                                                                        </main>

                                                                                                                                                                                        < !--UTILITIES -->
                                                                                                                                                                                          <div id="toast" class="fixed top-12 left-1/2 -translate-x-1/2 z-[1000] bg-primary border-4 border-dark text-dark px-10 py-4 font-header text-lg opacity-0 transition-all pointer-events-none rounded-full" > MEEHOY! COPIED! </div>
                                                                                                                                                                                            < div id = "imgModal" class="modal fixed inset-0 bg-black/95 flex items-center justify-center p-6" onclick = "this.classList.remove('active')" >
                                                                                                                                                                                              <img id="modalImage" class="max-h-[85vh] border-8 border-white wavy-border" >
                                                                                                                                                                                                </div>

                                                                                                                                                                                                < script src = "https://unpkg.com/aos@2.3.1/dist/aos.js" > </script>
                                                                                                                                                                                                  <script>
AOS.init({ once: true, duration: 800 });
const dom = {
  cover: document.getElementById('cover'),
  main: document.getElementById('mainContent'),
  music: document.getElementById('bgMusic'),
  musicCtrl: document.getElementById('musicControl'),
  musicIcon: document.getElementById('musicIcon'),
  nav: document.getElementById('navbar'),
  countdown: document.getElementById('countdown')
};
let isPlaying = false;
let musicPromise = null;

function openInvitation() {
  dom.cover.classList.add('cover-slide-up');
  dom.main.classList.remove('hidden');
  setTimeout(() => {
    dom.main.classList.add('opacity-100');
    dom.musicCtrl.classList.remove('hidden', 'opacity-0');
    dom.nav.classList.remove('translate-y-32', 'opacity-0');
    document.body.style.overflow = 'auto';
    AOS.refresh();
  }, 500);
  toggleMusic(true);
}

async function toggleMusic(force = false) {
  if (force || !isPlaying) {
    try {
      musicPromise = dom.music.play();
      if (musicPromise !== undefined) {
        await musicPromise;
        isPlaying = true;
        dom.musicIcon.classList.add('fa-spin');
      }
    } catch (err) { isPlaying = false; }
  } else {
    dom.music.pause();
    isPlaying = false;
    dom.musicIcon.classList.remove('fa-spin');
  }
}

const weddingDate = new Date("2025-10-09T10:00:00").getTime();
function updateCountdown() {
  const now = new Date().getTime();
  const diff = weddingDate - now;
  if (diff < 0) { dom.countdown.innerHTML = "<h3 class='font-header text-white'>PARTY TIME!</h3>"; return; }
  const t = { days: Math.floor(diff / 86400000), hrs: Math.floor((diff % 86400000) / 3600000), min: Math.floor((diff % 3600000) / 60000), sec: Math.floor((diff % 60000) / 1000) };
  dom.countdown.innerHTML = Object.entries(t).map(([k, v]) => \`
    < div class="bg-white border-4 border-dark p-4 w-24 rounded-[30px] transform hover:scale-110 transition shadow-lg" >
            <div class="text-3xl font-header text-secondary">\${v}</div>
            <div class="text-[8px] font-bubble text-dark uppercase">\${k}</div>
          </div >
  \`).join('');
}
setInterval(updateCountdown, 1000);
updateCountdown();

function copyToClipboard() {
  const el = document.createElement('textarea'); el.value = '8163069596'; document.body.appendChild(el); el.select(); document.execCommand('copy'); document.body.removeChild(el);
  const toast = document.getElementById('toast'); toast.classList.add('opacity-100'); setTimeout(() => toast.classList.remove('opacity-100'), 2000);
}

function openModal(src) { document.getElementById('modalImage').src = src; document.getElementById('imgModal').classList.add('active'); }
function sendToWA() { const msg = document.getElementById("guestMsg").value; window.location.href = \`mailto:nikola @example.com?body = \${ encodeURIComponent(msg) } \`; }
document.body.style.overflow = 'hidden';
</script>
  </body>
  </html>
    `;
