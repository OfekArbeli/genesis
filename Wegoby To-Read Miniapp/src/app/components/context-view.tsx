import React, { useState, useEffect } from 'react';
import { X, Plus, Pencil, Trash2 } from 'lucide-react';
import { cn } from './ui/utils';

// 5 layers of context with their colors from the logo
export const CONTEXT_LAYERS = {
  presentation: {
    name: 'Presentation',
    subtitle: 'Surface',
    description: 'How information is displayed',
    color: '#F4B4C0', // primary pink
    textColor: 'text-primary-pink',
    bgColor: 'bg-primary-pink',
    question: 'Look',
    subtitle_text: 'The way this is shown',
  },
  cognition: {
    name: 'Cognition',
    subtitle: 'Density',
    description: 'How content is written and conveyed',
    color: '#A7D1AB', // mint green
    textColor: 'text-mint-green',
    bgColor: 'bg-mint-green',
    question: 'Pace',
    subtitle_text: 'The rhythm here',
  },
  autonomy: {
    name: 'Autonomy',
    subtitle: 'Agency',
    description: 'Who leads the experience',
    color: '#C3B1E1', // light purple
    textColor: 'text-light-purple',
    bgColor: 'bg-light-purple',
    question: 'Help',
    subtitle_text: 'How involved I want this to be',
  },
  continuity: {
    name: 'Continuity',
    subtitle: 'Temporal Context',
    description: 'How time and history are handled',
    color: '#A0D6D3', // light teal
    textColor: 'text-light-teal',
    bgColor: 'bg-light-teal',
    question: 'Memory',
    subtitle_text: 'What stays with me',
  },
  intent: {
    name: 'Intent & Interests',
    subtitle: 'Content Matching',
    description: 'What is relevant to the user',
    color: '#F7E78B', // light yellow
    textColor: 'text-light-yellow',
    bgColor: 'bg-light-yellow',
    question: 'Focus',
    subtitle_text: 'What this is really about',
  },
} as const;

export type ContextLayer = keyof typeof CONTEXT_LAYERS;

export interface ContextItem {
  layer: ContextLayer;
  text: string;
  isBaseline: boolean; // true if set by app, false if user-defined
}

export interface PageContext {
  pageName: string;
  items: ContextItem[];
}

interface ContextViewProps {
  isOpen: boolean;
  onClose: () => void;
  currentScreen: string;
  preferences: PageContext;
  onSave: (context: PageContext) => void;
}

interface EditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  value: string;
  onSave: (value: string) => void;
  onDelete?: () => void;
  color: string;
  title: string;
}

function EditDialog({ isOpen, onClose, value, onSave, onDelete, color, title }: EditDialogProps) {
  const [editValue, setEditValue] = useState(value);

  if (!isOpen) return null;

  const handleSave = () => {
    if (editValue.trim()) {
      onSave(editValue.trim());
      onClose();
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
        <textarea
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="w-full px-4 py-3 bg-white/60 dark:bg-card backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 text-sm border border-border/50 resize-none"
          style={{ focusRingColor: color }}
          rows={3}
          autoFocus
        />
        <div className="flex items-center gap-3 mt-6">
          {onDelete && (
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
          )}
          <div className="flex-1" />
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/60 dark:bg-card text-foreground rounded-full hover:bg-white/80 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!editValue.trim()}
            className="px-4 py-2 text-white rounded-full hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: color }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export function ContextView({
  isOpen,
  onClose,
  currentScreen,
  preferences: pageContext,
  onSave
}: ContextViewProps) {
  const [editedContext, setEditedContext] = useState<PageContext>(pageContext);
  const [editDialog, setEditDialog] = useState<{ isOpen: boolean; itemIndex: number; layer: ContextLayer } | null>(null);
  const [addDialog, setAddDialog] = useState<{ isOpen: boolean; layer: ContextLayer } | null>(null);

  // Sync editedContext when pageContext or isOpen changes
  useEffect(() => {
    if (isOpen) {
      setEditedContext(pageContext);
    }
  }, [isOpen, pageContext]);

  if (!isOpen) return null;

  const handleEditItem = (index: number) => {
    const item = editedContext.items[index];
    setEditDialog({ isOpen: true, itemIndex: index, layer: item.layer });
  };

  const handleSaveEdit = (value: string) => {
    if (editDialog) {
      const newItems = [...editedContext.items];
      newItems[editDialog.itemIndex] = { ...newItems[editDialog.itemIndex], text: value };
      setEditedContext({ ...editedContext, items: newItems });
      setEditDialog(null);
    }
  };

  const handleDeleteItem = () => {
    if (editDialog) {
      const item = editedContext.items[editDialog.itemIndex];
      if (!item.isBaseline) {
        const newItems = editedContext.items.filter((_, i) => i !== editDialog.itemIndex);
        setEditedContext({ ...editedContext, items: newItems });
      }
      setEditDialog(null);
    }
  };

  const handleAddItem = (value: string) => {
    if (addDialog && value.trim()) {
      setEditedContext({
        ...editedContext,
        items: [
          ...editedContext.items,
          {
            layer: addDialog.layer,
            text: value.trim(),
            isBaseline: false,
          },
        ],
      });
      setAddDialog(null);
    }
  };

  const handleSave = () => {
    onSave(editedContext);
  };

  const handleReset = () => {
    setEditedContext({
      ...editedContext,
      items: editedContext.items.filter(item => item.isBaseline),
    });
  };

  const getItemsForLayer = (layer: ContextLayer) => {
    return editedContext.items
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => item.layer === layer);
  };

  const hasUserChanges = editedContext.items.some(item => !item.isBaseline);

  return (
    <div className="fixed inset-0 z-50 bg-background dark:bg-neutral-900 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-lg border-b-2 border-border">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Context</h1>
            <p className="text-sm text-foreground/60">{editedContext.pageName}</p>
          </div>
          <div className="flex items-center gap-3">
            {hasUserChanges && (
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-white/60 dark:bg-card text-foreground rounded-full hover:bg-white/80 transition-colors text-sm"
              >
                Reset
              </button>
            )}
            <button
              onClick={() => {
                handleSave();
                onClose();
              }}
              className="px-4 py-2 bg-light-purple text-white rounded-full hover:bg-purple-400 transition-colors text-sm"
            >
              Done
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-light-purple/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8 pb-32">
        {/* Sections for each layer */}
        <div className="space-y-8">
          {Object.entries(CONTEXT_LAYERS).map(([layerKey, layer]) => {
            const layerItems = getItemsForLayer(layerKey as ContextLayer);
            
            return (
              <div key={layerKey} className="space-y-3">
                <div>
                  <h2 className="text-xl font-bold text-foreground">{layer.question}</h2>
                  <p className="text-sm text-foreground/60">{layer.subtitle_text}</p>
                </div>
                
                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  {layerItems.map(({ item, index }) => (
                    <button
                      key={index}
                      onClick={() => handleEditItem(index)}
                      className="group inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white hover:opacity-80 transition-all max-w-xs"
                      style={{ backgroundColor: layer.color }}
                    >
                      <span className="truncate">{item.text}</span>
                      <Pencil className="w-3 h-3 opacity-0 group-hover:opacity-100 flex-shrink-0 transition-opacity" />
                    </button>
                  ))}
                  
                  {/* Add button */}
                  <button
                    onClick={() => setAddDialog({ isOpen: true, layer: layerKey as ContextLayer })}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-dashed hover:border-solid transition-all"
                    style={{ borderColor: layer.color, color: layer.color }}
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Edit Dialog */}
      {editDialog && (
        <EditDialog
          isOpen={editDialog.isOpen}
          onClose={() => setEditDialog(null)}
          value={editedContext.items[editDialog.itemIndex].text}
          onSave={handleSaveEdit}
          onDelete={!editedContext.items[editDialog.itemIndex].isBaseline ? handleDeleteItem : undefined}
          color={CONTEXT_LAYERS[editDialog.layer].color}
          title={`Edit ${CONTEXT_LAYERS[editDialog.layer].question}`}
        />
      )}

      {/* Add Dialog */}
      {addDialog && (
        <EditDialog
          isOpen={addDialog.isOpen}
          onClose={() => setAddDialog(null)}
          value=""
          onSave={handleAddItem}
          color={CONTEXT_LAYERS[addDialog.layer].color}
          title={`Add ${CONTEXT_LAYERS[addDialog.layer].question}`}
        />
      )}
    </div>
  );
}