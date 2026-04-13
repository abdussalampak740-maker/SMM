import React from 'react';
import { 
  X, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Link as LinkIcon, 
  Check, 
  Copy,
  ExternalLink,
  Facebook
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: {
    title: string;
    text: string;
    url: string;
    image?: string;
  };
}

export default function ShareModal({ isOpen, onClose, content }: ShareModalProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${content.text}\n\n${content.url}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = [
    {
      name: 'Twitter',
      icon: <Twitter size={20} />,
      color: 'bg-[#1DA1F2]',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(content.text)}&url=${encodeURIComponent(content.url)}`,
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin size={20} />,
      color: 'bg-[#0A66C2]',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(content.url)}`,
    },
    {
      name: 'Facebook',
      icon: <Facebook size={20} />,
      color: 'bg-[#1877F2]',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(content.url)}`,
    },
    {
      name: 'Instagram',
      icon: <Instagram size={20} />,
      color: 'bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]',
      onClick: () => {
        alert("Instagram sharing is best done via the mobile app. We've copied the caption and image link to your clipboard!");
        handleCopy();
      }
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="p-8 overflow-y-auto flex-1">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-on-surface tracking-tight">Share Content</h3>
                <button 
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Preview */}
                <div className="flex gap-4 p-4 bg-surface-container-low rounded-2xl border border-outline-variant/10">
                  {content.image && (
                    <img 
                      src={content.image} 
                      alt="Preview" 
                      className="w-20 h-20 rounded-xl object-cover shrink-0"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-on-surface truncate">{content.title}</h4>
                    <p className="text-xs text-on-surface-variant line-clamp-2 mt-1">{content.text}</p>
                  </div>
                </div>

                {/* Social Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {shareLinks.map((link) => (
                    <div key={link.name} className="flex flex-col items-center gap-2">
                      {link.href ? (
                        <a 
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-14 h-14 ${link.color} text-white rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-95`}
                        >
                          {link.icon}
                        </a>
                      ) : (
                        <button 
                          onClick={link.onClick}
                          className={`w-14 h-14 ${link.color} text-white rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-95`}
                        >
                          {link.icon}
                        </button>
                      )}
                      <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">{link.name}</span>
                    </div>
                  ))}
                </div>

                {/* Copy Link */}
                <div className="space-y-2 pt-4">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest ml-1">Direct Link</label>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-surface-container-low rounded-xl px-4 py-3 text-xs font-medium text-on-surface-variant truncate border border-outline-variant/10">
                      {content.url}
                    </div>
                    <button 
                      onClick={handleCopy}
                      className={`px-4 rounded-xl flex items-center gap-2 text-xs font-bold transition-all ${copied ? 'bg-green-500 text-white' : 'bg-primary text-white hover:bg-primary/90'}`}
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-low p-6 flex items-center justify-center gap-2 border-t border-outline-variant/10">
              <ExternalLink size={14} className="text-on-surface-variant" />
              <span className="text-xs font-medium text-on-surface-variant">Open in full editor for more options</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
