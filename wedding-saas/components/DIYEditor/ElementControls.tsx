/**
 * Element Controls Component
 * Edit properties of selected element
 */

import React from 'react';
import { Trash2, Copy, Lock, Unlock, MoveUp, MoveDown } from 'lucide-react';
import { DIYElement } from '@/types/invitation';

interface ElementControlsProps {
    element: DIYElement | null;
    onUpdate: (updates: Partial<DIYElement>) => void;
    onDelete: () => void;
    onDuplicate: () => void;
    onLock: (locked: boolean) => void;
    onBringForward: () => void;
    onSendBackward: () => void;
}

export default function ElementControls({
    element,
    onUpdate,
    onDelete,
    onDuplicate,
    onLock,
    onBringForward,
    onSendBackward,
}: ElementControlsProps) {
    if (!element) {
        return (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center">
                <p className="text-sm text-slate-400">
                    Select an element to edit properties
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                    <h4 className="text-xs font-black text-slate-700 uppercase">
                        {element.type} Properties
                    </h4>
                    <p className="text-[9px] text-slate-500 font-mono">{element.id}</p>
                </div>
            </div>

            {/* Text Properties */}
            {element.type === 'text' && (
                <div className="space-y-3">
                    <div>
                        <label className="block text-[10px] font-bold text-slate-600 mb-1">Text Content</label>
                        <input
                            type="text"
                            value={element.content?.text || ''}
                            onChange={(e) => onUpdate({ content: { ...element.content, text: e.target.value } })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-600 mb-1">Font Size</label>
                            <input
                                type="number"
                                value={element.content?.fontSize || 16}
                                onChange={(e) => onUpdate({ content: { ...element.content, fontSize: parseInt(e.target.value) } })}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                                min="8"
                                max="72"
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-slate-600 mb-1">Color</label>
                            <input
                                type="color"
                                value={element.content?.color || '#000000'}
                                onChange={(e) => onUpdate({ content: { ...element.content, color: e.target.value } })}
                                className="w-full h-9 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Icon/Frame/Sticker Color */}
            {(element.type === 'icon' || element.type === 'frame' || element.type === 'sticker' || element.type === 'shape') && (
                <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">Color</label>
                    <input
                        type="color"
                        value={element.content?.color || '#8b5cf6'}
                        onChange={(e) => onUpdate({ content: { ...element.content, color: e.target.value } })}
                        className="w-full h-10 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer"
                    />
                </div>
            )}

            {/* Transform */}
            <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="block text-[10px] font-bold text-slate-600 mb-1">X Position (%)</label>
                        <input
                            type="number"
                            value={Math.round(element.position.x)}
                            onChange={(e) => onUpdate({ position: { ...element.position, x: parseFloat(e.target.value) } })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                            min="0"
                            max="100"
                            step="1"
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-slate-600 mb-1">Y Position (%)</label>
                        <input
                            type="number"
                            value={Math.round(element.position.y)}
                            onChange={(e) => onUpdate({ position: { ...element.position, y: parseFloat(e.target.value) } })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                            min="0"
                            max="100"
                            step="1"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="block text-[10px] font-bold text-slate-600 mb-1">Width (%)</label>
                        <input
                            type="number"
                            value={Math.round(element.size.width)}
                            onChange={(e) => onUpdate({ size: { ...element.size, width: parseFloat(e.target.value) } })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                            min="5"
                            max="100"
                            step="1"
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-slate-600 mb-1">Height (%)</label>
                        <input
                            type="number"
                            value={Math.round(element.size.height)}
                            onChange={(e) => onUpdate({ size: { ...element.size, height: parseFloat(e.target.value) } })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                            min="5"
                            max="100"
                            step="1"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">Rotation (°)</label>
                    <input
                        type="range"
                        value={element.rotation}
                        onChange={(e) => onUpdate({ rotation: parseFloat(e.target.value) })}
                        className="w-full"
                        min="0"
                        max="360"
                        step="1"
                    />
                    <p className="text-[10px] text-slate-500 text-center mt-1">{element.rotation}°</p>
                </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
                <button
                    onClick={() => onLock(!element.locked)}
                    className="flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg px-3 py-2 text-[10px] font-bold transition-colors"
                >
                    {element.locked ? <Unlock size={12} /> : <Lock size={12} />}
                    {element.locked ? 'Unlock' : 'Lock'}
                </button>

                <button
                    onClick={onDuplicate}
                    className="flex items-center justify-center gap-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg px-3 py-2 text-[10px] font-bold transition-colors"
                >
                    <Copy size={12} />
                    Duplicate
                </button>

                <button
                    onClick={onBringForward}
                    className="flex items-center justify-center gap-1.5 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg px-3 py-2 text-[10px] font-bold transition-colors"
                >
                    <MoveUp size={12} />
                    Forward
                </button>

                <button
                    onClick={onSendBackward}
                    className="flex items-center justify-center gap-1.5 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg px-3 py-2 text-[10px] font-bold transition-colors"
                >
                    <MoveDown size={12} />
                    Backward
                </button>
            </div>

            <button
                onClick={onDelete}
                className="w-full flex items-center justify-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg px-3 py-2.5 text-xs font-bold transition-colors"
            >
                <Trash2 size={14} />
                Delete Element
            </button>
        </div>
    );
}
