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
  ExternalLink,
  Flame,
  Crown,
  Heart,
  DollarSign,
  TrendingUp,
  Award,
  Smile,
  Zap,
  Star
} from 'lucide-react';

const LOGO_PATH = '/public/assets/aistudio/couchtryouts_transparent_d61e44ce.png';

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
  emoji: string;
}

const CATEGORIES = [
  { name: '🔥 All Auditions', tag: 'All' },
  { name: '💋 Couch Tryouts', tag: 'Tryouts' },
  { name: '💖 VIP Sweethearts', tag: 'VIP' },
  { name: '✨ 4K Glam Sessions', tag: '4K' },
  { name: '🍓 POV Auditions', tag: 'POV' },
  { name: '🍭 Bubblegum Blondes', tag: 'Blondes' },
  { name: '🍒 Sweet Brunettes', tag: 'Brunettes' },
  { name: '🔥 Fiery Redheads', tag: 'Redheads' },
  { name: '🎬 Backstage Fun', tag: 'BTS' }
];

const SAMPLE_VIDEOS: VideoItem[] = [
  {
    id: 'vid-1',
    title: 'Midnight Velvet Audition: Sensual Neon Chemistry & Seduction',
    model: 'Sienna Rose',
    modelAvatar: 'SR',
    views: '1.4M',
    duration: '34:18',
    date: '2 days ago',
    rating: '99.4%',
    quality: '4K 60FPS',
    gradientClass: 'from-[#54082e] via-[#2d0a44] to-[#0d091a]',
    category: 'VIP',
    badge: '👑 EXCLUSIVE',
    emoji: '💖'
  },
  {
    id: 'vid-2',
    title: 'First Time On The Couch: Sweet & Flirty Unscripted Callback',
    model: 'Chloe Vibe',
    modelAvatar: 'CV',
    views: '2.1M',
    duration: '28:45',
    date: '4 days ago',
    rating: '99.1%',
    quality: '4K UHD',
    gradientClass: 'from-[#420a3b] via-[#1f0d46] to-[#090e24]',
    category: 'POV',
    badge: '🔥 HOT DEBUT',
    emoji: '🍓'
  },
  {
    id: 'vid-3',
    title: "The Director's Sweet Cut: Extended Audition & Private Dressing Room",
    model: 'Kira Noir',
    modelAvatar: 'KN',
    views: '890K',
    duration: '42:10',
    date: '1 week ago',
    rating: '98.8%',
    quality: '4K 60FPS',
    gradientClass: 'from-[#610932] via-[#28083e] to-[#0b1122]',
    category: 'Tryouts',
    badge: '✨ 100% UNCUT',
    emoji: '💋'
  },
  {
    id: 'vid-4',
    title: 'Backstage Secrets: Giggling Dressing Room Tryouts & Confessions',
    model: 'Mia Thorne',
    modelAvatar: 'MT',
    views: '650K',
    duration: '22:04',
    date: '2 weeks ago',
    rating: '97.5%',
    quality: '1080p 60FPS',
    gradientClass: 'from-[#330a4a] via-[#480a32] to-[#0a0a18]',
    category: 'BTS',
    badge: '🍭 BUBBLY',
    emoji: '🍭'
  },
  {
    id: 'vid-5',
    title: 'Neon Penthouse Session: Sunset Silhouette & Velvet Chemistry',
    model: 'Elena Fox',
    modelAvatar: 'EF',
    views: '1.8M',
    duration: '37:50',
    date: '3 weeks ago',
    rating: '99.2%',
    quality: '4K 60FPS',
    gradientClass: 'from-[#540a28] via-[#200e42] to-[#091524]',
    category: 'VIP',
    badge: '💖 FAN FAV',
    emoji: '✨'
  },
  {
    id: 'vid-6',
    title: 'Casting Room Chronicles: The Bubblegum Blonde Who Stole The Show',
    model: 'Aria Vane',
    modelAvatar: 'AV',
    views: '2.8M',
    duration: '25:12',
    date: '1 month ago',
    rating: '99.6%',
    quality: '4K UHD',
    gradientClass: 'from-[#1e144d] via-[#480a35] to-[#0a0d1a]',
    category: 'Blondes',
    badge: '⭐ TOP RATED',
    emoji: '🍒'
  },
  {
    id: 'vid-7',
    title: 'Late Night Screen Test: Pure Seduction Under Violet Spotlights',
    model: 'Jade Ray',
    modelAvatar: 'JR',
    views: '940K',
    duration: '41:00',
    date: '1 month ago',
    rating: '98.2%',
    quality: '4K UHD',
    gradientClass: 'from-[#59082f] via-[#2d0940] to-[#0c1220]',
    category: 'Redheads',
    badge: '🔥 FIERY',
    emoji: '🍓'
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
    gradientClass: 'from-[#182353] via-[#450936] to-[#080812]',
    category: 'Brunettes',
    badge: '👑 CLASSIC',
    emoji: '💖'
  }
];

const LIVE_CAMS = [
  { name: 'Lexi_Live 💖', viewers: '2,840', status: 'LIVE', gradient: 'from-[#580932] to-[#1e0a32]', badge: 'VIP SUITE' },
  { name: 'Scarlett_VIP 🍓', viewers: '3,910', status: 'LIVE', gradient: 'from-[#330e48] to-[#15092c]', badge: '4K CAM' },
  { name: 'VelvetDuet 💋', viewers: '1,420', status: 'LIVE', gradient: 'from-[#520a27] to-[#1a0e35]', badge: 'DUO FUN' },
  { name: 'Mia_Rose4K 🍭', viewers: '4,280', status: 'LIVE', gradient: 'from-[#1e1548] to-[#360829]', badge: 'HOT CHAT' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'watch' | 'model' | 'all'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Video Player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [scrubberProgress, setScrubberProgress] = useState(44);
  const [liked, setLiked] = useState(true);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(48920);
  const [subscribed, setSubscribed] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; left: number }[]>([]);
  const [tipSuccess, setTipSuccess] = useState<string | null>(null);

  // Sticky Ads state
  const [desktopAdVisible, setDesktopAdVisible] = useState(true);
  const [mobileAdVisible, setMobileAdVisible] = useState(true);

  // Theme Inspector Modal
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [cssCopied, setCssCopied] = useState(false);

  // Scrubber animation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setScrubberProgress((prev) => (prev >= 100 ? 0 : prev + 0.35));
      }, 350);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Filter videos
  const filteredVideos = SAMPLE_VIDEOS.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.model.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat =
      selectedCategory === 'All' ||
      video.category === selectedCategory ||
      (selectedCategory === '4K' && video.quality.includes('4K'));
    return matchesSearch && matchesCat;
  });

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount((c) => c - 1);
    } else {
      setLiked(true);
      setLikeCount((c) => c + 1);
      if (disliked) setDisliked(false);

      // Trigger fun bubbly floating hearts animation!
      const newHearts = Array.from({ length: 6 }).map((_, i) => ({
        id: Date.now() + i,
        left: 20 + Math.random() * 60
      }));
      setFloatingHearts((prev) => [...prev, ...newHearts]);
      setTimeout(() => {
        setFloatingHearts((prev) => prev.slice(newHearts.length));
      }, 1500);
    }
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (!disliked && liked) {
      setLiked(false);
      setLikeCount((c) => c - 1);
    }
  };

  const handleTip = (amount: string, emoji: string) => {
    setTipSuccess(`Sent ${amount} ${emoji} to Sienna Rose! You rock!`);
    setTimeout(() => setTipSuccess(null), 3500);
  };

  const copyCssVars = () => {
    const cssText = `:root {
  /* Bubbly Candy-Neon Color Palette */
  --ct-bg-base: #090710;
  --ct-bg-surface: #130f1f;
  --ct-bg-surface-elevated: #1a152b;
  --ct-bg-surface-card: #181226;
  
  --ct-neon-pink: #ff1475;
  --ct-candy-bubblegum: #ff2a8d;
  --ct-neon-violet: #9333ea;
  --ct-candy-purple: #a855f7;
  --ct-neon-cyan: #06b6d4;
  --ct-candy-gold: #facc15;
  
  --ct-gradient-candy: linear-gradient(135deg, #ff1475 0%, #ff2a8d 35%, #a855f7 100%);
  --ct-gradient-bubblegum: linear-gradient(135deg, #ff3399 0%, #ff5277 50%, #f43f5e 100%);
  
  /* Plump Bubbly Radii */
  --ct-radius-sm: 12px;
  --ct-radius-md: 18px;
  --ct-radius-lg: 24px;
  --ct-radius-xl: 32px;
  --ct-radius-full: 9999px;
  
  --ct-shadow-bubble: 0 16px 36px -8px rgba(0, 0, 0, 0.8), 0 0 25px rgba(255, 20, 117, 0.4);
}`;
    navigator.clipboard.writeText(cssText);
    setCssCopied(true);
    setTimeout(() => setCssCopied(false), 2000);
  };

  const downloadStandaloneHtml = () => {
    const link = document.createElement('a');
    link.href = '/couchtryouts-theme.html';
    link.download = 'couchtryouts-bubbly-theme.html';
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#090710] text-white flex flex-col font-sans selection:bg-[#ff1475] selection:text-white relative overflow-x-hidden">
      {/* Playful Floating Ambient Bubble Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 right-1/4 w-[520px] h-[520px] bg-[#ff1475] rounded-full blur-[160px] opacity-25 ct-bubble-float" />
        <div className="absolute top-1/3 -left-28 w-[480px] h-[480px] bg-[#9333ea] rounded-full blur-[170px] opacity-25 ct-bubble-float" style={{ animationDelay: '-3s' }} />
        <div className="absolute bottom-20 right-10 w-[440px] h-[440px] bg-[#ec4899] rounded-full blur-[150px] opacity-20 ct-bubble-float" style={{ animationDelay: '-5s' }} />
      </div>

      {/* TOP NOTIFICATION & VIEW TOGGLE (Bubbly Candy Bar) */}
      <div className="sticky top-0 z-50 bg-[#120d1e]/95 backdrop-blur-xl border-b-2 border-[#ff1475]/40 px-4 py-2.5 flex items-center justify-between text-xs shadow-[0_6px_25px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 font-black text-white text-[11px] bg-gradient-to-r from-[#ff1475] via-[#ff2a8d] to-[#9333ea] px-3.5 py-1 rounded-full shadow-[0_0_18px_rgba(255,20,117,0.6)]">
            <Sparkles size={14} className="text-yellow-200 animate-spin" style={{ animationDuration: '4s' }} />
            <span>BUBBLY CANDY GLAM THEME</span>
          </div>
          <div className="flex items-center gap-1 bg-black/60 p-1 rounded-full border border-pink-500/30">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3.5 py-1 rounded-full font-extrabold text-xs transition-all ct-bubble-btn ${
                activeTab === 'home'
                  ? 'bg-gradient-to-r from-[#ff1475] to-[#a855f7] text-white shadow-[0_0_15px_#ff1475]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Auditions Feed
            </button>
            <button
              onClick={() => setActiveTab('watch')}
              className={`px-3.5 py-1 rounded-full font-extrabold text-xs transition-all ct-bubble-btn ${
                activeTab === 'watch'
                  ? 'bg-gradient-to-r from-[#ff1475] to-[#a855f7] text-white shadow-[0_0_15px_#ff1475]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Watch 4K Player
            </button>
            <button
              onClick={() => setActiveTab('model')}
              className={`px-3.5 py-1 rounded-full font-extrabold text-xs transition-all ct-bubble-btn ${
                activeTab === 'model'
                  ? 'bg-gradient-to-r from-[#ff1475] to-[#a855f7] text-white shadow-[0_0_15px_#ff1475]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Model Spotlight
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1 rounded-full font-extrabold text-xs transition-all ct-bubble-btn ${
                activeTab === 'all'
                  ? 'bg-gradient-to-r from-[#ff1475] to-[#a855f7] text-white shadow-[0_0_15px_#ff1475]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Full Site
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCodeModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-pink-500/20 hover:bg-pink-500/30 text-pink-200 border border-pink-500/50 transition-all font-bold ct-bubble-btn shadow"
          >
            <Code2 size={13} className="text-[#ff1475]" />
            <span>Theme Tokens</span>
          </button>
          <a
            href="/couchtryouts-theme.html"
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#ff1475] to-[#9333ea] text-white font-black transition-all ct-bubble-btn shadow-[0_0_15px_rgba(255,20,117,0.5)]"
          >
            <ExternalLink size={12} />
            <span>Standalone HTML</span>
          </a>
        </div>
      </div>

      {/* BUBBLY HEADER */}
      <header className="sticky top-[47px] z-40 bg-[#130f22]/90 backdrop-blur-2xl border-b-2 border-pink-500/30 shadow-[0_12px_40px_rgba(0,0,0,0.85)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-22 flex items-center justify-between gap-4">
          {/* Logo with Plump Glow Halo */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
          >
            <img
              src={LOGO_PATH}
              alt="Couchtryouts"
              className="h-14 sm:h-16 w-auto object-contain transition-all duration-300 group-hover:scale-108 ct-bubble-logo-glow"
            />
          </div>

          {/* Plump Search Capsule */}
          <div className="flex-1 max-w-xl mx-auto relative hidden md:block">
            <div className="relative flex items-center">
              <Search
                size={20}
                className="absolute left-4 text-[#ff1475] pointer-events-none"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tryouts, sweet models, 4K scenes, flirtatious callbacks..."
                className="w-full bg-[#1c152e] border-2 border-pink-500/40 rounded-full py-3 pl-12 pr-14 text-sm font-semibold text-white placeholder-pink-300/50 focus:outline-none focus:border-[#ff1475] focus:ring-4 focus:ring-pink-500/30 transition-all shadow-[inset_0_2px_6px_rgba(0,0,0,0.7)]"
              />
              <span className="absolute right-4 text-[11px] font-black bg-gradient-to-r from-[#ff1475] to-[#9333ea] px-2.5 py-0.5 rounded-full text-white shadow">
                /
              </span>
            </div>
            {/* Playful Tag Bubbles */}
            <div className="flex items-center gap-2 mt-2 text-[11px] text-pink-200 px-3">
              <span className="text-yellow-300 font-extrabold flex items-center gap-1">
                <Sparkles size={12} /> Bubbly Picks:
              </span>
              <button
                onClick={() => setSearchQuery('Sienna Rose')}
                className="bg-white/10 hover:bg-pink-500/30 px-2.5 py-0.5 rounded-full transition-colors font-bold"
              >
                💋 Sienna Rose
              </button>
              <button
                onClick={() => setSearchQuery('Midnight')}
                className="bg-white/10 hover:bg-pink-500/30 px-2.5 py-0.5 rounded-full transition-colors font-bold"
              >
                🍓 Midnight Audition
              </button>
              <button
                onClick={() => setSearchQuery('4K')}
                className="bg-white/10 hover:bg-pink-500/30 px-2.5 py-0.5 rounded-full transition-colors font-bold"
              >
                ✨ 4K Glam
              </button>
            </div>
          </div>

          {/* Nav Links with Plump Pill Hover */}
          <nav className="hidden lg:flex items-center gap-4 text-sm font-black text-slate-200">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-4 py-2 rounded-full transition-all ct-bubble-btn ${
                activeTab === 'home'
                  ? 'bg-gradient-to-r from-[#ff1475] to-[#a855f7] text-white shadow-[0_0_15px_#ff1475]'
                  : 'hover:bg-white/10 text-slate-200'
              }`}
            >
              Auditions
            </button>
            <button
              onClick={() => setActiveTab('watch')}
              className={`px-4 py-2 rounded-full transition-all ct-bubble-btn ${
                activeTab === 'watch'
                  ? 'bg-gradient-to-r from-[#ff1475] to-[#a855f7] text-white shadow-[0_0_15px_#ff1475]'
                  : 'hover:bg-white/10 text-slate-200'
              }`}
            >
              Watch 4K
            </button>
            <button
              onClick={() => setActiveTab('model')}
              className={`px-4 py-2 rounded-full transition-all ct-bubble-btn ${
                activeTab === 'model'
                  ? 'bg-gradient-to-r from-[#ff1475] to-[#a855f7] text-white shadow-[0_0_15px_#ff1475]'
                  : 'hover:bg-white/10 text-slate-200'
              }`}
            >
              Sweet Models
            </button>
            <button
              onClick={() => setActiveTab('watch')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-pink-950/60 border border-pink-500/40 text-pink-200 hover:text-white transition-all ct-bubble-btn"
            >
              <span>Live Cams</span>
              <span className="flex items-center gap-1 bg-[#ff1475] text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-[0_0_10px_#ff1475]">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                94
              </span>
            </button>
          </nav>

          {/* Action Button & Hamburger Drawer */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('watch')}
              className="ct-bubble-btn ct-gloss-sheen px-5 py-2.5 rounded-full bg-gradient-to-r from-[#ff1475] via-[#ff2a8d] to-[#9333ea] text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_8px_25px_rgba(255,20,117,0.6)]"
            >
              <Crown size={16} className="text-yellow-300 drop-shadow" />
              <span>JOIN VIP CLUB</span>
            </button>

            <button
              onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
              className="lg:hidden p-2.5 rounded-2xl bg-[#1e1733] border-2 border-pink-500/40 text-white hover:border-[#ff1475] ct-bubble-btn"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>

        {/* Mobile Search input */}
        <div className="md:hidden px-4 pb-3">
          <div className="relative flex items-center">
            <Search size={18} className="absolute left-3.5 text-[#ff1475]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tryouts, models, 4K auditions..."
              className="w-full bg-[#1a142c] border-2 border-pink-500/40 rounded-full py-2.5 pl-10 pr-4 text-xs font-semibold text-white placeholder-pink-300/50 focus:outline-none focus:border-[#ff1475]"
            />
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            onClick={() => setMobileDrawerOpen(false)}
          />
          <aside className="relative ml-auto w-80 bg-[#161026] border-l-2 border-pink-500/50 p-6 flex flex-col justify-between z-10 shadow-[0_0_60px_rgba(0,0,0,0.9)]">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-pink-500/20">
                <img
                  src={LOGO_PATH}
                  alt="Couchtryouts"
                  className="h-11 w-auto drop-shadow-[0_0_18px_rgba(255,20,117,0.7)]"
                />
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1 rounded-full bg-white/10 text-slate-300 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mt-6 flex flex-col gap-3 font-black text-base">
                <button
                  onClick={() => {
                    setActiveTab('home');
                    setMobileDrawerOpen(false);
                  }}
                  className="text-left text-white hover:text-pink-400 p-2.5 rounded-2xl bg-white/5 hover:bg-pink-500/20 flex items-center gap-2.5 transition-all"
                >
                  <Flame size={18} className="text-[#ff1475]" />
                  <span>Auditions Feed</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('watch');
                    setMobileDrawerOpen(false);
                  }}
                  className="text-left text-white hover:text-pink-400 p-2.5 rounded-2xl bg-white/5 hover:bg-pink-500/20 flex items-center gap-2.5 transition-all"
                >
                  <Play size={18} className="text-[#ff1475]" />
                  <span>Watch 4K Player</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('model');
                    setMobileDrawerOpen(false);
                  }}
                  className="text-left text-white hover:text-pink-400 p-2.5 rounded-2xl bg-white/5 hover:bg-pink-500/20 flex items-center gap-2.5 transition-all"
                >
                  <Crown size={18} className="text-yellow-400" />
                  <span>Sweet Models Spotlight</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('watch');
                    setMobileDrawerOpen(false);
                  }}
                  className="text-left text-white hover:text-pink-400 p-2.5 rounded-2xl bg-white/5 hover:bg-pink-500/20 flex items-center justify-between transition-all"
                >
                  <span className="flex items-center gap-2.5">
                    <Radio size={18} className="text-[#ff1475]" />
                    <span>Live Cams (94)</span>
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff1475] animate-ping" />
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-pink-500/20 text-xs text-pink-200 space-y-3">
              <button
                onClick={() => {
                  setShowCodeModal(true);
                  setMobileDrawerOpen(false);
                }}
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#ff1475] to-[#9333ea] text-white font-black text-xs shadow-[0_0_20px_rgba(255,20,117,0.5)] ct-bubble-btn"
              >
                Inspect Theme Tokens 💖
              </button>
              <p className="text-center text-[10px] text-pink-300/60 font-semibold">
                18 U.S.C. 2257 Verified Adult Entertainment
              </p>
            </div>
          </aside>
        </div>
      )}

      {/* PLUMP BUBBLY TOP AD SLOT (728x90 Desktop / 300x100 Mobile) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full my-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#211233] via-[#351240] to-[#211233] border-3 border-pink-500/60 p-4 sm:px-8 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_12px_45px_rgba(0,0,0,0.85),0_0_30px_rgba(255,20,117,0.4)] backdrop-blur-xl ct-bubbly-card">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-3 h-14 bg-gradient-to-b from-[#ff1475] via-[#ff2a8d] to-[#9333ea] rounded-full hidden sm:block shadow-[0_0_18px_#ff1475]" />
            <div>
              <div className="text-[11px] font-black text-pink-300 tracking-widest uppercase flex items-center justify-center sm:justify-start gap-2">
                <span className="bg-[#ff1475] text-white px-2.5 py-0.5 rounded-full font-black text-[10px] shadow">
                  🍭 CANDY SPONSOR
                </span>
                <span>·</span>
                <span className="text-yellow-300 font-bold flex items-center gap-1">
                  <Star size={12} fill="currentColor" /> 50% OFF COUCHTRYOUTS VIP
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black font-['Outfit'] text-white mt-1">
                Unlock 400+ Uncut 4K Auditions & Private Backstage Callbacks 🍓
              </h3>
              <p className="text-xs text-pink-100/80 hidden sm:block">
                Ultra-smooth 60fps streaming, multi-camera angles, VR couch access, zero ads
              </p>
            </div>
          </div>
          <button className="ct-bubble-btn ct-gloss-sheen px-7 py-3 rounded-full bg-gradient-to-r from-[#ff1475] via-[#ff2a8d] to-[#9333ea] text-white text-xs font-black tracking-wider uppercase shadow-[0_0_25px_rgba(255,20,117,0.7)] shrink-0">
            CLAIM 50% PASS 💖
          </button>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex-1 relative z-10 pb-16">
        {/* =========================================================
            SECTION 1: HOME PAGE (BUBBLY CANDY GLAM)
            ========================================================= */}
        {(activeTab === 'home' || activeTab === 'all') && (
          <div className="space-y-10 animate-fadeIn">
            {/* Grand Bubbly Hero Feature Card */}
            <section className="relative rounded-[36px] overflow-hidden border-3 border-pink-500/50 bg-[#171128] shadow-[0_30px_70px_rgba(0,0,0,0.95),0_0_55px_rgba(255,20,117,0.35)] group ct-bubbly-card">
              <div className="h-[440px] sm:h-[540px] w-full relative flex items-end overflow-hidden">
                {/* Juicy Multi-stop Cyber-Candy Gradient */}
                <div className="absolute inset-0 bg-radial-[at_75%_35%] from-[#6b093f] via-[#2f0c4a] to-[#090712] transition-transform duration-700 group-hover:scale-108" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#ff1475]/45 via-transparent to-transparent opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090710] via-[#090710]/75 to-transparent" />

                {/* Hero Overlay Content */}
                <div className="relative z-10 p-6 sm:p-14 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2.5 mb-3.5">
                    <span className="bg-gradient-to-r from-[#ff1475] via-[#ff2a8d] to-[#9333ea] text-white text-xs font-black uppercase px-3.5 py-1 rounded-full shadow-[0_0_18px_#ff1475] flex items-center gap-1.5">
                      <Crown size={14} className="text-yellow-300" />
                      <span>FEATURED TRYOUT DEBUT</span>
                    </span>
                    <span className="bg-[#241738] border border-pink-500/50 text-pink-300 text-xs font-mono font-black px-3 py-1 rounded-full">
                      ✨ 4K 60FPS HDR
                    </span>
                    <span className="bg-yellow-400/20 text-yellow-300 border border-yellow-400/50 text-xs font-extrabold px-3 py-1 rounded-full flex items-center gap-1">
                      <Star size={12} fill="currentColor" /> 99.8% POPULARITY
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl font-black font-['Outfit'] text-white leading-tight mb-3 drop-shadow-[0_4px_25px_rgba(0,0,0,0.95)]">
                    Neon Velvet Casting Debut: Private Midnight Audition 💖
                  </h1>

                  <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-pink-100 mb-7 font-bold">
                    <span>
                      Starring: <strong className="text-pink-300 text-base">Sienna Rose 👑</strong> &{' '}
                      <strong className="text-purple-300 text-base">Aria Vane 🍓</strong>
                    </span>
                    <span className="text-pink-400">·</span>
                    <span className="font-mono bg-white/10 px-2 py-0.5 rounded-md">48:24 Uncut</span>
                    <span className="text-pink-400">·</span>
                    <span className="font-mono">1,482,900 views</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => setActiveTab('watch')}
                      className="ct-bubble-btn ct-gloss-sheen px-9 py-4 rounded-full bg-gradient-to-r from-[#ff1475] via-[#ff2a8d] to-[#9333ea] text-white font-black text-sm flex items-center gap-2.5 shadow-[0_0_40px_rgba(255,20,117,0.7)] uppercase tracking-wider"
                    >
                      <Play size={20} fill="currentColor" />
                      <span>WATCH AUDITION 4K 🎬</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('model')}
                      className="ct-bubble-btn px-7 py-4 rounded-full bg-[#201838]/85 hover:bg-[#2d1e4e] text-white font-extrabold text-sm border-2 border-pink-500/50 backdrop-blur-md shadow-lg flex items-center gap-2"
                    >
                      <Heart size={18} className="text-[#ff1475]" fill="currentColor" />
                      <span>Model Fan Club</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Bubbly Category Chips */}
            <div className="flex items-center gap-3 overflow-x-auto pb-4 pt-1 scrollbar-none no-scrollbar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.tag}
                  onClick={() => setSelectedCategory(cat.tag)}
                  className={`px-5 py-3 rounded-full text-xs font-black whitespace-nowrap transition-all ct-bubble-btn border-2 ${
                    selectedCategory === cat.tag
                      ? 'bg-gradient-to-r from-[#ff1475] via-[#ff2a8d] to-[#9333ea] text-white border-transparent shadow-[0_0_25px_rgba(255,20,117,0.65)] scale-105'
                      : 'bg-[#181328] text-pink-200 border-pink-500/30 hover:border-pink-500 hover:bg-[#241a3c]'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Responsive Video Grid (4 Columns Desktop -> 1 Mobile) */}
            <section>
              <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-pink-500/20">
                <h2 className="text-xl sm:text-2xl font-black font-['Outfit'] flex items-center gap-3 text-white">
                  <Flame className="text-[#ff1475] animate-bounce" size={26} />
                  <span>Trending</span>
                  <span className="bg-gradient-to-r from-[#ff1475] via-[#ff2a8d] to-[#a855f7] bg-clip-text text-transparent">
                    Tryout Premieres 💖
                  </span>
                </h2>
                <span className="text-xs font-mono font-black text-pink-200 bg-pink-500/20 border border-pink-500/50 px-4 py-1.5 rounded-full shadow">
                  Showing {filteredVideos.length} Scenes
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredVideos.map((video) => (
                  <article
                    key={video.id}
                    onClick={() => setActiveTab('watch')}
                    className="group bg-[#19132a] border-2 border-pink-500/30 hover:border-[#ff1475] rounded-[28px] overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(0,0,0,0.95),0_0_35px_rgba(255,20,117,0.4)] cursor-pointer backdrop-blur-md ct-bubbly-card"
                  >
                    {/* 16:9 Thumbnail Area with Juicy Gradient */}
                    <div className="relative w-full pt-[56.25%] overflow-hidden bg-[#0e0a18]">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${video.gradientClass} transition-transform duration-500 group-hover:scale-112 group-hover:brightness-115 flex items-center justify-center`}
                      >
                        {/* Shimmer light sweep */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      </div>

                      {/* Hover Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#ff1475] via-[#ff2a8d] to-[#9333ea] flex items-center justify-center text-white shadow-[0_0_30px_#ff1475] transform scale-75 group-hover:scale-100 transition-transform">
                          <Play size={28} fill="currentColor" className="ml-1.5" />
                        </div>
                      </div>

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className="bg-[#120d20]/95 text-cyan-300 border border-cyan-400/50 text-[10px] font-mono font-black px-2.5 py-0.5 rounded-full shadow">
                          {video.quality}
                        </span>
                        {video.badge && (
                          <span className="bg-[#ff1475] text-white text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-[0_0_12px_#ff1475]">
                            {video.badge}
                          </span>
                        )}
                      </div>

                      {/* Duration Badge */}
                      <span className="absolute bottom-3 right-3 bg-black/90 text-white border border-pink-500/40 text-xs font-mono font-black px-2.5 py-0.5 rounded-full shadow">
                        {video.duration}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-black text-white line-clamp-2 group-hover:text-pink-400 transition-colors leading-snug">
                          {video.emoji} {video.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-2.5">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#ff1475] to-[#a855f7] flex items-center justify-center text-[10px] font-black text-white shadow">
                            {video.modelAvatar}
                          </div>
                          <span className="text-xs font-extrabold text-pink-200 group-hover:text-white transition-colors">
                            {video.model}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-pink-300/80 font-mono pt-3 border-t border-pink-500/20 font-bold">
                        <span>{video.views}</span>
                        <span>·</span>
                        <span>{video.date}</span>
                        <span>·</span>
                        <span className="text-emerald-400 font-black">★ {video.rating}</span>
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
          <div className="space-y-10 mt-12 animate-fadeIn relative">
            {/* Floating Heart Reactions */}
            {floatingHearts.map((h) => (
              <div
                key={h.id}
                style={{ left: `${h.left}%`, bottom: '20%' }}
                className="fixed z-50 pointer-events-none text-3xl animate-bounce"
              >
                💖
              </div>
            ))}

            {activeTab === 'all' && (
              <div className="pt-8 border-t-2 border-pink-500/30">
                <span className="text-xs font-mono text-[#ff1475] font-black tracking-widest uppercase bg-pink-500/10 px-3 py-1 rounded-full">
                  PAGE PREVIEW 2:
                </span>
                <h2 className="text-3xl font-black font-['Outfit'] mt-2">Video Watch Studio 4K ✨</h2>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Main Player Column */}
              <div className="lg:col-span-8 space-y-6">
                {/* 16:9 Player Area with Radiant Neon Ambilight */}
                <div className="relative">
                  <div className="absolute -inset-6 bg-gradient-to-r from-[#ff1475]/40 via-[#a855f7]/35 to-[#ff1475]/40 blur-3xl rounded-[40px] pointer-events-none opacity-90" />

                  <div className="relative w-full pt-[56.25%] bg-black rounded-[36px] overflow-hidden border-3 border-pink-500/60 shadow-[0_30px_70px_rgba(0,0,0,0.95)]">
                    <div className="absolute inset-0 bg-radial-[at_50%_40%] from-[#540a38] via-[#200b36] to-[#040308] flex flex-col justify-between">
                      {/* Top Bar inside Player */}
                      <div className="p-4 sm:p-6 flex items-center justify-between z-10">
                        <span className="bg-black/70 border border-pink-500/50 text-white text-xs px-3.5 py-1.5 rounded-full font-bold backdrop-blur-md shadow-[0_0_20px_rgba(255,20,117,0.4)]">
                          COUCHTRYOUTS ORIGINAL · 4K UHD 60FPS
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="bg-gradient-to-r from-[#ff1475] to-[#a855f7] text-white text-xs font-black px-3.5 py-1 rounded-full shadow-[0_0_18px_#ff1475]">
                            100% UNCUT 🎬
                          </span>
                        </div>
                      </div>

                      {/* Center Play Button */}
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="ct-bubble-btn absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-r from-[#ff1475] via-[#ff2a8d] to-[#9333ea] flex items-center justify-center text-white shadow-[0_0_50px_#ff1475] z-10"
                        aria-label={isPlaying ? 'Pause video' : 'Play video'}
                      >
                        {isPlaying ? (
                          <Pause size={40} fill="currentColor" />
                        ) : (
                          <Play size={40} fill="currentColor" className="ml-1.5" />
                        )}
                      </button>

                      {/* Bottom Player Controls */}
                      <div className="p-4 sm:p-6 bg-gradient-to-t from-black via-black/85 to-transparent z-10 space-y-3">
                        {/* Bubbly Scrubber */}
                        <div
                          onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const pos = ((e.clientX - rect.left) / rect.width) * 100;
                            setScrubberProgress(Math.max(0, Math.min(100, pos)));
                          }}
                          className="w-full h-2.5 bg-white/20 hover:h-3.5 rounded-full cursor-pointer relative transition-all"
                        >
                          <div
                            style={{ width: `${scrubberProgress}%` }}
                            className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-[#ff1475] via-[#ff2a8d] to-[#a855f7] rounded-full shadow-[0_0_18px_#ff1475]"
                          >
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_12px_#fff]" />
                          </div>
                        </div>

                        {/* Controls Bottom Row */}
                        <div className="flex items-center justify-between text-xs text-white font-bold">
                          <div className="flex items-center gap-4">
                            <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-pink-400 ct-bubble-btn">
                              {isPlaying ? <Pause size={22} /> : <Play size={22} />}
                            </button>
                            <button onClick={() => setIsMuted(!isMuted)} className="hover:text-pink-400 ct-bubble-btn">
                              {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
                            </button>
                            <span className="font-mono text-pink-200">
                              {Math.floor((scrubberProgress * 34.3) / 100)}:
                              {String(Math.floor(((scrubberProgress * 34.3 * 60) / 100) % 60)).padStart(2, '0')}{' '}
                              / 34:18
                            </span>
                          </div>

                          <div className="flex items-center gap-4">
                            <span className="font-black text-[11px] text-[#ff1475] bg-pink-500/20 border border-pink-500 px-2.5 py-0.5 rounded-full shadow">
                              4K HDR
                            </span>
                            <Settings size={18} className="cursor-pointer hover:text-pink-400" />
                            <Maximize2 size={18} className="cursor-pointer hover:text-pink-400" />
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

                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-pink-500/20">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-pink-200 font-mono font-bold">
                      <span className="text-white text-base">1,284,920 views</span>
                      <span>·</span>
                      <span>Premiered Oct 26, 2026</span>
                      <span>·</span>
                      <span className="text-emerald-400 font-black">★ 99.4% Loves</span>
                    </div>

                    {/* Interactive Like/Dislike Buttons */}
                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={handleLike}
                        className={`ct-bubble-btn flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black border-2 transition-all ${
                          liked
                            ? 'bg-[#ff1475] border-[#ff1475] text-white shadow-[0_0_25px_#ff1475]'
                            : 'bg-[#1e1730] border-pink-500/40 text-pink-200 hover:border-[#ff1475]'
                        }`}
                      >
                        <Heart size={16} fill={liked ? 'currentColor' : 'none'} className="text-white animate-pulse" />
                        <span className="font-mono">{(likeCount / 1000).toFixed(1)}K Loves</span>
                      </button>

                      <button
                        onClick={handleDislike}
                        className={`ct-bubble-btn flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold border-2 transition-all ${
                          disliked
                            ? 'bg-purple-900 border-purple-500 text-white'
                            : 'bg-[#1e1730] border-pink-500/30 text-pink-300/80 hover:border-purple-500'
                        }`}
                      >
                        <ThumbsDown size={15} fill={disliked ? 'currentColor' : 'none'} />
                        <span className="font-mono">612</span>
                      </button>

                      <button
                        onClick={() => alert('Audition link copied to clipboard!')}
                        className="ct-bubble-btn flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-[#1e1730] hover:bg-[#281e42] border-2 border-pink-500/30 text-white transition-all"
                      >
                        <Share2 size={15} />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>

                  {/* Model Bar with Tipping & Subscribe Actions */}
                  <div className="bg-[#181329] border-2 border-pink-500/40 rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl ct-bubbly-card">
                    <div
                      onClick={() => setActiveTab('model')}
                      className="flex items-center gap-4 cursor-pointer group w-full sm:w-auto"
                    >
                      <div className="w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-[#ff1475] via-[#ff2a8d] to-[#9333ea] shadow-[0_0_25px_rgba(255,20,117,0.7)]">
                        <div className="w-full h-full rounded-full bg-[#0d0a18] flex items-center justify-center font-black text-white text-xl">
                          SR
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-white text-lg group-hover:text-pink-400 transition-colors">
                            Sienna Rose
                          </span>
                          <span className="text-yellow-400 text-lg">👑</span>
                          <span className="text-[10px] font-black bg-[#ff1475] text-white px-2.5 py-0.5 rounded-full uppercase shadow">
                            VIP HEADLINER
                          </span>
                        </div>
                        <p className="text-xs text-pink-200 mt-1 font-semibold">
                          320K Subscribers · 142 Exclusive Auditions 💖
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end">
                      <button
                        onClick={() => handleTip('$10', '💖')}
                        className="ct-bubble-btn px-3.5 py-2 rounded-full bg-pink-500/20 border border-pink-500/50 hover:bg-pink-500/30 text-pink-200 font-black text-xs flex items-center gap-1 shadow"
                      >
                        <span>💖 Tip $10</span>
                      </button>
                      <button
                        onClick={() => handleTip('$25', '🍓')}
                        className="ct-bubble-btn px-3.5 py-2 rounded-full bg-pink-500/20 border border-pink-500/50 hover:bg-pink-500/30 text-pink-200 font-black text-xs flex items-center gap-1 shadow"
                      >
                        <span>🍓 Tip $25</span>
                      </button>

                      <button
                        onClick={() => setSubscribed(!subscribed)}
                        className={`ct-bubble-btn px-6 py-2.5 rounded-full text-xs font-black transition-all shadow-lg ${
                          subscribed
                            ? 'bg-white/10 text-pink-200 border border-white/20'
                            : 'bg-gradient-to-r from-[#ff1475] via-[#ff2a8d] to-[#9333ea] text-white shadow-[0_0_25px_rgba(255,20,117,0.6)]'
                        }`}
                      >
                        {subscribed ? '✓ VIP SUBSCRIBED' : 'SUBSCRIBE FREE 💖'}
                      </button>
                    </div>
                  </div>

                  {tipSuccess && (
                    <div className="p-3 bg-pink-950/80 border-2 border-pink-500 text-pink-200 text-xs font-bold rounded-2xl text-center shadow">
                      {tipSuccess}
                    </div>
                  )}
                </div>

                {/* Bubbly Live Cams Widget Strip */}
                <div className="rounded-3xl border-3 border-pink-500/50 bg-[#181329]/95 p-5 backdrop-blur-xl shadow-2xl ct-bubbly-card">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Radio size={20} className="text-[#ff1475] animate-pulse" />
                      <h3 className="font-black text-base text-white font-['Outfit']">
                        LIVE WEBCAMS STREAMING NOW 💋
                      </h3>
                    </div>
                    <span className="text-xs text-pink-300 font-black cursor-pointer hover:underline">
                      View All 94 Live Studios →
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {LIVE_CAMS.map((cam) => (
                      <div
                        key={cam.name}
                        onClick={() => alert(`Connecting to private webcam studio for ${cam.name}...`)}
                        className="group relative rounded-2xl overflow-hidden border-2 border-pink-500/30 hover:border-[#ff1475] cursor-pointer transition-all ct-bubble-btn shadow-lg"
                      >
                        <div
                          className={`w-full pt-[80%] bg-gradient-to-br ${cam.gradient} group-hover:brightness-125 transition-all`}
                        />
                        <div className="absolute top-2.5 left-2.5 flex gap-1">
                          <span className="bg-[#ff1475] text-white text-[9px] font-black px-2.5 py-0.5 rounded-full shadow-[0_0_10px_#ff1475]">
                            {cam.status}
                          </span>
                          <span className="bg-black/75 text-cyan-300 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full">
                            {cam.badge}
                          </span>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center justify-between text-xs text-white">
                          <span className="font-black">{cam.name}</span>
                          <span className="text-[11px] font-mono text-pink-400 font-black">
                            {cam.viewers}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar with Stats Card & Sponsors */}
              <aside className="lg:col-span-4 space-y-6">
                {/* Scene Specifications Card */}
                <div className="bg-[#181329]/95 border-2 border-pink-500/50 rounded-3xl p-6 backdrop-blur-xl shadow-2xl ct-bubbly-card">
                  <h3 className="text-sm font-black font-['Outfit'] text-white uppercase tracking-wider pb-4 border-b-2 border-pink-500/20 flex items-center justify-between">
                    <span>Scene Specifications 🎬</span>
                    <Sliders size={18} className="text-[#ff1475]" />
                  </h3>
                  <div className="divide-y divide-pink-500/10 text-xs">
                    <div className="py-3 flex justify-between font-bold">
                      <span className="text-pink-200">Resolution</span>
                      <span className="font-mono text-cyan-300">3840 x 2160 (4K UHD)</span>
                    </div>
                    <div className="py-3 flex justify-between font-bold">
                      <span className="text-pink-200">Frame Rate</span>
                      <span className="font-mono text-white">59.94 fps</span>
                    </div>
                    <div className="py-3 flex justify-between font-bold">
                      <span className="text-pink-200">Bitrate</span>
                      <span className="font-mono text-white">28.4 Mbps</span>
                    </div>
                    <div className="py-3 flex justify-between font-bold">
                      <span className="text-pink-200">Production Studio</span>
                      <span className="font-black text-[#ff1475]">Couchtryouts Originals</span>
                    </div>
                    <div className="py-3 flex justify-between font-bold">
                      <span className="text-pink-200">Compliance</span>
                      <span className="text-emerald-400">18 U.S.C. 2257 Verified</span>
                    </div>
                  </div>
                </div>

                {/* Sidebar Sponsor Ad */}
                <div className="bg-gradient-to-br from-[#2f1042] to-[#450e38] border-3 border-pink-500/70 rounded-3xl p-6 text-center shadow-[0_12px_40px_rgba(0,0,0,0.85),0_0_30px_rgba(255,20,117,0.4)] ct-bubbly-card">
                  <span className="text-[10px] font-mono font-black text-[#ff1475] uppercase tracking-wider bg-black/60 px-3 py-1 rounded-full">
                    SPONSOR // 300x250 BANNER
                  </span>
                  <h4 className="text-lg font-black font-['Outfit'] text-white mt-3">
                    VR Couch Tryouts 8K 🍓
                  </h4>
                  <p className="text-xs text-pink-200 mt-1 mb-5 font-semibold">
                    Sit right on the casting couch with full 8K 180° spatial audio VR
                  </p>
                  <button className="ct-bubble-btn ct-gloss-sheen w-full py-3.5 rounded-full bg-gradient-to-r from-[#ff1475] via-[#ff2a8d] to-[#9333ea] text-white text-xs font-black tracking-wider uppercase shadow-[0_0_25px_rgba(255,20,117,0.6)]">
                    ENTER VR EXPERIENCE ✨
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
              <div className="pt-8 border-t-2 border-pink-500/30">
                <span className="text-xs font-mono text-[#ff1475] font-black tracking-widest uppercase bg-pink-500/10 px-3 py-1 rounded-full">
                  PAGE PREVIEW 3:
                </span>
                <h2 className="text-3xl font-black font-['Outfit'] mt-2">Featured Model Profile 💖</h2>
              </div>
            )}

            {/* Profile Hero Card with Bubbly Neon Aura */}
            <div className="rounded-[40px] overflow-hidden border-3 border-pink-500/60 bg-[#161026] shadow-[0_30px_70px_rgba(0,0,0,0.95),0_0_50px_rgba(255,20,117,0.35)] ct-bubbly-card">
              {/* Banner Area */}
              <div className="h-60 sm:h-76 w-full relative bg-radial-[at_70%_30%] from-[#730a43] via-[#2f094c] to-[#0c0918]">
                <div className="absolute inset-0 bg-gradient-to-t from-[#161026] to-transparent opacity-90" />
                <div className="absolute top-6 right-6">
                  <span className="bg-black/70 border-2 border-pink-500/50 text-white text-xs font-black px-4 py-2 rounded-full backdrop-blur-md flex items-center gap-2 shadow">
                    <Award size={16} className="text-yellow-300" />
                    <span>Top 0.1% Creator Worldwide</span>
                  </span>
                </div>
              </div>

              {/* Profile Details Header */}
              <div className="px-6 sm:px-12 pb-12 -mt-24 sm:-mt-28 relative z-10">
                <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6">
                  {/* Bubbly Avatar with Double Halo */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 text-center sm:text-left">
                    <div className="w-36 sm:w-44 h-36 sm:h-44 rounded-full p-2 bg-gradient-to-tr from-[#ff1475] via-[#ff2a8d] to-[#9333ea] shadow-[0_0_50px_rgba(255,20,117,0.75)]">
                      <div className="w-full h-full rounded-full bg-[#100a1c] flex items-center justify-center font-black text-white text-4xl sm:text-6xl font-['Outfit']">
                        SR
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center sm:justify-start gap-3">
                        <h1 className="text-3xl sm:text-5xl font-black font-['Outfit'] text-white">
                          Sienna Rose
                        </h1>
                        <span className="text-3xl text-yellow-300 drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]">
                          👑
                        </span>
                      </div>
                      <p className="text-sm font-mono text-pink-300 font-black mt-1">
                        @siennarose · Exclusive Couchtryouts Headliner 💖
                      </p>
                      <p className="text-xs sm:text-sm text-pink-100 max-w-xl mt-3 leading-relaxed font-semibold">
                        Award-winning performer and exclusive contract lead at Couchtryouts. Known for intense unscripted chemistry, raw auditions, and high-energy midnight performances. New scenes drop every Tuesday & Friday!
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => setSubscribed(!subscribed)}
                      className="ct-bubble-btn ct-gloss-sheen px-8 py-3.5 rounded-full bg-gradient-to-r from-[#ff1475] via-[#ff2a8d] to-[#9333ea] text-white font-black text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(255,20,117,0.6)]"
                    >
                      {subscribed ? '✓ VIP SUBSCRIBED' : 'SUBSCRIBE FREE 💖'}
                    </button>
                    <button
                      onClick={() => handleTip('$50', '👑')}
                      className="ct-bubble-btn px-6 py-3.5 rounded-full bg-[#241a3d] hover:bg-[#322355] text-white font-black text-xs border-2 border-pink-500/50 shadow flex items-center gap-2"
                    >
                      <DollarSign size={16} className="text-emerald-400" />
                      <span>Tip Queen $50 👑</span>
                    </button>
                  </div>
                </div>

                {/* Bubbly Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-8 pt-6 border-t-2 border-pink-500/20">
                  <div className="bg-[#201636] border-2 border-pink-500/30 rounded-3xl p-4 text-center shadow ct-bubbly-card">
                    <div className="text-2xl font-black font-mono text-white">142</div>
                    <div className="text-[11px] font-black text-pink-300 uppercase tracking-wider mt-1">
                      Auditions 🎬
                    </div>
                  </div>
                  <div className="bg-[#201636] border-2 border-pink-500/30 rounded-3xl p-4 text-center shadow ct-bubbly-card">
                    <div className="text-2xl font-black font-mono text-white">48.6M</div>
                    <div className="text-[11px] font-black text-pink-300 uppercase tracking-wider mt-1">
                      Total Views ✨
                    </div>
                  </div>
                  <div className="bg-[#201636] border-2 border-pink-500/30 rounded-3xl p-4 text-center shadow ct-bubbly-card">
                    <div className="text-2xl font-black font-mono text-white">320K</div>
                    <div className="text-[11px] font-black text-pink-300 uppercase tracking-wider mt-1">
                      Fans & Subs 💖
                    </div>
                  </div>
                  <div className="bg-[#201636] border-2 border-pink-500/30 rounded-3xl p-4 text-center shadow ct-bubbly-card">
                    <div className="text-2xl font-black font-mono text-[#ff1475]">#3</div>
                    <div className="text-[11px] font-black text-pink-300 uppercase tracking-wider mt-1">
                      Global Rank 👑
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-1 bg-[#201636] border-2 border-pink-500/30 rounded-3xl p-4 text-center shadow ct-bubbly-card">
                    <div className="text-2xl font-black font-mono text-emerald-400">99.4%</div>
                    <div className="text-[11px] font-black text-pink-300 uppercase tracking-wider mt-1">
                      Love Score 🍓
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* BUBBLY FOOTER */}
      <footer className="bg-[#07050d] border-t-2 border-pink-500/30 mt-auto pt-14 pb-10 text-xs text-pink-200/80 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="bg-[#150f24] border-2 border-pink-500/40 rounded-3xl p-6 text-pink-100 leading-relaxed text-xs shadow-xl">
            <span className="font-black text-[#ff1475] uppercase tracking-wide mr-2">
              18+ ADULT ENTERTAINMENT COMPLIANCE NOTICE:
            </span>
            This site contains age-restricted, sexually explicit audiovisual material intended strictly for
            consenting adults aged 18 years or older. All models, actors, and other persons depicted in audiovisual content appearing on Couchtryouts were 18 years of age or older at the time of photography or videography. All records required pursuant to 18 U.S.C. § 2257 and 28 C.F.R. Part 75 are maintained by the designated custodian of records.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <img
                src={LOGO_PATH}
                alt="Couchtryouts"
                className="h-14 w-auto drop-shadow-[0_0_20px_rgba(255,20,117,0.7)]"
              />
              <p className="text-pink-200 text-xs leading-relaxed font-semibold">
                The premier after-dark network for exclusive casting auditions, verified creator premieres,
                and high-fidelity 4K 60fps streaming.
              </p>
            </div>

            <div>
              <h4 className="font-black text-white text-xs uppercase tracking-wider mb-3 text-[#ff1475]">
                Audition Hubs 💖
              </h4>
              <ul className="space-y-2 text-xs font-semibold">
                <li><button onClick={() => setActiveTab('home')} className="hover:text-white transition-colors">Trending Auditions</button></li>
                <li><button onClick={() => setActiveTab('watch')} className="hover:text-white transition-colors">Featured 4K Releases</button></li>
                <li><button onClick={() => setActiveTab('model')} className="hover:text-white transition-colors">Verified Creators</button></li>
                <li><a href="#cams" className="hover:text-white transition-colors">Live Webcams (94 Online)</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-white text-xs uppercase tracking-wider mb-3 text-[#ff1475]">
                Legal & Compliance 🎬
              </h4>
              <ul className="space-y-2 text-xs font-semibold">
                <li><a href="#2257" className="hover:text-white transition-colors">18 U.S.C. 2257 Statement</a></li>
                <li><a href="#dmca" className="hover:text-white transition-colors">DMCA / Copyright Policy</a></li>
                <li><a href="#terms" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-white text-xs uppercase tracking-wider mb-3 text-[#ff1475]">
                Safety & Trust ✨
              </h4>
              <ul className="space-y-2 text-xs font-semibold">
                <li><span>Restricted To Adults (RTA)</span></li>
                <li><span>256-Bit SSL Encrypted</span></li>
                <li><span>Parental Control Ready</span></li>
                <li><a href="#support" className="hover:text-white transition-colors">24/7 VIP Support</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-pink-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-pink-300/60 font-semibold">
            <div>© 2026 Couchtryouts Media LLC. All rights reserved. Powered by the Neon Bubbly Tube System.</div>
            <div className="flex items-center gap-4">
              <span>Strict Anti-Piracy Policy</span>
              <span>·</span>
              <span>ICRA Labeled</span>
            </div>
          </div>
        </div>
      </footer>

      {/* PLUMP STICKY AD BARS */}
      {/* Desktop Sticky Bottom-Right 300x100 */}
      {desktopAdVisible && (
        <aside className="hidden lg:flex fixed bottom-6 right-6 z-40 w-[330px] h-[110px] bg-gradient-to-br from-[#241338]/95 to-[#3b0f3e]/95 border-3 border-pink-500/70 rounded-3xl shadow-[0_18px_45px_rgba(0,0,0,0.9),0_0_30px_rgba(255,20,117,0.45)] p-3.5 items-center justify-between backdrop-blur-xl animate-slideUp ct-bubbly-card">
          <button
            onClick={() => setDesktopAdVisible(false)}
            className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-white/20 hover:bg-[#ff1475] text-white flex items-center justify-center text-xs transition-colors ct-bubble-btn"
            title="Dismiss Ad"
          >
            ✕
          </button>
          <div className="pr-3">
            <span className="text-[10px] font-mono font-black text-[#ff1475] tracking-widest uppercase block">
              💋 SPONSOR // 300x100
            </span>
            <div className="text-xs font-black text-white mt-1 leading-snug">
              Live Webcam Auditions
            </div>
            <div className="text-[11px] text-pink-200">Private 1-on-1 VIP Room Online 💖</div>
          </div>
          <button className="ct-bubble-btn px-4 py-2.5 rounded-full bg-gradient-to-r from-[#ff1475] to-[#9333ea] text-white text-xs font-black shadow-[0_0_15px_#ff1475] shrink-0">
            CONNECT 💋
          </button>
        </aside>
      )}

      {/* Mobile Sticky Bottom 320x50 */}
      {mobileAdVisible && (
        <aside className="lg:hidden fixed bottom-0 left-0 right-0 z-40 h-[58px] bg-[#140e24]/95 border-t-3 border-pink-500/60 px-4 flex items-center justify-between backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono text-[#ff1475] font-black bg-white/10 px-2 py-0.5 rounded-full">320x50</span>
            <span className="text-xs font-black text-white">Unlock 4K Uncut Auditions 💖</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#ff1475] to-[#9333ea] text-white text-[11px] font-black shadow ct-bubble-btn">
              VIP PASS
            </button>
            <button
              onClick={() => setMobileAdVisible(false)}
              className="text-pink-300 hover:text-white p-1 font-bold"
            >
              ✕
            </button>
          </div>
        </aside>
      )}

      {/* THEME INSPECTOR MODAL */}
      {showCodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            onClick={() => setShowCodeModal(false)}
          />
          <div className="relative w-full max-w-3xl bg-[#140f24] border-3 border-pink-500/60 rounded-[36px] shadow-[0_30px_75px_rgba(0,0,0,0.95),0_0_50px_rgba(255,20,117,0.4)] max-h-[85vh] flex flex-col z-10 overflow-hidden ct-bubbly-card">
            <div className="p-5 border-b border-pink-500/20 flex items-center justify-between bg-[#19132c]">
              <div className="flex items-center gap-3">
                <Code2 className="text-[#ff1475]" size={22} />
                <h3 className="font-black text-base text-white font-['Outfit']">
                  Couchtryouts Bubbly Candy-Glam Tokens 💖
                </h3>
              </div>
              <button
                onClick={() => setShowCodeModal(false)}
                className="text-pink-300 hover:text-white p-1 rounded-full bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-xs text-pink-100">
              <div className="p-4 rounded-3xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-2 border-pink-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-black text-white text-sm">Standalone Self-Contained HTML File 🍓</h4>
                  <p className="text-pink-200 text-xs mt-0.5">
                    Plump bubbly components, juicy gloss highlights, transparent logo, and zero external JS.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={downloadStandaloneHtml}
                    className="ct-bubble-btn flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#ff1475] to-[#9333ea] text-white font-black text-xs shadow-lg"
                  >
                    <Download size={14} />
                    <span>Download .HTML</span>
                  </button>
                  <a
                    href="/couchtryouts-theme.html"
                    target="_blank"
                    rel="noreferrer"
                    className="ct-bubble-btn flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/20"
                  >
                    <Eye size={14} />
                    <span>Open Standalone</span>
                  </a>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-black text-white uppercase tracking-wider text-xs">
                    (1) Bubbly CSS Variables (:root)
                  </span>
                  <button
                    onClick={copyCssVars}
                    className="flex items-center gap-1 text-[#ff1475] hover:underline text-xs font-bold"
                  >
                    {cssCopied ? <Check size={14} /> : <Copy size={14} />}
                    <span>{cssCopied ? 'Copied :root Block!' : 'Copy :root Block'}</span>
                  </button>
                </div>
                <pre className="p-4 rounded-3xl bg-black/70 border-2 border-pink-500/30 font-mono text-xs text-pink-100 overflow-x-auto leading-relaxed">
{`:root {
  --ct-bg-base: #090710;
  --ct-bg-surface: #130f1f;
  --ct-bg-surface-elevated: #1a152b;
  --ct-bg-surface-card: #181226;
  
  --ct-neon-pink: #ff1475;
  --ct-candy-bubblegum: #ff2a8d;
  --ct-neon-violet: #9333ea;
  --ct-candy-purple: #a855f7;
  
  --ct-gradient-candy: linear-gradient(135deg, #ff1475 0%, #ff2a8d 35%, #a855f7 100%);
  --ct-gradient-bubblegum: linear-gradient(135deg, #ff3399 0%, #ff5277 50%, #f43f5e 100%);
  
  /* Plump Bubbly Radii */
  --ct-radius-sm: 12px;
  --ct-radius-md: 18px;
  --ct-radius-lg: 24px;
  --ct-radius-xl: 32px;
  --ct-radius-full: 9999px;
  
  --ct-shadow-bubble: 0 16px 36px -8px rgba(0, 0, 0, 0.8), 0 0 25px rgba(255, 20, 117, 0.4);
}`}
                </pre>
              </div>
            </div>

            <div className="p-4 border-t border-pink-500/20 flex justify-end bg-[#19132c]">
              <button
                onClick={() => setShowCodeModal(false)}
                className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-black text-xs ct-bubble-btn"
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
