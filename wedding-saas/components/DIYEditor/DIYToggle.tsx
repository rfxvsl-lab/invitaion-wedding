/**
 * DIY Toggle Component
 * Enable/disable DIY customization mode
 */

import React from 'react';
import { Wand2, RotateCcw } from 'lucide-react';

interface DIYToggleProps {
    enabled: boolean;
    onToggle: () => void;
    onReset: () => void;
    plan: 'free' | 'basic' | 'premium' | 'exclusive';
}

export default function DIYToggle({ enabled, onToggle, onReset, plan }: DIYToggleProps) {
    // Only Premium and Exclusive tiers can access DIY
    const canAccessDIY = plan === 'premium' || plan === 'exclusive';

    if (!canAccessDIY) {
        return (
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-4 mb-4">
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                        <Wand2 size={20} className="text-purple-600" />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-sm text-purple-900 mb-1">
                            🎨 DIY Customization
                        </h4>
                        <p className="text-xs text-purple-700 mb-2">
                            Customize posisi, tambah dekorasi, dan atur layout sesuka hati!
                        </p>
                        <p className="text-xs font-bold text-purple-900">
                            🔒 Upgrade ke <span className="text-pink-600">Premium</span> untuk unlock!
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-purple-600 rounded-lg">
                        <Wand2 size={16} className="text-white" />
                    </div>
                    <h4 className="font-bold text-sm text-purple-900">
                        DIY Mode
                    </h4>
                    <span className="text-[8px] bg-gradient-to-r from-purple-600 to-pink-600 text-white px-2 py-0.5 rounded-full font-bold uppercase">
                        {plan === 'exclusive' ? 'VIP' : 'Pro'}
                    </span>
                </div>

                <button
                    onClick={onToggle}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${enabled ? 'bg-purple-600' : 'bg-gray-300'
                        }`}
                >
                    <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'
                            }`}
                    />
                </button>
            </div>

            <p className="text-[10px] text-purple-700 mb-3">
                {enabled
                    ? '✨ Drag elements, resize, rotate, dan tambah dekorasi!'
                    : 'Aktifkan untuk mulai customize template Anda.'
                }
            </p>

            {enabled && (
                <button
                    onClick={onReset}
                    className="w-full bg-white border border-purple-300 text-purple-700 rounded-lg px-3 py-2 text-xs font-bold hover:bg-purple-50 transition-colors flex items-center justify-center gap-2"
                >
                    <RotateCcw size={14} />
                    Reset to Default
                </button>
            )}
        </div>
    );
}
