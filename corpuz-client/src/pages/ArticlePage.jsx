import Button from "../components/Button";
import Article1 from "../assets/images/article-origin.jpg";
import Article2 from "../assets/images/article-goblin.jpg";
import Article3 from "../assets/images/article-webshooters.jpg";
import Article4 from "../assets/images/article-miles.jpg";

const articles = [
  {
    tag: "Origin",
    title: "The Night Everything Changed",
    desc: "A radioactive spider. A science exhibit. One bite that would alter the course of Peter Parker's life — and New York City's — forever.",
    image: Article1,
  },
  {
    tag: "Villains",
    title: "The Green Goblin Strikes",
    desc: "Norman Osborn's descent into madness produced Spider-Man's most personal nemesis. The battle for New York's skyline had begun.",
    image: Article2,
  },
  {
    tag: "Tech",
    title: "Engineering the Web-Shooters",
    desc: "Forget the biology — Peter Parker's greatest invention is the device strapped to his wrists. A breakdown of the web-fluid formula.",
    image: Article3,
  },
  {
    tag: "Legacy",
    title: "Miles Morales: The New Spider",
    desc: "When Brooklyn teenager Miles Morales was bitten by a genetically altered spider, a new chapter in Spider-Man history was written.",
    image: Article4,
  },
];

const ArticlePage = () => {
  return (
    <div className="flex w-full flex-col gap-0 bg-[#0a0a0a] text-white">
      
      {/* HERO */}
      <section className="border-b border-[#FF2020]/20 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.4em] text-[#FF2020]">
            The Daily Bugle Archives
          </p>

          <h1 className="max-w-2xl text-4xl font-black uppercase leading-tight text-white sm:text-5xl">
            Spider-Man:<br />
            <span className="text-[#FF2020]">The Full Story</span>
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-7 text-zinc-400">
            From the radioactive bite that started it all to the battles that
            defined a generation — every story, every villain, every victory.
            J. Jonah Jameson won't print these. We will.
          </p>

          <div className="mt-7">
            <Button to="/">Back Home</Button>
          </div>
        </div>
      </section>

      {/* ARTICLES */}
      <section className="border-b border-[#FF2020]/20 bg-[#0f0f0f] px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.4em] text-[#FF2020]">
            Featured Stories
          </p>

          <h2 className="mb-10 text-3xl font-black uppercase text-white">
            Latest Articles
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {articles.map((article, i) => (
              <article
                key={i}
                className="group flex flex-col rounded-2xl border border-[#FF2020]/20 bg-[#111] overflow-hidden transition hover:border-[#FF2020]/60 hover:bg-[#1a0000]"
              >
                <div className="overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="flex flex-col flex-1 p-5">
                  <span className="mb-3 inline-block rounded-full border border-[#FF2020]/40 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#FF2020]">
                    {article.tag}
                  </span>

                  <h3 className="text-base font-black uppercase text-white group-hover:text-[#FF2020] transition-colors leading-tight">
                    {article.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-6 text-zinc-400">
                    {article.desc}
                  </p>

                  <Button className="mt-4">Read More</Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;