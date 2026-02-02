/**
 * Main DIY Editor Component
 * Wrapper that combines all DIY components
 */

import React, { useCallback } from 'react';
import { useDIYEditor } from '@/hooks/useDIYEditor';
import { DIYLayout, DIYElement } from '@/types/invitation';
import { DIYAsset } from '@/lib/diyAssets';
import DIYToggle from './DIYToggle';
import DIYToolbar from './DIYToolbar';
import DIYCanvas from './DIYCanvas';
import AssetLibrary from './AssetLibrary';
import ElementControls from './ElementControls';

interface DIYEditorProps {
    initialLayout?: DIYLayout;
    plan: 'free' | 'basic' | 'premium' | 'exclusive';
    onLayoutChange?: (layout: DIYLayout) => void;
}

export default function DIYEditor({
    initialLayout,
    plan,
    onLayoutChange,
}: DIYEditorProps) {
    const editor = useDIYEditor(initialLayout, onLayoutChange);

    const handleAddAsset = useCallback((asset: DIYAsset) => {
        const newElement: Omit<DIYElement, 'id'> = {
            type: asset.category === 'font' ? 'text' : asset.category,
            assetId: asset.id,
            position: { x: 40, y: 40 }, // Center-ish
            size: {
                width: asset.category === 'frame' ? 80 : 15,
                height: asset.category === 'frame' ? 60 : 15
            },
            rotation: 0,
            zIndex: editor.elements.length,
            locked: false,
            content: {
                color: '#8b5cf6',
                text: asset.category === 'font' ? 'Sample Text' : undefined,
                fontFamily: asset.category === 'font' ? (asset as any).family : undefined,
            },
        };

        editor.addElement(newElement);
    }, [editor]);

    const handleAddText = useCallback(() => {
        const newElement: Omit<DIYElement, 'id'> = {
            type: 'text',
            position: { x: 30, y: 30 },
            size: { width: 40, height: 10 },
            rotation: 0,
            zIndex: editor.elements.length,
            locked: false,
            content: {
                text: 'New Text',
                fontSize: 24,
                color: '#000000',
                fontFamily: 'Inter, sans-serif',
            },
        };

        editor.addElement(newElement);
    }, [editor]);

    const handleSaveLayout = useCallback(() => {
        const layout = editor.saveLayout();
        if (onLayoutChange) {
            onLayoutChange(layout);
        }
        alert('✅ Layout saved successfully!');
    }, [editor, onLayoutChange]);

    const handleUpdateSelectedElement = useCallback((updates: Partial<DIYElement>) => {
        if (editor.selectedElement) {
            editor.updateElement(editor.selectedElement.id, updates);
        }
    }, [editor]);

    return (
        <div className="space-y-4">
            {/* Toggle */}
            <DIYToggle
                enabled={editor.isDIYMode}
                onToggle={editor.isDIYMode ? editor.disableDIYMode : editor.enableDIYMode}
                onReset={editor.resetToDefault}
                plan={plan}
            />

            {/* DIY Editor UI (only show if enabled) */}
            {editor.isDIYMode && (
                <>
                    {/* Toolbar */}
                    <DIYToolbar
                        canUndo={editor.canUndo}
                        canRedo={editor.canRedo}
                        onUndo={editor.undo}
                        onRedo={editor.redo}
                        onSave={handleSaveLayout}
                        onAddText={handleAddText}
                    />

                    {/* Main Editor Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        {/* Left: Canvas */}
                        <div className="lg:col-span-2">
                            <DIYCanvas
                                elements={editor.elements}
                                selectedElement={editor.selectedElement}
                                onSelectElement={editor.selectElement}
                                onMoveElement={editor.moveElement}
                                onResizeElement={editor.resizeElement}
                                onRotateElement={editor.rotateElement}
                            />
                        </div>

                        {/* Right: Controls */}
                        <div className="space-y-4">
                            {/* Element Controls */}
                            <ElementControls
                                element={editor.selectedElement}
                                onUpdate={handleUpdateSelectedElement}
                                onDelete={() => editor.selectedElement && editor.deleteElement(editor.selectedElement.id)}
                                onDuplicate={() => editor.selectedElement && editor.duplicateElement(editor.selectedElement.id)}
                                onLock={(locked) => editor.selectedElement && editor.lockElement(editor.selectedElement.id, locked)}
                                onBringForward={() => editor.selectedElement && editor.bringForward(editor.selectedElement.id)}
                                onSendBackward={() => editor.selectedElement && editor.sendBackward(editor.selectedElement.id)}
                            />

                            {/* Asset Library */}
                            <AssetLibrary
                                onAddAsset={handleAddAsset}
                                plan={plan}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
