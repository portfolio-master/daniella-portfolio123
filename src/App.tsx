import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Menu, X, Send, PlayCircle, Box, Building2, Sparkles, Eye, Star, Clock, Target, Plus, Instagram, Linkedin, Dribbble } from 'lucide-react';

// Reusable Scroll Reveal Component
const RevealDiv = ({ children, className = '', delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('opacity-0', 'translate-y-10');
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );
        
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className={`opacity-0 translate-y-10 transition-all duration-1000 ease-out ${className}`} style={{ transitionDelay: `${delay}ms` }}>
            {children}
        </div>
    );
};

export default function App() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    const cursorDotRef = useRef<HTMLDivElement>(null);
    const cursorOutlineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Inject Google Fonts
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        // Inject Tailwind CDN fallback (Guarantees CSS works even if Vite/Vercel build fails)
        const script = document.createElement('script');
        script.src = 'https://cdn.tailwindcss.com';
        document.head.appendChild(script);

        // Scroll listener for Navbar
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);

        // Custom Cursor Logic
        const handleMouseMove = (e: MouseEvent) => {
            if (window.matchMedia("(pointer: fine)").matches) {
                if (cursorDotRef.current) {
                    cursorDotRef.current.style.left = `${e.clientX}px`;
                    cursorDotRef.current.style.top = `${e.clientY}px`;
                }
                if (cursorOutlineRef.current) {
                    cursorOutlineRef.current.animate({
                        left: `${e.clientX}px`,
                        top: `${e.clientY}px`
                    }, { duration: 500, fill: "forwards" });
                }
            }
        };

        // Hover effect detection for custom cursor
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a') || target.closest('button') || target.closest('.hover-target')) {
                cursorOutlineRef.current?.classList.add('cursor-hover');
            }
        };
        const handleMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a') || target.closest('button') || target.closest('.hover-target')) {
                cursorOutlineRef.current?.classList.remove('cursor-hover');
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);

        return () => {
            if (document.head.contains(link)) document.head.removeChild(link);
            if (document.head.contains(script)) document.head.removeChild(script);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
        };
    }, []);

    const toggleFaq = (index: number) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    return (
        <div className="font-sans antialiased bg-[#0A0A0A] text-white min-h-screen relative selection:bg-[#D4AF37] selection:text-[#0A0A0A] overflow-x-hidden">
            <style dangerouslySetInnerHTML={{__html: `
                html { scroll-behavior: smooth; }
                body { font-family: 'Outfit', sans-serif; cursor: none; background-color: #0A0A0A; color: white; }
                .font-heading { font-family: 'Space Grotesk', sans-serif; }
                .glass { background: rgba(20, 20, 20, 0.4); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.05); }
                .glass-gold { background: rgba(212, 175, 55, 0.05); backdrop-filter: blur(10px); border: 1px solid rgba(212, 175, 55, 0.2); }
                .card-3d-wrap { perspective: 1000px; }
                .card-3d { transition: transform 0.5s ease; transform-style: preserve-3d; }
                .card-3d-wrap:hover .card-3d { transform: translateY(-10px) rotateX(5deg) rotateY(-5deg); }
                .cursor-hover { width: 60px !important; height: 60px !important; background-color: rgba(212, 175, 55, 0.1) !important; border-color: #D4AF37 !important; }
                ::-webkit-scrollbar { width: 8px; }
                ::-webkit-scrollbar-track { background: #0A0A0A; }
                ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
                ::-webkit-scrollbar-thumb:hover { background: #D4AF37; }
            `}} />

            {/* Custom Cursor */}
            <div ref={cursorDotRef} className="hidden md:block w-2 h-2 bg-[#D4AF37] fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full z-[9999] pointer-events-none"></div>
            <div ref={cursorOutlineRef} className="hidden md:block w-10 h-10 border-2 border-[#D4AF37]/50 fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full z-[9998] pointer-events-none transition-[width,height,background-color] duration-200"></div>

            {/* Navigation */}
            <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/5 py-4' : 'py-6'}`}>
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <a href="#home" className="font-heading text-2xl font-bold tracking-tighter hover-target">
                        DR<span className="text-[#D4AF37]">.</span>
                    </a>
                    
                    <div className="hidden md:flex items-center space-x-10">
                        <a href="#about" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">About</a>
                        <a href="#services" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Services</a>
                        <a href="#work" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Work</a>
                        <a href="#process" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Process</a>
                    </div>

                    <a href="mailto:daniellarose@gmail.com" className="hidden md:inline-flex items-center justify-center px-6 py-2.5 border border-white/20 text-white rounded-full hover:bg-white hover:text-[#0A0A0A] transition-all duration-300 font-medium text-sm">
                        Let's Talk
                    </a>

                    <button className="md:hidden text-white focus:outline-none" onClick={() => setMobileMenuOpen(true)}>
                        <Menu size={28} />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 bg-[#0A0A0A]/95 backdrop-blur-md z-[60] flex flex-col items-center justify-center space-y-8">
                    <button className="absolute top-6 right-6 text-white text-2xl focus:outline-none" onClick={() => setMobileMenuOpen(false)}>
                        <X size={32} />
                    </button>
                    <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-heading hover:text-[#D4AF37] transition-colors">About</a>
                    <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-heading hover:text-[#D4AF37] transition-colors">Services</a>
                    <a href="#work" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-heading hover:text-[#D4AF37] transition-colors">Work</a>
                    <a href="#process" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-heading hover:text-[#D4AF37] transition-colors">Process</a>
                    <a href="mailto:daniellarose@gmail.com" onClick={() => setMobileMenuOpen(false)} className="mt-8 px-8 py-3 bg-white text-[#0A0A0A] rounded-full font-medium">Let's Talk</a>
                </div>
            )}

            {/* Hero Section (Matched to Reference Image) */}
            <section id="home" className="relative min-h-screen flex items-center justify-center pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
                    <div className="text-left space-y-8">
                        <RevealDiv delay={0}>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37] text-xs font-semibold tracking-widest uppercase">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"></span>
                                Available for freelance work
                            </div>
                        </RevealDiv>
                        
                        <RevealDiv delay={100}>
                            <h1 className="text-6xl md:text-7xl lg:text-[5.5rem] font-heading font-bold leading-[1.1] tracking-tight text-white">
                                Visualizing <br />
                                <span className="text-[#D4AF37] italic">Tomorrow.</span>
                            </h1>
                        </RevealDiv>
                        
                        <RevealDiv delay={200}>
                            <p className="text-lg text-gray-400 max-w-md font-light leading-relaxed">
                                I am Daniella Rose, specializing in high-end 3D rendering. I transform concepts into photorealistic, clean, and minimal visual experiences.
                            </p>
                        </RevealDiv>
                        
                        <RevealDiv delay={300}>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <a href="mailto:daniellarose@gmail.com" className="px-7 py-3.5 bg-white text-[#0A0A0A] rounded-full font-medium hover:bg-gray-200 transition-colors flex items-center gap-2 text-sm">
                                    Contact me <ArrowRight size={16} />
                                </a>
                                <a href="#work" className="px-7 py-3.5 border border-white/20 rounded-full font-medium hover:border-white transition-colors flex items-center gap-2 text-white text-sm">
                                    <PlayCircle size={16} /> View Showreel
                                </a>
                            </div>
                        </RevealDiv>
                    </div>

                    <RevealDiv delay={200} className="relative w-full aspect-[4/3] lg:aspect-[4/3] mt-10 lg:mt-0">
                        {/* Floating Image */}
                        <div className="w-full h-full rounded-2xl overflow-hidden border border-white/5 shadow-2xl relative">
                            {/* Abstract Colorful Gradient Image matching the aesthetic */}
                            <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" alt="3D Abstract Render" className="w-full h-full object-cover opacity-90" />
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#0A0A0A]/30 to-transparent mix-blend-overlay"></div>
                        </div>

                        {/* Floating Badge */}
                        <div className="absolute -bottom-6 -right-6 lg:bottom-6 lg:right-6 bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/10 px-6 py-4 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                            <p className="text-xs text-gray-400 font-medium mb-1">Render Quality</p>
                            <p className="text-2xl font-heading font-bold text-[#D4AF37]">4K+</p>
                        </div>
                    </RevealDiv>
                </div>
                
                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
                     <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center p-1">
                         <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce mt-1"></div>
                     </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-24 relative bg-[#050505]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <RevealDiv className="lg:col-span-5 relative">
                            <div className="aspect-[4/5] rounded-2xl overflow-hidden glass p-2 border border-white/5">
                                <img src="https://images.unsplash.com/photo-1616423640778-28d1b53229bd?q=80&w=2000&auto=format&fit=crop" alt="Daniella Rose Studio" className="w-full h-full object-cover rounded-xl filter grayscale hover:grayscale-0 transition-all duration-700" />
                            </div>
                            <div className="absolute -bottom-6 -right-6 glass-gold p-6 rounded-2xl text-center shadow-2xl">
                                <h3 className="text-4xl font-heading font-bold text-[#D4AF37] mb-1">5+</h3>
                                <p className="text-xs uppercase tracking-widest text-gray-400">Years<br />Experience</p>
                            </div>
                        </RevealDiv>

                        <RevealDiv className="lg:col-span-7 lg:pl-12 space-y-8" delay={200}>
                            <div>
                                <h2 className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-3">The Artist</h2>
                                <h3 className="text-4xl md:text-5xl font-heading font-bold mb-6 tracking-tight">Bridging imagination with visual perfection.</h3>
                            </div>
                            
                            <div className="space-y-4 text-gray-400 font-light text-lg">
                                <p>
                                    Hello, I'm Daniella. I specialize in translating complex ideas into stunning, photorealistic 3D renders. My background in design allows me to not just render an object, but to tell its story through lighting, texture, and composition.
                                </p>
                                <p>
                                    Whether it's architectural visualization, product mockups, or abstract brand assets, my goal is to create visuals that don't just look real—they feel premium.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/5">
                                <div>
                                    <h4 className="font-heading font-semibold text-xl mb-2 text-white">Clients</h4>
                                    <p className="text-gray-400 text-sm">Agencies, Startups, Design Studios, Brands</p>
                                </div>
                                <div>
                                    <h4 className="font-heading font-semibold text-xl mb-2 text-white">Tools</h4>
                                    <p className="text-gray-400 text-sm">Blender, Cinema 4D, Octane, Redshift</p>
                                </div>
                            </div>
                        </RevealDiv>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-24 relative bg-[#0A0A0A]">
                <div className="max-w-7xl mx-auto px-6">
                    <RevealDiv className="text-center mb-16">
                        <h2 className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-3">Expertise</h2>
                        <h3 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">Services & Capabilities</h3>
                    </RevealDiv>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <RevealDiv delay={0} className="bg-[#111] border border-white/5 p-8 rounded-2xl card-3d-wrap group hover:border-white/10 transition-colors">
                            <div className="card-3d h-full flex flex-col">
                                <div className="w-12 h-12 rounded-full glass-gold flex items-center justify-center mb-8 text-[#D4AF37] group-hover:scale-110 transition-transform">
                                    <Box size={20} />
                                </div>
                                <h4 className="text-2xl font-heading font-bold mb-4">Product Rendering</h4>
                                <p className="text-gray-400 font-light mb-8 flex-grow text-sm leading-relaxed">
                                    Photorealistic 3D visuals for products. Perfect for e-commerce, marketing campaigns, and pre-manufacturing visualization.
                                </p>
                                <ul className="space-y-3 text-sm text-gray-500 mt-auto">
                                    <li className="flex items-center"><Star size={12} className="text-[#D4AF37] mr-3 fill-current" /> Studio Lighting Setup</li>
                                    <li className="flex items-center"><Star size={12} className="text-[#D4AF37] mr-3 fill-current" /> Material & Texture Creation</li>
                                    <li className="flex items-center"><Star size={12} className="text-[#D4AF37] mr-3 fill-current" /> 360° Turnarounds</li>
                                </ul>
                            </div>
                        </RevealDiv>

                        <RevealDiv delay={100} className="bg-[#111] border border-white/5 p-8 rounded-2xl card-3d-wrap group hover:border-white/10 transition-colors">
                            <div className="card-3d h-full flex flex-col">
                                <div className="w-12 h-12 rounded-full glass-gold flex items-center justify-center mb-8 text-[#D4AF37] group-hover:scale-110 transition-transform">
                                    <Building2 size={20} />
                                </div>
                                <h4 className="text-2xl font-heading font-bold mb-4">Architectural Viz</h4>
                                <p className="text-gray-400 font-light mb-8 flex-grow text-sm leading-relaxed">
                                    Immersive interior and exterior renders that bring architectural plans to life with stunning realism and atmosphere.
                                </p>
                                <ul className="space-y-3 text-sm text-gray-500 mt-auto">
                                    <li className="flex items-center"><Star size={12} className="text-[#D4AF37] mr-3 fill-current" /> Interior/Exterior Renders</li>
                                    <li className="flex items-center"><Star size={12} className="text-[#D4AF37] mr-3 fill-current" /> Atmospheric Lighting</li>
                                    <li className="flex items-center"><Star size={12} className="text-[#D4AF37] mr-3 fill-current" /> Environmental Context</li>
                                </ul>
                            </div>
                        </RevealDiv>

                        <RevealDiv delay={200} className="bg-[#111] border border-white/5 p-8 rounded-2xl card-3d-wrap group hover:border-white/10 transition-colors">
                            <div className="card-3d h-full flex flex-col">
                                <div className="w-12 h-12 rounded-full glass-gold flex items-center justify-center mb-8 text-[#D4AF37] group-hover:scale-110 transition-transform">
                                    <Sparkles size={20} />
                                </div>
                                <h4 className="text-2xl font-heading font-bold mb-4">Abstract Art</h4>
                                <p className="text-gray-400 font-light mb-8 flex-grow text-sm leading-relaxed">
                                    Creative 3D assets and loopable animations for brand identities, websites, and social media content.
                                </p>
                                <ul className="space-y-3 text-sm text-gray-500 mt-auto">
                                    <li className="flex items-center"><Star size={12} className="text-[#D4AF37] mr-3 fill-current" /> Brand Assets</li>
                                    <li className="flex items-center"><Star size={12} className="text-[#D4AF37] mr-3 fill-current" /> Loopable Animations</li>
                                    <li className="flex items-center"><Star size={12} className="text-[#D4AF37] mr-3 fill-current" /> Concept Exploration</li>
                                </ul>
                            </div>
                        </RevealDiv>
                    </div>
                </div>
            </section>

            {/* Selected Work Section */}
            <section id="work" className="py-24 relative bg-[#050505]">
                <div className="max-w-7xl mx-auto px-6">
                    <RevealDiv className="flex flex-col md:flex-row justify-between items-end mb-16">
                        <div>
                            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-3">Portfolio</h2>
                            <h3 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">Selected Works</h3>
                        </div>
                        <a href="#work" className="hidden md:inline-flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors mt-4 md:mt-0 pb-2">
                            View all projects <ArrowRight size={16} className="ml-2" />
                        </a>
                    </RevealDiv>

                    <div className="space-y-24">
                        {/* Project 1 */}
                        <RevealDiv className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                            <div className="lg:col-span-7 order-2 lg:order-1 relative group overflow-hidden rounded-2xl border border-white/5">
                                <div className="aspect-[16/10] bg-[#111]">
                                    <img src="https://images.unsplash.com/photo-1616422285623-13899f8d5f30?q=80&w=2000&auto=format&fit=crop" alt="Project 1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
                                </div>
                                <div className="absolute inset-0 bg-[#0A0A0A]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <a href="#work" className="w-16 h-16 rounded-full bg-white text-[#0A0A0A] flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100 shadow-xl">
                                        <Eye size={24} />
                                    </a>
                                </div>
                            </div>
                            <div className="lg:col-span-5 order-1 lg:order-2 lg:pl-10">
                                <span className="text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mb-3 block">Product Rendering</span>
                                <h4 className="text-3xl font-heading font-bold mb-4">Aura Fragrance</h4>
                                <p className="text-gray-400 font-light mb-8 text-sm leading-relaxed">Photorealistic studio rendering campaign for a luxury perfume brand, focusing on glass caustics and premium lighting setups.</p>
                                <div className="flex gap-3">
                                    <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-gray-300">Cinema 4D</span>
                                    <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-gray-300">Octane</span>
                                </div>
                            </div>
                        </RevealDiv>

                        {/* Project 2 */}
                        <RevealDiv className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                            <div className="lg:col-span-5 pr-0 lg:pr-10 text-left lg:text-right">
                                <span className="text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mb-3 block">Architectural Viz</span>
                                <h4 className="text-3xl font-heading font-bold mb-4">The Zenith</h4>
                                <p className="text-gray-400 font-light mb-8 text-sm leading-relaxed">Atmospheric interior rendering for a modern minimalist residential project, highlighting natural light, depth, and material textures.</p>
                                <div className="flex gap-3 lg:justify-end">
                                    <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-gray-300">Blender</span>
                                    <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-gray-300">Cycles</span>
                                </div>
                            </div>
                            <div className="lg:col-span-7 relative group overflow-hidden rounded-2xl border border-white/5">
                                <div className="aspect-[16/10] bg-[#111]">
                                    <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop" alt="Project 2" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
                                </div>
                                <div className="absolute inset-0 bg-[#0A0A0A]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <a href="#work" className="w-16 h-16 rounded-full bg-white text-[#0A0A0A] flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100 shadow-xl">
                                        <Eye size={24} />
                                    </a>
                                </div>
                            </div>
                        </RevealDiv>
                    </div>
                </div>
            </section>

            {/* Why Me & Process */}
            <section id="process" className="py-24 relative bg-[#0A0A0A] border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20">
                    
                    <RevealDiv>
                        <h2 className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-3">The Difference</h2>
                        <h3 className="text-3xl md:text-4xl font-heading font-bold mb-10 tracking-tight">Why collaborate with me?</h3>
                        
                        <div className="space-y-8">
                            <div className="flex gap-5">
                                <div className="mt-1 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#D4AF37] shrink-0"><Star size={18} /></div>
                                <div>
                                    <h4 className="text-lg font-bold mb-2">Uncompromising Quality</h4>
                                    <p className="text-gray-400 font-light text-sm leading-relaxed">I don't settle for 'good enough'. Every texture, lighting setup, and composition is meticulously crafted to ensure a premium, photorealistic final result.</p>
                                </div>
                            </div>
                            <div className="flex gap-5">
                                <div className="mt-1 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#D4AF37] shrink-0"><Clock size={18} /></div>
                                <div>
                                    <h4 className="text-lg font-bold mb-2">Reliable Communication</h4>
                                    <p className="text-gray-400 font-light text-sm leading-relaxed">No disappearing acts. You'll receive regular updates and work-in-progress shots so you are always in the loop regarding the project status.</p>
                                </div>
                            </div>
                            <div className="flex gap-5">
                                <div className="mt-1 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#D4AF37] shrink-0"><Target size={18} /></div>
                                <div>
                                    <h4 className="text-lg font-bold mb-2">Design-Led Approach</h4>
                                    <p className="text-gray-400 font-light text-sm leading-relaxed">Coming from a design background, I understand the 'why' behind the visuals, ensuring the renders align perfectly with your brand's core strategy.</p>
                                </div>
                            </div>
                        </div>
                    </RevealDiv>

                    <RevealDiv delay={200}>
                        <h2 className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-3">Workflow</h2>
                        <h3 className="text-3xl md:text-4xl font-heading font-bold mb-10 tracking-tight">My Process</h3>
                        
                        <div className="relative border-l border-white/10 ml-5 space-y-10 pb-4">
                            <div className="relative pl-10">
                                <div className="absolute -left-3.5 top-1 w-7 h-7 rounded-full bg-[#0A0A0A] border-2 border-[#D4AF37] flex items-center justify-center">
                                    <span className="w-2 h-2 bg-[#D4AF37] rounded-full"></span>
                                </div>
                                <h4 className="text-lg font-bold mb-2">1. Discovery & Briefing</h4>
                                <p className="text-gray-400 font-light text-sm leading-relaxed">We discuss your goals, references, and requirements to ensure we are completely aligned on the vision before starting any 3D work.</p>
                            </div>
                            <div className="relative pl-10">
                                <div className="absolute -left-3.5 top-1 w-7 h-7 rounded-full bg-[#0A0A0A] border-2 border-[#333] flex items-center justify-center"></div>
                                <h4 className="text-lg font-bold mb-2">2. Clay Render & Composition</h4>
                                <p className="text-gray-400 font-light text-sm leading-relaxed">I create untextured, basic lighting setups (clay renders) to lock in the camera angles, focal lengths, and overall composition.</p>
                            </div>
                            <div className="relative pl-10">
                                <div className="absolute -left-3.5 top-1 w-7 h-7 rounded-full bg-[#0A0A0A] border-2 border-[#333] flex items-center justify-center"></div>
                                <h4 className="text-lg font-bold mb-2">3. Materials & Lighting</h4>
                                <p className="text-gray-400 font-light text-sm leading-relaxed">Once approved, I apply high-res textures, perfect the environment lighting, and send near-final previews for your feedback.</p>
                            </div>
                            <div className="relative pl-10">
                                <div className="absolute -left-3.5 top-1 w-7 h-7 rounded-full bg-[#0A0A0A] border-2 border-[#333] flex items-center justify-center"></div>
                                <h4 className="text-lg font-bold mb-2">4. Final Delivery</h4>
                                <p className="text-gray-400 font-light text-sm leading-relaxed">After final adjustments and high-resolution rendering, you receive the polished, ready-to-use digital assets.</p>
                            </div>
                        </div>
                    </RevealDiv>
                </div>
            </section>

            {/* CTA & Footer */}
            <footer className="relative pt-32 pb-12 overflow-hidden bg-[#050505]">
                <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-[#D4AF37]/5 to-transparent -z-10"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#D4AF37]/10 rounded-full blur-[150px] pointer-events-none"></div>

                <RevealDiv className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <h2 className="text-5xl md:text-7xl font-heading font-bold mb-8 tracking-tight text-white">Have a project <br/><span className="text-gray-500 italic">in mind?</span></h2>
                    <p className="text-lg text-gray-400 mb-12 font-light max-w-xl mx-auto">Let's collaborate to create stunning 3D visuals that elevate your brand and captivate your audience.</p>
                    
                    <a href="mailto:daniellarose@gmail.com" className="inline-flex items-center justify-center px-10 py-4 bg-white text-[#0A0A0A] rounded-full text-sm font-bold hover:bg-gray-200 transition-colors shadow-xl">
                        Contact Me <Send className="ml-3" size={16} />
                    </a>

                    <div className="mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-sm text-gray-500">© 2026 Daniella Rose. All rights reserved.</p>
                        <div className="flex space-x-8 text-gray-500">
                            <a href="#" className="hover:text-white transition-colors"><Instagram size={18} /></a>
                            <a href="#" className="hover:text-white transition-colors"><Dribbble size={18} /></a>
                            <a href="#" className="hover:text-white transition-colors"><Linkedin size={18} /></a>
                        </div>
                    </div>
                </RevealDiv>
            </footer>
        </div>
    );
}
