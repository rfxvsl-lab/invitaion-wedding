// Auto-generated template export
// Template: luxury-dark

export const template = `<!DOCTYPE html>
    < html lang="id" class= "scroll-smooth" >
      <head>
        <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0" >
            <title>The Wedding of Nicola & Salsa </title>

            < !--Fonts: Premium Luxury Tier -->
            <link rel="preconnect" href="https://fonts.googleapis.com" >
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin >
                <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Pinyon+Script&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet" >

                  <!--Core Libraries-- >
                  <script src="https://cdn.tailwindcss.com" > </script>
                  < link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" >
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" >

                      <script>
                        tailwind.config = {
                          theme: {
                          extend: {
                          colors: {
                          primary: '#B89E67',    /* Gold Satin */
                        secondary: '#D4AF37',  /* Metallic Gold */
                        dark: '#0A0A0A',       /* Deep Charcoal */
                        accent: '#141414',     /* Card Surface */
                        cream: '#EADBC8',      /* Soft Text */
            },
                        fontFamily: {
                          header: ['"Cinzel Decorative"', 'serif'],
                        script: ['"Pinyon Script"', 'cursive'],
                        sans: ['"Montserrat"', 'sans-serif'],
            }
    }
  }
}
                      </script>

                      <style>
      /* Premium Scrollbar */
                        :: -webkit - scrollbar {width: 4px; }
                        :: -webkit - scrollbar - track {background: #0A0A0A; }
                        :: -webkit - scrollbar - thumb {background: linear - gradient(#0A0A0A, #B89E67, #0A0A0A); }

                        /* Reveal Animation Logic */
                        .cover - hidden {transform: translateY(-100 %); transition: transform 1.2s cubic - bezier(0.85, 0, 0.15, 1); }

                        /* Luxury Mask & Borders */
                        .img - arch {
                          border - radius: 999px 999px 0 0;
                        border: 1px solid rgba(184, 158, 103, 0.4);
                        padding: 10px;
}

                        .glass - effect {
                          background: rgba(20, 20, 20, 0.7);
                        backdrop - filter: blur(12px);
                        border: 1px solid rgba(184, 158, 103, 0.15);
}

                        .gold - gradient {
                          background: linear - gradient(135deg, #B89E67 0 %, #F3E5AB 50 %, #D4AF37 100 %);
                        -webkit - background - clip: text;
                        -webkit - text - fill - color: transparent;
}

                        .bg - luxury {
                          background - image: radial - gradient(circle at 2px 2px, rgba(184, 158, 103, 0.03) 1px, transparent 0);
                        background - size: 40px 40px;
}

                        /* Rotation for Music Disk */
                        @keyframes spin - slow {from {transform: rotate(0deg); } to {transform: rotate(360deg); } }
                        .animate - spin - slow {animation: spin - slow 6s linear infinite; }

                        /* Modal Animation */
                        #imgModal {opacity: 0; pointer - events: none; transition: opacity 0.4s ease; }
                        #imgModal.active {opacity: 1; pointer - events: all; }
                      </style>
                    </head>
                    < body class="bg-dark text-cream font-sans overflow-hidden select-none antialiased" >

                      <!--Background Music Asset-- >
                      <audio id="bgMusic" loop >
                        <source src="https://www.bensound.com/bensound-music/bensound-romantic.mp3" type="audio/mpeg" >
                      </audio>

                      < !--Floating Music Control-- >
                      <aside id="musicControl" class="fixed top-6 right-6 z-[60] hidden opacity-0 transition-opacity duration-1000" >
                        <button onclick="toggleMusic()" class="group w-12 h-12 glass-effect rounded-full flex items-center justify-center text-primary shadow-xl hover:scale-110 transition-all active:scale-95 border-primary/40" >
                          <i class="fa-solid fa-music animate-spin-slow" id="musicIcon" > </i>
                        </button>
                      </aside>

                      < !--SECTION 1: COVER-- >
                      <div id="cover" class="fixed inset-0 z-[100] bg-dark flex flex-col justify-center items-center text-center overflow-hidden" >
                        <!--Cover Background Image-- >
                        <div class="absolute inset-0 grayscale-[40%] brightness-[0.4]" >
                          <img src="https://placehold.co/600x800" class="w-full h-full object-cover" alt="Background" >
                        </div>

                        < !--Cover Content-- >
                        <div class="relative z-10 px-6 max-w-2xl" data - aos="zoom-out" data - aos - duration="2000" >
                        <p class="font-header tracking-[0.6em] text-xs mb-8 text-primary/80 uppercase" > The Wedding Celebration Of </p>
                        < h1 class="font-script text-7xl md:text-9xl gold-gradient mb-6 drop-shadow-lg" > Nicola & Salsa </h1>
                        < div class="h-[1px] w-24 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-10" > </div>

                        < div class="mb-12" >
                          <p class="text-[10px] tracking-[0.4em] mb-4 uppercase opacity-60" > Kepada Bapak / Ibu / Saudara / i </p>
                          < div class="glass-effect py-4 px-8 inline-block rounded-sm border-primary/20" >
                            <span class="font-header text-lg tracking-widest text-primary" > TAMU UNDANGAN </span>
                          </div>
                        </div>

                        < button onclick="openInvitation()" class="group relative px-12 py-4 overflow-hidden border border-primary/50 text-primary font-header tracking-[0.4em] text-[10px] hover:text-dark transition-colors duration-500" >
                          <span class="relative z-10" > <i class="fa-solid fa-envelope-open mr-2" > </i> BUKA UNDANGAN</span >
                          <div class="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500" > </div>
                        </button>
                      </div>
                    </div>

                    < !--MAIN SCROLLABLE WRAPPER-- >
                    <main id="mainContent" class="hidden opacity-0 transition-opacity duration-1000" >

                      <!--SECTION 2: HOME(HERO)-- >
                      <section id="home" class="relative min-h-screen flex flex-col justify-center items-center bg-luxury pt-24 pb-20 px-4" >
                        <div class="text-center mb-16" data - aos="fade-up" >
                        <p class="font-header tracking-[0.5em] text-primary text-[10px] mb-4" > WE ARE GETTING MARRIED </p>
                        < h2 class="font-script text-7xl md:text-8xl gold-gradient leading-tight" > Nicola & Salsa </h2>
                      </div>

                      < div class="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center" >
                        <div class="order-2 md:order-1 text-center md:text-right" data - aos="fade-right" >
                        <p class="font-header text-2xl mb-2" >09 OKTOBER 2025 </p>
                        < p class="text-xs tracking-[0.3em] text-primary mb-8 uppercase opacity-80" > Kamis Wage </p>
                        < div class="w-16 h-[2px] bg-primary ml-auto hidden md:block mb-8" > </div>
                        < p class="font-sans italic font-light leading-relaxed text-sm text-cream/70" >
                          "Sebab di mana ada cinta, di situ ada kehidupan. Di mana ada janji, di situ ada harapan."
                        </p>
                      </div>
                      < div class="order-1 md:order-2 flex justify-center" data - aos="zoom-in" >
                      <div class="w-72 h-96 img-arch overflow-hidden" >
                        <img src="https://placehold.co/600x800" class="w-full h-full object-cover rounded-t-full" alt="Main Photo" >
                      </div>
                    </div>
                  </div>
                </section>

                < !--SECTION 3: AYAT-- >
                <section class="py-24 glass-effect border-y border-primary/10" >
                  <div class="max-w-3xl mx-auto px-6 text-center" data - aos="fade-up" >
                  <i class="fa-solid fa-feather-pointed text-primary/30 text-3xl mb-8" > </i>
                  < p class="font-sans text-lg md:text-xl font-light italic leading-loose mb-8 text-cream/90" >
                    "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
                  </p>
                  < div class="inline-block px-6 py-2 border-x border-primary/40" >
                    <span class="font-header text-primary tracking-widest text-xs" > QS.AR - RUM: 21 </span>
                  </div>
                </div>
              </section>

              < !--SECTION 4: COUPLE-- >
              <section id="couple" class="py-32 bg-luxury relative overflow-hidden" >
                <div class="container mx-auto px-6 max-w-6xl" >
                  <div class="text-center mb-24" data - aos="fade-down" >
                  <h2 class="font-header text-4xl text-primary tracking-[0.3em] mb-4" > THE COUPLE </h2>
                  < div class="h-[1px] w-12 bg-primary mx-auto" > </div>
                </div>

                < div class="grid md:grid-cols-2 gap-24 items-start relative" >
                  <!--Separator Line-- >
                  <div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-primary/20 to-transparent" > </div>

                  < !--Groom -->
                  <div class="text-center group" data - aos="fade-right" >
                  <div class="relative w-64 h-80 mx-auto mb-10 overflow-hidden img-arch shadow-2xl" >
                    <img src="nicola.jpg" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Groom" onerror="this.src='https://placehold.co/400x500?text=Groom'" >
                  </div>
                  < h3 class="font-header text-2xl font-bold gold-gradient mb-2" > Nicola Valentino Misno </h3>
                  < p class="text-[10px] tracking-[0.4em] text-primary font-bold mb-4 uppercase" > Putra Kedua Dari </p>
                  < p class="font-sans text-sm font-light text-cream/70 italic" > Bpk.Misno(Mendol) & Ibu Atik Fifiani </p>
                  < a href="#" class="mt-8 inline-flex items-center justify-center w-10 h-10 rounded-full border border-primary/30 text-primary hover:bg-primary hover:text-dark transition-all" > <i class="fa-brands fa-instagram" > </i></a >
                </div>

                < !--Bride -->
                <div class="text-center group" data - aos="fade-left" >
                <div class="relative w-64 h-80 mx-auto mb-10 overflow-hidden img-arch shadow-2xl" >
                  <img src="salsa.jpg" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Bride" onerror="this.src='https://placehold.co/400x500?text=Bride'" >
                </div>
                < h3 class="font-header text-2xl font-bold gold-gradient mb-2" > Salsabillah Ekanaiya Putri </h3>
                < p class="text-[10px] tracking-[0.4em] text-primary font-bold mb-4 uppercase" > Putri Pertama Dari </p>
                < p class="font-sans text-sm font-light text-cream/70 italic" > Bpk.M.Rofiek Aribowo & Ibu Sri Kurniawati </p>
                < a href="#" class="mt-8 inline-flex items-center justify-center w-10 h-10 rounded-full border border-primary/30 text-primary hover:bg-primary hover:text-dark transition-all" > <i class="fa-brands fa-instagram" > </i></a >
              </div>
            </div>
          </div>
        </section>

        < !--SECTION 5: EVENT-- >
        <section id="event" class="py-32 relative bg-accent" >
          <div class="absolute inset-0 grayscale brightness-[0.2] opacity-20" >
            <img src="prewedding2.jpg" class="w-full h-full object-cover bg-fixed" alt="BG" >
          </div>

          < div class="container mx-auto px-6 relative z-10 text-center" >
            <h2 class="font-header text-4xl text-primary tracking-[0.3em] mb-20" data - aos="fade-down" > SAVE THE DATE </h2>

          < div class="max-w-xl mx-auto glass-effect p-12 relative" data - aos="flip-up" >
          <div class="mb-10" >
            <i class="fa-solid fa-wine-glass text-4xl text-primary/50 mb-6" > </i>
            < h3 class="font-header text-3xl font-bold text-white mb-2" > RESEPSI </h3>
            < p class="text-[10px] tracking-[0.5em] text-primary uppercase font-bold" > The Celebration </p>
          </div>

          < div class="grid grid-cols-1 gap-8 border-y border-primary/20 py-10 my-10" >
            <div class="space-y-2" >
              <p class="font-header text-xl text-cream" > Kamis, 09 Oktober 2025 </p>
              < p class="text-[10px] tracking-[0.4em] text-primary/80 uppercase" > 10:00 WIB - SELESAI </p>
            </div>
            < div class="w-12 h-[1px] bg-primary/30 mx-auto" > </div>
            < div class="space-y-4" >
              <p class="text-xs tracking-widest text-cream uppercase" > LOKASI: </p>
              < p class="font-sans text-sm font-light leading-relaxed tracking-widest text-cream/70" >
                Jalan Arumdalu RT.04 RW.03 < br > Bocek Karangploso(Toko Pak Mendol)
              </p>
            </div>
          </div>

          < a href="https://maps.google.com" target="_blank" class="inline-block px-10 py-4 border border-primary text-primary font-header text-[10px] tracking-[0.4em] hover:bg-primary hover:text-dark transition-all duration-500" >
            PETUNJUK LOKASI < i class="fa-solid fa-location-dot ml-2" > </i>
          </a>
        </div>

        < !--Countdown -->
        <div id="countdown" class="flex flex-wrap justify-center gap-6 mt-24" data - aos="fade-up" >
        <!--Populated by JS-- >
      </div>
                                                                                                                                                                                                      </div >
                                                                                                                                                                                                      </section >

                                                                                                                                                                                                      < !--SECTION 6: GALLERY-- >
                                                                                                                                                                                                        <section id="gallery" class="py-32 bg-luxury" >
                                                                                                                                                                                                          <div class="container mx-auto px-4 max-w-7xl" >
                                                                                                                                                                                                            <div class="text-center mb-20" >
                                                                                                                                                                                                              <h2 class="font-header text-4xl text-primary tracking-[0.3em] mb-4" data - aos="fade-up" > THE GALLERY </h2>
                                                                                                                                                                                                                < p class="text-[10px] tracking-[0.5em] uppercase text-cream/40" data - aos="fade-up" data - aos - delay="200" > Our Shared Journey </p>
                                                                                                                                                                                                                  </div>

                                                                                                                                                                                                                  < div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8" >
                                                                                                                                                                                                                    <div class="space-y-4 md:space-y-8" >
                                                                                                                                                                                                                      <div class="group overflow-hidden border border-primary/20 p-2 glass-effect cursor-pointer" onclick = "openModal('prewedding1.jpg')" data - aos="fade-up" >
                                                                                                                                                                                                                        <img src="prewedding1.jpg" class="w-full h-auto grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" alt = "G1" >
                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                          < div class="group overflow-hidden border border-primary/20 p-2 glass-effect cursor-pointer" onclick = "openModal('prewedding2.jpg')" data - aos="fade-up" >
                                                                                                                                                                                                                            <img src="prewedding2.jpg" class="w-full h-auto grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" alt = "G2" >
                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                              </div >
  < div class="space-y-4 md:space-y-8 md:pt-16" >
    <div class="group overflow-hidden border border-primary/20 p-2 glass-effect cursor-pointer" onclick="openModal('prewedding3.jpg')" data - aos="fade-up" >
    <img src="prewedding3.jpg" class="w-full h-auto grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" alt="G3" >
  </div>
                                                                                                                                                                                                                                    </div >
                                                                                                                                                                                                                                    < div class="space-y-4 md:space-y-8" >
                                                                                                                                                                                                                                      <div class="group overflow-hidden border border-primary/20 p-2 glass-effect cursor-pointer" onclick = "openModal('prewedding4.jpg')" data - aos="fade-up" >
                                                                                                                                                                                                                                        <img src="prewedding4.jpg" class="w-full h-auto grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" alt = "G4" >
                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                          < div class="group overflow-hidden border border-primary/20 p-2 glass-effect cursor-pointer" onclick = "openModal('https://placehold.co/600x800')" data - aos="fade-up" >
  <img src="https://placehold.co/600x800" class="w-full h-auto grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" alt="G5" >
  </div>
                                                                                                                                                                                                                                              </div >
  < div class="space-y-4 md:space-y-8 md:pt-16" >
    <div class="group overflow-hidden border border-primary/20 p-2 glass-effect cursor-pointer" onclick="openModal('salsa.jpg')" data - aos="fade-up" >
    <img src="salsa.jpg" class="w-full h-auto grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" alt="G6" >
  </div>
                                                                                                                                                                                                                                                    </div >
                                                                                                                                                                                                                                                    </div >
                                                                                                                                                                                                                                                    </div >
                                                                                                                                                                                                                                                    </section >

                                                                                                                                                                                                                                                    < !--SECTION 7: GIFT-- >
                                                                                                                                                                                                                                                      <section id="gift" class="py-32 bg-accent/80 border-y border-primary/10" >
                                                                                                                                                                                                                                                        <div class="container mx-auto px-6 text-center max-w-4xl" >
                                                                                                                                                                                                                                                          <h2 class="font-header text-4xl text-primary tracking-[0.3em] mb-12" data - aos="fade-down" > WEDDING GIFT </h2>
                                                                                                                                                                                                                                                            < p class="font-sans text-cream/70 mb-16 font-light leading-relaxed italic" data - aos="fade-up" >
                                                                                                                                                                                                                                                              Doa restu Anda merupakan karunia yang sangat berarti bagi kami.Namun jika memberi adalah ungkapan tanda kasih Anda, kami ucapkan terima kasih.
          </p>

                                                                                                                                                                                                                                                                < div class="max-w-md mx-auto glass-effect p-12 rounded-sm border-primary/20 shadow-2xl overflow-hidden relative group" data - aos="zoom-in" >
  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg" class="h-6 mx-auto mb-10 opacity-70 brightness-200 grayscale" alt="BCA" >

    <div class="mb-12" >
      <p class="font-header text-3xl font-black text-white tracking-widest mb-3" > 8163069596 </p>
      < p class="text-[10px] tracking-[0.5em] text-primary uppercase font-bold" > a.n Nicola Valentino </p>
    </div>

    < button onclick="copyToClipboard()" class="w-full py-4 border border-primary/40 text-primary font-header text-[10px] tracking-[0.3em] hover:bg-primary hover:text-dark transition-all duration-500 uppercase" >
      <i class="fa-regular fa-copy mr-2" > </i> SALIN NO. REKENING
    </button>
  </div>
                                                                                                                                                                                                                                                                              </div >
                                                                                                                                                                                                                                                                              </section >

                                                                                                                                                                                                                                                                              < !--SECTION 8: RSVP-- >
                                                                                                                                                                                                                                                                                <section id="rsvp" class="py-32 bg-luxury pb-48" >
                                                                                                                                                                                                                                                                                  <div class="container mx-auto px-6 max-w-2xl" >
                                                                                                                                                                                                                                                                                    <div class="text-center mb-16" >
                                                                                                                                                                                                                                                                                      <h2 class="font-header text-4xl text-primary tracking-[0.3em] mb-4" data - aos="fade-down" > WISHES </h2>
                                                                                                                                                                                                                                                                                        < p class="text-[10px] tracking-[0.5em] text-cream/30 uppercase" data - aos="fade-down" data - aos - delay="200" > Send your prayers </p>
                                                                                                                                                                                                                                                                                          </div>

                                                                                                                                                                                                                                                                                          < div class="glass-effect p-8 md:p-12 border-primary/10 shadow-inner" data - aos="fade-up" >
  <div class="space-y-8" >
    <div>
      <label class="text-[10px] tracking-widest text-primary font-bold uppercase block mb-4" > Pesan & Doa Restu </label>
      < textarea id="guestMsg" rows="6" class="w-full bg-dark/40 border-b border-primary/30 p-4 focus:outline-none focus:border-primary transition-all font-sans text-cream/80 text-sm font-light resize-none placeholder:text-cream/20" placeholder="Tuliskan ucapan Anda disini..." > </textarea>
    </div>

    < button onclick="sendToWA()" class="w-full py-5 bg-primary text-dark font-header text-xs tracking-[0.4em] shadow-[0_0_40px_rgba(184,158,103,0.1)] hover:bg-white transition-all transform active:scale-95 uppercase" >
      KIRIM UCAPAN < i class="fa-solid fa-paper-plane ml-2" > </i>
    </button>
  </div>
                                                                                                                                                                                                                                                                                                      </div >
                                                                                                                                                                                                                                                                                                      </div >
                                                                                                                                                                                                                                                                                                      </section >

                                                                                                                                                                                                                                                                                                      < !--SECTION 9: FOOTER-- >
                                                                                                                                                                                                                                                                                                        <footer class="bg-black text-center py-24 border-t border-primary/10 relative" >
                                                                                                                                                                                                                                                                                                          <h2 class="font-script text-6xl gold-gradient mb-4" > Nicola & Salsa </h2>
                                                                                                                                                                                                                                                                                                            < p class="font-header text-[9px] tracking-[0.6em] text-primary/60 uppercase mb-12" >09 OKTOBER 2025 • Karangploso </p>

                                                                                                                                                                                                                                                                                                              < div class="flex justify-center items-center gap-6 opacity-30 mb-12" >
                                                                                                                                                                                                                                                                                                                <div class="h-[1px] w-12 bg-primary" > </div>
                                                                                                                                                                                                                                                                                                                  < i class="fa-solid fa-heart text-xs text-primary" > </i>
                                                                                                                                                                                                                                                                                                                    < div class="h-[1px] w-12 bg-primary" > </div>
                                                                                                                                                                                                                                                                                                                      </div>

                                                                                                                                                                                                                                                                                                                      < div class="text-[8px] tracking-[0.3em] text-cream/20 font-sans uppercase" >
                                                                                                                                                                                                                                                                                                                        Crafted with Love for Eternal Eternity
                                                                                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                                                                                          </footer>

                                                                                                                                                                                                                                                                                                                          < !--NAVIGATION TAB BAR-- >
  <nav id="navbar" class="fixed bottom-8 left-1/2 -translate-x-1/2 z-[55] glass-effect px-8 py-4 rounded-full shadow-2xl flex gap-8 transition-all duration-1000 translate-y-32 opacity-0" >
    <a href="#home" class="text-cream/40 hover:text-primary transition-colors text-lg active:scale-90" > <i class="fa-solid fa-house" > </i></a >
    <a href="#couple" class="text-cream/40 hover:text-primary transition-colors text-lg active:scale-90" > <i class="fa-solid fa-user-group" > </i></a >
    <a href="#event" class="text-cream/40 hover:text-primary transition-colors text-lg active:scale-90" > <i class="fa-solid fa-calendar-check" > </i></a >
    <a href="#gallery" class="text-cream/40 hover:text-primary transition-colors text-lg active:scale-90" > <i class="fa-solid fa-images" > </i></a >
    <a href="#gift" class="text-cream/40 hover:text-primary transition-colors text-lg active:scale-90" > <i class="fa-solid fa-gift" > </i></a >
  </nav>

                                                                                                                                                                                                                                                                                                                                        </main >

                                                                                                                                                                                                                                                                                                                                        < !--UTILITIES: TOAST & MODAL-- >
                                                                                                                                                                                                                                                                                                                                          <div id="toast" class="fixed top-12 left-1/2 -translate-x-1/2 z-[1000] glass-effect border border-primary/50 text-primary px-8 py-3 rounded-sm opacity-0 transition-all pointer-events-none translate-y-[-20px] shadow-2xl" >
                                                                                                                                                                                                                                                                                                                                            <span class="font-header text-[10px] tracking-[0.2em] uppercase" > Berhasil Menyalin Rekening </span>
                                                                                                                                                                                                                                                                                                                                              </div>

                                                                                                                                                                                                                                                                                                                                              < div id = "imgModal" class="fixed inset-0 bg-black/95 flex items-center justify-center z-[10000] p-6" onclick = "this.classList.remove('active')" >
                                                                                                                                                                                                                                                                                                                                                <button class="absolute top-10 right-10 text-primary text-4xl" >& times; </button>
                                                                                                                                                                                                                                                                                                                                                  < img id = "modalImage" src = "" class="max-h-[85vh] max-w-full shadow-2xl border border-primary/20" alt = "Full Preview" >
                                                                                                                                                                                                                                                                                                                                                    </div>

                                                                                                                                                                                                                                                                                                                                                    < !--SCRIPTS -->
                                                                                                                                                                                                                                                                                                                                                      <script src="https://unpkg.com/aos@2.3.1/dist/aos.js" > </script>
                                                                                                                                                                                                                                                                                                                                                        <script>
// System Initialization
AOS.init({ once: true, duration: 1200, easing: 'ease-in-out-sine' });

const dom = {
  cover: document.getElementById('cover'),
  main: document.getElementById('mainContent'),
  music: document.getElementById('bgMusic'),
  musicCtrl: document.getElementById('musicControl'),
  musicIcon: document.getElementById('musicIcon'),
  nav: document.getElementById('navbar'),
  countdown: document.getElementById('countdown')
};

let musicPlaying = false;

// Transition Cover to Main
function openInvitation() {
  // Start Music
  toggleMusic(true);

  // Animations
  dom.cover.classList.add('cover-hidden');
  dom.main.classList.remove('hidden');

  setTimeout(() => {
    dom.main.classList.replace('opacity-0', 'opacity-100');
    dom.musicCtrl.classList.replace('hidden', 'flex');
    dom.musicCtrl.classList.replace('opacity-0', 'opacity-100');
    dom.nav.classList.remove('translate-y-32', 'opacity-0');
    document.body.style.overflow = 'auto';
    AOS.refresh();
  }, 800);
}

// Music Logic
function toggleMusic(forcePlay = false) {
  if (forcePlay || !musicPlaying) {
    dom.music.play();
    musicPlaying = true;
    dom.musicIcon.classList.add('animate-spin-slow');
    dom.musicIcon.classList.replace('fa-play', 'fa-music');
  } else {
    dom.music.pause();
    musicPlaying = false;
    dom.musicIcon.classList.remove('animate-spin-slow');
    dom.musicIcon.classList.replace('fa-music', 'fa-play');
  }
}

// Countdown Logic
const weddingDate = new Date("2025-10-09T10:00:00").getTime();

function updateClock() {
  const now = new Date().getTime();
  const gap = weddingDate - now;

  if (gap < 0) {
    dom.countdown.innerHTML = \`<div class='font-header text-primary tracking-widest'>THE HAPPINESS HAS BEGUN</div>\`;
    return;
  }

  const time = {
    hari: Math.floor(gap / (1000 * 60 * 60 * 24)),
    jam: Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    menit: Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60)),
    detik: Math.floor((gap % (1000 * 60)) / 1000)
  };

  dom.countdown.innerHTML = Object.entries(time).map(([key, val]) => \`
              <div class="glass-effect rounded-sm p-4 w-24 border-primary/20 shadow-xl group hover:border-primary/60 transition-colors">
                  <div class="text-3xl font-black font-header text-white mb-1">\${val}</div>
                  <div class="text-[8px] uppercase tracking-[0.2em] text-primary font-bold">\${key}</div>
              </div>
          \`).join('');
}

setInterval(updateClock, 1000);
updateClock();

// clipboard logic
function copyToClipboard() {
  const textToCopy = "8163069596";
  const toast = document.getElementById('toast');
  const dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = textToCopy;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);

  toast.classList.replace('opacity-0', 'opacity-100');
  toast.classList.replace('translate-y-[-20px]', 'translate-y-0');

  setTimeout(() => {
    toast.classList.replace('opacity-100', 'opacity-0');
    toast.classList.replace('translate-y-0', 'translate-y-[-20px]');
  }, 3000);
}

// Modal Interaction
function openModal(src) {
  const modal = document.getElementById('imgModal');
  const modalImg = document.getElementById('modalImage');
  modalImg.src = src;
  modal.classList.add('active');
}

// Messaging Logic
function sendToWA() {
  const message = document.getElementById("guestMsg").value;
  if (!message.trim()) return;
  const recipient = "nikolavalentino8@gmail.com";
  const subject = "Wedding Wishes for Nicola & Salsa";
  window.location.href = \`mailto:\${recipient}?subject=\${encodeURIComponent(subject)}&body=\${encodeURIComponent(message)}\`;
}

// Lock Scroll on Load
document.body.style.overflow = 'hidden';
</script>
  </body >
  </html >
  \`, //
  'rustic-wood': \`< !DOCTYPE html >
  <html lang="id" class="scroll-smooth" >
    <head>
      <meta charset="UTF-8" >
        <meta name="viewport" content="width=device-width, initial-scale=1.0" >
          <title>The Wedding of Nicola & Salsa - Rustic Edition </title>

          < !--Fonts: Rustic & Organic(Playfair for Titles, Dancing Script for Names, Quicksand for Body) -->
          <link rel="preconnect" href="https://fonts.googleapis.com" >
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin >
              <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Quicksand:wght@300;400;600&display=swap" rel="stylesheet" >

                <!--Tailwind CSS-- >
                <script src="https://cdn.tailwindcss.com" > </script>

                < !--AOS Animation-- >
                <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" >

                  <!--Icons -->
                  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" >

                    <script>
                      tailwind.config = {
                        theme: {
                        extend: {
                        colors: {
                        primary: '#8B5E3C',    /* Wood Brown */
                      secondary: '#A67B5B',  /* Tan / Light Wood */
                      dark: '#3E2723',       /* Dark Bark */
                      accent: '#626F47',     /* Sage Green / Leaves */
                      cream: '#F5F5DC',      /* Warm Beige */
                      paper: '#FAF3E0',      /* Vintage Paper */
            },
                      fontFamily: {
                        header: ['"Playfair Display"', 'serif'],
                      script: ['"Dancing Script"', 'cursive'],
                      sans: ['"Quicksand"', 'sans-serif'],
            }
    }
  }
}
                    </script>

                    <style>
      /* Custom Scrollbar Rustic */
                      :: -webkit - scrollbar {width: 6px; }
                      :: -webkit - scrollbar - track {background: #F5F5DC; }
                      :: -webkit - scrollbar - thumb {background: #8B5E3C; border - radius: 10px; }

                      .cover - slide - up {
                        transform: translateY(-100 %);
                      transition: transform 1.2s cubic - bezier(0.77, 0, 0.175, 1);
}

                      /* Paper Texture Overlay */
                      .bg - rustic - pattern {
                        background - color: #FAF3E0;
                      background - image: url("https://www.transparenttextures.com/patterns/pinstriped-suit.png");
}

                      /* Organic Image Frame */
                      .img - organic {
                        border - radius: 60 % 40 % 30 % 70 % / 60% 30% 70% 40%;
                      border: 8px solid white;
                      box - shadow: 0 10px 30px rgba(62, 39, 35, 0.1);
}

                      /* Wood Button Shadow */
                      .btn - rustic {
                        box - shadow: 4px 4px 0px #3E2723;
                      transition: all 0.2s ease;
}
                      .btn - rustic:active {
                        box - shadow: 0px 0px 0px #3E2723;
                      transform: translate(2px, 2px);
}

                      /* Floating Leaves Animation */
                      @keyframes float {
                        0 % { transform: translateY(0px) rotate(0deg); }
  50 % {transform: translateY(-10px) rotate(5deg); }
                      100 % {transform: translateY(0px) rotate(0deg); }
}
                      .leaf - deco {animation: float 4s ease -in -out infinite; }

                      /* Modal Styling */
                      .modal {
                        transition: opacity 0.3s ease;
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
                  < body class="bg-paper text-dark font-sans overflow-hidden antialiased" >

                    <!--Audio -->
                    <audio id="bgMusic" loop >
                      <source src="https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3" type="audio/mpeg" >
                    </audio>

                    < !--Music Control(Rustic Style)-- >
                    <div id="musicControl" class="fixed top-6 right-6 z-50 hidden opacity-0 transition-opacity duration-1000" >
                      <button onclick="toggleMusic()" class="w-14 h-14 bg-primary text-cream rounded-full shadow-lg flex items-center justify-center border-4 border-white" >
                        <i class="fa-solid fa-compact-disc animate-spin-slow" id="musicIcon" style="animation-duration: 5s;" > </i>
                      </button>
                    </div>

                    < !--COVER SCREEN-- >
                    <div id="cover" class="fixed inset-0 z-[100] bg-[url('https://placehold.co/600x800')] bg-cover bg-center h-screen w-full flex flex-col justify-center items-center text-center p-6 before:content-[`;
