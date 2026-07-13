import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { parseMarkdown } from '../utils/markdown';
import { marked } from 'marked';
import markedKatex from 'marked-katex-extension';
import DOMPurify from 'dompurify';
import 'katex/dist/katex.min.css';

// Initialize Marked with LaTeX support
marked.use(markedKatex({ throwOnError: false }));

const postFiles = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default', eager: true });

const Post = () => {
  const { slug } = useParams();
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const matchingPath = Object.keys(postFiles).find(path => path.includes(`/${slug}.md`));
    
    if (matchingPath) {
      const rawMarkdown = postFiles[matchingPath];
      setPostData(parseMarkdown(rawMarkdown));
    }
  }, [slug]);

  if (!postData) {
    return (
      <div className="min-h-screen flex flex-col py-16 px-6 sm:px-12 text-gruvbox-fg max-w-3xl mx-auto">
        <div className="space-x-1.5 font-bold mb-6 whitespace-nowrap overflow-x-auto pb-1 text-xs sm:text-sm md:text-base">
          <span className="text-gruvbox-green">lilith@hayyaoe</span>
          <span className="text-gruvbox-blue">~</span>
          <span className="text-gruvbox-gray">%</span>
          <span className="text-gruvbox-red ml-2">cat posts/{slug}.md</span>
          <br/>
          <span className="text-gruvbox-red">cat: posts/{slug}.md: No such file or directory</span>
        </div>
        <Link to="/" className="text-gruvbox-yellow hover:underline">[ Return to root ]</Link>
      </div>
    );
  }

  // Parse markdown to HTML securely
  const htmlContent = DOMPurify.sanitize(marked.parse(postData.content || ''), {
    ADD_TAGS: ['math', 'mrow', 'mi', 'mn', 'mo', 'ms', 'mspace', 'mtext', 'menclose', 'merror', 'mphantom', 'mpadded', 'mroot', 'msqrt', 'mfrac', 'msub', 'msup', 'msubsup', 'munderover', 'mmultiscripts', 'mspan', 'annotation'],
    ADD_ATTR: ['mathvariant', 'mathcolor', 'mathbackground', 'mathsize', 'open', 'close', 'separators', 'stretchy', 'symmetric', 'largeop', 'movablelimits', 'accent', 'lspace', 'rspace', 'notation', 'dir', 'href', 'class', 'style']
  });

  return (
    <div className="min-h-screen flex flex-col py-16 px-6 sm:px-12 text-gruvbox-fg max-w-3xl mx-auto">
      <header className="space-y-6 pb-10 border-b border-gruvbox-bg2 mb-10">
        <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm md:text-base whitespace-nowrap overflow-x-auto pb-1">
          <div className="space-x-1.5 font-bold">
            <span className="text-gruvbox-green">lilith@hayyaoe</span>
            <span className="text-gruvbox-blue">~</span>
            <span className="text-gruvbox-gray">%</span>
          </div>
          <span className="text-gruvbox-yellow">cat posts/{slug}.md</span>
        </div>
        <div>
          <Link to="/" className="text-gruvbox-gray hover:text-gruvbox-yellow transition-colors hover:underline text-sm uppercase tracking-widest">
            [ cd .. ]
          </Link>
        </div>
      </header>
      
      <article 
        className="w-full break-words pb-20 
          [&_h1]:text-3xl [&_h1]:md:text-4xl [&_h1]:font-bold [&_h1]:text-gruvbox-green [&_h1]:mb-6 [&_h1]:mt-10 
          [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-bold [&_h2]:text-gruvbox-green [&_h2]:mb-4 [&_h2]:mt-8 
          [&_h3]:text-xl [&_h3]:md:text-2xl [&_h3]:font-bold [&_h3]:text-gruvbox-green [&_h3]:mb-3 [&_h3]:mt-6 
          [&_h4]:text-lg [&_h4]:font-bold [&_h4]:text-gruvbox-green [&_h4]:mb-3 [&_h4]:mt-4 
          [&_p]:text-gruvbox-fg/90 [&_p]:mb-5 [&_p]:leading-relaxed 
          [&_a]:text-gruvbox-blue hover:[&_a]:text-gruvbox-aqua [&_a]:underline [&_a]:break-words
          [&_strong]:text-gruvbox-fg [&_strong]:font-bold
          [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5 [&_li]:mb-1
          [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-5
          [&_pre]:bg-gruvbox-bg2 [&_pre]:border [&_pre]:border-gruvbox-gray [&_pre]:p-4 [&_pre]:mb-6 [&_pre]:whitespace-pre-wrap [&_pre]:break-words [&_pre]:w-full
          [&_code]:text-gruvbox-orange [&_code]:bg-gruvbox-bg2 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:break-words
          [&_blockquote]:border-l-4 [&_blockquote]:border-gruvbox-gray [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gruvbox-gray [&_blockquote]:mb-5
          [&_hr]:border-gruvbox-bg2 [&_hr]:my-8
          [&_img]:max-w-full [&_img]:h-auto [&_img]:block [&_img]:rounded-md [&_img]:border [&_img]:border-gruvbox-gray [&_img]:my-6
          [&_.katex-display]:overflow-x-auto [&_.katex-display]:overflow-y-hidden [&_.katex-display]:py-2 [&_.katex-display]:max-w-full"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

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
    </div>
  );
};

export default Post;
