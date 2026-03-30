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
  },
  {
    title: "Web-Slinging",
    desc: "Custom-engineered web-shooters capable of swinging across Manhattan in under 60 seconds.",
  },
  {
    title: "Spider-Sense",
    desc: "A precognitive danger sense that warns of threats before they happen. The ultimate early-warning system.",
  },
];

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-0 bg-[#0a0a0a] text-white">

      
      <section className="relative min-h-[90vh] border-b border-[#FF2020]/20 px-6 py-20 overflow-hidden">

       
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, #FF2020 0px, transparent 1px, transparent 60px),
              repeating-linear-gradient(90deg, #FF2020 0px, transparent 1px, transparent 60px)
            `,
          }}
        />

        <div className="relative mx-auto max-w-6xl grid gap-12 lg:grid-cols-2 items-center">

        
          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.4em] text-[#FF2020]">
              Your Friendly Neighborhood
            </p>
            <h1 className="text-5xl font-black uppercase leading-none tracking-tight text-white sm:text-6xl lg:text-7xl">
              Spider<br />
              <span className="text-[#FF2020]">-Man</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-zinc-400">
              With great power comes great responsibility. Protecting the streets
              of New York City, one web at a time. Not all heroes wear capes —
              some wear spandex.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/about" variant="primary">Meet the Hero</Button>
              <Button to="/articles">Read the Stories</Button>
            </div>
          </div>

         <img src={Spideyhero} 
         alt="Spider-Man" 
         className="w-full rounded-2xl object-cover" />
          
          
        </div>
      </section>

     
      <section className="border-b border-[#FF2020]/20 bg-[#0f0f0f] px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.4em] text-[#FF2020]">
            By The Numbers
          </p>
          <h2 className="mb-10 text-3xl font-black uppercase text-white">
            The Stats Don't Lie
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="rounded-2xl border border-[#FF2020]/20 bg-[#111] p-6 transition hover:border-[#FF2020]/60 hover:bg-[#1a0000]"
              >
                <p className="text-4xl font-black text-[#FF2020]">{stat.value}</p>
                <p className="mt-2 text-[11px] font-bold uppercase tracking-widest text-zinc-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    
      <section className="border-b border-[#FF2020]/20 bg-[#0a0a0a] px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.4em] text-[#FF2020]">
            Abilities
          </p>
          <h2 className="mb-10 text-3xl font-black uppercase text-white">
            What I Can Do
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feat, i) => (
              <article
                key={i}
                className="group rounded-2xl border border-[#FF2020]/20 bg-[#111] p-6 transition hover:border-[#FF2020]/60 hover:bg-[#1a0000]"
              >
              
                <img src={crawl} alt={feat.title} className="w-full h-40 object-cover rounded-xl mb-4" />
              

                <h3 className="text-lg font-black uppercase text-white group-hover:text-[#FF2020] transition-colors">
                  {feat.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{feat.desc}</p>
                <Button className="mt-5" variant="primary">Learn More</Button>
              </article>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;