/**
 * DIY Overlay Component
 * Renders DIY elements on top of template content
 */

import React from 'react';
import { DIYLayout, DIYElement } from '@/types/invitation';
import { getAssetById } from '@/lib/diyAssets';

interface DIYOverlayProps {
    layout?: DIYLayout;
}

export default function DIYOverlay({ layout }: DIYOverlayProps) {
    // Don't render if DIY is not enabled or no elements
    if (!layout || !layout.enabled || layout.elements.length === 0) {
        return null;
    }

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {layout.elements.map((element) => {
                const asset = element.assetId ? getAssetById(element.assetId) : null;

                return (
                    <div
                        key={element.id}
                        className="absolute"
                        style={{
                            left: `${element.position.x}%`,
                            top: `${element.position.y}%`,
                            width: `${element.size.width}%`,
                            height: `${element.size.height}%`,
                            transform: `rotate(${element.rotation}deg)`,
                            zIndex: 1000 + element.zIndex, // High z-index to appear above template content
                        }}
                    >
                        {/* Text Element */}
                        {element.type === 'text' && (
                            <p
                                className="font-bold text-center px-2 w-full h-full flex items-center justify-center"
                                style={{
                                    fontSize: `${element.content?.fontSize || 16}px`,
                                    fontFamily: element.content?.fontFamily || 'inherit',
                                    color: element.content?.color || '#000',
                                    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                }}
                            >
                                {element.content?.text || 'Text'}
                            </p>
                        )}

                        {/* Image Element */}
                        {element.type === 'image' && element.content?.imageUrl && (
                            <img
                                src={element.content.imageUrl}
                                alt="Custom decoration"
                                className="w-full h-full object-contain rounded"
                                style={{
                                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                                }}
                            />
                        )}

                        {/* Icon/Frame/Sticker/Shape Element */}
                        {(element.type === 'icon' ||
                            element.type === 'frame' ||
                            element.type === 'sticker' ||
                            element.type === 'shape') &&
                            asset?.svg && (
                                <div
                                    className="w-full h-full"
                                    style={{
                                        color: element.content?.color || '#8b5cf6',
                                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                                    }}
                                    dangerouslySetInnerHTML={{ __html: asset.svg }}
                                />
                            )}
                    </div>
                );
            })}
        </div>
    );
}
