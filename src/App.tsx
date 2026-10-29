/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Search,
  Play,
  Pause,
  ThumbsUp,
  ThumbsDown,
  Share2,
  BookmarkPlus,
  Volume2,
  VolumeX,
  Maximize2,
  Settings,
  Menu,
  X,
  Radio,
  Sparkles,
  Download,
  Copy,
  Check,
  Code2,
  Eye,
  Sliders,
  ChevronRight,
  ExternalLink,
  Flame,
  Crown,
  Heart,
  DollarSign,
  TrendingUp,
  Award
} from 'lucide-react';

const NEW_LOGO_PATH = '/public/assets/aistudio/couchtryouts_transparent_d61e44ce.png';

interface VideoItem {
  id: string;
  title: string;
  model: string;
  modelAvatar: string;
  views: string;
  duration: string;
  date: string;
  rating: string;
  quality: string;
  gradientClass: string;
  category: string;
  badge?: string;
}

const CATEGORIES = [
  '🔥 Trending Auditions',
  'Casting Couch',
  'VIP Exclusives',
  '4K Ultra HD',
  'POV Tryouts',
  'Verified Models',
  'Brunettes',
  'Blondes',
  'Redheads',
  'Backstage Rehearsals'
];

const SAMPLE_VIDEOS: VideoItem[] = [
  {
    id: 'vid-1',
    title: 'Midnight Studio Callback: Velvet Chemistry Under Neon Lights',
    model: 'Sienna Rose',
    modelAvatar: 'SR',
    views: '1.4M',
    duration: '34:18',
    date: '2 days ago',
    rating: '99.4%',
    quality: '4K 60FPS',
    gradientClass: 'from-[#4a082b] via-[#240938] to-[#0d0918]',
    category: 'VIP Exclusives',
    badge: 'EXCLUSIVE'
  },
  {
    id: 'vid-2',
    title: 'First Time In Front Of The Lens: Unscripted Nervous Seduction',
    model: 'Chloe Vibe',
    modelAvatar: 'CV',
    views: '2.1M',
    duration: '28:45',
    date: '4 days ago',
    rating: '99.1%',
    quality: '4K UHD',
    gradientClass: 'from-[#3a0833] via-[#1a0c3b] to-[#080d1e]',
    category: 'POV Tryouts',
    badge: 'HOT'
  },
  {
    id: 'vid-3',
    title: "The Director's Cut: Extended Couch Audition & Private Interview",
    model: 'Kira Noir',
    modelAvatar: 'KN',
    views: '890K',
    duration: '42:10',
    date: '1 week ago',
    rating: '98.8%',
    quality: '4K 60FPS',
    gradientClass: 'from-[#54092b] via-[#200833] to-[#0a0f1d]',
    category: 'Casting Couch',
    badge: 'UNCUT'
  },
  {
    id: 'vid-4',
    title: 'Backstage Pass: Intimate Dressing Room Rehearsal & Confessions',
    model: 'Mia Thorne',
    modelAvatar: 'MT',
    views: '650K',
    duration: '22:04',
    date: '2 weeks ago',
    rating: '97.5%',
    quality: '1080p 60FPS',
    gradientClass: 'from-[#2b083d] via-[#3a0928] to-[#0a0a14]',
    category: 'Backstage Rehearsals'
  },
  {
    id: 'vid-5',
    title: 'Neon Penthouse Audition: Sunset Silhouette & Couch Chemistry',
    model: 'Elena Fox',
    modelAvatar: 'EF',
    views: '1.8M',
    duration: '37:50',
    date: '3 weeks ago',
    rating: '99.2%',
    quality: '4K 60FPS',
    gradientClass: 'from-[#480922] via-[#1c0d38] to-[#08121f]',
    category: 'Verified Models',
    badge: 'TOP PICK'
  },
  {
    id: 'vid-6',
    title: 'Casting Room Chronicles: The Blonde Siren Who Stole The Show',
    model: 'Aria Vane',
    modelAvatar: 'AV',
    views: '2.8M',
    duration: '25:12',
    date: '1 month ago',
    rating: '99.6%',
    quality: '4K UHD',
    gradientClass: 'from-[#191040] via-[#3d092d] to-[#090b16]',
    category: 'Blondes',
    badge: 'POPULAR'
  },
  {
    id: 'vid-7',
    title: 'Late Night Screen Test: Pure Intensity Under Violet Spotlights',
    model: 'Jade Ray',
    modelAvatar: 'JR',
    views: '940K',
    duration: '41:00',
    date: '1 month ago',
    rating: '98.2%',
    quality: '4K UHD',
    gradientClass: 'from-[#4d0728] via-[#250836] to-[#0b101c]',
    category: 'Redheads'
  },
  {
    id: 'vid-8',
    title: 'The Debutante Audition: Unlocking Raw Chemistry on Camera',
    model: 'Sienna Rose',
    modelAvatar: 'SR',
    views: '1.2M',
    duration: '29:15',
    date: '2 months ago',
    rating: '98.5%',
    quality: '4K 60FPS',
    gradientClass: 'from-[#141d44] via-[#3b082e] to-[#08080f]',
    category: 'Brunettes',
    badge: 'CLASSIC'
  }
];

const LIVE_CAMS = [
  { name: 'Lexi_Live', viewers: '2,840', status: 'LIVE', gradient: 'from-[#4d082c] to-[#1a082b]', badge: 'VIP ROOM' },
  { name: 'Scarlett_VIP', viewers: '3,910', status: 'LIVE', gradient: 'from-[#2b0c3d] to-[#120826]', badge: '4K CAM' },
  { name: 'VelvetDuet', viewers: '1,420', status: 'LIVE', gradient: 'from-[#480a22] to-[#170c2e]', badge: 'DUO' },
  { name: 'Mia_Rose4K', viewers: '4,280', status: 'LIVE', gradient: 'from-[#1a123f] to-[#2f0724]', badge: 'HOT' }
];

export default function App() {
  // Navigation / View State
  const [activeTab, setActiveTab] = useState<'home' | 'watch' | 'model' | 'all'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('🔥 Trending Auditions');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [scrubberProgress, setScrubberProgress] = useState(42);
  const [liked, setLiked] = useState(true);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(48290);
  const [subscribed, setSubscribed] = useState(false);
  const [tipSuccess, setTipSuccess] = useState<string | null>(null);

  // Sticky Ads Dismiss State
  const [desktopAdVisible, setDesktopAdVisible] = useState(true);
  const [mobileAdVisible, setMobileAdVisible] = useState(true);

  // Theme Inspector Modal
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [cssCopied, setCssCopied] = useState(false);

  // Scrubber animation when playing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setScrubberProgress((prev) => (prev >= 100 ? 0 : prev + 0.35));
      }, 350);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Video Search Filter
  const filteredVideos = SAMPLE_VIDEOS.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.model.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === '🔥 Trending Auditions' ||
      video.category === selectedCategory ||
      (selectedCategory === '4K Ultra HD' && video.quality.includes('4K')) ||
      (selectedCategory === 'VIP Exclusives' && (video.badge === 'EXCLUSIVE' || video.badge === 'TOP PICK'));
    return matchesSearch && matchesCategory;
  });

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount((c) => c - 1);
    } else {
      setLiked(true);
      setLikeCount((c) => c + 1);
      if (disliked) setDisliked(false);
    }
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (!disliked && liked) {
      setLiked(false);
      setLikeCount((c) => c - 1);
    }
  };

  const handleTip = (amount: string) => {
    setTipSuccess(`Sent ${amount} tip to Sienna Rose! Thank you!`);
    setTimeout(() => setTipSuccess(null), 3000);
  };

  const copyCssVars = () => {
    const cssText = `:root {
  /* Canvas & Structural Backgrounds (Deep Velvet Obsidian) */
  --ct-bg-base: #07070c;
  --ct-bg-surface: #0f0f18;
  --ct-bg-surface-elevated: #161624;
  --ct-bg-surface-card: #141422;
  --ct-bg-surface-hover: #1f1f32;
  
  /* Glassmorphism & Saturated Overlays */
  --ct-bg-glass: rgba(15, 15, 24, 0.82);
  --ct-bg-glass-card: rgba(20, 20, 32, 0.75);
  --ct-backdrop-blur: blur(20px);
  
  /* Neon Brand Palettes (Cyber-Glam Hot Pink -> Electric Magenta -> Violet) */
  --ct-neon-pink: #ff1879;
  --ct-neon-pink-hover: #ff3b8d;
  --ct-neon-pink-glow: rgba(255, 24, 121, 0.45);
  --ct-neon-pink-glow-lg: 0 0 40px rgba(255, 24, 121, 0.65);
  
  --ct-neon-magenta: #e11d48;
  --ct-neon-violet: #8b5cf6;
  --ct-neon-cyan: #06b6d4;
  --ct-neon-gold: #f59e0b;
  
  /* Gradients */
  --ct-gradient-primary: linear-gradient(135deg, #ff1879 0%, #d946ef 50%, #8b5cf6 100%);
  --ct-gradient-fire: linear-gradient(135deg, #ff1879 0%, #f43f5e 50%, #fb923c 100%);
  --ct-gradient-gold: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%);
  
  /* Typography & Foreground */
  --ct-text-primary: #ffffff;
  --ct-text-secondary: #e2e8f0;
  --ct-text-muted: #a0aec0;
  
  /* Borders & Glow Trims */
  --ct-border-subtle: rgba(255, 255, 255, 0.1);
  --ct-border-neon: rgba(255, 24, 121, 0.5);
  --ct-border-neon-strong: #ff1879;
  
  /* Radii */
  --ct-radius-sm: 8px;
  --ct-radius-md: 12px;
  --ct-radius-lg: 18px;
  --ct-radius-xl: 26px;
  --ct-radius-full: 9999px;
}`;
    navigator.clipboard.writeText(cssText);
    setCssCopied(true);
    setTimeout(() => setCssCopied(false), 2000);
  };

  const downloadStandaloneHtml = () => {
    const link = document.createElement('a');
    link.href = '/couchtryouts-theme.html';
    link.download = 'couchtryouts-theme.html';
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#07070c] text-white flex flex-col font-sans selection:bg-[#ff1879] selection:text-white relative overflow-x-hidden">
      {/* Decadent Cyber-Glam Ambient Neon Aura */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 right-1/4 w-[600px] h-[600px] bg-[#ff1879] rounded-full blur-[170px] opacity-25 animate-pulse" />
        <div className="absolute top-1/3 -left-32 w-[550px] h-[550px] bg-[#8b5cf6] rounded-full blur-[180px] opacity-20" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#e11d48] rounded-full blur-[160px] opacity-20" />
      </div>

      {/* TOP NOTIFICATION / DEMO CONTROLLER STRIP */}
      <div className="sticky top-0 z-50 bg-[#0d0d15]/95 backdrop-blur-xl border-b border-[#ff1879]/30 px-4 py-2 flex items-center justify-between text-xs shadow-[0_4px_25px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="flex items-center gap-1.5 font-extrabold text-[#ff1879] tracking-wider uppercase text-[11px] bg-gradient-to-r from-[#ff1879]/20 to-[#8b5cf6]/20 px-2.5 py-1 rounded-md border border-[#ff1879]/50 shadow-[0_0_15px_rgba(255,24,121,0.3)]">
            <Flame size={13} className="text-[#ff1879] animate-bounce" />
            <span>18+ COUCHTRYOUTS VIP SUITE</span>
          </span>
          <div className="flex items-center gap-1 bg-black/60 p-0.5 rounded-lg border border-white/10">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3 py-1 rounded-md font-bold text-xs transition-all ${
                activeTab === 'home'
                  ? 'bg-gradient-to-r from-[#ff1879] via-[#d946ef] to-[#8b5cf6] text-white shadow-[0_0_15px_rgba(255,24,121,0.5)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Auditions Feed
            </button>
            <button
              onClick={() => setActiveTab('watch')}
              className={`px-3 py-1 rounded-md font-bold text-xs transition-all ${
                activeTab === 'watch'
                  ? 'bg-gradient-to-r from-[#ff1879] via-[#d946ef] to-[#8b5cf6] text-white shadow-[0_0_15px_rgba(255,24,121,0.5)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Watch Studio 4K
            </button>
            <button
              onClick={() => setActiveTab('model')}
              className={`px-3 py-1 rounded-md font-bold text-xs transition-all ${
                activeTab === 'model'
                  ? 'bg-gradient-to-r from-[#ff1879] via-[#d946ef] to-[#8b5cf6] text-white shadow-[0_0_15px_rgba(255,24,121,0.5)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Featured Model
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded-md font-bold text-xs transition-all ${
                activeTab === 'all'
                  ? 'bg-gradient-to-r from-[#ff1879] via-[#d946ef] to-[#8b5cf6] text-white shadow-[0_0_15px_rgba(255,24,121,0.5)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Full Site Experience
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCodeModal(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 hover:bg-[#ff1879]/20 text-white border border-[#ff1879]/40 transition-colors font-semibold shadow-[0_0_10px_rgba(255,24,121,0.2)]"
          >
            <Code2 size={13} className="text-[#ff1879]" />
            <span>Theme Tokens & Classes</span>
          </button>
          <a
            href="/couchtryouts-theme.html"
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-md bg-gradient-to-r from-[#ff1879] to-[#8b5cf6] text-white font-bold transition-all shadow-[0_0_15px_rgba(255,24,121,0.4)] hover:brightness-110"
          >
            <ExternalLink size={12} />
            <span>Standalone HTML</span>
          </a>
        </div>
      </div>

      {/* HEADER: GLAM LUXURY TOP BAR WITH TRANSPARENT LOGO */}
      <header className="sticky top-[42px] z-40 bg-[#0f0f18]/85 backdrop-blur-2xl border-b border-[#ff1879]/25 shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          {/* Brand Logo with Glowing Drop Shadow */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
          >
            <img
              src={NEW_LOGO_PATH}
              alt="Couchtryouts"
              className="h-12 sm:h-14 w-auto object-contain transition-all duration-300 group-hover:scale-105 drop-shadow-[0_0_16px_rgba(255,24,121,0.7)] drop-shadow-[0_0_30px_rgba(139,92,246,0.4)]"
            />
          </div>

          {/* Large Centered Search Bar with Neon Glow Focus & Popular Tags */}
          <div className="flex-1 max-w-xl mx-auto relative hidden md:block">
            <div className="relative flex items-center">
              <Search
                size={18}
                className="absolute left-4 text-[#ff1879] pointer-events-none"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tryouts, auditions, 4K models, unscripted chemistry..."
                className="w-full bg-[#161624]/95 border border-[#ff1879]/30 rounded-full py-2.5 pl-11 pr-14 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#ff1879] focus:ring-2 focus:ring-[#ff1879]/50 transition-all shadow-[0_0_20px_rgba(0,0,0,0.6),inset_0_2px_4px_rgba(0,0,0,0.6)]"
              />
              <span className="absolute right-4 text-[10px] font-mono bg-[#ff1879]/20 border border-[#ff1879]/40 px-2 py-0.5 rounded text-[#ff1879] font-bold">
                PRESS /
              </span>
            </div>
            {/* Quick Keyword Hotlinks below search */}
            <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-400 px-3">
              <span className="text-[#ff1879] font-bold flex items-center gap-1">
                <Flame size={11} /> Hot:
              </span>
              <button
                onClick={() => setSearchQuery('Sienna Rose')}
                className="hover:text-white hover:underline"
              >
                Sienna Rose
              </button>
              <span>·</span>
              <button
                onClick={() => setSearchQuery('Midnight')}
                className="hover:text-white hover:underline"
              >
                Midnight Callbacks
              </button>
              <span>·</span>
              <button
                onClick={() => setSearchQuery('4K')}
                className="hover:text-white hover:underline"
              >
                4K HDR Tryouts
              </button>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-bold text-slate-200">
            <button
              onClick={() => setActiveTab('home')}
              className={`hover:text-[#ff1879] transition-all relative py-1 ${
                activeTab === 'home' ? 'text-[#ff1879]' : ''
              }`}
            >
              Auditions
              {activeTab === 'home' && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#ff1879] to-[#8b5cf6] rounded-full shadow-[0_0_10px_#ff1879]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('watch')}
              className={`hover:text-[#ff1879] transition-all relative py-1 ${
                activeTab === 'watch' ? 'text-[#ff1879]' : ''
              }`}
            >
              Watch 4K
            </button>
            <button
              onClick={() => setActiveTab('model')}
              className={`hover:text-[#ff1879] transition-all relative py-1 ${
                activeTab === 'model' ? 'text-[#ff1879]' : ''
              }`}
            >
              Top Models
            </button>
            <button
              onClick={() => setActiveTab('watch')}
              className="flex items-center gap-1.5 text-white hover:text-[#ff1879] transition-all"
            >
              <span>Live Cams</span>
              <span className="flex items-center gap-1 bg-gradient-to-r from-[#ff1879] to-[#d946ef] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-[0_0_12px_#ff1879]">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                94 LIVE
              </span>
            </button>
          </nav>

          {/* Action Button & Hamburger Drawer */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('watch')}
              className="relative group overflow-hidden rounded-full p-[2px] font-extrabold text-xs transition-all hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(255,24,121,0.5)]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#ff1879] via-[#d946ef] to-[#8b5cf6] rounded-full ct-shimmer-btn" />
              <span className="relative flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#12121e] group-hover:bg-opacity-0 text-white transition-all">
                <Crown size={15} className="text-amber-400 group-hover:text-white" />
                <span>JOIN VIP PASS</span>
              </span>
            </button>

            <button
              onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
              className="lg:hidden p-2 rounded-xl bg-[#181826] border border-[#ff1879]/30 text-white hover:border-[#ff1879]"
              aria-label="Open mobile menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Search input */}
        <div className="md:hidden px-4 pb-3">
          <div className="relative flex items-center">
            <Search size={16} className="absolute left-3.5 text-[#ff1879]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tryouts, models, 4K auditions..."
              className="w-full bg-[#161624] border border-[#ff1879]/30 rounded-full py-2 pl-10 pr-4 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#ff1879]"
            />
          </div>
        </div>
      </header>

      {/* MOBILE HAMBURGER DRAWER */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            onClick={() => setMobileDrawerOpen(false)}
          />
          <aside className="relative ml-auto w-80 bg-[#10101c] border-l border-[#ff1879]/40 p-6 flex flex-col justify-between z-10 shadow-[0_0_60px_rgba(0,0,0,0.9)]">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <img
                  src={NEW_LOGO_PATH}
                  alt="Couchtryouts"
                  className="h-10 w-auto drop-shadow-[0_0_15px_rgba(255,24,121,0.6)]"
                />
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1 rounded-md text-slate-400 hover:text-white"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="mt-6 flex flex-col gap-4 font-bold text-base">
                <button
                  onClick={() => {
                    setActiveTab('home');
                    setMobileDrawerOpen(false);
                  }}
                  className="text-left text-white hover:text-[#ff1879] transition-colors flex items-center gap-2"
                >
                  <Flame size={16} className="text-[#ff1879]" />
                  <span>Auditions Feed</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('watch');
                    setMobileDrawerOpen(false);
                  }}
                  className="text-left text-white hover:text-[#ff1879] transition-colors flex items-center gap-2"
                >
                  <Play size={16} className="text-[#ff1879]" />
                  <span>Watch Video Studio 4K</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('model');
                    setMobileDrawerOpen(false);
                  }}
                  className="text-left text-white hover:text-[#ff1879] transition-colors flex items-center gap-2"
                >
                  <Crown size={16} className="text-amber-400" />
                  <span>Featured Model Spotlight</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('watch');
                    setMobileDrawerOpen(false);
                  }}
                  className="text-left text-[#ff1879] flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Radio size={16} />
                    <span>Live Webcams (94)</span>
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff1879] animate-ping" />
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 text-xs text-slate-400 space-y-2">
              <button
                onClick={() => {
                  setShowCodeModal(true);
                  setMobileDrawerOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#ff1879] to-[#8b5cf6] text-white font-extrabold text-xs shadow-lg"
              >
                View Theme Tokens
              </button>
              <p className="text-center text-[10px] text-slate-500">
                18 U.S.C. 2257 Verified Network
              </p>
            </div>
          </aside>
        </div>
      )}

      {/* LUXURIOUS TOP AD SLOT (300x100 Mobile / 728x90 Desktop) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full my-6">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1c1228] via-[#2c133a] to-[#1c1228] border-2 border-[#ff1879]/50 p-4 sm:px-8 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_10px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(255,24,121,0.3)] backdrop-blur-xl">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-2 h-12 bg-gradient-to-b from-[#ff1879] via-[#d946ef] to-[#8b5cf6] rounded-full hidden sm:block shadow-[0_0_15px_#ff1879]" />
            <div>
              <div className="text-[11px] font-extrabold text-[#ff1879] tracking-widest uppercase flex items-center justify-center sm:justify-start gap-2">
                <span className="bg-[#ff1879]/20 px-2 py-0.5 rounded border border-[#ff1879]/40">
                  SPONSOR OFFER
                </span>
                <span>·</span>
                <span className="text-amber-400 font-mono font-bold">LIMITED TIME: 50% OFF VIP PASS</span>
              </div>
              <h3 className="text-base sm:text-lg font-extrabold font-['Outfit'] text-white mt-0.5">
                Couchtryouts Private VIP Lounge — Access 400+ Uncut 4K Scenes
              </h3>
              <p className="text-xs text-slate-300 hidden sm:block">
                Ultra-high 60fps bitrate, multi-angle camera feeds, backstage director commentary, zero ads
              </p>
            </div>
          </div>
          <button className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#ff1879] via-[#d946ef] to-[#8b5cf6] text-white text-xs font-extrabold tracking-wider uppercase shadow-[0_0_20px_rgba(255,24,121,0.6)] hover:scale-105 active:scale-95 transition-all shrink-0">
            CLAIM VIP PASS NOW
          </button>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex-1 relative z-10 pb-16">
        {/* =========================================================
            SECTION 1: HOME PAGE (BOLD & GLAMOROUS)
            ========================================================= */}
        {(activeTab === 'home' || activeTab === 'all') && (
          <div className="space-y-10 animate-fadeIn">
            {/* Bold Grand Hero Showcase */}
            <section className="relative rounded-3xl overflow-hidden border-2 border-[#ff1879]/40 bg-[#12121e] shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_45px_rgba(255,24,121,0.25)] group">
              <div className="h-[420px] sm:h-[520px] w-full relative flex items-end overflow-hidden">
                {/* Saturated Cyber-Glam Gradient Stage Backdrop */}
                <div className="absolute inset-0 bg-radial-[at_75%_35%] from-[#5e0a39] via-[#240938] to-[#07070e] transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#ff1879]/35 via-transparent to-transparent opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07070c] via-[#07070c]/80 to-transparent" />

                {/* Hero Overlay Content */}
                <div className="relative z-10 p-6 sm:p-12 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="bg-gradient-to-r from-[#ff1879] via-[#d946ef] to-[#8b5cf6] text-white text-xs font-black uppercase px-3 py-1 rounded-md shadow-[0_0_15px_#ff1879]">
                      👑 PRODUCER'S CHOICE
                    </span>
                    <span className="bg-[#18182a] border border-[#ff1879]/50 text-[#ff1879] text-xs font-mono font-extrabold px-2.5 py-1 rounded">
                      4K 60FPS HDR
                    </span>
                    <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold px-2 py-1 rounded">
                      ★ 99.8% SCORE
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl font-black font-['Outfit'] text-white leading-tight mb-3 drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)]">
                    Neon Velvet Casting Debut: Private Midnight Audition
                  </h1>

                  <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-200 mb-6 font-semibold">
                    <span>
                      Featuring: <strong className="text-[#ff1879] text-base">Sienna Rose</strong> &{' '}
                      <strong className="text-purple-300 text-base">Aria Vane</strong>
                    </span>
                    <span className="text-slate-500">·</span>
                    <span className="font-mono text-white">48:24 Uncut</span>
                    <span className="text-slate-500">·</span>
                    <span className="font-mono text-white">1,482,900 views</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => setActiveTab('watch')}
                      className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#ff1879] via-[#d946ef] to-[#8b5cf6] text-white font-extrabold text-sm flex items-center gap-2.5 shadow-[0_0_35px_rgba(255,24,121,0.6)] hover:brightness-110 transform hover:scale-105 active:scale-95 transition-all"
                    >
                      <Play size={18} fill="currentColor" />
                      <span>WATCH AUDITION 4K</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('model')}
                      className="px-6 py-3.5 rounded-full bg-[#181828]/80 hover:bg-[#251838] text-white font-bold text-sm border border-[#ff1879]/40 backdrop-blur-md transition-all shadow-lg flex items-center gap-2"
                    >
                      <Crown size={16} className="text-amber-400" />
                      <span>Model Portfolio</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Filter Chips Row (Bold Categories) */}
            <div className="flex items-center gap-2.5 overflow-x-auto pb-3 pt-1 scrollbar-none no-scrollbar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all border ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-[#ff1879] via-[#d946ef] to-[#8b5cf6] text-white border-transparent shadow-[0_0_20px_rgba(255,24,121,0.5)] scale-105'
                      : 'bg-[#141422] text-slate-300 border-white/10 hover:border-[#ff1879] hover:bg-[#1e1e32]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Responsive Video Grid (4 Columns Desktop -> 1 Mobile) */}
            <section>
              <div className="flex items-center justify-between mb-6 pb-2 border-b border-white/10">
                <h2 className="text-xl sm:text-2xl font-black font-['Outfit'] flex items-center gap-2.5 text-white">
                  <Flame className="text-[#ff1879]" size={24} />
                  <span>Trending</span>
                  <span className="bg-gradient-to-r from-[#ff1879] to-[#8b5cf6] bg-clip-text text-transparent">
                    Audition Premieres
                  </span>
                </h2>
                <span className="text-xs font-mono font-bold text-[#ff1879] bg-[#ff1879]/15 border border-[#ff1879]/40 px-3 py-1 rounded-full">
                  Showing {filteredVideos.length} Auditions
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredVideos.map((video) => (
                  <article
                    key={video.id}
                    onClick={() => setActiveTab('watch')}
                    className="group bg-[#131320] border border-white/10 hover:border-[#ff1879] rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(0,0,0,0.9),0_0_30px_rgba(255,24,121,0.3)] cursor-pointer backdrop-blur-md"
                  >
                    {/* 16:9 Thumbnail Area with Rich Gradient */}
                    <div className="relative w-full pt-[56.25%] overflow-hidden bg-[#0c0c14]">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${video.gradientClass} transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110 flex items-center justify-center`}
                      >
                        {/* Shimmer light bar across thumbnail */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      </div>

                      {/* Hover Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#ff1879] to-[#8b5cf6] flex items-center justify-center text-white shadow-[0_0_25px_#ff1879] transform scale-75 group-hover:scale-100 transition-transform">
                          <Play size={24} fill="currentColor" className="ml-1" />
                        </div>
                      </div>

                      {/* Top Badges */}
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                        <span className="bg-[#0e0e18]/90 text-cyan-300 border border-cyan-400/40 text-[10px] font-mono font-extrabold px-2 py-0.5 rounded shadow">
                          {video.quality}
                        </span>
                        {video.badge && (
                          <span className="bg-[#ff1879] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded shadow-[0_0_10px_#ff1879]">
                            {video.badge}
                          </span>
                        )}
                      </div>

                      {/* Duration Badge */}
                      <span className="absolute bottom-2.5 right-2.5 bg-black/90 text-white border border-white/20 text-xs font-mono font-bold px-2 py-0.5 rounded shadow">
                        {video.duration}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-extrabold text-white line-clamp-2 group-hover:text-[#ff1879] transition-colors leading-snug">
                          {video.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#ff1879] to-[#8b5cf6] flex items-center justify-center text-[10px] font-black text-white shadow">
                            {video.modelAvatar}
                          </div>
                          <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">
                            {video.model}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-400 font-mono pt-3 border-t border-white/10 font-bold">
                        <span>{video.views} views</span>
                        <span>·</span>
                        <span>{video.date}</span>
                        <span>·</span>
                        <span className="text-emerald-400 font-extrabold">{video.rating}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* =========================================================
            SECTION 2: VIDEO WATCH PAGE
            ========================================================= */}
        {(activeTab === 'watch' || activeTab === 'all') && (
          <div className="space-y-10 mt-12 animate-fadeIn">
            {activeTab === 'all' && (
              <div className="pt-8 border-t border-white/10">
                <span className="text-xs font-mono text-[#ff1879] font-black tracking-widest uppercase">
                  PAGE PREVIEW 2:
                </span>
                <h2 className="text-3xl font-black font-['Outfit'] mt-1">Video Watch Studio 4K</h2>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Main Player Column */}
              <div className="lg:col-span-8 space-y-6">
                {/* 16:9 Player Area with Radiant Neon Ambilight */}
                <div className="relative">
                  {/* Neon Ambilight Backlight Bleed */}
                  <div className="absolute -inset-6 bg-gradient-to-r from-[#ff1879]/35 via-[#8b5cf6]/30 to-[#ff1879]/35 blur-3xl rounded-3xl pointer-events-none opacity-90" />

                  <div className="relative w-full pt-[56.25%] bg-black rounded-3xl overflow-hidden border-2 border-[#ff1879]/50 shadow-[0_25px_60px_rgba(0,0,0,0.95)]">
                    <div className="absolute inset-0 bg-radial-[at_50%_40%] from-[#45092d] via-[#1a082b] to-[#030307] flex flex-col justify-between">
                      {/* Top Bar inside Player */}
                      <div className="p-4 sm:p-6 flex items-center justify-between z-10">
                        <span className="bg-black/70 border border-[#ff1879]/40 text-white text-xs px-3 py-1.5 rounded-lg font-bold backdrop-blur-md shadow-[0_0_15px_rgba(255,24,121,0.3)]">
                          COUCHTRYOUTS ORIGINAL · 4K UHD 60FPS MASTER
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="bg-gradient-to-r from-[#ff1879] to-[#d946ef] text-white text-xs font-black px-3 py-1 rounded shadow-[0_0_15px_#ff1879]">
                            UNCUT PRODUCER CUT
                          </span>
                        </div>
                      </div>

                      {/* Center Big Play Button */}
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-r from-[#ff1879] via-[#d946ef] to-[#8b5cf6] flex items-center justify-center text-white shadow-[0_0_45px_#ff1879] hover:scale-110 active:scale-95 transition-all z-10"
                        aria-label={isPlaying ? 'Pause video' : 'Play video'}
                      >
                        {isPlaying ? (
                          <Pause size={38} fill="currentColor" />
                        ) : (
                          <Play size={38} fill="currentColor" className="ml-1.5" />
                        )}
                      </button>

                      {/* Bottom Player Controls */}
                      <div className="p-4 sm:p-6 bg-gradient-to-t from-black via-black/85 to-transparent z-10 space-y-3">
                        {/* Glowing Interactive Scrubber */}
                        <div
                          onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const pos = ((e.clientX - rect.left) / rect.width) * 100;
                            setScrubberProgress(Math.max(0, Math.min(100, pos)));
                          }}
                          className="w-full h-2 bg-white/20 hover:h-3 rounded-full cursor-pointer relative transition-all"
                        >
                          <div
                            style={{ width: `${scrubberProgress}%` }}
                            className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-[#ff1879] via-[#d946ef] to-[#8b5cf6] rounded-full shadow-[0_0_14px_#ff1879]"
                          >
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_10px_#fff]" />
                          </div>
                        </div>

                        {/* Controls Bottom Row */}
                        <div className="flex items-center justify-between text-xs text-white">
                          <div className="flex items-center gap-4">
                            <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-[#ff1879]">
                              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                            </button>
                            <button onClick={() => setIsMuted(!isMuted)} className="hover:text-[#ff1879]">
                              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                            </button>
                            <span className="font-mono font-bold text-slate-200">
                              {Math.floor((scrubberProgress * 34.3) / 100)}:
                              {String(Math.floor(((scrubberProgress * 34.3 * 60) / 100) % 60)).padStart(2, '0')}{' '}
                              / 34:18
                            </span>
                          </div>

                          <div className="flex items-center gap-4">
                            <span className="font-black text-[11px] text-[#ff1879] bg-[#ff1879]/20 border border-[#ff1879] px-2 py-0.5 rounded shadow">
                              4K 60FPS HDR
                            </span>
                            <Settings size={18} className="cursor-pointer hover:text-[#ff1879]" />
                            <Maximize2 size={18} className="cursor-pointer hover:text-[#ff1879]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Video Info: Title with Emojis & Glamorous Meta */}
                <div className="space-y-4">
                  <h1 className="text-2xl sm:text-3xl font-black font-['Outfit'] text-white">
                    🔥 Private Couch Audition: Sensual Neon Chemistry (Uncut 4K) ✨
                  </h1>

                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 font-mono font-bold">
                      <span className="text-white text-base">1,284,920 views</span>
                      <span>·</span>
                      <span>Premiered Oct 26, 2026</span>
                      <span>·</span>
                      <span className="text-emerald-400 font-extrabold">99.4% Rating</span>
                    </div>

                    {/* Interactive Like/Dislike & Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleLike}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-extrabold border transition-all ${
                          liked
                            ? 'bg-[#ff1879] border-[#ff1879] text-white shadow-[0_0_20px_#ff1879]'
                            : 'bg-[#181828] border-white/10 text-slate-300 hover:border-[#ff1879]'
                        }`}
                      >
                        <ThumbsUp size={15} fill={liked ? 'currentColor' : 'none'} />
                        <span className="font-mono">{(likeCount / 1000).toFixed(1)}K</span>
                      </button>

                      <button
                        onClick={handleDislike}
                        className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-bold border transition-all ${
                          disliked
                            ? 'bg-purple-900 border-purple-500 text-white'
                            : 'bg-[#181828] border-white/10 text-slate-300 hover:border-purple-500'
                        }`}
                      >
                        <ThumbsDown size={15} fill={disliked ? 'currentColor' : 'none'} />
                        <span className="font-mono">612</span>
                      </button>

                      <button
                        onClick={() => alert('Audition link copied to clipboard!')}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-[#181828] hover:bg-[#251838] border border-white/10 text-white transition-all"
                      >
                        <Share2 size={15} />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>

                  {/* Model Bar with Tipping & Subscribe Actions */}
                  <div className="bg-[#141422] border border-[#ff1879]/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
                    <div
                      onClick={() => setActiveTab('model')}
                      className="flex items-center gap-4 cursor-pointer group w-full sm:w-auto"
                    >
                      <div className="w-14 h-14 rounded-full p-1 bg-gradient-to-tr from-[#ff1879] via-[#d946ef] to-[#8b5cf6] shadow-[0_0_20px_rgba(255,24,121,0.6)]">
                        <div className="w-full h-full rounded-full bg-[#0a0a14] flex items-center justify-center font-black text-white text-lg">
                          SR
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-white text-lg group-hover:text-[#ff1879] transition-colors">
                            Sienna Rose
                          </span>
                          <span className="text-amber-400">👑</span>
                          <span className="text-[10px] font-black bg-[#ff1879]/20 border border-[#ff1879] text-[#ff1879] px-2 py-0.5 rounded uppercase">
                            VIP HEADLINER
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 mt-0.5">
                          320K Subscribers · 142 Exclusive Auditions
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                      <button
                        onClick={() => handleTip('$25')}
                        className="px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/50 hover:bg-emerald-500/30 text-emerald-300 font-extrabold text-xs flex items-center gap-1.5 shadow"
                      >
                        <DollarSign size={14} />
                        <span>Tip Model $25</span>
                      </button>

                      <button
                        onClick={() => setSubscribed(!subscribed)}
                        className={`px-6 py-2.5 rounded-full text-xs font-black transition-all shadow-lg ${
                          subscribed
                            ? 'bg-white/10 text-slate-300 border border-white/20'
                            : 'bg-gradient-to-r from-[#ff1879] via-[#d946ef] to-[#8b5cf6] text-white shadow-[0_0_20px_rgba(255,24,121,0.5)] hover:scale-105'
                        }`}
                      >
                        {subscribed ? '✓ Subscribed' : '+ Subscribe Free'}
                      </button>
                    </div>
                  </div>

                  {tipSuccess && (
                    <div className="p-3 bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs font-bold rounded-xl text-center shadow">
                      {tipSuccess}
                    </div>
                  )}
                </div>

                {/* Live Cams Widget Strip */}
                <div className="rounded-2xl border-2 border-[#ff1879]/40 bg-[#141422]/90 p-5 backdrop-blur-xl shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Radio size={18} className="text-[#ff1879] animate-pulse" />
                      <h3 className="font-black text-base text-white font-['Outfit']">
                        LIVE CAMS HAPPENING RIGHT NOW
                      </h3>
                    </div>
                    <span className="text-xs text-[#ff1879] font-extrabold cursor-pointer hover:underline">
                      Explore All 94 Live Webcam Studios →
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {LIVE_CAMS.map((cam) => (
                      <div
                        key={cam.name}
                        onClick={() => alert(`Connecting to private webcam studio for ${cam.name}...`)}
                        className="group relative rounded-xl overflow-hidden border border-white/10 hover:border-[#ff1879] cursor-pointer transition-all hover:-translate-y-1 shadow-lg"
                      >
                        <div
                          className={`w-full pt-[80%] bg-gradient-to-br ${cam.gradient} group-hover:brightness-125 transition-all`}
                        />
                        <div className="absolute top-2 left-2 flex gap-1">
                          <span className="bg-[#ff1879] text-white text-[9px] font-black px-2 py-0.5 rounded shadow-[0_0_8px_#ff1879]">
                            {cam.status}
                          </span>
                          <span className="bg-black/70 text-cyan-300 text-[9px] font-mono px-1.5 py-0.5 rounded">
                            {cam.badge}
                          </span>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center justify-between text-xs text-white">
                          <span className="font-extrabold">{cam.name}</span>
                          <span className="text-[11px] font-mono text-[#ff1879] font-bold">
                            {cam.viewers}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Related Videos */}
                <div className="pt-4">
                  <h3 className="text-lg font-black font-['Outfit'] mb-4 text-white flex items-center gap-2">
                    <Flame size={18} className="text-[#ff1879]" />
                    <span>More High-Voltage Tryouts</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {SAMPLE_VIDEOS.slice(2, 6).map((vid) => (
                      <div
                        key={vid.id}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="flex gap-3 bg-[#141422] border border-white/10 hover:border-[#ff1879] p-3 rounded-2xl cursor-pointer group transition-all hover:shadow-lg"
                      >
                        <div className="w-36 pt-[25%] relative rounded-xl overflow-hidden shrink-0">
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${vid.gradientClass} group-hover:scale-105 transition-transform`}
                          />
                          <span className="absolute bottom-1.5 right-1.5 bg-black/90 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded text-white">
                            {vid.duration}
                          </span>
                        </div>
                        <div className="flex flex-col justify-between py-0.5">
                          <h4 className="text-xs font-bold text-white line-clamp-2 group-hover:text-[#ff1879] transition-colors leading-snug">
                            {vid.title}
                          </h4>
                          <p className="text-[11px] text-slate-400 font-mono mt-1">
                            {vid.model} · {vid.views}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar with Stats Card & Sponsors */}
              <aside className="lg:col-span-4 space-y-6">
                {/* Scene Specifications Card */}
                <div className="bg-[#141422]/90 border border-[#ff1879]/40 rounded-3xl p-6 backdrop-blur-xl shadow-2xl">
                  <h3 className="text-sm font-extrabold font-['Outfit'] text-white uppercase tracking-wider pb-4 border-b border-white/10 flex items-center justify-between">
                    <span>Scene Specifications</span>
                    <Sliders size={18} className="text-[#ff1879]" />
                  </h3>
                  <div className="divide-y divide-white/10 text-xs">
                    <div className="py-3 flex justify-between">
                      <span className="text-slate-400">Master Resolution</span>
                      <span className="font-mono font-extrabold text-cyan-300">
                        3840 x 2160 (4K UHD)
                      </span>
                    </div>
                    <div className="py-3 flex justify-between">
                      <span className="text-slate-400">Frame Rate</span>
                      <span className="font-mono font-extrabold text-white">59.94 fps</span>
                    </div>
                    <div className="py-3 flex justify-between">
                      <span className="text-slate-400">Bitrate</span>
                      <span className="font-mono font-extrabold text-white">28.4 Mbps</span>
                    </div>
                    <div className="py-3 flex justify-between">
                      <span className="text-slate-400">Color Grading</span>
                      <span className="font-bold text-slate-200">HDR10 / Dolby Vision</span>
                    </div>
                    <div className="py-3 flex justify-between">
                      <span className="text-slate-400">Production Studio</span>
                      <span className="font-black text-[#ff1879]">Couchtryouts Originals</span>
                    </div>
                    <div className="py-3 flex justify-between">
                      <span className="text-slate-400">Legal Compliance</span>
                      <span className="text-emerald-400 font-bold">18 U.S.C. 2257 Verified</span>
                    </div>
                  </div>
                </div>

                {/* Sidebar Sponsor Ad 300x250 */}
                <div className="bg-gradient-to-br from-[#251033] to-[#3a0d2f] border-2 border-[#ff1879]/60 rounded-3xl p-6 text-center shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_25px_rgba(255,24,121,0.3)]">
                  <span className="text-[10px] font-mono font-black text-[#ff1879] uppercase tracking-wider bg-black/50 px-2 py-0.5 rounded">
                    SPONSOR // 300x250 BANNER
                  </span>
                  <h4 className="text-lg font-black font-['Outfit'] text-white mt-2">
                    Virtual Reality Auditions 8K
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 mb-5">
                    Experience sitting directly on the casting couch in full 8K 180° spatial audio VR
                  </p>
                  <button className="w-full py-3 rounded-full bg-gradient-to-r from-[#ff1879] to-[#8b5cf6] text-white text-xs font-black tracking-wider uppercase shadow-[0_0_20px_rgba(255,24,121,0.5)] hover:scale-105">
                    ENTER VR EXPERIENCE
                  </button>
                </div>
              </aside>
            </div>
          </div>
        )}

        {/* =========================================================
            SECTION 3: MODEL/PROFILE PAGE
            ========================================================= */}
        {(activeTab === 'model' || activeTab === 'all') && (
          <div className="space-y-10 mt-12 animate-fadeIn">
            {activeTab === 'all' && (
              <div className="pt-8 border-t border-white/10">
                <span className="text-xs font-mono text-[#ff1879] font-black tracking-widest uppercase">
                  PAGE PREVIEW 3:
                </span>
                <h2 className="text-3xl font-black font-['Outfit'] mt-1">Featured Model Profile</h2>
              </div>
            )}

            {/* Profile Hero Card with Glamorous Neon Aura */}
            <div className="rounded-3xl overflow-hidden border-2 border-[#ff1879]/50 bg-[#12121e] shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(255,24,121,0.25)]">
              {/* Banner Area */}
              <div className="h-56 sm:h-72 w-full relative bg-radial-[at_70%_30%] from-[#630a3b] via-[#24083a] to-[#0a0a14]">
                <div className="absolute inset-0 bg-gradient-to-t from-[#12121e] to-transparent opacity-90" />
                <div className="absolute top-5 right-6 flex items-center gap-3">
                  <span className="bg-black/70 border border-[#ff1879]/50 text-white text-xs font-extrabold px-3 py-1.5 rounded-full backdrop-blur-md flex items-center gap-1.5 shadow">
                    <Award size={14} className="text-amber-400" />
                    <span>Top 0.1% Creator Worldwide</span>
                  </span>
                </div>
              </div>

              {/* Profile Details Header */}
              <div className="px-6 sm:px-10 pb-10 -mt-20 sm:-mt-24 relative z-10">
                <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6">
                  {/* Avatar with Neon Ring */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 text-center sm:text-left">
                    <div className="w-32 sm:w-40 h-32 sm:h-40 rounded-full p-1.5 bg-gradient-to-tr from-[#ff1879] via-[#d946ef] to-[#8b5cf6] shadow-[0_0_40px_rgba(255,24,121,0.65)]">
                      <div className="w-full h-full rounded-full bg-[#0e0e18] flex items-center justify-center font-black text-white text-4xl sm:text-5xl font-['Outfit']">
                        SR
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center sm:justify-start gap-2.5">
                        <h1 className="text-3xl sm:text-4xl font-black font-['Outfit'] text-white">
                          Sienna Rose
                        </h1>
                        <span className="text-2xl text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]">
                          👑
                        </span>
                      </div>
                      <p className="text-sm font-mono text-[#ff1879] font-bold mt-1">
                        @siennarose · Couchtryouts Exclusive VIP Lead
                      </p>
                      <p className="text-xs sm:text-sm text-slate-200 max-w-xl mt-3 leading-relaxed">
                        Top award-winning audition performer and exclusive contract creator at Couchtryouts.
                        Acclaimed for intense unscripted chemistry, genuine callbacks, and private midnight premieres.
                        New scenes released every Tuesday & Friday.
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => setSubscribed(!subscribed)}
                      className="px-8 py-3 rounded-full bg-gradient-to-r from-[#ff1879] via-[#d946ef] to-[#8b5cf6] text-white font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(255,24,121,0.5)] hover:scale-105 transition-all"
                    >
                      {subscribed ? '✓ VIP SUBSCRIBED' : 'SUBSCRIBE VIP FREE'}
                    </button>
                    <button
                      onClick={() => handleTip('$50')}
                      className="px-5 py-3 rounded-full bg-[#1e1e30] hover:bg-[#282842] text-white font-bold text-xs border border-[#ff1879]/40 transition-colors flex items-center gap-1.5 shadow"
                    >
                      <DollarSign size={14} className="text-emerald-400" />
                      <span>Send Tip 💎</span>
                    </button>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-8 pt-6 border-t border-white/10">
                  <div className="bg-[#181828] border border-white/10 rounded-2xl p-4 text-center shadow">
                    <div className="text-2xl font-black font-mono text-white">142</div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                      Auditions
                    </div>
                  </div>
                  <div className="bg-[#181828] border border-white/10 rounded-2xl p-4 text-center shadow">
                    <div className="text-2xl font-black font-mono text-white">48.6M</div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                      Total Views
                    </div>
                  </div>
                  <div className="bg-[#181828] border border-white/10 rounded-2xl p-4 text-center shadow">
                    <div className="text-2xl font-black font-mono text-white">320K</div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                      Fans & Subs
                    </div>
                  </div>
                  <div className="bg-[#181828] border border-white/10 rounded-2xl p-4 text-center shadow">
                    <div className="text-2xl font-black font-mono text-[#ff1879]">#3</div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                      Global Rank
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-1 bg-[#181828] border border-white/10 rounded-2xl p-4 text-center shadow">
                    <div className="text-2xl font-black font-mono text-emerald-400">99.4%</div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                      Approval Score
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Filmography Section */}
            <div>
              <div className="flex items-center gap-6 border-b border-white/10 mb-6 text-sm font-extrabold">
                <button className="pb-3 text-white border-b-2 border-[#ff1879] shadow-[0_2px_12px_#ff1879]">
                  Latest Auditions (48)
                </button>
                <button className="pb-3 text-slate-400 hover:text-white transition-colors">
                  Top Rated Scenes (32)
                </button>
                <button className="pb-3 text-slate-400 hover:text-white transition-colors">
                  Interviews & Backstage (14)
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {SAMPLE_VIDEOS.filter((v) => v.model === 'Sienna Rose' || v.id === 'vid-3' || v.id === 'vid-5').map(
                  (video) => (
                    <article
                      key={video.id}
                      onClick={() => setActiveTab('watch')}
                      className="group bg-[#141422] border border-white/10 hover:border-[#ff1879] rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                    >
                      <div className="relative w-full pt-[56.25%] overflow-hidden bg-black">
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${video.gradientClass} group-hover:scale-105 transition-transform`}
                        />
                        <span className="absolute bottom-2 right-2 bg-black/90 text-white text-xs font-mono font-bold px-2 py-0.5 rounded">
                          {video.duration}
                        </span>
                      </div>
                      <div className="p-4 flex flex-col flex-1 justify-between">
                        <h3 className="text-xs font-bold text-white line-clamp-2 group-hover:text-[#ff1879] transition-colors leading-snug">
                          {video.title}
                        </h3>
                        <div className="flex items-center justify-between text-xs text-slate-400 font-mono mt-3 pt-2 border-t border-white/10 font-bold">
                          <span>{video.views}</span>
                          <span>{video.date}</span>
                        </div>
                      </div>
                    </article>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* =========================================================
          FOOTER & 18+ LEGAL COMPLIANCE
          ========================================================= */}
      <footer className="bg-[#050508] border-t border-[#ff1879]/30 mt-auto pt-14 pb-10 text-xs text-slate-400 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          {/* Mandatory 18+ Disclaimer Box */}
          <div className="bg-[#0e0e18] border border-[#ff1879]/30 rounded-2xl p-5 text-slate-300 leading-relaxed text-xs shadow-lg">
            <span className="font-extrabold text-[#ff1879] uppercase tracking-wide mr-2">
              18+ ADULT ENTERTAINMENT COMPLIANCE NOTICE:
            </span>
            This site contains age-restricted, sexually explicit audiovisual material intended strictly for
            consenting adults aged 18 years or older (or the legal age of majority in your jurisdiction). All
            models, actors, and other persons depicted in audiovisual content appearing on Couchtryouts were 18
            years of age or older at the time of photography or videography. All records required pursuant to
            18 U.S.C. § 2257 and 28 C.F.R. Part 75 are maintained by the designated custodian of records. If you
            are under 18 or offended by adult material, you must exit immediately.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <img
                src={NEW_LOGO_PATH}
                alt="Couchtryouts"
                className="h-12 w-auto drop-shadow-[0_0_15px_rgba(255,24,121,0.6)]"
              />
              <p className="text-slate-400 text-xs leading-relaxed">
                The premier after-dark network for exclusive casting auditions, verified creator premieres,
                and high-fidelity 4K 60fps streaming.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3 text-[#ff1879]">
                Auditions & Hubs
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button onClick={() => setActiveTab('home')} className="hover:text-white transition-colors">
                    Trending Auditions
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('watch')} className="hover:text-white transition-colors">
                    Featured 4K Releases
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('model')} className="hover:text-white transition-colors">
                    Verified Creators
                  </button>
                </li>
                <li>
                  <a href="#cams" className="hover:text-white transition-colors">
                    Live Webcams (94 Online)
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3 text-[#ff1879]">
                Legal & Compliance
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="#2257" className="hover:text-white transition-colors">
                    18 U.S.C. 2257 Exemption
                  </a>
                </li>
                <li>
                  <a href="#dmca" className="hover:text-white transition-colors">
                    DMCA / Copyright Policy
                  </a>
                </li>
                <li>
                  <a href="#terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3 text-[#ff1879]">
                Safety & Trust
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <span className="text-slate-300">Restricted To Adults (RTA)</span>
                </li>
                <li>
                  <span className="text-slate-300">256-Bit SSL Encrypted</span>
                </li>
                <li>
                  <span className="text-slate-300">Parental Control Ready</span>
                </li>
                <li>
                  <a href="#support" className="hover:text-white transition-colors">
                    24/7 Billing Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>© 2026 Couchtryouts Media LLC. All rights reserved. Powered by the Neon Glam Video Theme System.</div>
            <div className="flex items-center gap-4">
              <span>Strict Anti-Piracy Policy</span>
              <span>·</span>
              <span>ICRA Labeled</span>
            </div>
          </div>
        </div>
      </footer>

      {/* =========================================================
          STICKY AD BARS (DISMISSIBLE)
          ========================================================= */}
      {/* Desktop Sticky Bottom-Right 300x100 Placeholder */}
      {desktopAdVisible && (
        <aside className="hidden lg:flex fixed bottom-5 right-5 z-40 w-[320px] h-[105px] bg-gradient-to-br from-[#1e1028]/95 to-[#2f0e38]/95 border-2 border-[#ff1879]/60 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.9),0_0_30px_rgba(255,24,121,0.4)] p-3 items-center justify-between backdrop-blur-xl animate-slideUp">
          <button
            onClick={() => setDesktopAdVisible(false)}
            className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white/20 hover:bg-[#ff1879] text-white flex items-center justify-center text-[10px] transition-colors"
            title="Dismiss Ad"
          >
            ✕
          </button>
          <div className="pr-3">
            <span className="text-[10px] font-mono font-black text-[#ff1879] tracking-widest uppercase block">
              SPONSOR // 300x100
            </span>
            <div className="text-xs font-black text-white mt-0.5 leading-snug">
              Live Webcam Auditions
            </div>
            <div className="text-[11px] text-slate-300">Private 1-on-1 VIP Room Online</div>
          </div>
          <button className="px-3.5 py-2 rounded-full bg-gradient-to-r from-[#ff1879] to-[#8b5cf6] text-white text-xs font-black shadow-[0_0_12px_#ff1879] shrink-0">
            CONNECT
          </button>
        </aside>
      )}

      {/* Mobile Sticky Bottom 320x50 Placeholder */}
      {mobileAdVisible && (
        <aside className="lg:hidden fixed bottom-0 left-0 right-0 z-40 h-[54px] bg-[#10101c]/95 border-t-2 border-[#ff1879]/50 px-3 flex items-center justify-between backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono text-[#ff1879] font-black">320x50</span>
            <span className="text-xs font-bold text-white">Unlock 4K Uncut Couch Auditions</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 rounded-full bg-gradient-to-r from-[#ff1879] to-[#8b5cf6] text-white text-[10px] font-black shadow">
              VIP PASS
            </button>
            <button
              onClick={() => setMobileAdVisible(false)}
              className="text-slate-400 hover:text-white p-1"
            >
              ✕
            </button>
          </div>
        </aside>
      )}

      {/* Restore Ads Button (if dismissed) */}
      {(!desktopAdVisible || !mobileAdVisible) && (
        <button
          onClick={() => {
            setDesktopAdVisible(true);
            setMobileAdVisible(true);
          }}
          className="fixed bottom-4 left-4 z-40 bg-[#161624] hover:bg-[#202035] border border-[#ff1879]/40 text-slate-300 hover:text-white text-xs px-3 py-1.5 rounded-full shadow-lg transition-colors font-bold"
        >
          ↻ Restore Ad Placeholders
        </button>
      )}

      {/* =========================================================
          THEME INSPECTOR MODAL
          ========================================================= */}
      {showCodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            onClick={() => setShowCodeModal(false)}
          />
          <div className="relative w-full max-w-3xl bg-[#12121e] border-2 border-[#ff1879]/50 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_45px_rgba(255,24,121,0.3)] max-h-[85vh] flex flex-col z-10 overflow-hidden">
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#161626]">
              <div className="flex items-center gap-3">
                <Code2 className="text-[#ff1879]" size={22} />
                <h3 className="font-black text-base text-white font-['Outfit']">
                  Couchtryouts Bold Cyber-Glam Theme Tokens
                </h3>
              </div>
              <button
                onClick={() => setShowCodeModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-300">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#ff1879]/20 to-[#8b5cf6]/20 border border-[#ff1879]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-extrabold text-white text-sm">Standalone Self-Contained HTML File</h4>
                  <p className="text-slate-300 text-xs mt-0.5">
                    Updated with transparent logo, bold neon glam styles, and zero external JS libraries.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={downloadStandaloneHtml}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#ff1879] to-[#8b5cf6] text-white font-extrabold text-xs shadow-lg hover:brightness-110"
                  >
                    <Download size={14} />
                    <span>Download .HTML</span>
                  </button>
                  <a
                    href="/couchtryouts-theme.html"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/10"
                  >
                    <Eye size={14} />
                    <span>Open Standalone</span>
                  </a>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-black text-white uppercase tracking-wider text-xs">
                    (1) Complete CSS Variables Block (:root)
                  </span>
                  <button
                    onClick={copyCssVars}
                    className="flex items-center gap-1 text-[#ff1879] hover:underline text-xs font-bold"
                  >
                    {cssCopied ? <Check size={14} /> : <Copy size={14} />}
                    <span>{cssCopied ? 'Copied :root Block!' : 'Copy :root Block'}</span>
                  </button>
                </div>
                <pre className="p-4 rounded-2xl bg-black/70 border border-white/10 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed">
{`:root {
  /* Canvas & Structural Backgrounds (Deep Velvet Obsidian) */
  --ct-bg-base: #07070c;
  --ct-bg-surface: #0f0f18;
  --ct-bg-surface-elevated: #161624;
  --ct-bg-surface-card: #141422;
  --ct-bg-surface-hover: #1f1f32;
  
  /* Glassmorphism & Saturated Overlays */
  --ct-bg-glass: rgba(15, 15, 24, 0.82);
  --ct-bg-glass-card: rgba(20, 20, 32, 0.75);
  --ct-backdrop-blur: blur(20px);
  
  /* Neon Brand Palettes (Cyber-Glam Hot Pink -> Electric Magenta -> Violet) */
  --ct-neon-pink: #ff1879;
  --ct-neon-pink-hover: #ff3b8d;
  --ct-neon-pink-glow: rgba(255, 24, 121, 0.45);
  --ct-neon-pink-glow-lg: 0 0 40px rgba(255, 24, 121, 0.65);
  
  --ct-neon-magenta: #e11d48;
  --ct-neon-violet: #8b5cf6;
  --ct-neon-cyan: #06b6d4;
  --ct-neon-gold: #f59e0b;
  
  /* Gradients */
  --ct-gradient-primary: linear-gradient(135deg, #ff1879 0%, #d946ef 50%, #8b5cf6 100%);
  --ct-gradient-fire: linear-gradient(135deg, #ff1879 0%, #f43f5e 50%, #fb923c 100%);
  --ct-gradient-gold: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%);
  
  /* Typography & Foreground */
  --ct-text-primary: #ffffff;
  --ct-text-secondary: #e2e8f0;
  --ct-text-muted: #a0aec0;
  
  /* Borders & Glow Trims */
  --ct-border-subtle: rgba(255, 255, 255, 0.1);
  --ct-border-neon: rgba(255, 24, 121, 0.5);
  --ct-border-neon-strong: #ff1879;
  
  /* Radii */
  --ct-radius-sm: 8px;
  --ct-radius-md: 12px;
  --ct-radius-lg: 18px;
  --ct-radius-xl: 26px;
  --ct-radius-full: 9999px;
}`}
                </pre>
              </div>

              <div>
                <span className="font-black text-white uppercase tracking-wider text-xs block mb-2">
                  (2) Component Class Directory
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-black/50 border border-white/10">
                    <span className="text-[#ff1879] font-bold block">.ct-header</span>
                    Sticky top bar with glassmorphic backdrop
                  </div>
                  <div className="p-3 rounded-xl bg-black/50 border border-white/10">
                    <span className="text-[#ff1879] font-bold block">.ct-search-input</span>
                    Glow-focused search bar with keyword hints
                  </div>
                  <div className="p-3 rounded-xl bg-black/50 border border-white/10">
                    <span className="text-[#ff1879] font-bold block">.ct-hero-card</span>
                    High-impact featured video container
                  </div>
                  <div className="p-3 rounded-xl bg-black/50 border border-white/10">
                    <span className="text-[#ff1879] font-bold block">.ct-video-card</span>
                    4-column video preview card with hover glow
                  </div>
                  <div className="p-3 rounded-xl bg-black/50 border border-white/10">
                    <span className="text-[#ff1879] font-bold block">.ct-player-wrapper</span>
                    16:9 simulated player with Ambilight backglow
                  </div>
                  <div className="p-3 rounded-xl bg-black/50 border border-white/10">
                    <span className="text-[#ff1879] font-bold block">.ct-live-cams-widget</span>
                    Live streaming webcam strip container
                  </div>
                  <div className="p-3 rounded-xl bg-black/50 border border-white/10">
                    <span className="text-[#ff1879] font-bold block">.ct-model-profile-header</span>
                    Model banner, avatar ring & stats grid
                  </div>
                  <div className="p-3 rounded-xl bg-black/50 border border-white/10">
                    <span className="text-[#ff1879] font-bold block">.ct-sticky-desktop-ad</span>
                    Bottom-right dismissible 300x100 ad
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-white/10 flex justify-end bg-[#161626]">
              <button
                onClick={() => setShowCodeModal(false)}
                className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
