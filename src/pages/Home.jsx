import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { parseMarkdown } from "../utils/markdown";

const postFiles = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default', eager: true });
const posts = Object.keys(postFiles).map(path => {
  const slug = path.split('/').pop().replace('.md', '');
  const rawMarkdown = postFiles[path];
  const { meta } = parseMarkdown(rawMarkdown);
  return { slug, ...meta };
}).sort((a, b) => new Date(b.date) - new Date(a.date));

let hasPlayedIntroGlobal = false;

const Home = () => {
  const hasPlayedIntro = hasPlayedIntroGlobal;

  const [typedText, setTypedText] = useState(hasPlayedIntro ? "whoami" : "");
  const [typingComplete, setTypingComplete] = useState(hasPlayedIntro);
  const [showContent, setShowContent] = useState(hasPlayedIntro);
  const [visibleSections, setVisibleSections] = useState(hasPlayedIntro ? 6 : 0);
  const command = "whoami";

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    if (hasPlayedIntro) return;

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= command.length) {
        setTypedText(command.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setTypingComplete(true), 600);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    if (typingComplete && !hasPlayedIntro) {
      setTimeout(() => setShowContent(true), 700);
    }
  }, [typingComplete]);

  useEffect(() => {
    if (showContent && !hasPlayedIntro) {
      const interval = setInterval(() => {
        setVisibleSections((prev) => {
          if (prev >= 6) { // Increased to 6 for the new Thoughts section
            clearInterval(interval);
            hasPlayedIntroGlobal = true;
            return prev;
          }
          return prev + 1;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [showContent]);

  return (
    <div className="min-h-screen flex flex-col py-16 px-6 sm:px-12 text-gruvbox-fg max-w-3xl mx-auto">
      <div className="w-full space-y-20">
        
        {/* Header / Identity */}
        <header className={`space-y-6 pb-10 transition-all duration-700 ease-in-out ${!typingComplete ? "translate-y-[35vh]" : "translate-y-0"} ${showContent ? 'border-b border-gruvbox-bg2' : 'border-b border-transparent'}`}>
          <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm md:text-base whitespace-nowrap overflow-x-auto pb-1">
            <div className="space-x-1.5 font-bold">
              <span className="text-gruvbox-green">lilith@hayyaoe</span>
              <span className="text-gruvbox-blue">~</span>
              <span className="text-gruvbox-gray">%</span>
            </div>
            <span className="text-gruvbox-yellow">{typedText}</span>
            {!showContent && (
              <span className="w-2.5 h-5 bg-gruvbox-fg animate-blink inline-block align-middle ml-1"></span>
            )}
          </div>
          
          {visibleSections >= 1 && (
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gruvbox-fg mb-4 tracking-tight uppercase mt-6">Hayya U</h1>
              <div className="bg-gruvbox-bg2 inline-block px-2 sm:px-3 py-1 border border-gruvbox-gray mt-1">
                <p className="text-xs sm:text-sm md:text-base text-gruvbox-aqua whitespace-nowrap">Software Engineer & AI/ML Enthusiast</p>
              </div>
              <nav className="flex flex-wrap gap-6 text-sm text-gruvbox-gray uppercase tracking-widest mt-6">
                <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:text-gruvbox-yellow transition-colors hover:underline underline-offset-4">[ About ]</a>
                <a href="#experience" onClick={(e) => scrollToSection(e, 'experience')} className="hover:text-gruvbox-yellow transition-colors hover:underline underline-offset-4">[ Experience ]</a>
                <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="hover:text-gruvbox-yellow transition-colors hover:underline underline-offset-4">[ Projects ]</a>
                <a href="#thoughts" onClick={(e) => scrollToSection(e, 'thoughts')} className="hover:text-gruvbox-yellow transition-colors hover:underline underline-offset-4">[ Thoughts ]</a>
                <a href="#links" onClick={(e) => scrollToSection(e, 'links')} className="hover:text-gruvbox-yellow transition-colors hover:underline underline-offset-4">[ Links ]</a>
              </nav>
            </div>
          )}
        </header>

        <div className="space-y-20">
          {/* Bio */}
          {visibleSections >= 2 && (
            <section id="about" className="space-y-6">
              <div className="text-gruvbox-green text-xl font-bold"># ABOUT_ME</div>
              <p className="leading-relaxed text-gruvbox-fg/90 max-w-3xl">
                I design custom hardware, build open-source desktop configurations, and explore machine learning applications. Creator of Zenities, a project focused on Linux workflow convenience and aesthetics.
              </p>
            </section>
          )}

          {/* Experience */}
          {visibleSections >= 3 && (
            <section id="experience" className="space-y-6">
              <div className="text-gruvbox-green text-xl font-bold"># EXPERIENCE</div>
              <div className="space-y-8 pl-4 border-l-2 border-dashed border-gruvbox-bg2">
                
                <div className="relative">
                  <div className="absolute -left-[23px] top-1.5 w-2 h-2 bg-gruvbox-yellow rounded-full"></div>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                    <h3 className="text-lg font-bold text-gruvbox-fg">Apple Developer Institute Intern</h3>
                    <span className="text-gruvbox-gray text-sm font-bold">Apr 2026 - Present</span>
                  </div>
                  <p className="text-gruvbox-orange mt-1">@ Apple Developer Institute AI/ML</p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[23px] top-1.5 w-2 h-2 bg-gruvbox-yellow rounded-full"></div>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                    <h3 className="text-lg font-bold text-gruvbox-fg">Apple Developer Academy Intern</h3>
                    <span className="text-gruvbox-gray text-sm font-bold">Mar 2025 - Dec 2025</span>
                  </div>
                  <p className="text-gruvbox-orange mt-1">@ Apple Developer Academy CIP</p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[23px] top-1.5 w-2 h-2 bg-gruvbox-yellow rounded-full"></div>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                    <h3 className="text-lg font-bold text-gruvbox-fg">Lead, Google Developer Group on Campus</h3>
                    <span className="text-gruvbox-gray text-sm font-bold">Sep 2024 - Sep 2025</span>
                  </div>
                  <p className="text-gruvbox-orange mt-1">@ Universitas Ciputra</p>
                </div>

              </div>
            </section>
          )}

          {/* Selected Work */}
          {visibleSections >= 4 && (
            <section id="projects" className="space-y-6">
              <div className="text-gruvbox-green text-xl font-bold"># SELECTED_WORK</div>
              <div className="space-y-10 pl-5 md:pl-6">
                
                <article className="group relative">
                  <span className="absolute -left-5 md:-left-6 text-xl font-bold text-gruvbox-fg group-hover:text-gruvbox-yellow transition-colors select-none">{">"}</span>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-3">
                    <a href="https://github.com/hayyaoe/zenities" target="_blank" rel="noreferrer" className="text-xl font-bold text-gruvbox-fg group-hover:text-gruvbox-yellow transition-colors cursor-pointer">
                      zenities
                    </a>
                    <a href="https://github.com/hayyaoe/zenities" target="_blank" rel="noreferrer" className="text-gruvbox-bg bg-gruvbox-yellow hover:bg-gruvbox-orange transition-colors text-xs font-bold px-2 py-1 uppercase mt-2 md:mt-0 self-start md:self-auto">
                      Hyprland | Arch | Neovim
                    </a>
                  </div>
                  <p className="text-gruvbox-fg/80 leading-relaxed text-sm mb-2">
                    A comprehensive custom Hyprland window manager configuration for Arch Linux, featuring Eww widgets, Neovim setups, and custom ricing utilities.
                  </p>
                </article>

                <article className="group relative">
                  <span className="absolute -left-5 md:-left-6 text-xl font-bold text-gruvbox-fg group-hover:text-gruvbox-yellow transition-colors select-none">{">"}</span>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-3">
                    <a href="https://devpost.com/software/ecoceipt" target="_blank" rel="noreferrer" className="text-xl font-bold text-gruvbox-fg group-hover:text-gruvbox-yellow transition-colors cursor-pointer">
                      Ecoceipt
                    </a>
                    <a href="https://devpost.com/software/ecoceipt" target="_blank" rel="noreferrer" className="text-gruvbox-bg bg-gruvbox-aqua hover:bg-gruvbox-blue transition-colors text-xs font-bold px-2 py-1 uppercase mt-2 md:mt-0 self-start md:self-auto">
                      Garuda Hacks 6.0 Winner
                    </a>
                  </div>
                  <p className="text-gruvbox-fg/80 leading-relaxed text-sm mb-2">
                    AI-driven sustainability platform integrating OCR System and Gemini API to automate receipt data extraction and provide intelligent stock recommendations for MSMEs.
                  </p>
                </article>

                <article className="group relative">
                  <span className="absolute -left-5 md:-left-6 text-xl font-bold text-gruvbox-fg group-hover:text-gruvbox-yellow transition-colors select-none">{">"}</span>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-3">
                    <a href="https://doi.org/10.33395/sinkron.v10i1.15439" target="_blank" rel="noreferrer" className="text-xl font-bold text-gruvbox-fg group-hover:text-gruvbox-yellow transition-colors cursor-pointer">
                      Code Smell Detection Research
                    </a>
                    <a href="https://doi.org/10.33395/sinkron.v10i1.15439" target="_blank" rel="noreferrer" className="text-gruvbox-bg bg-gruvbox-purple hover:bg-gruvbox-red transition-colors text-xs font-bold px-2 py-1 uppercase mt-2 md:mt-0 self-start md:self-auto">
                      View DOI
                    </a>
                  </div>
                  <p className="text-gruvbox-fg/80 leading-relaxed text-sm mb-2">
                    Published comparative study evaluating machine learning algorithms (Random Forest, XGBoost) for multi-label code smell detection on a 107k+ sample dataset.
                  </p>
                </article>

              </div>
            </section>
          )}

          {/* Thoughts / Blog */}
          {visibleSections >= 5 && (
            <section id="thoughts" className="space-y-6">
              <div className="text-gruvbox-green text-xl font-bold"># THOUGHTS</div>
              <div className="space-y-6">
                {posts.map(post => (
                  <article key={post.slug} className="group border border-gruvbox-bg2 p-4 hover:border-gruvbox-gray transition-colors">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                      <Link to={`/post/${post.slug}`} className="text-lg font-bold text-gruvbox-fg group-hover:text-gruvbox-yellow transition-colors">
                        {post.title || post.slug}
                      </Link>
                      <span className="text-gruvbox-gray text-sm">{post.date || 'Unknown Date'}</span>
                    </div>
                    {post.description && (
                      <p className="text-gruvbox-fg/80 text-sm leading-relaxed">{post.description}</p>
                    )}
                    <div className="mt-3">
                      <Link to={`/post/${post.slug}`} className="text-gruvbox-aqua hover:text-gruvbox-blue text-sm uppercase tracking-widest font-bold transition-colors">
                        [ Read ]
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Links */}
          {visibleSections >= 6 && (
            <section id="links" className="space-y-6">
              <div className="text-gruvbox-green text-xl font-bold"># LINKS</div>
              <p className="leading-relaxed text-gruvbox-fg/90 max-w-3xl mb-4">
                I'm always open to discussing new projects, creative ideas, or opportunities.
              </p>
              <div className="flex flex-col space-y-3" onContextMenu={(e) => e.preventDefault()}>
                <a href="mailto:ishara@hayyaoe.dev" draggable="false" className="text-gruvbox-blue hover:text-gruvbox-aqua transition-colors w-max select-none">
                  {">"} Email: ishara@hayyaoe.dev
                </a>
                <a href="https://linkedin.com/in/hayyaoe" target="_blank" rel="noreferrer" draggable="false" className="text-gruvbox-blue hover:text-gruvbox-aqua transition-colors w-max select-none">
                  {">"} LinkedIn: linkedin.com/in/hayyaoe
                </a>
                <a href="https://github.com/hayyaoe" target="_blank" rel="noreferrer" draggable="false" className="text-gruvbox-blue hover:text-gruvbox-aqua transition-colors w-max select-none">
                  {">"} GitHub: github.com/hayyaoe
                </a>
              </div>
            </section>
          )}

          {/* Footer */}
          {visibleSections >= 6 && (
            <footer className="pt-10 border-t border-gruvbox-bg2 text-gruvbox-gray text-sm pb-10">
              <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm md:text-base whitespace-nowrap overflow-x-auto pb-1">
                <div className="space-x-1.5 font-bold">
                  <span className="text-gruvbox-green">lilith@hayyaoe</span>
                  <span className="text-gruvbox-blue">~</span>
                  <span className="text-gruvbox-gray">%</span>
                </div>
                <span className="text-gruvbox-fg animate-blink inline-block w-2.5 h-4 bg-gruvbox-fg align-middle"></span>
              </div>
            </footer>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
