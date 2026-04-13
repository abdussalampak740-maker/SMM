import React from 'react';
import { 
  TrendingUp, 
  Zap, 
  ArrowUpRight, 
  ArrowRight, 
  FileText, 
  Linkedin, 
  Instagram, 
  Lightbulb,
  Share2
} from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import ShareModal from '../components/ShareModal';

export default function Analytics() {
  const [shareData, setShareData] = React.useState<{ isOpen: boolean; content: any }>({
    isOpen: false,
    content: { title: '', text: '', url: '', image: '' }
  });
  const [timeRange, setTimeRange] = React.useState('30 Days');

  const kpis = timeRange === '30 Days' ? [
    { label: 'Total Impressions', value: '1,284,092', trend: '+12.4%', progress: 70, color: 'border-primary' },
    { label: 'Avg. CTR', value: '4.82%', trend: '+2.1%', progress: 45, color: 'border-blue-500' },
    { label: 'Engagement Growth', value: '24.5k', trend: '+8.9%', progress: 62, color: 'border-orange-500' },
    { label: 'AI Saved Hours', value: '142h', trend: 'OPTIMIZED', progress: 88, color: 'border-primary', isAI: true },
  ] : timeRange === '90 Days' ? [
    { label: 'Total Impressions', value: '4,512,842', trend: '+25.2%', progress: 85, color: 'border-primary' },
    { label: 'Avg. CTR', value: '5.12%', trend: '+4.5%', progress: 60, color: 'border-blue-500' },
    { label: 'Engagement Growth', value: '82.1k', trend: '+15.4%', progress: 78, color: 'border-orange-500' },
    { label: 'AI Saved Hours', value: '412h', trend: 'OPTIMIZED', progress: 92, color: 'border-primary', isAI: true },
  ] : [
    { label: 'Total Impressions', value: '18.4M', trend: '+142%', progress: 95, color: 'border-primary' },
    { label: 'Avg. CTR', value: '5.84%', trend: '+12.1%', progress: 82, color: 'border-blue-500' },
    { label: 'Engagement Growth', value: '240k', trend: '+84%', progress: 90, color: 'border-orange-500' },
    { label: 'AI Saved Hours', value: '1.8K', trend: 'OPTIMIZED', progress: 98, color: 'border-primary', isAI: true },
  ];

  const handleShare = (item: any) => {
    setShareData({
      isOpen: true,
      content: {
        title: item.title,
        text: `Our ${item.tag} is performing exceptionally well! Check out the analytics on Canvas AI.`,
        url: `https://canvas-ai.app/analytics/${item.title.toLowerCase().replace(/\s+/g, '-')}`,
        image: item.img
      }
    });
  };

  return (
    <div className="space-y-10">
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-on-surface">Content Performance Overview</h1>
          <p className="text-on-surface-variant max-w-xl leading-relaxed">Detailed insights across all active channels. Automation engine currently optimizing for peak engagement window (18:00 - 21:00 UTC).</p>
        </div>
        <div className="md:col-span-4 flex justify-end items-end gap-2">
          <div className="bg-surface-container-lowest p-1 rounded-xl shadow-sm flex items-center border border-outline-variant/10">
            {['30 Days', '90 Days', 'All Time'].map((range) => (
              <button 
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${timeRange === range ? 'bg-primary text-white' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <KPICard key={i} {...kpi} />
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-outline-variant/10 relative overflow-hidden editorial-shadow">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-bold text-on-surface">Reach & Velocity</h3>
              <p className="text-sm text-on-surface-variant">Daily reach aggregates across all platforms</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary"></span>
                <span className="text-xs font-semibold text-on-surface-variant">Actual Reach</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary/20"></span>
                <span className="text-xs font-semibold text-on-surface-variant">Projected</span>
              </div>
            </div>
          </div>
          
          <div className="relative h-64 w-full mt-4">
            <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#630ed4" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#630ed4" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,150 Q100,140 200,100 T400,120 T600,60 T800,40" fill="none" stroke="#630ed4" strokeWidth="4" strokeLinecap="round" />
              <path d="M0,150 Q100,140 200,100 T400,120 T600,60 T800,40 V200 H0 Z" fill="url(#grad)" />
            </svg>
            <div className="absolute inset-0 flex flex-col justify-between opacity-5 pointer-events-none">
              {[1, 2, 3, 4].map(i => <div key={i} className="w-full border-b border-on-surface"></div>)}
            </div>
          </div>
          <div className="flex justify-between mt-4 px-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
              <span key={d} className="text-[10px] font-bold text-on-surface-variant uppercase">{d}</span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-outline-variant/10 editorial-shadow">
          <h3 className="text-xl font-bold text-on-surface mb-2">Platform Split</h3>
          <p className="text-sm text-on-surface-variant mb-10">Comparison of reach per channel</p>
          <div className="space-y-8">
            <PlatformBar label="Instagram" value="45%" icon={<Instagram size={16} />} color="bg-gradient-to-r from-purple-500 to-pink-500" />
            <PlatformBar label="LinkedIn" value="38%" icon={<Linkedin size={16} />} color="bg-blue-600" />
            <PlatformBar label="Tech Blog" value="17%" icon={<FileText size={16} />} color="bg-primary" />
          </div>
          <div className="mt-12 p-4 bg-primary/5 rounded-xl border border-primary/10">
            <div className="flex gap-3">
              <Lightbulb className="text-primary shrink-0" size={18} />
              <p className="text-xs text-on-surface-variant leading-relaxed">
                <strong className="text-primary">Insight:</strong> LinkedIn engagement is peaking 15% higher than average on Tuesdays. Consider shifting blog distribution to match.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6 pb-12">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-bold text-on-surface">Top Performing Content</h3>
            <p className="text-on-surface-variant">Articles and posts with highest conversion metrics</p>
          </div>
          <button className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline group">
            View full library <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ContentCard 
            onShare={handleShare}
            title="The Future of AI-Driven Content Personalization in 2024" 
            tag="Article" 
            img="https://picsum.photos/seed/ai-future/600/400" 
            stats={{ views: '12.4k', ctr: '8.2%', time: '4:20m' }}
            color="border-primary"
            tagColor="bg-primary"
          />
          <ContentCard 
            onShare={handleShare}
            title="How we automated 40 hours of manual posting tasks" 
            tag="LinkedIn" 
            img="https://picsum.photos/seed/automation/600/400" 
            stats={{ engage: '4.2k', shares: '842', leads: '124' }}
            color="border-blue-500"
            tagColor="bg-blue-500"
          />
          <ContentCard 
            onShare={handleShare}
            title="The Secret Sauce: Data-First Creative Direction" 
            tag="Instagram" 
            img="https://picsum.photos/seed/data/600/400" 
            stats={{ reach: '82k', saves: '1.2k', dms: '48' }}
            color="border-pink-500"
            tagColor="bg-pink-500"
          />
        </div>
      </section>

      <ShareModal 
        isOpen={shareData.isOpen} 
        onClose={() => setShareData(prev => ({ ...prev, isOpen: false }))} 
        content={shareData.content}
      />
    </div>
  );
}

function KPICard({ label, value, trend, progress, color, isAI }: any) {
  return (
    <div className={`bg-surface-container-lowest p-6 rounded-xl border-l-4 ${color} shadow-sm hover:translate-y-[-4px] transition-transform duration-300`}>
      <div className="flex justify-between items-start mb-4">
        <span className="text-on-surface-variant font-medium text-xs tracking-wider uppercase">{label}</span>
        <span className={`px-2 py-1 rounded text-[10px] font-bold ${trend === 'OPTIMIZED' ? 'bg-primary/10 text-primary' : 'bg-green-100 text-green-700'}`}>{trend}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold font-headline">{value}</span>
        {isAI ? <Zap size={14} className="text-primary" fill="currentColor" /> : <TrendingUp size={14} className="text-green-500" />}
      </div>
      <div className="mt-4 h-1 w-full bg-surface-container-low rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1 }}
          className={`h-full primary-gradient`} 
        />
      </div>
    </div>
  );
}

function PlatformBar({ label, value, icon, color }: any) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span className="text-on-surface-variant">{icon}</span>
          <span className="text-sm font-semibold">{label}</span>
        </div>
        <span className="text-sm font-bold">{value}</span>
      </div>
      <div className="h-3 w-full bg-surface-container-low rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: value }}
          transition={{ duration: 1 }}
          className={`h-full ${color} rounded-full`} 
        />
      </div>
    </div>
  );
}

function ContentCard({ title, tag, img, stats, color, tagColor, onShare }: any) {
  const navigate = useNavigate();
  return (
    <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all group border border-outline-variant/10">
      <div className="h-48 relative overflow-hidden">
        <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
        <div className={`absolute top-4 left-4 ${tagColor} text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest`}>{tag}</div>
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onShare({ title, tag, img })}
            className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/40"
          >
            <Share2 size={14} />
          </button>
          <button 
            onClick={() => navigate('/create')}
            className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/40"
          >
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
      <div className={`p-6 border-l-2 ${color} cursor-pointer hover:bg-surface-container-low transition-colors`} onClick={() => navigate('/create')}>
        <h4 className="font-bold text-lg mb-2 line-clamp-2">{title}</h4>
        <div className="grid grid-cols-3 gap-4 mt-6">
          {Object.entries(stats).map(([k, v]: any) => (
            <div key={k}>
              <p className="text-[10px] uppercase font-bold text-on-surface-variant opacity-60 mb-1">{k}</p>
              <p className="text-sm font-bold">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
