import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button';
import { fetchArticleBySlug } from '../../services/ArticleService';

function ArticlePage() {
  const { name } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await fetchArticleBySlug(name);
        setArticle(data.article);
      } catch (err) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [name]);

  if (loading) {
    return (
      <div className="flex w-full flex-col bg-[#0a0a0a] text-white min-h-screen">
        <section className="px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <p className="text-zinc-500 text-sm uppercase tracking-widest">Loading…</p>
          </div>
        </section>
      </div>
    );
  }

  if (notFound || !article) {
    return (
      <div className="flex w-full flex-col bg-[#0a0a0a] text-white min-h-screen">
        <section className="px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-black uppercase text-white">Article not found</h1>
            <div className="mt-6">
              <Button to="/articles">Back to Articles</Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col bg-[#0a0a0a] text-white">

      {/* HEADER */}
      <section className="px-6 py-16 border-b border-zinc-900">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <Button to="/articles">← Back to Articles</Button>
          </div>
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.5em] text-[#FF2020]">
            Article
          </p>
          <h1 className="text-4xl font-black uppercase leading-tight text-white sm:text-5xl">
            {article.title}
          </h1>
          <p className="mt-3 text-sm text-zinc-600 uppercase tracking-widest">
            {article.slug?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">

          {/* Image */}
          {article.image && (
            <div className="mb-10 overflow-hidden rounded-2xl">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-72 object-cover"
              />
            </div>
          )}

          {/* Body */}
          <div className="space-y-6">
            {Array.isArray(article.content)
              ? article.content.map((paragraph, index) => (
                  <p key={index} className="text-base leading-8 text-zinc-400 whitespace-pre-wrap">
                    {paragraph}
                  </p>
                ))
              : (
                <p className="text-base leading-8 text-zinc-400">{article.content}</p>
              )
            }
          </div>

          <div className="mt-12 pt-8 border-t border-zinc-900">
            <Button to="/articles">← Back to Articles</Button>
          </div>

        </div>
      </section>

    </div>
  );
}

export default ArticlePage;