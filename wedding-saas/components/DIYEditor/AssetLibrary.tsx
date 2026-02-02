/**
 * Asset Library Component
 * Browse and add decorative elements to template
 */

import React, { useState } from 'react';
import { Heart, Frame, Sticker, Shapes, Type, Plus } from 'lucide-react';
import { DIY_ICONS, DIY_FRAMES, DIY_STICKERS, DIY_SHAPES, DIY_FONTS, getAssetsByCategory, type DIYAsset } from '@/lib/diyAssets';

interface AssetLibraryProps {
    onAddAsset: (asset: DIYAsset) => void;
    plan: 'free' | 'basic' | 'premium' | 'exclusive';
}

type Category = 'icon' | 'frame' | 'sticker' | 'shape' | 'font';

const CATEGORIES = [
    { id: 'icon' as Category, label: 'Icons', icon: Heart, count: DIY_ICONS.length },
    { id: 'frame' as Category, label: 'Frames', icon: Frame, count: DIY_FRAMES.length },
    { id: 'sticker' as Category, label: 'Stickers', icon: Sticker, count: DIY_STICKERS.length },
    { id: 'shape' as Category, label: 'Shapes', icon: Shapes, count: DIY_SHAPES.length },
    { id: 'font' as Category, label: 'Fonts', icon: Type, count: DIY_FONTS.length },
];

export default function AssetLibrary({ onAddAsset, plan }: AssetLibraryProps) {
    const [selectedCategory, setSelectedCategory] = useState<Category>('icon');
    const [expandedCount, setExpandedCount] = useState(6);

    const assets = getAssetsByCategory(selectedCategory);
    const fonts = selectedCategory === 'font' ? DIY_FONTS : [];
    const displayAssets = assets.slice(0, expandedCount);
    const hasMore = assets.length > expandedCount;

    const canAccessPremiumAsset = plan === 'premium' || plan === 'exclusive';

    const handleAddAsset = (asset: DIYAsset) => {
        if (asset.premium && !canAccessPremiumAsset) {
            alert('🔒 Asset ini memerlukan tier Exclusive!');
            return;
        }
        onAddAsset(asset);
    };

    return (
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                <div className="p-1.5 bg-purple-50 rounded-lg text-purple-600">
                    <Frame size={14} />
                </div>
                <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider">
                    Asset Library
                </h3>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-1 mb-4 overflow-x-auto pb-2">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => {
                            setSelectedCategory(cat.id);
                            setExpandedCount(6);
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all whitespace-nowrap ${selectedCategory === cat.id
                                ? 'bg-purple-600 text-white shadow-sm'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                    >
                        <cat.icon size={12} />
                        {cat.label}
                        <span className={`text-[8px] px-1.5 py-0.5 rounded-full ${selectedCategory === cat.id ? 'bg-white/20' : 'bg-slate-200'
                            }`}>
                            {cat.count}
                        </span>
                    </button>
                ))}
            </div>

            {/* Assets Grid */}
            {selectedCategory === 'font' ? (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                    {fonts.map(font => (
                        <button
                            key={font.id}
                            onClick={() => {
                                // Font selection logic
                                console.log('Font selected:', font);
                            }}
                            className={`w-full text-left p-3 rounded-lg border transition-all hover:border-purple-300 hover:shadow-sm ${font.premium && !canAccessPremiumAsset
                                    ? 'border-slate-200 bg-slate-50 opacity-60'
                                    : 'border-slate-200 bg-white'
                                }`}
                        >
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-bold text-slate-700">{font.name}</span>
                                {font.premium && (
                                    <span className="text-[8px] bg-gradient-to-r from-purple-600 to-pink-600 text-white px-2 py-0.5 rounded-full font-bold">
                                        VIP
                                    </span>
                                )}
                            </div>
                            <p
                                className="text-sm text-slate-500"
                                style={{ fontFamily: font.family }}
                            >
                                The Quick Brown Fox
                            </p>
                        </button>
                    ))}
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                        {displayAssets.map(asset => (
                            <button
                                key={asset.id}
                                onClick={() => handleAddAsset(asset)}
                                className={`relative aspect-square rounded-lg border-2 transition-all hover:scale-105 hover:shadow-md ${asset.premium && !canAccessPremiumAsset
                                        ? 'border-slate-200 bg-slate-50 opacity-60'
                                        : 'border-slate-200 bg-white hover:border-purple-300'
                                    }`}
                                title={asset.name}
                            >
                                {/* Asset Preview */}
                                <div className="absolute inset-0 flex items-center justify-center p-2">
                                    {asset.svg ? (
                                        <div
                                            className="w-full h-full text-purple-600"
                                            dangerouslySetInnerHTML={{ __html: asset.svg }}
                                        />
                                    ) : (
                                        <span className="text-2xl">{asset.preview}</span>
                                    )}
                                </div>

                                {/* Premium Badge */}
                                {asset.premium && (
                                    <div className="absolute top-1 right-1">
                                        <span className="text-[7px] bg-gradient-to-r from-purple-600 to-pink-600 text-white px-1.5 py-0.5 rounded-full font-bold">
                                            VIP
                                        </span>
                                    </div>
                                )}

                                {/* Add Icon */}
                                <div className="absolute bottom-1 right-1 bg-purple-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Plus size={10} />
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Load More */}
                    {hasMore && (
                        <button
                            onClick={() => setExpandedCount(prev => prev + 6)}
                            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg px-3 py-2 text-[10px] font-bold transition-colors"
                        >
                            Load More ({assets.length - expandedCount} tersisa)
                        </button>
                    )}
                </>
            )}

            {/* Helper Text */}
            <p className="text-[9px] text-slate-500 mt-3 text-center">
                💡 Klik asset untuk menambahkan ke template
            </p>
        </div>
    );
}
