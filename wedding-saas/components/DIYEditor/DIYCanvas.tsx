/**
 * DIY Canvas Component
 * Drag-drop canvas for template customization
 */

import React, { useRef, useState, useCallback } from 'react';
import { DIYElement } from '@/types/invitation';
import { getAssetById } from '@/lib/diyAssets';

interface DIYCanvasProps {
    elements: DIYElement[];
    selectedElement: DIYElement | null;
    onSelectElement: (id: string | null) => void;
    onMoveElement: (id: string, x: number, y: number) => void;
    onResizeElement: (id: string, width: number, height: number) => void;
    onRotateElement: (id: string, rotation: number) => void;
}

export default function DIYCanvas({
    elements,
    selectedElement,
    onSelectElement,
    onMoveElement,
    onResizeElement,
    onRotateElement,
}: DIYCanvasProps) {
    const canvasRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [elementStart, setElementStart] = useState({ x: 0, y: 0 });

    const handleMouseDown = useCallback((e: React.MouseEvent, element: DIYElement) => {
        if (element.locked) return;

        e.stopPropagation();
        onSelectElement(element.id);

        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        setDragStart({
            x: e.clientX,
            y: e.clientY,
        });
        setElementStart({
            x: element.position.x,
            y: element.position.y,
        });
        setIsDragging(true);
    }, [onSelectElement]);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isDragging || !selectedElement || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();

        const deltaX = ((e.clientX - dragStart.x) / rect.width) * 100;
        const deltaY = ((e.clientY - dragStart.y) / rect.height) * 100;

        const newX = Math.max(0, Math.min(100 - selectedElement.size.width, elementStart.x + deltaX));
        const newY = Math.max(0, Math.min(100 - selectedElement.size.height, elementStart.y + deltaY));

        onMoveElement(selectedElement.id, newX, newY);
    }, [isDragging, selectedElement, dragStart, elementStart, onMoveElement]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
        setIsResizing(false);
    }, []);

    React.useEffect(() => {
        if (isDragging || isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isDragging, isResizing, handleMouseMove, handleMouseUp]);

    const handleCanvasClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onSelectElement(null);
        }
    };

    return (
        <div
            ref={canvasRef}
            onClick={handleCanvasClick}
            className="relative w-full aspect-[3/4] bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-dashed border-slate-300 rounded-xl overflow-hidden cursor-default"
            style={{ minHeight: '500px' }}
        >
            {/* Helper Grid */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="grid grid-cols-12 grid-rows-12 w-full h-full">
                    {Array.from({ length: 144 }).map((_, i) => (
                        <div key={i} className="border border-slate-400" />
                    ))}
                </div>
            </div>

            {/* Elements */}
            {elements.map((element) => {
                const isSelected = selectedElement?.id === element.id;
                const asset = element.assetId ? getAssetById(element.assetId) : null;

                return (
                    <div
                        key={element.id}
                        onMouseDown={(e) => handleMouseDown(e, element)}
                        className={`absolute cursor-move transition-shadow ${isSelected ? 'ring-2 ring-purple-500 shadow-lg' : ''
                            } ${element.locked ? 'cursor-not-allowed opacity-70' : ''}`}
                        style={{
                            left: `${element.position.x}%`,
                            top: `${element.position.y}%`,
                            width: `${element.size.width}%`,
                            height: `${element.size.height}%`,
                            transform: `rotate(${element.rotation}deg)`,
                            zIndex: element.zIndex,
                        }}
                    >
                        {/* Element Content */}
                        <div className="w-full h-full flex items-center justify-center">
                            {element.type === 'text' && (
                                <p
                                    className="font-bold text-center px-2"
                                    style={{
                                        fontSize: `${element.content?.fontSize || 16}px`,
                                        fontFamily: element.content?.fontFamily || 'inherit',
                                        color: element.content?.color || '#000',
                                    }}
                                >
                                    {element.content?.text || 'Text'}
                                </p>
                            )}

                            {element.type === 'image' && element.content?.imageUrl && (
                                <img
                                    src={element.content.imageUrl}
                                    alt="Custom"
                                    className="w-full h-full object-cover rounded"
                                />
                            )}

                            {(element.type === 'icon' || element.type === 'frame' || element.type === 'sticker' || element.type === 'shape') && asset?.svg && (
                                <div
                                    className="w-full h-full"
                                    style={{ color: element.content?.color || '#8b5cf6' }}
                                    dangerouslySetInnerHTML={{ __html: asset.svg }}
                                />
                            )}
                        </div>

                        {/* Selection Handles */}
                        {isSelected && !element.locked && (
                            <>
                                {/* Resize Handles */}
                                <div className="absolute -top-1 -left-1 w-3 h-3 bg-purple-600 border-2 border-white rounded-full cursor-nwse-resize" />
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-600 border-2 border-white rounded-full cursor-nesw-resize" />
                                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-purple-600 border-2 border-white rounded-full cursor-nesw-resize" />
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-purple-600 border-2 border-white rounded-full cursor-nwse-resize" />

                                {/* Rotation Handle */}
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-3 h-3 bg-pink-500 border-2 border-white rounded-full cursor-grab" />
                            </>
                        )}

                        {/* Lock Icon */}
                        {element.locked && (
                            <div className="absolute top-1 right-1 bg-slate-900/60 text-white rounded px-1 py-0.5">
                                <span className="text-[10px]">🔒</span>
                            </div>
                        )}
                    </div>
                );
            })}

            {/* Empty State */}
            {elements.length === 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 pointer-events-none">
                    <svg className="w-20 h-20 mb-4 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 17L12 22L22 17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 12L12 17L22 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-sm font-bold">No elements yet</p>
                    <p className="text-xs">Add assets from the library →</p>
                </div>
            )}

            {/* Canvas Info */}
            <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 text-[9px] text-slate-600 font-mono pointer-events-none">
                Elements: {elements.length} | Selected: {selectedElement ? '1' : '0'}
            </div>
        </div>
    );
}
