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
