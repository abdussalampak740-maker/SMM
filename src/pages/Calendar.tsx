import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Filter, 
  Plus, 
  Workflow, 
  FileText, 
  Camera, 
  Video, 
  AtSign,
  GripVertical,
  Paperclip,
  AlertCircle,
  Zap,
  Share2,
  Send,
  RefreshCw,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ShareModal from '../components/ShareModal';

export default function Calendar() {
  const [shareData, setShareData] = React.useState<{ isOpen: boolean; content: any }>({
    isOpen: false,
    content: { title: '', text: '', url: '', image: '' }
  });
  const [currentMonth, setCurrentMonth] = React.useState('September 2024');
  const [showAddEvent, setShowAddEvent] = React.useState(false);
  const [selectedDay, setSelectedDay] = React.useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = React.useState<any | null>(null);
  const [isPublishing, setIsPublishing] = React.useState(false);
  const [publishSuccess, setPublishSuccess] = React.useState(false);
  const [isAutoScheduling, setIsAutoScheduling] = React.useState(false);
  const [platformFilter, setPlatformFilter] = React.useState('All Platforms');
  const [typeFilter, setTypeFilter] = React.useState('All Types');
  const [events, setEvents] = React.useState<any[]>([
    { day: 2, label: 'Tech Trends Q4', type: 'hub', color: 'blue', platform: 'LinkedIn', contentType: 'Article' },
    { day: 4, label: 'Weekly Digest', type: 'article', color: 'purple', platform: 'Twitter/X', contentType: 'Article' },
    { day: 6, label: 'Lifestyle Shot', type: 'camera', color: 'pink', platform: 'Instagram', contentType: 'Image' },
    { day: 6, label: 'AI Reel', type: 'video', color: 'pink', platform: 'Instagram', contentType: 'Video' },
    { day: 7, label: 'Case Study: Nike', type: 'hub', color: 'blue', platform: 'LinkedIn', contentType: 'Article' },
  ]);

  const filteredEvents = events.filter(event => {
    const matchesPlatform = platformFilter === 'All Platforms' || event.platform === platformFilter;
    const matchesType = typeFilter === 'All Types' || event.contentType === typeFilter;
    return matchesPlatform && matchesType;
  });

  const handleShare = (item: any) => {
    setShareData({
      isOpen: true,
      content: {
        title: item.label || item.title,
        text: `Check out this ${item.type || item.tag} scheduled on Canvas AI!`,
        url: `https://canvas-ai.app/p/${(item.label || item.title).toLowerCase().replace(/\s+/g, '-')}`,
        image: `https://picsum.photos/seed/${item.label || item.title}/400/400`
      }
    });
  };

  const handleAutoSchedule = () => {
    setIsAutoScheduling(true);
    setTimeout(() => {
      setIsAutoScheduling(false);
      const newEvents = [
        ...events,
        { day: 12, label: 'Productivity Boost', type: 'video', color: 'pink', platform: 'Instagram', contentType: 'Video' },
        { day: 12, label: 'AI Future', type: 'article', color: 'purple', platform: 'LinkedIn', contentType: 'Article' },
        { day: 14, label: 'Agency Scaling', type: 'hub', color: 'blue', platform: 'LinkedIn', contentType: 'Article' },
      ];
      setEvents(newEvents);
    }, 2000);
  };

  const handleAddEvent = (day: number) => {
    setSelectedDay(day);
    setShowAddEvent(true);
  };

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
  };

  const handlePublish = (event: any) => {
    setIsPublishing(true);
    setPublishSuccess(false);
    
    // Simulate publishing process
    setTimeout(() => {
      setIsPublishing(false);
      setPublishSuccess(true);
      // Reset success message after 3 seconds
      setTimeout(() => {
        setPublishSuccess(false);
        setSelectedEvent(null);
        // Remove event from calendar as it's now published
        setEvents(prev => prev.filter(e => e !== event));
      }, 2000);
    }, 2500);
  };

  const addEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const type = formData.get('contentType') as string;
    const newEvent = {
      day: parseInt(formData.get('day') as string) || 10,
      label: formData.get('title') as string || 'New Event',
      type: type === 'Reel Script' ? 'video' : type === 'Blog' ? 'file-text' : 'article',
      color: type === 'Reel Script' ? 'pink' : type === 'Blog' ? 'blue' : 'purple',
      platform: formData.get('platform') as string || 'Instagram',
      contentType: type || 'Social Post'
    };
    setEvents([...events, newEvent]);
    setShowAddEvent(false);
  };

  return (
    <div className="flex flex-col lg:flex-row h-auto lg:h-[calc(100vh-8rem)] overflow-hidden lg:-m-8 relative">
      {/* Main Calendar Area */}
      <div className="flex-1 flex flex-col p-4 sm:p-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-on-surface">{currentMonth}</h1>
            <p className="text-on-surface-variant mt-1 text-sm">{events.length + 19} posts scheduled across 4 platforms</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center bg-surface-container-low p-1 rounded-xl">
              <button className="px-4 sm:px-6 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-surface-container-lowest shadow-sm text-primary">Month</button>
              <button className="px-4 sm:px-6 py-2 text-xs sm:text-sm font-semibold rounded-lg text-on-surface-variant hover:text-on-surface">Week</button>
            </div>
            
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setCurrentMonth('August 2024')}
                className="p-2 hover:bg-surface-container rounded-lg"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={() => setCurrentMonth('September 2024')}
                className="px-3 py-1.5 font-semibold text-xs sm:text-sm hover:bg-surface-container rounded-lg"
              >
                Today
              </button>
              <button 
                onClick={() => setCurrentMonth('October 2024')}
                className="p-2 hover:bg-surface-container rounded-lg"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
          <div className="flex items-center gap-2 bg-surface-container-low p-1 rounded-xl border border-outline-variant/10 w-full sm:w-auto overflow-x-auto no-scrollbar">
            <select 
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="bg-transparent border-none text-[10px] sm:text-xs font-bold px-3 py-1.5 outline-none cursor-pointer text-on-surface-variant hover:text-on-surface whitespace-nowrap"
            >
              <option>All Platforms</option>
              <option>Instagram</option>
              <option>LinkedIn</option>
              <option>Twitter/X</option>
              <option>YouTube</option>
              <option>Website</option>
            </select>
            <div className="w-[1px] h-4 bg-outline-variant/30 shrink-0"></div>
            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-transparent border-none text-[10px] sm:text-xs font-bold px-3 py-1.5 outline-none cursor-pointer text-on-surface-variant hover:text-on-surface whitespace-nowrap"
            >
              <option>All Types</option>
              <option>Social Post</option>
              <option>Thread</option>
              <option>Carousel</option>
              <option>Reel Script</option>
              <option>Blog</option>
            </select>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-highest text-on-surface font-semibold rounded-xl text-xs sm:text-sm transition-transform active:scale-95 w-full sm:w-auto justify-center">
            <Filter size={14} />
            Filter
          </button>
        </div>

        <div className="flex-1 min-h-[400px] sm:min-h-[600px] bg-surface-container-lowest rounded-3xl overflow-hidden shadow-[0_16px_48px_rgba(99,14,212,0.03)] border border-outline-variant/10 flex flex-col">
          <div className="grid grid-cols-7 border-b border-outline-variant/10">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
              <div key={i} className={`p-2 sm:p-4 text-center text-[10px] font-bold uppercase tracking-widest ${i > 4 ? 'text-primary' : 'text-on-surface-variant/60'}`}>
                <span className="hidden sm:inline">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</span>
                <span className="sm:hidden">{day}</span>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 flex-1 auto-rows-fr">
            {/* Empty days */}
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={`empty-${i}`} className="min-h-[80px] sm:min-h-[120px] p-1 sm:p-2 border-r border-b border-outline-variant/5 bg-surface-container-low/30" />
            ))}
            
            {/* Day 1 */}
            {Array.from({ length: 24 }).map((_, i) => {
              const dayNum = i + 1;
              const dayEvents = filteredEvents.filter(e => e.day === dayNum);
              return (
                <CalendarDay 
                  key={dayNum}
                  onShare={handleShare} 
                  onAdd={() => handleAddEvent(dayNum)}
                  onEventClick={handleEventClick}
                  day={dayNum} 
                  isToday={dayNum === 7}
                  events={dayEvents}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Side Panel - Hidden on mobile, visible on large screens */}
      <aside className="hidden lg:flex w-80 border-l border-outline-variant/10 bg-surface-container-low/50 flex-col shrink-0">
        <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-low">
          <h2 className="font-bold tracking-tight">Unscheduled Drafts</h2>
          <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full font-bold">5</span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <DraftCard 
            onShare={handleShare}
            tag="Instagram Reel" 
            title="5 Ways Canvas AI Boosts Productivity in 2024" 
            color="bg-pink-500" 
            members={2}
          />
          <DraftCard 
            onShare={handleShare}
            tag="Blog Post" 
            title="Sustainable Living: A Guide for Modern Urbanites" 
            color="bg-primary" 
            assets={1}
          />
          <DraftCard 
            onShare={handleShare}
            tag="Twitter Thread" 
            title="10 AI Tools You Need to Know" 
            color="bg-sky-400" 
            assets={0}
          />
          <DraftCard 
            onShare={handleShare}
            tag="Blog Post" 
            title="Scaling Your Agency with Canvas AI Workflows" 
            color="bg-purple-600" 
            members={1}
            warning="Missing SEO"
          />
          <DraftCard 
            onShare={handleShare}
            tag="X Post" 
            title="Quick tip: Content automation is about speed..." 
            color="bg-amber-500" 
            isGenerating
          />
        </div>

        <div className="m-4 p-5 rounded-2xl primary-gradient text-white relative overflow-hidden shadow-lg">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={14} fill="currentColor" />
              <span className="text-[10px] font-bold tracking-widest uppercase">Canvas Smart-Fill</span>
            </div>
            <p className="text-xs font-medium leading-relaxed opacity-90">Schedule these 5 drafts to reach peak engagement on Thursday afternoon.</p>
            <button 
              onClick={handleAutoSchedule}
              disabled={isAutoScheduling}
              className="mt-4 w-full py-2 bg-white/20 hover:bg-white/30 transition-colors rounded-lg text-xs font-bold backdrop-blur-sm disabled:opacity-50"
            >
              {isAutoScheduling ? 'Scheduling...' : 'Auto-Schedule'}
            </button>
          </div>
        </div>
      </aside>

      {/* FAB */}
      <div className="absolute bottom-10 right-10 z-40">
        <button 
          onClick={() => setShowAddEvent(true)}
          className="w-14 h-14 bg-primary text-white rounded-2xl shadow-xl shadow-primary/40 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 group"
        >
          <Plus size={32} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>

      {/* Add Event Modal */}
      <AnimatePresence>
        {showAddEvent && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddEvent(false)}
              className="absolute inset-0 bg-on-surface/20 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-surface-container-lowest rounded-[2rem] shadow-2xl p-8 border border-outline-variant/10"
            >
              <h3 className="text-xl font-bold mb-6">Schedule New Content</h3>
              <form onSubmit={addEvent} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Content Title</label>
                  <input name="title" type="text" placeholder="e.g. Product Launch Post" className="w-full px-4 py-3 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary outline-none" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Day</label>
                    <input name="day" type="number" min="1" max="31" defaultValue={selectedDay || 10} className="w-full px-4 py-3 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Platform</label>
                    <select name="platform" className="w-full px-4 py-3 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary outline-none">
                      <option>Instagram</option>
                      <option>LinkedIn</option>
                      <option>Twitter/X</option>
                      <option>YouTube</option>
                      <option>Website</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Type</label>
                    <select name="contentType" className="w-full px-4 py-3 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary outline-none">
                      <option>Social Post</option>
                      <option>Thread</option>
                      <option>Carousel</option>
                      <option>Reel Script</option>
                      <option>Blog</option>
                    </select>
                  </div>
                </div>
                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={() => setShowAddEvent(false)} className="flex-1 py-3 font-bold text-on-surface-variant hover:bg-surface-container-low rounded-xl transition-colors">Cancel</button>
                  <button type="submit" className="flex-1 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:brightness-110 transition-all">Schedule</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="absolute inset-0 bg-on-surface/20 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-surface-container-lowest rounded-[2rem] shadow-2xl p-8 border border-outline-variant/10"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      selectedEvent.color === 'blue' ? 'bg-blue-100 text-blue-700' : 
                      selectedEvent.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                      'bg-pink-100 text-pink-700'
                    }`}>
                      {selectedEvent.contentType}
                    </span>
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">{selectedEvent.platform}</span>
                  </div>
                  <h3 className="text-xl font-bold">{selectedEvent.label}</h3>
                </div>
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="p-2 hover:bg-surface-container rounded-full"
                >
                  <Plus size={20} className="rotate-45" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="aspect-video rounded-2xl bg-surface-container-low overflow-hidden border border-outline-variant/5">
                  <img 
                    src={`https://picsum.photos/seed/${selectedEvent.label}/600/400`} 
                    alt={selectedEvent.label}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-surface-container-low">
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Scheduled Date</p>
                    <p className="text-sm font-bold">September {selectedEvent.day}, 2024</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-surface-container-low">
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Status</p>
                    <p className="text-sm font-bold text-primary">Scheduled</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => {
                      handleShare(selectedEvent);
                      setSelectedEvent(null);
                    }}
                    className="flex-1 py-3 bg-surface-container-high text-on-surface font-bold rounded-xl hover:bg-surface-container-highest transition-colors flex items-center justify-center gap-2"
                  >
                    <Share2 size={16} />
                    Share
                  </button>
                  <button 
                    onClick={() => handlePublish(selectedEvent)}
                    disabled={isPublishing}
                    className="flex-1 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isPublishing ? (
                      <RefreshCw size={16} className="animate-spin" />
                    ) : publishSuccess ? (
                      <CheckCircle2 size={16} />
                    ) : (
                      <Send size={16} />
                    )}
                    {isPublishing ? 'Publishing...' : publishSuccess ? 'Published!' : 'Publish Now'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ShareModal 
        isOpen={shareData.isOpen} 
        onClose={() => setShareData(prev => ({ ...prev, isOpen: false }))} 
        content={shareData.content}
      />
    </div>
  );
}

const CalendarDay: React.FC<{ 
  day: number, 
  events?: any[], 
  isToday?: boolean, 
  onShare?: (event: any) => void,
  onAdd?: () => void,
  onEventClick?: (event: any) => void
}> = ({ day, events = [], isToday = false, onShare, onAdd, onEventClick }) => {
  return (
    <div 
      onClick={onAdd}
      className={`group/day min-h-[80px] sm:min-h-[120px] p-1 sm:p-2 border-r border-b border-outline-variant/5 transition-colors hover:bg-surface-container-low/50 cursor-pointer relative ${isToday ? 'bg-primary/5 ring-1 ring-primary/10' : ''}`}
    >
      <div className="flex justify-between items-start">
        <span className={`text-xs sm:text-sm font-semibold ml-1 sm:ml-2 mt-1 sm:mt-2 block ${isToday ? 'text-primary underline underline-offset-4 font-bold' : ''}`}>
          {day}
        </span>
        <button 
          className="opacity-0 group-hover/day:opacity-100 p-1 text-primary hover:bg-primary/10 rounded-lg transition-all"
          onClick={(e) => {
            e.stopPropagation();
            onAdd?.();
          }}
        >
          <Plus size={14} />
        </button>
      </div>
      <div className="mt-1 sm:mt-2 space-y-1">
        {events.map((event, i) => (
          <div 
            key={i} 
            onClick={(e) => {
              e.stopPropagation();
              onEventClick?.(event);
            }}
            className={`
              group/event px-1 sm:px-2 py-0.5 sm:py-1 rounded text-[8px] sm:text-[10px] font-medium flex items-center justify-between gap-1 cursor-pointer transition-transform hover:scale-[1.02] active:scale-95
              ${event.color === 'blue' ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-500' : 
                event.color === 'purple' ? 'bg-purple-50 text-purple-700 border-l-2 border-purple-500' :
                'bg-pink-50 text-pink-700 border-l-2 border-pink-500'}
            `}
          >
            <div className="flex items-center gap-1 truncate">
              {event.type === 'video' ? <Video size={10} /> : event.type === 'camera' ? <Camera size={10} /> : event.type === 'file-text' ? <FileText size={10} /> : <Zap size={10} />}
              <span className="truncate">{event.label}</span>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onShare?.(event);
              }}
              className="hidden sm:block opacity-0 group-hover/event:opacity-100 transition-opacity hover:text-primary"
            >
              <Share2 size={10} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

function DraftCard({ tag, title, color, members, assets, warning, isGenerating, onShare }: any) {
  return (
    <div className={`p-4 bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/5 cursor-grab active:cursor-grabbing hover:ring-2 hover:ring-primary/20 transition-all group ${isGenerating ? 'opacity-60' : ''}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${color}`}></span>
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">{tag}</span>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onShare?.({ title, tag });
          }}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-on-surface-variant hover:text-primary"
        >
          <Share2 size={14} />
        </button>
      </div>
      <p className="text-sm font-semibold mb-3 leading-snug">{title}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[10px] text-on-surface-variant font-medium">
          {members && (
            <div className="flex -space-x-2">
              <img src="https://picsum.photos/seed/m1/20/20" className="w-6 h-6 rounded-full border-2 border-white" alt="" referrerPolicy="no-referrer" />
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] text-primary font-bold border-2 border-white">+{members-1}</div>
            </div>
          )}
          {assets && (
            <div className="flex items-center gap-1">
              <Paperclip size={12} />
              {assets} assets
            </div>
          )}
          {warning && (
            <div className="flex items-center gap-1 text-red-500">
              <AlertCircle size={12} />
              {warning}
            </div>
          )}
          {isGenerating && <span className="italic">Generating...</span>}
        </div>
        <div className="text-on-surface-variant/40 group-hover:text-primary">
          <GripVertical size={16} />
        </div>
      </div>
    </div>
  );
}
