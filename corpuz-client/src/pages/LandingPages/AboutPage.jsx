import Button from "../../components/Button";
import Spiderman from '../../assets/images/Spiderman.jpg';
import Gallery1 from '../../assets/images/gallery-1.jpg';
import Gallery2 from '../../assets/images/gallery-2.jpg';
import Gallery3 from '../../assets/images/gallery-3.jpg';
import Gallery4 from '../../assets/images/gallery-4.jpg';

const galleryImages = [
  { src: Gallery1, alt: "Gallery 1" },
  { src: Gallery2, alt: "Gallery 2" },
  { src: Gallery3, alt: "Gallery 3" },
  { src: Gallery4, alt: "Gallery 4" },
];

const profileStats = [
  { value: "17", label: "Age When Bitten" },
  { value: "10+", label: "Years Active" },
  { value: "42", label: "Suits Designed" },
  { value: "3", label: "Secret Identities" },
];

const blocks = [
  {
    title: "Origin Story",
    body: "Peter Parker, a nerdy high school student from Queens, was bitten by a radioactive spider during a school field trip. The bite granted him superhuman strength, agility, and the ability to cling to surfaces.",
  },
  {
    title: "The Responsibility",
    body: "After the tragic death of his Uncle Ben — a loss Peter could have prevented — he adopted the motto: 'With great power comes great responsibility.' It drives every decision he makes as Spider-Man.",
  },
  {
    title: "Dual Life",
    body: "Balancing life as Me — student, photographer for the Daily Bugle, and friend — with his duties as Spider-Man has always been Spider-Man's greatest challenge.",
  },
];

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col bg-[#0a0a0a] text-white">

      {/* HERO */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl grid gap-16 lg:grid-cols-2 items-center">
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-[#FF2020]/5 blur-2xl" />
            <img
              src={Spiderman}
              alt="Spider-Man Profile"
              className="relative w-full rounded-3xl object-cover max-h-[560px] shadow-2xl"
            />
          </div>
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.5em] text-[#FF2020]">
              The Man Behind the Mask
            </p>
            <h1 className="text-5xl font-black uppercase leading-tight text-white sm:text-6xl">
              Me<br />
              <span className="text-[#FF2020]">Spider-Man</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-zinc-400">
              Scientist. Photographer. Hero. A Queens kid who got the chance to make
              a difference — and took it. Spider-Man has been protecting New York
              City for over a decade, one web at a time.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button to="/" variant="primary">Back Home</Button>
              <Button to="/articles">Read Articles</Button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#0f0f0f] px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.5em] text-[#FF2020]">
            Profile
          </p>
          <h2 className="mb-12 text-4xl font-black uppercase text-white">
            Overview
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {profileStats.map((s, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-zinc-800 bg-[#111] p-8 transition-all duration-300 hover:border-[#FF2020]/50 hover:bg-[#1a0000] hover:-translate-y-1"
              >
                <p className="text-5xl font-black text-[#FF2020]">{s.value}</p>
                <p className="mt-3 text-[11px] font-bold uppercase tracking-widest text-zinc-500">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOCKS + GALLERY */}
      <section className="bg-[#0a0a0a] px-6 py-20">
        <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-5">
            {blocks.map((block, i) => (
              <div
                key={i}
                className="rounded-2xl border border-zinc-800 bg-[#111] p-7 transition-all duration-300 hover:border-[#FF2020]/40 hover:-translate-y-0.5"
              >
                <h3 className="text-base font-black uppercase text-white">
                  {block.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-zinc-400">{block.body}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-[#111] p-6">
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.5em] text-[#FF2020]">
              Gallery
            </p>
            <div className="grid grid-cols-2 gap-3">
              {galleryImages.map((img, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-xl">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button variant="primary" className="w-full justify-center">View Gallery</Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;