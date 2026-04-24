import Button from "../components/Button";
import Spideyhero from "../assets/images/spideyhero.jpg";
import crawl from "../assets/images/crawl.jpg";

const stats = [
  { value: "8+", label: "Years of Experience" },
  { value: "50+", label: "Villains Defeated" },
  { value: "NYC", label: "Protected Daily" },
  { value: "∞", label: "Lives Saved" },
];

const features = [
  {
    title: "Wall Crawling",
    desc: "Climbing any surface at any angle — skyscrapers, bridges, you name it. No wall too high, no surface too slick.",
    image: crawl,
  },
  {
    title: "Web-Slinging",
    desc: "Custom-engineered web-shooters capable of swinging across Manhattan in under 60 seconds.",
    image: crawl,
  },
  {
    title: "Spider-Sense",
    desc: "A precognitive danger sense that warns of threats before they happen. The ultimate early-warning system.",
    image: crawl,
  },
];

const HomePage = () => {
  return (
    <div className="flex w-full flex-col bg-[#0a0a0a] text-white">

      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, #FF2020 0px, transparent 1px, transparent 80px),
              repeating-linear-gradient(90deg, #FF2020 0px, transparent 1px, transparent 80px)
            `,
          }}
        />
        <div className="relative mx-auto max-w-6xl grid gap-12 lg:grid-cols-2 items-center min-h-screen px-6 py-28">
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.5em] text-[#FF2020]">
              Your Friendly Neighborhood
            </p>
            <h1 className="text-6xl font-black uppercase leading-none tracking-tight text-white sm:text-7xl lg:text-8xl">
              Spider<br />
              <span className="text-[#FF2020]">-Man</span>
            </h1>
            <p className="mt-8 max-w-md text-base leading-8 text-zinc-400">
              With great power comes great responsibility. Protecting the streets
              of New York City, one web at a time. Not all heroes wear capes —
              some wear spandex.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button to="/about" variant="primary">Meet the Hero</Button>
              <Button to="/articles">Read the Stories</Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-[#FF2020]/5 blur-3xl" />
            <img
              src={Spideyhero}
              alt="Spider-Man"
              className="relative w-full h-[600px] rounded-3xl object-cover object-top shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#0f0f0f] px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.5em] text-[#FF2020]">
            By The Numbers
          </p>
          <h2 className="mb-12 text-4xl font-black uppercase text-white">
            The Stats Don't Lie
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-zinc-800 bg-[#111] p-8 transition-all duration-300 hover:border-[#FF2020]/50 hover:bg-[#1a0000] hover:-translate-y-1"
              >
                <p className="text-5xl font-black text-[#FF2020]">{stat.value}</p>
                <p className="mt-3 text-[11px] font-bold uppercase tracking-widest text-zinc-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABILITIES */}
      <section className="bg-[#0a0a0a] px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.5em] text-[#FF2020]">
            Abilities
          </p>
          <h2 className="mb-12 text-4xl font-black uppercase text-white">
            What I Can Do
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feat, i) => (
              <article
                key={i}
                className="group flex flex-col rounded-3xl border border-zinc-800 bg-[#111] overflow-hidden transition-all duration-300 hover:border-[#FF2020]/50 hover:bg-[#1a0000] hover:-translate-y-1"
              >
                <div className="overflow-hidden h-48">
                  <img
                    src={feat.image}
                    alt={feat.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-col flex-1 p-7">
                  <h3 className="text-lg font-black uppercase text-white group-hover:text-[#FF2020] transition-colors duration-300">
                    {feat.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-zinc-400">{feat.desc}</p>
                  <div className="mt-6">
                    <Button variant="primary">Learn More</Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;