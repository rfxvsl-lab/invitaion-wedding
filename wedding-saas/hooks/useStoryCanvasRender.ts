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

                // --- TIME MANAGEMENT ---
                const curtainDuration = 2000; // 2s curtain open speed
                // Start parallax immediately, but content fades in

                // --- 1. PARALLAX BACKGROUND LAYER ---
                // Base Dark Background
                const gradBg = ctx.createLinearGradient(0, 0, 0, canvas.height);
                gradBg.addColorStop(0, '#0f0505');
                gradBg.addColorStop(1, '#000000');
                ctx.fillStyle = gradBg;
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Parallax Silhouettes (Simulated)
                // We move them slowly based on time
                const parallaxOffset = (elapsed * 0.05) % canvas.width;

                ctx.save();
                ctx.globalAlpha = 0.3;

                // Draw multiple silhouettes with parallax
                const people = [
                    { x: 100, s: 150 }, { x: 400, s: 120 }, { x: 800, s: 180 }, { x: 1200, s: 140 }
                ];

                people.forEach(p => {
                    let currentX = p.x - parallaxOffset;
                    if (currentX < -200) currentX += canvas.width + 400; // Wrap around

                    // Shadow for "blur" effect
                    ctx.shadowColor = 'black';
                    ctx.shadowBlur = 20;
                    ctx.fillStyle = '#000';

                    ctx.beginPath();
                    // Draw a simple body shape
                    ctx.ellipse(currentX, canvas.height - 200, p.s / 2, p.s, 0, 0, Math.PI * 2);
                    // Draw head
                    ctx.arc(currentX, canvas.height - 200 - p.s, p.s / 2.5, 0, Math.PI * 2);
                    ctx.fill();
                });
                ctx.restore();


                // --- 2. MAIN CARD CONTENT (Appears behind curtain) ---
                ctx.save();

                // Spotlights behind the card
                const swing = Math.sin(elapsed / 2000) * 0.1;
                ctx.translate(centerX, 0);

                // Card Animation Entrance (Stage Up)
                // In template: rotateX(20deg) scale(0.8) translateY(100px) -> normal
                // We approximate this 3D entrance in 2D canvas via scaling and rising Y

                let cardProgress = Math.min(1, Math.max(0, (elapsed - 500) / 1500)); // Start after 0.5s, take 1.5s
                // Cubic ease out
                cardProgress = 1 - Math.pow(1 - cardProgress, 3);

                const startScale = 0.8;
                const endScale = 1;
                const currentScale = startScale + (endScale - startScale) * cardProgress;

                const startYOffset = 200;
                const endYOffset = 0;
                const currentYOffset = startYOffset + (endYOffset - startYOffset) * cardProgress;

                // If curtain is not open enough, we might hide content, but let's show it peeking

                const cardW = 900 * currentScale;
                const cardH = 1500 * currentScale;
                const cardX = -cardW / 2; // Since we translated to centerX
                const cardY = ((canvas.height - cardH) / 2) + currentYOffset;

                // Only draw if opacity > 0
                if (elapsed > 200) {
                    // Draw Spotlights (Rotating)
                    ctx.save();
                    ctx.rotate(swing);
                    const spotGrad = ctx.createRadialGradient(0, -200, 0, 0, 500, 1500);
                    spotGrad.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
                    spotGrad.addColorStop(1, 'transparent');
                    ctx.fillStyle = spotGrad;
                    ctx.beginPath();
                    ctx.moveTo(-50, -200);
                    ctx.lineTo(50, -200);
                    ctx.lineTo(400, 2000);
                    ctx.lineTo(-400, 2000);
                    ctx.fill();
                    ctx.restore();


                    // Glass Background
                    ctx.fillStyle = 'rgba(25, 25, 25, 0.9)'; // Dark backing
                    ctx.strokeStyle = '#D4AF37';
                    ctx.lineWidth = 2 * currentScale;

                    // Shadow
                    ctx.shadowColor = 'rgba(0,0,0,0.5)';
                    ctx.shadowBlur = 40 * currentScale;
                    ctx.shadowOffsetX = 0;
                    ctx.shadowOffsetY = 20 * currentScale;

                    // Draw Card Rect
                    ctx.fillRect(cardX, cardY, cardW, cardH);
                    ctx.shadowColor = 'transparent'; // Clear shadow for stroke
                    ctx.strokeRect(cardX, cardY, cardW, cardH);

                    // Texture Pattern (Diamond) inside Card
                    ctx.save();
                    ctx.beginPath();
                    ctx.rect(cardX, cardY, cardW, cardH);
                    ctx.clip();
                    // Draw faint diamonds
                    /*                    ctx.strokeStyle = 'rgba(212, 175, 55, 0.05)';
                                        ctx.lineWidth = 1;
                                        const diagSpacing = 40 * currentScale;
                                        // ... complex diagonal loop skipped for perf, using simple grid
                    */
                    ctx.restore();


                    // -- CONTENT INSIDE CARD --

                    // 1. Chandelier (Inside the card at top)
                    // Sway animation
                    ctx.save();
                    const chandelierSway = Math.sin(elapsed / 2000) * 0.02;
                    ctx.translate(0, cardY); // Top center of card
                    ctx.rotate(chandelierSway);

                    const chandScale = currentScale * 1.0;
                    ctx.scale(chandScale, chandScale);

                    // Draw Chandelier Logic
                    ctx.strokeStyle = '#D4AF37';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    // Stem
                    ctx.moveTo(0, 0); ctx.lineTo(0, 80);
                    // Arms
                    ctx.moveTo(0, 80); ctx.bezierCurveTo(-60, 120, -120, 120, -140, 90);
                    ctx.moveTo(0, 80); ctx.bezierCurveTo(60, 120, 120, 120, 140, 90);
                    ctx.stroke();
                    // Candles/Lights
                    ctx.fillStyle = '#fff';
                    ctx.shadowColor = '#fff';
                    ctx.shadowBlur = 10;
                    [-140, 140, 0].forEach(pX => {
                        ctx.beginPath(); ctx.arc(pX, (pX === 0 ? 100 : 90), 4, 0, Math.PI * 2); ctx.fill();
                    });

                    ctx.restore();


                    // 2. Text & Image
                    // Names
                    ctx.textAlign = 'center';

                    // "The Wedding Celebration"
                    ctx.fillStyle = '#8B6508';
                    ctx.font = `bold ${30 * currentScale}px "Cinzel"`;
                    ctx.fillText('THE WEDDING CELEBRATION', 0, cardY + 250 * currentScale);

                    // Groom
                    ctx.shadowColor = 'rgba(212, 175, 55, 0.3)';
                    ctx.shadowBlur = 10;
                    ctx.fillStyle = '#FFFFFF'; // or Gold gradient simulation
                    ctx.font = `${100 * currentScale}px "Playfair Display"`;
                    ctx.fillText(data.content.couples.pria.name.split(' ')[0], 0, cardY + 450 * currentScale);

                    // Ampersand
                    ctx.fillStyle = '#D4AF37';
                    ctx.font = `${60 * currentScale}px "Cinzel"`;
                    ctx.fillText('&', 0, cardY + 540 * currentScale);

                    // Bride
                    ctx.fillStyle = '#FFFFFF';
                    ctx.font = `${100 * currentScale}px "Playfair Display"`;
                    ctx.fillText(data.content.couples.wanita.name.split(' ')[0], 0, cardY + 650 * currentScale);

                    ctx.shadowBlur = 0; // Reset

                    // Photo Area (Rotated Frame simulated)
                    const frameSize = 500 * currentScale;
                    const frameCenterY = cardY + 1000 * currentScale; // Lower down

                    ctx.save();
                    ctx.translate(0, frameCenterY);
                    ctx.rotate(-0.03); // Tilt

                    // White border bg
                    ctx.fillStyle = '#f8f8f8';
                    ctx.shadowColor = 'rgba(0,0,0,0.2)';
                    ctx.shadowBlur = 20;
                    ctx.fillRect(-frameSize / 2 - 20, -frameSize * 0.7 - 20, frameSize + 40, frameSize * 1.4 + 40);

                    // Image
                    if (heroImg.complete && heroImg.naturalWidth > 0) {
                        ctx.drawImage(heroImg, -frameSize / 2, -frameSize * 0.7, frameSize, frameSize * 1.4);
                    } else {
                        ctx.fillStyle = '#ccc';
                        ctx.fillRect(-frameSize / 2, -frameSize * 0.7, frameSize, frameSize * 1.4);
                    }

                    ctx.restore();

                    // Date Footer
                    const dateObj = new Date(data.content.hero.date);
                    const dateStr = `${dateObj.getDate()} . ${dateObj.getMonth() + 1} . ${dateObj.getFullYear()}`;
                    ctx.fillStyle = '#D4AF37';
                    ctx.font = `${30 * currentScale}px "Cinzel"`;
                    ctx.fillText(dateStr, 0, cardY + cardH - 100 * currentScale);
                }

                ctx.restore();


                // --- 3. CURTAINS (Foreground) ---
                // Open Progress from 0 to 1
                let openProgress = Math.min(1, elapsed / curtainDuration);
                // Cubic ease in-out for smooth movement
                openProgress = openProgress < .5 ? 4 * openProgress * openProgress * openProgress : (openProgress - 1) * (2 * openProgress - 2) * (2 * openProgress - 2) + 1;

                // Max open width (curtains basically disappear offscreen or stay on edges)
                // Let's say they move 60% of width to sides
                const moveDist = (canvas.width / 2) * openProgress;

                // Left Curtain
                ctx.save();
                ctx.translate(-moveDist, 0); // Move Left

                // Draw Left Curtain Rect (Covering left half)
                // Gradient for folds
                const gradL = ctx.createLinearGradient(0, 0, canvas.width / 2, 0);
                gradL.addColorStop(0, '#4a0404');
                gradL.addColorStop(0.3, '#720e1e');
                gradL.addColorStop(0.5, '#8b1a2b'); // Light fold
                gradL.addColorStop(0.8, '#5e0b16');
                gradL.addColorStop(1, '#4a0404');
                ctx.fillStyle = gradL;

                // Draw scaled curtain (squeezing effect?)
                // Simple translate is safer for canvas than non-uniform scaling which distorts gradient oddly
                ctx.fillRect(0, 0, canvas.width / 2, canvas.height);
                ctx.restore();

                // Right Curtain
                ctx.save();
                ctx.translate(moveDist, 0); // Move Right

                const gradR = ctx.createLinearGradient(canvas.width / 2, 0, canvas.width, 0);
                gradR.addColorStop(0, '#4a0404');
                gradR.addColorStop(0.3, '#5e0b16');
                gradR.addColorStop(0.5, '#8b1a2b');
                gradR.addColorStop(0.7, '#720e1e');
                gradR.addColorStop(1, '#4a0404');
                ctx.fillStyle = gradR;

                ctx.fillRect(canvas.width / 2, 0, canvas.width / 2, canvas.height);
                ctx.restore();


                // Center Open Badge (Fades out)
                if (openProgress < 0.8) {
                    ctx.save();
                    const opacity = 1 - (openProgress * 1.5); // Fade out fast
                    if (opacity > 0) {
                        ctx.globalAlpha = opacity;
                        ctx.translate(centerX, canvas.height / 2);
                        // Gold Circle
                        ctx.beginPath();
                        ctx.arc(0, 0, 80, 0, Math.PI * 2);
                        ctx.fillStyle = '#4a0404'; // Dark red
                        ctx.fill();
                        ctx.strokeStyle = '#FFD700';
                        ctx.lineWidth = 4;
                        ctx.stroke();

                        // Text 'OPEN'
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
