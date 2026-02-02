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
                // ==========================================
                // NETFLIX LUXURY RENDERER
                // ==========================================

                // 1. Background (Black)
                ctx.fillStyle = '#141414';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // 2. Hero Image with Zoom (Ken Burns effect)
                if (heroImg.complete && heroImg.naturalWidth > 0) {
                    const zoomFactor = 1 + (elapsed / 15000) * 0.2; // 20% zoom over 15s

                    const imgRatio = heroImg.naturalWidth / heroImg.naturalHeight;
                    const canvasRatio = canvas.width / canvas.height;

                    let sWidth, sHeight, sx, sy;

                    // Calculate "Cover" fit
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

                    // Apply virtual zoom by shrinking source rect center-wise
                    const zoomedW = sWidth / zoomFactor;
                    const zoomedH = sHeight / zoomFactor;
                    const zoomedX = sx + (sWidth - zoomedW) / 2;
                    const zoomedY = sy + (sHeight - zoomedH) / 2;

                    ctx.save();
                    ctx.globalAlpha = 0.7; // Brightness reduction
                    ctx.drawImage(heroImg, zoomedX, zoomedY, zoomedW, zoomedH, 0, 0, canvas.width, canvas.height);
                    ctx.restore();
                }

                // 3. Vignette Gradient
                const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
                gradient.addColorStop(0, 'rgba(0,0,0,0.6)');
                gradient.addColorStop(0.4, 'rgba(0,0,0,0)');
                gradient.addColorStop(0.7, 'rgba(0,0,0,0.4)');
                gradient.addColorStop(1, 'rgba(0,0,0,0.9)');
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // 4. Header (N Logo)
                ctx.fillStyle = '#E50914';
                ctx.font = 'bold 120px "Bebas Neue", sans-serif';
                ctx.textAlign = 'left';
                ctx.fillText('N', 50, 150);

                // Series Badge
                ctx.fillStyle = '#E50914';
                ctx.fillRect(920, 80, 110, 40);
                ctx.fillStyle = '#FFFFFF';
                ctx.font = 'bold 24px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('SERIES', 975, 108);

                // 5. Main Content (Bottom Oriented)
                const bottomStart = canvas.height - 400;

                // Title (Names)
                ctx.textAlign = 'left';
                ctx.fillStyle = '#FFFFFF';
                ctx.save();
                ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
                ctx.shadowBlur = 20;

                const groom = data.content.couples.pria.name.split(' ')[0].toUpperCase();
                const bride = data.content.couples.wanita.name.split(' ')[0].toUpperCase();

                ctx.font = '280px "Bebas Neue"';
                // Check if font loads, otherwise fallback is sans-serif which might need adjusting size
                // We assume Bebas Neue is loaded in the DOM.

                // Draw stacked
                ctx.fillText(groom, 50, bottomStart - 250);

                ctx.fillStyle = '#E50914';
                ctx.font = '150px "Bebas Neue"';
                ctx.fillText('&', 50, bottomStart - 120);

                ctx.fillStyle = '#FFFFFF';
                ctx.font = '280px "Bebas Neue"';
                ctx.fillText(bride, 50, bottomStart + 150);

                ctx.restore();

                // Meta Info
                const metaY = bottomStart + 240;
                ctx.font = 'bold 36px "Martel Sans", sans-serif';

                // Match
                ctx.fillStyle = '#46d369';
                ctx.fillText('99% Match', 50, metaY);

                ctx.fillStyle = '#9ca3af';
                ctx.fillText('•', 270, metaY);

                // Year
                ctx.fillStyle = '#d1d5db';
                const year = new Date(data.content.hero.date).getFullYear();
                ctx.fillText(`${year}`, 320, metaY);

                ctx.fillStyle = '#9ca3af';
                ctx.fillText('•', 430, metaY);

                // HD Badge
                ctx.strokeStyle = '#9ca3af';
                ctx.lineWidth = 3;
                ctx.strokeRect(480, metaY - 30, 80, 40);
                ctx.fillStyle = '#d1d5db';
                ctx.font = '24px sans-serif';
                ctx.fillText('HD', 503, metaY - 2);

                // Subtitle / Wish
                const descY = metaY + 80;
                ctx.fillStyle = '#e5e7eb';
                ctx.font = '36px "Martel Sans", sans-serif';

                const textToRender = wish ? `"${wish}" - ${guestName}` : (data.content.texts.hero_subtitle || "Don't miss the premiere of our new chapter.");

                // Simple wrap
                const words = textToRender.split(' ');
                let line = '';
                let dy = 0;
                const maxWidth = 980;

                for (let n = 0; n < words.length; n++) {
                    const testLine = line + words[n] + ' ';
                    const metrics = ctx.measureText(testLine);
                    if (metrics.width > maxWidth && n > 0) {
                        ctx.fillText(line, 50, descY + dy);
                        line = words[n] + ' ';
                        dy += 50;
                    } else {
                        line = testLine;
                    }
                }
                ctx.fillText(line, 50, descY + dy);

            } else if (themeId === 'grand-ballroom') {
                // ==========================================
                // GRAND BALLROOM RENDERER (VIDEO)
                // ==========================================

                // --- SETUP & TIMING ---
                const curtainDuration = 2500;

                // --- 1. BACKGROUND LAYER (Dark Atmosphere) ---
                const gradBg = ctx.createLinearGradient(0, 0, 0, canvas.height);
                gradBg.addColorStop(0, '#0f0505');
                gradBg.addColorStop(1, '#000000');
                ctx.fillStyle = gradBg;
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Radial Glow
                const radBg = ctx.createRadialGradient(centerX, canvas.height * 0.3, 0, centerX, canvas.height * 0.3, 800);
                radBg.addColorStop(0, '#3e0b0b');
                radBg.addColorStop(1, 'transparent');
                ctx.fillStyle = radBg;
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // --- 2. PARALLAX SILHOUETTES (Background) ---
                // Silhouettes behind the card
                const parallaxOffset = (elapsed * 0.05) % canvas.width;
                ctx.save();
                ctx.globalAlpha = 0.3;

                // Use shapes for silhouettes
                const people = [
                    { x: 100, s: 150 }, { x: 400, s: 120 }, { x: 800, s: 180 }, { x: 1200, s: 140 }
                ];
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

                // --- 3. MAIN CARD (Light Glass - Web Template Match) ---
                ctx.save();
                ctx.translate(centerX, 0);

                // 3D Entrance Animation
                let cardProgress = Math.min(1, Math.max(0, (elapsed - 500) / 1500));

                // Easing
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

                if (elapsed > 200) {

                    // Card Body (Light Glass)
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)'; // Light, matching web
                    ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)'; // Gold border
                    ctx.lineWidth = 1;

                    // Shadow
                    ctx.shadowColor = 'rgba(0,0,0,0.5)';
                    ctx.shadowBlur = 50 * currentScale;
                    ctx.shadowOffsetY = 30;

                    // Draw Card
                    ctx.fillRect(cardX, cardY, cardW, cardH);
                    ctx.shadowColor = 'transparent'; // Clear shadow for stroke
                    ctx.strokeRect(cardX, cardY, cardW, cardH);

                    // Inner Border (Double border effect)
                    ctx.strokeStyle = 'rgba(212, 175, 55, 0.2)';
                    ctx.strokeRect(cardX + 20, cardY + 20, cardW - 40, cardH - 40);

                    // -- CONTENT INSIDE CARD --

                    // Header
                    ctx.textAlign = 'center';
                    ctx.fillStyle = '#8B6508'; // Dark Gold
                    ctx.font = `bold ${24 * currentScale}px "Cinzel"`;
                    ctx.fillText('THE WEDDING CELEBRATION', 0, cardY + 200 * currentScale);

                    // Names (Gold Luxury Gradient simulated by Color)
                    const nameGrad = ctx.createLinearGradient(-300, 0, 300, 0);
                    nameGrad.addColorStop(0, '#bf953f');
                    nameGrad.addColorStop(0.2, '#fcf6ba'); // bright
                    nameGrad.addColorStop(0.5, '#b38728'); // dark gold
                    nameGrad.addColorStop(0.8, '#fbf5b7'); // bright
                    nameGrad.addColorStop(1, '#aa771c');

                    ctx.fillStyle = nameGrad;

                    // Groom
                    ctx.shadowColor = 'rgba(0,0,0,0.1)';
                    ctx.shadowBlur = 5;
                    ctx.font = `${100 * currentScale}px "Playfair Display"`;
                    ctx.fillText(data.content.couples.pria.name.split(' ')[0], 0, cardY + 400 * currentScale);

                    // Ampersand
                    ctx.fillStyle = '#333';
                    ctx.font = `${50 * currentScale}px "Cinzel"`;
                    ctx.fillText('&', 0, cardY + 480 * currentScale);

                    // Bride
                    ctx.fillStyle = nameGrad;
                    ctx.font = `${100 * currentScale}px "Playfair Display"`;
                    ctx.fillText(data.content.couples.wanita.name.split(' ')[0], 0, cardY + 600 * currentScale);

                    ctx.shadowBlur = 0;

                    // Separator Lines
                    ctx.beginPath();
                    ctx.moveTo(-50, cardY + 520 * currentScale);
                    ctx.globalAlpha = 0.5;
                    ctx.strokeStyle = '#D4AF37';
                    ctx.lineWidth = 1;
                    ctx.lineTo(50, cardY + 520 * currentScale);
                    ctx.stroke();
                    ctx.globalAlpha = 1.0;

                    // Photo Frame
                    const frameSize = 500 * currentScale;
                    const frameCenterY = cardY + 950 * currentScale;

                    ctx.save();
                    ctx.translate(0, frameCenterY);
                    ctx.rotate(-0.02); // Slight tilt

                    // Frame BG (White photo border)
                    ctx.fillStyle = '#fff';
                    ctx.shadowColor = 'rgba(0,0,0,0.1)';
                    ctx.shadowBlur = 10;
                    ctx.fillRect(-frameSize / 2 - 15, -frameSize * 0.7 - 15, frameSize + 30, frameSize * 1.4 + 30);

                    // Image
                    if (heroImg.complete && heroImg.naturalWidth > 0) {
                        ctx.drawImage(heroImg, -frameSize / 2, -frameSize * 0.7, frameSize, frameSize * 1.4);
                    } else {
                        ctx.fillStyle = '#eee';
                        ctx.fillRect(-frameSize / 2, -frameSize * 0.7, frameSize, frameSize * 1.4);
                    }
                    ctx.restore();

                    // Date Footer
                    const dateObj = new Date(data.content.hero.date);
                    const dateStr = `${dateObj.getDate()} . ${dateObj.getMonth() + 1} . ${dateObj.getFullYear()}`;
                    ctx.fillStyle = '#8B6508';
                    ctx.font = `${30 * currentScale}px "Cinzel"`;
                    ctx.fillText(dateStr, 0, cardY + cardH - 100 * currentScale);


                    // Chandelier inside card (top)
                    ctx.save();
                    const sway = Math.sin(elapsed / 1500) * 0.02;
                    ctx.translate(0, cardY);
                    ctx.rotate(sway);
                    ctx.scale(currentScale, currentScale);

                    ctx.strokeStyle = '#D4AF37';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(0, 0); ctx.lineTo(0, 60);
                    ctx.moveTo(0, 60); ctx.bezierCurveTo(-40, 90, -80, 90, -100, 70);
                    ctx.moveTo(0, 60); ctx.bezierCurveTo(40, 90, 80, 90, 100, 70);
                    ctx.stroke();

                    ctx.fillStyle = '#fff';
                    ctx.shadowColor = '#fff';
                    ctx.shadowBlur = 10;
                    [-100, 100, 0].forEach(tx => {
                        ctx.beginPath(); ctx.arc(tx, (tx === 0 ? 80 : 70), 4, 0, Math.PI * 2); ctx.fill();
                    });
                    ctx.restore();
                }
                ctx.restore();

                // --- 4. FOREGROUND BLUR SHAPES (Bokeh) ---
                // Shapes drifting in front of the card to create depth
                ctx.save();
                // We use a fixed seed-like behavior based on time
                const bokehCount = 6;
                const bokehTime = elapsed / 2000;

                for (let i = 0; i < bokehCount; i++) {
                    const size = 100 + (i * 50);
                    // Sin movement
                    const bx = (Math.sin(bokehTime + i * 1.5) * (canvas.width * 0.4)) + canvas.width / 2;
                    const by = (Math.cos(bokehTime * 0.7 + i) * (canvas.height * 0.4)) + canvas.height / 2;

                    const bokehGrad = ctx.createRadialGradient(bx, by, 0, bx, by, size);
                    // Gold/White bokeh
                    bokehGrad.addColorStop(0, 'rgba(255, 230, 150, 0.08)');
                    bokehGrad.addColorStop(1, 'rgba(255, 230, 150, 0)');

                    ctx.fillStyle = bokehGrad;
                    ctx.beginPath();
                    ctx.arc(bx, by, size, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();

                // --- 5. CURTAINS (Top Layer) ---
                let openProgress = Math.min(1, elapsed / curtainDuration);
                openProgress = openProgress < .5 ? 4 * openProgress * openProgress * openProgress : (openProgress - 1) * (2 * openProgress - 2) * (2 * openProgress - 2) + 1;

                const curtainW = canvas.width / 2;
                const moveDist = curtainW * openProgress;

                // Left Curtain
                ctx.save();
                ctx.translate(-moveDist, 0);
                const gradL = ctx.createLinearGradient(0, 0, curtainW, 0);
                gradL.addColorStop(0, '#4a0404');
                gradL.addColorStop(0.3, '#720e1e');
                gradL.addColorStop(0.5, '#8b1a2b');
                gradL.addColorStop(0.8, '#5e0b16');
                gradL.addColorStop(1, '#4a0404');
                ctx.fillStyle = gradL;
                ctx.fillRect(0, 0, curtainW, canvas.height);
                ctx.restore();

                // Right Curtain
                ctx.save();
                ctx.translate(moveDist, 0);
                const gradR = ctx.createLinearGradient(curtainW, 0, canvas.width, 0);
                gradR.addColorStop(0, '#4a0404');
                gradR.addColorStop(0.3, '#5e0b16');
                gradR.addColorStop(0.5, '#8b1a2b');
                gradR.addColorStop(0.7, '#720e1e');
                gradR.addColorStop(1, '#4a0404');
                ctx.fillStyle = gradR;
                ctx.fillRect(curtainW, 0, curtainW, canvas.height);
                ctx.restore();

                // OPEN Badge
                if (openProgress < 0.8) {
                    ctx.save();
                    const opacity = 1 - (openProgress * 1.5);
                    if (opacity > 0) {
                        ctx.globalAlpha = opacity;
                        ctx.translate(centerX, canvas.height / 2);
                        ctx.beginPath();
                        ctx.arc(0, 0, 80, 0, Math.PI * 2);
                        ctx.fillStyle = '#4a0404';
                        ctx.fill();
                        ctx.strokeStyle = '#FFD700';
                        ctx.lineWidth = 4;
                        ctx.stroke();

                        ctx.fillStyle = '#FFD700';
                        ctx.font = '24px "Cinzel"';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText('OPEN', 0, 0);
                    }
                    ctx.restore();
                }

            } else {
                // ==========================================
                // ROYAL GLASS RENDERER
                // ==========================================

                // BACKGROUND
                ctx.fillStyle = '#F9F7F2';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // ANIMATED BLOBS
                blobs.forEach(blob => {
                    const moveX = Math.sin(elapsed * blob.speed + blob.offset) * 50;
                    const moveY = Math.cos(elapsed * blob.speed + blob.offset) * 50;

                    const grad = ctx.createRadialGradient(
                        blob.x + moveX, blob.y + moveY, 0,
                        blob.x + moveX, blob.y + moveY, blob.r
                    );
                    grad.addColorStop(0, blob.color);
                    grad.addColorStop(1, 'rgba(255,255,255,0)');

                    ctx.fillStyle = grad;
                    ctx.beginPath();
                    ctx.arc(blob.x + moveX, blob.y + moveY, blob.r, 0, Math.PI * 2);
                    ctx.fill();
                });

                // FLORALS (Simplistic)
                ctx.strokeStyle = '#D4A5A5';
                ctx.lineWidth = 2;
                ctx.globalAlpha = 0.4;
                ctx.beginPath();
                ctx.moveTo(800, -50);
                ctx.bezierCurveTo(900, 100, 1100, 200, 900, 400);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(-100, 1800);
                ctx.bezierCurveTo(100, 1700, 300, 1900, 200, 2000);
                ctx.stroke();
                ctx.globalAlpha = 1.0;

                // CONTENT CONTAINER
                // Header Text
                ctx.textAlign = 'center';
                ctx.fillStyle = '#B8860B';
                ctx.font = '24px Montserrat';
                ctx.fillText('THE WEDDING OF', centerX, 200);

                // Names
                const gradient = ctx.createLinearGradient(centerX - 200, 0, centerX + 200, 0);
                gradient.addColorStop(0, '#8B6E4E');
                gradient.addColorStop(0.5, '#D4AF37');
                gradient.addColorStop(1, '#8B6E4E');
                ctx.fillStyle = gradient;

                const name1 = data.content.couples.pria.name.split(' ')[0]; // Fix: user Pria/Wanita consistently
                const name2 = data.content.couples.wanita.name.split(' ')[0] || 'Partner';

                ctx.font = '140px Pinyon Script';
                ctx.fillText(name1, centerX, 380);

                ctx.fillStyle = '#9CA3AF'; // Gray-400
                ctx.font = '60px Pinyon Script';
                ctx.fillText('&', centerX, 440);

                ctx.fillStyle = gradient;
                ctx.font = '140px Pinyon Script';
                ctx.fillText(name2, centerX, 580);

                // IMAGE FRAME (Arc Shape)
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(centerX - 350, 750);
                ctx.quadraticCurveTo(centerX, 600, centerX + 350, 750);
                ctx.lineTo(centerX + 350, 1500);
                ctx.lineTo(centerX - 350, 1500);
                ctx.closePath();
                ctx.clip();

                if (heroImg.complete && heroImg.naturalWidth > 0) {
                    const imgRatio = heroImg.naturalWidth / heroImg.naturalHeight;
                    const frameW = 700;
                    const frameH = 900;
                    const frameRatio = frameW / frameH;
                    let renderW, renderH, renderX, renderY;

                    if (imgRatio > frameRatio) {
                        renderH = frameH;
                        renderW = frameH * imgRatio;
                        renderX = centerX - 350 - (renderW - frameW) / 2;
                        renderY = 700;
                    } else {
                        renderW = frameW;
                        renderH = frameW / imgRatio;
                        renderX = centerX - 350;
                        renderY = 700 - (renderH - frameH) / 2;
                    }
                    ctx.drawImage(heroImg, renderX, renderY, renderW, renderH);
                } else {
                    ctx.fillStyle = '#eee';
                    ctx.fillRect(centerX - 350, 700, 700, 800);
                }

                // Overlay for Wish
                if (wish) {
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                    ctx.fillRect(centerX - 350, 600, 700, 1000);

                    ctx.fillStyle = '#2C2C2C';
                    ctx.font = 'italic 40px Cormorant Garamond';

                    const words = wish.split(' ');
                    let line = '';
                    let y = 1000;
                    const maxWidth = 500;
                    const lineHeight = 50;

                    for (let n = 0; n < words.length; n++) {
                        const testLine = line + words[n] + ' ';
                        const metrics = ctx.measureText(testLine);
                        if (metrics.width > maxWidth && n > 0) {
                            ctx.fillText(line, centerX, y);
                            line = words[n] + ' ';
                            y += lineHeight;
                        }
                        else {
                            line = testLine;
                        }
                    }
                    ctx.fillText(line, centerX, y);

                    ctx.fillStyle = '#B8860B';
                    ctx.font = 'bold 24px Montserrat';
                    ctx.fillText(guestName.toUpperCase(), centerX, y + 80);
                }
                ctx.restore();

                // Border
                ctx.strokeStyle = 'rgba(184, 134, 11, 0.3)';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(centerX - 350, 750);
                ctx.quadraticCurveTo(centerX, 600, centerX + 350, 750);
                ctx.lineTo(centerX + 350, 1500);
                ctx.lineTo(centerX - 350, 1500);
                ctx.closePath();
                ctx.stroke();

                // FOOTER
                const dateObj = new Date(data.content.hero.date);
                const dateStr = `${dateObj.getDate()} • ${dateObj.getMonth() + 1} • ${dateObj.getFullYear()}`;

                ctx.fillStyle = '#374151';
                ctx.font = '48px Cormorant Garamond';
                ctx.fillText(dateStr, centerX, 1650);

                ctx.fillStyle = '#6B7280';
                ctx.font = '18px Montserrat';
                ctx.fillText('SAVE THE DATE', centerX, 1700);

                // FALLING LEAVES
                leaves.forEach(leaf => {
                    leaf.y += leaf.speedY;
                    leaf.x += leaf.speedX;
                    leaf.rotation += leaf.rotationSpeed;
                    if (leaf.y > canvas.height) {
                        leaf.y = -50;
                        leaf.x = Math.random() * canvas.width;
                    }
                    ctx.save();
                    ctx.translate(leaf.x, leaf.y);
                    ctx.rotate((leaf.rotation * Math.PI) / 180);
                    ctx.fillStyle = '#D4A5A5';
                    ctx.globalAlpha = leaf.opacity;
                    ctx.beginPath();
                    ctx.ellipse(0, 0, leaf.size, leaf.size / 2, 0, 0, Math.PI * 2);
                    ctx.fill();
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
