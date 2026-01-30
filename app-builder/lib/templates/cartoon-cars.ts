// Auto-generated template export
// Template: cartoon-cars

export const template = `< !DOCTYPE html >
  <html lang="id" class="scroll-smooth" >
    <head>
    <meta charset="UTF-8" >
      <meta name="viewport" content = "width=device-width, initial-scale=1.0" >
        <title>The Wedding of Nicola & Salsa - Cars Edition </title>

          < !--Fonts: Racing & Bold Style-- >
            <link rel="preconnect" href = "https://fonts.googleapis.com" >
              <link rel="preconnect" href = "https://fonts.gstatic.com" crossorigin >
                <link href="https://fonts.googleapis.com/css2?family=Bungee&family=Russo+One&family=Open+Sans:wght@400;700&display=swap" rel = "stylesheet" >

                  <!--Tailwind CSS-- >
                    <script src="https://cdn.tailwindcss.com" > </script>

                      < !--AOS Animation-- >
                        <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel = "stylesheet" >

                          <!--Icons -->
                            <link rel="stylesheet" href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" >

                              <script>
                              tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: '#E10600',    /* Racing Red */
          secondary: '#FFD700',  /* Piston Cup Gold */
            dark: '#1A1A1A',       /* Asphalt Black */
              accent: '#FFFFFF',     /* Pure White */
                cream: '#F4F4F4',      /* Light Grey */
          },
      fontFamily: {
        header: ['"Bungee"', 'cursive'],
          racing: ['"Russo One"', 'sans-serif'],
            body: ['"Open Sans"', 'sans-serif'],
          }
    }
  }
}
</script>

  <style>
    /* Custom Scrollbar */
    :: -webkit - scrollbar { width: 8px; }
    :: -webkit - scrollbar - track { background: #1A1A1A; }
    :: -webkit - scrollbar - thumb { background: #E10600; border - radius: 4px; }
    
    .cover - slide - up {
  transform: translateY(-100 %);
  transition: transform 1s cubic - bezier(0.7, 0, 0.3, 1);
}

    /* Checkerboard Pattern */
    .bg - checker {
  background - image:
  linear - gradient(45deg, #000 25 %, transparent 25 %),
    linear - gradient(-45deg, #000 25 %, transparent 25 %),
    linear - gradient(45deg, transparent 75 %, #000 75 %),
    linear - gradient(-45deg, transparent 75 %, #000 75 %);
  background - size: 40px 40px;
  background - position: 0 0, 0 20px, 20px 20px, 20px 0;
  opacity: 0.1;
}

    /* Racing Button Effect */
    .btn - racing {
  border: 4px solid #000;
  box - shadow: 6px 6px 0px #000;
  transition: all 0.2s ease;
}
    .btn - racing:active {
  transform: translate(3px, 3px);
  box - shadow: 0px 0px 0px #000;
}

    /* Modal Styling */
    .modal { transition: opacity 0.3s ease; opacity: 0; pointer - events: none; z - index: 5000; }
    .modal.active { opacity: 1; pointer - events: all; }
</style>
  </head>
  < body class="bg-cream text-dark font-body overflow-hidden antialiased" >

    <!--Audio Asset-- >
      <audio id="bgMusic" loop >
        <source src="https://www.bensound.com/bensound-music/bensound-energy.mp3" type = "audio/mpeg" >
          </audio>

          < !--Music Control-- >
            <div id="musicControl" class="fixed top-6 right-6 z-50 hidden opacity-0 transition-opacity duration-1000" >
              <button onclick="toggleMusic()" class="w-14 h-14 bg-primary text-white border-4 border-dark rounded-full flex items-center justify-center shadow-xl" >
                <i class="fa-solid fa-gauge-high" id = "musicIcon" > </i>
                  </button>
                  </div>

                  < !--SECTION 1: COVER-- >
                    <div id="cover" class="fixed inset-0 z-[100] bg-primary flex flex-col justify-center items-center text-center p-6 overflow-hidden" >
                      <div class="absolute inset-0 bg-checker" > </div>
                        < div class="relative z-10" data - aos="zoom-in" >
                          <div class="bg-white p-4 border-8 border-dark inline-block mb-8 transform -rotate-2" >
                            <p class="font-header text-primary text-sm tracking-widest mb-2 uppercase" > Ready For The Race ? </p>
                              < h1 class="font-header text-5xl md:text-7xl text-dark" > Nicola & Salsa </h1>
                                </div>

                                < div class="mb-12" >
                                  <p class="font-racing text-white text-lg tracking-widest mb-4" > TO THE GUEST OF HONOR: </p>
                                    < div class="bg-secondary p-4 border-4 border-dark rounded-xl" >
                                      <p class="font-header text-dark text-xl uppercase" > TAMU UNDANGAN </p>
                                        </div>
                                        </div>

                                        < button onclick = "openInvitation()" class="btn-racing px-12 py-5 bg-white text-dark font-header text-lg uppercase" >
                                          KACHOW! BUKA UNDANGAN
                                            </button>
                                            </div>
                                            </div>

                                            < !--MAIN WRAPPER-- >
                                              <main id="mainContent" class="hidden opacity-0 transition-opacity duration-1000" >

                                                <!--SECTION 2: HOME-- >
                                                  <section id="home" class="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-32 pb-20 relative bg-dark overflow-hidden" >
                                                    <div class="absolute bottom-0 w-full h-32 bg-checker opacity-20" > </div>
                                                      < div data - aos="fade-up" class="z-10" >
                                                        <div class="border-8 border-primary bg-white p-2 inline-block mb-10 transform rotate-3 shadow-2xl" >
                                                          <img src="https://placehold.co/600x800" class="w-72 h-72 md:w-96 md:h-96 object-cover border-4 border-dark" alt = "Couple" >
                                                            </div>
                                                            < h2 class="font-header text-4xl md:text-6xl text-secondary mb-4 italic" > START YOUR ENGINES! </h2>
                                                              < p class="font-racing text-accent text-3xl mb-12" >09 OKTOBER 2025 </p>
                                                                </div>
                                                                </section>

                                                                < !--SECTION 3: AYAT-- >
                                                                  <section class="py-24 px-6 bg-primary text-white text-center border-y-8 border-dark" >
                                                                    <div class="max-w-3xl mx-auto" data - aos="fade-up" >
                                                                      <i class="fa-solid fa-flag-checkered text-4xl mb-8" > </i>
                                                                        < p class="font-racing text-lg md:text-2xl leading-relaxed mb-8 italic" >
                                                                          "Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu agar kamu merasa tenteram kepadanya."
                                                                          </p>
                                                                          < p class="font-header text-secondary tracking-widest" >— AR - RUM : 21 —</p>
                                                                            </div>
                                                                            </section>

                                                                            < !--SECTION 4: COUPLE-- >
                                                                              <section id="couple" class="py-32 bg-cream" >
                                                                                <div class="container mx-auto px-6 text-center" >
                                                                                  <h2 class="font-header text-4xl text-primary mb-20 transform -skew-x-12" > THE PIT CREW </h2>
                                                                                    < div class="flex flex-col md:flex-row justify-center gap-16 max-w-6xl mx-auto" >
                                                                                      <div class="text-center" data - aos="fade-right" >
                                                                                        <div class="w-64 h-64 mx-auto mb-8 border-8 border-dark rounded-full overflow-hidden shadow-xl" >
                                                                                          <img src="nicola.jpg" class="w-full h-full object-cover" >
                                                                                            </div>
                                                                                            < h3 class="font-header text-2xl text-dark" > Nicola Valentino </h3>
                                                                                              < p class="font-racing text-primary text-xs uppercase mt-2" > Team Captain(Groom) </p>
                                                                                                </div>
                                                                                                < div class="text-center" data - aos="fade-left" >
                                                                                                  <div class="w-64 h-64 mx-auto mb-8 border-8 border-dark rounded-full overflow-hidden shadow-xl" >
                                                                                                    <img src="salsa.jpg" class="w-full h-full object-cover" >
                                                                                                      </div>
                                                                                                      < h3 class="font-header text-2xl text-dark" > Salsabillah Ekanaiya </h3>
                                                                                                        < p class="font-racing text-primary text-xs uppercase mt-2" > The Engine(Bride) </p>
                                                                                                          </div>
                                                                                                          </div>
                                                                                                          </div>
                                                                                                          </section>

                                                                                                          < !--SECTION 5: EVENT-- >
                                                                                                            <section id="event" class="py-32 bg-dark text-white" >
                                                                                                              <div class="container mx-auto px-6 text-center" >
                                                                                                                <h2 class="font-header text-4xl text-secondary mb-16 italic" > RACE DAY INFO </h2>
                                                                                                                  < div class="max-w-xl mx-auto border-8 border-white bg-primary p-10 rounded-3xl" data - aos="flip-up" >
                                                                                                                    <h3 class="font-header text-2xl mb-8 uppercase" > MAIN EVENT: RESEPSI </h3>
                                                                                                                      < p class="font-racing text-xl mb-4" > KAMIS, 09 OKTOBER 2025 </p>
                                                                                                                        < p class="font-racing text-lg mb-10" > FLAG DROP: 10:00 WIB </p>
                                                                                                                          < div class="border-t-4 border-dark pt-8" >
                                                                                                                            <p class="font-header text-sm mb-6" > PADDOCK LOCATION: </p>
                                                                                                                              < p class="font-racing text-sm leading-loose" > Bocek Karangploso(Toko Pak Mendol) </p>
                                                                                                                                </div>
                                                                                                                                < button class="btn-racing mt-8 px-8 py-4 bg-white text-dark font-header text-xs" > GPS TRACKER </button>
                                                                                                                                  </div>
                                                                                                                                  < div id = "countdown" class="flex flex-wrap justify-center gap-6 mt-20" > </div>
                                                                                                                                    </div>
                                                                                                                                    </section>

                                                                                                                                    < !--SECTION 6: GALLERY-- >
                                                                                                                                      <section id="gallery" class="py-32 bg-cream" >
                                                                                                                                        <div class="container mx-auto px-4 text-center" >
                                                                                                                                          <h2 class="font-header text-4xl text-primary mb-16" > PHOTO PADDOCK </h2>
                                                                                                                                            < div class="grid grid-cols-2 md:grid-cols-4 gap-4" >
                                                                                                                                              <img src="prewedding1.jpg" class="border-4 border-dark cursor-pointer hover:scale-105 transition" onclick = "openModal(this.src)" >
                                                                                                                                                <img src="prewedding2.jpg" class="border-4 border-dark cursor-pointer hover:scale-105 transition" onclick = "openModal(this.src)" >
                                                                                                                                                  <img src="prewedding3.jpg" class="border-4 border-dark cursor-pointer hover:scale-105 transition" onclick = "openModal(this.src)" >
                                                                                                                                                    <img src="prewedding4.jpg" class="border-4 border-dark cursor-pointer hover:scale-105 transition" onclick = "openModal(this.src)" >
                                                                                                                                                      </div>
                                                                                                                                                      </div>
                                                                                                                                                      </section>

                                                                                                                                                      < !--SECTION 7: GIFT-- >
                                                                                                                                                        <section id="gift" class="py-32 bg-primary text-white" >
                                                                                                                                                          <div class="container mx-auto px-6 text-center max-w-2xl" >
                                                                                                                                                            <h2 class="font-header text-4xl text-secondary mb-12 italic" > FUEL THE JOURNEY </h2>
                                                                                                                                                              < div class="bg-white p-10 border-8 border-dark rounded-3xl text-dark" data - aos="zoom-in" >
                                                                                                                                                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg" class="h-8 mx-auto mb-8" >
                                                                                                                                                                  <p class="font-header text-3xl mb-4" > 8163069596 </p>
                                                                                                                                                                    < p class="font-racing text-sm text-primary uppercase font-bold mb-8" > Nicola Valentino </p>
                                                                                                                                                                      < button onclick = "copyToClipboard()" class="btn-racing px-10 py-4 bg-primary text-white font-header text-xs" > COLLECT REWARD </button>
                                                                                                                                                                        </div>
                                                                                                                                                                        </div>
                                                                                                                                                                        </section>

                                                                                                                                                                        < !--SECTION 8: RSVP-- >
                                                                                                                                                                          <section id="rsvp" class="py-32 bg-dark pb-48" >
                                                                                                                                                                            <div class="container mx-auto px-6 max-w-2xl text-center" >
                                                                                                                                                                              <h2 class="font-header text-4xl text-white mb-16 italic" > RADIO COMMS </h2>
                                                                                                                                                                                < div class="bg-white p-8 border-8 border-primary" >
                                                                                                                                                                                  <textarea id="guestMsg" rows = "5" class="w-full border-4 border-dark p-4 font-racing focus:outline-none" placeholder = "OVER AND OUT..." > </textarea>
                                                                                                                                                                                    < button onclick = "sendToWA()" class="btn-racing w-full mt-8 bg-primary text-white py-5 font-header text-sm" > SEND TRANSMISSION </button>
                                                                                                                                                                                      </div>
                                                                                                                                                                                      </div>
                                                                                                                                                                                      </section>

                                                                                                                                                                                      < !--SECTION 9: FOOTER-- >
                                                                                                                                                                                        <footer class="py-24 bg-primary text-dark text-center border-t-8 border-dark relative" >
                                                                                                                                                                                          <div class="absolute inset-0 bg-checker opacity-10" > </div>
                                                                                                                                                                                            < h2 class="font-header text-5xl mb-4 text-white" > Nicola & Salsa </h2>
                                                                                                                                                                                              < p class="font-racing text-xl text-secondary" > FINISH LINE 2025 </p>
                                                                                                                                                                                                </footer>

                                                                                                                                                                                                < !--NAVBAR -->
                                                                                                                                                                                                  <nav id="navbar" class="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-white border-4 border-dark p-4 flex gap-8 rounded-full shadow-2xl transition-all duration-700 translate-y-32 opacity-0" >
                                                                                                                                                                                                    <a href="#home" class="text-primary text-2xl" > <i class="fa-solid fa-flag-checkered" > </i></a >
                                                                                                                                                                                                      <a href="#couple" class="text-primary text-2xl" > <i class="fa-solid fa-users" > </i></a >
                                                                                                                                                                                                        <a href="#event" class="text-primary text-2xl" > <i class="fa-solid fa-road" > </i></a >
                                                                                                                                                                                                          <a href="#gallery" class="text-primary text-2xl" > <i class="fa-solid fa-camera-retro" > </i></a >
                                                                                                                                                                                                            <a href="#gift" class="text-primary text-2xl" > <i class="fa-solid fa-trophy" > </i></a >
                                                                                                                                                                                                              </nav>
                                                                                                                                                                                                              </main>

                                                                                                                                                                                                              < !--UTILITIES -->
                                                                                                                                                                                                                <div id="toast" class="fixed top-12 left-1/2 -translate-x-1/2 z-[1000] bg-secondary border-4 border-dark text-dark px-8 py-3 font-header text-xs opacity-0 transition-all pointer-events-none" > COPIED TO DASHBOARD! </div>
                                                                                                                                                                                                                  < div id = "imgModal" class="modal fixed inset-0 bg-black/95 flex items-center justify-center p-6" onclick = "this.classList.remove('active')" >
                                                                                                                                                                                                                    <img id="modalImage" class="max-h-[85vh] border-8 border-white" >
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
  if (diff < 0) { dom.countdown.innerHTML = "<h3 class='font-header text-white'>RACE IS ON!</h3>"; return; }
  const t = { days: Math.floor(diff / 86400000), hrs: Math.floor((diff % 86400000) / 3600000), min: Math.floor((diff % 3600000) / 60000), sec: Math.floor((diff % 60000) / 1000) };
  dom.countdown.innerHTML = Object.entries(t).map(([k, v]) => \`
    < div class="bg-white border-4 border-dark p-4 w-24 rounded-lg transform hover:scale-110 transition" >
          <div class="text-3xl font-header text-primary">\${v}</div>
          <div class="text-[8px] font-racing text-dark uppercase">\${k}</div>
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
    \`, //

  'cartoon-spongebob': \`< !DOCTYPE html >
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
    \`, //

  'cartoon-avatar': \`< !DOCTYPE html >
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
    \`, // 

  'streaming-netflix': \`< !DOCTYPE html >
  <html lang="id" class="scroll-smooth" >
    <head>
    <meta charset="UTF-8" >
      <meta name="viewport" content = "width=device-width, initial-scale=1.0" >
        <title>Streaming Love - Nicola & Salsa </title>

          < !--Fonts: Netflix Style(Bebas Neue & Montserrat)-- >
            <link rel="preconnect" href = "https://fonts.googleapis.com" >
              <link rel="preconnect" href = "https://fonts.gstatic.com" crossorigin >
                <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@300;400;700&display=swap" rel = "stylesheet" >

                  <script src="https://cdn.tailwindcss.com" > </script>
                    < link href = "https://unpkg.com/aos@2.3.1/dist/aos.css" rel = "stylesheet" >
                      <link rel="stylesheet" href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" >

                        <script>
                        tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: '#E50914',    /* Netflix Red */
          secondary: '#B3B3B3',  /* Netflix Grey */
            dark: '#141414',       /* Netflix Black */
              accent: '#FFFFFF',
                cream: '#181818',      /* Dark Surface */
            },
      fontFamily: {
        header: ['"Bebas Neue"', 'cursive'],
          body: ['"Montserrat"', 'sans-serif'],
            }
    }
  }
}
</script>

  <style>
      :: -webkit - scrollbar { width: 5px; }
      :: -webkit - scrollbar - track { background: #141414; }
      :: -webkit - scrollbar - thumb { background: #E50914; }
      
      .cover - slide - up {
  transform: translateY(-100 %);
  transition: transform 1s cubic - bezier(0.7, 0, 0.3, 1);
}
      
      .netflix - gradient {
  background: linear - gradient(to top, #141414 0 %, transparent 100 %);
}
  
      .profile - card:hover img {
  border: 3px solid white;
  transform: scale(1.05);
}
  
      .btn - netflix {
  @apply flex items - center justify - center gap - 2 px - 6 py - 2 rounded - md font - bold transition - all;
}

      /* Modal Styling */
      .modal { transition: opacity 0.3s ease; opacity: 0; pointer - events: none; z - index: 5000; }
      .modal.active { opacity: 1; pointer - events: all; }
</style>
  </head>
  < body class="bg-dark text-white font-body overflow-hidden antialiased" >

    <audio id="bgMusic" loop >
      <source src="https://www.bensound.com/bensound-music/bensound-memories.mp3" type = "audio/mpeg" >
        </audio>

        < div id = "musicControl" class="fixed top-6 right-6 z-50 hidden opacity-0 transition-opacity duration-1000" >
          <button onclick="toggleMusic()" class="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-primary" >
            <i class="fa-solid fa-compact-disc" id = "musicIcon" > </i>
              </button>
              </div>

              < !--SECTION 1: COVER(Who's Watching) -->
                < div id = "cover" class= "fixed inset-0 z-[100] bg-dark flex flex-col justify-center items-center text-center p-6" >
                <div class="max-w-4xl w-full" data - aos="fade-in" >
              <h1 class="text-3xl md:text-5xl font-header tracking-widest mb-12" > Who's watching Love?</h1>
              < div class= "flex flex-wrap justify-center gap-8 mb-16" >
              <div class="profile-card cursor-pointer group" onclick = "openInvitation()" >
              <div class="w-32 h-32 md:w-40 md:h-40 bg-blue-500 rounded-md mb-4 overflow-hidden transition-all duration-300" >
              <img src="nicola.jpg" class= "w-full h-full object-cover" alt = "Nicola" >
              </div>
              < p class= "text-secondary group-hover:text-white" > Nicola </p>
              </div>
              < div class= "profile-card cursor-pointer group" onclick = "openInvitation()" >
              <div class="w-32 h-32 md:w-40 md:h-40 bg-red-500 rounded-md mb-4 overflow-hidden transition-all duration-300" >
              <img src="salsa.jpg" class= "w-full h-full object-cover" alt = "Salsa" >
              </div>
              < p class= "text-secondary group-hover:text-white" > Salsa </p>
              </div>
              < div class= "profile-card cursor-pointer group" onclick = "openInvitation()" >
              <div class="w-32 h-32 md:w-40 md:h-40 bg-primary flex items-center justify-center rounded-md mb-4 transition-all duration-300" >
              <i class="fa-solid fa-heart text-5xl" > </i>
              </div>
              < p class= "text-secondary group-hover:text-white" > TAMU </p>
              </div>
              </div>
              < button onclick = "openInvitation()" class= "border border-secondary px-8 py-2 text-secondary hover:text-white hover:border-white transition-all uppercase tracking-widest text-sm" > Manage Profiles </button>
              </div>
              </div>

              < !--MAIN CONTENT-- >
              <main id="mainContent" class= "hidden opacity-0 transition-opacity duration-1000" >

              <!--SECTION 2: HOME(Netflix Featured Title)-- >
              <section id="home" class= "min-h-screen relative flex items-end pb-20 px-6 md:px-20 overflow-hidden" >
              <div class="absolute inset-0 z-0" >
              <img src="https://placehold.co/600x800" class= "w-full h-full object-cover" alt = "Featured" >
              <div class="absolute inset-0 bg-gradient-to-r from-dark via-dark/40 to-transparent" > </div>
              < div class= "absolute inset-0 netflix-gradient" > </div>
              </div>

              < div class= "relative z-10 max-w-2xl" data - aos="fade-right" >
              <div class="flex items-center gap-2 mb-4" >
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" class= "h-6" alt = "Netflix" >
              <span class="text-secondary font-bold tracking-[0.3em] text-xs" > S E R I E S </span>
              </div>
              < h2 class= "text-6xl md:text-8xl font-header mb-4" > THE ETERNAL VOW </h2>
              < p class= "text-lg mb-8 text-secondary" > Season 2025 • Releasing 09 October </p>
              < div class= "flex gap-4" >
              <button class="bg-white text-dark btn-netflix hover:bg-white/80" > <i class="fa-solid fa-play" > </i> Play</button >
              <button class="bg-secondary/40 text-white btn-netflix hover:bg-secondary/60" > <i class="fa-solid fa-circle-info" > </i> More Info</button >
              </div>
              </div>
              </section>

              < !--SECTION 3: AYAT(Dialogue Box)-- >
              <section class="py-20 px-6 bg-dark" >
              <div class="max-w-4xl mx-auto border-l-4 border-primary pl-8 py-4" data - aos="fade-up" >
              <p class="text-xl md:text-2xl font-light italic text-secondary leading-relaxed" >
              "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya."
              </p>
              < p class= "mt-4 font-bold text-primary" >— Q.S AR - RUM : 21 </p>
              </div>
              </section>

              < !--SECTION 4: COUPLE(Cast & Characters)-- >
              <section id="couple" class= "py-20 bg-dark" >
              <div class="px-6 md:px-20 mb-10" >
              <h2 class="text-3xl font-header tracking-wider" > Cast & Characters </h2>
              </div>
              < div class= "flex flex-wrap gap-8 px-6 md:px-20" >
              <div class="w-full md:w-1/3 bg-cream p-6 rounded-md group" data - aos="fade-up" >
              <img src="nicola.jpg" class= "w-full h-64 object-cover rounded-md mb-6" alt = "Groom" >
              <h3 class="text-2xl font-bold mb-2" > Nicola Valentino </h3>
              < p class= "text-primary font-bold mb-4" > As THE GROOM </p>
              < p class= "text-secondary text-sm" > Putra dari Bpk.Misno & Ibu Atik Fifiani </p>
              </div>
              < div class= "w-full md:w-1/3 bg-cream p-6 rounded-md group" data - aos="fade-up" data - aos - delay="200" >
              <img src="salsa.jpg" class= "w-full h-64 object-cover rounded-md mb-6" alt = "Bride" >
              <h3 class="text-2xl font-bold mb-2" > Salsabillah Ekanaiya </h3>
              < p class= "text-primary font-bold mb-4" > As THE BRIDE </p>
              < p class= "text-secondary text-sm" > Putri dari Bpk.M.Rofiek & Ibu Sri Kurniawati </p>
              </div>
              </div>
              </section>

              < !--SECTION 5: EVENT(Episodes / Schedule)-- >
              <section id="event" class= "py-20 bg-dark" >
              <div class="px-6 md:px-20 mb-10" >
              <h2 class="text-3xl font-header tracking-wider" > Showtimes </h2>
              </div>
              < div class= "px-6 md:px-20" >
              <div class="bg-cream p-8 rounded-md flex flex-col md:flex-row gap-10 items-center" data - aos="zoom-in" >
              <div class="w-full md:w-1/3 relative" >
              <img src="prewedding2.jpg" class= "rounded-md w-full h-48 object-cover" >
              <div class="absolute inset-0 flex items-center justify-center bg-black/40 rounded-md" >
              <i class="fa-solid fa-play text-4xl" > </i>
              </div>
              </div>
              < div class= "flex-1" >
              <h3 class="text-3xl font-bold mb-4 text-primary" > Main Ceremony: Resepsi </h3>
              < div class= "grid grid-cols-1 md:grid-cols-2 gap-6 text-secondary" >
              <div>
              <p class="text-xs uppercase font-bold text-white mb-1" > Release Date </p>
              < p > Kamis, 09 Oktober 2025 </p>
              </div>
              < div >
              <p class="text-xs uppercase font-bold text-white mb-1" > Time </p>
              < p > 10:00 WIB - Selesai </p>
              </div>
              < div class= "md:col-span-2" >
              <p class="text-xs uppercase font-bold text-white mb-1" > Location </p>
              < p > Bocek Karangploso(Toko Pak Mendol) </p>
              </div>
              </div>
              < button class= "mt-8 bg-white text-dark px-8 py-2 rounded font-bold hover:bg-white/80" > Get Directions </button>
              </div>
              </div>
              < !--Countdown -->
              <div id="countdown" class= "mt-12 flex justify-center gap-6" > </div>
              </div>
              </section>

              < !--SECTION 6: GALLERY(Trailers & Stills)-- >
              <section id="gallery" class= "py-20 bg-dark" >
              <div class="px-6 md:px-20 mb-10" >
              <h2 class="text-3xl font-header tracking-wider" > Trailers & Stills </h2>
              </div>
              < div class= "grid grid-cols-2 md:grid-cols-4 gap-4 px-6 md:px-20" >
              <div class="cursor-pointer hover:scale-105 transition duration-300" onclick = "openModal('prewedding1.jpg')" >
              <img src="prewedding1.jpg" class= "rounded-md w-full h-40 object-cover" >
              </div>
              < div class= "cursor-pointer hover:scale-105 transition duration-300" onclick = "openModal('prewedding2.jpg')" >
              <img src="prewedding2.jpg" class= "rounded-md w-full h-40 object-cover" >
              </div>
              < div class= "cursor-pointer hover:scale-105 transition duration-300" onclick = "openModal('prewedding3.jpg')" >
              <img src="prewedding3.jpg" class= "rounded-md w-full h-40 object-cover" >
              </div>
              < div class= "cursor-pointer hover:scale-105 transition duration-300" onclick = "openModal('prewedding4.jpg')" >
              <img src="prewedding4.jpg" class= "rounded-md w-full h-40 object-cover" >
              </div>
              </div>
              </section>

              < !--SECTION 7: GIFT(Membership Support)-- >
              <section id="gift" class= "py-20 bg-dark" >
              <div class="max-w-2xl mx-auto px-6 text-center" >
              <h2 class="text-3xl font-header mb-8" > Send a Gift </h2>
              < div class= "bg-cream p-10 rounded-md border-t-4 border-primary" data - aos="flip-up" >
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg" class= "h-6 mx-auto mb-8 brightness-0 invert" >
              <p class="text-3xl font-bold mb-2" > 8163069596 </p>
              < p class= "text-secondary mb-8" > A.n Nicola Valentino </p>
              < button onclick = "copyToClipboard()" class= "bg-primary text-white px-10 py-3 rounded font-bold w-full uppercase" > Copy Account Number </button>
              </div>
              </div>
              </section>

              < !--SECTION 8: RSVP(Reviews & Feedback)-- >
              <section id="rsvp" class= "py-20 bg-dark pb-40" >
              <div class="max-w-2xl mx-auto px-6" >
              <h2 class="text-3xl font-header mb-8" > Reviews & Wishes </h2>
              < div class= "bg-cream p-8 rounded-md" >
              <textarea id="guestMsg" rows = "4" class= "w-full bg-dark border-none rounded p-4 text-white focus:ring-1 focus:ring-primary mb-6" placeholder = "Write your warm wishes here..." > </textarea>
              < button onclick = "sendToWA()" class= "bg-white text-dark px-8 py-3 rounded font-bold w-full uppercase" > Submit Review </button>
              </div>
              </div>
              </section>

              < !--SECTION 9: FOOTER(Credits)-- >
              <footer class="py-20 bg-dark text-center text-secondary border-t border-white/10" >
              <p class="mb-4" >© 2025 Love Streaming Service.All rights reserved.</p>
              < div class= "flex justify-center gap-6 text-xl" >
              <i class="fa-brands fa-netflix" > </i>
              < i class= "fa-solid fa-heart" > </i>
              < i class= "fa-brands fa-youtube" > </i>
              </div>
              </footer>

              < !--NAVBAR -->
              <nav id="navbar" class= "fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-black/80 backdrop-blur-md px-10 py-4 rounded-full flex gap-10 transition-all duration-700 translate-y-32 opacity-0 border border-white/10" >
              <a href="#home" class= "text-secondary hover:text-white transition" > <i class="fa-solid fa-house" > </i></a >
              <a href="#couple" class= "text-secondary hover:text-white transition" > <i class="fa-solid fa-user-group" > </i></a >
              <a href="#event" class= "text-secondary hover:text-white transition" > <i class="fa-solid fa-calendar" > </i></a >
              <a href="#gallery" class= "text-secondary hover:text-white transition" > <i class="fa-solid fa-photo-film" > </i></a >
              <a href="#gift" class= "text-secondary hover:text-white transition" > <i class="fa-solid fa-gift" > </i></a >
              </nav>

              </main>

              < !--UTILITIES -->
              <div id="toast" class= "fixed top-12 left-1/2 -translate-x-1/2 z-[1000] bg-primary text-white px-10 py-3 rounded-md opacity-0 transition-all pointer-events-none" > Copied! </div>
              < div id = "imgModal" class= "modal fixed inset-0 bg-black/95 flex items-center justify-center p-6" onclick = "this.classList.remove('active')" >
              <img id="modalImage" class= "max-h-[85vh] border-2 border-primary rounded-md shadow-2xl" >
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
      const promise = dom.music.play();
      if (promise !== undefined) {
        await promise;
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
  if (diff < 0) { dom.countdown.innerHTML = "NOW STREAMING"; return; }
  const t = { D: Math.floor(diff / 86400000), H: Math.floor((diff % 86400000) / 3600000), M: Math.floor((diff % 3600000) / 60000), S: Math.floor((diff % 60000) / 1000) };
  dom.countdown.innerHTML = Object.entries(t).map(([k, v]) => \`
    < div class="bg-cream border-b-2 border-primary p-4 w-20 rounded shadow-lg" >
            <div class="text-3xl font-header text-white">\${v}</div>
            <div class="text-[10px] font-bold text-secondary">\${k}</div>
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
    \`, // <-- Pastikan ditutup dengan backtick

  'streaming-cinema': \`< !DOCTYPE html >
  <html lang="id" class="scroll-smooth" >
    <head>
    <meta charset="UTF-8" >
      <meta name="viewport" content = "width=device-width, initial-scale=1.0" >
        <title>Cinema Love - Nicola & Salsa </title>

          < !--Fonts: Vintage Cinema(Playfair & Montserrat)-- >
            <link rel="preconnect" href = "https://fonts.googleapis.com" >
              <link rel="preconnect" href = "https://fonts.gstatic.com" crossorigin >
                <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Montserrat:wght@400;700&display=swap" rel = "stylesheet" >

                  <script src="https://cdn.tailwindcss.com" > </script>
                    < link href = "https://unpkg.com/aos@2.3.1/dist/aos.css" rel = "stylesheet" >
                      <link rel="stylesheet" href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" >

                        <script>
                        tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: '#8B0000',    /* Velvet Red */
          secondary: '#D4AF37',  /* Movie Gold */
            dark: '#000000',
              accent: '#FFFFFF',
                cream: '#1A1A1A',
            },
      fontFamily: {
        header: ['"Playfair Display"', 'serif'],
          body: ['"Montserrat"', 'sans-serif'],
            }
    }
  }
}
</script>

  <style>
      :: -webkit - scrollbar { width: 5px; }
      :: -webkit - scrollbar - track { background: #000; }
      :: -webkit - scrollbar - thumb { background: #D4AF37; }
      
      .cover - slide - up {
  transform: translateY(-100 %);
  transition: transform 1.5s cubic - bezier(0.7, 0, 0.3, 1);
}
      
      .marquee - lights {
  box - shadow: 0 0 10px #D4AF37, inset 0 0 5px #D4AF37;
  animation: blink 1s infinite;
}
@keyframes blink { 0 %, 100 % { opacity: 1; } 50 % { opacity: 0.5; } }
  
      .ticket - dashed { border - style: dashed; border - width: 2px; border - color: #D4AF37; }

      /* Curtains Effect */
      .curtain { background: repeating - linear - gradient(to right, #8B0000, #8B0000 20px, #A52A2A 40px); }
  
      .modal { transition: opacity 0.3s ease; opacity: 0; pointer - events: none; z - index: 5000; }
      .modal.active { opacity: 1; pointer - events: all; }
</style>
  </head>
  < body class="bg-dark text-white font-body overflow-hidden antialiased" >

    <audio id="bgMusic" loop >
      <source src="https://www.bensound.com/bensound-music/bensound-slowmotion.mp3" type = "audio/mpeg" >
        </audio>

        < div id = "musicControl" class="fixed top-6 right-6 z-50 hidden opacity-0 transition-opacity duration-1000" >
          <button onclick="toggleMusic()" class="w-12 h-12 bg-secondary text-dark rounded-full flex items-center justify-center shadow-lg" >
            <i class="fa-solid fa-microphone-lines" id = "musicIcon" > </i>
              </button>
              </div>

              < !--SECTION 1: COVER(Cinema Entrance)-- >
                <div id="cover" class="fixed inset-0 z-[100] curtain flex flex-col justify-center items-center text-center p-6 border-x-[20px] border-secondary/20 shadow-inner" >
                  <div class="max-w-xl w-full bg-cream border-[10px] border-secondary p-12 relative shadow-[0_0_50px_rgba(212,175,55,0.3)]" data - aos="zoom-in" >
                    <!--Marquee Lights-- >
                      <div class="absolute -top-4 -left-4 w-4 h-4 rounded-full bg-secondary marquee-lights" > </div>
                        < div class="absolute -top-4 -right-4 w-4 h-4 rounded-full bg-secondary marquee-lights" > </div>
                          < div class="absolute -bottom-4 -left-4 w-4 h-4 rounded-full bg-secondary marquee-lights" > </div>
                            < div class="absolute -bottom-4 -right-4 w-4 h-4 rounded-full bg-secondary marquee-lights" > </div>

                              < p class="font-header text-secondary tracking-[0.3em] uppercase mb-4 italic" > Grand Premiere </p>
                                < h1 class="font-header text-5xl md:text-7xl mb-8 border-y-2 border-secondary/40 py-4" > Nicola & Salsa </h1>
                                  < div class="mb-10" >
                                    <p class="text-secondary text-xs tracking-widest uppercase mb-2" > Admit One: </p>
                                      < p class="font-header text-3xl text-white underline decoration-secondary" > TAMU UNDANGAN </p>
                                        </div>
                                        < button onclick = "openInvitation()" class="bg-secondary text-dark px-10 py-4 font-bold rounded-sm shadow-xl hover:bg-white transition-all uppercase tracking-widest text-sm" > Enter Cinema </button>
                                          </div>
                                          </div>

                                          < !--MAIN CONTENT-- >
                                            <main id="mainContent" class="hidden opacity-0 transition-opacity duration-1000" >

                                              <!--SECTION 2: HOME(Now Playing)-- >
                                                <section id="home" class="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-32 pb-20 relative bg-black" >
                                                  <div class="absolute inset-0 opacity-40" >
                                                    <img src="https://placehold.co/600x800" class="w-full h-full object-cover grayscale" >
                                                      </div>
                                                      < div class="relative z-10" data - aos="fade-up" >
                                                        <div class="inline-block bg-primary px-6 py-2 mb-6 border-2 border-secondary" >
                                                          <p class="font-bold tracking-[0.5em] text-sm uppercase" > NOW PLAYING </p>
                                                            </div>
                                                            < h2 class="font-header text-6xl md:text-8xl text-secondary drop-shadow-lg mb-8 italic" > The Wedding Story </h2>
                                                              < p class="text-3xl font-header tracking-widest" >09 . 10 . 2025 </p>
                                                                </div>
                                                                </section>

                                                                < !--SECTION 3: AYAT(Movie Quote)-- >
                                                                  <section class="py-24 px-6 bg-cream border-y border-secondary/20" >
                                                                    <div class="max-w-4xl mx-auto text-center" data - aos="fade-up" >
                                                                      <i class="fa-solid fa-quote-left text-4xl text-secondary mb-10" > </i>
                                                                        < p class="text-2xl md:text-3xl font-header text-white leading-relaxed italic mb-8" >
                                                                          "And in between the reels of fate, He created love to guide our hearts home."
                                                                          </p>
                                                                          < div class="w-20 h-1 bg-secondary mx-auto mb-4" > </div>
                                                                            < p class="font-bold text-secondary tracking-widest" > QS.AR - RUM : 21 </p>
                                                                              </div>
                                                                              </section>

                                                                              < !--SECTION 4: COUPLE(Lead Actors)-- >
                                                                                <section id="couple" class="py-32 bg-dark" >
                                                                                  <div class="text-center mb-20" >
                                                                                    <h2 class="font-header text-5xl text-secondary" > The Lead Actors </h2>
                                                                                      </div>
                                                                                      < div class="flex flex-col md:flex-row justify-center gap-16 px-6 max-w-6xl mx-auto" >
                                                                                        <div class="text-center" data - aos="fade-right" >
                                                                                          <div class="relative inline-block mb-10 group" >
                                                                                            <div class="absolute inset-0 bg-secondary blur-lg opacity-20 group-hover:opacity-40 transition" > </div>
                                                                                              < img src = "nicola.jpg" class="w-72 h-96 object-cover border-4 border-secondary relative z-10" >
                                                                                                </div>
                                                                                                < h3 class="font-header text-4xl mb-4" > Nicola Valentino </h3>
                                                                                                  < p class="text-secondary tracking-widest mb-6" > Starring as THE GROOM </p>
                                                                                                    < p class="text-sm italic opacity-60" > Putra dari Bpk.Misno & Ibu Atik Fifiani </p>
                                                                                                      </div>
                                                                                                      < div class="text-center" data - aos="fade-left" >
                                                                                                        <div class="relative inline-block mb-10 group" >
                                                                                                          <div class="absolute inset-0 bg-secondary blur-lg opacity-20 group-hover:opacity-40 transition" > </div>
                                                                                                            < img src = "salsa.jpg" class="w-72 h-96 object-cover border-4 border-secondary relative z-10" >
                                                                                                              </div>
                                                                                                              < h3 class="font-header text-4xl mb-4" > Salsabillah Ekanaiya </h3>
                                                                                                                < p class="text-secondary tracking-widest mb-6" > Starring as THE BRIDE </p>
                                                                                                                  < p class="text-sm italic opacity-60" > Putri dari Bpk.M.Rofiek & Ibu Sri Kurniawati </p>
                                                                                                                    </div>
                                                                                                                    </div>
                                                                                                                    </section>

                                                                                                                    < !--SECTION 5: EVENT(Showtimes)-- >
                                                                                                                      <section id="event" class="py-32 bg-cream" >
                                                                                                                        <div class="container mx-auto px-6 text-center" >
                                                                                                                          <h2 class="font-header text-5xl text-secondary mb-20" > Ticket to Showtime </h2>
                                                                                                                            < div class="max-w-2xl mx-auto bg-primary ticket-dashed p-12 rounded-lg relative overflow-hidden shadow-2xl" data - aos="flip-up" >
                                                                                                                              <!--Ticket Side Circles-- >
                                                                                                                                <div class="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-cream rounded-full" > </div>
                                                                                                                                  < div class="absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-cream rounded-full" > </div>

                                                                                                                                    < h3 class="font-header text-3xl mb-8 border-b border-secondary/30 pb-4" > MAIN PREMIERE </h3>
                                                                                                                                      < div class="grid grid-cols-2 gap-8 text-center mb-10" >
                                                                                                                                        <div>
                                                                                                                                        <p class="text-xs text-secondary uppercase tracking-widest mb-1" > Date </p>
                                                                                                                                          < p class="font-bold" >09 OCT 2025 </p>
                                                                                                                                            </div>
                                                                                                                                            < div >
                                                                                                                                            <p class="text-xs text-secondary uppercase tracking-widest mb-1" > Time </p>
                                                                                                                                              < p class="font-bold" > 10:00 AM </p>
                                                                                                                                                </div>
                                                                                                                                                < div class="col-span-2" >
                                                                                                                                                  <p class="text-xs text-secondary uppercase tracking-widest mb-1" > Location </p>
                                                                                                                                                    < p class="font-bold" > Bocek Karangploso(Toko Pak Mendol) </p>
                                                                                                                                                      </div>
                                                                                                                                                      </div>
                                                                                                                                                      < button class="bg-secondary text-dark px-10 py-3 font-bold uppercase tracking-widest" > Get Your Ticket </button>
                                                                                                                                                        </div>
                                                                                                                                                        < div id = "countdown" class="flex flex-wrap justify-center gap-6 mt-24" > </div>
                                                                                                                                                          </div>
                                                                                                                                                          </section>

                                                                                                                                                          < !--SECTION 6: GALLERY(Photo Reels)-- >
                                                                                                                                                            <section id="gallery" class="py-32 bg-dark" >
                                                                                                                                                              <div class="text-center mb-20" >
                                                                                                                                                                <h2 class="font-header text-5xl text-secondary" > Cinema Reel Gallery </h2>
                                                                                                                                                                  </div>
                                                                                                                                                                  < div class="flex flex-wrap justify-center gap-6 px-4" >
                                                                                                                                                                    <img src="prewedding1.jpg" class="w-40 h-60 object-cover border-2 border-secondary grayscale hover:grayscale-0 cursor-pointer transition duration-500" onclick = "openModal(this.src)" >
                                                                                                                                                                      <img src="prewedding2.jpg" class="w-40 h-60 object-cover border-2 border-secondary grayscale hover:grayscale-0 cursor-pointer transition duration-500" onclick = "openModal(this.src)" >
                                                                                                                                                                        <img src="prewedding3.jpg" class="w-40 h-60 object-cover border-2 border-secondary grayscale hover:grayscale-0 cursor-pointer transition duration-500" onclick = "openModal(this.src)" >
                                                                                                                                                                          <img src="prewedding4.jpg" class="w-40 h-60 object-cover border-2 border-secondary grayscale hover:grayscale-0 cursor-pointer transition duration-500" onclick = "openModal(this.src)" >
                                                                                                                                                                            </div>
                                                                                                                                                                            </section>

                                                                                                                                                                            < !--SECTION 7: GIFT(Box Office)-- >
                                                                                                                                                                              <section id="gift" class="py-32 bg-cream" >
                                                                                                                                                                                <div class="max-w-2xl mx-auto px-6 text-center" >
                                                                                                                                                                                  <h2 class="font-header text-5xl text-secondary mb-12 italic" > Box Office Gift </h2>
                                                                                                                                                                                    < div class="bg-dark p-12 border-4 border-secondary shadow-2xl" data - aos="zoom-in" >
                                                                                                                                                                                      <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg" class="h-6 mx-auto mb-10 grayscale invert" >
                                                                                                                                                                                        <p class="font-header text-5xl mb-4 text-secondary" > 8163069596 </p>
                                                                                                                                                                                          < p class="text-xl italic mb-10" > A.n Nicola Valentino </p>
                                                                                                                                                                                            < button onclick = "copyToClipboard()" class="bg-secondary text-dark px-10 py-4 font-bold rounded-sm w-full uppercase" > Copy Account Number </button>
                                                                                                                                                                                              </div>
                                                                                                                                                                                              </div>
                                                                                                                                                                                              </section>

                                                                                                                                                                                              < !--SECTION 8: RSVP(Guest Reviews)-- >
                                                                                                                                                                                                <section id="rsvp" class="py-32 bg-dark pb-48" >
                                                                                                                                                                                                  <div class="max-w-2xl mx-auto px-6 text-center" >
                                                                                                                                                                                                    <h2 class="font-header text-5xl text-secondary mb-16" > The Critic's Reviews</h2>
                                                                                                                                                                                                      < div class="bg-cream p-10 border-t-8 border-primary shadow-2xl" >
                                                                                                                                                                                                        <textarea id="guestMsg" rows = "5" class="w-full bg-dark/50 border-2 border-secondary/30 rounded p-6 text-white focus:border-secondary mb-8 font-header italic text-xl" placeholder = "Write your warm blessing here..." > </textarea>
                                                                                                                                                                                                          < button onclick = "sendToWA()" class="bg-secondary text-dark px-10 py-5 font-bold rounded-sm w-full uppercase text-lg" > Send Review </button>
                                                                                                                                                                                                            </div>
                                                                                                                                                                                                            </div>
                                                                                                                                                                                                            </section>

                                                                                                                                                                                                            < !--SECTION 9: FOOTER(End Credits)-- >
                                                                                                                                                                                                              <footer class="py-24 bg-black text-center border-t border-secondary/20" >
                                                                                                                                                                                                                <h2 class="font-header text-6xl text-secondary mb-4 italic" > Nicola & Salsa </h2>
                                                                                                                                                                                                                  < p class="tracking-[0.5em] text-xs opacity-40 uppercase mb-10" > THE END OF CHAPTER ONE • 2025 </p>
                                                                                                                                                                                                                    < div class="text-secondary text-2xl flex justify-center gap-8" >
                                                                                                                                                                                                                      <i class="fa-solid fa-film" > </i>
                                                                                                                                                                                                                        < i class="fa-solid fa-star" > </i>
                                                                                                                                                                                                                          < i class="fa-solid fa-ticket" > </i>
                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                            </footer>

                                                                                                                                                                                                                            < !--NAVBAR -->
                                                                                                                                                                                                                              <nav id="navbar" class="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-secondary/90 backdrop-blur-md px-10 py-4 rounded-full flex gap-12 transition-all duration-700 translate-y-32 opacity-0 shadow-2xl" >
                                                                                                                                                                                                                                <a href="#home" class="text-dark hover:scale-125 transition" > <i class="fa-solid fa-house" > </i></a >
                                                                                                                                                                                                                                  <a href="#couple" class="text-dark hover:scale-125 transition" > <i class="fa-solid fa-star" > </i></a >
                                                                                                                                                                                                                                    <a href="#event" class="text-dark hover:scale-125 transition" > <i class="fa-solid fa-ticket" > </i></a >
                                                                                                                                                                                                                                      <a href="#gallery" class="text-dark hover:scale-125 transition" > <i class="fa-solid fa-clapperboard" > </i></a >
                                                                                                                                                                                                                                        <a href="#gift" class="text-dark hover:scale-125 transition" > <i class="fa-solid fa-gift" > </i></a >
                                                                                                                                                                                                                                          </nav>

                                                                                                                                                                                                                                          </main>

                                                                                                                                                                                                                                          < !--UTILITIES -->
                                                                                                                                                                                                                                            <div id="toast" class="fixed top-12 left-1/2 -translate-x-1/2 z-[1000] bg-secondary text-dark px-10 py-3 rounded-sm font-bold opacity-0 transition-all pointer-events-none shadow-xl" > COPIED! </div>
                                                                                                                                                                                                                                              < div id = "imgModal" class="modal fixed inset-0 bg-black/95 flex items-center justify-center p-6" onclick = "this.classList.remove('active')" >
                                                                                                                                                                                                                                                <img id="modalImage" class="max-h-[85vh] border-4 border-secondary shadow-2xl" >
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
      const promise = dom.music.play();
      if (promise !== undefined) {
        await promise;
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
  if (diff < 0) { dom.countdown.innerHTML = "PREMIERE STARTED"; return; }
  const t = { D: Math.floor(diff / 86400000), H: Math.floor((diff % 86400000) / 3600000), M: Math.floor((diff % 3600000) / 60000), S: Math.floor((diff % 60000) / 1000) };
  dom.countdown.innerHTML = Object.entries(t).map(([k, v]) => \`
    < div class="bg-primary border border-secondary p-4 w-20 shadow-xl" >
            <div class="text-3xl font-header text-secondary">\${v}</div>
            <div class="text-[10px] font-bold text-white opacity-60">\${k}</div>
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
    \`, // <-- Pastikan ditutup dengan backtick

  'tradition-javanese': \`< !DOCTYPE html >
  <html lang="id" class="scroll-smooth" >
    <head>
    <meta charset="UTF-8" >
      <meta name="viewport" content = "width=device-width, initial-scale=1.0" >
        <title>Undangan Pernikahan Nicola & Salsa - Adat Jawa </title>

          < !--Fonts: Royal & Script-- >
            <link rel="preconnect" href = "https://fonts.googleapis.com" >
              <link rel="preconnect" href = "https://fonts.gstatic.com" crossorigin >
                <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Great+Vibes&family=Quicksand:wght@400;600&display=swap" rel = "stylesheet" >

                  <script src="https://cdn.tailwindcss.com" > </script>
                    < link href = "https://unpkg.com/aos@2.3.1/dist/aos.css" rel = "stylesheet" >
                      <link rel="stylesheet" href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" >

                        <script>
                        tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: '#5D4037',    /* Sogan Brown */
          secondary: '#D4AF37',  /* Gold Metallic */
            dark: '#1B1310',       /* Deep Earth */
              accent: '#2E7D32',     /* Royal Green */
                cream: '#FDF5E6',      /* Old Paper */
            },
      fontFamily: {
        header: ['"Playfair Display"', 'serif'],
          script: ['"Great Vibes"', 'cursive'],
            body: ['"Quicksand"', 'sans-serif'],
            }
    }
  }
}
</script>

  <style>
      :: -webkit - scrollbar { width: 5px; }
      :: -webkit - scrollbar - track { background: #1B1310; }
      :: -webkit - scrollbar - thumb { background: #D4AF37; }
      
      .cover - slide - up {
  transform: translateY(-100 %);
  transition: transform 1.5s cubic - bezier(0.7, 0, 0.3, 1);
}

      /* Batik Pattern Overlay */
      .bg - batik {
  background - color: #FDF5E6;
  background - image: url("https://www.transparenttextures.com/patterns/pinstriped-suit.png");
}

      /* Gunungan Shape Mask for Image */
      .img - gunungan {
  clip - path: polygon(50 % 0 %, 100 % 70 %, 80 % 100 %, 20 % 100 %, 0 % 70 %);
  border - bottom: 4px solid #D4AF37;
}
  
      .border - gold { border: 2px solid #D4AF37; outline: 4px solid #5D4037; }
      
      .modal { transition: opacity 0.3s ease; opacity: 0; pointer - events: none; z - index: 5000; }
      .modal.active { opacity: 1; pointer - events: all; }
</style>
  </head>
  < body class="bg-cream text-primary font-body overflow-hidden antialiased" >

    <audio id="bgMusic" loop >
      <source src="https://www.bensound.com/bensound-music/bensound-relaxing.mp3" type = "audio/mpeg" >
        </audio>

        < div id = "musicControl" class="fixed top-6 right-6 z-50 hidden opacity-0 transition-opacity duration-1000" >
          <button onclick="toggleMusic()" class="w-12 h-12 bg-primary text-secondary rounded-full flex items-center justify-center border-2 border-secondary shadow-xl" >
            <i class="fa-solid fa-leaf" id = "musicIcon" > </i>
              </button>
              </div>

              < !--SECTION 1: COVER-- >
                <div id="cover" class="fixed inset-0 z-[100] bg-dark flex flex-col justify-center items-center text-center p-6 border-[12px] border-primary" >
                  <div class="absolute inset-0 opacity-10 bg-[url('https://png.pngtree.com/png-vector/20220719/ourmid/pngtree-parang-tritis-batik-pattern-png-image_6010022.png')] bg-repeat" > </div>
                    < div class="relative z-10 bg-cream/90 p-12 border-4 border-secondary shadow-2xl" data - aos="zoom-in" >
                      <p class="font-header italic text-primary tracking-widest text-sm mb-4" > Serat Undangan Pawiwahan </p>
                        < h1 class="font-script text-6xl md:text-8xl text-primary mb-10" > Nicola & Salsa </h1>
                          < div class="mb-12" >
                            <p class="text-xs tracking-widest uppercase opacity-60 mb-2" > Katur dhumateng: </p>
                              < p class="font-header text-2xl text-accent underline decoration-secondary" > TAMU UNDANGAN </p>
                                </div>
                                < button onclick = "openInvitation()" class="px-10 py-4 bg-primary text-secondary font-header text-sm tracking-widest border-2 border-secondary hover:bg-dark transition" >
                                  BUKA SERAT UNDANGAN
                                    </button>
                                    </div>
                                    </div>

                                    < !--MAIN CONTENT-- >
                                      <main id="mainContent" class="hidden opacity-0 transition-opacity duration-1000" >

                                        <!--SECTION 2: HOME-- >
                                          <section id="home" class="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-32 pb-20 bg-batik" >
                                            <div data - aos="fade-up" >
                                              <div class="relative mb-12 inline-block" >
                                                <img src="https://placehold.co/600x800" class="img-gunungan w-72 h-96 md:w-80 md:h-[500px] object-cover mx-auto shadow-2xl" >
                                                  <div class="absolute -top-10 left-1/2 -translate-x-1/2 text-secondary text-6xl opacity-30" > <i class="fa-solid fa-om" > </i></div >
                                                    </div>
                                                    < h2 class="font-script text-6xl text-primary mb-4" > Nicola & Salsa </h2>
                                                      < p class="font-header text-xl text-accent tracking-widest" >09 OKTOBER 2025 </p>
                                                        </div>
                                                        </section>

                                                        < !--SECTION 3: AYAT-- >
                                                          <section class="py-24 px-6 bg-primary text-secondary text-center" >
                                                            <div class="max-w-3xl mx-auto" data - aos="fade-up" >
                                                              <i class="fa-solid fa-quote-left text-4xl opacity-30 mb-8" > </i>
                                                                < p class="font-header italic text-xl md:text-2xl leading-relaxed mb-8" >
                                                                  "Witing tresno jalaran soko kulino. Gegandengan asto mbetahaken tresno tulus saking manah."
                                                                  </p>
                                                                  < p class="font-header tracking-widest text-xs" >— QS.AR - RUM : 21 —</p>
                                                                    </div>
                                                                    </section>

                                                                    < !--SECTION 4: COUPLE-- >
                                                                      <section id="couple" class="py-32 bg-cream" >
                                                                        <div class="container mx-auto px-6 text-center" >
                                                                          <h2 class="font-header text-4xl text-primary mb-20 italic underline decoration-secondary" > Mempelai </h2>
                                                                            < div class="flex flex-col md:flex-row justify-center gap-20 max-w-6xl mx-auto" >
                                                                              <div class="text-center" data - aos="fade-right" >
                                                                                <div class="w-64 h-64 mx-auto mb-8 border-gold rounded-full overflow-hidden p-2 bg-cream" >
                                                                                  <img src="nicola.jpg" class="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition duration-1000" >
                                                                                    </div>
                                                                                    < h3 class="font-header text-3xl text-primary mb-2" > Nicola Valentino </h3>
                                                                                      < p class="text-sm italic opacity-70" > Putra saking Bpk.Misno & Ibu Atik Fifiani </p>
                                                                                        </div>
                                                                                        < div class="text-center" data - aos="fade-left" >
                                                                                          <div class="w-64 h-64 mx-auto mb-8 border-gold rounded-full overflow-hidden p-2 bg-cream" >
                                                                                            <img src="salsa.jpg" class="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition duration-1000" >
                                                                                              </div>
                                                                                              < h3 class="font-header text-3xl text-primary mb-2" > Salsabillah Ekanaiya </h3>
                                                                                                < p class="text-sm italic opacity-70" > Putri saking Bpk.M.Rofiek & Ibu Sri Kurniawati </p>
                                                                                                  </div>
                                                                                                  </div>
                                                                                                  </div>
                                                                                                  </section>

                                                                                                  < !--SECTION 5: EVENT-- >
                                                                                                    <section id="event" class="py-32 bg-dark text-cream relative" >
                                                                                                      <div class="container mx-auto px-6 text-center relative z-10" >
                                                                                                        <h2 class="font-header text-4xl text-secondary mb-20 italic" > Wekdal Pawiwahan </h2>
                                                                                                          < div class="max-w-2xl mx-auto bg-primary border-4 border-secondary p-12 shadow-2xl" data - aos="flip-up" >
                                                                                                            <h3 class="font-header text-3xl mb-8 border-b border-secondary/30 pb-4 text-secondary" > RESEPSI </h3>
                                                                                                              < p class="font-header text-xl mb-4" > Kemis, 09 Oktober 2025 </p>
                                                                                                                < p class="font-header text-lg mb-10" > Tabuh 10.00 WIB - Sakrampungan </p>
                                                                                                                  < div class="pt-8" >
                                                                                                                    <p class="font-header text-xs tracking-widest mb-4 opacity-60 uppercase" > Papan Panggonan: </p>
                                                                                                                      < p class="font-body text-lg italic uppercase" > Bocek Karangploso(Toko Pak Mendol) </p>
                                                                                                                        </div>
                                                                                                                        < button class="mt-12 px-10 py-4 border-2 border-secondary text-secondary font-header text-xs tracking-widest hover:bg-secondary hover:text-dark transition" > PETUNJUK LOKASI </button>
                                                                                                                          </div>
                                                                                                                          < div id = "countdown" class="flex flex-wrap justify-center gap-6 mt-24" > </div>
                                                                                                                            </div>
                                                                                                                            </section>

                                                                                                                            < !--SECTION 6: GALLERY-- >
                                                                                                                              <section id="gallery" class="py-32 bg-batik" >
                                                                                                                                <div class="container mx-auto px-4 text-center" >
                                                                                                                                  <h2 class="font-header text-4xl text-primary mb-16" > Kenangan Indah </h2>
                                                                                                                                    < div class="grid grid-cols-2 md:grid-cols-4 gap-6" >
                                                                                                                                      <div class="border-4 border-secondary p-1 bg-white shadow-xl transform -rotate-1" onclick = "openModal(this.querySelector('img').src)" >
                                                                                                                                        <img src="prewedding1.jpg" class="cursor-pointer grayscale hover:grayscale-0 transition duration-1000" >
                                                                                                                                          </div>
                                                                                                                                          < div class="border-4 border-secondary p-1 bg-white shadow-xl transform rotate-1" onclick = "openModal(this.querySelector('img').src)" >
                                                                                                                                            <img src="prewedding2.jpg" class="cursor-pointer grayscale hover:grayscale-0 transition duration-1000" >
                                                                                                                                              </div>
                                                                                                                                              < div class="border-4 border-secondary p-1 bg-white shadow-xl transform -rotate-1" onclick = "openModal(this.querySelector('img').src)" >
                                                                                                                                                <img src="prewedding3.jpg" class="cursor-pointer grayscale hover:grayscale-0 transition duration-1000" >
                                                                                                                                                  </div>
                                                                                                                                                  < div class="border-4 border-secondary p-1 bg-white shadow-xl transform rotate-1" onclick = "openModal(this.querySelector('img').src)" >
                                                                                                                                                    <img src="prewedding4.jpg" class="cursor-pointer grayscale hover:grayscale-0 transition duration-1000" >
                                                                                                                                                      </div>
                                                                                                                                                      </div>
                                                                                                                                                      </div>
                                                                                                                                                      </section>

                                                                                                                                                      < !--SECTION 7: GIFT-- >
                                                                                                                                                        <section id="gift" class="py-32 bg-primary text-secondary text-center" >
                                                                                                                                                          <div class="container mx-auto px-6 max-w-2xl" >
                                                                                                                                                            <h2 class="font-header text-4xl mb-12 italic" > Kado Katresnan </h2>
                                                                                                                                                              < div class="bg-cream p-12 border-4 border-secondary text-primary shadow-2xl" data - aos="zoom-in" >
                                                                                                                                                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg" class="h-6 mx-auto mb-10 grayscale" >
                                                                                                                                                                  <p class="font-header text-4xl mb-4 tracking-widest" > 8163069596 </p>
                                                                                                                                                                    < p class="font-header text-lg mb-12" > A.n Nicola Valentino </p>
                                                                                                                                                                      < button onclick = "copyToClipboard()" class="px-12 py-4 bg-primary text-secondary font-header text-xs tracking-widest border-2 border-secondary" > SALIN NOMER REKENING </button>
                                                                                                                                                                        </div>
                                                                                                                                                                        </div>
                                                                                                                                                                        </section>

                                                                                                                                                                        < !--SECTION 8: RSVP-- >
                                                                                                                                                                          <section id="rsvp" class="py-32 bg-batik pb-48" >
                                                                                                                                                                            <div class="container mx-auto px-6 max-w-2xl text-center" >
                                                                                                                                                                              <h2 class="font-header text-4xl text-primary mb-16" > Dunga Pangestu </h2>
                                                                                                                                                                                < div class="bg-white p-10 border-4 border-secondary shadow-2xl" >
                                                                                                                                                                                  <textarea id="guestMsg" rows = "5" class="w-full border-b-2 border-primary p-4 font-body text-xl focus:outline-none italic" placeholder = "Serataken dunga pangestu panjenengan dhumateng mempelai..." > </textarea>
                                                                                                                                                                                    < button onclick = "sendToWA()" class="w-full mt-12 bg-primary text-secondary py-5 font-header text-lg tracking-widest shadow-xl" > KIRIM DUNGA </button>
                                                                                                                                                                                      </div>
                                                                                                                                                                                      </div>
                                                                                                                                                                                      </section>

                                                                                                                                                                                      < !--SECTION 9: FOOTER-- >
                                                                                                                                                                                        <footer class="py-24 bg-dark text-secondary text-center border-t-8 border-primary relative" >
                                                                                                                                                                                          <h2 class="font-script text-6xl mb-6" > Nicola & Salsa </h2>
                                                                                                                                                                                            < p class="font-header tracking-[0.5em] text-xs opacity-40" > MATUR NUWUN • 2025 </p>
                                                                                                                                                                                              </footer>

                                                                                                                                                                                              < !--NAVBAR -->
                                                                                                                                                                                                <nav id="navbar" class="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-cream border-2 border-secondary p-4 flex gap-10 rounded-full shadow-2xl transition-all duration-700 translate-y-32 opacity-0" >
                                                                                                                                                                                                  <a href="#home" class="text-primary text-2xl" > <i class="fa-solid fa-house" > </i></a >
                                                                                                                                                                                                    <a href="#couple" class="text-primary text-2xl" > <i class="fa-solid fa-user-group" > </i></a >
                                                                                                                                                                                                      <a href="#event" class="text-primary text-2xl" > <i class="fa-solid fa-scroll" > </i></a >
                                                                                                                                                                                                        <a href="#gallery" class="text-primary text-2xl" > <i class="fa-solid fa-camera-retro" > </i></a >
                                                                                                                                                                                                          <a href="#gift" class="text-primary text-2xl" > <i class="fa-solid fa-gift" > </i></a >
                                                                                                                                                                                                            </nav>
                                                                                                                                                                                                            </main>

                                                                                                                                                                                                            < !--UTILITIES -->
                                                                                                                                                                                                              <div id="toast" class="fixed top-12 left-1/2 -translate-x-1/2 z-[1000] bg-primary border-2 border-secondary text-secondary px-10 py-4 font-header text-sm opacity-0 transition-all pointer-events-none shadow-2xl" > BERHASIL DISALIN! </div>
                                                                                                                                                                                                                < div id = "imgModal" class="modal fixed inset-0 bg-black/95 flex items-center justify-center p-6" onclick = "this.classList.remove('active')" >
                                                                                                                                                                                                                  <img id="modalImage" class="max-h-[85vh] border-4 border-secondary shadow-2xl" >
                                                                                                                                                                                                                    </div>

                                                                                                                                                                                                                    < script src = "https://unpkg.com/aos@2.3.1/dist/aos.js" > </script>
                                                                                                                                                                                                                      <script>
AOS.init({ once: true, duration: 1000 });
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
  if (diff < 0) { dom.countdown.innerHTML = "<h3 class='font-header text-secondary tracking-widest uppercase'>Dinten Bahagia Sampun Tiba</h3>"; return; }
  const t = { dinten: Math.floor(diff / 86400000), jam: Math.floor((diff % 86400000) / 3600000), menit: Math.floor((diff % 3600000) / 60000), detik: Math.floor((diff % 60000) / 1000) };
  dom.countdown.innerHTML = Object.entries(t).map(([k, v]) => \`
    < div class="bg-primary border-2 border-secondary p-4 w-24 rounded-lg transform hover:scale-110 transition shadow-lg" >
            <div class="text-3xl font-header text-secondary">\${v}</div>
            <div class="text-[8px] font-header text-white uppercase opacity-60">\${k}</div>
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
    \`, // <-- Pastikan ditutup dengan backtick

  'tradition-minang': \`< !DOCTYPE html >
  <html lang="id" class="scroll-smooth" >
    <head>
    <meta charset="UTF-8" >
      <meta name="viewport" content = "width=device-width, initial-scale=1.0" >
        <title>Undangan Pernikahan Nicola & Salsa - Adat Minang </title>

          < link rel = "preconnect" href = "https://fonts.googleapis.com" >
            <link rel="preconnect" href = "https://fonts.gstatic.com" crossorigin >
              <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Great+Vibes&family=Montserrat:wght@400;700&display=swap" rel = "stylesheet" >

                <script src="https://cdn.tailwindcss.com" > </script>
                  < link href = "https://unpkg.com/aos@2.3.1/dist/aos.css" rel = "stylesheet" >
                    <link rel="stylesheet" href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" >

                      <script>
                      tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: '#B71C1C',    /* Minang Red */
          secondary: '#D4AF37',  /* Gold */
            dark: '#121212',       /* Minang Black */
              accent: '#FFC107',     /* Minang Yellow */
                cream: '#FFFBEC',
            },
      fontFamily: {
        header: ['"Cinzel"', 'serif'],
          script: ['"Great Vibes"', 'cursive'],
            body: ['"Montserrat"', 'sans-serif'],
            }
    }
  }
}
</script>
  
    <style>
  .bg - songket {
  background - color: #B71C1C;
  background - image: url("https://www.transparenttextures.com/patterns/pinstriped-suit.png");
}
      
      .gadang - corner {
  border - radius: 60px 0 60px 0;
  border: 4px solid #D4AF37;
}
      
      .cover - slide - up {
  transform: translateY(-100 %);
  transition: transform 1.2s cubic - bezier(0.7, 0, 0.3, 1);
}
      
      .modal { transition: opacity 0.3s ease; opacity: 0; pointer - events: none; z - index: 5000; }
      .modal.active { opacity: 1; pointer - events: all; }
</style>
  </head>
  < body class="bg-cream text-dark font-body overflow-hidden antialiased" >

    <audio id="bgMusic" loop >
      <source src="https://www.bensound.com/bensound-music/bensound-relaxing.mp3" type = "audio/mpeg" >
        </audio>

        < div id = "musicControl" class="fixed top-6 right-6 z-50 hidden opacity-0 transition-opacity duration-1000" >
          <button onclick="toggleMusic()" class="w-12 h-12 bg-primary text-secondary rounded-full flex items-center justify-center border-2 border-secondary shadow-xl" >
            <i class="fa-solid fa-gem" id = "musicIcon" > </i>
              </button>
              </div>

              < !--COVER -->
                <div id="cover" class="fixed inset-0 z-[100] bg-dark flex flex-col justify-center items-center text-center p-6 border-x-[20px] border-primary" >
                  <div class="relative z-10 bg-primary/95 p-12 gadang-corner shadow-2xl" data - aos="zoom-in" >
                    <p class="font-header text-accent tracking-widest text-sm mb-4" > Aleks Nagari </p>
                      < h1 class="font-script text-6xl md:text-8xl text-secondary mb-10" > Nicola & Salsa </h1>
                        < div class="mb-12" >
                          <p class="text-xs tracking-widest uppercase text-white opacity-60 mb-2" > Mananti Kadatangan: </p>
                            < p class="font-header text-2xl text-accent underline decoration-secondary uppercase" > TAMU UNDANGAN </p>
                              </div>
                              < button onclick = "openInvitation()" class="px-10 py-4 bg-secondary text-dark font-header text-sm tracking-widest hover:bg-white transition-all" >
                                BUKA UNDANGAN
                                  </button>
                                  </div>
                                  </div>

                                  < !--MAIN CONTENT-- >
                                    <main id="mainContent" class="hidden opacity-0 transition-opacity duration-1000" >

                                      <!--HOME -->
                                        <section id="home" class="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-32 pb-20 bg-songket" >
                                          <div data - aos="fade-up" >
                                            <div class="relative mb-12 inline-block bg-white p-4 gadang-corner" >
                                              <img src="https://placehold.co/600x800" class="w-72 h-96 md:w-80 md:h-[500px] object-cover mx-auto shadow-2xl gadang-corner" >
                                                </div>
                                                < h2 class="font-script text-7xl text-secondary mb-4 drop-shadow-lg" > Nicola & Salsa </h2>
                                                  < p class="font-header text-2xl text-accent tracking-widest" >09 OKTOBER 2025 </p>
                                                    </div>
                                                    </section>

                                                    < !--AYAT -->
                                                      <section class="py-24 px-6 bg-dark text-secondary text-center border-y-8 border-primary" >
                                                        <div class="max-w-3xl mx-auto" data - aos="fade-up" >
                                                          <i class="fa-solid fa-star text-4xl opacity-30 mb-8 text-accent" > </i>
                                                            < p class="font-body text-xl md:text-2xl leading-relaxed mb-8 italic text-white/80" >
                                                              "Adaik basandi Syara', Syara' basandi Kitabullah. Baralek gadang bapisau tajam, manjago nagari jo kasih sayang."
                                                              </p>
                                                              < p class="font-header tracking-widest text-accent" >— ADAT NAN TARADAT —</p>
                                                                </div>
                                                                </section>

                                                                < !--COUPLE -->
                                                                  <section id="couple" class="py-32 bg-cream" >
                                                                    <div class="container mx-auto px-6 text-center" >
                                                                      <h2 class="font-header text-4xl text-primary mb-20 underline decoration-secondary" > Anak Daro & Marapulai </h2>
                                                                        < div class="flex flex-col md:flex-row justify-center gap-20 max-w-6xl mx-auto" >
                                                                          <div class="text-center" data - aos="fade-right" >
                                                                            <div class="w-64 h-64 mx-auto mb-8 border-4 border-secondary p-2 bg-primary gadang-corner overflow-hidden" >
                                                                              <img src="nicola.jpg" class="w-full h-full object-cover gadang-corner" >
                                                                                </div>
                                                                                < h3 class="font-header text-3xl text-primary mb-2" > Nicola Valentino </h3>
                                                                                  < p class="text-sm font-bold opacity-70" > Marapulai </p>
                                                                                    < p class="text-xs mt-2 italic" > Putra dari Bpk.Misno & Ibu Atik Fifiani </p>
                                                                                      </div>
                                                                                      < div class="text-center" data - aos="fade-left" >
                                                                                        <div class="w-64 h-64 mx-auto mb-8 border-4 border-secondary p-2 bg-primary gadang-corner overflow-hidden" >
                                                                                          <img src="salsa.jpg" class="w-full h-full object-cover gadang-corner" >
                                                                                            </div>
                                                                                            < h3 class="font-header text-3xl text-primary mb-2" > Salsabillah Ekanaiya </h3>
                                                                                              < p class="text-sm font-bold opacity-70" > Anak Daro </p>
                                                                                                < p class="text-xs mt-2 italic" > Putri dari Bpk.M.Rofiek & Ibu Sri Kurniawati </p>
                                                                                                  </div>
                                                                                                  </div>
                                                                                                  </div>
                                                                                                  </section>

                                                                                                  < !--EVENT -->
                                                                                                    <section id="event" class="py-32 bg-songket text-white relative" >
                                                                                                      <div class="container mx-auto px-6 text-center" >
                                                                                                        <h2 class="font-header text-4xl text-accent mb-20" > Alek Resepsi </h2>
                                                                                                          < div class="max-w-xl mx-auto bg-dark border-8 border-secondary p-12 gadang-corner shadow-2xl" data - aos="flip-up" >
                                                                                                            <h3 class="font-header text-3xl mb-8 border-b border-accent pb-4 text-accent" > BARALEK GADANG </h3>
                                                                                                              < p class="font-header text-xl mb-4" > Kamis, 09 Oktober 2025 </p>
                                                                                                                < p class="font-header text-lg mb-10" > Pukul 10.00 WIB - Salasai </p>
                                                                                                                  < div class="pt-8 border-t border-accent/20" >
                                                                                                                    <p class="font-header text-xs tracking-widest mb-4 text-secondary uppercase" > TAMPEK BARALEK: </p>
                                                                                                                      < p class="font-body text-lg italic uppercase" > Bocek Karangploso(Toko Pak Mendol) </p>
                                                                                                                        </div>
                                                                                                                        < button class="mt-12 px-10 py-4 bg-accent text-dark font-header text-xs tracking-widest hover:bg-white transition-all" > LOKASI BARALEK </button>
                                                                                                                          </div>
                                                                                                                          < div id = "countdown" class="flex flex-wrap justify-center gap-6 mt-20" > </div>
                                                                                                                            </div>
                                                                                                                            </section>

                                                                                                                            < !--GALLERY -->
                                                                                                                              <section id="gallery" class="py-32 bg-cream" >
                                                                                                                                <div class="container mx-auto px-4 text-center" >
                                                                                                                                  <h2 class="font-header text-4xl text-primary mb-16 underline decoration-accent" > Kaba Rancak </h2>
                                                                                                                                    < div class="grid grid-cols-2 md:grid-cols-4 gap-6" >
                                                                                                                                      <img src="prewedding1.jpg" class="gadang-corner border-4 border-secondary cursor-pointer hover:scale-105 transition" onclick = "openModal(this.src)" >
                                                                                                                                        <img src="prewedding2.jpg" class="gadang-corner border-4 border-secondary cursor-pointer hover:scale-105 transition" onclick = "openModal(this.src)" >
                                                                                                                                          <img src="prewedding3.jpg" class="gadang-corner border-4 border-secondary cursor-pointer hover:scale-105 transition" onclick = "openModal(this.src)" >
                                                                                                                                            <img src="prewedding4.jpg" class="gadang-corner border-4 border-secondary cursor-pointer hover:scale-105 transition" onclick = "openModal(this.src)" >
                                                                                                                                              </div>
                                                                                                                                              </div>
                                                                                                                                              </section>

                                                                                                                                              < !--GIFT -->
                                                                                                                                                <section id="gift" class="py-32 bg-dark text-accent text-center border-y-8 border-primary" >
                                                                                                                                                  <div class="container mx-auto px-6 max-w-2xl" >
                                                                                                                                                    <h2 class="font-header text-4xl mb-12" > Tando Kasih </h2>
                                                                                                                                                      < div class="bg-primary p-12 gadang-corner border-4 border-secondary text-white shadow-2xl" data - aos="zoom-in" >
                                                                                                                                                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg" class="h-6 mx-auto mb-10 grayscale invert" >
                                                                                                                                                          <p class="font-header text-4xl mb-4 tracking-widest text-secondary" > 8163069596 </p>
                                                                                                                                                            < p class="font-header text-lg mb-12 uppercase" > Nicola Valentino </p>
                                                                                                                                                              < button onclick = "copyToClipboard()" class="px-12 py-4 bg-secondary text-dark font-header text-xs tracking-widest hover:bg-white transition" > SALIN NO.REKENING </button>
                                                                                                                                                                </div>
                                                                                                                                                                </div>
                                                                                                                                                                </section>

                                                                                                                                                                < !--RSVP -->
                                                                                                                                                                  <section id="rsvp" class="py-32 bg-cream pb-48" >
                                                                                                                                                                    <div class="container mx-auto px-6 max-w-2xl text-center" >
                                                                                                                                                                      <h2 class="font-header text-4xl text-primary mb-16" > Doa Jo Harapan </h2>
                                                                                                                                                                        < div class="bg-white p-10 gadang-corner border-4 border-secondary shadow-2xl" >
                                                                                                                                                                          <textarea id="guestMsg" rows = "5" class="w-full border-b-2 border-primary p-4 font-body text-xl focus:outline-none italic" placeholder = "Tuliskan doa jo harapan untuak mempelai..." > </textarea>
                                                                                                                                                                            < button onclick = "sendToWA()" class="w-full mt-12 bg-primary text-secondary py-5 font-header text-lg tracking-widest shadow-xl uppercase" > Kirim Doa </button>
                                                                                                                                                                              </div>
                                                                                                                                                                              </div>
                                                                                                                                                                              </section>

                                                                                                                                                                              < footer class="py-24 bg-dark text-secondary text-center border-t-8 border-primary" >
                                                                                                                                                                                <h2 class="font-script text-7xl mb-6" > Nicola & Salsa </h2>
                                                                                                                                                                                  < p class="font-header tracking-[0.5em] text-xs opacity-40" > TARIMO KASIH • 2025 </p>
                                                                                                                                                                                    </footer>

                                                                                                                                                                                    < !--NAVBAR -->
                                                                                                                                                                                      <nav id="navbar" class="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-primary border-2 border-secondary p-4 flex gap-10 rounded-full shadow-2xl transition-all duration-700 translate-y-32 opacity-0" >
                                                                                                                                                                                        <a href="#home" class="text-secondary text-2xl" > <i class="fa-solid fa-house" > </i></a >
                                                                                                                                                                                          <a href="#couple" class="text-secondary text-2xl" > <i class="fa-solid fa-user-group" > </i></a >
                                                                                                                                                                                            <a href="#event" class="text-secondary text-2xl" > <i class="fa-solid fa-scroll" > </i></a >
                                                                                                                                                                                              <a href="#gallery" class="text-secondary text-2xl" > <i class="fa-solid fa-camera-retro" > </i></a >
                                                                                                                                                                                                <a href="#gift" class="text-secondary text-2xl" > <i class="fa-solid fa-gift" > </i></a >
                                                                                                                                                                                                  </nav>
                                                                                                                                                                                                  </main>

                                                                                                                                                                                                  < !--UTILITIES -->
                                                                                                                                                                                                    <div id="toast" class="fixed top-12 left-1/2 -translate-x-1/2 z-[1000] bg-dark border-2 border-secondary text-accent px-10 py-4 font-header text-sm opacity-0 transition-all pointer-events-none shadow-2xl uppercase" > Tando Kasih Disalin! </div>
                                                                                                                                                                                                      < div id = "imgModal" class="modal fixed inset-0 bg-black/95 flex items-center justify-center p-6" onclick = "this.classList.remove('active')" >
                                                                                                                                                                                                        <img id="modalImage" class="max-h-[85vh] border-4 border-secondary gadang-corner shadow-2xl" >
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
  if (diff < 0) { dom.countdown.innerHTML = "<h3 class='font-header text-secondary tracking-widest uppercase'>Aleks Gadang Dimuloi</h3>"; return; }
  const t = { hari: Math.floor(diff / 86400000), jam: Math.floor((diff % 86400000) / 3600000), min: Math.floor((diff % 3600000) / 60000), dtk: Math.floor((diff % 60000) / 1000) };
  dom.countdown.innerHTML = Object.entries(t).map(([k, v]) => \`
    < div class="bg-primary border-2 border-secondary p-4 w-24 gadang-corner transform hover:scale-110 transition shadow-lg" >
            <div class="text-3xl font-header text-accent">\${v}</div>
            <div class="text-[8px] font-header text-white uppercase opacity-60">\${k}</div>
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
    \`, // <-- Pastikan ditutup dengan backtick

  'tradition-balinese': \`< !DOCTYPE html >
  <html lang="id" class="scroll-smooth" >
    <head>
    <meta charset="UTF-8" >
      <meta name="viewport" content = "width=device-width, initial-scale=1.0" >
        <title>Undangan Pernikahan Nicola & Salsa - Adat Bali </title>

          < link rel = "preconnect" href = "https://fonts.googleapis.com" >
            <link rel="preconnect" href = "https://fonts.gstatic.com" crossorigin >
              <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Charm&family=Montserrat:wght@400;700&display=swap" rel = "stylesheet" >

                <script src="https://cdn.tailwindcss.com" > </script>
                  < link href = "https://unpkg.com/aos@2.3.1/dist/aos.css" rel = "stylesheet" >
                    <link rel="stylesheet" href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" >

                      <script>
                      tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: '#7E0C0C',    /* Bali Maroon */
          secondary: '#D4AF37',  /* Gold */
            dark: '#1A1A1A',       /* Black Poleng */
              accent: '#FFFFFF',     /* White Poleng */
                cream: '#FFF9E6',
            },
      fontFamily: {
        header: ['"Cinzel Decorative"', 'serif'],
          script: ['"Charm"', 'cursive'],
            body: ['"Montserrat"', 'sans-serif'],
            }
    }
  }
}
</script>
  
    <style>
  /* Poleng Pattern Overlay */
  .bg - poleng {
  background - image:
  linear - gradient(45deg, #000 25 %, transparent 25 %),
    linear - gradient(-45deg, #000 25 %, transparent 25 %),
    linear - gradient(45deg, transparent 75 %, #000 75 %),
    linear - gradient(-45deg, transparent 75 %, #000 75 %);
  background - size: 20px 20px;
  background - position: 0 0, 0 10px, 10px 10px, 10px 0;
  opacity: 0.1;
}
      
      .bali - gate - mask {
  clip - path: polygon(10 % 0 %, 90 % 0 %, 100 % 10 %, 100 % 100 %, 0 % 100 %, 0 % 10 %);
  border: 4px solid #D4AF37;
}
      
      .cover - slide - up {
  transform: translateY(-100 %);
  transition: transform 1.5s cubic - bezier(0.7, 0, 0.3, 1);
}
      
      .modal { transition: opacity 0.3s ease; opacity: 0; pointer - events: none; z - index: 5000; }
      .modal.active { opacity: 1; pointer - events: all; }
</style>
  </head>
  < body class="bg-cream text-dark font-body overflow-hidden antialiased" >

    <audio id="bgMusic" loop >
      <source src="https://www.bensound.com/bensound-music/bensound-relaxing.mp3" type = "audio/mpeg" >
        </audio>

        < div id = "musicControl" class="fixed top-6 right-6 z-50 hidden opacity-0 transition-opacity duration-1000" >
          <button onclick="toggleMusic()" class="w-12 h-12 bg-primary text-secondary rounded-full flex items-center justify-center border-2 border-secondary shadow-xl" >
            <i class="fa-solid fa-fan" id = "musicIcon" > </i>
              </button>
              </div>

              < !--COVER -->
                <div id="cover" class="fixed inset-0 z-[100] bg-dark flex flex-col justify-center items-center text-center p-6 border-[15px] border-primary" >
                  <div class="absolute inset-0 bg-poleng" > </div>
                    < div class="relative z-10 bg-cream p-12 border-4 border-secondary shadow-2xl" data - aos="zoom-in" >
                      <p class="font-header text-primary tracking-widest text-sm mb-4 italic" > Pawiwahan Agung </p>
                        < h1 class="font-script text-6xl md:text-8xl text-primary mb-10" > Nicola & Salsa </h1>
                          < div class="mb-12" >
                            <p class="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-2" > Majeng Ring: </p>
                              < p class="font-header text-2xl text-primary underline decoration-secondary" > TAMU UNDANGAN </p>
                                </div>
                                < button onclick = "openInvitation()" class="px-10 py-4 bg-primary text-secondary font-header text-sm tracking-widest border-2 border-secondary hover:bg-dark transition" >
                                  BUKA UNDANGAN
                                    </button>
                                    </div>
                                    </div>

                                    < !--MAIN CONTENT-- >
                                      <main id="mainContent" class="hidden opacity-0 transition-opacity duration-1000" >

                                        <!--HOME -->
                                          <section id="home" class="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-32 pb-20 bg-cream relative" >
                                            <div class="absolute inset-0 bg-poleng" > </div>
                                              < div data - aos="fade-up" class="relative z-10" >
                                                <div class="relative mb-12 inline-block bg-white p-4 bali-gate-mask" >
                                                  <img src="https://placehold.co/600x800" class="w-72 h-96 md:w-80 md:h-[500px] object-cover mx-auto shadow-2xl bali-gate-mask" >
                                                    <div class="absolute -top-6 -left-6 text-secondary text-5xl opacity-40 rotate-[-15deg]" > <i class="fa-solid fa-spa" > </i></div >
                                                      </div>
                                                      < h2 class="font-script text-7xl text-primary mb-4 drop-shadow-lg" > Nicola & Salsa </h2>
                                                        < p class="font-header text-xl text-primary tracking-[0.5em] mt-2" >09 OKTOBER 2025 </p>
                                                          </div>
                                                          </section>

                                                          < !--AYAT -->
                                                            <section class="py-24 px-6 bg-primary text-secondary text-center border-y-4 border-secondary" >
                                                              <div class="max-w-3xl mx-auto" data - aos="fade-up" >
                                                                <i class="fa-solid fa-om text-5xl opacity-30 mb-8" > </i>
                                                                  < p class="font-body text-xl md:text-2xl leading-relaxed mb-8 italic text-white/90" >
                                                                    "Om Atma Tattvatma Suddha Mam Svaha. Dumogi Sang Hyang Widhi Wasa ngicenin karahajengan lan kasantihan ring petemuan puniki."
                                                                    </p>
                                                                    < p class="font-header tracking-widest text-secondary" >— SWIDHI ASTU —</p>
                                                                      </div>
                                                                      </section>

                                                                      < !--COUPLE -->
                                                                        <section id="couple" class="py-32 bg-cream" >
                                                                          <div class="container mx-auto px-6 text-center" >
                                                                            <h2 class="font-header text-4xl text-primary mb-20 underline decoration-secondary" > Sang Mempelai </h2>
                                                                              < div class="flex flex-col md:flex-row justify-center gap-20 max-w-6xl mx-auto" >
                                                                                <div class="text-center" data - aos="fade-right" >
                                                                                  <div class="w-64 h-64 mx-auto mb-8 border-4 border-secondary p-2 bg-dark rounded-full overflow-hidden shadow-2xl" >
                                                                                    <img src="nicola.jpg" class="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition duration-1000" >
                                                                                      </div>
                                                                                      < h3 class="font-header text-3xl text-primary mb-2" > Nicola Valentino </h3>
                                                                                        < p class="text-sm italic opacity-70" > Putra saking Bpk.Misno & Ibu Atik Fifiani </p>
                                                                                          </div>
                                                                                          < div class="text-center" data - aos="fade-left" >
                                                                                            <div class="w-64 h-64 mx-auto mb-8 border-4 border-secondary p-2 bg-dark rounded-full overflow-hidden shadow-2xl" >
                                                                                              <img src="salsa.jpg" class="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition duration-1000" >
                                                                                                </div>
                                                                                                < h3 class="font-header text-3xl text-primary mb-2" > Salsabillah Ekanaiya </h3>
                                                                                                  < p class="text-sm italic opacity-70" > Putri saking Bpk.M.Rofiek & Ibu Sri Kurniawati </p>
                                                                                                    </div>
                                                                                                    </div>
                                                                                                    </div>
                                                                                                    </section>

                                                                                                    < !--EVENT -->
                                                                                                      <section id="event" class="py-32 bg-dark text-cream relative" >
                                                                                                        <div class="absolute inset-0 bg-poleng opacity-20" > </div>
                                                                                                          < div class="container mx-auto px-6 text-center relative z-10" >
                                                                                                            <h2 class="font-header text-4xl text-secondary mb-20 italic" > Galah Pawiwahan </h2>
                                                                                                              < div class="max-w-2xl mx-auto bg-cream border-[10px] border-primary p-12 shadow-[0_0_50px_rgba(126,12,12,0.5)]" data - aos="flip-up" >
                                                                                                                <h3 class="font-header text-3xl mb-8 border-b border-primary pb-4 text-primary" > RESEPSI </h3>
                                                                                                                  < p class="font-header text-2xl mb-4 text-dark" > Kamis, 09 Oktober 2025 </p>
                                                                                                                    < p class="font-header text-lg mb-10 text-primary" > Tabuh 10.00 WITA - Puput </p>
                                                                                                                      < div class="pt-8 border-t border-primary/20 text-dark" >
                                                                                                                        <p class="font-header text-[10px] tracking-[0.4em] mb-4 opacity-60 uppercase" > Panggonan Pawiwahan: </p>
                                                                                                                          < p class="font-body text-lg italic uppercase font-bold" > Bocek Karangploso(Toko Pak Mendol) </p>
                                                                                                                            </div>
                                                                                                                            < button class="mt-12 px-10 py-4 bg-primary text-secondary font-header text-xs tracking-widest hover:bg-dark transition" > PETUNJUK LOKASI </button>
                                                                                                                              </div>
                                                                                                                              < div id = "countdown" class="flex flex-wrap justify-center gap-6 mt-24" > </div>
                                                                                                                                </div>
                                                                                                                                </section>

                                                                                                                                < !--GALLERY -->
                                                                                                                                  <section id="gallery" class="py-32 bg-cream" >
                                                                                                                                    <div class="container mx-auto px-4 text-center" >
                                                                                                                                      <h2 class="font-header text-4xl text-primary mb-16" > Galeri Kenangan </h2>
                                                                                                                                        < div class="grid grid-cols-2 md:grid-cols-4 gap-6" >
                                                                                                                                          <div class="border-4 border-secondary p-1 bg-white shadow-xl hover:rotate-2 transition" onclick = "openModal(this.querySelector('img').src)" >
                                                                                                                                            <img src="prewedding1.jpg" class="cursor-pointer grayscale hover:grayscale-0 transition duration-1000" >
                                                                                                                                              </div>
                                                                                                                                              < div class="border-4 border-secondary p-1 bg-white shadow-xl hover:-rotate-2 transition" onclick = "openModal(this.querySelector('img').src)" >
                                                                                                                                                <img src="prewedding2.jpg" class="cursor-pointer grayscale hover:grayscale-0 transition duration-1000" >
                                                                                                                                                  </div>
                                                                                                                                                  < div class="border-4 border-secondary p-1 bg-white shadow-xl hover:rotate-2 transition" onclick = "openModal(this.querySelector('img').src)" >
                                                                                                                                                    <img src="prewedding3.jpg" class="cursor-pointer grayscale hover:grayscale-0 transition duration-1000" >
                                                                                                                                                      </div>
                                                                                                                                                      < div class="border-4 border-secondary p-1 bg-white shadow-xl hover:-rotate-2 transition" onclick = "openModal(this.querySelector('img').src)" >
                                                                                                                                                        <img src="prewedding4.jpg" class="cursor-pointer grayscale hover:grayscale-0 transition duration-1000" >
                                                                                                                                                          </div>
                                                                                                                                                          </div>
                                                                                                                                                          </div>
                                                                                                                                                          </section>

                                                                                                                                                          < !--GIFT -->
                                                                                                                                                            <section id="gift" class="py-32 bg-primary text-secondary text-center border-y-8 border-secondary" >
                                                                                                                                                              <div class="container mx-auto px-6 max-w-2xl" >
                                                                                                                                                                <h2 class="font-header text-4xl mb-12 italic" > Punya Katresnan </h2>
                                                                                                                                                                  < div class="bg-cream p-12 border-4 border-secondary text-primary shadow-2xl" data - aos="zoom-in" >
                                                                                                                                                                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg" class="h-6 mx-auto mb-10 grayscale" >
                                                                                                                                                                      <p class="font-header text-4xl mb-4 tracking-[0.2em]" > 8163069596 </p>
                                                                                                                                                                        < p class="font-header text-lg mb-12" > A.n Nicola Valentino </p>
                                                                                                                                                                          < button onclick = "copyToClipboard()" class="px-12 py-4 bg-primary text-secondary font-header text-xs tracking-widest border-2 border-secondary shadow-lg" > SALIN NO.REKENING </button>
                                                                                                                                                                            </div>
                                                                                                                                                                            </div>
                                                                                                                                                                            </section>

                                                                                                                                                                            < !--RSVP -->
                                                                                                                                                                              <section id="rsvp" class="py-32 bg-cream pb-48" >
                                                                                                                                                                                <div class="container mx-auto px-6 max-w-2xl text-center" >
                                                                                                                                                                                  <h2 class="font-header text-4xl text-primary mb-16" > Doa Rahajeng </h2>
                                                                                                                                                                                    < div class="bg-white p-10 border-4 border-secondary shadow-2xl" >
                                                                                                                                                                                      <textarea id="guestMsg" rows = "5" class="w-full border-b-2 border-primary p-4 font-body text-xl focus:outline-none italic" placeholder = "Serataken doa rahajeng panjenengan dhumateng mempelai..." > </textarea>
                                                                                                                                                                                        < button onclick = "sendToWA()" class="w-full mt-12 bg-primary text-secondary py-5 font-header text-lg tracking-widest shadow-xl uppercase" > Kirim Doa </button>
                                                                                                                                                                                          </div>
                                                                                                                                                                                          </div>
                                                                                                                                                                                          </section>

                                                                                                                                                                                          < footer class="py-24 bg-dark text-secondary text-center border-t-8 border-primary relative" >
                                                                                                                                                                                            <h2 class="font-script text-7xl mb-6" > Nicola & Salsa </h2>
                                                                                                                                                                                              < p class="font-header tracking-[0.5em] text-[10px] opacity-40 uppercase" > Suksma Matur • 2025 </p>
                                                                                                                                                                                                </footer>

                                                                                                                                                                                                < !--NAVBAR -->
                                                                                                                                                                                                  <nav id="navbar" class="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-primary border-2 border-secondary p-4 flex gap-10 rounded-full shadow-2xl transition-all duration-700 translate-y-32 opacity-0" >
                                                                                                                                                                                                    <a href="#home" class="text-secondary text-2xl" > <i class="fa-solid fa-house" > </i></a >
                                                                                                                                                                                                      <a href="#couple" class="text-secondary text-2xl" > <i class="fa-solid fa-user-group" > </i></a >
                                                                                                                                                                                                        <a href="#event" class="text-secondary text-2xl" > <i class="fa-solid fa-scroll" > </i></a >
                                                                                                                                                                                                          <a href="#gallery" class="text-secondary text-2xl" > <i class="fa-solid fa-camera-retro" > </i></a >
                                                                                                                                                                                                            <a href="#gift" class="text-secondary text-2xl" > <i class="fa-solid fa-gift" > </i></a >
                                                                                                                                                                                                              </nav>
                                                                                                                                                                                                              </main>

                                                                                                                                                                                                              < !--UTILITIES -->
                                                                                                                                                                                                                <div id="toast" class="fixed top-12 left-1/2 -translate-x-1/2 z-[1000] bg-primary border-2 border-secondary text-secondary px-10 py-4 font-header text-sm opacity-0 transition-all pointer-events-none shadow-2xl uppercase" > Rahajeng! No.Rekening Disalin! </div>
                                                                                                                                                                                                                  < div id = "imgModal" class="modal fixed inset-0 bg-black/95 flex items-center justify-center p-6" onclick = "this.classList.remove('active')" >
                                                                                                                                                                                                                    <img id="modalImage" class="max-h-[85vh] border-4 border-secondary shadow-2xl" >
                                                                                                                                                                                                                      </div>

                                                                                                                                                                                                                      < script src = "https://unpkg.com/aos@2.3.1/dist/aos.js" > </script>
                                                                                                                                                                                                                        <script>
AOS.init({ once: true, duration: 1000 });
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
  if (diff < 0) { dom.countdown.innerHTML = "<h3 class='font-header text-secondary tracking-widest uppercase'>Galah Bahagia Sampun Datang</h3>"; return; }
  const t = { rahina: Math.floor(diff / 86400000), jam: Math.floor((diff % 86400000) / 3600000), menit: Math.floor((diff % 3600000) / 60000), detik: Math.floor((diff % 60000) / 1000) };
  dom.countdown.innerHTML = Object.entries(t).map(([k, v]) => \`
    < div class="bg-primary border-2 border-secondary p-4 w-24 rounded-lg transform hover:scale-110 transition shadow-lg" >
            <div class="text-3xl font-header text-secondary">\${v}</div>
            <div class="text-[8px] font-header text-white uppercase opacity-60">\${k}</div>
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
    \`, // <-- Pastikan ditutup dengan backtick

  'regular-invitation': \`< !DOCTYPE html >
  <html lang="id" class="scroll-smooth" >
    <head>
    <meta charset="UTF-8" >
      <meta name="viewport" content = "width=device-width, initial-scale=1.0" >
        <title>The Wedding of Nicola & Salsa </title>

          < !--Fonts -->
            <link rel="preconnect" href = "https://fonts.googleapis.com" >
              <link rel="preconnect" href = "https://fonts.gstatic.com" crossorigin >
                <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Great+Vibes&family=Montserrat:wght@300;400;600&display=swap" rel = "stylesheet" >

                  <!--Tailwind CSS-- >
                    <script src="https://cdn.tailwindcss.com" > </script>

                      < !--AOS Animation-- >
                        <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel = "stylesheet" >

                          <!--Icons -->
                            <link rel="stylesheet" href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" >

                              <script>
                              tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: '#8B7E74',
          secondary: '#C7BCA1',
            dark: '#463f3a',
              cream: '#F9F7F2',
                gold: '#D4AF37'
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
          script: ['"Great Vibes"', 'cursive'],
            sans: ['"Montserrat"', 'sans-serif'],
            }
    }
  }
}
</script>

  <style>
      /* Custom Scrollbar */
      :: -webkit - scrollbar { width: 6px; }
      :: -webkit - scrollbar - track { background: #f1f1f1; }
      :: -webkit - scrollbar - thumb { background: #8B7E74; border - radius: 10px; }

      /* Smooth Reveal for Cover */
      .cover - slide - up {
  transform: translateY(-100 %);
  transition: transform 1.2s cubic - bezier(0.77, 0, 0.175, 1);
}

      /* Music Disc Rotation */
      .spin - slow { animation: spin 8s linear infinite; }
@keyframes spin { 100 % { transform: rotate(360deg); } }

      /* Pattern Background */
      .bg - pattern {
  background - color: #F9F7F2;
  background - image: radial - gradient(#C7BCA1 1px, transparent 1px);
  background - size: 20px 20px;
}

      /* Image Styling */
      .wedding - photo {
  mask - image: linear - gradient(to bottom, black 80 %, transparent 100 %);
  -webkit - mask - image: linear - gradient(to bottom, black 80 %, transparent 100 %);
}

      /* Modal Styling */
      .modal {
  transition: opacity 0.3s ease -in -out;
  opacity: 0;
  pointer - events: none;
  z - index: 5000;
}
      .modal.active {
  opacity: 1;
  pointer - events: all;
}
</style>
  </head>
  < body class="bg-cream text-dark font-sans overflow-hidden antialiased selection:bg-secondary selection:text-white" >

    <!--Audio -->
      <audio id="bgMusic" loop >
        <source src="https://www.bensound.com/bensound-music/bensound-romantic.mp3" type = "audio/mpeg" >
          </audio>

          < !--Music Control Button(Floating)-- >
            <div id="musicControl" class="fixed top-6 right-6 z-50 hidden opacity-0 transition-opacity duration-1000" >
              <button onclick="toggleMusic()" class="w-10 h-10 bg-white/80 backdrop-blur-sm border border-gold rounded-full shadow-lg flex items-center justify-center text-gold hover:bg-gold hover:text-white transition-all" >
                <i class="fa-solid fa-music spin-slow" id = "musicIcon" > </i>
                  </button>
                  </div>

                  < !--COVER SCREEN(Overlay)-- >
                    <div id="cover" class="fixed inset-0 z-[100] bg-[url('https://placehold.co/600x900')] bg-cover bg-center h-screen w-full flex flex-col justify-end items-center pb-20 text-center before:content-[`;
