import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import Button from './Button';
import articleOrigin from '../assets/images/article-origin.jpg';
import articleGoblin from '../assets/images/article-goblin.jpg';
import articleWebshooters from '../assets/images/article-webshooters.jpg';
import articleMiles from '../assets/images/article-miles.jpg';
import crawl from '../assets/images/crawl.jpg';

const articleImages = {
  'the-radioactive-bite': articleOrigin,
  'the-green-goblin-rises': articleGoblin,
  'building-the-web-shooters': articleWebshooters,
  'miles-morales-the-legacy': articleMiles,
  'the-symbiote-saga': crawl,
};

const VISIBLE = 3;

function ArticleList({ articles }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliding, setSliding] = useState(false);
  const trackRef = useRef(null);

  const canPrev = currentIndex > 0;
  const canNext = currentIndex + VISIBLE < articles.length;

  const slideTo = (newIndex, dir) => {
    if (sliding) return;
    setSliding(true);

    const track = trackRef.current;
    const cardWidth = track.offsetWidth / VISIBLE;

    // Instantly move track off screen in the coming direction (no transition)
    track.style.transition = 'none';
    track.style.transform = dir === 'left'
      ? `translateX(${cardWidth}px)`   // new cards come from right
      : `translateX(-${cardWidth}px)`; // new cards come from left

    // Update index so new cards render
    setCurrentIndex(newIndex);

    // Force reflow
    track.getBoundingClientRect();

    // Slide to center smoothly
    track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    track.style.transform = 'translateX(0px)';

    setTimeout(() => setSliding(false), 500);
  };

  const handlePrev = () => { if (canPrev) slideTo(currentIndex - 1, 'right'); };
  const handleNext = () => { if (canNext) slideTo(currentIndex + 1, 'left'); };

  const handleDot = (i) => {
    const newIndex = Math.min(i, articles.length - VISIBLE);
    if (newIndex === currentIndex || sliding) return;
    slideTo(newIndex, newIndex > currentIndex ? 'left' : 'right');
  };

  const visibleArticles = articles.slice(currentIndex, currentIndex + VISIBLE);

  return (
    <div className="relative">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-600">
          {currentIndex + 1}–{Math.min(currentIndex + VISIBLE, articles.length)} of {articles.length}
        </p>
        <div className="flex gap-3">
          <button
            onClick={handlePrev}
            disabled={!canPrev || sliding}
            className={`flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all duration-300
              ${canPrev && !sliding
                ? 'border-[#FF2020] text-[#FF2020] hover:bg-[#FF2020] hover:text-white hover:scale-110'
                : 'border-zinc-800 text-zinc-700 cursor-not-allowed opacity-40'
              }`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={handleNext}
            disabled={!canNext || sliding}
            className={`flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all duration-300
              ${canNext && !sliding
                ? 'border-[#FF2020] text-[#FF2020] hover:bg-[#FF2020] hover:text-white hover:scale-110'
                : 'border-zinc-800 text-zinc-700 cursor-not-allowed opacity-40'
              }`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Carousel Viewport */}
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="grid gap-6"
          style={{
            gridTemplateColumns: `repeat(${VISIBLE}, 1fr)`,
            willChange: 'transform',
          }}
        >
          {visibleArticles.map((article, index) => (
            <article
              key={article.name}
              className="group flex flex-col rounded-2xl border border-[#FF2020]/20 bg-[#111] overflow-hidden transition-colors duration-300 hover:border-[#FF2020]/60 hover:bg-[#1a0000]"
            >
              <div className="h-52 overflow-hidden">
                <img
                  src={articleImages[article.name] || crawl}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="flex flex-col flex-1 p-6">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF2020]">
                  Article {String(currentIndex + index + 1).padStart(2, '0')}
                </p>
                <h3 className="text-sm font-black uppercase text-white group-hover:text-[#FF2020] transition-colors duration-300 leading-snug">
                  {article.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-zinc-500">
                  {article.content[0].substring(0, 120)}...
                </p>
                <Link to={`/articles/${article.name}`} className="mt-5">
                  <Button>Read More</Button>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {articles.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDot(i)}
            className={`h-[3px] rounded-full transition-all duration-500 ${
              i >= currentIndex && i < currentIndex + VISIBLE
                ? 'w-8 bg-[#FF2020]'
                : 'w-3 bg-zinc-700 hover:bg-zinc-500'
            }`}
          />
        ))}
      </div>

    </div>
  );
}

export default ArticleList;