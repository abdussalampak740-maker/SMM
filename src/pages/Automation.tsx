import React from 'react';
import { 
  Search, 
  Zap, 
  Bell, 
  Plus, 
  MoreVertical, 
  Send, 
  Share2, 
  Clock, 
  Mail, 
  Edit3, 
  ImageIcon, 
  Languages, 
  Undo2, 
  Redo2, 
  ZoomIn, 
  ZoomOut,
  CheckCircle2,
  Play,
  Trash2,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Automation() {
  const [isPublishing, setIsPublishing] = React.useState(false);
  const [isTesting, setIsTesting] = React.useState(false);
  const [publishSuccess, setPublishSuccess] = React.useState(false);
  const [testSuccess, setTestSuccess] = React.useState(false);
  const [zoom, setZoom] = React.useState(100);
  
  const [nodes, setNodes] = React.useState<any[]>([
    { id: 1, type: 'Trigger', title: 'New Blog Post Generated', desc: 'Runs when Canvas AI finishes a draft in the CMS.', icon: <Zap size={18} fill="currentColor" />, color: 'border-primary', iconColor: 'text-primary bg-primary/10', hasToggle: true },
    { id: 2, type: 'Action', title: 'Auto-post to LinkedIn', desc: 'Summarize and share with branded image on profile.', icon: <Send size={18} />, color: 'border-blue-500', iconColor: 'text-blue-500 bg-blue-500/10' },
    { id: 3, type: 'Action', title: 'Auto-post to Twitter', desc: 'Create a thread from the blog key points.', icon: <Share2 size={18} />, color: 'border-blue-500', iconColor: 'text-blue-500 bg-blue-500/10' },
  ]);

  const [history, setHistory] = React.useState<any[][]>([[...nodes]]);
  const [historyIndex, setHistoryIndex] = React.useState(0);

  const updateNodes = (newNodes: any[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push([...newNodes]);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setNodes(newNodes);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      setNodes([...history[prevIndex]]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setNodes([...history[nextIndex]]);
    }
  };

  const handlePublish = () => {
    setIsPublishing(true);
    setPublishSuccess(false);
    setTimeout(() => {
      setIsPublishing(false);
      setPublishSuccess(true);
      setTimeout(() => setPublishSuccess(false), 3000);
    }, 2000);
  };

  const handleTestRun = () => {
    setIsTesting(true);
    setTestSuccess(false);
    setTimeout(() => {
      setIsTesting(false);
      setTestSuccess(true);
      setTimeout(() => setTestSuccess(false), 3000);
    }, 3000);
  };

  const addNode = () => {
    const newNode = {
      id: Date.now(),
      type: 'Action',
      title: 'Notify Team',
      desc: 'Send a Slack message when content is live.',
      icon: <Bell size={18} />,
      color: 'border-green-500',
      iconColor: 'text-green-500 bg-green-500/10'
    };
    updateNodes([...nodes, newNode]);
  };

  const addSpecificNode = (item: any) => {
    const newNode = {
      id: Date.now(),
      type: item.isAction ? 'Action' : 'Trigger',
      title: item.title,
      desc: item.desc,
      icon: item.icon,
      color: item.isAction ? 'border-blue-500' : 'border-primary',
      iconColor: item.isAction ? 'text-blue-500 bg-blue-500/10' : 'text-primary bg-primary/10',
      hasToggle: !item.isAction
    };
    updateNodes([...nodes, newNode]);
  };

  const removeNode = (id: number) => {
    updateNodes(nodes.filter(n => n.id !== id));
  };

  return (
    <div className="flex flex-col lg:flex-row h-auto lg:h-[calc(100vh-8rem)] overflow-hidden lg:-m-8">
      <div className="flex-1 flex flex-col relative overflow-hidden min-h-[500px]">
        {/* Canvas Toolbar */}
        <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full editorial-shadow border border-outline-variant/10 whitespace-nowrap">
          <span className="text-[10px] sm:text-xs font-semibold text-on-surface-variant">
            {isPublishing ? 'Saving changes...' : 'Draft saved'}
          </span>
          <div className={`w-2 h-2 rounded-full ${isPublishing ? 'bg-yellow-500 animate-pulse' : 'bg-blue-500'} shadow-sm`}></div>
        </div>

        <AnimatePresence>
          {publishSuccess && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-16 left-1/2 -translate-x-1/2 z-20"
            >
              <div className="bg-green-500 text-white px-6 py-2 rounded-full font-bold shadow-lg flex items-center gap-2 text-xs">
                <CheckCircle2 size={16} />
                Automation flow published successfully!
              </div>
            </motion.div>
          )}
          {testSuccess && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-16 left-1/2 -translate-x-1/2 z-20"
            >
              <div className="bg-blue-500 text-white px-6 py-2 rounded-full font-bold shadow-lg flex items-center gap-2 text-xs">
                <Zap size={16} fill="currentColor" />
                Test run completed: All steps passed!
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Workflow Canvas */}
        <div className="flex-1 relative bg-[radial-gradient(#ccc3d8_1px,transparent_1px)] [background-size:24px_24px] flex flex-col items-center py-12 overflow-y-auto px-4 sm:px-10">
          <div style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center', transition: 'transform 0.2s' }}>
            {nodes.map((node, i) => (
              <React.Fragment key={node.id || i}>
                <WorkflowNode {...node} onRemove={() => removeNode(node.id)} />
                {i < nodes.length - 1 && (
                  <div className="flex flex-col items-center">
                    <div className="h-12 sm:h-16 w-[2px] bg-primary/20"></div>
                    {isTesting && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 rounded-full bg-primary absolute"
                        style={{ top: `${(i + 1) * 150}px` }} // Approximate positioning
                      />
                    )}
                  </div>
                )}
              </React.Fragment>
            ))}

            <button 
              onClick={addNode}
              className="mt-8 mx-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-xl shadow-primary/10 flex items-center justify-center text-primary border border-outline-variant/20 hover:scale-110 transition-transform active:scale-95"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        {/* Footer Toolbar */}
        <footer className="h-auto sm:h-14 bg-white border-t border-outline-variant/10 flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 py-4 sm:py-0 z-50 gap-4">
          <div className="flex items-center justify-between w-full sm:w-auto gap-4 sm:gap-6">
            <div className="flex items-center gap-2 text-on-surface-variant">
              <button onClick={() => setZoom(z => Math.min(z + 10, 200))}><ZoomIn size={14} sm:size={16} /></button>
              <span className="text-[10px] sm:text-xs font-semibold w-8 sm:w-10 text-center">{zoom}%</span>
              <button onClick={() => setZoom(z => Math.max(z - 10, 50))}><ZoomOut size={14} sm:size={16} /></button>
            </div>
            <div className="h-4 w-[1px] bg-outline-variant/30"></div>
            <div className="flex items-center gap-3 sm:gap-4">
              <button 
                onClick={undo}
                disabled={historyIndex === 0}
                className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs font-semibold text-on-surface-variant hover:text-on-surface transition-colors disabled:opacity-30"
              >
                <Undo2 size={14} sm:size={16} /> Undo
              </button>
              <button 
                onClick={redo}
                disabled={historyIndex === history.length - 1}
                className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs font-semibold text-on-surface-variant hover:text-on-surface transition-colors disabled:opacity-30"
              >
                <Redo2 size={14} sm:size={16} /> Redo
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between w-full sm:w-auto gap-4">
            <button 
              onClick={handleTestRun}
              disabled={isTesting || nodes.length === 0}
              className="flex-1 sm:flex-none px-4 py-2 text-[10px] sm:text-xs font-bold text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {isTesting ? <RefreshCw size={14} className="animate-spin" /> : <Play size={14} />}
              {isTesting ? 'Testing...' : 'Test Run'}
            </button>
            <button 
              onClick={handlePublish}
              disabled={isPublishing || nodes.length === 0}
              className="flex-1 sm:flex-none px-6 sm:px-8 py-2 bg-primary rounded-full text-white text-[10px] sm:text-xs font-bold shadow-lg shadow-primary/25 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
            >
              {isPublishing ? 'Publishing...' : 'Publish Flow'}
            </button>
          </div>
        </footer>
      </div>

      {/* Node Library Sidebar - Hidden on mobile, visible on large screens */}
      <aside className="hidden lg:flex w-80 bg-white border-l border-outline-variant/10 flex-col p-6 overflow-y-auto shrink-0">
        <h2 className="font-headline text-lg font-bold text-on-surface mb-2">Node Library</h2>
        <p className="text-sm text-on-surface-variant mb-6">Drag and drop elements to your workflow</p>
        
        <div className="space-y-8">
          <section>
            <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-on-surface-variant/60 mb-4">Triggers</h3>
            <div className="space-y-3">
              <LibraryItem 
                icon={<Clock size={16} />} 
                title="Scheduled Time" 
                desc="Daily, Weekly, Monthly" 
                onClick={() => addSpecificNode({ icon: <Clock size={18} />, title: 'Scheduled Time', desc: 'Daily, Weekly, Monthly', isAction: false })}
              />
              <LibraryItem 
                icon={<Mail size={16} />} 
                title="Inbound Webhook" 
                desc="HTTP POST, JSON Body" 
                onClick={() => addSpecificNode({ icon: <Mail size={18} />, title: 'Inbound Webhook', desc: 'HTTP POST, JSON Body', isAction: false })}
              />
            </div>
          </section>

          <section>
            <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-on-surface-variant/60 mb-4">Actions</h3>
            <div className="space-y-3">
              <LibraryItem 
                icon={<Edit3 size={16} />} 
                title="Rewrite Content" 
                desc="Change tone or style" 
                isAction 
                onClick={() => addSpecificNode({ icon: <Edit3 size={18} />, title: 'Rewrite Content', desc: 'Change tone or style', isAction: true })}
              />
              <LibraryItem 
                icon={<ImageIcon size={16} />} 
                title="Generate Image" 
                desc="AI-powered visuals" 
                isAction 
                onClick={() => addSpecificNode({ icon: <ImageIcon size={18} />, title: 'Generate Image', desc: 'AI-powered visuals', isAction: true })}
              />
              <LibraryItem 
                icon={<Languages size={16} />} 
                title="Translate Text" 
                desc="Supports 50+ languages" 
                isAction 
                onClick={() => addSpecificNode({ icon: <Languages size={18} />, title: 'Translate Text', desc: 'Supports 50+ languages', isAction: true })}
              />
              <LibraryItem 
                icon={<Plus size={16} />} 
                title="Custom Action" 
                desc="Define your own logic" 
                isAction 
                onClick={() => {
                  const title = prompt("Enter action name:") || "Custom Action";
                  const desc = prompt("Enter description:") || "Custom logic defined by user.";
                  addSpecificNode({ icon: <Zap size={18} />, title, desc, isAction: true });
                }}
              />
            </div>
          </section>

          <div className="mt-8 p-5 primary-gradient rounded-2xl text-white relative overflow-hidden group shadow-lg">
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
              <Zap size={100} />
            </div>
            <div className="relative z-10">
              <h4 className="font-bold mb-1 flex items-center gap-2">
                <Zap size={14} fill="currentColor" />
                Smart Suggestions
              </h4>
              <p className="text-[11px] text-white/80 leading-relaxed mb-4">Based on your blog flow, try adding a <strong>"Slack Notification"</strong> step at the end.</p>
              <button 
                onClick={() => addSpecificNode({ icon: <Bell size={18} />, title: 'Slack Notification', desc: 'Send a Slack message when content is live.', isAction: true })}
                className="w-full py-2 bg-white/20 backdrop-blur-md rounded-lg text-[11px] font-bold uppercase tracking-wider hover:bg-white/30 transition-colors"
              >
                Apply Hint
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function WorkflowNode({ type, title, desc, icon, color, iconColor, hasToggle, onRemove }: any) {
  return (
    <div className={`w-full max-w-[280px] sm:w-72 bg-surface-container-lowest rounded-[1.5rem] p-4 sm:p-6 shadow-[0_32px_32px_rgba(99,14,212,0.04)] border-l-4 ${color} relative z-10 group/node`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-1.5 sm:p-2 rounded-lg ${iconColor}`}>
            {React.cloneElement(icon as React.ReactElement, { size: 16 })}
          </div>
          <span className={`text-[8px] sm:text-[10px] font-bold uppercase tracking-wider ${iconColor.split(' ')[0]}`}>{type}</span>
        </div>
        <div className="flex items-center gap-2">
          {hasToggle ? (
            <div className="w-7 h-3.5 sm:w-8 sm:h-4 bg-blue-500 rounded-full relative cursor-pointer">
              <div className="absolute right-0.5 top-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full"></div>
            </div>
          ) : (
            <button onClick={onRemove} className="opacity-0 group-hover/node:opacity-100 p-1 hover:bg-red-50 text-red-400 rounded-md transition-all">
              <Trash2 size={14} />
            </button>
          )}
          <MoreVertical size={14} sm:size={16} className="text-outline-variant cursor-pointer" />
        </div>
      </div>
      <h3 className="text-on-surface font-bold text-base sm:text-lg leading-tight mb-2">{title}</h3>
      <p className="text-on-surface-variant text-xs sm:text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function LibraryItem({ icon, title, desc, isAction, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className="p-4 bg-surface-container-low rounded-xl border border-transparent hover:border-primary/20 transition-all cursor-pointer flex items-center gap-3 group"
    >
      <div className={`w-8 h-8 rounded-lg bg-white flex items-center justify-center ${isAction ? 'text-blue-500' : 'text-primary'} shadow-sm group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-[11px] text-on-surface-variant">{desc}</p>
      </div>
    </div>
  );
}
