/**
 * DIY Toolbar Component
 * Quick actions for DIY editor
 */

import React from 'react';
import { Undo2, Redo2, Save, Download, Plus, Type } from 'lucide-react';

interface DIYToolbarProps {
    canUndo: boolean;
    canRedo: boolean;
    onUndo: () => void;
    onRedo: () => void;
    onSave: () => void;
    onAddText: () => void;
}

export default function DIYToolbar({
    canUndo,
    canRedo,
    onUndo,
    onRedo,
    onSave,
    onAddText,
}: DIYToolbarProps) {
    return (
        <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm">
            <div className="flex items-center gap-2">
                {/* History */}
                <div className="flex gap-1">
                    <button
                        onClick={onUndo}
                        disabled={!canUndo}
                        className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        title="Undo"
                    >
                        <Undo2 size={16} className="text-slate-700" />
                    </button>
                    <button
                        onClick={onRedo}
                        disabled={!canRedo}
                        className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        title="Redo"
                    >
                        <Redo2 size={16} className="text-slate-700" />
                    </button>
                </div>

                <div className="w-px h-6 bg-slate-200" />

                {/* Add Elements */}
                <button
                    onClick={onAddText}
                    className="flex items-center gap-1.5 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg px-3 py-1.5 text-[10px] font-bold transition-colors"
                >
                    <Type size={14} />
                    Add Text
                </button>

                <div className="flex-1" />

                {/* Save */}
                <button
                    onClick={onSave}
                    className="flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg px-4 py-2 text-xs font-bold transition-all shadow-sm hover:shadow-md"
                >
                    <Save size={14} />
                    Save Layout
                </button>
            </div>
        </div>
    );
}
