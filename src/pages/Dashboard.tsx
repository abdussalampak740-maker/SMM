import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Calendar as CalendarIcon, 
  Zap, 
  Heart, 
  Clock, 
  ArrowRight, 
  Edit3, 
  Share2, 
  Video, 
  Image as ImageIcon,
  MoreHorizontal
} from 'lucide-react';
import { motion } from 'motion/react';
import ShareModal from '../components/ShareModal';

export default function Dashboard() {
  const navigate = useNavigate();
  const [shareData, setShareData] = React.useState<{ isOpen: boolean; content: any }>({
    isOpen: false,
    content: { title: '', text: '', url: '', image: '' }
  });

  const handleShare = (item: any) => {
    setShareData({
      isOpen: true,
      content: {
        title: item.title,
        text: `Check out this ${item.platform} content generated with Canvas AI!`,
        url: `https://canvas-ai.app/p/${item.title.toLowerCase().replace(/\s+/g, '-')}`,
        image: `https://picsum.photos/seed/${item.title}/400/400`
      }
    });
  };

  return (
    <div className="space-y-10">
      {/* Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-on-surface">Good Morning, Alex</h2>
          <p className="text-on-surface-variant mt-1 text-sm sm:text-base">Here's what's happening with your content ecosystem today.</p>
        </div>
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary bg-primary/5 px-4 py-2 rounded-full self-start sm:self-auto">
          <Clock size={14} />
          Last sync: 2 mins ago
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          icon={<FileText size={20} />} 
          label="Total Content Created" 
          value="2,450" 
          trend="+12%" 
          color="text-primary"
        />
        <MetricCard 
          icon={<CalendarIcon size={20} />} 
          label="Scheduled Posts" 
          value="42" 
          trend="Static" 
          color="text-secondary"
        />
        <MetricCard 
          icon={<Zap size={20} />} 
          label="Active Automations" 
          value="12" 
          trend="Active" 
          color="text-purple-500"
        />
        <MetricCard 
          icon={<Heart size={20} />} 
          label="Engagement Rate" 
          value="4.8%" 
          trend="+0.4%" 
          color="text-blue-500"
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Weekly Performance */}
        <div className="lg:col-span-8 space-y-8">
          <section className="bg-surface-container-lowest p-4 sm:p-8 rounded-3xl border border-outline-variant/10 relative overflow-hidden editorial-shadow">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
              <div>
                <h4 className="text-lg font-bold">Weekly Performance</h4>
                <p className="text-sm text-on-surface-variant">Consolidated reach across all platforms</p>
              </div>
              <select className="bg-surface-container-low border-none rounded-lg text-xs font-semibold px-4 py-2 outline-none w-full sm:w-auto">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            
            <div className="h-48 sm:h-64 w-full flex items-end justify-between gap-1 sm:gap-2 px-1 sm:px-2">
              {[40, 65, 55, 90, 75, 45, 30].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center group cursor-pointer">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className={`w-full rounded-t-lg transition-all ${i === 3 ? 'primary-gradient shadow-lg shadow-primary/20' : 'bg-primary/10 group-hover:bg-primary/20'}`}
                  />
                  <span className={`text-[10px] mt-2 font-bold ${i === 3 ? 'text-primary' : 'text-on-surface-variant'}`}>
                    {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'][i]}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Content */}
          <section className="bg-surface-container-lowest rounded-3xl border border-outline-variant/10 overflow-hidden editorial-shadow">
            <div className="p-6 border-b border-outline-variant/5 flex justify-between items-center">
              <h4 className="text-lg font-bold">Recent Content</h4>
              <button 
                onClick={() => navigate('/media')}
                className="text-sm font-semibold text-primary hover:underline"
              >
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-on-surface-variant text-xs uppercase tracking-widest font-bold">
                    <th className="px-8 py-4">Title & Platform</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4 text-right">Engagement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/5">
                  <ContentRow onShare={handleShare} title="The Future of AI Design" platform="LinkedIn • Blog" status="Published" engagement="1.2k" icon={<FileText size={16} />} />
                  <ContentRow onShare={handleShare} title="Winter Vibes Collection" platform="Instagram • Post" status="Scheduled" engagement="—" icon={<ImageIcon size={16} />} />
                  <ContentRow onShare={handleShare} title="Q4 Roadmap Overview" platform="YouTube • Video" status="Draft" engagement="—" icon={<Video size={16} />} />
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Sidebar Actions */}
        <div className="lg:col-span-4 space-y-8">
          <section className="space-y-4">
            <h4 className="text-lg font-bold px-1">Quick Actions</h4>
            <div className="grid grid-cols-1 gap-3">
              <QuickAction onClick={() => navigate('/create')} icon={<Edit3 size={20} />} title="Generate Blog" desc="AI-powered long form content" color="bg-primary/5 text-primary" hoverColor="group-hover:bg-primary" />
              <QuickAction onClick={() => navigate('/create')} icon={<Share2 size={20} />} title="Create Social Post" desc="Multi-platform viral snippets" color="bg-blue-500/5 text-blue-500" hoverColor="group-hover:bg-blue-500" />
              <QuickAction onClick={() => navigate('/create')} icon={<Video size={20} />} title="Generate Video Script" desc="Engaging 60s hooks and tags" color="bg-orange-500/5 text-orange-500" hoverColor="group-hover:bg-orange-500" />
              <QuickAction onClick={() => navigate('/create')} icon={<ImageIcon size={20} />} title="Create Image Prompt" desc="Midjourney & DALL-E ready" color="bg-cyan-500/5 text-cyan-500" hoverColor="group-hover:bg-cyan-500" />
            </div>
          </section>

          {/* AI Suggestion */}
          <section className="p-6 rounded-3xl bg-surface-container-lowest border-l-4 border-primary shadow-lg shadow-primary/5">
            <div className="flex items-center gap-2 text-primary mb-3">
              <Zap size={14} fill="currentColor" />
              <span className="text-xs font-extrabold uppercase tracking-widest">AI Suggestion</span>
            </div>
            <h5 className="font-bold text-sm mb-2">Trend Alert: Sustainable Tech</h5>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Engagement for "Green Computing" is up 45% this week. We recommend generating a thread for X/Twitter to capture the momentum.
            </p>
            <button 
              onClick={() => navigate('/create')}
              className="mt-4 text-xs font-bold text-primary flex items-center gap-1 hover:gap-2 transition-all group"
            >
              Generate now <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
            </button>
          </section>

          {/* Media Preview */}
          <div className="rounded-3xl overflow-hidden aspect-[4/3] relative group shadow-lg">
            <img 
              src="https://picsum.photos/seed/ai-art/600/450" 
              alt="Generated Visual" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
              <p className="text-white font-bold text-sm">Last Generated Visual</p>
              <p className="text-white/70 text-xs">Conceptual AI Node Network</p>
            </div>
          </div>
        </div>
      </div>
      
      <ShareModal 
        isOpen={shareData.isOpen} 
        onClose={() => setShareData(prev => ({ ...prev, isOpen: false }))} 
        content={shareData.content}
      />
    </div>
  );
}

function MetricCard({ icon, label, value, trend, color }: { icon: React.ReactNode, label: string, value: string, trend: string, color: string }) {
  return (
    <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-outline-variant/10">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 bg-surface-container-low ${color} rounded-xl`}>
          {icon}
        </div>
        <span className={`text-xs font-bold ${trend.startsWith('+') ? 'text-green-600 bg-green-50' : 'text-on-surface-variant bg-surface-container-low'} px-2 py-1 rounded-full`}>
          {trend}
        </span>
      </div>
      <p className="text-on-surface-variant text-sm font-medium">{label}</p>
      <h3 className="text-3xl font-bold mt-1">{value}</h3>
    </div>
  );
}

function ContentRow({ title, platform, status, engagement, icon, onShare }: { title: string, platform: string, status: string, engagement: string, icon: React.ReactNode, onShare: (item: any) => void }) {
  const navigate = useNavigate();
  const statusColors = {
    Published: 'bg-green-50 text-green-700 border-green-200',
    Scheduled: 'bg-blue-50 text-blue-700 border-blue-200',
    Draft: 'bg-surface-container-low text-on-surface-variant border-outline-variant/20'
  };

  return (
    <tr 
      onClick={() => navigate('/create')}
      className="hover:bg-surface-container-low transition-colors group/row cursor-pointer"
    >
      <td className="px-4 sm:px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-primary shrink-0">
            {icon}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold truncate max-w-[120px] sm:max-w-none">{title}</p>
            <p className="text-xs text-on-surface-variant truncate">{platform}</p>
          </div>
        </div>
      </td>
      <td className="px-4 sm:px-8 py-5">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold border ${statusColors[status as keyof typeof statusColors]}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${status === 'Published' ? 'bg-green-600' : status === 'Scheduled' ? 'bg-blue-600' : 'bg-on-surface-variant'}`}></span>
          {status}
        </span>
      </td>
      <td className="px-4 sm:px-8 py-5 text-right">
        <div className="flex items-center justify-end gap-2 sm:gap-4">
          <span className="font-bold text-xs sm:text-sm">{engagement}</span>
          <button 
            onClick={(e) => { e.stopPropagation(); onShare({ title, platform }); }}
            className="sm:opacity-0 sm:group-hover/row:opacity-100 transition-opacity p-1.5 hover:bg-primary/10 rounded-lg text-primary"
          >
            <Share2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
}

function QuickAction({ icon, title, desc, color, hoverColor, onClick }: { icon: React.ReactNode, title: string, desc: string, color: string, hoverColor: string, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center gap-4 p-4 bg-surface-container-lowest rounded-2xl border border-outline-variant/10 hover:border-primary/50 transition-all text-left group editorial-shadow w-full"
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${color} ${hoverColor} group-hover:text-white`}>
        {icon}
      </div>
      <div>
        <p className="font-bold text-sm">{title}</p>
        <p className="text-xs text-on-surface-variant">{desc}</p>
      </div>
    </button>
  );
}
