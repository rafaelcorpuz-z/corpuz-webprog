import Button from '../components/Button';
import ArticleList from '../components/ArticleList';
import articles from '../assets/article-content.js';

const ArticleListPage = () => {
  return (
    <div className="flex w-full flex-col gap-0 bg-[#0a0a0a] text-white">

      <section className="border-b border-[#FF2020]/20 px-4 sm:px-6 lg:px-8 py-16">
        <div className="mx-auto w-full max-w-6xl">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.4em] text-[#FF2020]">
            Articles
          </p>
          <h1 className="max-w-xl text-4xl font-black uppercase leading-tight text-white sm:text-5xl">
            Featured articles in a simple card grid
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-400 sm:text-base">
            A clean wireframe section for article thumbnails, titles, short
            descriptions, and one clear action per card.
          </p>
          <div className="mt-6">
            <Button to="/">Back Home</Button>
          </div>
        </div>
      </section>

      <section className="border-b border-[#FF2020]/20 bg-[#0f0f0f] px-4 sm:px-6 lg:px-8 py-14">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#FF2020]">
              Featured Articles
            </p>
            <h2 className="mt-2 text-3xl font-black uppercase text-white">
              Article card grid
            </h2>
          </div>
          <ArticleList articles={articles} />
        </div>
      </section>

    </div>
  );
};

export default ArticleListPage;