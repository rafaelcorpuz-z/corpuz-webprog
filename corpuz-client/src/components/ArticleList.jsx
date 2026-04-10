import { Link } from 'react-router-dom';
import Button from './Button';

// Map article names to their images
const articleImages = {
  'the-radioactive-bite': '../assets/images/article-origin.jpg',
  'the-green-goblin-rises': '../assets/images/article-goblin.jpg',
  'building-the-web-shooters': '../assets/images/article-webshooters.jpg',
  'miles-morales-the-legacy': '../assets/images/article-miles.jpg',
  'the-symbiote-saga': '../assets/images/crawl.jpg', // fallback image
};

function ArticleList({ articles }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {articles.map((article, index) => (
        <article
          key={article.name}
          className="group flex flex-col rounded-2xl border border-[#FF2020]/20 bg-[#111] overflow-hidden transition hover:border-[#FF2020]/60 hover:bg-[#1a0000]"
        >
          {/* Article Image */}
          <div className="flex h-44 items-center justify-center border-b border-[#FF2020]/10 bg-[#0a0a0a] overflow-hidden">
            <img
              src={articleImages[article.name] || '../assets/images/crawl.jpg'}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col flex-1 p-5">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.24em] text-[#FF2020]">
              Article {String(index + 1).padStart(2, '0')}
            </p>

            <h3 className="text-base font-black uppercase text-white group-hover:text-[#FF2020] transition-colors leading-tight">
              {article.title}
            </h3>

            <p className="mt-3 flex-1 text-sm leading-6 text-zinc-400">
              {article.content[0].substring(0, 150)}...
            </p>

            <Link to={`/articles/${article.name}`}>
              <Button className="mt-4">Read More</Button>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

export default ArticleList;