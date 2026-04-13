import React, { useEffect } from 'react';
import { Zap, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function MockAuth() {
  const [status, setStatus] = React.useState<'loading' | 'confirm' | 'success'>('loading');
  const queryParams = new URLSearchParams(window.location.search);
  const platform = queryParams.get('platform') || 'Social Media';

  useEffect(() => {
    const timer = setTimeout(() => setStatus('confirm'), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleConfirm = () => {
    setStatus('success');
    setTimeout(() => {
      if (window.opener) {
        window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS', platform }, '*');
        window.close();
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-surface-container-lowest flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-8 shadow-2xl border border-outline-variant/10 text-center">
        <div className="w-16 h-16 rounded-2xl primary-gradient flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-primary/20">
          <Zap size={32} fill="currentColor" />
        </div>

        {status === 'loading' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-on-surface">Connecting to {platform}...</h2>
            <div className="flex justify-center">
              <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            </div>
            <p className="text-on-surface-variant">Please wait while we establish a secure connection.</p>
          </div>
        )}

        {status === 'confirm' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-on-surface">Authorize Canvas AI?</h2>
            <p className="text-on-surface-variant">
              Canvas AI is requesting permission to access your <strong>{platform}</strong> account to schedule and publish content on your behalf.
            </p>
            <div className="bg-surface-container-low p-4 rounded-2xl text-left space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Permissions:</div>
              <ul className="text-sm text-on-surface space-y-1">
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-primary"></div>
                  Read profile information
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-primary"></div>
                  Publish posts and media
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-primary"></div>
                  Access engagement analytics
                </li>
              </ul>
            </div>
            <div className="flex gap-3 pt-2">
              <button 
                onClick={() => window.close()}
                className="flex-1 py-3 font-bold text-on-surface-variant hover:bg-surface-container-low rounded-xl transition-colors"
              >
                Deny
              </button>
              <button 
                onClick={handleConfirm}
                className="flex-1 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:brightness-110 transition-all"
              >
                Authorize
              </button>
            </div>
          </motion.div>
        )}

        {status === 'success' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={40} />
            </div>
            <h2 className="text-2xl font-bold text-on-surface">Successfully Connected!</h2>
            <p className="text-on-surface-variant">Your {platform} account is now linked to Canvas AI. This window will close automatically.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
