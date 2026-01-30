// @ts-nocheck
/* eslint-disable */
export const TEMPLATES_COLLECTION = {
  'luxury-dark': '<!DOCTYPE html>
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
                          <img src="mempelaicover.jpg" class="w-full h-full object-cover" alt="Background" >
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
                        <img src="mempelaicover.jpg" class="w-full h-full object-cover rounded-t-full" alt="Main Photo" >
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
                                                                                                                                                                                                                                          < div class="group overflow-hidden border border-primary/20 p-2 glass-effect cursor-pointer" onclick = "openModal('mempelaicover.jpg')" data - aos="fade-up" >
  <img src="mempelaicover.jpg" class="w-full h-auto grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" alt="G5" >
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
    dom.countdown.innerHTML = `<div class='font-header text-primary tracking-widest'>THE HAPPINESS HAS BEGUN</div>`;
    return;
  }

  const time = {
    hari: Math.floor(gap / (1000 * 60 * 60 * 24)),
    jam: Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    menit: Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60)),
    detik: Math.floor((gap % (1000 * 60)) / 1000)
  };

  dom.countdown.innerHTML = Object.entries(time).map(([key, val]) => `
              <div class="glass-effect rounded-sm p-4 w-24 border-primary/20 shadow-xl group hover:border-primary/60 transition-colors">
                  <div class="text-3xl font-black font-header text-white mb-1">${val}</div>
                  <div class="text-[8px] uppercase tracking-[0.2em] text-primary font-bold">${key}</div>
              </div>
          `).join('');
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
  window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
}

// Lock Scroll on Load
document.body.style.overflow = 'hidden';
</script>
  </body >
  </html >
  `, //
  'rustic-wood': `< !DOCTYPE html >
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
                    <div id="cover" class="fixed inset-0 z-[100] bg-[url('mempelaicover.jpg')] bg-cover bg-center h-screen w-full flex flex-col justify-center items-center text-center p-6 before:content-[''] before:absolute before:inset-0 before:bg-dark/40 before:backdrop-blur-[2px]" >

                      <div class="relative z-10 bg-paper/90 p-8 md:p-16 rounded-[40px] shadow-2xl border-2 border-primary/20 max-w-lg w-full" data - aos="zoom-in" >
                      <!--Decorative Leaf SVG-- >
                      <div class="absolute -top-10 -left-10 text-accent opacity-30 leaf-deco" >
                        <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor" > <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,11 17,8 17,8Z" /> </svg>
                      </div>

                      < p class="font-header italic text-primary tracking-widest mb-4" > The Wedding Of </p>
                      < h1 class="font-script text-6xl md:text-7xl mb-6 text-dark" > Nicola & Salsa </h1>

                      < div class="w-16 h-1 bg-accent mx-auto mb-8" > </div>

                      < div class="mb-10" >
                        <p class="text-[10px] mb-2 tracking-[0.2em] uppercase font-bold text-accent" > Dear Beloved Guest </p>
                        < h2 class="font-header text-xl text-dark" > TAMU UNDANGAN </h2>
                      </div>

                      < button onclick="openInvitation()" class="btn-rustic px-8 py-4 bg-primary text-cream font-header tracking-widest text-sm hover:bg-dark transition-all rounded-xl" >
                        <i class="fa-solid fa-heart mr-2" > </i> BUKA UNDANGAN
                      </button>
                    </div>
                  </div>

                  < !--MAIN CONTENT-- >
                  <main id="mainContent" class="hidden relative" >

                    <!--Home Section-- >
                    <section id="home" class="min-h-screen flex flex-col justify-center items-center text-center px-4 bg-rustic-pattern pt-20" >
                      <div data - aos="fade-up" class="relative" >
                      <p class="font-script text-4xl text-primary mb-2" > Save the Date </p>
                      < h2 class="font-header text-5xl md:text-7xl text-dark mb-10" >09.10.2025 </h2>

                      < div class="flex justify-center gap-4 mb-12" >
                        <div class="w-2 h-2 rounded-full bg-accent" > </div>
                        < div class="w-2 h-2 rounded-full bg-secondary" > </div>
                        < div class="w-2 h-2 rounded-full bg-accent" > </div>
                      </div>
                    </div>

                    < div class="max-w-4xl mx-auto px-6" >
                      <img src="mempelaicover.jpg" class="img-organic w-72 h-72 md:w-96 md:h-96 object-cover mx-auto mb-12 border-[12px] border-white shadow-xl" alt="Couple" data - aos="zoom-in" >
                      <p class="font-header text-2xl text-dark mb-4 italic" data - aos="fade-up" > "And so the adventure begins..." </p>
                  </div>

                  < !--Rustic Leaf Divider-- >
                  <div class="mt-16 text-accent opacity-20" data - aos="fade-up" >
                  <i class="fa-solid fa-leaf text-4xl" > </i>
                </div>
              </section>

              < !--Ayat Section-- >
              <section class="py-24 px-6 bg-accent/10 text-center" >
                <div class="max-w-2xl mx-auto" data - aos="fade-up" >
                <p class="font-sans text-lg text-dark/80 leading-relaxed italic mb-6" >
                  "Maka nikmat Tuhanmu yang manakah yang kamu dustakan?"
                </p>
                < p class="font-header text-primary font-bold tracking-widest" >— AR - RAHMAN —</p>
              </div>
            </section>

            < !--Couple Section-- >
            <section id="couple" class="py-24 bg-rustic-pattern" >
              <div class="container mx-auto px-6" >
                <div class="text-center mb-20" data - aos="fade-down" >
                <h2 class="font-script text-5xl text-primary" > Mempelai </h2>
                < p class="font-header text-dark/40 tracking-[0.3em] uppercase text-[10px] mt-2" > The Happy Couple </p>
              </div>

              < div class="flex flex-col md:flex-row justify-center items-center gap-16" >

                <!--Groom -->
                <div class="text-center group" data - aos="fade-right" >
                <div class="relative w-64 h-64 mx-auto mb-8 img-organic overflow-hidden" >
                  <img src="nicola.jpg" alt="Nicola" class="w-full h-full object-cover grayscale-[40%] hover:grayscale-0 transition duration-700" onerror="this.src='https://placehold.co/400x400?text=Groom'" >
                </div>
                < h3 class="font-header text-3xl text-dark mb-3" > Nicola Valentino </h3>
                < p class="text-xs text-accent font-bold uppercase tracking-widest mb-4" > Putra Dari: </p>
                < p class="text-sm text-dark/70 font-sans italic" > Bpk.Misno(Mendol) & Ibu Atik Fifiani </p>
                < div class="mt-6 flex justify-center gap-3" >
                  <a href="#" class="w-8 h-8 rounded-full bg-secondary/20 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition" > <i class="fa-brands fa-instagram" > </i></a >
                </div>
              </div>

              < !--Decorative & -->
              <div class="font-script text-6xl text-accent opacity-30" data - aos="zoom-in" >& </div>

            < !--Bride -->
            <div class="text-center group" data - aos="fade-left" >
            <div class="relative w-64 h-64 mx-auto mb-8 img-organic overflow-hidden" >
              <img src="salsa.jpg" alt="Salsa" class="w-full h-full object-cover grayscale-[40%] hover:grayscale-0 transition duration-700" onerror="this.src='https://placehold.co/400x400?text=Bride'" >
            </div>
            < h3 class="font-header text-3xl text-dark mb-3" > Salsabillah Ekanaiya </h3>
            < p class="text-xs text-accent font-bold uppercase tracking-widest mb-4" > Putri Dari: </p>
            < p class="text-sm text-dark/70 font-sans italic" > Bpk.M.Rofiek Aribowo & Ibu Sri Kurniawati </p>
            < div class="mt-6 flex justify-center gap-3" >
              <a href="#" class="w-8 h-8 rounded-full bg-secondary/20 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition" > <i class="fa-brands fa-instagram" > </i></a >
            </div>
          </div>

        </div>
      </div>
    </section>

    < !--Event Section-- >
    <section id="event" class="py-24 bg-dark text-cream relative overflow-hidden" >
      <!--Background texture-- >
      <div class="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]" > </div>

      < div class="container mx-auto px-6 relative z-10" >
        <div class="max-w-3xl mx-auto bg-paper text-dark p-10 md:p-16 rounded-[40px] shadow-2xl border-b-[10px] border-primary" data - aos="flip-left" >
        <div class="text-center mb-12" >
          <i class="fa-solid fa-calendar-heart text-5xl text-primary mb-6" > </i>
          < h2 class="font-header text-4xl mb-2" > RESEPSI PERNIKAHAN </h2>
          < div class="w-20 h-1 bg-accent mx-auto" > </div>
        </div>

        < div class="grid md:grid-cols-2 gap-10 text-center md:text-left items-center" >
          <div class="space-y-6" >
            <div class="flex items-center gap-4 justify-center md:justify-start" >
              <div class="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent" > <i class="fa-solid fa-calendar" > </i></div >
              <div>
                <p class="text-[10px] uppercase tracking-widest font-bold text-accent" > Hari / Tanggal </p>
                < p class="font-header text-lg" > Kamis, 09 Oktober 2025 </p>
              </div>
            </div>
            < div class="flex items-center gap-4 justify-center md:justify-start" >
              <div class="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent" > <i class="fa-solid fa-clock" > </i></div >
              <div>
                <p class="text-[10px] uppercase tracking-widest font-bold text-accent" > Waktu </p>
                < p class="font-header text-lg" > 10.00 WIB - Selesai </p>
              </div>
            </div>
            < div class="flex items-center gap-4 justify-center md:justify-start" >
              <div class="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent" > <i class="fa-solid fa-location-dot" > </i></div >
              <div>
                <p class="text-[10px] uppercase tracking-widest font-bold text-accent" > Alamat </p>
                < p class="font-header text-sm" > Bocek Karangploso(Toko Pak Mendol) </p>
              </div>
            </div>
          </div>

          < div class="text-center" >
            <a href="https://maps.google.com" target="_blank" class="btn-rustic inline-block px-10 py-5 bg-accent text-white rounded-2xl font-header tracking-widest text-xs hover:bg-dark transition" >
              <i class="fa-solid fa-map-location-dot mr-2" > </i> BUKA GOOGLE MAPS
            </a>
          </div>
        </div>
      </div>

      < !--Countdown -->
      <div id="countdown" class="flex flex-wrap justify-center gap-4 mt-20" data - aos="fade-up" >
      <!--JS dynamic content-- >
    </div>
  </div>
                                                                                                                                                                                                          </section >

                                                                                                                                                                                                          < !--Gallery Section-- >
                                                                                                                                                                                                            <section id="gallery" class="py-24 bg-rustic-pattern" >
                                                                                                                                                                                                              <div class="container mx-auto px-6" >
                                                                                                                                                                                                                <div class="text-center mb-16" >
                                                                                                                                                                                                                  <h2 class="font-script text-5xl text-primary mb-2" > Moments </h2>
                                                                                                                                                                                                                    < p class="font-header text-dark/40 tracking-[0.3em] uppercase text-[10px]" > Captured Love </p>
                                                                                                                                                                                                                      </div>

                                                                                                                                                                                                                      < div class="grid grid-cols-2 md:grid-cols-3 gap-6" >
                                                                                                                                                                                                                        <div class="space-y-6" >
                                                                                                                                                                                                                          <img src="prewedding1.jpg" class="w-full rounded-2xl shadow-lg border-4 border-white cursor-pointer hover:rotate-2 transition" data - aos="fade-up" onclick = "openModal('prewedding1.jpg')" >
                                                                                                                                                                                                                            <img src="prewedding2.jpg" class="w-full rounded-2xl shadow-lg border-4 border-white cursor-pointer hover:-rotate-2 transition" data - aos="fade-up" data - aos - delay="100" onclick = "openModal('prewedding2.jpg')" >
                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                              < div class="space-y-6 pt-12" >
                                                                                                                                                                                                                                <img src="prewedding3.jpg" class="w-full rounded-2xl shadow-lg border-4 border-white cursor-pointer hover:scale-105 transition" data - aos="fade-up" data - aos - delay="200" onclick = "openModal('prewedding3.jpg')" >
                                                                                                                                                                                                                                  <img src="mempelaicover.jpg" class="w-full rounded-2xl shadow-lg border-4 border-white cursor-pointer hover:rotate-1 transition" data - aos="fade-up" data - aos - delay="300" onclick = "openModal('mempelaicover.jpg')" >
                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                    < div class="hidden md:block space-y-6" >
                                                                                                                                                                                                                                      <img src="prewedding4.jpg" class="w-full rounded-2xl shadow-lg border-4 border-white cursor-pointer hover:-rotate-1 transition" data - aos="fade-up" data - aos - delay="400" onclick = "openModal('prewedding4.jpg')" >
                                                                                                                                                                                                                                        <img src="salsa.jpg" class="w-full rounded-2xl shadow-lg border-4 border-white cursor-pointer hover:rotate-3 transition" data - aos="fade-up" data - aos - delay="500" onclick = "openModal('salsa.jpg')" >
                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                          </section>

                                                                                                                                                                                                                                          < !--Gift Section-- >
  <section id="gift" class="py-24 bg-paper text-center" >
    <div class="container mx-auto px-6 max-w-2xl" >
      <h2 class="font-script text-5xl text-primary mb-6" > Wedding Gift </h2>
      < p class="text-sm text-dark/70 italic mb-12 font-sans" > "Your presence is enough, but if you wish to give, we are truly grateful." </p>

      < div class="bg-white p-10 rounded-[40px] shadow-xl border-2 border-dashed border-secondary/40 relative overflow-hidden" data - aos="zoom-in" >
      <div class="absolute top-4 right-4 text-accent/10" > <i class="fa-solid fa-gift text-8xl" > </i></div >
      <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg" class="h-6 mx-auto mb-8 grayscale opacity-70" alt="BCA" >
        <p class="font-header text-3xl font-bold tracking-widest text-dark mb-2" > 8163069596 </p>
        < p class="text-xs uppercase tracking-widest text-accent font-bold mb-10" > A.n Nicola Valentino </p>

        < button onclick="copyToClipboard()" class="btn-rustic px-10 py-4 bg-primary text-white rounded-xl text-xs font-header tracking-widest" >
          SALIN NO.REKENING
        </button>
    </div>
  </div>
                                                                                                                                                                                                                                                                  </section >

                                                                                                                                                                                                                                                                  < !--RSVP / Guestbook-- >
  <section id="rsvp" class="py-24 bg-rustic-pattern pb-48" >
    <div class="container mx-auto px-6 max-w-xl" >
      <div class="text-center mb-12" >
        <h2 class="font-script text-5xl text-primary mb-2" > Wish Us Well </h2>
        < p class="text-xs text-dark/50 uppercase tracking-widest" > Send your prayers </p>
      </div>

      < div class="bg-white/80 backdrop-blur p-8 rounded-[40px] shadow-lg border border-secondary/20" data - aos="fade-up" >
      <textarea id="guestMsg" rows="4" class="w-full bg-paper/50 border-2 border-secondary/20 rounded-2xl p-6 focus:outline-none focus:border-accent transition-all font-sans text-dark placeholder:italic" placeholder="Tuliskan ucapan & doa restu Anda..." > </textarea>

      < button onclick="sendToWA()" class="btn-rustic w-full mt-6 bg-accent text-white py-5 rounded-2xl font-header tracking-widest text-sm uppercase" >
        Kirim Ucapan < i class="fa-solid fa-paper-plane ml-2" > </i>
      </button>
    </div>
  </div>
                                                                                                                                                                                                                                                                                    </section >

                                                                                                                                                                                                                                                                                    < !--Footer -->
                                                                                                                                                                                                                                                                                      <footer class="py-20 bg-dark text-cream text-center border-t-8 border-primary" >
                                                                                                                                                                                                                                                                                        <div class="mb-10 text-accent opacity-30" >
                                                                                                                                                                                                                                                                                          <i class="fa-solid fa-leaf text-4xl mx-2" > </i>
                                                                                                                                                                                                                                                                                            < i class="fa-solid fa-heart text-2xl mx-2" > </i>
                                                                                                                                                                                                                                                                                              < i class="fa-solid fa-leaf text-4xl mx-2" > </i>
                                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                                < h2 class="font-script text-5xl mb-4" > Nicola & Salsa </h2>
                                                                                                                                                                                                                                                                                                  < p class="font-header text-[10px] tracking-[0.5em] uppercase opacity-40" >09 Oktober 2025 • Malang </p>
                                                                                                                                                                                                                                                                                                    </footer>

                                                                                                                                                                                                                                                                                                    < !--Mobile Nav-- >
  <nav id="navbar" class="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur shadow-2xl rounded-full px-8 py-4 flex gap-8 z-40 border border-secondary/20 transition-all duration-700 translate-y-32 opacity-0" >
    <a href="#home" class="text-secondary hover:text-primary transition" > <i class="fa-solid fa-house" > </i></a >
    <a href="#couple" class="text-secondary hover:text-primary transition" > <i class="fa-solid fa-user-group" > </i></a >
    <a href="#event" class="text-secondary hover:text-primary transition" > <i class="fa-solid fa-calendar-check" > </i></a >
    <a href="#gallery" class="text-secondary hover:text-primary transition" > <i class="fa-solid fa-images" > </i></a >
    <a href="#gift" class="text-secondary hover:text-primary transition" > <i class="fa-solid fa-gift" > </i></a >
  </nav>

                                                                                                                                                                                                                                                                                                                  </main >

                                                                                                                                                                                                                                                                                                                  < !--Notification Toast-- >
                                                                                                                                                                                                                                                                                                                    <div id="toast" class="fixed bottom-24 left-1/2 -translate-x-1/2 bg-primary text-cream px-6 py-3 rounded-full shadow-2xl z-[60] opacity-0 transition-all pointer-events-none text-xs font-bold tracking-widest uppercase" >
                                                                                                                                                                                                                                                                                                                      Berhasil disalin!
                                                                                                                                                                                                                                                                                                                        </div>

                                                                                                                                                                                                                                                                                                                        < !--Image Modal-- >
                                                                                                                                                                                                                                                                                                                          <div id="imgModal" class="modal fixed inset-0 bg-dark/95 flex items-center justify-center p-4" onclick = "closeModal()" >
                                                                                                                                                                                                                                                                                                                            <span class="absolute top-6 right-6 text-cream text-4xl cursor-pointer" >& times; </span>
                                                                                                                                                                                                                                                                                                                              < img id = "modalImage" src = "" class="max-h-[80vh] max-w-full rounded-2xl border-4 border-white shadow-2xl" alt = "Preview" >
                                                                                                                                                                                                                                                                                                                                </div>

                                                                                                                                                                                                                                                                                                                                < script src = "https://unpkg.com/aos@2.3.1/dist/aos.js" > </script>
                                                                                                                                                                                                                                                                                                                                  <script>
AOS.init({ once: true, duration: 800 });

const cover = document.getElementById('cover');
const mainContent = document.getElementById('mainContent');
const music = document.getElementById('bgMusic');
const musicControl = document.getElementById('musicControl');
const musicIcon = document.getElementById('musicIcon');
const navbar = document.getElementById('navbar');
let isPlaying = false;

function openInvitation() {
  toggleMusic(true);
  cover.classList.add('cover-slide-up');
  mainContent.classList.remove('hidden');

  setTimeout(() => {
    musicControl.classList.remove('hidden', 'opacity-0');
    navbar.classList.remove('translate-y-32', 'opacity-0');
    document.body.style.overflow = 'auto';
    AOS.refresh();
  }, 800);
}

function toggleMusic(forcePlay = false) {
  if (forcePlay || !isPlaying) {
    music.play();
    isPlaying = true;
    musicIcon.classList.add('fa-spin');
  } else {
    music.pause();
    isPlaying = false;
    musicIcon.classList.remove('fa-spin');
  }
}

// Countdown
const targetDate = new Date("2025-10-09T10:00:00").getTime();
function updateCountdown() {
  const now = new Date().getTime();
  const diff = targetDate - now;

  if (diff < 0) {
    document.getElementById("countdown").innerHTML = "<p class='font-header text-primary'>HARI BAHAGIA TELAH TIBA</p>";
    return;
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((diff % (1000 * 60)) / 1000);

  const box = (v, l) => `
          <div class="bg-white shadow-xl rounded-2xl p-4 w-20 text-center border-b-4 border-accent">
            <div class="text-2xl font-bold text-dark">${v}</div>
            <div class="text-[8px] uppercase font-bold text-accent tracking-tighter">${l}</div>
          </div>
        `;
  document.getElementById("countdown").innerHTML = box(d, 'Hari') + box(h, 'Jam') + box(m, 'Menit') + box(s, 'Detik');
}
setInterval(updateCountdown, 1000);
updateCountdown();

function copyToClipboard() {
  const el = document.createElement('textarea');
  el.value = '8163069596';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);

  const toast = document.getElementById('toast');
  toast.classList.add('opacity-100');
  setTimeout(() => toast.classList.remove('opacity-100'), 2000);
}

function sendToWA() {
  const msg = document.getElementById('guestMsg').value;
  if (!msg) return;
  window.location.href = `mailto:nikolavalentino8@gmail.com?subject=Ucapan Pernikahan&body=${encodeURIComponent(msg)}`;
}

function openModal(s) {
  document.getElementById('modalImage').src = s;
  document.getElementById('imgModal').classList.add('active');
}
function closeModal() {
  document.getElementById('imgModal').classList.remove('active');
}

document.body.style.overflow = 'hidden';
</script>
  </body >
  </html >
  `, //

  'pixel-art': `< !DOCTYPE html >
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
                                                            <img src="mempelaicover.jpg" class="w-64 h-64 md:w-80 md:h-80 object-cover border-4 border-dark shadow-none" alt = "Couple" >
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
                                                                                                                                                                                                              < div class="pixel-box p-1 hover:scale-105 transition-transform cursor-pointer" onclick = "openModal('mempelaicover.jpg')" data - aos="fade-up" data - aos - delay="400" >
                                                                                                                                                                                                                <img src="mempelaicover.jpg" class="w-full h-48 object-cover border-2 border-dark" alt = "G5" >
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

  dom.countdown.innerHTML = Object.entries(t).map(([key, val]) => `
        <div class="pixel-box-dark border-2 p-3 w-20 text-center">
            <div class="text-xl font-header text-white">${val}</div>
            <div class="text-[6px] font-header text-secondary mt-1 uppercase">${key}</div>
        </div>
      `).join('');
}
setInterval(updateCD, 1000);
updateCD();

// Utility: Copy to Clipboard
function copyToClipboard() {
  const text = "8163069596";
  const dummy = document.createElement('textarea');
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand('copy');
  document.body.removeChild(dummy);

  const toast = document.getElementById('toast');
  toast.classList.replace('opacity-0', 'opacity-100');
  setTimeout(() => {
    toast.classList.replace('opacity-100', 'opacity-0');
  }, 2000);
}

// Utility: Send Message
function sendToWA() {
  const m = document.getElementById('guestMsg').value;
  if (!m.trim()) return;
  window.location.href = `mailto:nikolavalentino8@gmail.com?subject=Wedding Message&body=${encodeURIComponent(m)}`;
}

// Utility: Modal
function openModal(s) {
  document.getElementById('modalImage').src = s;
  document.getElementById('imgModal').classList.add('active');
}
function closeModal() {
  document.getElementById('imgModal').classList.remove('active');
}

// Initial State
document.body.style.overflow = 'hidden';
</script>
  </body >
  < /html>`, / /

  'magic-love': `<!DOCTYPE html>
  <html lang="id" class="scroll-smooth">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Magic of Nicola & Salsa</title>
    
    <!-- Fonts: Mystical & Elegant -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Marcellus&family=Pinyon+Script&family=Lora:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- AOS Animation -->
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    
    <!-- Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              primary: '#7B66FF',    /* Magic Purple */
              secondary: '#FFD700',  /* Celestial Gold */
              dark: '#0B0B1E',       /* Midnight Void */
              accent: '#C084FC',     /* Pink Nebula */
              cream: '#FDFCF0',      /* Star Dust White */
            },
            fontFamily: {
              header: ['"Marcellus"', 'serif'],
              script: ['"Pinyon Script"', 'cursive'],
              body: ['"Lora"', 'serif'],
            }
          }
        }
      }
    </script>
  
    <style>
      /* Custom Scrollbar */
      ::-webkit-scrollbar { width: 5px; }
      ::-webkit-scrollbar-track { background: #0B0B1E; }
      ::-webkit-scrollbar-thumb { background: linear-gradient(#7B66FF, #C084FC); border-radius: 10px; }
      
      /* Cover Transition */
      .cover-slide-up {
        transform: translateY(-100%);
        transition: transform 1.2s cubic-bezier(0.7, 0, 0.3, 1);
      }
      
      /* Magic Star Background */
      .magic-bg {
        background: radial-gradient(circle at center, #1B1B3A 0%, #0B0B1E 100%);
        position: relative;
        overflow: hidden;
      }
      .magic-bg::before {
        content: "";
        position: absolute;
        top: 0; left: 0; width: 100%; height: 200%;
        background-image: 
          radial-gradient(1px 1px at 20px 30px, #eee, rgba(0,0,0,0)),
          radial-gradient(1px 1px at 150px 150px, #fff, rgba(0,0,0,0)),
          radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0,0,0,0));
        background-repeat: repeat;
        background-size: 300px 300px;
        opacity: 0.3;
        animation: starsMove 150s linear infinite;
      }
      @keyframes starsMove { from { transform: translateY(0); } to { transform: translateY(-50%); } }
  
      /* Arched Image Mask */
      .img-magic-arch {
        border-radius: 999px 999px 0 0;
        border: 2px solid rgba(255, 215, 0, 0.3);
        padding: 8px;
        box-shadow: 0 0 30px rgba(123, 102, 255, 0.2);
      }
  
      /* Glassmorphism */
      .glass-card {
        background: rgba(11, 11, 30, 0.6);
        backdrop-filter: blur(15px);
        border: 1px solid rgba(192, 132, 252, 0.2);
      }
  
      /* Floating Animation */
      @keyframes floating { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
      .float-magic { animation: floating 6s ease-in-out infinite; }
  
      /* Modal Overlay */
      #imgModal { opacity: 0; pointer-events: none; transition: opacity 0.4s ease; z-index: 1000; }
      #imgModal.active { opacity: 1; pointer-events: all; }
    </style>
  </head>
  <body class="bg-dark text-cream font-body overflow-hidden antialiased">
  
    <!-- AUDIO ASSET -->
    <audio id="bgMusic" loop>
      <source src="https://www.bensound.com/bensound-music/bensound-magic.mp3" type="audio/mpeg">
    </audio>
  
    <!-- FLOATING MUSIC CONTROL -->
    <div id="musicControl" class="fixed top-6 right-6 z-50 hidden opacity-0 transition-opacity duration-1000">
      <button onclick="toggleMusic()" class="w-12 h-12 glass-card rounded-full flex items-center justify-center text-secondary shadow-[0_0_20px_rgba(123,102,255,0.4)] transition-all active:scale-90">
        <i class="fa-solid fa-wand-magic-sparkles" id="musicIcon"></i>
      </button>
    </div>
  
    <!-- SECTION 1: COVER -->
    <div id="cover" class="fixed inset-0 z-[100] magic-bg flex flex-col justify-center items-center text-center p-6 before:content-[''] before:absolute before:inset-0 before:bg-dark/30">
      <div class="relative z-10 max-w-2xl" data-aos="zoom-in" data-aos-duration="2000">
        <div class="float-magic mb-8">
          <p class="font-header text-secondary tracking-[0.5em] text-sm uppercase mb-4">The Magic Union Of</p>
          <h1 class="font-script text-7xl md:text-9xl text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">Nicola & Salsa</h1>
        </div>
        
        <div class="mb-12">
          <p class="text-[10px] tracking-[0.4em] mb-4 uppercase opacity-60">Kepada Yth. Bapak/Ibu/Saudara/i</p>
          <div class="glass-card py-4 px-10 inline-block rounded-full border-secondary/20">
            <p class="font-header text-xl text-secondary">TAMU UNDANGAN</p>
          </div>
        </div>
  
        <button onclick="openInvitation()" class="group relative px-12 py-4 bg-gradient-to-r from-primary to-accent text-white font-header tracking-[0.3em] text-[10px] rounded-full shadow-[0_0_30px_rgba(123,102,255,0.5)] transition-all hover:scale-105 active:scale-95">
          <i class="fa-solid fa-moon mr-2"></i> BUKA UNDANGAN
        </button>
      </div>
    </div>
  
    <!-- MAIN SCROLLABLE WRAPPER -->
    <main id="mainContent" class="hidden opacity-0 transition-opacity duration-1000">
      
      <!-- SECTION 2: HOME -->
      <section id="home" class="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-32 pb-20 magic-bg">
        <div data-aos="fade-up" class="max-w-4xl">
          <p class="font-header text-secondary text-xs tracking-[0.5em] mb-12 uppercase">Written in the Stars</p>
          
          <div class="relative mb-16 px-4">
            <div class="absolute inset-0 bg-primary/20 blur-[100px] rounded-full"></div>
            <img src="mempelaicover.jpg" class="img-magic-arch w-72 h-96 md:w-80 md:h-[500px] object-cover mx-auto relative z-10" alt="Hero Image">
            <div class="absolute -top-6 -left-2 text-secondary text-3xl float-magic"><i class="fa-solid fa-sparkles"></i></div>
            <div class="absolute bottom-10 -right-2 text-accent text-2xl float-magic" style="animation-delay: 2s;"><i class="fa-solid fa-star"></i></div>
          </div>
  
          <div class="space-y-6">
            <h2 class="font-script text-6xl md:text-8xl text-white">Nicola & Salsa</h2>
            <div class="h-[1px] w-24 bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto"></div>
            <p class="font-header text-2xl text-secondary tracking-widest italic">09 . 10 . 2025</p>
          </div>
        </div>
      </section>
  
      <!-- SECTION 3: AYAT -->
      <section class="py-24 px-6 text-center border-y border-white/5 bg-dark/40">
        <div class="max-w-3xl mx-auto" data-aos="fade-up">
          <i class="fa-solid fa-wand-magic-sparkles text-3xl text-primary/40 mb-10"></i>
          <p class="font-body text-lg md:text-xl text-cream/80 leading-relaxed italic mb-8 font-light tracking-wide">
            "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
          </p>
          <p class="font-header text-secondary tracking-[0.3em] text-xs">— Q.S. AR-RUM : 21 —</p>
        </div>
      </section>
  
      <!-- SECTION 4: COUPLE -->
      <section id="couple" class="py-32 magic-bg">
        <div class="container mx-auto px-6">
          <div class="text-center mb-24" data-aos="fade-down">
            <h2 class="font-header text-4xl text-secondary tracking-widest">THE BELOVED</h2>
            <p class="text-[10px] text-accent font-bold uppercase tracking-[0.6em] mt-4">Witness of Magic</p>
          </div>
  
          <div class="flex flex-col md:flex-row justify-center items-center gap-20 max-w-6xl mx-auto">
            
            <!-- Groom -->
            <div class="text-center group" data-aos="fade-right">
              <div class="relative w-64 h-80 mx-auto mb-10 overflow-hidden img-magic-arch">
                <img src="nicola.jpg" class="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-1000" alt="Groom" onerror="this.src='https://placehold.co/400x500?text=Groom'">
              </div>
              <h3 class="font-header text-3xl text-white mb-2">Nicola Valentino</h3>
              <p class="text-[10px] text-secondary/60 mb-6 font-bold tracking-widest uppercase italic">The Guardian</p>
              <p class="font-body text-sm text-cream/60 leading-relaxed">
                Putra Bpk. Misno (Mendol) <br>& Ibu Atik Fifiani
              </p>
              <div class="mt-8 flex justify-center gap-4">
                <a href="#" class="w-10 h-10 glass-card rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-dark transition-all"><i class="fa-brands fa-instagram"></i></a>
              </div>
            </div>
  
            <!-- Divider -->
            <div class="hidden md:block text-secondary opacity-30 text-4xl" data-aos="zoom-in"><i class="fa-solid fa-heart"></i></div>
  
            <!-- Bride -->
            <div class="text-center group" data-aos="fade-left">
              <div class="relative w-64 h-80 mx-auto mb-10 overflow-hidden img-magic-arch">
                <img src="salsa.jpg" class="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-1000" alt="Bride" onerror="this.src='https://placehold.co/400x500?text=Bride'">
              </div>
              <h3 class="font-header text-3xl text-white mb-2">Salsabillah Ekanaiya</h3>
              <p class="text-[10px] text-accent/60 mb-6 font-bold tracking-widest uppercase italic">The Muse</p>
              <p class="font-body text-sm text-cream/60 leading-relaxed">
                Putri Bpk. M. Rofiek Aribowo <br>& Ibu Sri Kurniawati
              </p>
              <div class="mt-8 flex justify-center gap-4">
                <a href="#" class="w-10 h-10 glass-card rounded-full flex items-center justify-center text-accent hover:bg-accent hover:text-dark transition-all"><i class="fa-brands fa-instagram"></i></a>
              </div>
            </div>
  
          </div>
        </div>
      </section>
  
      <!-- SECTION 5: EVENT -->
      <section id="event" class="py-32 relative">
        <div class="container mx-auto px-6 relative z-10 text-center">
          <h2 class="font-header text-4xl text-secondary mb-20 tracking-widest" data-aos="fade-down">SACRED CEREMONY</h2>
          
          <div class="max-w-xl mx-auto glass-card p-12 rounded-[40px] shadow-2xl relative overflow-hidden" data-aos="flip-up">
            <div class="absolute inset-0 bg-primary/5 -z-10"></div>
            
            <div class="mb-12">
              <i class="fa-solid fa-star-and-crescent text-4xl text-secondary/40 mb-6"></i>
              <h3 class="font-header text-3xl font-bold text-white tracking-[0.2em]">RESEPSI</h3>
              <p class="text-[10px] tracking-[0.5em] text-accent uppercase font-bold mt-2">The Magic Celebration</p>
            </div>
            
            <div class="space-y-8 border-y border-white/10 py-10 mb-10">
              <div class="flex flex-col items-center gap-2">
                <p class="text-[10px] tracking-[0.3em] text-secondary uppercase">Day & Date</p>
                <p class="font-header text-xl">Kamis, 09 Oktober 2025</p>
              </div>
              <div class="flex flex-col items-center gap-2">
                <p class="text-[10px] tracking-[0.3em] text-secondary uppercase">Time</p>
                <p class="font-header text-xl">10.00 WIB - SELESAI</p>
              </div>
              <div class="flex flex-col items-center gap-2">
                <p class="text-[10px] tracking-[0.3em] text-secondary uppercase">Location</p>
                <p class="font-sans text-sm tracking-widest leading-loose uppercase opacity-80">
                  Bocek Karangploso<br>(Toko Pak Mendol)
                </p>
              </div>
            </div>
            
            <a href="https://maps.google.com" target="_blank" class="inline-block px-10 py-4 bg-primary/20 border border-primary text-cream rounded-full text-[10px] font-header tracking-widest hover:bg-primary transition-all duration-500">
              NAVIGATE THE STARS <i class="fa-solid fa-location-arrow ml-2"></i>
            </a>
          </div>
  
          <!-- Countdown -->
          <div id="countdown" class="mt-24 flex flex-wrap justify-center gap-6" data-aos="fade-up">
            <!-- JS fills this -->
          </div>
        </div>
      </section>
  
      <!-- SECTION 6: GALLERY -->
      <section id="gallery" class="py-32 magic-bg">
        <div class="container mx-auto px-4 text-center">
          <h2 class="font-header text-4xl text-secondary mb-16 tracking-widest" data-aos="fade-up">ENCHANTED MEMORIES</h2>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
              <div class="space-y-4 md:space-y-6">
                  <div class="group overflow-hidden rounded-3xl border border-white/10 p-2 glass-card cursor-pointer" onclick="openModal('prewedding1.jpg')" data-aos="fade-up">
                      <img src="prewedding1.jpg" class="w-full h-auto grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110" alt="G1">
                  </div>
                  <div class="group overflow-hidden rounded-3xl border border-white/10 p-2 glass-card cursor-pointer" onclick="openModal('prewedding2.jpg')" data-aos="fade-up" data-aos-delay="100">
                      <img src="prewedding2.jpg" class="w-full h-auto grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110" alt="G2">
                  </div>
              </div>
              <div class="space-y-4 md:space-y-6 md:pt-16">
                  <div class="group overflow-hidden rounded-3xl border border-white/10 p-2 glass-card cursor-pointer" onclick="openModal('prewedding3.jpg')" data-aos="fade-up" data-aos-delay="200">
                      <img src="prewedding3.jpg" class="w-full h-auto grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110" alt="G3">
                  </div>
              </div>
              <div class="space-y-4 md:space-y-6">
                  <div class="group overflow-hidden rounded-3xl border border-white/10 p-2 glass-card cursor-pointer" onclick="openModal('prewedding4.jpg')" data-aos="fade-up" data-aos-delay="300">
                      <img src="prewedding4.jpg" class="w-full h-auto grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110" alt="G4">
                  </div>
                  <div class="group overflow-hidden rounded-3xl border border-white/10 p-2 glass-card cursor-pointer" onclick="openModal('mempelaicover.jpg')" data-aos="fade-up" data-aos-delay="400">
                      <img src="mempelaicover.jpg" class="w-full h-auto grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110" alt="G5">
                  </div>
              </div>
              <div class="space-y-4 md:space-y-6 md:pt-16">
                  <div class="group overflow-hidden rounded-3xl border border-white/10 p-2 glass-card cursor-pointer" onclick="openModal('salsa.jpg')" data-aos="fade-up" data-aos-delay="500">
                      <img src="salsa.jpg" class="w-full h-auto grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110" alt="G6">
                  </div>
              </div>
          </div>
        </div>
      </section>
  
      <!-- SECTION 7: GIFT -->
      <section id="gift" class="py-32 bg-dark/40 border-y border-white/5">
        <div class="container mx-auto px-6 text-center max-w-4xl">
          <h2 class="font-header text-4xl text-secondary mb-10 tracking-widest" data-aos="fade-down">A TOKEN OF MAGIC</h2>
          <p class="text-cream/70 font-body mb-16 italic font-light leading-relaxed max-w-2xl mx-auto" data-aos="fade-up">
            Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika memberi adalah ungkapan tanda kasih Anda, kami ucapkan terima kasih.
          </p>
          
          <div class="max-w-md mx-auto glass-card p-12 rounded-[50px] shadow-2xl relative overflow-hidden group" data-aos="zoom-in">
            <div class="absolute -top-10 -right-10 w-40 h-40 bg-accent/10 blur-3xl rounded-full"></div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg" class="h-6 mx-auto mb-10 brightness-200 grayscale opacity-60" alt="BCA">
            
            <div class="mb-12">
              <p class="font-header text-4xl font-black text-white tracking-[0.2em] mb-4" id="rekNum">8163069596</p>
              <p class="text-[10px] tracking-[0.5em] text-secondary uppercase font-bold">a.n Nicola Valentino</p>
            </div>
            
            <button onclick="copyToClipboard()" class="w-full py-4 bg-gradient-to-r from-primary to-accent text-white font-header text-[10px] tracking-[0.4em] rounded-full hover:shadow-[0_0_20px_rgba(123,102,255,0.4)] transition-all">
              CAST COPY SPELL <i class="fa-regular fa-copy ml-2"></i>
            </button>
          </div>
        </div>
      </section>
  
      <!-- SECTION 8: RSVP -->
      <section id="rsvp" class="py-32 magic-bg pb-48">
        <div class="container mx-auto px-6 max-w-2xl">
          <div class="text-center mb-16">
            <h2 class="font-header text-4xl text-secondary tracking-widest" data-aos="fade-down">WHISPER WISHES</h2>
            <p class="text-[10px] tracking-[0.5em] text-cream/30 uppercase mt-4" data-aos="fade-down" data-aos-delay="200">Send your prayers</p>
          </div>
          
          <div class="glass-card p-10 rounded-[40px]" data-aos="fade-up">
            <textarea id="guestMsg" rows="6" class="w-full bg-dark/40 border-b border-secondary/30 p-4 focus:outline-none focus:border-secondary transition-all font-body text-cream/80 text-sm font-light italic resize-none placeholder:opacity-20" placeholder="Whisper your magic prayers here..."></textarea>
            
            <button onclick="sendToWA()" class="w-full mt-10 py-5 bg-gradient-to-r from-primary to-accent text-white font-header text-xs tracking-[0.5em] rounded-full transition-all transform active:scale-95">
              SEND MAGIC <i class="fa-solid fa-paper-plane ml-2"></i>
            </button>
          </div>
        </div>
      </section>
  
      <!-- SECTION 9: FOOTER -->
      <footer class="py-24 bg-black text-center border-t border-white/10">
        <h2 class="font-script text-6xl text-white mb-6">Nicola & Salsa</h2>
        <p class="font-header text-[10px] tracking-[0.7em] text-secondary opacity-50 uppercase mb-12">October 9, 2025 • Karangploso</p>
        
        <div class="flex justify-center items-center gap-6 opacity-20 mb-12">
          <div class="h-[1px] w-12 bg-secondary"></div>
          <i class="fa-solid fa-sparkles text-xs text-secondary"></i>
          <div class="h-[1px] w-12 bg-secondary"></div>
        </div>
  
        <div class="text-[8px] tracking-[0.3em] text-cream/20 font-sans uppercase">
          Designed for Excellence & Ethereal Eternity
        </div>
      </footer>
  
      <!-- NAVIGATION TAB BAR -->
      <nav id="navbar" class="fixed bottom-8 left-1/2 -translate-x-1/2 z-[55] glass-card px-8 py-4 rounded-full shadow-2xl flex gap-10 transition-all duration-1000 translate-y-32 opacity-0">
        <a href="#home" class="text-cream/30 hover:text-secondary text-lg active:scale-90"><i class="fa-solid fa-moon"></i></a>
        <a href="#couple" class="text-cream/30 hover:text-secondary text-lg active:scale-90"><i class="fa-solid fa-wand-magic-sparkles"></i></a>
        <a href="#event" class="text-cream/30 hover:text-secondary text-lg active:scale-90"><i class="fa-solid fa-star-and-crescent"></i></a>
        <a href="#gallery" class="text-cream/30 hover:text-secondary text-lg active:scale-90"><i class="fa-solid fa-gem"></i></a>
        <a href="#gift" class="text-cream/30 hover:text-secondary text-lg active:scale-90"><i class="fa-solid fa-gift"></i></a>
      </nav>
  
    </main>
  
    <!-- UTILITIES: TOAST & MODAL -->
    <div id="toast" class="fixed top-12 left-1/2 -translate-x-1/2 z-[1000] glass-card border-primary/50 text-secondary px-8 py-3 rounded-full opacity-0 transition-all pointer-events-none translate-y-[-20px] shadow-2xl">
      <span class="font-header text-[10px] tracking-[0.2em] uppercase">Spell Copied Successfully</span>
    </div>
  
    <div id="imgModal" class="fixed inset-0 bg-black/95 flex items-center justify-center p-6" onclick="closeModal()">
      <button class="absolute top-10 right-10 text-secondary text-4xl">&times;</button>
      <img id="modalImage" src="" class="max-h-[85vh] max-w-full rounded-3xl border border-white/20 p-1" alt="Preview">
    </div>
  
    <!-- SCRIPTS -->
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script>
      AOS.init({ once: true, duration: 1200 });
  
      const dom = {
        cover: document.getElementById('cover'),
        main: document.getElementById('mainContent'),
        music: document.getElementById('bgMusic'),
        musicCtrl: document.getElementById('musicControl'),
        musicIcon: document.getElementById('musicIcon'),
        nav: document.getElementById('navbar'),
        countdown: document.getElementById('countdown'),
        toast: document.getElementById('toast'),
        modal: document.getElementById('imgModal'),
        modalImg: document.getElementById('modalImage')
      };
  
      let isPlaying = false;
      let musicPromise = null;
  
      // FIX: Async Open Invitation to prevent UI hang
      function openInvitation() {
        // 1. Transition UI immediately
        dom.cover.classList.add('cover-slide-up');
        dom.main.classList.remove('hidden');
        
        setTimeout(() => {
          dom.main.classList.add('opacity-100');
          dom.musicCtrl.classList.remove('hidden', 'opacity-0');
          dom.nav.classList.remove('translate-y-32', 'opacity-0');
          document.body.style.overflow = 'auto';
          AOS.refresh();
        }, 500);
  
        // 2. Try playing music in background
        toggleMusic(true);
      }
  
      // FIX: AbortError on play()
      async function toggleMusic(forcePlay = false) {
        if (forcePlay || !isPlaying) {
          try {
            musicPromise = dom.music.play();
            if (musicPromise !== undefined) {
              await musicPromise;
              isPlaying = true;
              dom.musicIcon.classList.add('fa-spin');
              dom.musicIcon.classList.replace('fa-play', 'fa-wand-magic-sparkles');
            }
          } catch (err) {
            console.warn("Autoplay block / playback error");
            isPlaying = false;
          }
        } else {
          if (musicPromise !== null) {
            await musicPromise;
          }
          dom.music.pause();
          isPlaying = false;
          dom.musicIcon.classList.remove('fa-spin');
          dom.musicIcon.classList.replace('fa-wand-magic-sparkles', 'fa-play');
        }
      }
  
      // Countdown Logic
      const weddingDate = new Date("2025-10-09T10:00:00").getTime();
      function updateCountdown() {
        const now = new Date().getTime();
        const diff = weddingDate - now;
  
        if (diff < 0) {
          dom.countdown.innerHTML = `< div class='font-header text-secondary tracking-widest uppercase' > The Magic Moment is Here </div > `;
return;
        }

const t = {
  days: Math.floor(diff / 86400000),
  hrs: Math.floor((diff % 86400000) / 3600000),
  min: Math.floor((diff % 3600000) / 60000),
  sec: Math.floor((diff % 60000) / 1000)
};

dom.countdown.innerHTML = Object.entries(t).map(([key, val]) => `
  < div class="glass-card rounded-[20px] p-5 w-24 border-primary/20 shadow-xl" >
            <div class="text-3xl font-black font-header text-white mb-1">${val}</div>
            <div class="text-[8px] uppercase tracking-[0.2em] text-secondary font-bold">${key}</div>
          </div >
  `).join('');
      }
setInterval(updateCountdown, 1000);
updateCountdown();

// Copy Account
function copyToClipboard() {
  const el = document.createElement('textarea');
  el.value = '8163069596';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);

  dom.toast.classList.replace('opacity-0', 'opacity-100');
  dom.toast.classList.replace('translate-y-[-20px]', 'translate-y-0');
  setTimeout(() => {
    dom.toast.classList.replace('opacity-100', 'opacity-0');
    dom.toast.classList.replace('translate-y-0', 'translate-y-[-20px]');
  }, 3000);
}

// Gallery Modal
function openModal(src) {
  dom.modalImg.src = src;
  dom.modal.classList.add('active');
}
function closeModal() {
  dom.modal.classList.remove('active');
}

// RSVP / Wishes Logic
function sendToWA() {
  const msg = document.getElementById("guestMsg").value;
  if (!msg.trim()) return;
  window.location.href = `mailto:nikolavalentino8 @gmail.com?subject = Magic Wishes & body=${ encodeURIComponent(msg) } `;
}

document.body.style.overflow = 'hidden';
</script>
  </body>
  </html>
    `, //

  'cartoon-cars': `< !DOCTYPE html >
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
                                                          <img src="mempelaicover.jpg" class="w-72 h-72 md:w-96 md:h-96 object-cover border-4 border-dark" alt = "Couple" >
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
  dom.countdown.innerHTML = Object.entries(t).map(([k, v]) => `
    < div class="bg-white border-4 border-dark p-4 w-24 rounded-lg transform hover:scale-110 transition" >
          <div class="text-3xl font-header text-primary">${v}</div>
          <div class="text-[8px] font-racing text-dark uppercase">${k}</div>
        </div >
  `).join('');
}
setInterval(updateCountdown, 1000);
updateCountdown();

function copyToClipboard() {
  const el = document.createElement('textarea'); el.value = '8163069596'; document.body.appendChild(el); el.select(); document.execCommand('copy'); document.body.removeChild(el);
  const toast = document.getElementById('toast'); toast.classList.add('opacity-100'); setTimeout(() => toast.classList.remove('opacity-100'), 2000);
}

function openModal(src) { document.getElementById('modalImage').src = src; document.getElementById('imgModal').classList.add('active'); }
function sendToWA() { const msg = document.getElementById("guestMsg").value; window.location.href = `mailto:nikola @example.com?body = ${ encodeURIComponent(msg) } `; }
document.body.style.overflow = 'hidden';
</script>
  </body>
  </html>
    `, //

  'cartoon-spongebob': `< !DOCTYPE html >
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
                                            <img src="mempelaicover.jpg" class="w-72 h-72 md:w-96 md:h-96 object-cover rounded-[40px]" >
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
  dom.countdown.innerHTML = Object.entries(t).map(([k, v]) => `
    < div class="bg-white border-4 border-dark p-4 w-24 rounded-[30px] transform hover:scale-110 transition shadow-lg" >
            <div class="text-3xl font-header text-secondary">${v}</div>
            <div class="text-[8px] font-bubble text-dark uppercase">${k}</div>
          </div >
  `).join('');
}
setInterval(updateCountdown, 1000);
updateCountdown();

function copyToClipboard() {
  const el = document.createElement('textarea'); el.value = '8163069596'; document.body.appendChild(el); el.select(); document.execCommand('copy'); document.body.removeChild(el);
  const toast = document.getElementById('toast'); toast.classList.add('opacity-100'); setTimeout(() => toast.classList.remove('opacity-100'), 2000);
}

function openModal(src) { document.getElementById('modalImage').src = src; document.getElementById('imgModal').classList.add('active'); }
function sendToWA() { const msg = document.getElementById("guestMsg").value; window.location.href = `mailto:nikola @example.com?body = ${ encodeURIComponent(msg) } `; }
document.body.style.overflow = 'hidden';
</script>
  </body>
  </html>
    `, //

  'cartoon-avatar': `< !DOCTYPE html >
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
                                                <img src="mempelaicover.jpg" class="w-72 h-72 md:w-96 md:h-96 object-cover grayscale-[30%] border-2 border-secondary" >
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
  dom.countdown.innerHTML = Object.entries(t).map(([k, v]) => `
    < div class="bg-white/10 border-2 border-accent p-5 w-24 rounded-sm transform hover:scale-110 transition shadow-2xl" >
          <div class="text-3xl font-header text-accent">${v}</div>
          <div class="text-[8px] font-header text-white uppercase">${k}</div>
        </div >
  `).join('');
}
setInterval(updateCountdown, 1000);
updateCountdown();

function copyToClipboard() {
  const el = document.createElement('textarea'); el.value = '8163069596'; document.body.appendChild(el); el.select(); document.execCommand('copy'); document.body.removeChild(el);
  const toast = document.getElementById('toast'); toast.classList.add('opacity-100'); setTimeout(() => toast.classList.remove('opacity-100'), 2000);
}

function openModal(src) { document.getElementById('modalImage').src = src; document.getElementById('imgModal').classList.add('active'); }
function sendToWA() { const msg = document.getElementById("guestMsg").value; window.location.href = `mailto:nikola @example.com?body = ${ encodeURIComponent(msg) } `; }
document.body.style.overflow = 'hidden';
</script>
  </body>
  </html>
    `, // 

  'streaming-netflix': `< !DOCTYPE html >
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
              <img src="mempelaicover.jpg" class= "w-full h-full object-cover" alt = "Featured" >
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
  dom.countdown.innerHTML = Object.entries(t).map(([k, v]) => `
    < div class="bg-cream border-b-2 border-primary p-4 w-20 rounded shadow-lg" >
            <div class="text-3xl font-header text-white">${v}</div>
            <div class="text-[10px] font-bold text-secondary">${k}</div>
          </div >
  `).join('');
}
setInterval(updateCountdown, 1000);
updateCountdown();

function copyToClipboard() {
  const el = document.createElement('textarea'); el.value = '8163069596'; document.body.appendChild(el); el.select(); document.execCommand('copy'); document.body.removeChild(el);
  const toast = document.getElementById('toast'); toast.classList.add('opacity-100'); setTimeout(() => toast.classList.remove('opacity-100'), 2000);
}
function openModal(src) { document.getElementById('modalImage').src = src; document.getElementById('imgModal').classList.add('active'); }
function sendToWA() { const msg = document.getElementById("guestMsg").value; window.location.href = `mailto:nikola @example.com?body = ${ encodeURIComponent(msg) } `; }
document.body.style.overflow = 'hidden';
</script>
  </body>
  </html>
    `, // <-- Pastikan ditutup dengan backtick

  'streaming-cinema': `< !DOCTYPE html >
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
                                                    <img src="mempelaicover.jpg" class="w-full h-full object-cover grayscale" >
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
  dom.countdown.innerHTML = Object.entries(t).map(([k, v]) => `
    < div class="bg-primary border border-secondary p-4 w-20 shadow-xl" >
            <div class="text-3xl font-header text-secondary">${v}</div>
            <div class="text-[10px] font-bold text-white opacity-60">${k}</div>
          </div >
  `).join('');
}
setInterval(updateCountdown, 1000);
updateCountdown();

function copyToClipboard() {
  const el = document.createElement('textarea'); el.value = '8163069596'; document.body.appendChild(el); el.select(); document.execCommand('copy'); document.body.removeChild(el);
  const toast = document.getElementById('toast'); toast.classList.add('opacity-100'); setTimeout(() => toast.classList.remove('opacity-100'), 2000);
}
function openModal(src) { document.getElementById('modalImage').src = src; document.getElementById('imgModal').classList.add('active'); }
function sendToWA() { const msg = document.getElementById("guestMsg").value; window.location.href = `mailto:nikola @example.com?body = ${ encodeURIComponent(msg) } `; }
document.body.style.overflow = 'hidden';
</script>
  </body>
  </html>
    `, // <-- Pastikan ditutup dengan backtick

  'tradition-javanese': `< !DOCTYPE html >
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
                                                <img src="mempelaicover.jpg" class="img-gunungan w-72 h-96 md:w-80 md:h-[500px] object-cover mx-auto shadow-2xl" >
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
  dom.countdown.innerHTML = Object.entries(t).map(([k, v]) => `
    < div class="bg-primary border-2 border-secondary p-4 w-24 rounded-lg transform hover:scale-110 transition shadow-lg" >
            <div class="text-3xl font-header text-secondary">${v}</div>
            <div class="text-[8px] font-header text-white uppercase opacity-60">${k}</div>
          </div >
  `).join('');
}
setInterval(updateCountdown, 1000);
updateCountdown();

function copyToClipboard() {
  const el = document.createElement('textarea'); el.value = '8163069596'; document.body.appendChild(el); el.select(); document.execCommand('copy'); document.body.removeChild(el);
  const toast = document.getElementById('toast'); toast.classList.add('opacity-100'); setTimeout(() => toast.classList.remove('opacity-100'), 2000);
}
function openModal(src) { document.getElementById('modalImage').src = src; document.getElementById('imgModal').classList.add('active'); }
function sendToWA() { const msg = document.getElementById("guestMsg").value; window.location.href = `mailto:nikola @example.com?body = ${ encodeURIComponent(msg) } `; }
document.body.style.overflow = 'hidden';
</script>
  </body>
  </html>
    `, // <-- Pastikan ditutup dengan backtick

  'tradition-minang': `< !DOCTYPE html >
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
                                              <img src="mempelaicover.jpg" class="w-72 h-96 md:w-80 md:h-[500px] object-cover mx-auto shadow-2xl gadang-corner" >
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
  dom.countdown.innerHTML = Object.entries(t).map(([k, v]) => `
    < div class="bg-primary border-2 border-secondary p-4 w-24 gadang-corner transform hover:scale-110 transition shadow-lg" >
            <div class="text-3xl font-header text-accent">${v}</div>
            <div class="text-[8px] font-header text-white uppercase opacity-60">${k}</div>
          </div >
  `).join('');
}
setInterval(updateCountdown, 1000);
updateCountdown();

function copyToClipboard() {
  const el = document.createElement('textarea'); el.value = '8163069596'; document.body.appendChild(el); el.select(); document.execCommand('copy'); document.body.removeChild(el);
  const toast = document.getElementById('toast'); toast.classList.add('opacity-100'); setTimeout(() => toast.classList.remove('opacity-100'), 2000);
}
function openModal(src) { document.getElementById('modalImage').src = src; document.getElementById('imgModal').classList.add('active'); }
function sendToWA() { const msg = document.getElementById("guestMsg").value; window.location.href = `mailto:nikola @example.com?body = ${ encodeURIComponent(msg) } `; }
document.body.style.overflow = 'hidden';
</script>
  </body>
  </html>
    `, // <-- Pastikan ditutup dengan backtick

  'tradition-balinese': `< !DOCTYPE html >
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
                                                  <img src="mempelaicover.jpg" class="w-72 h-96 md:w-80 md:h-[500px] object-cover mx-auto shadow-2xl bali-gate-mask" >
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
  dom.countdown.innerHTML = Object.entries(t).map(([k, v]) => `
    < div class="bg-primary border-2 border-secondary p-4 w-24 rounded-lg transform hover:scale-110 transition shadow-lg" >
            <div class="text-3xl font-header text-secondary">${v}</div>
            <div class="text-[8px] font-header text-white uppercase opacity-60">${k}</div>
          </div >
  `).join('');
}
setInterval(updateCountdown, 1000);
updateCountdown();

function copyToClipboard() {
  const el = document.createElement('textarea'); el.value = '8163069596'; document.body.appendChild(el); el.select(); document.execCommand('copy'); document.body.removeChild(el);
  const toast = document.getElementById('toast'); toast.classList.add('opacity-100'); setTimeout(() => toast.classList.remove('opacity-100'), 2000);
}
function openModal(src) { document.getElementById('modalImage').src = src; document.getElementById('imgModal').classList.add('active'); }
function sendToWA() { const msg = document.getElementById("guestMsg").value; window.location.href = `mailto:nikola @example.com?body = ${ encodeURIComponent(msg) } `; }
document.body.style.overflow = 'hidden';
</script>
  </body>
  </html>
    `, // <-- Pastikan ditutup dengan backtick

  'regular-invitation': `< !DOCTYPE html >
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
                    <div id="cover" class="fixed inset-0 z-[100] bg-[url('https://placehold.co/600x900')] bg-cover bg-center h-screen w-full flex flex-col justify-end items-center pb-20 text-center before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-t before:from-black/80 before:via-black/40 before:to-transparent" >

                      <div class="relative z-10 text-white px-6 animate-pulse" >
                        <p class="font-sans text-sm tracking-[0.3em] uppercase mb-4 text-secondary" > The Wedding Of </p>
                          < h1 class="font-script text-6xl md:text-8xl mb-4 text-gold drop-shadow-lg" > Nicola & Salsa </h1>
                            < p class="font-serif italic text-lg opacity-90 mb-10" >09 . 10 . 2025 </p>

                              < div class="mb-8" >
                                <p class="text-xs mb-2 opacity-80" > Kepada Yth.Bapak / Ibu / Saudara / i </p>
                                  < div class="bg-white/20 backdrop-blur-md px-6 py-3 rounded-xl inline-block border border-white/30" >
                                    <p class="font-bold tracking-wide" > Tamu Undangan </p>
                                      </div>
                                      </div>

                                      < button onclick = "openInvitation()" class="group relative px-8 py-3 bg-gold text-white rounded-full font-serif tracking-widest text-sm hover:bg-white hover:text-gold transition-all duration-500 shadow-[0_0_20px_rgba(212,175,55,0.5)]" >
                                        <i class="fa-solid fa-envelope-open mr-2" > </i> BUKA UNDANGAN
                                          </button>
                                          </div>
                                          </div>

                                          < !--MAIN CONTENT-- >
                                            <main id="mainContent" class="hidden relative" >

                                              <!--Hero Section-- >
                                                <section id="home" class="min-h-screen flex flex-col justify-center items-center text-center px-4 bg-pattern pt-10" >
                                                  <div data - aos="fade-down" data - aos - duration="1000" >
                                                    <p class="font-serif text-primary italic text-xl mb-2" > Save The Date </p>
                                                      < div class="w-16 h-[1px] bg-gold mx-auto mb-6" > </div>
                                                        </div>

                                                        < div class="relative w-full max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center" >
                                                          <!--Image Left-- >
                                                            <div data - aos="fade-right" class="hidden md:block" >
                                                              <img src="https://placehold.co/600x800" class="rounded-t-[100px] rounded-b-[20px] shadow-xl w-full h-[500px] object-cover" alt = "Couple" >
                                                                </div>

                                                                < !--Text Center / Right-- >
                                                                  <div data - aos="zoom-in" data - aos - duration="1200" >
                                                                    <h1 class="font-script text-6xl md:text-7xl text-dark mb-4" > Nicola & Salsa </h1>
                                                                      < p class="font-sans text-sm tracking-widest uppercase text-primary mb-6" > Are Getting Married </p>

                                                                        < div class="flex justify-center gap-4 font-serif text-dark" >
                                                                          <div class="text-center border-r border-primary pr-4" >
                                                                            <span class="block text-3xl font-bold" >09 </span>
                                                                              < span class="text-xs uppercase" > Oktober </span>
                                                                                </div>
                                                                                < div class="text-center pl-2" >
                                                                                  <span class="block text-3xl font-bold" > 2025 </span>
                                                                                    < span class="text-xs uppercase" > Kamis </span>
                                                                                      </div>
                                                                                      </div>
                                                                                      </div>
                                                                                      </div>

                                                                                      < !--Flower Decor(SVG)-- >
                                                                                        <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180" >
                                                                                          <svg data - name="Layer 1" xmlns = "http://www.w3.org/2000/svg" viewBox = "0 0 1200 120" preserveAspectRatio = "none" class="relative block w-full h-[60px] fill-white" >
                                                                                            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" > </path>
                                                                                              </svg>
                                                                                              </div>
                                                                                              </section>

                                                                                              < !--Q.S Ar - Rum-- >
                                                                                                <section class="py-20 px-6 bg-white text-center" >
                                                                                                  <div class="max-w-2xl mx-auto" data - aos="fade-up" >
                                                                                                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/23/Basmala.svg" alt = "Bismillah" class="h-12 mx-auto mb-6 opacity-70" >
                                                                                                      <p class="font-serif text-lg md:text-xl text-gray-600 leading-relaxed italic mb-6" >
                                                                                                        "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
                                                                                                        </p>
                                                                                                        < p class="font-bold text-primary font-sans tracking-wide" > Q.S.Ar - Rum : 21 </p>
                                                                                                          </div>
                                                                                                          </section>

                                                                                                          < !--Couple Section-- >
                                                                                                            <section id="couple" class="py-20 bg-pattern overflow-hidden" >
                                                                                                              <div class="container mx-auto px-6" >
                                                                                                                <div class="text-center mb-16" data - aos="fade-down" >
                                                                                                                  <h2 class="font-script text-5xl text-dark mb-3" > Mempelai </h2>
                                                                                                                    < p class="text-primary font-sans text-sm tracking-widest" > GROOM & BRIDE </p>
                                                                                                                      </div>

                                                                                                                      < div class="flex flex-col md:flex-row justify-center items-center gap-12 max-w-5xl mx-auto" >

                                                                                                                        <!--Groom -->
                                                                                                                          <div class="text-center w-full md:w-5/12 group" data - aos="fade-right" >
                                                                                                                            <div class="relative w-64 h-80 mx-auto mb-6" >
                                                                                                                              <div class="absolute inset-0 border-[1px] border-gold rounded-t-full rounded-b-xl translate-x-3 translate-y-3 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" > </div>
                                                                                                                                < img src = "https://placehold.co/300x400?text=Groom" alt = "Nicola" class="absolute inset-0 w-full h-full object-cover rounded-t-full rounded-b-xl shadow-lg" >
                                                                                                                                  </div>
                                                                                                                                  < h3 class="font-serif text-3xl font-bold text-dark mb-1" > Nicola Valentino Misno </h3>
                                                                                                                                    < p class="text-xs text-primary mb-4 font-bold tracking-wider" > Putra Kedua </p>
                                                                                                                                      < p class="font-sans text-sm text-gray-500 leading-relaxed" >
                                                                                                                                        Bpk.Misno(Mendol)<br> & <br>Ibu Atik Fifiani
                                                                                                                                          </p>
                                                                                                                                          < a href = "https://instagram.com" target = "_blank" class="inline-block mt-4 text-gold hover:text-dark transition" > <i class="fa-brands fa-instagram text-xl" > </i></a >
                                                                                                                                            </div>

                                                                                                                                            < !--Divider -->
                                                                                                                                              <div class="md:self-center" data - aos="zoom-in" >
                                                                                                                                                <span class="font-script text-6xl text-gold" >& </span>
                                                                                                                                                  </div>

                                                                                                                                                  < !--Bride -->
                                                                                                                                                    <div class="text-center w-full md:w-5/12 group" data - aos="fade-left" >
                                                                                                                                                      <div class="relative w-64 h-80 mx-auto mb-6" >
                                                                                                                                                        <div class="absolute inset-0 border-[1px] border-gold rounded-t-full rounded-b-xl -translate-x-3 translate-y-3 transition-transform group-hover:-translate-x-1 group-hover:translate-y-1" > </div>
                                                                                                                                                          < img src = "https://placehold.co/300x400?text=Bride" alt = "Salsa" class="absolute inset-0 w-full h-full object-cover rounded-t-full rounded-b-xl shadow-lg" >
                                                                                                                                                            </div>
                                                                                                                                                            < h3 class="font-serif text-3xl font-bold text-dark mb-1" > Salsabillah Ekanaiya Putri </h3>
                                                                                                                                                              < p class="text-xs text-primary mb-4 font-bold tracking-wider" > Putri Pertama </p>
                                                                                                                                                                < p class="font-sans text-sm text-gray-500 leading-relaxed" >
                                                                                                                                                                  Bpk.M.Rofiek Aribowo<br> & <br>Ibu Sri Kurniawati
                                                                                                                                                                    </p>
                                                                                                                                                                    < a href = "https://instagram.com" target = "_blank" class="inline-block mt-4 text-gold hover:text-dark transition" > <i class="fa-brands fa-instagram text-xl" > </i></a >
                                                                                                                                                                      </div>

                                                                                                                                                                      </div>
                                                                                                                                                                      </div>
                                                                                                                                                                      </section>

                                                                                                                                                                      < !--Event Section-- >
                                                                                                                                                                        <section id="event" class="py-20 relative bg-[#6d4c41] text-white bg-opacity-95" >
                                                                                                                                                                          <!--Background overlay image if needed-- >
                                                                                                                                                                            <div class= "absolute inset-0 bg-[url('https://placehold.co/600x800?text=Gallery+Photo')] bg-cover bg-center opacity-20 mix-blend-overlay" > </div>

                                                                                                                                                                              < div class="container mx-auto px-6 relative z-10 text-center" >
                                                                                                                                                                                <h2 class="font-script text-5xl mb-12 text-gold" data - aos="fade-down" > Acara Pernikahan </h2>

                                                                                                                                                                                  < div class="max-w-md mx-auto bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-2xl shadow-2xl transform hover:scale-105 transition duration-500" data - aos="zoom-in" >
                                                                                                                                                                                    <div class="mb-6" >
                                                                                                                                                                                      <i class="fa-solid fa-champagne-glasses text-4xl text-gold mb-4" > </i>
                                                                                                                                                                                        < h3 class="font-serif text-3xl font-bold mb-2" > Resepsi </h3>
                                                                                                                                                                                          < p class="text-sm tracking-widest opacity-80 uppercase" > Nikah & Walimatul Ursy </p>
                                                                                                                                                                                            </div>

                                                                                                                                                                                            < div class="border-t border-b border-white/20 py-6 my-6 space-y-4" >
                                                                                                                                                                                              <div class="flex items-center justify-center gap-3" >
                                                                                                                                                                                                <i class="fa-regular fa-calendar text-gold" > </i>
                                                                                                                                                                                                  < p class="font-sans text-lg" > Kamis, 09 Oktober 2025 </p>
                                                                                                                                                                                                    </div>
                                                                                                                                                                                                    < div class="flex items-center justify-center gap-3" >
                                                                                                                                                                                                      <i class="fa-regular fa-clock text-gold" > </i>
                                                                                                                                                                                                        < p class="font-sans text-lg" > 10:00 WIB - Selesai </p>
                                                                                                                                                                                                          </div>
                                                                                                                                                                                                          </div>

                                                                                                                                                                                                          < div class="mb-6" >
                                                                                                                                                                                                            <p class="font-bold mb-2" > Lokasi: </p>
                                                                                                                                                                                                              < p class="text-sm opacity-90 leading-relaxed" >
                                                                                                                                                                                                                Jalan Arumdalu RT.04 RW.03 < br > Bocek Karangploso<br>(Toko Pak Mendol)
                                                                                                                                                                                                                  </p>
                                                                                                                                                                                                                  </div>

                                                                                                                                                                                                                  < a href = "https://maps.google.com" target = "_blank" class="inline-block px-6 py-2 bg-gold text-white rounded-full text-sm font-bold hover:bg-white hover:text-gold transition shadow-lg" >
                                                                                                                                                                                                                    <i class="fa-solid fa-location-dot mr-1" > </i> Google Maps
                                                                                                                                                                                                                      </a>
                                                                                                                                                                                                                      </div>

                                                                                                                                                                                                                      < !--Countdown -->
                                                                                                                                                                                                                        <div class="mt-16" data - aos="fade-up" >
                                                                                                                                                                                                                          <div id="countdown" class="flex flex-wrap justify-center gap-4 text-center" >
                                                                                                                                                                                                                            <!--JS will fill this -- >
                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                              </section>

                                                                                                                                                                                                                              < !--Gallery Section-- >
                                                                                                                                                                                                                                <section id="gallery" class="py-20 bg-pattern" >
                                                                                                                                                                                                                                  <div class="container mx-auto px-4 text-center" >
                                                                                                                                                                                                                                    <h2 class="font-script text-5xl text-dark mb-4" data - aos="fade-up" > Our Moments </h2>
                                                                                                                                                                                                                                      < p class="text-primary font-sans text-sm mb-12" data - aos="fade-up" data - aos - delay="100" > Galeri Foto Prewedding </p>

                                                                                                                                                                                                                                        < div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto" >
                                                                                                                                                                                                                                          <!--Masonry - like Grid-- >
                                                                                                                                                                                                                                            <div class="space-y-4" >
                                                                                                                                                                                                                                              <div class="overflow-hidden rounded-xl shadow-lg group cursor-pointer" data - aos="fade-up" onclick = "openModal('https://placehold.co/600x800?text=Gallery+Photo')" >
                                                                                                                                                                                                                                                <img src="https://placehold.co/600x800?text=Gallery+Photo" class="w-full h-auto transform group-hover:scale-110 transition duration-700" alt = "Gallery" >
                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                  < div class="overflow-hidden rounded-xl shadow-lg group cursor-pointer" data - aos="fade-up" data - aos - delay="100" onclick = "openModal('https://placehold.co/600x800?text=Gallery+Photo')" >
                                                                                                                                                                                                                                                    <img src="https://placehold.co/600x800?text=Gallery+Photo" class="w-full h-auto transform group-hover:scale-110 transition duration-700" alt = "Gallery" >
                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                      </div>

                                                                                                                                                                                                                                                      < div class="space-y-4 md:mt-8" >
                                                                                                                                                                                                                                                        <div class="overflow-hidden rounded-xl shadow-lg group cursor-pointer" data - aos="fade-up" data - aos - delay="200" onclick = "openModal('https://placehold.co/600x800?text=Gallery+Photo')" >
                                                                                                                                                                                                                                                          <img src="https://placehold.co/600x800?text=Gallery+Photo" class="w-full h-auto transform group-hover:scale-110 transition duration-700" alt = "Gallery" >
                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                            </div>

                                                                                                                                                                                                                                                            < div class="space-y-4" >
                                                                                                                                                                                                                                                              <div class="overflow-hidden rounded-xl shadow-lg group cursor-pointer" data - aos="fade-up" data - aos - delay="300" onclick = "openModal('https://placehold.co/600x800?text=Gallery+Photo')" >
                                                                                                                                                                                                                                                                <img src="https://placehold.co/600x800?text=Gallery+Photo" class="w-full h-auto transform group-hover:scale-110 transition duration-700" alt = "Gallery" >
                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                  < div class="overflow-hidden rounded-xl shadow-lg group cursor-pointer" data - aos="fade-up" data - aos - delay="400" onclick = "openModal('https://placehold.co/600x800?text=Gallery+Photo')" >
                                                                                                                                                                                                                                                                    <img src="https://placehold.co/600x800?text=Gallery+Photo" class="w-full h-auto transform group-hover:scale-110 transition duration-700" alt = "Gallery" >
                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                      </div>

                                                                                                                                                                                                                                                                      < div class="space-y-4 md:mt-8" >
                                                                                                                                                                                                                                                                        <div class="overflow-hidden rounded-xl shadow-lg group cursor-pointer" data - aos="fade-up" data - aos - delay="500" onclick = "openModal('https://placehold.co/600x800?text=Gallery+Photo')" >
                                                                                                                                                                                                                                                                          <img src="https://placehold.co/600x800?text=Gallery+Photo" class="w-full h-auto transform group-hover:scale-110 transition duration-700" alt = "Gallery" >
                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                            </section>

                                                                                                                                                                                                                                                                            < !--Gift Section-- >
                                                                                                                                                                                                                                                                              <section id="gift" class="py-20 bg-white" >
                                                                                                                                                                                                                                                                                <div class="container mx-auto px-6 text-center max-w-3xl" >
                                                                                                                                                                                                                                                                                  <h2 class="font-script text-5xl text-dark mb-6" data - aos="fade-down" > Wedding Gift </h2>
                                                                                                                                                                                                                                                                                    < p class="text-gray-600 font-sans mb-10 leading-relaxed" data - aos="fade-up" >
                                                                                                                                                                                                                                                                                      Doa restu Anda merupakan karunia yang sangat berarti bagi kami.Namun jika memberi adalah ungkapan tanda kasih Anda, kami ucapkan terima kasih.
          </p>

                                                                                                                                                                                                                                                                                        < div class="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-2xl border border-gray-200 shadow-lg relative overflow-hidden group hover:shadow-xl transition duration-300" data - aos="flip-up" >
                                                                                                                                                                                                                                                                                          <div class="absolute -right-10 -top-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl group-hover:bg-gold/20 transition" > </div>

                                                                                                                                                                                                                                                                                            < img src = "https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg" alt = "BCA" class="h-8 mb-6 mx-auto" >

                                                                                                                                                                                                                                                                                              <p class="font-mono text-2xl font-bold tracking-wider text-dark mb-1" id = "rekNum" > 8163069596 </p>
                                                                                                                                                                                                                                                                                                < p class="text-sm text-gray-500 mb-6 uppercase tracking-wide" > a.n Nicola </p>

                                                                                                                                                                                                                                                                                                  < button onclick = "copyToClipboard()" class="inline-flex items-center gap-2 px-6 py-2 border border-dark text-dark rounded-full text-sm font-bold hover:bg-dark hover:text-white transition group active:scale-95" >
                                                                                                                                                                                                                                                                                                    <i class="fa-regular fa-copy" > </i> Salin Nomor Rekening
                                                                                                                                                                                                                                                                                                      </button>
                                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                                      </section>

                                                                                                                                                                                                                                                                                                      < !--Guestbook -->
                                                                                                                                                                                                                                                                                                        <section id="rsvp" class="py-20 bg-pattern pb-32" >
                                                                                                                                                                                                                                                                                                          <div class="container mx-auto px-6 max-w-2xl" >
                                                                                                                                                                                                                                                                                                            <div class="text-center mb-10" data - aos="fade-down" >
                                                                                                                                                                                                                                                                                                              <h2 class="font-script text-5xl text-dark mb-2" > Guest Book </h2>
                                                                                                                                                                                                                                                                                                                < p class="text-primary text-sm" > Kirimkan ucapan & doa restu </p>
                                                                                                                                                                                                                                                                                                                  </div>

                                                                                                                                                                                                                                                                                                                  < div class="bg-white p-8 rounded-2xl shadow-lg" data - aos="fade-up" >
                                                                                                                                                                                                                                                                                                                    <textarea id="guestMsg" rows = "4" class="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent resize-none font-sans" placeholder = "Tulis ucapan selamat di sini..." > </textarea>

                                                                                                                                                                                                                                                                                                                      < button onclick = "sendToWA()" class="w-full mt-4 bg-primary text-white py-3 rounded-lg font-bold shadow-lg hover:bg-dark transition-all transform hover:-translate-y-1" >
                                                                                                                                                                                                                                                                                                                        <i class="fa-solid fa-paper-plane mr-2" > </i> Kirim Ucapan
                                                                                                                                                                                                                                                                                                                          </button>
                                                                                                                                                                                                                                                                                                                          < p class="text-xs text-center mt-3 text-gray-400" >* Akan membuka aplikasi email anda </p>
                                                                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                                                                            </section>

                                                                                                                                                                                                                                                                                                                            < !--Footer -->
                                                                                                                                                                                                                                                                                                                              <footer class="bg-dark text-cream py-8 text-center" >
                                                                                                                                                                                                                                                                                                                                <h2 class="font-script text-3xl mb-2" > Nicola & Salsa </h2>
                                                                                                                                                                                                                                                                                                                                  < p class="text-xs opacity-60 font-sans tracking-widest" >09 OKTOBER 2025 </p>
                                                                                                                                                                                                                                                                                                                                    < div class="mt-4 text-[10px] opacity-40" >
                                                                                                                                                                                                                                                                                                                                      Made with ❤️ for Wedding Invitation
                                                                                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                                                                                        </footer>

                                                                                                                                                                                                                                                                                                                                        < !--Bottom Navbar(Mobile Style)-- >
  <nav class= "fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md px-6 py-3 rounded-full shadow-2xl border border-white/40 flex gap-6 z-40 transition-transform duration-500 translate-y-20 opacity-0" id = "navbar" >
    <a href="#home" class="text-xl text-gray-500 hover:text-gold transition active:scale-90" > <i class="fa-solid fa-house" > </i></a >
      <a href="#couple" class="text-xl text-gray-500 hover:text-gold transition active:scale-90" > <i class="fa-solid fa-user-group" > </i></a >
        <a href="#event" class="text-xl text-gray-500 hover:text-gold transition active:scale-90" > <i class="fa-solid fa-calendar-check" > </i></a >
          <a href="#gallery" class="text-xl text-gray-500 hover:text-gold transition active:scale-90" > <i class="fa-solid fa-images" > </i></a >
            <a href="#gift" class="text-xl text-gray-500 hover:text-gold transition active:scale-90" > <i class="fa-solid fa-gift" > </i></a >
              </nav>

              </main>

              < !--Custom Toast Notification-- >
                <div id="toast" class="fixed top-10 left-1/2 -translate-x-1/2 bg-dark text-white px-6 py-3 rounded-lg shadow-2xl z-[60] opacity-0 transition-opacity pointer-events-none flex items-center gap-3" >
                  <i class="fa-solid fa-circle-check text-green-400" > </i>
                    < span class="text-sm font-bold" > Nomor Rekening Berhasil Disalin </span>
                      </div>

                      < !--Image Modal-- >
                        <div id="imgModal" class="modal fixed inset-0 bg-black/90 flex items-center justify-center p-4" onclick = "closeModal()" >
                          <span class="absolute top-4 right-4 text-white text-4xl cursor-pointer" >& times; </span>
                            < img id = "modalImage" src = "" class="max-h-[90vh] max-w-full rounded-lg shadow-2xl" alt = "Full Image" >
                              </div>

                              < !--Scripts -->
                                <script src="https://unpkg.com/aos@2.3.1/dist/aos.js" > </script>
                                  <script>
// Inisialisasi AOS (Animate On Scroll)
AOS.init({
  once: true,
  offset: 100,
  duration: 800,
  easing: 'ease-out-cubic',
});

const cover = document.getElementById('cover');
const mainContent = document.getElementById('mainContent');
const music = document.getElementById('bgMusic');
const musicControl = document.getElementById('musicControl');
const musicIcon = document.getElementById('musicIcon');
const navbar = document.getElementById('navbar');
let isPlaying = false;

// Buka Undangan
function openInvitation() {
  // 1. Play Music
  toggleMusic(true);

  // 2. Animate Cover
  cover.classList.add('cover-slide-up');

  // 3. Show Main Content slightly delayed
  mainContent.classList.remove('hidden');

  setTimeout(() => {
    // Show controls
    musicControl.classList.remove('hidden', 'opacity-0');
    navbar.classList.remove('translate-y-20', 'opacity-0');

    // Allow scroll
    document.body.style.overflow = 'auto';

    // Refresh AOS to calculate positions
    AOS.refresh();
  }, 800);
}

// Music Control
function toggleMusic(forcePlay = false) {
  if (forcePlay || !isPlaying) {
    music.play();
    isPlaying = true;
    musicIcon.classList.add('spin-slow');
    musicIcon.classList.replace('fa-play', 'fa-music');
  } else {
    music.pause();
    isPlaying = false;
    musicIcon.classList.remove('spin-slow');
    musicIcon.classList.replace('fa-music', 'fa-play');
  }
}

// Countdown Logic
const targetDate = new Date("2025-10-09T10:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) {
    document.getElementById("countdown").innerHTML = "<div class='text-xl font-bold text-white'>Alhamdulillah, Acara Telah Selesai</div>";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const timeBox = (val, label) => `
    < div class="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-3 w-20 shadow-lg" >
            <div class="text-2xl font-bold font-serif text-white">${val}</div>
            <div class="text-[10px] uppercase tracking-wider text-gold font-bold">${label}</div>
          </div >
  `;

  document.getElementById("countdown").innerHTML =
    timeBox(days, 'Hari') +
    timeBox(hours, 'Jam') +
    timeBox(minutes, 'Menit') +
    timeBox(seconds, 'Detik');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Copy to Clipboard & Toast
function copyToClipboard() {
  const text = "8163069596";
  const toast = document.getElementById('toast');

  // Modern & Fallback Copy Logic
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);

  // Show Toast
  toast.classList.remove('opacity-0');
  toast.classList.add('opacity-100', 'translate-y-2');

  setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-2');
    toast.classList.add('opacity-0');
  }, 3000);
}

// Send Message (Mailto)
function sendToWA() {
  const input = document.getElementById("guestMsg").value;
  if (input.trim() === "") {
    alert("Mohon isi pesan ucapan terlebih dahulu.");
    return;
  }
  const subject = "Ucapan Pernikahan Nicola & Salsa";
  const body = encodeURIComponent(input);
  window.location.href = `mailto:nikolavalentino8 @gmail.com?subject = ${ subject }& body=${ body } `;
}

// Modal Image Logic
function openModal(src) {
  document.getElementById('modalImage').src = src;
  document.getElementById('imgModal').classList.add('active');
}

function closeModal() {
  document.getElementById('imgModal').classList.remove('active');
}

// Disable Scroll on Load until opened
document.body.style.overflow = 'hidden';
</script>
  </body>
  </html>'
};
