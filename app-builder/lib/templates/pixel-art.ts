// Auto-generated template export
// Template: pixel-art

export const template = `< !DOCTYPE html >
  <html lang="id" class="scroll-smooth" >
    <head>
    <meta charset="UTF-8" >
      <meta name="viewport" content = "width=device-width, initial-scale=1.0" >
        <title>The Wedding: Nicola & Salsa(Pixel Edition) </title>

          < !--Fonts: Retro Pixel Style-- >
            <link rel="preconnect" href = "https://fonts.googleapis.com" >
              <link rel="preconnect" href = "https://fonts.gstatic.com" crossorigin >
                <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Silkscreen:wght@400;700&family=VT323&display=swap" rel = "stylesheet" >

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
        primary: '#9b5de5',    /* Vibrant Purple */
          secondary: '#00f5d4',  /* Cyber Cyan */
            dark: '#1a1a1a',       /* Terminal Dark */
              accent: '#fee440',     /* Power-up Yellow */
                cream: '#fefae0',      /* Retro Paper */
                  ui: '#240046',         /* UI Box Dark */
          },
      fontFamily: {
        header: ['"Press Start 2P"', 'system-ui'],
          body: ['"Silkscreen"', 'sans-serif'],
            mono: ['"VT323"', 'monospace'],
          }
    }
  }
}
</script>

  <style>
    /* Custom Scrollbar - Pixel Style */
    :: -webkit - scrollbar { width: 10px; }
    :: -webkit - scrollbar - track { background: #1a1a1a; }
    :: -webkit - scrollbar - thumb { background: #9b5de5; border: 2px solid #1a1a1a; }

    /* Cover Slide Up Animation */
    .cover - slide - up {
  transform: translateY(-100 %);
  transition: transform 1s steps(15, end);
}

/* CRT Effect Overlay - Fixed Positioning to prevent scroll issues */
#crt - overlay {
  position: fixed;
  top: 0; left: 0; width: 100 %; height: 100 %;
  background: linear - gradient(rgba(18, 16, 16, 0) 50 %, rgba(0, 0, 0, 0.1) 50 %),
    linear - gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 118, 0.03));
  z - index: 9999;
  background - size: 100 % 3px, 3px 100 %;
  pointer - events: none;
}

    /* Pixel Art Borders */
    .pixel - box {
  border: 4px solid #000;
  box - shadow: 6px 6px 0px 0px rgba(0, 0, 0, 1);
  background - color: white;
}

    .pixel - box - dark {
  border: 4px solid #fff;
  box - shadow: 6px 6px 0px 0px #9b5de5;
  background - color: #1a1a1a;
}

    /* Hard Shadow Buttons */
    .pixel - btn {
  position: relative;
  border: 4px solid #000;
  box - shadow: 4px 4px 0px 0px #000;
  transition: all 0.1s;
}
    .pixel - btn:active {
  transform: translate(2px, 2px);
  box - shadow: 0px 0px 0px 0px #000;
}

/* Heart Float Animation */
@keyframes heartFloat {
  0 % { transform: translateY(0) scale(1); }
  50 % { transform: translateY(-10px) scale(1.1); }
  100 % { transform: translateY(0) scale(1); }
}
    .pixel - heart { animation: heartFloat 2s infinite steps(5); }

    /* Image Rendering */
    img { image - rendering: pixelated; }

    /* Modal Styling */
    .modal {
  transition: opacity 0.2s steps(4);
  opacity: 0;
  pointer - events: none;
  z - index: 5000;
}
    .modal.active {
  opacity: 1;
  pointer - events: all;
}

    /* Hide Content Helper */
    .content - hidden {
  visibility: hidden;
  height: 0;
  overflow: hidden;
}
</style>
  </head>
  < body class="bg-dark text-cream font-body overflow-hidden antialiased" >

    <!--CRT Effect Container-- >
      <div id="crt-overlay" > </div>

        < !--Audio Asset-- >
          <audio id="bgMusic" loop >
            <source src="https://www.bensound.com/bensound-music/bensound-memories.mp3" type = "audio/mpeg" >
              </audio>

              < !--Floating HUD(Music Control)-- >
                <div id="musicControl" class="fixed top-4 right-4 z-50 hidden opacity-0 transition-opacity duration-1000" >
                  <button onclick="toggleMusic()" class="pixel-btn w-12 h-12 bg-secondary text-dark flex items-center justify-center" >
                    <i class="fa-solid fa-volume-high" id = "musicIcon" > </i>
                      </button>
                      </div>

                      < !--SECTION 1: COVER SCREEN(Start Menu)-- >
                        <div id="cover" class="fixed inset-0 z-[100] bg-dark flex flex-col justify-center items-center p-6 text-center border-8 border-ui" >

                          <div class="relative z-10 max-w-lg w-full" data - aos="zoom-in" >
                            <div class="mb-8 pixel-heart inline-block text-secondary text-5xl" >
                              <i class="fa-solid fa-heart" > </i>
                                </div>

                                < p class="font-mono text-2xl text-accent mb-4 tracking-widest" > [NEW QUEST: WEDDING] </p>

                                  < h1 class="font-header text-3xl md:text-4xl mb-12 text-white leading-relaxed" >
                                    NICOLA<br> & <br>SALSA
                                    </h1>

                                    < div class="pixel-box-dark p-6 mb-12" >
                                      <p class="text-[10px] text-secondary mb-4 uppercase tracking-tighter" > Enter Player Name: </p>
                                        < p class="font-header text-sm text-white" > TAMU UNDANGAN </p>
                                          </div>

                                          < button onclick = "openInvitation()" class="pixel-btn px-8 py-5 bg-primary text-white font-header text-sm hover:bg-secondary hover:text-dark w-full" >
                                            PRESS START
                                              </button>

                                              < p class="mt-8 text-[10px] animate-pulse" >© 2025 LOVE ENTERTAINMENT SYSTEM </p>
                                                </div>
                                                </div>

                                                < !--MAIN GAME CONTENT-- >
                                                  <main id="mainContent" class="content-hidden opacity-0 transition-opacity duration-700 relative bg-[#2a0845]" >

                                                    <!--SECTION 2: HOME(Title Screen)-- >
                                                      <section id="home" class="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20" >
                                                        <div class="max-w-4xl mx-auto" data - aos="fade-down" >
                                                          <div class="pixel-box p-4 mb-12 inline-block" >
                                                            <img src="https://placehold.co/600x800" class="w-64 h-64 md:w-80 md:h-80 object-cover border-4 border-dark shadow-none" alt = "Couple" >
                                                              </div>

                                                              < h2 class="font-header text-2xl md:text-4xl text-white mb-6" > PLAYER 1 & 2 < br > READY! </h2>
                                                                < p class="font-mono text-3xl text-secondary mb-12" >09 / 10 / 2025 </p>

                                                                  < div class="flex justify-center gap-4 text-accent text-2xl" >
                                                                    <i class="fa-solid fa-star" > </i>
                                                                      < i class="fa-solid fa-star" > </i>
                                                                        < i class="fa-solid fa-star" > </i>
                                                                          </div>
                                                                          </div>
                                                                          </section>

                                                                          < !--SECTION 3: AYAT(Dialogue Box)-- >
                                                                            <section class="py-24 px-6" >
                                                                              <div class="max-w-3xl mx-auto pixel-box-dark p-8 md:p-12" data - aos="fade-right" >
                                                                                <div class="flex items-start gap-4 mb-6" >
                                                                                  <div class="w-4 h-4 bg-primary shrink-0 mt-1" > </div>
                                                                                    < p class="font-mono text-2xl text-cream leading-relaxed" >
                                                                                      "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri..."
                                                                                      </p>
                                                                                      </div>
                                                                                      < p class="text-right text-secondary font-header text-[10px] mt-4" > --Q.S AR - RUM: 21 -- </p>
                                                                                        </div>
                                                                                        </section>

                                                                                        < !--SECTION 4: COUPLE(Select Character)-- >
                                                                                          <section id="couple" class="py-24 bg-ui/50" >
                                                                                            <div class="container mx-auto px-6" >
                                                                                              <h2 class="font-header text-xl text-center text-accent mb-20" data - aos="fade-down" > SELECT CHARACTERS </h2>

                                                                                                < div class="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto" >
                                                                                                  <!--Groom Card-- >
                                                                                                    <div class="text-center group" data - aos="fade-up" >
                                                                                                      <div class="pixel-box p-2 mb-8 bg-white group-hover:bg-secondary transition-colors" >
                                                                                                        <img src="nicola.jpg" alt = "Nicola" class="w-full aspect-square object-cover grayscale-[100%] group-hover:grayscale-0 transition-all duration-300" onerror = "this.src='https://placehold.co/400x400?text=Groom'" >
                                                                                                          </div>
                                                                                                          < p class="font-header text-sm text-white mb-2 uppercase" > NICOLA V.M.</p>
                                                                                                            < p class="text-[10px] text-accent mb-4 tracking-tighter" > LVL 25 - THE GROOM </p>
                                                                                                              < p class="font-mono text-xl text-cream/70 px-4" > Putra Bpk.Misno(Mendol) & Ibu Atik Fifiani </p>
                                                                                                                < div class="mt-6 flex justify-center gap-4" >
                                                                                                                  <a href="#" class="bg-dark p-2 border-2 border-white text-secondary hover:bg-secondary hover:text-dark transition-colors" > <i class="fa-brands fa-instagram" > </i></a >
                                                                                                                    </div>
                                                                                                                    </div>

                                                                                                                    < !--Bride Card-- >
                                                                                                                      <div class="text-center group" data - aos="fade-up" data - aos - delay="200" >
                                                                                                                        <div class="pixel-box p-2 mb-8 bg-white group-hover:bg-primary transition-colors" >
                                                                                                                          <img src="salsa.jpg" alt = "Salsa" class="w-full aspect-square object-cover grayscale-[100%] group-hover:grayscale-0 transition-all duration-300" onerror = "this.src='https://placehold.co/400x400?text=Bride'" >
                                                                                                                            </div>
                                                                                                                            < p class="font-header text-sm text-white mb-2 uppercase" > SALSABILLAH E.P.</p>
                                                                                                                              < p class="text-[10px] text-accent mb-4 tracking-tighter" > LVL 23 - THE BRIDE </p>
                                                                                                                                < p class="font-mono text-xl text-cream/70 px-4" > Putri Bpk.M.Rofiek Aribowo & Ibu Sri Kurniawati </p>
                                                                                                                                  < div class="mt-6 flex justify-center gap-4" >
                                                                                                                                    <a href="#" class="bg-dark p-2 border-2 border-white text-primary hover:bg-primary hover:text-dark transition-colors" > <i class="fa-brands fa-instagram" > </i></a >
                                                                                                                                      </div>
                                                                                                                                      </div>
                                                                                                                                      </div>
                                                                                                                                      </div>
                                                                                                                                      </section>

                                                                                                                                      < !--SECTION 5: EVENT(Quest Details)-- >
                                                                                                                                        <section id="event" class="py-24 bg-dark relative" >
                                                                                                                                          <div class="container mx-auto px-6 max-w-3xl" >
                                                                                                                                            <div class="pixel-box-dark p-8 md:p-12 relative overflow-hidden" data - aos="zoom-in" >
                                                                                                                                              <div class="absolute -top-4 -right-4 bg-accent text-dark p-3 font-header text-[8px] transform rotate-12" > NEW MISSION </div>

                                                                                                                                                < div class="text-center mb-12" >
                                                                                                                                                  <h3 class="font-header text-2xl text-secondary mb-4 uppercase" > RESEPSI </h3>
                                                                                                                                                    < p class="font-mono text-xl text-white" > LOCATION: BOCEK KARANGPLOSO </p>
                                                                                                                                                      </div>

                                                                                                                                                      < div class="space-y-8 mb-12 font-mono text-2xl" >
                                                                                                                                                        <div class="flex items-center gap-6 p-4 border-2 border-dashed border-white/20" >
                                                                                                                                                          <i class="fa-solid fa-calendar-day text-secondary" > </i>
                                                                                                                                                            < p >09 OKTOBER 2025 </p>
                                                                                                                                                              </div>
                                                                                                                                                              < div class="flex items-center gap-6 p-4 border-2 border-dashed border-white/20" >
                                                                                                                                                                <i class="fa-solid fa-clock text-accent" > </i>
                                                                                                                                                                  < p > 10:00 - SELESAI </p>
                                                                                                                                                                    </div>
                                                                                                                                                                    < div class="flex items-start gap-6 p-4 border-2 border-dashed border-white/20" >
                                                                                                                                                                      <i class="fa-solid fa-map-pin text-primary mt-1" > </i>
                                                                                                                                                                        < p class="text-lg leading-relaxed uppercase" > Jalan Arumdalu RT.04 RW.03(Toko Pak Mendol) </p>
                                                                                                                                                                          </div>
                                                                                                                                                                          </div>

                                                                                                                                                                          < a href = "https://maps.google.com" target = "_blank" class="pixel-btn block text-center w-full py-4 bg-accent text-dark font-header text-xs" >
                                                                                                                                                                            <i class="fa-solid fa-location-arrow mr-2" > </i> OPEN WORLD MAP
                                                                                                                                                                              </a>
                                                                                                                                                                              </div>

                                                                                                                                                                              < !--Countdown HUD-- >
                                                                                                                                                                                <div id="countdown" class="mt-16 flex flex-wrap justify-center gap-4" data - aos="fade-up" >
                                                                                                                                                                                  <!--Dynamic JS-- >
                                                                                                                                                                                    </div>
                                                                                                                                                                                    </div>
                                                                                                                                                                                    </section>

                                                                                                                                                                                    < !--SECTION 6: GALLERY(Screenshot Gallery)-- >
                                                                                                                                                                                      <section id="gallery" class="py-24 bg-ui" >
                                                                                                                                                                                        <div class="container mx-auto px-6" >
                                                                                                                                                                                          <h2 class="font-header text-xl text-center text-white mb-16" > GALLERY SNAPSHOTS </h2>

                                                                                                                                                                                            < div class="grid grid-cols-2 md:grid-cols-3 gap-6" >
                                                                                                                                                                                              <div class="pixel-box p-1 hover:scale-105 transition-transform cursor-pointer" onclick = "openModal('prewedding1.jpg')" data - aos="fade-up" >
                                                                                                                                                                                                <img src="prewedding1.jpg" class="w-full h-48 object-cover border-2 border-dark" alt = "G1" >
                                                                                                                                                                                                  </div>
                                                                                                                                                                                                  < div class="pixel-box p-1 hover:scale-105 transition-transform cursor-pointer" onclick = "openModal('prewedding2.jpg')" data - aos="fade-up" data - aos - delay="100" >
                                                                                                                                                                                                    <img src="prewedding2.jpg" class="w-full h-48 object-cover border-2 border-dark" alt = "G2" >
                                                                                                                                                                                                      </div>
                                                                                                                                                                                                      < div class="pixel-box p-1 hover:scale-105 transition-transform cursor-pointer" onclick = "openModal('prewedding3.jpg')" data - aos="fade-up" data - aos - delay="200" >
                                                                                                                                                                                                        <img src="prewedding3.jpg" class="w-full h-48 object-cover border-2 border-dark" alt = "G3" >
                                                                                                                                                                                                          </div>
                                                                                                                                                                                                          < div class="pixel-box p-1 hover:scale-105 transition-transform cursor-pointer" onclick = "openModal('prewedding4.jpg')" data - aos="fade-up" data - aos - delay="300" >
                                                                                                                                                                                                            <img src="prewedding4.jpg" class="w-full h-48 object-cover border-2 border-dark" alt = "G4" >
                                                                                                                                                                                                              </div>
                                                                                                                                                                                                              < div class="pixel-box p-1 hover:scale-105 transition-transform cursor-pointer" onclick = "openModal('https://placehold.co/600x800')" data - aos="fade-up" data - aos - delay="400" >
                                                                                                                                                                                                                <img src="https://placehold.co/600x800" class="w-full h-48 object-cover border-2 border-dark" alt = "G5" >
                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                  < div class="pixel-box p-1 hover:scale-105 transition-transform cursor-pointer" onclick = "openModal('salsa.jpg')" data - aos="fade-up" data - aos - delay="500" >
                                                                                                                                                                                                                    <img src="salsa.jpg" class="w-full h-48 object-cover border-2 border-dark" alt = "G6" >
                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                      </section>

                                                                                                                                                                                                                      < !--SECTION 7: GIFT(Item Chest)-- >
                                                                                                                                                                                                                        <section id="gift" class="py-24 text-center" >
                                                                                                                                                                                                                          <div class="container mx-auto px-6 max-w-xl" >
                                                                                                                                                                                                                            <h2 class="font-header text-xl text-accent mb-12 uppercase" > WEDDING LOOT </h2>
                                                                                                                                                                                                                              < div class="pixel-box bg-white p-8 md:p-12" data - aos="flip-left" >
                                                                                                                                                                                                                                <div class="mb-8 text-6xl text-dark" > <i class="fa-solid fa-box-open" > </i></div >
                                                                                                                                                                                                                                  <p class="font-mono text-2xl text-dark/70 mb-10 leading-relaxed uppercase" > Unlock wedding fund for the players: </p>

                                                                                                                                                                                                                                    < div class="bg-dark/10 p-4 border-4 border-dashed border-dark mb-10" >
                                                                                                                                                                                                                                      <p class="font-header text-xs text-dark mb-2" > BCA ACCOUNT </p>
                                                                                                                                                                                                                                        < p class="font-mono text-3xl font-bold text-primary" id = "rekNum" > 8163069596 </p>
                                                                                                                                                                                                                                          < p class="text-[10px] text-dark/60 mt-2 uppercase font-bold" > Nicola Valentino </p>
                                                                                                                                                                                                                                            </div>

                                                                                                                                                                                                                                            < button onclick = "copyToClipboard()" class="pixel-btn w-full py-4 bg-primary text-white font-header text-[10px] uppercase" >
                                                                                                                                                                                                                                              COLLECT ACCOUNT NUMBER
                                                                                                                                                                                                                                                </button>
                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                </section>

                                                                                                                                                                                                                                                < !--SECTION 8: RSVP(Dialogue Input)-- >
  <section id="rsvp" class="py-24 bg-[#1a1a1a] pb-48" >
    <div class="container mx-auto px-6 max-w-2xl" >
      <div class="pixel-box-dark p-8 md:p-12" data - aos="fade-up" >
      <h2 class="font-header text-lg text-secondary mb-10 uppercase" > LEAVE A MESSAGE </h2>
      < div class="space-y-6" >
        <textarea id="guestMsg" rows="4" class="w-full bg-dark/50 border-4 border-white p-6 font-mono text-2xl text-white focus:border-secondary outline-none placeholder:text-white/20" placeholder="Type your message here player..." > </textarea>

        < button onclick="sendToWA()" class="pixel-btn w-full py-5 bg-secondary text-dark font-header text-xs uppercase" >
          SEND COMMAND < i class="fa-solid fa-terminal ml-2" > </i>
        </button>
      </div>
    </div>
  </div>
                                                                                                                                                                                                                                                                  </section >

                                                                                                                                                                                                                                                                  < !--SECTION 9: FOOTER-- >
                                                                                                                                                                                                                                                                    <footer class="py-20 bg-dark text-center border-t-8 border-ui" >
                                                                                                                                                                                                                                                                      <div class="pixel-heart text-4xl text-primary mb-6" > <i class="fa-solid fa-heart" > </i></div >
                                                                                                                                                                                                                                                                        <h2 class="font-header text-xl text-white mb-4 uppercase" > THANKS FOR PLAYING! </h2>
                                                                                                                                                                                                                                                                          < p class="font-mono text-2xl text-secondary mb-8 uppercase" > Nicola & Salsa </p>
                                                                                                                                                                                                                                                                            < div class="text-[8px] text-white/30 tracking-widest font-header uppercase" > GAME OVER ? NO, JUST LEVEL 2. </div>
                                                                                                                                                                                                                                                                              </footer>

                                                                                                                                                                                                                                                                              < !--Inventory / Nav-- >
  <nav id="navbar" class="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white border-4 border-dark flex gap-6 p-4 z-40 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-700 translate-y-32 opacity-0" >
    <a href="#home" class="text-dark hover:text-primary transition-all active:scale-90" > <i class="fa-solid fa-house-user" > </i></a >
    <a href="#couple" class="text-dark hover:text-primary transition-all active:scale-90" > <i class="fa-solid fa-users" > </i></a >
    <a href="#event" class="text-dark hover:text-primary transition-all active:scale-90" > <i class="fa-solid fa-scroll" > </i></a >
    <a href="#gallery" class="text-dark hover:text-primary transition-all active:scale-90" > <i class="fa-solid fa-images" > </i></a >
    <a href="#gift" class="text-dark hover:text-primary transition-all active:scale-90" > <i class="fa-solid fa-coins" > </i></a >
  </nav>

                                                                                                                                                                                                                                                                                          </main >

                                                                                                                                                                                                                                                                                          < !--Notification Toast-- >
                                                                                                                                                                                                                                                                                            <div id="toast" class="fixed top-20 left-1/2 -translate-x-1/2 z-[1000] bg-accent text-dark border-4 border-dark px-8 py-4 opacity-0 transition-all pointer-events-none font-header text-[8px] shadow-[4px_4px_0px_0px_#000] uppercase" >
                                                                                                                                                                                                                                                                                              ITEM COLLECTED!
                                                                                                                                                                                                                                                                                                </div>

                                                                                                                                                                                                                                                                                                < !--Image Modal-- >
                                                                                                                                                                                                                                                                                                  <div id="imgModal" class="modal fixed inset-0 bg-dark/95 flex items-center justify-center z-[10000] p-4" onclick = "closeModal()" >
                                                                                                                                                                                                                                                                                                    <div class="pixel-box p-2 bg-white max-w-full" >
                                                                                                                                                                                                                                                                                                      <img id="modalImage" src = "" class="max-h-[70vh] w-auto border-2 border-dark" alt = "Screenshot" >
                                                                                                                                                                                                                                                                                                        <p class="text-[8px] font-header text-center mt-4 text-dark" > [PRESS ANYWHERE TO CLOSE] </p>
                                                                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                                                                          </div>

                                                                                                                                                                                                                                                                                                          < !--SCRIPTS -->
                                                                                                                                                                                                                                                                                                            <script src="https://unpkg.com/aos@2.3.1/dist/aos.js" > </script>
                                                                                                                                                                                                                                                                                                              <script>
// System Initialization
AOS.init({ once: true, duration: 400, easing: 'ease-in-out' });

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
let playPromise = null;

// Transition Logic: Cover to Main
function openInvitation() {
  // 1. Start music first
  toggleMusic(true);

  // 2. Animate cover slide
  dom.cover.classList.add('cover-slide-up');

  // 3. Setup main content
  dom.main.classList.remove('content-hidden');

  setTimeout(() => {
    dom.main.classList.replace('opacity-0', 'opacity-100');
    dom.musicCtrl.classList.remove('hidden', 'opacity-0');
    dom.nav.classList.remove('translate-y-32', 'opacity-0');

    // Remove cover from DOM after animation
    setTimeout(() => {
      dom.cover.style.display = 'none';
    }, 1000);

    document.body.style.overflow = 'auto';
    AOS.refresh();
  }, 300);
}

// Music Logic with Promise Handling
async function toggleMusic(forcePlay = false) {
  if (forcePlay || !isPlaying) {
    try {
      playPromise = dom.music.play();
      if (playPromise !== undefined) {
        await playPromise;
        isPlaying = true;
        dom.musicIcon.classList.replace('fa-volume-high', 'fa-music');
        dom.musicIcon.classList.add('fa-spin');
      }
    } catch (err) {
      console.warn("Autoplay was prevented.");
      isPlaying = false;
    }
  } else {
    if (playPromise !== null) {
      await playPromise;
    }
    dom.music.pause();
    isPlaying = false;
    dom.musicIcon.classList.replace('fa-music', 'fa-volume-high');
    dom.musicIcon.classList.remove('fa-spin');
  }
}

// Countdown logic
const tDate = new Date("2025-10-09T10:00:00").getTime();
function updateCD() {
  const now = new Date().getTime();
  const diff = tDate - now;

  if (diff < 0) {
    dom.countdown.innerHTML = "<div class='font-header text-accent text-xs uppercase'>NEW LEVEL UNLOCKED!</div>";
    return;
  }

  const t = {
    days: Math.floor(diff / 86400000),
    hrs: Math.floor((diff % 86400000) / 3600000),
    mins: Math.floor((diff % 3600000) / 60000),
    secs: Math.floor((diff % 60000) / 1000)
  };

  dom.countdown.innerHTML = Object.entries(t).map(([key, val]) => \`
        <div class="pixel-box-dark border-2 p-3 w-20 text-center">
            <div class="text-xl font-header text-white">\${val}</div>
            <div class="text-[6px] font-header text-secondary mt-1 uppercase">\${key}</div>
        </div>
      \`).join(`;
