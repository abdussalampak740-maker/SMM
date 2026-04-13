import React from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Zap, 
  Globe, 
  CreditCard,
  ChevronRight,
  Camera
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Settings() {
  const [activeSection, setActiveSection] = React.useState('Profile');
  const [isSaving, setIsSaving] = React.useState(false);
  const [connectedPlatforms, setConnectedPlatforms] = React.useState({
    Instagram: { connected: true, username: '@alex_creatives' },
    LinkedIn: { connected: true, username: 'Alex Johnson' },
    'Twitter / X': { connected: false },
    Slack: { connected: false }
  });

  React.useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        const platform = event.data.platform;
        setConnectedPlatforms(prev => ({
          ...prev,
          [platform]: { connected: true, username: 'Connected User' }
        }));
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleConnect = (platform: string) => {
    const width = 600;
    const height = 700;
    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;
    
    window.open(
      `/mock-auth?platform=${encodeURIComponent(platform)}`,
      'oauth_popup',
      `width=${width},height=${height},left=${left},top=${top}`
    );
  };

  const handleDisconnect = (platform: string) => {
    setConnectedPlatforms(prev => ({
      ...prev,
      [platform]: { connected: false }
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-on-surface">Settings</h1>
        <p className="text-on-surface-variant mt-1">Manage your account, preferences, and integrations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Sidebar Navigation */}
        <div className="md:col-span-4 space-y-2">
          <SettingsNavItem 
            icon={<User size={18} />} 
            label="Profile" 
            active={activeSection === 'Profile'} 
            onClick={() => setActiveSection('Profile')}
          />
          <SettingsNavItem 
            icon={<Bell size={18} />} 
            label="Notifications" 
            active={activeSection === 'Notifications'} 
            onClick={() => setActiveSection('Notifications')}
          />
          <SettingsNavItem 
            icon={<Shield size={18} />} 
            label="Security" 
            active={activeSection === 'Security'} 
            onClick={() => setActiveSection('Security')}
          />
          <SettingsNavItem 
            icon={<Zap size={18} />} 
            label="Integrations" 
            active={activeSection === 'Integrations'} 
            onClick={() => setActiveSection('Integrations')}
          />
          <SettingsNavItem 
            icon={<Globe size={18} />} 
            label="Language & Region" 
            active={activeSection === 'Language & Region'} 
            onClick={() => setActiveSection('Language & Region')}
          />
          <SettingsNavItem 
            icon={<CreditCard size={18} />} 
            label="Billing & Plan" 
            active={activeSection === 'Billing & Plan'} 
            onClick={() => setActiveSection('Billing & Plan')}
          />
        </div>

        {/* Main Settings Content */}
        <div className="md:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              {activeSection === 'Profile' && (
                <section className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/10 shadow-sm">
                  <h3 className="text-lg font-bold mb-6">Public Profile</h3>
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
                    <div className="relative group">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/10">
                        <img src="https://picsum.photos/seed/alex/200/200" alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                        <Camera size={14} />
                      </button>
                    </div>
                    <div className="text-center sm:text-left">
                      <h4 className="font-bold text-lg">Alex Johnson</h4>
                      <p className="text-sm text-on-surface-variant">Update your photo and personal details here.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Full Name</label>
                      <input type="text" defaultValue="Alex Johnson" className="w-full px-4 py-3 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Email Address</label>
                      <input type="email" defaultValue="abdussalampak740@gmail.com" className="w-full px-4 py-3 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary outline-none" />
                    </div>
                    <div className="sm:col-span-2 space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Bio</label>
                      <textarea rows={3} defaultValue="Content strategist and AI enthusiast. Building the future of automated creativity." className="w-full px-4 py-3 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary outline-none resize-none" />
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-outline-variant/10 flex justify-end gap-3">
                    <button className="px-6 py-2.5 font-bold text-on-surface-variant hover:bg-surface-container-low rounded-xl transition-colors">Cancel</button>
                    <button 
                      onClick={handleSave}
                      disabled={isSaving}
                      className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:brightness-110 transition-all disabled:opacity-50"
                    >
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </section>
              )}

              {activeSection === 'Notifications' && (
                <section className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/10 shadow-sm">
                  <h3 className="text-lg font-bold mb-6">Notification Preferences</h3>
                  <div className="space-y-6">
                    <NotificationToggle title="Email Notifications" desc="Receive daily summaries and important alerts via email." defaultChecked />
                    <NotificationToggle title="Push Notifications" desc="Get real-time updates on your desktop or mobile device." defaultChecked />
                    <NotificationToggle title="Weekly Reports" desc="A detailed breakdown of your content performance." />
                    <NotificationToggle title="AI Suggestions" desc="Notifications when our AI finds new trending topics for you." defaultChecked />
                  </div>
                </section>
              )}

              {activeSection === 'Security' && (
                <section className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/10 shadow-sm">
                  <h3 className="text-lg font-bold mb-6">Security Settings</h3>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-on-surface">Change Password</h4>
                      <div className="space-y-4">
                        <input type="password" placeholder="Current Password" className="w-full px-4 py-3 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary outline-none" />
                        <input type="password" placeholder="New Password" className="w-full px-4 py-3 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary outline-none" />
                        <button className="px-6 py-2.5 bg-surface-container-high text-on-surface font-bold rounded-xl hover:bg-surface-container-highest transition-colors">Update Password</button>
                      </div>
                    </div>
                    <div className="h-px bg-outline-variant/10"></div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-on-surface">Two-Factor Authentication</h4>
                        <p className="text-xs text-on-surface-variant mt-1">Add an extra layer of security to your account.</p>
                      </div>
                      <button className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg">Enable</button>
                    </div>
                  </div>
                </section>
              )}

              {activeSection === 'Integrations' && (
                <section className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/10 shadow-sm">
                  <h3 className="text-lg font-bold mb-6">Connected Platforms</h3>
                  <p className="text-sm text-on-surface-variant mb-6">Manage your social media accounts and third-party integrations.</p>
                  <div className="space-y-4">
                    <ConnectedAccount 
                      name="Instagram" 
                      status={connectedPlatforms.Instagram.connected ? 'Connected' : 'Not Connected'} 
                      username={connectedPlatforms.Instagram.username} 
                      icon="https://cdn-icons-png.flaticon.com/512/174/174855.png" 
                      onConnect={() => handleConnect('Instagram')}
                      onDisconnect={() => handleDisconnect('Instagram')}
                    />
                    <ConnectedAccount 
                      name="LinkedIn" 
                      status={connectedPlatforms.LinkedIn.connected ? 'Connected' : 'Not Connected'} 
                      username={connectedPlatforms.LinkedIn.username} 
                      icon="https://cdn-icons-png.flaticon.com/512/174/174857.png" 
                      onConnect={() => handleConnect('LinkedIn')}
                      onDisconnect={() => handleDisconnect('LinkedIn')}
                    />
                    <ConnectedAccount 
                      name="Twitter / X" 
                      status={connectedPlatforms['Twitter / X'].connected ? 'Connected' : 'Not Connected'} 
                      username={connectedPlatforms['Twitter / X'].username} 
                      icon="https://cdn-icons-png.flaticon.com/512/733/733579.png" 
                      onConnect={() => handleConnect('Twitter / X')}
                      onDisconnect={() => handleDisconnect('Twitter / X')}
                    />
                    <ConnectedAccount 
                      name="Slack" 
                      status={connectedPlatforms.Slack.connected ? 'Connected' : 'Not Connected'} 
                      username={connectedPlatforms.Slack.username} 
                      icon="https://cdn-icons-png.flaticon.com/512/3800/3800024.png" 
                      onConnect={() => handleConnect('Slack')}
                      onDisconnect={() => handleDisconnect('Slack')}
                    />
                  </div>
                </section>
              )}

              {activeSection === 'Language & Region' && (
                <section className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/10 shadow-sm">
                  <h3 className="text-lg font-bold mb-6">Language & Region</h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Interface Language</label>
                      <select className="w-full px-4 py-3 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary outline-none">
                        <option>English (US)</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Timezone</label>
                      <select className="w-full px-4 py-3 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary outline-none">
                        <option>(GMT-08:00) Pacific Time</option>
                        <option>(GMT+00:00) London</option>
                        <option>(GMT+05:30) Mumbai</option>
                        <option>(GMT+09:00) Tokyo</option>
                      </select>
                    </div>
                  </div>
                </section>
              )}

              {activeSection === 'Billing & Plan' && (
                <section className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/10 shadow-sm">
                  <h3 className="text-lg font-bold mb-6">Billing & Plan</h3>
                  <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 mb-8">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-xs font-bold text-primary uppercase tracking-widest">Current Plan</p>
                        <h4 className="text-2xl font-bold text-on-surface mt-1">Power User</h4>
                      </div>
                      <span className="px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-full uppercase tracking-wider">Active</span>
                    </div>
                    <p className="text-sm text-on-surface-variant mb-6">Your next billing date is May 10, 2026 for $49.00.</p>
                  </div>
                  
                  <div className="space-y-8">
                    <h4 className="text-sm font-bold text-on-surface">Available Plans</h4>
                    <div className="grid grid-cols-1 gap-4">
                      <PlanCard 
                        name="Free" 
                        price="$0" 
                        desc="Perfect for individuals starting their content journey."
                        features={['5 AI generations/mo', '1 Social account', 'Basic analytics']}
                      />
                      <PlanCard 
                        name="Power User" 
                        price="$49" 
                        desc="For serious creators who need scale and speed."
                        features={['Unlimited AI generations', '10 Social accounts', 'Advanced analytics', 'Priority support']}
                        active
                      />
                      <PlanCard 
                        name="Enterprise" 
                        price="Custom" 
                        desc="Bespoke solutions for large teams and agencies."
                        features={['Custom AI models', 'Unlimited accounts', 'API access', 'Dedicated account manager']}
                      />
                    </div>

                    <div className="h-px bg-outline-variant/10"></div>

                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-on-surface">Payment Method</h4>
                      <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low border border-outline-variant/5">
                        <div className="flex items-center gap-3">
                          <CreditCard size={20} className="text-on-surface-variant" />
                          <div>
                            <p className="text-sm font-bold">Visa ending in 4242</p>
                            <p className="text-xs text-on-surface-variant">Expires 12/28</p>
                          </div>
                        </div>
                        <button className="text-xs font-bold text-primary hover:underline">Edit</button>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function SettingsNavItem({ icon, label, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${active ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-on-surface-variant hover:bg-surface-container-low'}`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-sm font-bold">{label}</span>
      </div>
      <ChevronRight size={16} className={active ? 'opacity-100' : 'opacity-0'} />
    </button>
  );
}

function NotificationToggle({ title, desc, defaultChecked }: any) {
  const [checked, setChecked] = React.useState(defaultChecked);
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex-1">
        <h4 className="text-sm font-bold text-on-surface">{title}</h4>
        <p className="text-xs text-on-surface-variant mt-0.5">{desc}</p>
      </div>
      <button 
        onClick={() => setChecked(!checked)}
        className={`w-10 h-5 rounded-full relative transition-colors ${checked ? 'bg-primary' : 'bg-surface-container-highest'}`}
      >
        <motion.div 
          animate={{ x: checked ? 22 : 2 }}
          className="absolute top-1 w-3 h-3 bg-white rounded-full shadow-sm"
        />
      </button>
    </div>
  );
}

function ConnectedAccount({ name, status, username, icon, onConnect, onDisconnect }: any) {
  const isConnected = status === 'Connected';
  
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-low border border-outline-variant/5">
      <div className="flex items-center gap-4">
        <img src={icon} alt={name} className="w-10 h-10 rounded-lg object-contain" referrerPolicy="no-referrer" />
        <div>
          <h4 className="text-sm font-bold">{name}</h4>
          <p className="text-xs text-on-surface-variant">{isConnected ? username || 'Connected' : 'Connect your account'}</p>
        </div>
      </div>
      <button 
        onClick={() => isConnected ? onDisconnect() : onConnect()}
        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${isConnected ? 'bg-surface-container-high text-on-surface-variant hover:bg-red-50 hover:text-red-500' : 'bg-primary text-white hover:brightness-110'}`}
      >
        {isConnected ? 'Disconnect' : 'Connect'}
      </button>
    </div>
  );
}

function PlanCard({ name, price, desc, features, active }: any) {
  return (
    <div className={`p-6 rounded-2xl border transition-all ${active ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-outline-variant/10 bg-surface-container-low hover:border-primary/30'}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-lg font-bold text-on-surface">{name}</h4>
          <p className="text-2xl font-bold text-primary mt-1">{price}<span className="text-xs text-on-surface-variant font-normal">/mo</span></p>
        </div>
        {active ? (
          <span className="px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-full uppercase tracking-wider">Current</span>
        ) : (
          <button className="px-4 py-2 bg-white border border-outline-variant/20 text-on-surface text-xs font-bold rounded-lg hover:bg-surface-container-low transition-colors">Select</button>
        )}
      </div>
      <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">{desc}</p>
      <ul className="space-y-2">
        {features.map((f: string, i: number) => (
          <li key={i} className="flex items-center gap-2 text-[10px] font-medium text-on-surface-variant">
            <div className="w-1 h-1 rounded-full bg-primary/40"></div>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}
