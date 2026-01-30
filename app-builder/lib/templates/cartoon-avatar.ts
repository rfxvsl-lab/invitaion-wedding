// Auto-generated template export
// Template: cartoon-avatar

export const template = `< !DOCTYPE html >
  <html lang="id" class="scroll-smooth" >
    <head>
    <meta charset="UTF-8" >
      <meta name="viewport" content = "width=device-width, initial-scale=1.0" >
        <title>The Wedding of Nicola & Salsa - Four Elements Edition </title>

          < !--Fonts: Ancient & Ethnic-- >
            <link rel="preconnect" href = "https://fonts.googleapis.com" >
              <link rel="preconnect" href = "https://fonts.gstatic.com" crossorigin >
                <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Ma+Shan+Zheng&family=Cormorant+Garamond:ital,wght@0,400;1,600&display=swap" rel = "stylesheet" >

                  <script src="https://cdn.tailwindcss.com" > </script>
                    < link href = "https://unpkg.com/aos@2.3.1/dist/aos.css" rel = "stylesheet" >
                      <link rel="stylesheet" href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" >

                        <script>
                        tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: '#1A3F6B',    /* Water Tribe Blue */
          secondary: '#7A1C1C',  /* Fire Nation Red */
            dark: '#2E4C2E',       /* Earth Kingdom Green */
              accent: '#C5A059',     /* Air Nomad Orange/Gold */
                cream: '#FDF5E6',      /* Old Parchment */
          },
      fontFamily: {
        header: ['"Cinzel Decorative"', 'serif'],
          asian: ['"Ma Shan Zheng"', 'cursive'],
            body: ['"Cormorant Garamond"', 'serif'],
          }
    }
  }
}
</script>

  <style>
  /* Parchment Background */
  .bg - parchment {
  background - color: #FDF5E6;
  background - image: url("https://www.transparenttextures.com/patterns/paper-fibers.png");
}
    
    .scroll - card { border: 12px solid #7A1C1C; border - image: url('https://png.pngtree.com/png-vector/20230304/ourmid/pngtree-vintage-chinese-border-design-with-red-and-gold-patterns-png-image_6630440.png') 30 stretch; }
    
    .cover - slide - up {
  transform: translateY(-100 %);
  transition: transform 1.5s cubic - bezier(0.77, 0, 0.175, 1);
}
    
    .element - spin { animation: spin 20s linear infinite; }
@keyframes spin { 100 % { transform: rotate(360deg); } }

    .modal { transition: opacity 0.3s ease; opacity: 0; pointer - events: none; z - index: 5000; }
    .modal.active { opacity: 1; pointer - events: all; }
</style>
  </head>
  < body class="bg-parchment text-secondary font-body overflow-hidden antialiased" >

    <audio id="bgMusic" loop >
      <source src="https://www.bensound.com/bensound-music/bensound-relaxing.mp3" type = "audio/mpeg" >
        </audio>

        < div id = "musicControl" class="fixed top-6 right-6 z-50 hidden opacity-0 transition-opacity duration-1000" >
          <button onclick="toggleMusic()" class="w-14 h-14 bg-secondary text-accent border-2 border-accent rounded-full flex items-center justify-center shadow-2xl" >
            <i class="fa-solid fa-wind" id = "musicIcon" > </i>
              </button>
              </div>

              < !--SECTION 1: COVER-- >
                <div id="cover" class="fixed inset-0 z-[100] bg-cream flex flex-col justify-center items-center text-center p-6 border-8 border-secondary" >
                  <div class="absolute inset-0 opacity-10 flex items-center justify-center overflow-hidden" >
                    <i class="fa-solid fa-yin-yang text-[800px] element-spin" > </i>
                      </div>
                      < div class="relative z-10 p-12 bg-white/80 border-4 border-accent shadow-2xl" data - aos="zoom-in" >
                        <p class="font-asian text-3xl mb-4 text-dark" > 天地合一 </p>
                          < p class="font-header text-lg mb-4 tracking-[0.3em]" > THE FOUR ELEMENTS BRING US TO </p>
                            < h1 class="font-header text-5xl md:text-7xl mb-10 text-secondary" > Nicola & Salsa </h1>
                              < div class="mb-12" >
                                <p class="font-body italic text-xl mb-4" > TO THE HONORABLE CITIZEN: </p>
                                  < p class="font-asian text-5xl text-primary" > TAMU UNDANGAN </p>
                                    </div>
                                    < button onclick = "openInvitation()" class="px-12 py-5 bg-secondary text-accent font-header text-sm tracking-widest border-2 border-accent hover:bg-dark transition shadow-xl" >
                                      OPEN THE SCROLL
                                        </button>
                                        </div>
                                        </div>

                                        < main id = "mainContent" class="hidden opacity-0 transition-opacity duration-1000" >
                                          <section id="home" class="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-32 pb-20" >
                                            <div data - aos="fade-up" >
                                              <div class="relative p-6 bg-white shadow-2xl border-4 border-accent inline-block mb-10" >
                                                <img src="https://placehold.co/600x800" class="w-72 h-72 md:w-96 md:h-96 object-cover grayscale-[30%] border-2 border-secondary" >
                                                  <div class="absolute -top-6 -left-6 text-primary text-4xl" > <i class="fa-solid fa-water" > </i></div >
                                                    <div class="absolute -top-6 -right-6 text-secondary text-4xl" > <i class="fa-solid fa-fire" > </i></div >
                                                      <div class="absolute -bottom-6 -left-6 text-dark text-4xl" > <i class="fa-solid fa-mountain" > </i></div >
                                                        <div class="absolute -bottom-6 -right-6 text-accent text-4xl" > <i class="fa-solid fa-wind" > </i></div >
                                                          </div>
                                                          < h2 class="font-header text-4xl md:text-6xl mb-6" > HARMONY OF HEARTS </h2>
                                                            < p class="font-asian text-4xl text-dark" > 2025 年 10 月 09 日 </p>
                                                              </div>
                                                              </section>

                                                              < !--AYAT SECTION-- >
                                                                <section class="py-24 px-6 bg-secondary text-accent text-center border-y-4 border-accent" >
                                                                  <div class="max-w-3xl mx-auto" data - aos="fade-up" >
                                                                    <i class="fa-solid fa-dragon text-5xl mb-10" > </i>
                                                                      < p class="font-body text-2xl md:text-3xl leading-relaxed italic mb-8" >
                                                                        "Sharing tea with a fascinating stranger is one of life's true delights."
                                                                        </p>
                                                                        < p class="font-header tracking-widest" >— UNCLE IROH —</p>
                                                                          </div>
                                                                          </section>

                                                                          < !--COUPLE SECTION-- >
                                                                            <section id="couple" class="py-32" >
                                                                              <div class="container mx-auto px-6 text-center" >
                                                                                <h2 class="font-header text-4xl text-dark mb-24" > THE TWO WARRIORS </h2>
                                                                                  < div class="flex flex-col md:flex-row justify-center gap-20 max-w-6xl mx-auto" >
                                                                                    <div class="text-center" data - aos="fade-right" >
                                                                                      <div class="w-64 h-64 mx-auto mb-8 border-4 border-primary p-2 bg-white rounded-full overflow-hidden shadow-2xl" >
                                                                                        <img src="nicola.jpg" class="w-full h-full object-cover rounded-full" >
                                                                                          </div>
                                                                                          < h3 class="font-header text-3xl text-primary" > Nicola Valentino </h3>
                                                                                            < p class="font-asian text-2xl mt-4" > 水善 </p>
                                                                                              < p class="font-body italic text-xl mt-2" > Bpk.Misno & Ibu Atik Fifiani </p>
                                                                                                </div>
                                                                                                < div class="text-center" data - aos="fade-left" >
                                                                                                  <div class="w-64 h-64 mx-auto mb-8 border-4 border-secondary p-2 bg-white rounded-full overflow-hidden shadow-2xl" >
                                                                                                    <img src="salsa.jpg" class="w-full h-full object-cover rounded-full" >
                                                                                                      </div>
                                                                                                      < h3 class="font-header text-3xl text-secondary" > Salsabillah Ekanaiya </h3>
                                                                                                        < p class="font-asian text-2xl mt-4" > 火烈 </p>
                                                                                                          < p class="font-body italic text-xl mt-2" > Bpk.M.Rofiek & Ibu Sri Kurniawati </p>
                                                                                                            </div>
                                                                                                            </div>
                                                                                                            </div>
                                                                                                            </section>

                                                                                                            < !--EVENT SECTION-- >
                                                                                                              <section id="event" class="py-32 bg-dark text-cream relative" >
                                                                                                                <div class="container mx-auto px-6 text-center" >
                                                                                                                  <h2 class="font-header text-4xl mb-20 text-accent" > THE GREAT UNION </h2>
                                                                                                                    < div class="max-w-2xl mx-auto bg-white/10 backdrop-blur-md p-16 border-4 border-accent shadow-2xl" data - aos="flip-up" >
                                                                                                                      <h3 class="font-header text-4xl mb-10" > CEREMONY </h3>
                                                                                                                        < p class="font-asian text-3xl text-accent mb-6" > Kamis, 09 Oktober 2025 </p>
                                                                                                                          < p class="font-header text-2xl mb-12" > 10:00 AM - ETERNITY </p>
                                                                                                                            < div class="border-t border-accent/30 pt-10" >
                                                                                                                              <p class="font-header text-sm tracking-widest mb-6" > KINGDOM LOCATION: </p>
                                                                                                                                < p class="font-body text-xl italic uppercase" > Bocek Karangploso(Toko Pak Mendol) </p>
                                                                                                                                  </div>
                                                                                                                                  < button class="mt-12 px-12 py-5 bg-accent text-dark font-header text-xs tracking-[0.3em] hover:bg-white transition" > OPEN WORLD MAP </button>
                                                                                                                                    </div>
                                                                                                                                    < div id = "countdown" class="flex flex-wrap justify-center gap-8 mt-24" > </div>
                                                                                                                                      </div>
                                                                                                                                      </section>

                                                                                                                                      < !--GALLERY SECTION-- >
                                                                                                                                        <section id="gallery" class="py-32" >
                                                                                                                                          <div class="container mx-auto px-4 text-center" >
                                                                                                                                            <h2 class="font-header text-4xl text-dark mb-16" > SCROLL OF MEMORIES </h2>
                                                                                                                                              < div class="grid grid-cols-2 md:grid-cols-4 gap-8" >
                                                                                                                                                <div class="bg-white p-3 border-4 border-accent shadow-xl transform rotate-1" onclick = "openModal(this.querySelector('img').src)" >
                                                                                                                                                  <img src="prewedding1.jpg" class="cursor-pointer grayscale hover:grayscale-0 transition duration-1000" >
                                                                                                                                                    </div>
                                                                                                                                                    < div class="bg-white p-3 border-4 border-accent shadow-xl transform -rotate-1" onclick = "openModal(this.querySelector('img').src)" >
                                                                                                                                                      <img src="prewedding2.jpg" class="cursor-pointer grayscale hover:grayscale-0 transition duration-1000" >
                                                                                                                                                        </div>
                                                                                                                                                        < div class="bg-white p-3 border-4 border-accent shadow-xl transform rotate-1" onclick = "openModal(this.querySelector('img').src)" >
                                                                                                                                                          <img src="prewedding3.jpg" class="cursor-pointer grayscale hover:grayscale-0 transition duration-1000" >
                                                                                                                                                            </div>
                                                                                                                                                            < div class="bg-white p-3 border-4 border-accent shadow-xl transform -rotate-1" onclick = "openModal(this.querySelector('img').src)" >
                                                                                                                                                              <img src="prewedding4.jpg" class="cursor-pointer grayscale hover:grayscale-0 transition duration-1000" >
                                                                                                                                                                </div>
                                                                                                                                                                </div>
                                                                                                                                                                </div>
                                                                                                                                                                </section>

                                                                                                                                                                < !--GIFT SECTION-- >
                                                                                                                                                                  <section id="gift" class="py-32 bg-secondary text-accent text-center" >
                                                                                                                                                                    <div class="container mx-auto px-6 max-w-2xl" >
                                                                                                                                                                      <h2 class="font-header text-4xl mb-12" > EARTH KINGDOM TRIBUTE </h2>
                                                                                                                                                                        < div class="bg-parchment p-16 border-4 border-accent text-secondary shadow-2xl" data - aos="zoom-in" >
                                                                                                                                                                          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg" class="h-8 mx-auto mb-12 grayscale" >
                                                                                                                                                                            <p class="font-header text-4xl mb-4" > 8163069596 </p>
                                                                                                                                                                              < p class="font-asian text-3xl mb-12 text-dark" > NICOLA VALENTINO </p>
                                                                                                                                                                                < button onclick = "copyToClipboard()" class="px-12 py-5 bg-secondary text-accent font-header text-xs tracking-widest border-2 border-accent" > COPY TRIBUTE INFO </button>
                                                                                                                                                                                  </div>
                                                                                                                                                                                  </div>
                                                                                                                                                                                  </section>

                                                                                                                                                                                  < !--RSVP SECTION-- >
                                                                                                                                                                                    <section id="rsvp" class="py-32 pb-48" >
                                                                                                                                                                                      <div class="container mx-auto px-6 max-w-2xl text-center" >
                                                                                                                                                                                        <h2 class="font-header text-4xl text-dark mb-16" > MESSAGES FROM THE SPIRIT WORLD </h2>
                                                                                                                                                                                          < div class="bg-white p-12 border-4 border-accent shadow-2xl" >
                                                                                                                                                                                            <textarea id="guestMsg" rows = "5" class="w-full border-b-2 border-secondary p-4 font-body text-2xl focus:outline-none italic" placeholder = "Your wisdom here..." > </textarea>
                                                                                                                                                                                              < button onclick = "sendToWA()" class="w-full mt-12 bg-secondary text-accent py-5 font-header text-lg tracking-widest shadow-xl" > SEND PRAYER </button>
                                                                                                                                                                                                </div>
                                                                                                                                                                                                </div>
                                                                                                                                                                                                </section>

                                                                                                                                                                                                < footer class="py-24 bg-dark text-accent text-center border-t-8 border-secondary" >
                                                                                                                                                                                                  <h2 class="font-header text-6xl mb-6 italic" > Nicola & Salsa </h2>
                                                                                                                                                                                                    < p class="font-asian text-4xl uppercase" > 萬物長存 </p>
                                                                                                                                                                                                      </footer>

                                                                                                                                                                                                      < nav id = "navbar" class="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-parchment border-4 border-accent p-4 flex gap-12 rounded-full shadow-2xl transition-all duration-700 translate-y-32 opacity-0" >
                                                                                                                                                                                                        <a href="#home" class="text-secondary text-3xl" > <i class="fa-solid fa-yin-yang" > </i></a >
                                                                                                                                                                                                          <a href="#couple" class="text-secondary text-3xl" > <i class="fa-solid fa-user-ninja" > </i></a >
                                                                                                                                                                                                            <a href="#event" class="text-secondary text-3xl" > <i class="fa-solid fa-scroll" > </i></a >
                                                                                                                                                                                                              <a href="#gallery" class="text-secondary text-3xl" > <i class="fa-solid fa-images" > </i></a >
                                                                                                                                                                                                                <a href="#gift" class="text-secondary text-3xl" > <i class="fa-solid fa-coins" > </i></a >
                                                                                                                                                                                                                  </nav>
                                                                                                                                                                                                                  </main>

                                                                                                                                                                                                                  < !--UTILITIES -->
                                                                                                                                                                                                                    <div id="toast" class="fixed top-12 left-1/2 -translate-x-1/2 z-[1000] bg-dark border-2 border-accent text-accent px-10 py-4 font-header text-sm opacity-0 transition-all pointer-events-none shadow-2xl" > TRIBUTE RECORDED! </div>
                                                                                                                                                                                                                      < div id = "imgModal" class="modal fixed inset-0 bg-black/95 flex items-center justify-center p-6" onclick = "this.classList.remove('active')" >
                                                                                                                                                                                                                        <img id="modalImage" class="max-h-[85vh] border-8 border-accent shadow-2xl" >
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
  if (diff < 0) { dom.countdown.innerHTML = "<h3 class='font-header text-accent'>THE BALANCE IS RESTORED!</h3>"; return; }
  const t = { days: Math.floor(diff / 86400000), hrs: Math.floor((diff % 86400000) / 3600000), min: Math.floor((diff % 3600000) / 60000), sec: Math.floor((diff % 60000) / 1000) };
  dom.countdown.innerHTML = Object.entries(t).map(([k, v]) => \`
    < div class="bg-white/10 border-2 border-accent p-5 w-24 rounded-sm transform hover:scale-110 transition shadow-2xl" >
          <div class="text-3xl font-header text-accent">\${v}</div>
          <div class="text-[8px] font-header text-white uppercase">\${k}</div>
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
