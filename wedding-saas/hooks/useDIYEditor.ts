/**
 * useDIYEditor Hook
 * State management for DIY template customization
 */

import { useState, useCallback } from 'react';
import { DIYElement, DIYLayout } from '../types/invitation';

interface UseDIYEditorReturn {
    elements: DIYElement[];
    selectedElement: DIYElement | null;
    isDIYMode: boolean;

    // Mode control
    enableDIYMode: () => void;
    disableDIYMode: () => void;
    resetToDefault: () => void;

    // Element management
    addElement: (element: Omit<DIYElement, 'id'>) => void;
    updateElement: (id: string, updates: Partial<DIYElement>) => void;
    deleteElement: (id: string) => void;
    duplicateElement: (id: string) => void;
    selectElement: (id: string | null) => void;

    // Layer management
    bringForward: (id: string) => void;
    sendBackward: (id: string) => void;
    bringToFront: (id: string) => void;
    sendToBack: (id: string) => void;

    // Position/transform
    moveElement: (id: string, x: number, y: number) => void;
    resizeElement: (id: string, width: number, height: number) => void;
    rotateElement: (id: string, rotation: number) => void;
    lockElement: (id: string, locked: boolean) => void;

    // History
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;

    // Save/load
    saveLayout: () => DIYLayout;
    loadLayout: (layout: DIYLayout) => void;
}

export function useDIYEditor(
    initialLayout?: DIYLayout,
    onLayoutChange?: (layout: DIYLayout) => void
): UseDIYEditorReturn {
    const [elements, setElements] = useState<DIYElement[]>(initialLayout?.elements || []);
    const [selectedElement, setSelectedElement] = useState<DIYElement | null>(null);
    const [isDIYMode, setIsDIYMode] = useState(initialLayout?.enabled || false);
    const [history, setHistory] = useState<DIYElement[][]>([initialLayout?.elements || []]);
    const [historyIndex, setHistoryIndex] = useState(0);

    // Save to history
    const saveToHistory = useCallback((newElements: DIYElement[]) => {
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(newElements);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
    }, [history, historyIndex]);

    // Update elements and notify parent
    const updateElements = useCallback((newElements: DIYElement[]) => {
        setElements(newElements);
        if (onLayoutChange) {
            onLayoutChange({ enabled: isDIYMode, elements: newElements });
        }
    }, [isDIYMode, onLayoutChange]);

    // Mode control
    const enableDIYMode = useCallback(() => {
        setIsDIYMode(true);
        if (onLayoutChange) {
            onLayoutChange({ enabled: true, elements });
        }
    }, [elements, onLayoutChange]);

    const disableDIYMode = useCallback(() => {
        setIsDIYMode(false);
        if (onLayoutChange) {
            onLayoutChange({ enabled: false, elements });
        }
    }, [elements, onLayoutChange]);

    const resetToDefault = useCallback(() => {
        const confirmed = confirm('Reset all customizations to default? This cannot be undone.');
        if (confirmed) {
            const newElements: DIYElement[] = [];
            updateElements(newElements);
            saveToHistory(newElements);
            setSelectedElement(null);
        }
    }, [updateElements, saveToHistory]);

    // Element management
    const addElement = useCallback((element: Omit<DIYElement, 'id'>) => {
        const newElement: DIYElement = {
            ...element,
            id: `element-${Date.now()}`,
        };
        const newElements = [...elements, newElement];
        updateElements(newElements);
        saveToHistory(newElements);
        setSelectedElement(newElement);
    }, [elements, updateElements, saveToHistory]);

    const updateElement = useCallback((id: string, updates: Partial<DIYElement>) => {
        const newElements = elements.map(el =>
            el.id === id ? { ...el, ...updates } : el
        );
        updateElements(newElements);
        if (selectedElement?.id === id) {
            setSelectedElement({ ...selectedElement, ...updates });
        }
    }, [elements, selectedElement, updateElements]);

    const deleteElement = useCallback((id: string) => {
        const newElements = elements.filter(el => el.id !== id);
        updateElements(newElements);
        saveToHistory(newElements);
        if (selectedElement?.id === id) {
            setSelectedElement(null);
        }
    }, [elements, selectedElement, updateElements, saveToHistory]);

    const duplicateElement = useCallback((id: string) => {
        const element = elements.find(el => el.id === id);
        if (element) {
            const newElement: DIYElement = {
                ...element,
                id: `element-${Date.now()}`,
                position: {
                    x: element.position.x + 5,
                    y: element.position.y + 5
                }
            };
            const newElements = [...elements, newElement];
            updateElements(newElements);
            saveToHistory(newElements);
            setSelectedElement(newElement);
        }
    }, [elements, updateElements, saveToHistory]);

    const selectElement = useCallback((id: string | null) => {
        const element = id ? elements.find(el => el.id === id) || null : null;
        setSelectedElement(element);
    }, [elements]);

    // Layer management
    const bringForward = useCallback((id: string) => {
        const index = elements.findIndex(el => el.id === id);
        if (index < elements.length - 1) {
            const newElements = [...elements];
            [newElements[index], newElements[index + 1]] = [newElements[index + 1], newElements[index]];
            newElements.forEach((el, i) => el.zIndex = i);
            updateElements(newElements);
            saveToHistory(newElements);
        }
    }, [elements, updateElements, saveToHistory]);

    const sendBackward = useCallback((id: string) => {
        const index = elements.findIndex(el => el.id === id);
        if (index > 0) {
            const newElements = [...elements];
            [newElements[index], newElements[index - 1]] = [newElements[index - 1], newElements[index]];
            newElements.forEach((el, i) => el.zIndex = i);
            updateElements(newElements);
            saveToHistory(newElements);
        }
    }, [elements, updateElements, saveToHistory]);

    const bringToFront = useCallback((id: string) => {
        const element = elements.find(el => el.id === id);
        if (element) {
            const newElements = elements.filter(el => el.id !== id);
            newElements.push(element);
            newElements.forEach((el, i) => el.zIndex = i);
            updateElements(newElements);
            saveToHistory(newElements);
        }
    }, [elements, updateElements, saveToHistory]);

    const sendToBack = useCallback((id: string) => {
        const element = elements.find(el => el.id === id);
        if (element) {
            const newElements = elements.filter(el => el.id !== id);
            newElements.unshift(element);
            newElements.forEach((el, i) => el.zIndex = i);
            updateElements(newElements);
            saveToHistory(newElements);
        }
    }, [elements, updateElements, saveToHistory]);

    // Position/transform
    const moveElement = useCallback((id: string, x: number, y: number) => {
        updateElement(id, { position: { x, y } });
    }, [updateElement]);

    const resizeElement = useCallback((id: string, width: number, height: number) => {
        updateElement(id, { size: { width, height } });
    }, [updateElement]);

    const rotateElement = useCallback((id: string, rotation: number) => {
        updateElement(id, { rotation });
    }, [updateElement]);

    const lockElement = useCallback((id: string, locked: boolean) => {
        updateElement(id, { locked });
    }, [updateElement]);

    // History
    const undo = useCallback(() => {
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            updateElements(history[newIndex]);
        }
    }, [history, historyIndex, updateElements]);

    const redo = useCallback(() => {
        if (historyIndex < history.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            updateElements(history[newIndex]);
        }
    }, [history, historyIndex, updateElements]);

    // Save/load
    const saveLayout = useCallback((): DIYLayout => {
        return { enabled: isDIYMode, elements };
    }, [isDIYMode, elements]);

    const loadLayout = useCallback((layout: DIYLayout) => {
        setIsDIYMode(layout.enabled);
        updateElements(layout.elements);
        saveToHistory(layout.elements);
        setSelectedElement(null);
    }, [updateElements, saveToHistory]);

    return {
        elements,
        selectedElement,
        isDIYMode,

        enableDIYMode,
        disableDIYMode,
        resetToDefault,

        addElement,
        updateElement,
        deleteElement,
        duplicateElement,
        selectElement,

        bringForward,
        sendBackward,
        bringToFront,
        sendToBack,

        moveElement,
        resizeElement,
        rotateElement,
        lockElement,

        undo,
        redo,
        canUndo: historyIndex > 0,
        canRedo: historyIndex < history.length - 1,

        saveLayout,
        loadLayout,
    };
}
