import Button from '../../components/Button';
import ArticleList from '../../components/ArticleList';
import articles from '../../assets/article-content.js';

const ArticleListPage = () => {
  return (
    <div className="flex w-full flex-col bg-[#0a0a0a] text-white">

      <section className="px-6 py-20">
        <div className="mx-auto w-full max-w-6xl">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.5em] text-[#FF2020]">
            The Daily Bugle Archives
          </p>
          <h1 className="max-w-2xl text-5xl font-black uppercase leading-tight text-white sm:text-6xl">
            Spider-Man:<br />
            <span className="text-[#FF2020]">The Full Story</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-8 text-zinc-400">
            From the radioactive bite that started it all to the battles that
            defined a generation. J. Jonah Jameson won't print these. We will.
          </p>
          <div className="mt-8">
            <Button to="/">Back Home</Button>
          </div>
        </div>
      </section>

      <section className="bg-[#0f0f0f] px-6 py-20">
        <div className="mx-auto w-full max-w-6xl">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.5em] text-[#FF2020]">
            Featured Stories
          </p>
          <h2 className="mb-12 text-4xl font-black uppercase text-white">
            Latest Articles
          </h2>
          <ArticleList articles={articles} />
        </div>
      </section>

    </div>
  );
};

export default ArticleListPage;