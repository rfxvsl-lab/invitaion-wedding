import { useEffect, useRef } from 'react';
import { InvitationData } from '../types/invitation';

interface RenderProps {
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    data: InvitationData;
    guestName: string;
    wish: string;
    isActive: boolean;
}

export const useRoyalGlassRender = ({ canvasRef, data, guestName, wish, isActive }: RenderProps) => {
    const requestRef = useRef<number>(0);
    const startTimeRef = useRef<number>(0);

    useEffect(() => {
        if (!isActive || !canvasRef.current) {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            return;
        }

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Assets
        // Removed external texture to prevent CORS/Tainting issues
        // const textureImg = new Image(); ...

        const heroImg = new Image();
        heroImg.crossOrigin = "anonymous"; // Essential for Unsplash/External
        heroImg.src = data.content.hero.main_image || "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
        // Ensure image is loaded (simplified for this hook, in production might need preloader)

        // Blobs Configuration
        const blobs = [
            { x: 100, y: 100, r: 300, color: 'rgba(253, 226, 228, 0.4)', speed: 0.0005, offset: 0 }, // Rose
            { x: 900, y: 1700, r: 250, color: 'rgba(252, 231, 243, 0.4)', speed: 0.0007, offset: 2 }, // Amber/Pinkish
        ];

        // Leaves Configuration
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

        const animate = (time: number) => {
            if (!startTimeRef.current) startTimeRef.current = time;
            const elapsed = time - startTimeRef.current;

            // CLEAR
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // BACKGROUND
            ctx.fillStyle = '#F9F7F2';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // TEXTURE (Tiled) - Removed in favor of procedural noise
            // if (textureImg.complete) { ... }

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

            // FLORALS (Simplistic Bezier Curves as placeholders for complex SVGs)
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
            const centerX = canvas.width / 2;

            // Header Text
            ctx.textAlign = 'center';
            ctx.fillStyle = '#B8860B';
            ctx.font = '24px Montserrat'; // Fallback
            // Ideally we'd check document.fonts.check() but skipping for simplicity
            ctx.fillText('THE WEDDING OF', centerX, 200);

            // Names
            // Gold Gradient Text
            const gradient = ctx.createLinearGradient(centerX - 200, 0, centerX + 200, 0);
            gradient.addColorStop(0, '#8B6E4E');
            gradient.addColorStop(0.5, '#D4AF37');
            gradient.addColorStop(1, '#8B6E4E');
            ctx.fillStyle = gradient;

            const name1 = data.content.hero.nicknames.split('&')[0];
            const name2 = data.content.hero.nicknames.split('&')[1] || 'Partner';

            ctx.font = '140px Pinyon Script'; // Fallback to serif
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
            // Draw Arch shape
            ctx.moveTo(centerX - 350, 750); // Top-Left start of curve
            ctx.quadraticCurveTo(centerX, 600, centerX + 350, 750); // Top Curve
            ctx.lineTo(centerX + 350, 1500); // Right side
            ctx.lineTo(centerX - 350, 1500); // Bottom side
            ctx.closePath();

            // Clip
            ctx.clip();

            // Draw Image
            if (heroImg.complete && heroImg.naturalWidth > 0) {
                // Calculate cover fit
                const imgRatio = heroImg.naturalWidth / heroImg.naturalHeight;
                const frameW = 700;
                const frameH = 900; // Approx height
                const frameRatio = frameW / frameH;

                let renderW, renderH, renderX, renderY;

                if (imgRatio > frameRatio) {
                    renderH = frameH;
                    renderW = frameH * imgRatio;
                    renderX = centerX - 350 - (renderW - frameW) / 2;
                    renderY = 700; // Start Y roughly
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
                ctx.fillRect(centerX - 350, 600, 700, 1000); // Cover the whole clip area roughly

                // Wish Text
                ctx.fillStyle = '#2C2C2C';
                ctx.font = 'italic 40px Cormorant Garamond';

                // Word Wrap Logic
                const words = wish.split(' ');
                let line = '';
                let y = 1000;
                const maxWidth = 500;
                const lineHeight = 50;

                for (let n = 0; n < words.length; n++) {
                    const testLine = line + words[n] + ' ';
                    const metrics = ctx.measureText(testLine);
                    const testWidth = metrics.width;
                    if (testWidth > maxWidth && n > 0) {
                        ctx.fillText(line, centerX, y);
                        line = words[n] + ' ';
                        y += lineHeight;
                    }
                    else {
                        line = testLine;
                    }
                }
                ctx.fillText(line, centerX, y);

                // Guest Name
                ctx.fillStyle = '#B8860B';
                ctx.font = 'bold 24px Montserrat';
                ctx.fillText(guestName.toUpperCase(), centerX, y + 80);
            }
            ctx.restore(); // Remove clip

            // Border for Frame
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
                // Update pos
                leaf.y += leaf.speedY;
                leaf.x += leaf.speedX;
                leaf.rotation += leaf.rotationSpeed;

                if (leaf.y > canvas.height) {
                    leaf.y = -50;
                    leaf.x = Math.random() * canvas.width;
                }

                // Draw Leaf (Simple Ellipse or path)
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

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [isActive, canvasRef, data, guestName, wish]);
};
