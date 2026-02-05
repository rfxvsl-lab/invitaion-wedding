import { useEffect, useRef } from 'react';
import { InvitationData } from '../types/invitation';

interface RenderProps {
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    data: InvitationData;
    guestName: string;
    wish: string;
    isActive: boolean;
}

export const useStoryCanvasRender = ({ canvasRef, data, guestName, wish, isActive }: RenderProps) => {
    const requestRef = useRef<number>(0);
    const startTimeRef = useRef<number>(0);

    // Common Assets loading
    useEffect(() => {
        if (!isActive || !canvasRef.current) {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            return;
        }

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const themeId = data.metadata.theme_id;

        // --- ASSETS PRELOADING ---
        const heroImg = new Image();
        heroImg.crossOrigin = "anonymous";
        heroImg.src = data.content.hero.main_image || "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";

        // Royal Glass Assets
        const blobs = [
            { x: 100, y: 100, r: 300, color: 'rgba(253, 226, 228, 0.4)', speed: 0.0005, offset: 0 },
            { x: 900, y: 1700, r: 250, color: 'rgba(252, 231, 243, 0.4)', speed: 0.0007, offset: 2 },
        ];
        const leaves = Array.from({ length: 15 }).map(() => ({
            x: Math.random() * 1080,
            y: -100 - Math.random() * 1000,
            size: 20 + Math.random() * 20,
            speedY: 2 + Math.random() * 3,
            speedX: -1 + Math.random() * 2,
            rotation: Math.random() * 360,
            rotationSpeed: -1 + Math.random() * 2,
            opacity: 0.4 + Math.random() * 0.4
        }));

        // ANIMATION LOOP
        const animate = (time: number) => {
            if (!startTimeRef.current) startTimeRef.current = time;
            const elapsed = time - startTimeRef.current;
            const centerX = canvas.width / 2;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (themeId === 'netflix-luxury') {
                // ... NETFLIX LOGIC ...
                ctx.fillStyle = '#141414';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                if (heroImg.complete && heroImg.naturalWidth > 0) {
                    const zoomFactor = 1 + (elapsed / 15000) * 0.2;
                    const imgRatio = heroImg.naturalWidth / heroImg.naturalHeight;
                    const canvasRatio = canvas.width / canvas.height;
                    let sWidth, sHeight, sx, sy;

                    if (imgRatio > canvasRatio) {
                        sHeight = heroImg.naturalHeight;
                        sWidth = heroImg.naturalHeight * canvasRatio;
                        sx = (heroImg.naturalWidth - sWidth) / 2;
                        sy = 0;
                    } else {
                        sWidth = heroImg.naturalWidth;
                        sHeight = heroImg.naturalWidth / canvasRatio;
                        sx = 0;
                        sy = (heroImg.naturalHeight - sHeight) / 2;
                    }

                    const zoomedW = sWidth / zoomFactor;
                    const zoomedH = sHeight / zoomFactor;
                    const zoomedX = sx + (sWidth - zoomedW) / 2;
                    const zoomedY = sy + (sHeight - zoomedH) / 2;

                    ctx.save();
                    ctx.globalAlpha = 0.7;
                    ctx.drawImage(heroImg, zoomedX, zoomedY, zoomedW, zoomedH, 0, 0, canvas.width, canvas.height);
                    ctx.restore();
                }

                // Vignette
                const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
                gradient.addColorStop(0, 'rgba(0,0,0,0.6)');
                gradient.addColorStop(0.4, 'rgba(0,0,0,0)');
                gradient.addColorStop(0.7, 'rgba(0,0,0,0.4)');
                gradient.addColorStop(1, 'rgba(0,0,0,0.9)');
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // N Logo
                ctx.fillStyle = '#E50914';
                ctx.font = 'bold 120px "Bebas Neue", sans-serif';
                ctx.textAlign = 'left';
                ctx.fillText('N', 50, 150);

                ctx.fillStyle = '#E50914';
                ctx.fillRect(920, 80, 110, 40);
                ctx.fillStyle = '#FFFFFF';
                ctx.font = 'bold 24px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('SERIES', 975, 108);

                // Content
                const bottomStart = canvas.height - 400;
                ctx.textAlign = 'left';
                ctx.fillStyle = '#FFFFFF';
                ctx.save();
                ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
                ctx.shadowBlur = 20;

                const groom = data.content.couples.pria.name.split(' ')[0].toUpperCase();
                const bride = data.content.couples.wanita.name.split(' ')[0].toUpperCase();

                ctx.font = '280px "Bebas Neue"';
                ctx.fillText(groom, 50, bottomStart - 250);
                ctx.fillStyle = '#E50914';
                ctx.font = '150px "Bebas Neue"';
                ctx.fillText('&', 50, bottomStart - 120);
                ctx.fillStyle = '#FFFFFF';
                ctx.font = '280px "Bebas Neue"';
                ctx.fillText(bride, 50, bottomStart + 150);
                ctx.restore();
            } else if (themeId === 'grand-ballroom') {
                // ... GRAND BALLROOM LOGIC ...
                const curtainDuration = 2500;
                const gradBg = ctx.createLinearGradient(0, 0, 0, canvas.height);
                gradBg.addColorStop(0, '#0f0505');
                gradBg.addColorStop(1, '#000000');
                ctx.fillStyle = gradBg;
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                const radBg = ctx.createRadialGradient(centerX, canvas.height * 0.3, 0, centerX, canvas.height * 0.3, 800);
                radBg.addColorStop(0, '#3e0b0b');
                radBg.addColorStop(1, 'transparent');
                ctx.fillStyle = radBg;
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                const parallaxOffset = (elapsed * 0.05) % canvas.width;
                ctx.save();
                ctx.globalAlpha = 0.3;
                const people = [{ x: 100, s: 150 }, { x: 400, s: 120 }, { x: 800, s: 180 }, { x: 1200, s: 140 }];
                people.forEach(p => {
                    let currentX = p.x - parallaxOffset;
                    if (currentX < -200) currentX += canvas.width + 400;
                    ctx.shadowColor = 'black';
                    ctx.shadowBlur = 20;
                    ctx.fillStyle = '#000';
                    ctx.beginPath();
                    ctx.ellipse(currentX, canvas.height - 200, p.s / 2, p.s, 0, 0, Math.PI * 2);
                    ctx.arc(currentX, canvas.height - 200 - p.s, p.s / 2.5, 0, Math.PI * 2);
                    ctx.fill();
                });
                ctx.restore();

                let cardProgress = Math.min(1, Math.max(0, (elapsed - 500) / 1500));
                cardProgress = 1 - Math.pow(1 - cardProgress, 3);
                const startScale = 0.8;
                const endScale = 1;
                const currentScale = startScale + (endScale - startScale) * cardProgress;
                const startY = 200;
                const endY = 0;
                const currentY = startY + (endY - startY) * cardProgress;
                const cardW = 900 * currentScale;
                const cardH = 1500 * currentScale;
                const cardX = -cardW / 2;
                const cardY = ((canvas.height - cardH) / 2) + currentY;

                ctx.save();
                ctx.translate(centerX, 0);

                if (elapsed > 200) {
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
                    ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
                    ctx.lineWidth = 1;
                    ctx.shadowColor = 'rgba(0,0,0,0.5)';
                    ctx.shadowBlur = 50 * currentScale;
                    ctx.shadowOffsetY = 30;
                    ctx.fillRect(cardX, cardY, cardW, cardH);
                    ctx.shadowColor = 'transparent';
                    ctx.strokeRect(cardX, cardY, cardW, cardH);

                    ctx.textAlign = 'center';
                    ctx.fillStyle = '#8B6508';
                    ctx.font = `bold ${24 * currentScale}px "Cinzel"`;
                    ctx.fillText('THE WEDDING CELEBRATION', 0, cardY + 200 * currentScale);

                    const nameGrad = ctx.createLinearGradient(-300, 0, 300, 0);
                    nameGrad.addColorStop(0, '#bf953f');
                    nameGrad.addColorStop(1, '#aa771c');
                    ctx.fillStyle = nameGrad;
                    ctx.font = `${100 * currentScale}px "Playfair Display"`;
                    ctx.fillText(data.content.couples.pria.name.split(' ')[0], 0, cardY + 400 * currentScale);
                    ctx.fillStyle = '#333';
                    ctx.font = `${50 * currentScale}px "Cinzel"`;
                    ctx.fillText('&', 0, cardY + 480 * currentScale);
                    ctx.fillStyle = nameGrad;
                    ctx.font = `${100 * currentScale}px "Playfair Display"`;
                    ctx.fillText(data.content.couples.wanita.name.split(' ')[0], 0, cardY + 600 * currentScale);

                    const frameSize = 500 * currentScale;
                    const frameCenterY = cardY + 950 * currentScale;
                    ctx.save();
                    ctx.translate(0, frameCenterY);
                    ctx.rotate(-0.02);
                    if (heroImg.complete && heroImg.naturalWidth > 0) {
                        ctx.drawImage(heroImg, -frameSize / 2, -frameSize * 0.7, frameSize, frameSize * 1.4);
                    }
                    ctx.restore();
                }
                ctx.restore();

                let openProgress = Math.min(1, elapsed / curtainDuration);
                openProgress = openProgress < .5 ? 4 * openProgress * openProgress * openProgress : (openProgress - 1) * (2 * openProgress - 2) * (2 * openProgress - 2) + 1;
                const curtainW = canvas.width / 2;
                const moveDist = curtainW * openProgress;
                ctx.fillStyle = '#4a0404';
                ctx.fillRect(-moveDist, 0, curtainW, canvas.height);
                ctx.fillRect(canvas.width / 2 + moveDist, 0, curtainW, canvas.height);

            } else if (themeId === 'royal-arabian') {
                // ... ROYAL ARABIAN LOGIC ...
                const timeSec = elapsed / 1000;
                const gradSky = ctx.createLinearGradient(0, 0, 0, canvas.height);
                gradSky.addColorStop(0, '#020508');
                gradSky.addColorStop(1, '#0a1f18');
                ctx.fillStyle = gradSky;
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                for (let i = 0; i < 50; i++) {
                    const seed = i * 1337;
                    const x = (Math.sin(seed) * 10000) % canvas.width;
                    const y = (Math.cos(seed) * 10000) % (canvas.height * 0.6);
                    const size = (Math.abs(Math.sin(seed)) * 3) + 1;
                    const opacity = 0.3 + (Math.sin(timeSec * 2 + i) * 0.3 + 0.3);
                    ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(opacity)})`;
                    ctx.beginPath();
                    ctx.arc(Math.abs(x), Math.abs(y), size, 0, Math.PI * 2);
                    ctx.fill();
                }

                // Moon
                const moonX = canvas.width - 150;
                const moonY = 200;
                ctx.shadowColor = '#FFD700';
                ctx.shadowBlur = 20;
                ctx.fillStyle = '#FCF6BA';
                ctx.beginPath();
                ctx.arc(moonX, moonY, 60, 0.6 * Math.PI, 1.8 * Math.PI);
                ctx.fill();
                ctx.shadowBlur = 0;

                // Mosques Parallax
                const parallaxX = Math.sin(timeSec * 0.2) * 50;
                ctx.save();
                ctx.translate(parallaxX, 0);

                const baseY = canvas.height - 300;
                ctx.fillStyle = 'rgba(15, 38, 31, 0.6)';
                ctx.beginPath(); ctx.arc(centerX, baseY, 150, Math.PI, 0); ctx.fill();

                ctx.fillStyle = '#0a1f18';
                ctx.beginPath();
                ctx.moveTo(-200, baseY);
                ctx.quadraticCurveTo(centerX, baseY - 50, canvas.width + 200, baseY);
                ctx.lineTo(canvas.width + 200, canvas.height);
                ctx.lineTo(-200, canvas.height);
                ctx.fill();
                ctx.restore();

                // Card
                const cardY = canvas.height / 2 - 400;
                const cardH = 900;
                const cw = 800;
                const cx = (canvas.width - cw) / 2;

                ctx.save();
                ctx.fillStyle = 'rgba(15, 38, 31, 0.65)';
                ctx.strokeStyle = 'rgba(212, 175, 55, 0.5)';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.roundRect(cx, cardY, cw, cardH, 40);
                ctx.fill();
                ctx.stroke();

                ctx.textAlign = 'center';
                ctx.fillStyle = '#D4AF37';
                ctx.font = '30px "Cinzel"';
                ctx.fillText('THE WEDDING OF', centerX, cardY + 100);

                ctx.fillStyle = '#D4AF37';
                ctx.font = '30px "Cinzel"';
                ctx.fillText('THE WEDDING OF', centerX, cardY + 100);

                // HERO IMAGE (ADDED)
                if (heroImg.complete && heroImg.naturalWidth > 0) {
                    const imgW = 300;
                    const imgH = 400;
                    const imgX = centerX - imgW / 2;
                    const imgY = cardY + 140;

                    ctx.save();
                    // Arch Mask
                    ctx.beginPath();
                    ctx.moveTo(imgX, imgY + imgH);
                    ctx.lineTo(imgX + imgW, imgY + imgH);
                    ctx.lineTo(imgX + imgW, imgY + 50);
                    ctx.quadraticCurveTo(centerX, imgY - 50, imgX, imgY + 50);
                    ctx.closePath();
                    ctx.clip();

                    ctx.drawImage(heroImg, imgX, imgY, imgW, imgH);

                    // Gradient Overlay
                    const gradImg = ctx.createLinearGradient(0, imgY + imgH - 100, 0, imgY + imgH);
                    gradImg.addColorStop(0, 'transparent');
                    gradImg.addColorStop(1, 'rgba(15, 38, 31, 0.9)');
                    ctx.fillStyle = gradImg;
                    ctx.fillRect(imgX, imgY, imgW, imgH);

                    ctx.restore();

                    // Frame Border
                    ctx.beginPath();
                    ctx.moveTo(imgX, imgY + imgH);
                    ctx.lineTo(imgX + imgW, imgY + imgH);
                    ctx.lineTo(imgX + imgW, imgY + 50);
                    ctx.quadraticCurveTo(centerX, imgY - 50, imgX, imgY + 50);
                    ctx.closePath();
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = '#D4AF37';
                    ctx.stroke();
                }

                ctx.fillStyle = '#F5E6CA';
                ctx.font = '80px "Cinzel"'; // Reduce font size slightly

                const groom = data.content.couples.pria.name.split(' ')[0];
                const bride = data.content.couples.wanita.name.split(' ')[0];
                ctx.fillText(groom, centerX, cardY + 600); // Shift down
                ctx.fillText('&', centerX, cardY + 680);
                ctx.fillText(bride, centerX, cardY + 760);
                ctx.restore();

                // Lanters
                const drawLantern = (lx: number, length: number, phase: number) => {
                    ctx.save();
                    ctx.translate(lx, 0);
                    ctx.rotate(Math.sin(timeSec * 1.5 + phase) * 0.05);
                    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, length); ctx.strokeStyle = '#D4AF37'; ctx.lineWidth = 2; ctx.stroke();
                    ctx.translate(0, length);
                    ctx.fillStyle = 'rgba(15, 38, 31, 0.9)';
                    ctx.beginPath();
                    ctx.moveTo(-20, 0); ctx.lineTo(20, 0); ctx.lineTo(30, 20); ctx.lineTo(20, 50); ctx.lineTo(-20, 50); ctx.lineTo(-30, 20);
                    ctx.fill();
                    ctx.fillStyle = '#FFD700'; ctx.beginPath(); ctx.arc(0, 25, 10, 0, Math.PI * 2); ctx.fill();
                    ctx.restore();
                };
                drawLantern(100, 300, 0);
                drawLantern(canvas.width - 100, 400, 1);

            } else if (themeId === 'spotilove') {
                // --- SPOTILOVE LOGIC ---
                // Sequence: 
                // 0-3s: Opening (Cover + Play Button -> Music Visualizer)
                // 3-4s: Slide Up
                // 4s+: Main Interface

                const slideStart = 3000;
                const slideDuration = 1000;

                // --- STAGE 1: OPENING COMPONENT ---
                let slideY = 0;
                if (elapsed > slideStart) {
                    const progress = Math.min(1, (elapsed - slideStart) / slideDuration);
                    // Ease in out
                    const ease = progress < .5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
                    slideY = -canvas.height * ease;
                }

                ctx.save();
                ctx.translate(0, slideY);

                // A. BACKGROUND (Black)
                ctx.fillStyle = '#000000';
                ctx.fillRect(0, 0, canvas.width, canvas.height); // Opening BG

                // MAIN APP BACKGROUND (Behind - revealed when slid up? No, actually we slide the Opening UP to reveal App)
                // Wait, logic: Opening is Z=100. App is Z=0.
                // So we draw App first, then Opening on top.
                // But Canvas is one layer. So we draw App, then draw Opening on top with offset.
                // If Opening slides UP (Translate Y goes negative), we need to draw it at `slideY`.
                // And App stays at 0.

                // Let's REVERSE:
                // Draw OPENING SCREEN layer first, but we transform it by `slideY`.
                // Wait, if it slides UP, it leaves the screen.
                // So we should draw APP first (background), then OPENING layer on top, transformed.

                ctx.restore(); // Reset transform for App

                // 1. DRAW APP (Static Background for now, or animated)
                ctx.fillStyle = '#121212';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Sidebar (Left 250px)
                ctx.fillStyle = '#000000';
                ctx.fillRect(0, 0, 250, canvas.height);
                // Icons mock
                for (let i = 0; i < 6; i++) {
                    ctx.fillStyle = i === 0 ? '#ffffff' : '#b3b3b3';
                    ctx.fillRect(50, 300 + i * 100, 40, 40);
                    ctx.fillStyle = i === 0 ? '#ffffff' : '#b3b3b3';
                    ctx.font = 'bold 30px Montserrat';
                    ctx.textAlign = 'left';
                    ctx.fillText(['Home', 'Tour', 'Artist', 'Discography', 'Merch', 'Fan Club'][i], 120, 332 + i * 100);
                }

                // Main Content Area
                ctx.save();
                ctx.translate(250, 0);
                // Hero Header
                const gradHeader = ctx.createLinearGradient(0, 0, 0, 600);
                gradHeader.addColorStop(0, '#535353');
                gradHeader.addColorStop(1, '#121212');
                ctx.fillStyle = gradHeader;
                ctx.fillRect(0, 0, canvas.width - 250, 600);

                if (heroImg.complete && heroImg.naturalWidth > 0) {
                    ctx.shadowColor = 'rgba(0,0,0,0.5)';
                    ctx.shadowBlur = 40;
                    ctx.drawImage(heroImg, 50, 250, 300, 300);
                    ctx.shadowColor = 'transparent';
                }

                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 80px Montserrat';
                ctx.textAlign = 'left';
                ctx.fillText(data.content.couples.pria.name.split(' ')[0], 380, 350);
                ctx.fillText('& ' + data.content.couples.wanita.name.split(' ')[0], 380, 440);
                ctx.font = '30px Montserrat';
                ctx.fillStyle = '#b3b3b3';
                ctx.fillText('The Wedding Celebration • ' + data.content.hero.date, 380, 500);

                // Play Button Green
                ctx.fillStyle = '#1DB954';
                ctx.beginPath(); ctx.arc(100, 650, 50, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#000';
                ctx.beginPath(); ctx.moveTo(90, 630); ctx.lineTo(120, 650); ctx.lineTo(90, 670); ctx.fill();

                // Popular List
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 40px Montserrat';
                ctx.fillText('Popular', 50, 800);

                for (let j = 0; j < 3; j++) {
                    const y = 900 + j * 120;
                    ctx.fillStyle = '#b3b3b3';
                    ctx.fillText((j + 1).toString(), 50, y);
                    if (heroImg.complete) ctx.drawImage(heroImg, 100, y - 40, 80, 80);
                    ctx.fillStyle = '#fff';
                    ctx.fillText(['The Proposal', 'The Wedding Day', 'Honeymoon'][j], 210, y - 10);
                    ctx.fillStyle = '#b3b3b3';
                    ctx.fillText((3 + j) + ':00', 700, y);

                    // Equalizer for active track
                    if (j === 1) {
                        ctx.fillStyle = '#1DB954';
                        const h1 = 10 + Math.sin(elapsed * 0.01) * 15;
                        const h2 = 10 + Math.sin(elapsed * 0.01 + 1) * 15;
                        const h3 = 10 + Math.sin(elapsed * 0.01 + 2) * 15;
                        ctx.fillRect(780, y - 10 - h1, 5, h1);
                        ctx.fillRect(790, y - 10 - h2, 5, h2);
                        ctx.fillRect(800, y - 10 - h3, 5, h3);
                    }
                }
                ctx.restore();

                // Player Bar (Bottom)
                ctx.fillStyle = '#181818';
                ctx.fillRect(0, canvas.height - 150, canvas.width, 150);
                ctx.fillStyle = '#282828'; // Border top
                ctx.fillRect(0, canvas.height - 150, canvas.width, 2);

                if (heroImg.complete) ctx.drawImage(heroImg, 30, canvas.height - 125, 100, 100);
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 30px Montserrat';
                ctx.fillText('Perfect Two', 150, canvas.height - 90);
                ctx.fillStyle = '#b3b3b3';
                ctx.font = '24px Montserrat';
                ctx.fillText('Verified Artist', 150, canvas.height - 50);

                // Progress
                ctx.fillStyle = '#4d4d4d';
                ctx.fillRect(centerX - 300, canvas.height - 60, 600, 6);
                const prog = ((elapsed % 10000) / 10000);
                ctx.fillStyle = '#fff';
                ctx.fillRect(centerX - 300, canvas.height - 60, 600 * prog, 6);
                ctx.beginPath(); ctx.arc(centerX - 300 + 600 * prog, canvas.height - 57, 10, 0, Math.PI * 2); ctx.fill();


                // 2. DRAW OPENING (On Top, Sliding Up)
                if (slideY > -canvas.height) {
                    ctx.save();
                    ctx.translate(0, slideY);

                    // BG
                    ctx.fillStyle = '#000000';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);

                    // Cover Art (Center)
                    const pulse = 1 + Math.sin(elapsed * 0.005) * 0.05;
                    const cSize = 600 * pulse;
                    const cx = (canvas.width - cSize) / 2;
                    const cy = (canvas.height - cSize) / 2 - 100;

                    if (heroImg.complete && heroImg.naturalWidth > 0) {
                        ctx.shadowColor = 'rgba(29, 185, 84, 0.4)';
                        ctx.shadowBlur = 80;
                        ctx.drawImage(heroImg, cx, cy, cSize, cSize);
                        ctx.shadowColor = 'transparent';
                    } else {
                        ctx.fillStyle = '#333';
                        ctx.fillRect(cx, cy, cSize, cSize);
                    }

                    // Text
                    ctx.textAlign = 'center';
                    ctx.fillStyle = '#fff';
                    ctx.font = 'bold 80px Montserrat';
                    ctx.fillText(data.content.hero.nicknames, centerX, cy + cSize + 100);

                    ctx.fillStyle = '#1DB954';
                    ctx.font = 'bold 30px Montserrat';
                    ctx.fillText('EXCLUSIVE RELEASE', centerX, cy + cSize + 160);

                    // Button
                    ctx.fillStyle = '#1DB954';
                    ctx.beginPath();
                    ctx.roundRect(centerX - 200, cy + cSize + 250, 400, 100, 50);
                    ctx.fill();

                    ctx.fillStyle = '#000';
                    ctx.font = 'bold 40px Montserrat';
                    ctx.fillText('LISTEN NOW', centerX + 20, cy + cSize + 315);
                    // Play icon
                    ctx.beginPath(); ctx.moveTo(centerX - 80, cy + cSize + 285); ctx.lineTo(centerX - 50, cy + cSize + 300); ctx.lineTo(centerX - 80, cy + cSize + 315); ctx.fill();

                    ctx.restore();
                }

            } else if (themeId === 'luxury-pink') {
                // --- LUXURY PINK LOGIC ---
                // Sequence: Envelope Opening

                const openDur = 3000;
                let openProgress = Math.min(1, elapsed / openDur);
                // cubic ease out
                openProgress = 1 - Math.pow(1 - openProgress, 3);

                // Background
                ctx.fillStyle = '#fff1f2';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Texture overlay (simple dots)
                ctx.fillStyle = 'rgba(190, 24, 93, 0.05)';
                for (let i = 0; i < canvas.width; i += 40) {
                    for (let j = 0; j < canvas.height; j += 40) {
                        ctx.beginPath(); ctx.arc(i, j, 2, 0, Math.PI * 2); ctx.fill();
                    }
                }

                // Hearts Floating
                const hearts = [
                    { x: 200, s: 50, sP: 1 }, { x: 800, s: 80, sP: 1.5 }, { x: 500, s: 30, sP: 0.8 },
                    { x: 100, s: 60, sP: 0.5 }, { x: 900, s: 40, sP: 1.2 }
                ];
                hearts.forEach((h, i) => {
                    const y = canvas.height - ((elapsed * h.sP * 0.1 + i * 300) % (canvas.height + 200)) + 100;
                    ctx.fillStyle = 'rgba(251, 207, 232, 0.6)';
                    ctx.font = `${h.s}px serif`;
                    ctx.fillText('♥', h.x, y);
                });

                // --- ENVELOPE (Front View) ---
                // We simulate the envelope sliding DOWN and Fading OUT, revealing the card?
                // Or the Card sliding UP out of envelope?
                // Let's do: Envelope Static, Flap Opens, Card Slides UP.

                const cardSlide = Math.max(0, (elapsed - 1000) * 0.8); // Pixels to slide up
                const cardYStart = canvas.height / 2 - 200;
                const cardY = cardYStart - Math.min(600, cardSlide);

                // Draw Card (Behind Envelope Front, In front of Envelope Back)
                // Actually to sort Z: Envelope Back -> Card -> Envelope Front -> Flap

                const envW = 800;
                const envH = 500;
                const envX = (canvas.width - envW) / 2;
                const envY = canvas.height / 2;

                // 1. Envelope Back (Interior)
                ctx.fillStyle = '#9f1239'; // Darker pink/red
                ctx.fillRect(envX, envY, envW, envH);

                // 2. Card
                ctx.save();
                // Clip to not show below envelope if we want, but usually card sticks out top.
                // We clip it to Envelope Box ONLY if it's inside... 
                // But simplified: Card is just drawn.
                ctx.fillStyle = '#ffffff';
                ctx.shadowColor = 'rgba(0,0,0,0.2)';
                ctx.shadowBlur = 20;
                const cardW = 750;
                const cardH = 900;
                const cardX = (canvas.width - cardW) / 2;
                ctx.fillRect(cardX, cardY, cardW, cardH);
                ctx.shadowColor = 'transparent';

                // Card Content (Only if visible roughly)
                if (cardY < canvas.height) {
                    // Couple Image
                    if (heroImg.complete && heroImg.naturalWidth > 0) {
                        ctx.save();
                        ctx.beginPath(); ctx.arc(centerX, cardY + 300, 150, 0, Math.PI * 2); ctx.clip();
                        ctx.drawImage(heroImg, centerX - 150, cardY + 150, 300, 300);
                        ctx.restore();
                        ctx.lineWidth = 10;
                        ctx.strokeStyle = '#fff1f2';
                        ctx.beginPath(); ctx.arc(centerX, cardY + 300, 150, 0, Math.PI * 2); ctx.stroke();
                    }

                    ctx.textAlign = 'center';
                    ctx.fillStyle = '#be185d';
                    ctx.font = '60px "Great Vibes"';
                    ctx.fillText('The Wedding Of', centerX, cardY + 550);
                    ctx.font = 'bold 80px "Playfair Display"';
                    ctx.fillText(data.content.couples.pria.name.split(' ')[0] + ' & ' + data.content.couples.wanita.name.split(' ')[0], centerX, cardY + 650);
                    ctx.font = '40px "Nunito Sans"';
                    ctx.fillText(data.content.hero.date, centerX, cardY + 750);
                }
                ctx.restore();

                // 3. Envelope Front (Bottom Pockets)
                ctx.fillStyle = '#be185d'; // Rose 700
                ctx.beginPath();
                ctx.moveTo(envX, envY + envH); // BL
                ctx.lineTo(envX + envW, envY + envH); // BR
                ctx.lineTo(centerX, envY + envH / 2); // Center
                ctx.fill();
                // Left flap
                ctx.fillStyle = '#9d174d';
                ctx.beginPath(); ctx.moveTo(envX, envY); ctx.lineTo(centerX, envY + envH / 2); ctx.lineTo(envX, envY + envH); ctx.fill();
                // Right flap
                ctx.fillStyle = '#bc1c58';
                ctx.beginPath(); ctx.moveTo(envX + envW, envY); ctx.lineTo(centerX, envY + envH / 2); ctx.lineTo(envX + envW, envY + envH); ctx.fill();

                // 4. Top Flap (Animated)
                ctx.save();
                ctx.translate(centerX, envY); // Pivot at top center
                // 0 to 180 degrees.
                // 0 to 1000ms
                const flapProgress = Math.min(1, elapsed / 1000);
                const rotation = flapProgress * Math.PI; // 180 deg

                // If rotation > 90, z-index changes (visually it goes behind card if we were 3D)
                // 2D Trick: Scale Y?
                // Simple 2D rotation:
                // We use scaleY to simulate X-axis rotation perspective? No, Canvas has transform.
                // Let's just draw triangle.

                // Actually, if open, it shouldn't hide the card moving up.
                // So if (flapProgress === 1) we don't draw it OR draw it 'behind' card (handled by drawing order).
                // BUT card is already drawn behind Front...
                // Complex 3D order. 
                // Simplified: Draw Flap. As it opens (rotates up), it reveals the card.

                // Open visual:
                ctx.fillStyle = '#881337'; // Darker inside or outside
                // Triangle pointing down initially
                // Vertices: (-w/2, 0), (w/2, 0), (0, h/2)

                // We can't do true 3D easily.
                // Hack: If open, don't draw overlapping flap.
                // Just animate color/scale.

                if (flapProgress < 1) {
                    ctx.scale(1, 1 - flapProgress * 2); // Shrink to 0 then flip?
                    // Just shrinking Y is enough to look like opening UP.
                    if (1 - flapProgress * 2 > 0) {
                        ctx.beginPath();
                        ctx.moveTo(-envW / 2, 0);
                        ctx.lineTo(envW / 2, 0);
                        ctx.lineTo(0, envH / 2);
                        ctx.fill();
                    }
                }
                ctx.restore();

            } else {
                // ... ROYAL GLASS LOGIC ...
                ctx.fillStyle = '#F9F7F2';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                blobs.forEach(blob => {
                    const moveX = Math.sin(elapsed * blob.speed + blob.offset) * 50;
                    const moveY = Math.cos(elapsed * blob.speed + blob.offset) * 50;
                    const grad = ctx.createRadialGradient(blob.x + moveX, blob.y + moveY, 0, blob.x + moveX, blob.y + moveY, blob.r);
                    grad.addColorStop(0, blob.color);
                    grad.addColorStop(1, 'rgba(255,255,255,0)');
                    ctx.fillStyle = grad;
                    ctx.beginPath(); ctx.arc(blob.x + moveX, blob.y + moveY, blob.r, 0, Math.PI * 2); ctx.fill();
                });

                ctx.textAlign = 'center';
                ctx.fillStyle = '#B8860B';
                ctx.font = '24px Montserrat';
                ctx.fillText('THE WEDDING OF', centerX, 200);

                const name1 = data.content.couples.pria.name.split(' ')[0];
                const name2 = data.content.couples.wanita.name.split(' ')[0];
                ctx.fillStyle = '#8B6E4E';
                ctx.font = '140px Pinyon Script';
                ctx.fillText(name1, centerX, 380);
                ctx.fillText('&', centerX, 440);
                ctx.fillText(name2, centerX, 580);

                if (heroImg.complete && heroImg.naturalWidth > 0) {
                    ctx.drawImage(heroImg, centerX - 350, 700, 700, 900);
                }

                leaves.forEach(leaf => {
                    leaf.y += leaf.speedY;
                    if (leaf.y > canvas.height) leaf.y = -50;
                    ctx.save();
                    ctx.translate(leaf.x, leaf.y);
                    ctx.fillStyle = '#D4A5A5';
                    ctx.globalAlpha = leaf.opacity;
                    ctx.beginPath(); ctx.ellipse(0, 0, leaf.size, leaf.size / 2, 0, 0, Math.PI * 2); ctx.fill();
                    ctx.restore();
                });
            }

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [isActive, canvasRef, data, guestName, wish]);
};
