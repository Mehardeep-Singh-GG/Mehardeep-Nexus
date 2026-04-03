import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, personalInfo, Project } from './data';
import Background from './components/Background';
import Cursor from './components/Cursor';
import ErrorBoundary from './components/ErrorBoundary';
import { cn } from './lib/utils';
import { nexusAudio } from './lib/audio';
import { ArrowRight, Download, Mail, MapPin, ExternalLink, ChevronLeft, Menu, X, Cpu, Zap, Globe, Layers, User } from 'lucide-react';

type Page = 'home' | 'project' | 'about' | 'resume';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [introStep, setIntroStep] = useState(0);
  const [isEntered, setIsEntered] = useState(false);
  const [isWarping, setIsWarping] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsLoading(false);
            return 100;
          }
          return prev + Math.random() * 20;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const introTexts = [
    "In the beginning, there was the Brick.",
    "A single unit of logic, a fragment of reality.",
    "Nexus was built to find the connections between them.",
    "Like the Library of Babel, it contains every possible law of nature.",
    "Our mission: To rule out the impossible, and discover the truth.",
    "Welcome to the Nexus Lab."
  ];

  const [isDiscovering, setIsDiscovering] = useState(false);

  useEffect(() => {
    if (!isLoading && !isEntered && !isDiscovering && introStep < introTexts.length) {
      try { nexusAudio.playPing(330 + introStep * 50, 'sine', 0.1); } catch (e) {}
      const timer = setTimeout(() => {
        setIntroStep(prev => prev + 1);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, isEntered, isDiscovering, introStep]);

  const handleEnter = () => {
    try {
      nexusAudio.playPing(880, 'sine', 0.3);
      setIsWarping(true);
      setIsDiscovering(true);
      
      // Discovery Sequence: Fly through equations
      setTimeout(() => {
        nexusAudio.playWarp();
        setTimeout(() => {
          setIsEntered(true);
          setIsWarping(false);
          setIsDiscovering(false);
        }, 2000);
      }, 1500);
    } catch (e) {
      setIsEntered(true);
      setIsWarping(false);
      setIsDiscovering(false);
    }
  };

  const [isGodMode, setIsGodMode] = useState(false);

  const navigateTo = (page: Page, project?: Project) => {
    try {
      nexusAudio.playPing(660, 'sine', 0.2);
    } catch (e) {}
    
    if (project) {
      setSelectedProject(project);
      setIsGodMode(true);
      // Exit God Mode after a transition
      setTimeout(() => setIsGodMode(false), 3000);
    } else {
      setIsGodMode(false);
    }
    
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeColor = hoveredProject?.color || selectedProject?.color || "#3b82f6";

  return (
    <div className="relative min-h-screen bg-[#020408] text-white selection:bg-white selection:text-black overflow-x-hidden">
      <Background 
        activeColor={isEntered ? activeColor : "#ffffff"} 
        isWarping={isWarping} 
        isGodMode={isGodMode}
      />
      <Cursor />
      <div className="lab-grid fixed inset-0 opacity-10 pointer-events-none" />
      <div className="scanline" />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div 
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#020408] z-[100] flex flex-col items-center justify-center font-mono"
          >
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-4xl font-bold tracking-tighter mb-12 glow-text"
            >
              NEXUS
            </motion.div>
            <motion.div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mb-4">
              <motion.div 
                className="h-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </motion.div>
            <div className="text-[10px] tracking-widest text-white/50 uppercase">
              Accessing Infinite Library... {Math.round(progress)}%
            </div>
          </motion.div>
        ) : !isEntered ? (
          <motion.div 
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex flex-col items-center justify-center px-6"
          >
            <AnimatePresence mode="wait">
              {isDiscovering ? (
                <motion.div
                  key="discovering"
                  initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                  className="space-y-6 text-center"
                >
                  <div className="text-blue-500 font-mono text-xs tracking-[0.5em] uppercase animate-pulse">
                    Scanning Infinite Archive...
                  </div>
                  <h2 className="text-5xl md:text-8xl font-light tracking-tighter">
                    LOCATING <span className="text-blue-500">LAWS</span>
                  </h2>
                  <div className="flex justify-center gap-3">
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.3 }}
                        className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                      />
                    ))}
                  </div>
                </motion.div>
              ) : introStep < introTexts.length ? (
                <motion.div
                  key={introStep}
                  initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                  transition={{ duration: 1 }}
                  className="text-2xl md:text-4xl font-light tracking-tight text-center max-w-3xl leading-relaxed"
                >
                  {introTexts[introStep]}
                </motion.div>
              ) : (
                <motion.div
                  key="enter-nexus"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-12 glow-text">
                    NEXUS
                  </h1>
                  <motion.button
                    onClick={handleEnter}
                    onMouseEnter={() => nexusAudio.playPing(440, 'sine', 0.1)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-16 py-5 bg-transparent border border-white/20 hover:border-blue-500 transition-all duration-700 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-blue-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                    <span className="relative font-mono text-xs tracking-[0.8em] uppercase text-white/80 group-hover:text-white">
                      Enter Nexus
                    </span>
                    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/40 group-hover:border-blue-500 transition-colors duration-700" />
                    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/40 group-hover:border-blue-500 transition-colors duration-700" />
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/40 group-hover:border-blue-500 transition-colors duration-700" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/40 group-hover:border-blue-500 transition-colors duration-700" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10"
          >
            {/* Navigation */}
            <nav className="fixed top-0 left-0 w-full z-50 px-6 py-8 flex justify-between items-center mix-blend-difference">
              <button 
                onClick={() => navigateTo('home')}
                className="text-xl font-bold tracking-tighter hover:opacity-50 transition-opacity"
              >
                MEHARDEEP SINGH / NEXUS
              </button>
              
              <div className="hidden md:flex gap-12 text-sm font-medium tracking-widest uppercase">
                <button onClick={() => navigateTo('home')} className="hover:opacity-50 transition-opacity">Archive</button>
                <button onClick={() => navigateTo('about')} className="hover:opacity-50 transition-opacity">Architect</button>
                <button onClick={() => navigateTo('resume')} className="hover:opacity-50 transition-opacity">Blueprint</button>
              </div>

              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  className="fixed inset-0 z-[60] bg-[#020408] flex flex-col items-center justify-center gap-8 text-4xl font-bold tracking-tighter"
                >
                  <button onClick={() => navigateTo('home')}>Archive</button>
                  <button onClick={() => navigateTo('about')}>Architect</button>
                  <button onClick={() => navigateTo('resume')}>Blueprint</button>
                </motion.div>
              )}
            </AnimatePresence>

            <main className="pt-32 px-6 md:px-12 pb-24">
              <AnimatePresence mode="wait">
                {currentPage === 'home' && (
                  <motion.div
                    key="home"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-12"
                  >
                    <div className="lg:col-span-5 flex flex-col justify-center min-h-[60vh]">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h2 className="text-sm font-mono tracking-[0.3em] text-white/40 uppercase mb-6 flex items-center gap-2">
                          <Cpu size={14} className="text-blue-500" /> Infinite Library Section: 01
                        </h2>
                        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.85] mb-8">
                          THE <br />
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/20">ARCHIVE</span> OF <br />
                          DISCOVERY.
                        </h1>
                        <p className="text-lg md:text-xl text-white/60 max-w-md leading-relaxed font-light italic">
                          "The library exists ab aeterno. Each book is a law, each law is a world."
                        </p>
                      </motion.div>
                    </div>

                    <div className="lg:col-span-7 relative">
                      {/* Storyline Connector */}
                      <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-blue-500/50 via-white/10 to-transparent ml-[-2rem] hidden lg:block" />
                      
                      <div className="flex flex-col gap-1">
                        {projects.map((project, index) => (
                          <motion.div
                            key={project.id}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.1 * index }}
                            onMouseEnter={() => {
                              setHoveredProject(project);
                              try { nexusAudio.playPing(220 + index * 50, 'sine', 0.05); } catch (e) {}
                            }}
                            onMouseLeave={() => setHoveredProject(null)}
                            onClick={() => navigateTo('project', project)}
                            className="group relative py-12 border-b border-white/5 cursor-pointer overflow-hidden"
                          >
                            {/* Storyline Node */}
                            <div className="absolute left-[-2.25rem] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/20 group-hover:bg-blue-500 group-hover:scale-150 transition-all duration-500 hidden lg:block" />
                            
                            <div className="relative z-10 flex items-end justify-between">
                              <div className="flex items-baseline gap-8">
                                <div className="flex flex-col">
                                  <span className="text-[8px] font-mono text-blue-500/60 uppercase tracking-[0.3em] mb-1">
                                    Phase_{String(index + 1).padStart(2, '0')}
                                  </span>
                                  <span className="text-[10px] font-mono text-white/20 group-hover:text-blue-500 transition-colors">
                                    SHELF_{String(index + 1).padStart(2, '0')}
                                  </span>
                                </div>
                                <h3 className="text-4xl md:text-7xl font-bold tracking-tighter transition-transform group-hover:translate-x-6 duration-700 ease-out">
                                  {project.title}
                                </h3>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <span className="text-[10px] font-mono tracking-widest uppercase text-white/40 group-hover:text-white transition-colors">
                                  {project.type}
                                </span>
                                <div className="w-12 h-[1px] bg-white/20 group-hover:w-24 group-hover:bg-white transition-all duration-700" />
                              </div>
                            </div>
                            
                            {/* Technical Accents */}
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/10 group-hover:border-blue-500 transition-colors duration-500" />
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/10 group-hover:border-blue-500 transition-colors duration-500" />
                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/10 group-hover:border-blue-500 transition-colors duration-500" />
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/10 group-hover:border-blue-500 transition-colors duration-500" />

                            <motion.div 
                              className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                              initial={{ x: '-100%' }}
                              whileHover={{ x: '100%' }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentPage === 'project' && selectedProject && (
                  <motion.div
                    key="project"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="max-w-6xl mx-auto"
                  >
                    <button 
                      onClick={() => navigateTo('home')}
                      className="flex items-center gap-2 text-sm font-mono tracking-widest uppercase text-white/40 hover:text-white transition-colors mb-12"
                    >
                      <ChevronLeft size={16} /> Return to Archive
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
                      <div className="lg:col-span-8">
                        <div className="flex items-center gap-4 mb-6">
                          <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-[10px] font-mono tracking-widest uppercase rounded-full border border-blue-500/30">
                            {selectedProject.status}
                          </span>
                          <span className="text-white/20 font-mono text-xs">REF_ID: {selectedProject.id.toUpperCase()}</span>
                        </div>
                        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter leading-[0.8] mb-12">
                          {selectedProject.title}
                        </h1>
                        <p className="text-2xl md:text-3xl text-white/80 font-light leading-relaxed italic border-l-2 border-white/10 pl-8">
                          "{selectedProject.subtitle}"
                        </p>
                      </div>
                      <div className="lg:col-span-4 flex flex-col gap-12 pt-8">
                        <div className="space-y-8 p-8 glass border-white/5 rounded-sm relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-2 opacity-10"><Cpu size={40} /></div>
                          <div className="grid grid-cols-1 gap-6">
                            <div>
                              <h4 className="text-[10px] font-mono tracking-widest uppercase text-white/40 mb-2">Classification</h4>
                              <p className="text-sm font-medium tracking-tight">{selectedProject.type}</p>
                            </div>
                            <div>
                              <h4 className="text-[10px] font-mono tracking-widest uppercase text-white/40 mb-2">Discovery Year</h4>
                              <p className="text-sm font-medium">{selectedProject.year}</p>
                            </div>
                            <div>
                              <h4 className="text-[10px] font-mono tracking-widest uppercase text-white/40 mb-2">Publication</h4>
                              <p className="text-sm font-medium italic">{selectedProject.journal || 'Classified'}</p>
                            </div>
                          </div>
                          <div className="flex flex-col gap-3">
                            <button className="w-full py-4 bg-white text-black hover:bg-blue-500 hover:text-white transition-all duration-500 font-bold tracking-widest uppercase text-[10px] flex items-center justify-center gap-2">
                              Access Full Paper <ExternalLink size={12} />
                            </button>
                            <button className="w-full py-4 glass hover:bg-white/10 transition-all duration-500 font-bold tracking-widest uppercase text-[10px] flex items-center justify-center gap-2">
                              Source Repository <Cpu size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                      <div className="lg:col-span-4">
                        <div className="sticky top-32 space-y-12">
                          <section className="relative p-8 border border-white/5 bg-white/[0.02]">
                            <div className="absolute -top-3 -left-3 w-6 h-6 border-t border-l border-blue-500" />
                            <h3 className="text-xs font-mono tracking-[0.3em] text-white/40 uppercase mb-6 flex items-center gap-2">
                              <Zap size={14} className="text-blue-500" /> Mathematical Core
                            </h3>
                            <div className="font-mono text-lg text-white/90 leading-relaxed bg-black/40 p-4 rounded border border-white/5">
                              {selectedProject.mathCore}
                            </div>
                            <div className="mt-4 text-[10px] font-mono text-white/30 italic">
                              // Computed via Nexus Engine v4.2
                            </div>
                          </section>
                        </div>
                      </div>
                      <div className="lg:col-span-8 space-y-32">
                        <section>
                          <h3 className="text-xs font-mono tracking-[0.3em] text-white/40 uppercase mb-12 flex items-center gap-4">
                            <div className="h-[1px] w-12 bg-white/10" /> Abstract
                          </h3>
                          <p className="text-2xl text-white/70 leading-relaxed font-light">
                            {selectedProject.description}
                          </p>
                        </section>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                          <section>
                            <h3 className="text-xs font-mono tracking-[0.3em] text-white/40 uppercase mb-8 flex items-center gap-3">
                              <Globe size={14} className="text-blue-500" /> Breakthrough
                            </h3>
                            <p className="text-white/60 leading-relaxed font-light">
                              {selectedProject.breakthrough}
                            </p>
                          </section>
                          <section>
                            <h3 className="text-xs font-mono tracking-[0.3em] text-white/40 uppercase mb-8 flex items-center gap-3">
                              <Layers size={14} className="text-blue-500" /> Future Horizon
                            </h3>
                            <p className="text-white/60 leading-relaxed font-light">
                              {selectedProject.future}
                            </p>
                          </section>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentPage === 'about' && (
                  <motion.div
                    key="about"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="max-w-6xl mx-auto"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                      <div className="lg:col-span-7">
                        <h2 className="text-sm font-mono tracking-[0.3em] text-white/40 uppercase mb-8 flex items-center gap-2">
                          <User size={14} className="text-blue-500" /> Architect Profile: MS_01
                        </h2>
                        <h1 className="text-7xl md:text-9xl font-bold tracking-tighter leading-[0.8] mb-16">
                          {personalInfo.header}
                        </h1>
                        <p className="text-3xl md:text-4xl text-white/80 font-light leading-tight mb-16">
                          {personalInfo.story}
                        </p>
                        
                        <div className="space-y-24">
                          <section className="relative p-12 glass border-white/5">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-transparent opacity-50" />
                            <h3 className="text-xs font-mono tracking-[0.3em] text-white/40 uppercase mb-8">Core Philosophy</h3>
                            <p className="text-2xl text-white/60 font-light leading-relaxed italic">
                              "{personalInfo.philosophy}"
                            </p>
                          </section>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                            <section>
                              <h3 className="text-xs font-mono tracking-[0.3em] text-white/40 uppercase mb-8">Research Domains</h3>
                              <div className="space-y-4">
                                {personalInfo.researchAreas.map((area, i) => (
                                  <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * i }}
                                    className="flex items-center gap-4 group"
                                  >
                                    <span className="w-8 h-[1px] bg-white/10 group-hover:w-12 group-hover:bg-blue-500 transition-all" />
                                    <span className="text-lg font-light group-hover:translate-x-2 transition-transform">{area}</span>
                                  </motion.div>
                                ))}
                              </div>
                            </section>
                            <section>
                              <h3 className="text-xs font-mono tracking-[0.3em] text-white/40 uppercase mb-8">Recognition</h3>
                              <div className="space-y-6">
                                {personalInfo.recognition.map((rec, i) => (
                                  <div key={i} className="flex gap-4">
                                    <span className="text-[10px] font-mono text-white/20 mt-1">0{i+1}</span>
                                    <p className="text-sm text-white/60 leading-relaxed">{rec}</p>
                                  </div>
                                ))}
                              </div>
                            </section>
                          </div>
                        </div>
                      </div>

                      <div className="lg:col-span-5">
                        <div className="sticky top-32 space-y-12">
                          <div className="aspect-[4/5] bg-white/5 relative overflow-hidden rounded-sm group">
                            <img 
                              src="https://picsum.photos/seed/architect/800/1000" 
                              alt="Architect" 
                              className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#020408] via-transparent to-transparent" />
                            <div className="absolute bottom-8 left-8">
                              <h3 className="text-2xl font-bold tracking-tighter">{personalInfo.name}</h3>
                              <p className="text-xs font-mono tracking-widest text-white/40 uppercase">{personalInfo.role}</p>
                            </div>
                          </div>

                          <div className="p-8 glass border-white/5 space-y-8">
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Contact Protocol</span>
                              <div className="h-[1px] flex-1 mx-4 bg-white/5" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <a href="#" className="py-4 text-center border border-white/5 hover:bg-white hover:text-black transition-all text-[10px] font-mono tracking-widest uppercase">Twitter</a>
                              <a href="#" className="py-4 text-center border border-white/5 hover:bg-white hover:text-black transition-all text-[10px] font-mono tracking-widest uppercase">LinkedIn</a>
                              <a href="#" className="py-4 text-center border border-white/5 hover:bg-white hover:text-black transition-all text-[10px] font-mono tracking-widest uppercase">Scholar</a>
                              <a href="#" className="py-4 text-center border border-white/5 hover:bg-white hover:text-black transition-all text-[10px] font-mono tracking-widest uppercase">GitHub</a>
                            </div>
                            <button className="w-full py-6 bg-blue-600 hover:bg-blue-500 transition-all font-bold tracking-[0.3em] uppercase text-xs">
                              Initiate Connection
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentPage === 'resume' && (
                  <motion.div
                    key="resume"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="max-w-4xl mx-auto"
                  >
                    <div className="flex justify-between items-end mb-16">
                      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9]">
                        RESUME
                      </h1>
                      <button className="px-8 py-4 glass hover:bg-white hover:text-black transition-all duration-500 font-bold tracking-widest uppercase text-xs flex items-center gap-2">
                        Download PDF <Download size={14} />
                      </button>
                    </div>

                    <div className="space-y-24">
                      <section>
                        <h3 className="text-xs font-mono tracking-[0.3em] text-white/40 uppercase mb-12">Core Competencies</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {personalInfo.skills.map((skill, i) => (
                            <div key={i} className="p-6 glass rounded-sm text-center group hover:border-blue-500 transition-colors">
                              <span className="text-sm font-medium tracking-widest uppercase group-hover:text-blue-500 transition-colors">{skill}</span>
                            </div>
                          ))}
                        </div>
                      </section>

                      <section className="grid grid-cols-1 md:grid-cols-12 gap-12">
                        <div className="md:col-span-4">
                          <h3 className="text-xs font-mono tracking-[0.3em] text-white/40 uppercase">Experience</h3>
                        </div>
                        <div className="md:col-span-8 space-y-12">
                          <div className="space-y-2">
                            <div className="flex justify-between items-baseline">
                              <h4 className="text-2xl font-bold tracking-tight">Independent Researcher</h4>
                              <span className="text-sm font-mono text-white/40">2022 — Present</span>
                            </div>
                            <p className="text-white/60">Focusing on Symbolic AI and Physics-Informed Neural Networks.</p>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between items-baseline">
                              <h4 className="text-2xl font-bold tracking-tight">Research Fellow</h4>
                              <span className="text-sm font-mono text-white/40">2020 — 2022</span>
                            </div>
                            <p className="text-white/60">Mathematical modeling of complex quantum systems.</p>
                          </div>
                        </div>
                      </section>

                      <section className="grid grid-cols-1 md:grid-cols-12 gap-12">
                        <div className="md:col-span-4">
                          <h3 className="text-xs font-mono tracking-[0.3em] text-white/40 uppercase">Education</h3>
                        </div>
                        <div className="md:col-span-8 space-y-12">
                          <div className="space-y-2">
                            <div className="flex justify-between items-baseline">
                              <h4 className="text-2xl font-bold tracking-tight">Ph.D. in Theoretical Physics</h4>
                              <span className="text-sm font-mono text-white/40">Expected 2025</span>
                            </div>
                            <p className="text-white/60">Focus on Mathematical Physics and AI Discovery.</p>
                          </div>
                        </div>
                      </section>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </main>

            {/* Footer Info */}
            <footer className="fixed bottom-8 left-6 md:left-12 z-50 hidden md:block">
              <div className="flex items-center gap-8 text-[10px] font-mono tracking-[0.2em] text-white/30 uppercase">
                <div className="flex items-center gap-2">
                  <MapPin size={10} /> Based in India
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" /> Nexus Core Online
                </div>
                <div>© 2026 Mehardeep Singh</div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}
