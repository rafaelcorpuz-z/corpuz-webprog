import Button from "../components/Button";

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
    body: "Balancing life as Peter Parker — student, photographer for the Daily Bugle, and friend — with his duties as Spider-Man has always been Spider-Man's greatest challenge.",
  },
];

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-0 bg-[#0a0a0a] text-white">

      {/* ─── HERO SECTION ─────────────────────────────── */}
      <section className="border-b border-[#FF2020]/20 px-6 py-16">
        <div className="mx-auto max-w-6xl grid gap-12 lg:grid-cols-2 items-center">

          {/*
            ⬇️ LINE 38 — PROFILE / ABOUT IMAGE
            Replace the div below with:
            <img
              src="/images/spiderman-about.png"
              alt="Spider-Man Profile"
              className="w-full rounded-2xl object-cover max-h-[500px]"
            />
            Recommended: Spider-Man portrait or mask close-up, 600x500px
          */}
          <div className="rounded-2xl border border-dashed border-[#FF2020]/30 bg-[#111] overflow-hidden">
            <div className="flex min-h-[420px] flex-col items-center justify-center gap-3 p-8">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="24" r="14" stroke="#FF2020" strokeWidth="1.5" />
                <path d="M10 56 Q32 40 54 56" stroke="#FF2020" strokeWidth="1.5" fill="none" />
                <circle cx="26" cy="22" r="5" fill="#FF2020" fillOpacity="0.3" stroke="#FF2020" strokeWidth="1" />
                <circle cx="38" cy="22" r="5" fill="#FF2020" fillOpacity="0.3" stroke="#FF2020" strokeWidth="1" />
              </svg>
              <p className="text-xs font-bold uppercase tracking-widest text-[#FF2020]/60">
                Profile Photo Here
              </p>
              <p className="text-center text-[11px] text-zinc-600">
                Recommended: Spider-Man portrait, 600×500px
              </p>
            </div>
          </div>
          {/* ⬆️ LINE 68 — END PROFILE IMAGE */}

          {/* TEXT */}
          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.4em] text-[#FF2020]">
              The Man Behind the Mask
            </p>
            <h1 className="text-4xl font-black uppercase leading-tight text-white sm:text-5xl">
              Peter Parker<br />
              <span className="text-[#FF2020]">Spider-Man</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-zinc-400">
              Scientist. Photographer. Hero. A Queens kid who got the chance to make
              a difference — and took it. Spider-Man has been protecting New York
              City for over a decade, one web at a time.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button to="/" variant="primary">Back Home</Button>
              <Button to="/articles">Read Articles</Button>
            </div>
          </div>

        </div>
      </section>

      {/* ─── STATS SECTION ────────────────────────────── */}
      <section className="border-b border-[#FF2020]/20 bg-[#0f0f0f] px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-3xl font-black uppercase text-white">
            Profile <span className="text-[#FF2020]">Overview</span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {profileStats.map((s, i) => (
              <div
                key={i}
                className="rounded-2xl border border-[#FF2020]/20 bg-[#111] p-6 transition hover:border-[#FF2020]/60 hover:bg-[#1a0000]"
              >
                <p className="text-4xl font-black text-[#FF2020]">{s.value}</p>
                <p className="mt-2 text-[11px] font-bold uppercase tracking-widest text-zinc-500">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTENT BLOCKS + SIDE PANEL ─────────────── */}
      <section className="border-b border-[#FF2020]/20 px-6 py-14">
        <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-[1fr_380px]">

          {/* Story Blocks */}
          <div className="space-y-5">
            {blocks.map((block, i) => (
              <div
                key={i}
                className="rounded-2xl border border-[#FF2020]/20 bg-[#111] p-6 transition hover:border-[#FF2020]/40"
              >
                <h3 className="text-lg font-black uppercase text-white">
                  {block.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{block.body}</p>
              </div>
            ))}
          </div>

          {/* Side Panel with image grid */}
          <div className="rounded-2xl border border-[#FF2020]/20 bg-[#111] p-6">
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.4em] text-[#FF2020]">
              Gallery
            </p>

            {/*
              ⬇️ LINE 135 — GALLERY IMAGES (4 thumbnails)
              Replace each inner div with an <img> tag:
              <img src="/images/gallery-1.png" alt="Gallery 1" className="w-full h-full object-cover rounded-xl" />
              Recommended: 200x200px square thumbnails
            */}
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="flex aspect-square items-center justify-center rounded-xl border border-dashed border-[#FF2020]/20 bg-[#0a0a0a]"
                >
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#FF2020]/40">
                    Img {n}
                  </p>
                </div>
              ))}
            </div>
            {/* ⬆️ LINE 150 — END GALLERY IMAGES */}

            <Button className="mt-6" variant="primary">View Gallery</Button>
          </div>

        </div>
      </section>

    </div>
  );
};

export default AboutPage;