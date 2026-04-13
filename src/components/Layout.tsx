import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Calendar, 
  Library, 
  Zap, 
  BarChart3, 
  Settings,
  Search,
  Bell,
  Plus,
  User,
  LogOut,
  X,
  Menu,
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: PlusCircle, label: 'Create Content', path: '/create' },
  { icon: Calendar, label: 'Content Calendar', path: '/calendar' },
  { icon: Library, label: 'Media Library', path: '/media' },
  { icon: Zap, label: 'Automation', path: '/automation' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const notifications = [
    { id: 1, title: 'Content Published', desc: 'Your LinkedIn post is now live.', time: '2m ago' },
    { id: 2, title: 'AI Generation Complete', desc: '5 new image variants are ready.', time: '15m ago' },
    { id: 3, title: 'Trend Alert', desc: 'New trend detected in "Sustainable Tech".', time: '1h ago' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {showMobileMenu && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileMenu(false)}
              className="fixed inset-0 bg-on-surface/20 backdrop-blur-sm z-[60] md:hidden"
            />
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-surface-container-low z-[70] md:hidden flex flex-col py-6 shadow-2xl"
            >
              <div className="px-6 mb-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl primary-gradient flex items-center justify-center text-white shadow-lg shadow-primary/20">
                    <Zap size={20} fill="currentColor" />
                  </div>
                  <h1 className="text-xl font-bold primary-gradient-text">Canvas AI</h1>
                </div>
                <button onClick={() => setShowMobileMenu(false)} className="p-2 text-on-surface-variant">
                  <X size={20} />
                </button>
              </div>

              <nav className="flex-1 px-4 space-y-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setShowMobileMenu(false)}
                    className={({ isActive }) => `
                      flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                      ${isActive 
                        ? 'text-primary font-bold bg-surface-container-lowest/50 border-r-4 border-primary' 
                        : 'text-on-surface-variant hover:bg-surface-container-lowest/30'}
                    `}
                  >
                    <item.icon size={20} className={location.pathname === item.path ? 'text-primary' : ''} />
                    <span className="font-headline text-sm tracking-tight">{item.label}</span>
                  </NavLink>
                ))}
              </nav>

              <div className="px-4 mt-auto">
                <div className="p-4 rounded-2xl primary-gradient text-white shadow-lg shadow-primary/20">
                  <p className="text-xs font-medium opacity-80 mb-2">Power User Plan</p>
                  <p className="text-sm font-bold">85% of Credits Used</p>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-surface-container-low border-r-0 py-6 shrink-0">
        <div className="px-6 mb-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl primary-gradient flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <Zap size={20} fill="currentColor" />
          </div>
          <div>
            <h1 className="text-xl font-bold primary-gradient-text">Canvas AI</h1>
            <p className="text-[10px] text-on-surface-variant/70 uppercase tracking-widest font-bold">Intelligent Automation</p>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                ${isActive 
                  ? 'text-primary font-bold bg-surface-container-lowest/50 border-r-4 border-primary' 
                  : 'text-on-surface-variant hover:bg-surface-container-lowest/30'}
              `}
            >
              <item.icon size={20} className={location.pathname === item.path ? 'text-primary' : ''} />
              <span className="font-headline text-sm tracking-tight">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="px-4 mt-auto">
          <div className="p-4 rounded-2xl primary-gradient text-white shadow-lg shadow-primary/20">
            <p className="text-xs font-medium opacity-80 mb-2">Power User Plan</p>
            <p className="text-sm font-bold mb-3">85% of Credits Used</p>
            <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="bg-white h-full" 
              />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="flex justify-between items-center px-4 md:px-8 h-16 sticky top-0 z-50 bg-background/80 backdrop-blur-xl editorial-shadow shrink-0">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <button 
              onClick={() => setShowMobileMenu(true)}
              className="p-2 text-on-surface-variant md:hidden hover:bg-surface-container-low rounded-lg"
            >
              <Menu size={20} />
            </button>
            
            {location.pathname !== '/' && (
              <button 
                onClick={() => navigate(-1)}
                className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-lg flex items-center gap-1"
              >
                <ArrowLeft size={20} />
                <span className="hidden sm:inline text-xs font-bold">Back</span>
              </button>
            )}

            <div className="relative w-full hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
              <input 
                type="text" 
                placeholder="Search automation tasks..." 
                className="w-full pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-full text-sm focus:ring-2 focus:ring-primary/20 placeholder:text-on-surface-variant/60 outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-6 relative">
            <div className="relative">
              <button 
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfile(false);
                }}
                className={`relative p-2 text-on-surface-variant hover:opacity-80 transition-opacity rounded-full ${showNotifications ? 'bg-surface-container-high' : ''}`}
              >
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-background"></span>
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-[-60px] sm:right-0 mt-4 w-[calc(100vw-2rem)] sm:w-80 bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/10 z-[100] overflow-hidden"
                  >
                    <div className="p-4 border-b border-outline-variant/10 flex justify-between items-center">
                      <h3 className="font-bold">Notifications</h3>
                      <button onClick={() => setShowNotifications(false)}><X size={16} /></button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map(n => (
                        <div key={n.id} className="p-4 hover:bg-surface-container-low transition-colors border-b border-outline-variant/5 last:border-0">
                          <p className="text-sm font-bold">{n.title}</p>
                          <p className="text-xs text-on-surface-variant mt-0.5">{n.desc}</p>
                          <p className="text-[10px] text-on-surface-variant/50 mt-1">{n.time}</p>
                        </div>
                      ))}
                    </div>
                    <button className="w-full py-3 text-xs font-bold text-primary hover:bg-primary/5 transition-colors">View All Notifications</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              onClick={() => navigate('/create')}
              className="primary-gradient text-white px-4 md:px-6 py-2 md:py-2.5 rounded-xl font-semibold text-xs md:text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-95 whitespace-nowrap"
            >
              <span className="hidden xs:inline">New Content</span>
              <Plus className="xs:hidden" size={20} />
            </button>

            <div className="relative">
              <button 
                onClick={() => {
                  setShowProfile(!showProfile);
                  setShowNotifications(false);
                }}
                className={`w-10 h-10 rounded-full bg-surface-container-low overflow-hidden border-2 shadow-sm transition-all ${showProfile ? 'border-primary' : 'border-white'}`}
              >
                <img 
                  src="https://picsum.photos/seed/alex/100/100" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </button>

              <AnimatePresence>
                {showProfile && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-4 w-64 bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/10 z-[100] overflow-hidden"
                  >
                    <div className="p-6 text-center border-b border-outline-variant/10">
                      <div className="w-16 h-16 rounded-full mx-auto mb-3 border-2 border-primary p-1">
                        <img src="https://picsum.photos/seed/alex/100/100" className="w-full h-full rounded-full object-cover" alt="" referrerPolicy="no-referrer" />
                      </div>
                      <h3 className="font-bold">Alex Johnson</h3>
                      <p className="text-xs text-on-surface-variant">abdussalampak740@gmail.com</p>
                    </div>
                    <div className="p-2">
                      <button onClick={() => { navigate('/settings'); setShowProfile(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-on-surface-variant hover:bg-surface-container-low rounded-xl transition-colors">
                        <User size={18} /> Profile Settings
                      </button>
                      <button onClick={() => { navigate('/settings'); setShowProfile(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-on-surface-variant hover:bg-surface-container-low rounded-xl transition-colors">
                        <Settings size={18} /> Preferences
                      </button>
                      <div className="h-px bg-outline-variant/10 my-2 mx-2"></div>
                      <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                        <LogOut size={18} /> Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="p-4 md:p-8 max-w-[1400px] mx-auto w-full"
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
