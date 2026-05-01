import { useParams } from 'react-router-dom';
import Button from '../../components/Button';
import articles from '../../assets/article-content';
import articleOrigin from '../assets/images/article-origin.jpg';
import articleGoblin from '../assets/images/article-goblin.jpg';
import articleWebshooters from '../assets/images/article-webshooters.jpg';
import articleMiles from '../assets/images/article-miles.jpg';
import crawl from '../assets/images/crawl.jpg';

// Map article names to their images
const articleImages = {
  'the-radioactive-bite': articleOrigin,
  'the-green-goblin-rises': articleGoblin,
  'building-the-web-shooters': articleWebshooters,
  'miles-morales-the-legacy': articleMiles,
  'the-symbiote-saga': crawl,
};

function ArticleDetailPage() {
  const { name } = useParams();
  const article = articles.find((article) => article.name === name);

  // Article not found
  if (!article) {
    return (
      <div className="flex w-full flex-col gap-0 bg-[#0a0a0a] text-white">
        <section className="border-b border-[#FF2020]/20 px-4 sm:px-6 lg:px-8 py-16">
          <div className="mx-auto w-full max-w-3xl">
            <h1 className="text-3xl font-black uppercase text-white">
              Article not found
            </h1>
            <Button to="/articles" className="mt-6">Back to Articles</Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-0 bg-[#0a0a0a] text-white">

      {/* ─── HEADER ───────────────────────────── */}
      <section className="border-b border-[#FF2020]/20 px-4 sm:px-6 lg:px-8 py-10">
        <div className="mx-auto w-full max-w-3xl">
          <div className="mb-4">
            <Button to="/articles">← Back to Articles</Button>
          </div>

          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.4em] text-[#FF2020]">
            Article
          </p>

          <h1 className="text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
            {article.title}
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            {article.name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </p>
        </div>
      </section>

      {/* ─── CONTENT ──────────────────────────── */}
      <section className="border-b border-[#FF2020]/20 px-4 sm:px-6 lg:px-8 py-14">
        <div className="mx-auto w-full max-w-3xl">

          {/* Article Image */}
          <div className="mb-8 flex aspect-[4/3] items-center justify-center rounded-2xl border border-[#FF2020]/20 bg-[#111] overflow-hidden">
            <img
              src={articleImages[article.name] || crawl}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article body */}
          <div className="space-y-5">
            {article.content.map((paragraph, index) => (
              <p
                key={index}
                className="text-base leading-7 text-zinc-400 whitespace-pre-wrap"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-10 border-t border-[#FF2020]/20 pt-6">
            <Button to="/articles">← Back to Articles</Button>
          </div>

        </div>
      </section>

    </div>
  );
}

export default ArticleDetailPage;