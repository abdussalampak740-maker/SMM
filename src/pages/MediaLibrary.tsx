import React from 'react';
import { 
  Upload, 
  Search, 
  ChevronDown, 
  Image as ImageIcon, 
  Video, 
  Zap, 
  Download, 
  Share2, 
  Play,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import ShareModal from '../components/ShareModal';

export default function MediaLibrary() {
  const navigate = useNavigate();
  const [shareData, setShareData] = React.useState<{ isOpen: boolean; content: any }>({
    isOpen: false,
    content: { title: '', text: '', url: '', image: '' }
  });
  const [activeFilter, setActiveFilter] = React.useState('Images');
  const [isUploading, setIsUploading] = React.useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => setIsUploading(false), 2000);
  };

  const handleShare = (asset: any) => {
    setShareData({
      isOpen: true,
      content: {
        title: asset.title,
        text: `Check out this ${asset.isVideo ? 'video' : 'image'} generated with Canvas AI!`,
        url: `https://canvas-ai.app/assets/${asset.title.toLowerCase().replace(/\s+/g, '-')}`,
        image: asset.img
      }
    });
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-on-surface">Media Library</h2>
          <p className="text-on-surface-variant mt-1 text-base sm:text-lg">Manage your visual assets and AI-generated media</p>
        </div>
        <button 
          onClick={handleUpload}
          disabled={isUploading}
          className="w-full sm:w-auto px-6 py-3 primary-gradient text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-[0.98] disabled:opacity-50"
        >
          <Upload size={20} className={isUploading ? 'animate-bounce' : ''} />
          {isUploading ? 'Uploading...' : 'Upload New'}
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant/60 px-1">Content Type</label>
          <div className="flex gap-2">
            <button 
              onClick={() => setActiveFilter('Images')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-2 border ${activeFilter === 'Images' ? 'bg-white border-primary/40 text-primary shadow-primary/5' : 'bg-surface-container-low border-transparent text-on-surface-variant hover:bg-white hover:border-primary/40'}`}
            >
              <ImageIcon size={14} /> Images
            </button>
            <button 
              onClick={() => setActiveFilter('Videos')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-2 border ${activeFilter === 'Videos' ? 'bg-white border-primary/40 text-primary shadow-primary/5' : 'bg-surface-container-low border-transparent text-on-surface-variant hover:bg-white hover:border-primary/40'}`}
            >
              <Video size={14} /> Videos
            </button>
          </div>
        </div>
        
        <FilterSelect label="Upload Date" options={['All Time', 'Last 24 Hours', 'Last 7 Days', 'This Month']} />
        <FilterSelect label="Target Platform" options={['Any Platform', 'Instagram', 'LinkedIn', 'Twitter / X']} />
        
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant/60 px-1">Storage Usage</label>
          <div className="bg-surface-container-low h-[46px] rounded-xl px-4 flex items-center gap-3 border border-outline-variant/5">
            <div className="flex-1 h-1.5 bg-outline-variant/20 rounded-full overflow-hidden">
              <div className="w-[65%] h-full primary-gradient"></div>
            </div>
            <span className="text-[11px] font-bold text-on-surface whitespace-nowrap">8.2 / 15 GB</span>
          </div>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <AssetCard onShare={handleShare} title="Abstract Flow v2.jpg" meta="1.2 MB • 1080x1080" img="https://picsum.photos/seed/abstract/400/400" isAI />
        <AssetCard onShare={handleShare} title="Team Workshop.png" meta="4.5 MB • 2400x1600" img="https://picsum.photos/seed/team/400/400" />
        <AssetCard onShare={handleShare} title="Tech Intro Loop.mp4" meta="18.2 MB • 4K Video" img="https://picsum.photos/seed/tech/400/400" isVideo duration="0:15" />
        <AssetCard onShare={handleShare} title="Organic Interior.jpg" meta="2.1 MB • 2048x2048" img="https://picsum.photos/seed/interior/400/400" isAI />
        <AssetCard onShare={handleShare} title="Analytics Dashboard.png" meta="0.8 MB • 1440x900" img="https://picsum.photos/seed/analytics/400/400" />
        <AssetCard onShare={handleShare} title="Tech Nostalgia.jpg" meta="3.4 MB • 3000x2000" img="https://picsum.photos/seed/retro/400/400" />
        <AssetCard onShare={handleShare} title="Global Network.jpg" meta="5.2 MB • 4000x2500" img="https://picsum.photos/seed/network/400/400" />
        <AssetCard onShare={handleShare} title="Ink Swirl.mp4" meta="12.5 MB • HD Video" img="https://picsum.photos/seed/ink/400/400" isVideo duration="0:08" />
        <AssetCard onShare={handleShare} title="Gradient Mesh 04.png" meta="0.4 MB • 1200x1200" img="https://picsum.photos/seed/gradient/400/400" isAI />
        <AssetCard onShare={handleShare} title="Display Macro.jpg" meta="2.7 MB • 3200x2400" img="https://picsum.photos/seed/macro/400/400" />
      </div>

      {/* AI Generator Banner */}
      <div className="mt-16 bg-white rounded-[2rem] p-6 sm:p-8 editorial-shadow flex flex-col md:flex-row items-center gap-6 md:gap-10 overflow-hidden relative border border-outline-variant/10">
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -left-10 -top-10 w-40 h-40 bg-secondary/5 rounded-full blur-2xl"></div>
        <div className="relative flex-shrink-0">
          <div className="w-16 h-16 md:w-20 md:h-20 primary-gradient rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/30">
            <Zap size={32} md:size={40} fill="currentColor" />
          </div>
        </div>
        <div className="flex-1 relative text-center md:text-left">
          <h3 className="text-xl md:text-2xl font-bold text-on-surface">Generate custom visuals in seconds</h3>
          <p className="text-on-surface-variant mt-2 max-w-xl text-sm md:text-lg">Our AI engine can create brand-consistent images and videos based on your current content library and brand guidelines.</p>
        </div>
        <div className="relative w-full md:w-auto">
          <button 
            onClick={() => navigate('/create')}
            className="w-full md:w-auto px-8 py-4 bg-on-surface text-white rounded-xl font-bold text-sm hover:bg-on-surface/90 transition-all active:scale-95 shadow-xl shadow-on-surface/20"
          >
            Try AI Generator
          </button>
        </div>
      </div>

      {/* Pagination */}
      <footer className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10">
        <p className="text-sm font-medium text-on-surface-variant">Showing 10 of 1,248 assets</p>
        <div className="flex items-center gap-1 sm:gap-2">
          <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors">
            <ChevronLeft size={18} sm:size={20} />
          </button>
          <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center bg-primary text-white font-bold text-xs sm:text-sm shadow-lg shadow-primary/20">1</button>
          <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-on-surface font-bold text-xs sm:text-sm hover:bg-surface-container transition-colors">2</button>
          <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-on-surface font-bold text-xs sm:text-sm hover:bg-surface-container transition-colors">3</button>
          <span className="px-1 sm:px-2 text-on-surface-variant text-xs sm:text-sm">...</span>
          <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-on-surface font-bold text-xs sm:text-sm hover:bg-surface-container transition-colors">125</button>
          <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors">
            <ChevronRight size={18} sm:size={20} />
          </button>
        </div>
      </footer>

      <ShareModal 
        isOpen={shareData.isOpen} 
        onClose={() => setShareData(prev => ({ ...prev, isOpen: false }))} 
        content={shareData.content}
      />
    </div>
  );
}

function FilterSelect({ label, options }: { label: string, options: string[] }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant/60 px-1">{label}</label>
      <div className="relative group">
        <select className="w-full bg-white border-none rounded-xl text-xs font-semibold py-2.5 pl-4 pr-10 shadow-sm appearance-none focus:ring-2 focus:ring-primary/10 outline-none">
          {options.map(opt => <option key={opt}>{opt}</option>)}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" size={16} />
      </div>
    </div>
  );
}

function AssetCard({ title, meta, img, isAI, isVideo, duration, onShare }: any) {
  return (
    <div className="group relative flex flex-col gap-3">
      <div className="aspect-square rounded-2xl overflow-hidden bg-surface-container-low relative shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary/5 group-hover:-translate-y-1">
        <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px] opacity-0 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-4">
          <button className="w-full py-2 bg-white text-primary text-xs font-bold rounded-lg shadow-lg hover:bg-primary hover:text-white transition-colors">Use in Post</button>
          <div className="flex gap-2 w-full">
            <button className="flex-1 py-2 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-lg border border-white/30 hover:bg-white/40 transition-colors flex items-center justify-center gap-2">
              <Download size={14} />
            </button>
            <button 
              onClick={() => onShare({ title, img, isVideo })}
              className="flex-1 py-2 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-lg border border-white/30 hover:bg-white/40 transition-colors flex items-center justify-center gap-2"
            >
              <Share2 size={14} />
            </button>
          </div>
        </div>
        {isAI && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur rounded-full px-2 py-1 flex items-center gap-1.5 shadow-sm">
            <Zap size={10} className="text-primary" fill="currentColor" />
            <span className="text-[10px] font-bold text-on-surface">AI Generated</span>
          </div>
        )}
        {isVideo && (
          <>
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:opacity-0 transition-opacity">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xl border border-white/40 flex items-center justify-center">
                <Play size={20} className="text-white fill-white" />
              </div>
            </div>
            <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur text-[10px] text-white font-bold px-2 py-0.5 rounded">{duration}</div>
          </>
        )}
      </div>
      <div className="px-1">
        <h3 className="text-sm font-semibold text-on-surface truncate">{title}</h3>
        <p className="text-[11px] text-on-surface-variant font-medium">{meta}</p>
      </div>
    </div>
  );
}
