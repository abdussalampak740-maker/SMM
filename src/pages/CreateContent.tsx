import React from 'react';
import { 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  RefreshCw, 
  Download, 
  Share2, 
  Lightbulb, 
  MoreHorizontal,
  Zap,
  Edit3,
  Megaphone,
  CheckCircle2,
  Workflow
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ShareModal from '../components/ShareModal';
import { generateContentWithGemini, generateImageWithGemini } from '../services/geminiService';

export default function CreateContent() {
  const [isShareModalOpen, setIsShareModalOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('Social Post');
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [topic, setTopic] = React.useState('Sustainable Urban Living');
  const [platform, setPlatform] = React.useState('Instagram');
  const [type, setType] = React.useState('Social Post');
  const [blogLength, setBlogLength] = React.useState(600);
  const [tone, setTone] = React.useState('Professional & Authoritative');

  React.useEffect(() => {
    if (type === 'Blog') {
      setActiveTab('Blog');
      setPlatform('Website');
    }
    else if (type === 'Social Post') setActiveTab('Social Post');
    else if (type === 'Reel Script') setActiveTab('Video Script');
  }, [type]);
  const [generatedContent, setGeneratedContent] = React.useState<any>(null);
  const [isPublishing, setIsPublishing] = React.useState(false);
  const [publishSuccess, setPublishSuccess] = React.useState(false);
  
  const handleGenerate = async () => {
    if (!topic) return;
    setIsGenerating(true);
    setPublishSuccess(false);
    
    try {
      // 1. Generate text content
      const content = await generateContentWithGemini(topic, platform, type, tone, blogLength);
      
      // 2. Generate unique image
      const imageUrl = await generateImageWithGemini(content.imagePrompt);
      
      setGeneratedContent({
        title: content.title,
        platform: platform,
        type: type,
        tone: tone,
        text: content.description,
        tags: content.tags,
        image: imageUrl,
        imagePrompt: content.imagePrompt
      });
    } catch (error) {
      console.error("Generation failed:", error);
      // Fallback to mock if Gemini fails (e.g. API key missing)
      setGeneratedContent({
        title: topic,
        platform: platform,
        type: type,
        tone: tone,
        text: `Error generating content. Please ensure your GEMINI_API_KEY is set correctly.\n\nTopic: ${topic}`,
        tags: ['#Error', '#Setup'],
        image: `https://picsum.photos/seed/${topic.replace(/\s+/g, '-')}/800/800`,
        imagePrompt: `A unique visual for ${topic}`
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublish = () => {
    setIsPublishing(true);
    setPublishSuccess(false);
    
    // Simulate publishing process
    setTimeout(() => {
      setIsPublishing(false);
      setPublishSuccess(true);
      // Reset success message after 3 seconds
      setTimeout(() => setPublishSuccess(false), 3000);
    }, 2500);
  };

  const contentToShare = generatedContent ? {
    title: generatedContent.title,
    text: generatedContent.text,
    url: `https://canvas-ai.app/p/${generatedContent.title.toLowerCase().replace(/\s+/g, '-')}`,
    image: generatedContent.image
  } : {
    title: "Sustainable Urban Living Post",
    text: "The future of living isn't just about high-tech gadgets; it's about returning to our roots within a modern framework. 🌿🏙️\n\nSustainable urban living means reimagining our concrete jungles as living ecosystems.",
    url: "https://canvas-ai.app/p/sustainable-urban-2024",
    image: "https://picsum.photos/seed/sustainable/800/800"
  };

  return (
    <div className="space-y-12">
      <header>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-bold text-on-surface tracking-tight mb-4">
          Create <span className="primary-gradient-text">Magic.</span>
        </h2>
        <p className="text-on-surface-variant text-base sm:text-lg max-w-2xl font-body leading-relaxed">
          Define your focus and let our AI engine generate high-converting assets across all your platforms simultaneously.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Configuration Area */}
        <section className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
          <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 editorial-shadow border-l-4 border-primary">
            <h3 className="text-xl font-headline font-semibold mb-6 flex items-center gap-2">
              <Zap size={20} className="text-primary" />
              Parameters
            </h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-xs font-medium text-on-surface-variant uppercase tracking-wider">Topic or Keywords</label>
                <input 
                  type="text" 
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Sustainable Urban Living" 
                  className="w-full bg-surface-container-low border-none rounded-xl py-4 px-4 text-on-surface focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all outline-none"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-on-surface-variant uppercase tracking-wider">Platform</label>
                  <select 
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full bg-surface-container-low border-none rounded-xl py-4 px-4 text-on-surface focus:ring-2 focus:ring-primary transition-all outline-none appearance-none"
                  >
                    <option>Instagram</option>
                    <option>LinkedIn</option>
                    <option>Twitter/X</option>
                    <option>YouTube</option>
                    <option>Website</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-on-surface-variant uppercase tracking-wider">Type</label>
                  <select 
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full bg-surface-container-low border-none rounded-xl py-4 px-4 text-on-surface focus:ring-2 focus:ring-primary transition-all outline-none appearance-none"
                  >
                    <option>Social Post</option>
                    <option>Thread</option>
                    <option>Carousel</option>
                    <option>Reel Script</option>
                    <option>Blog</option>
                  </select>
                </div>
              </div>

              {type === 'Blog' && (
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-on-surface-variant uppercase tracking-wider">Target Word Count (Min 600)</label>
                  <div className="flex items-center gap-4">
                    <input 
                      type="range" 
                      min="600" 
                      max="2500" 
                      step="100"
                      value={blogLength}
                      onChange={(e) => setBlogLength(parseInt(e.target.value))}
                      className="flex-1 accent-primary h-2 bg-surface-container-low rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-sm font-bold text-primary w-16">{blogLength} words</span>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-xs font-medium text-on-surface-variant uppercase tracking-wider">Tone of Voice</label>
                <select 
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full bg-surface-container-low border-none rounded-xl py-4 px-4 text-on-surface focus:ring-2 focus:ring-primary transition-all outline-none appearance-none"
                >
                  <option>Professional & Authoritative</option>
                  <option>Casual & Witty</option>
                  <option>Inspirational</option>
                  <option>Educational</option>
                </select>
              </div>

              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !topic}
                className="w-full py-5 rounded-xl primary-gradient text-white font-bold text-lg shadow-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-3 mt-4 disabled:opacity-50 disabled:scale-100"
              >
                {isGenerating ? (
                  <RefreshCw size={20} className="animate-spin" />
                ) : (
                  <Zap size={20} fill="currentColor" />
                )}
                {isGenerating ? 'Generating...' : 'Generate Content'}
              </button>

              {generatedContent && (
                <div className="space-y-4">
                  <button 
                    onClick={handlePublish}
                    disabled={isPublishing}
                    className="w-full py-5 rounded-xl bg-on-surface text-surface-container-lowest font-bold text-lg shadow-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-3 disabled:opacity-50 disabled:scale-100"
                  >
                    {isPublishing ? (
                      <RefreshCw size={20} className="animate-spin" />
                    ) : (
                      <Send size={20} />
                    )}
                    {isPublishing ? 'Publishing...' : platform === 'Website' ? 'Push to CMS' : `Publish to ${platform}`}
                  </button>
                  
                  {platform === 'Website' && (
                    <div className="bg-surface-container-low rounded-2xl p-4 border border-outline-variant/10">
                      <h5 className="text-[10px] font-bold text-on-surface uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Workflow size={12} />
                        Required Integrations
                      </h5>
                      <p className="text-[10px] text-on-surface-variant leading-relaxed">
                        To publish directly to your website, you'll need to connect one of the following in <strong>Settings</strong>:
                      </p>
                      <ul className="mt-2 space-y-1">
                        <li className="text-[10px] text-on-surface-variant flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-primary"></div>
                          WordPress (REST API)
                        </li>
                        <li className="text-[10px] text-on-surface-variant flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-primary"></div>
                          Ghost (Admin API)
                        </li>
                        <li className="text-[10px] text-on-surface-variant flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-primary"></div>
                          Custom Webhook (JSON)
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="bg-surface-container p-6 rounded-2xl flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Lightbulb className="text-primary" size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-on-surface mb-1">AI Suggestion</h4>
              <p className="text-xs text-on-surface-variant leading-normal">
                {type === 'Blog' 
                  ? `Long-form articles about "${topic}" are currently trending on Google Search. Aiming for ${blogLength} words will help with SEO ranking.`
                  : `Posts about "${topic}" perform 40% better on ${platform} when paired with a "${tone}" tone on Tuesday mornings.`}
              </p>
            </div>
          </div>
        </section>

        {/* Preview Section */}
        <section className="lg:col-span-7">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center bg-surface-container rounded-full p-1.5 overflow-x-auto no-scrollbar">
              {['Social Post', 'Blog', 'Video Script', 'Image Prompt'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${activeTab === tab ? 'bg-surface-container-lowest shadow-sm text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => {
                  const blob = new Blob([contentToShare.text], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'content.txt';
                  a.click();
                }}
                className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors"
              >
                <Download size={18} />
              </button>
              <button 
                onClick={() => setIsShareModalOpen(true)}
                className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>

          {/* Post Preview Card */}
          <div className="relative">
            <AnimatePresence>
              {publishSuccess && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute -top-12 left-0 right-0 z-20 flex justify-center"
                >
                  <div className="bg-green-500 text-white px-6 py-2 rounded-full font-bold shadow-lg flex items-center gap-2">
                    <CheckCircle2 size={18} />
                    {platform === 'Website' ? 'Successfully pushed to your website CMS!' : `Successfully published to ${platform}!`}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="bg-surface-container-lowest rounded-3xl overflow-hidden editorial-shadow border border-outline-variant/10">
            <div className="p-6 flex items-center justify-between border-b border-outline-variant/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600 p-[2px]">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                    <img src="https://picsum.photos/seed/brand/50/50" alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                </div>
                <span className="text-sm font-bold text-on-surface">yourbrand_official</span>
              </div>
              <MoreHorizontal className="text-on-surface-variant" size={20} />
            </div>

            <div className="aspect-square relative group">
              <img 
                src={generatedContent?.image || "https://picsum.photos/seed/sustainable/800/800"} 
                alt="AI Generated" 
                className={`w-full h-full object-cover transition-opacity duration-500 ${isGenerating ? 'opacity-50' : 'opacity-100'}`}
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/20 shadow-lg">
                <span className={`w-2 h-2 rounded-full ${isGenerating ? 'bg-yellow-500 animate-pulse' : 'bg-primary shadow-[0_0_8px_rgba(99,14,212,0.6)]'}`}></span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                  {isGenerating ? 'Synthesizing...' : 'AI Synthesized'}
                </span>
              </div>
              {generatedContent?.imagePrompt && !isGenerating && (
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-[10px] text-white/80 font-medium line-clamp-2">
                    <span className="text-primary font-bold">Prompt:</span> {generatedContent.imagePrompt}
                  </p>
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button 
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="bg-white/20 backdrop-blur-md text-white px-6 py-2 rounded-full font-semibold border border-white/30 flex items-center gap-2 hover:bg-white/40 transition-colors"
                >
                  <RefreshCw size={18} className={isGenerating ? 'animate-spin' : ''} />
                  {isGenerating ? 'Regenerating...' : 'Regenerate Visual'}
                </button>
              </div>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Heart className="text-on-surface hover:text-red-500 transition-colors cursor-pointer" size={24} />
                <MessageCircle className="text-on-surface cursor-pointer" size={24} />
                <Send className="text-on-surface cursor-pointer" size={24} />
              </div>
              <Bookmark className="text-on-surface cursor-pointer" size={24} />
            </div>

            <div className="px-6 pb-8 space-y-3">
              <div className="text-sm leading-relaxed text-on-surface">
                <span className="font-bold mr-2">yourbrand_official</span>
                {activeTab === 'Social Post' ? (
                  <>
                    {generatedContent?.text || "The future of living isn't just about high-tech gadgets; it's about returning to our roots within a modern framework. 🌿🏙️\n\nSustainable urban living means reimagining our concrete jungles as living ecosystems."}
                    <br/><br/>
                    <span className="text-blue-600 font-medium">
                      {generatedContent?.tags ? generatedContent.tags.join(' ') : "#UrbanEcology #Sustainability #FutureCities #SmartLiving"}
                    </span>
                  </>
                ) : activeTab === 'Blog' ? (
                  <div className="p-8 editorial-content">
                    {generatedContent ? (
                      <div>
                        <h1 className="text-3xl font-headline font-bold mb-6">{generatedContent.title}</h1>
                        <div className="flex items-center gap-4 mb-8 text-on-surface-variant text-xs font-medium uppercase tracking-widest">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] text-primary font-bold">AI</div>
                            <span>Canvas AI Editor</span>
                          </div>
                          <span>•</span>
                          <span>{Math.ceil(generatedContent.text.split(' ').length)} words</span>
                        </div>
                        <div className="whitespace-pre-wrap leading-relaxed text-base text-on-surface-variant">
                          {generatedContent.text}
                        </div>
                        <div className="mt-12 pt-8 border-t border-outline-variant/10">
                          <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-4">SEO Keywords</h4>
                          <div className="flex flex-wrap gap-2">
                            {generatedContent.tags?.map((tag: string) => (
                              <span key={tag} className="px-3 py-1 bg-surface-container-low rounded-lg text-[10px] font-bold text-primary uppercase tracking-wider">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <h4 className="text-xl font-bold">The Evolution of {topic}</h4>
                        <p>In the rapidly changing landscape of 2024, {topic} has emerged as a cornerstone of modern society. This blog post explores the intricate balance between innovation and tradition...</p>
                        <p>Key Takeaways:</p>
                        <ul className="list-disc pl-5">
                          <li>Understanding the core principles of {topic}</li>
                          <li>Implementing sustainable practices in daily life</li>
                          <li>The role of AI in optimizing {topic}</li>
                        </ul>
                      </div>
                    )}
                  </div>
                ) : activeTab === 'Video Script' ? (
                  <div className="space-y-4 font-mono text-xs bg-surface-container-low p-4 rounded-xl">
                    <p className="text-primary font-bold">[SCENE 1: WIDE SHOT OF CITYSCAPE]</p>
                    <p>NARRATOR: Have you ever wondered how {topic} will change our lives?</p>
                    <p className="text-primary font-bold">[SCENE 2: CLOSE UP OF SMART DEVICE]</p>
                    <p>NARRATOR: It's not just a trend. It's a revolution.</p>
                    <p className="text-primary font-bold">[SCENE 3: TEXT OVERLAY - JOIN THE FUTURE]</p>
                  </div>
                ) : (
                  <div className="italic text-on-surface-variant">
                    Prompt: A hyper-realistic 8k render of {topic}, cinematic lighting, architectural photography style, lush greenery integrated with sleek glass structures, sunset atmosphere.
                  </div>
                )}
              </div>
              <p className="text-[10px] uppercase tracking-tighter text-on-surface-variant font-medium opacity-50">
                {isGenerating ? 'Generating...' : 'Just now • AI Optimized for engagement'}
              </p>
            </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-surface-container-low p-4 rounded-xl border-l-2 border-primary">
              <h5 className="text-xs font-bold text-on-surface mb-2 flex items-center gap-2">
                <Edit3 size={14} />
                Variant A: Educational
              </h5>
              <p className="text-xs text-on-surface-variant line-clamp-2">"3 Simple ways to make your apartment more eco-friendly starting today..."</p>
            </div>
            <div className="bg-surface-container-low p-4 rounded-xl border-l-2 border-blue-500">
              <h5 className="text-xs font-bold text-on-surface mb-2 flex items-center gap-2">
                <Megaphone size={14} />
                Variant B: Call to Action
              </h5>
              <p className="text-xs text-on-surface-variant line-clamp-2">"Join the revolution. Download our Sustainable Cities Guide 2024..."</p>
            </div>
          </div>
        </section>
      </div>
      
      <ShareModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)} 
        content={contentToShare}
      />
      
      <div className="h-20" /> {/* Bottom spacing to prevent overlap with fixed elements */}
    </div>
  );
}
