import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Menu, X, Send, Box, Building2, Sparkles, Eye, Star, Clock, Target, Plus, Instagram, Linkedin, Dribbble } from 'lucide-react';

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
            document.head.removeChild(link);
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
        <div className="font-sans antialiased bg-[#0A0A0A] text-white min-h-screen relative noise selection:bg-[#D4AF37] selection:text-[#0A0A0A] overflow-x-hidden">
            <style dangerouslySetInnerHTML={{__html: `
                html { scroll-behavior: smooth; }
                body { font-family: 'Outfit', sans-serif; cursor: none; }
                .font-heading { font-family: 'Space Grotesk', sans-serif; }
                .text-gradient { background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-image: linear-gradient(to right, #ffffff, #D4AF37); }
                .glass { background: rgba(20, 20, 20, 0.6); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.05); }
                .glass-gold { background: rgba(212, 175, 55, 0.05); backdrop-filter: blur(10px); border: 1px solid rgba(212, 175, 55, 0.2); }
                .card-3d-wrap { perspective: 1000px; }
                .card-3d { transition: transform 0.5s ease; transform-style: preserve-3d; }
                .card-3d-wrap:hover .card-3d { transform: translateY(-10px) rotateX(5deg) rotateY(-5deg); }
                .cursor-hover { width: 60px !important; height: 60px !important; background-color: rgba(212, 175, 55, 0.1) !important; border-color: #D4AF37 !important; }
                .noise::before { content: ""; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; pointer-events: none; z-index: 9997; opacity: 0.03; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"); }
                ::-webkit-scrollbar { width: 8px; }
                ::-webkit-scrollbar-track { background: #0A0A0A; }
                ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
                ::-webkit-scrollbar-thumb:hover { background: #D4AF37; }
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob { animation: blob 7s infinite; }
            `}} />

            {/* Custom Cursor */}
            <div ref={cursorDotRef} className="hidden md:block w-2 h-2 bg-[#D4AF37] fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full z-[9999] pointer-events-none"></div>
            <div ref={cursorOutlineRef} className="hidden md:block w-10 h-10 border-2 border-[#D4AF37]/50 fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full z-[9998] pointer-events-none transition-[width,height,background-color] duration-200"></div>

            {/* Ambient Background Glows */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#D4AF37]/10 rounded-full blur-[120px] animate-blob"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[100px] animate-blob" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Navigation */}
            <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass shadow-lg py-2' : 'py-4'}`}>
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <a href="#home" className="font-heading text-2xl font-bold tracking-tighter hover-target">
                        D<span className="text-[#D4AF37]">R.</span>
                    </a>
                    
                    <div className="hidden md:flex items-center space-x-8 glass px-8 py-3 rounded-full">
                        <a href="#about" className="text-sm uppercase tracking-widest text-gray-400 hover:text-[#D4AF37] transition-colors">About</a>
                        <a href="#services" className="text-sm uppercase tracking-widest text-gray-400 hover:text-[#D4AF37] transition-colors">Services</a>
                        <a href="#work" className="text-sm uppercase tracking-widest text-gray-400 hover:text-[#D4AF37] transition-colors">Work</a>
                        <a href="#process" className="text-sm uppercase tracking-widest text-gray-400 hover:text-[#D4AF37] transition-colors">Process</a>
                    </div>

                    <a href="mailto:daniellarose@gmail.com" className="hidden md:inline-flex items-center justify-center px-6 py-3 border border-[#D4AF37] text-[#D4AF37] rounded-full hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-all duration-300 font-medium group">
                        Let's Talk
                        <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
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
                    <a href="mailto:daniellarose@gmail.com" onClick={() => setMobileMenuOpen(false)} className="mt-8 px-8 py-3 bg-[#D4AF37] text-[#0A0A0A] rounded-full font-medium">Let's Talk</a>
                </div>
            )}

            {/* Hero Section */}
            <section id="home" className="relative min-h-screen flex items-center justify-center pt-20">
                <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="text-left space-y-6">
                        <RevealDiv delay={0}>
                            <div className="inline-block px-4 py-1.5 rounded-full glass-gold text-[#D4AF37] text-sm font-medium tracking-wide mb-4 flex items-center w-fit">
                                <span className="w-2 h-2 rounded-full bg-[#D4AF37] mr-2 animate-pulse"></span>
                                Available for freelance projects
                            </div>
                        </RevealDiv>
                        
                        <RevealDiv delay={100}>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold leading-[1.1] tracking-tight">
                                Shaping <br />
                                <span className="text-gradient italic pr-2">Reality</span> <br />
                                in 3D.
                            </h1>
                        </RevealDiv>
                        
                        <RevealDiv delay={200}>
                            <p className="text-lg md:text-xl text-gray-400 max-w-lg font-light leading-relaxed">
                                I'm Daniella Rose, crafting high-end, photorealistic 3D renders that breathe life into your concepts and elevate your brand visual identity.
                            </p>
                        </RevealDiv>
                        
                        <RevealDiv delay={300}>
                            <div className="flex flex-wrap gap-4 pt-6">
                                <a href="#work" className="px-8 py-4 bg-white text-[#0A0A0A] rounded-full font-medium hover:bg-[#D4AF37] hover:text-white transition-all duration-300">
                                    View Projects
                                </a>
                                <a href="mailto:daniellarose@gmail.com" className="px-8 py-4 border border-white/20 rounded-full font-medium hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300 flex items-center">
                                    Contact Me <Send size={16} className="ml-2" />
                                </a>
                            </div>
                        </RevealDiv>
                    </div>

                    <RevealDiv delay={200} className="relative h-[400px] md:h-[600px] w-full flex items-center justify-center">
                        <div className="absolute w-[300px] h-[300px] md:w-[450px] md:h-[450px] border border-white/10 rounded-full flex items-center justify-center animate-[spin_20s_linear_infinite]">
                            <div className="w-full h-full border border-[#D4AF37]/20 rounded-full absolute top-4 left-4"></div>
                        </div>
                        
                        <div className="relative w-64 h-64 md:w-80 md:h-80 glass rounded-2xl border-t border-l border-white/20 shadow-2xl flex items-center justify-center overflow-hidden animate-[bounce_4s_infinite]">
                            <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" alt="3D Abstract Art" className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent"></div>
                            <span className="relative z-10 font-heading text-xl font-bold tracking-widest text-white/50 uppercase">Daniella Rose</span>
                        </div>
                        
                        <div className="absolute top-20 right-10 w-16 h-16 bg-[#D4AF37]/10 rounded-full blur-xl animate-pulse"></div>
                        <div className="absolute bottom-20 left-10 w-24 h-24 bg-white/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                    </RevealDiv>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-24 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <RevealDiv className="lg:col-span-5 relative">
                            <div className="aspect-[4/5] rounded-2xl overflow-hidden glass p-2">
                                <img src="https://images.unsplash.com/photo-1616423640778-28d1b53229bd?q=80&w=2000&auto=format&fit=crop" alt="Daniella Rose Studio" className="w-full h-full object-cover rounded-xl filter grayscale hover:grayscale-0 transition-all duration-700" />
                            </div>
                            <div className="absolute -bottom-6 -right-6 glass-gold p-6 rounded-2xl text-center">
                                <h3 className="text-4xl font-heading font-bold text-[#D4AF37] mb-1">5+</h3>
                                <p className="text-xs uppercase tracking-widest text-gray-400">Years<br />Experience</p>
                            </div>
                        </RevealDiv>

                        <RevealDiv className="lg:col-span-7 lg:pl-12 space-y-8" delay={200}>
                            <div>
                                <h2 className="text-sm uppercase tracking-widest text-[#D4AF37] mb-2">The Artist</h2>
                                <h3 className="text-4xl md:text-5xl font-heading font-bold mb-6">Bridging imagination with visual perfection.</h3>
                            </div>
                            
                            <div className="space-y-4 text-gray-300 font-light text-lg">
                                <p>
                                    Hello, I'm Daniella. I specialize in translating complex ideas into stunning, photorealistic 3D renders. My background in design allows me to not just render an object, but to tell its story through lighting, texture, and composition.
                                </p>
                                <p>
                                    Whether it's architectural visualization, product mockups, or abstract brand assets, my goal is to create visuals that don't just look real—they feel premium.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
                                <div>
                                    <h4 className="font-heading font-semibold text-xl mb-2 text-white">Clients</h4>
                                    <p className="text-gray-400">Agencies, Startups, Design Studios, Brands</p>
                                </div>
                                <div>
                                    <h4 className="font-heading font-semibold text-xl mb-2 text-white">Tools</h4>
                                    <p className="text-gray-400">Blender, Cinema 4D, Octane, Redshift</p>
                                </div>
                            </div>
                        </RevealDiv>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-24 relative bg-[#141414]/50">
                <div className="max-w-7xl mx-auto px-6">
                    <RevealDiv className="text-center mb-16">
                        <h2 className="text-sm uppercase tracking-widest text-[#D4AF37] mb-2">Expertise</h2>
                        <h3 className="text-4xl md:text-5xl font-heading font-bold">Services & Capabilities</h3>
                    </RevealDiv>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <RevealDiv delay={0} className="glass p-8 rounded-2xl card-3d-wrap group">
                            <div className="card-3d h-full flex flex-col">
                                <div className="w-14 h-14 rounded-full glass-gold flex items-center justify-center mb-6 text-[#D4AF37] group-hover:scale-110 transition-transform">
                                    <Box size={24} />
                                </div>
                                <h4 className="text-2xl font-heading font-bold mb-4">Product Rendering</h4>
                                <p className="text-gray-400 font-light mb-6 flex-grow">
                                    Photorealistic 3D visuals for products. Perfect for e-commerce, marketing campaigns, and pre-manufacturing visualization.
                                </p>
                                <ul className="space-y-2 text-sm text-gray-500 mt-auto">
                                    <li className="flex items-center"><Star size={12} className="text-[#D4AF37] mr-2 fill-current" /> Studio Lighting Setup</li>
                                    <li className="flex items-center"><Star size={12} className="text-[#D4AF37] mr-2 fill-current" /> Material & Texture Creation</li>
                                    <li className="flex items-center"><Star size={12} className="text-[#D4AF37] mr-2 fill-current" /> 360° Turnarounds</li>
                                </ul>
                            </div>
                        </RevealDiv>

                        <RevealDiv delay={100} className="glass p-8 rounded-2xl card-3d-wrap group">
                            <div className="card-3d h-full flex flex-col">
                                <div className="w-14 h-14 rounded-full glass-gold flex items-center justify-center mb-6 text-[#D4AF37] group-hover:scale-110 transition-transform">
                                    <Building2 size={24} />
                                </div>
                                <h4 className="text-2xl font-heading font-bold mb-4">Architectural Viz</h4>
                                <p className="text-gray-400 font-light mb-6 flex-grow">
                                    Immersive interior and exterior renders that bring architectural plans to life with stunning realism and atmosphere.
                                </p>
                                <ul className="space-y-2 text-sm text-gray-500 mt-auto">
                                    <li className="flex items-center"><Star size={12} className="text-[#D4AF37] mr-2 fill-current" /> Interior/Exterior Renders</li>
                                    <li className="flex items-center"><Star size={12} className="text-[#D4AF37] mr-2 fill-current" /> Atmospheric Lighting</li>
                                    <li className="flex items-center"><Star size={12} className="text-[#D4AF37] mr-2 fill-current" /> Environmental Context</li>
                                </ul>
                            </div>
                        </RevealDiv>

                        <RevealDiv delay={200} className="glass p-8 rounded-2xl card-3d-wrap group">
                            <div className="card-3d h-full flex flex-col">
                                <div className="w-14 h-14 rounded-full glass-gold flex items-center justify-center mb-6 text-[#D4AF37] group-hover:scale-110 transition-transform">
                                    <Sparkles size={24} />
                                </div>
                                <h4 className="text-2xl font-heading font-bold mb-4">Abstract Art & Motion</h4>
                                <p className="text-gray-400 font-light mb-6 flex-grow">
                                    Creative 3D assets and loopable animations for brand identities, websites, and social media content.
                                </p>
                                <ul className="space-y-2 text-sm text-gray-500 mt-auto">
                                    <li className="flex items-center"><Star size={12} className="text-[#D4AF37] mr-2 fill-current" /> Brand Assets</li>
                                    <li className="flex items-center"><Star size={12} className="text-[#D4AF37] mr-2 fill-current" /> Loopable Animations</li>
                                    <li className="flex items-center"><Star size={12} className="text-[#D4AF37] mr-2 fill-current" /> Concept Exploration</li>
                                </ul>
                            </div>
                        </RevealDiv>
                    </div>
                </div>
            </section>

            {/* Selected Work Section */}
            <section id="work" className="py-24 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <RevealDiv className="flex flex-col md:flex-row justify-between items-end mb-16">
                        <div>
                            <h2 className="text-sm uppercase tracking-widest text-[#D4AF37] mb-2">Portfolio</h2>
                            <h3 className="text-4xl md:text-5xl font-heading font-bold">Selected Works</h3>
                        </div>
                        <a href="#work" className="hidden md:inline-flex items-center text-gray-400 hover:text-[#D4AF37] transition-colors mt-4 md:mt-0">
                            View all projects <ArrowRight size={16} className="ml-2" />
                        </a>
                    </RevealDiv>

                    <div className="space-y-20">
                        {/* Project 1 */}
                        <RevealDiv className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                            <div className="lg:col-span-7 order-2 lg:order-1 relative group overflow-hidden rounded-2xl">
                                <div className="aspect-[16/10] bg-[#141414]">
                                    <img src="https://images.unsplash.com/photo-1616422285623-13899f8d5f30?q=80&w=2000&auto=format&fit=crop" alt="Project 1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                </div>
                                <div className="absolute inset-0 bg-[#0A0A0A]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <a href="#work" className="w-16 h-16 rounded-full bg-[#D4AF37] text-[#0A0A0A] flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                                        <Eye size={24} />
                                    </a>
                                </div>
                            </div>
                            <div className="lg:col-span-5 order-1 lg:order-2 lg:pl-8">
                                <span className="text-[#D4AF37] text-sm font-medium mb-2 block">Product Rendering</span>
                                <h4 className="text-3xl font-heading font-bold mb-4">Aura Fragrance</h4>
                                <p className="text-gray-400 font-light mb-6">Photorealistic studio rendering campaign for a luxury perfume brand, focusing on glass caustics and premium lighting.</p>
                                <div className="flex gap-3">
                                    <span className="px-3 py-1 rounded-full border border-white/10 text-xs text-gray-300">Cinema 4D</span>
                                    <span className="px-3 py-1 rounded-full border border-white/10 text-xs text-gray-300">Octane</span>
                                </div>
                            </div>
                        </RevealDiv>

                        {/* Project 2 */}
                        <RevealDiv className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                            <div className="lg:col-span-5 pr-0 lg:pr-8 text-left lg:text-right">
                                <span className="text-[#D4AF37] text-sm font-medium mb-2 block">Architectural Viz</span>
                                <h4 className="text-3xl font-heading font-bold mb-4">The Zenith Residence</h4>
                                <p className="text-gray-400 font-light mb-6">Atmospheric interior rendering for a modern minimalist residential project, highlighting natural light and material textures.</p>
                                <div className="flex gap-3 lg:justify-end">
                                    <span className="px-3 py-1 rounded-full border border-white/10 text-xs text-gray-300">Blender</span>
                                    <span className="px-3 py-1 rounded-full border border-white/10 text-xs text-gray-300">Cycles</span>
                                </div>
                            </div>
                            <div className="lg:col-span-7 relative group overflow-hidden rounded-2xl">
                                <div className="aspect-[16/10] bg-[#141414]">
                                    <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop" alt="Project 2" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                </div>
                                <div className="absolute inset-0 bg-[#0A0A0A]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <a href="#work" className="w-16 h-16 rounded-full bg-[#D4AF37] text-[#0A0A0A] flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                                        <Eye size={24} />
                                    </a>
                                </div>
                            </div>
                        </RevealDiv>
                    </div>
                </div>
            </section>

            {/* Why Me & Process */}
            <section id="process" className="py-24 relative bg-[#141414]/30 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
                    
                    <RevealDiv>
                        <h2 className="text-sm uppercase tracking-widest text-[#D4AF37] mb-2">The Difference</h2>
                        <h3 className="text-3xl md:text-4xl font-heading font-bold mb-8">Why collaborate with me?</h3>
                        
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="mt-1 text-[#D4AF37]"><Star size={20} /></div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">Uncompromising Quality</h4>
                                    <p className="text-gray-400 font-light">I don't settle for 'good enough'. Every texture, lighting setup, and composition is meticulously crafted to ensure a premium, photorealistic final result.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="mt-1 text-[#D4AF37]"><Clock size={20} /></div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">Reliable Communication</h4>
                                    <p className="text-gray-400 font-light">No disappearing acts. You'll receive regular updates and work-in-progress shots so you are always in the loop.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="mt-1 text-[#D4AF37]"><Target size={20} /></div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">Design-Led Approach</h4>
                                    <p className="text-gray-400 font-light">Coming from a design background, I understand the 'why' behind the visuals, ensuring the renders align perfectly with your brand's strategy.</p>
                                </div>
                            </div>
                        </div>
                    </RevealDiv>

                    <RevealDiv delay={200}>
                        <h2 className="text-sm uppercase tracking-widest text-[#D4AF37] mb-2">Workflow</h2>
                        <h3 className="text-3xl md:text-4xl font-heading font-bold mb-8">My Process</h3>
                        
                        <div className="relative border-l border-white/10 ml-3 md:ml-4 space-y-8 pb-4">
                            <div className="relative pl-8">
                                <div className="absolute -left-3 top-1 w-6 h-6 rounded-full bg-[#0A0A0A] border-2 border-[#D4AF37] flex items-center justify-center">
                                    <span className="w-2 h-2 bg-[#D4AF37] rounded-full"></span>
                                </div>
                                <h4 className="text-xl font-bold mb-2">1. Discovery & Briefing</h4>
                                <p className="text-gray-400 font-light text-sm">We discuss your goals, references, and requirements to ensure we are aligned on the vision before starting.</p>
                            </div>
                            <div className="relative pl-8">
                                <div className="absolute -left-3 top-1 w-6 h-6 rounded-full bg-[#0A0A0A] border-2 border-gray-600 flex items-center justify-center"></div>
                                <h4 className="text-xl font-bold mb-2">2. Clay Render & Composition</h4>
                                <p className="text-gray-400 font-light text-sm">I create untextured, basic lighting setups (clay renders) to lock in the camera angles and overall composition.</p>
                            </div>
                            <div className="relative pl-8">
                                <div className="absolute -left-3 top-1 w-6 h-6 rounded-full bg-[#0A0A0A] border-2 border-gray-600 flex items-center justify-center"></div>
                                <h4 className="text-xl font-bold mb-2">3. Materials & Lighting</h4>
                                <p className="text-gray-400 font-light text-sm">Once approved, I apply high-res textures, perfect the lighting, and send near-final previews for feedback.</p>
                            </div>
                            <div className="relative pl-8">
                                <div className="absolute -left-3 top-1 w-6 h-6 rounded-full bg-[#0A0A0A] border-2 border-gray-600 flex items-center justify-center"></div>
                                <h4 className="text-xl font-bold mb-2">4. Final Delivery</h4>
                                <p className="text-gray-400 font-light text-sm">After final adjustments and high-resolution rendering, you receive the polished, ready-to-use assets.</p>
                            </div>
                        </div>
                    </RevealDiv>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <RevealDiv className="text-center mb-16">
                        <h2 className="text-sm uppercase tracking-widest text-[#D4AF37] mb-2">Words from Clients</h2>
                        <h3 className="text-4xl md:text-5xl font-heading font-bold">Testimonials</h3>
                    </RevealDiv>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <RevealDiv className="glass p-8 rounded-2xl relative">
                            <div className="flex text-[#D4AF37] text-sm mb-4">
                                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-current mr-1" />)}
                            </div>
                            <p className="text-lg text-gray-300 font-light italic mb-6">"Daniella's attention to detail is unmatched. She took our basic CAD files and turned them into stunning, photorealistic marketing assets that elevated our entire launch campaign."</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-xl font-bold">M</div>
                                <div>
                                    <h5 className="font-bold">Marcus Chen</h5>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Creative Director, Form Studio</p>
                                </div>
                            </div>
                        </RevealDiv>

                        <RevealDiv delay={100} className="glass p-8 rounded-2xl relative">
                            <div className="flex text-[#D4AF37] text-sm mb-4">
                                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-current mr-1" />)}
                            </div>
                            <p className="text-lg text-gray-300 font-light italic mb-6">"Working with Daniella was seamless. Her understanding of lighting and composition made our interior designs look incredibly realistic before construction even began. Highly recommended."</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-xl font-bold">S</div>
                                <div>
                                    <h5 className="font-bold">Sarah Jenkins</h5>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Lead Architect, Nova Arch</p>
                                </div>
                            </div>
                        </RevealDiv>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 relative bg-[#141414]/30">
                <div className="max-w-3xl mx-auto px-6">
                    <RevealDiv className="text-center mb-16">
                        <h2 className="text-sm uppercase tracking-widest text-[#D4AF37] mb-2">Answers</h2>
                        <h3 className="text-3xl md:text-4xl font-heading font-bold">Frequently Asked Questions</h3>
                    </RevealDiv>

                    <div className="space-y-4">
                        {[
                            { q: "What files do you need to start?", a: "Ideally, I need CAD files (STEP, IGES, OBJ) or detailed blueprints/sketches. If you don't have 3D models, I can create them from reference images and dimensions for an additional modeling fee." },
                            { q: "How long does a project take?", a: "Turnaround times vary based on complexity. A standard product render might take 3-5 days, while a complex architectural scene could take 1-2 weeks. We will agree on a timeline before starting." },
                            { q: "Do you offer revisions?", a: "Yes, standard projects include 2 rounds of revisions during the 'Clay Render' and 'Lighting/Materials' stages to ensure the final output matches your vision exactly." }
                        ].map((faq, index) => (
                            <RevealDiv key={index} delay={index * 100} className="glass rounded-xl overflow-hidden">
                                <button 
                                    onClick={() => toggleFaq(index)}
                                    className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                                >
                                    <span className="font-bold text-lg">{faq.q}</span>
                                    <Plus className={`text-[#D4AF37] transition-transform duration-300 ${activeFaq === index ? 'rotate-45' : ''}`} />
                                </button>
                                <div className={`px-6 text-gray-400 font-light overflow-hidden transition-all duration-300 ${activeFaq === index ? 'max-h-40 pb-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    {faq.a}
                                </div>
                            </RevealDiv>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA & Footer */}
            <footer className="relative pt-32 pb-12 overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-[#B08D1E]/20 to-transparent -z-10"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#D4AF37]/20 rounded-full blur-[150px] pointer-events-none"></div>

                <RevealDiv className="max-w-5xl mx-auto px-6 text-center relative z-10">
                    <h2 className="text-5xl md:text-7xl font-heading font-bold mb-6 tracking-tight">Have a project in mind?</h2>
                    <p className="text-xl text-gray-400 mb-10 font-light max-w-2xl mx-auto">Let's collaborate to create stunning 3D visuals that elevate your brand.</p>
                    
                    <a href="mailto:daniellarose@gmail.com" className="inline-flex items-center justify-center px-10 py-5 bg-[#D4AF37] text-[#0A0A0A] rounded-full text-lg font-bold hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)]">
                        Contact Me <Send className="ml-3" size={20} />
                    </a>

                    <div className="mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-500">© 2026 Daniella Rose. All rights reserved.</p>
                        <div className="flex space-x-6 text-gray-400">
                            <a href="#" className="hover:text-[#D4AF37] transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="hover:text-[#D4AF37] transition-colors"><Dribbble size={20} /></a>
                            <a href="#" className="hover:text-[#D4AF37] transition-colors"><Linkedin size={20} /></a>
                        </div>
                    </div>
                </RevealDiv>
            </footer>
        </div>
    );
}
