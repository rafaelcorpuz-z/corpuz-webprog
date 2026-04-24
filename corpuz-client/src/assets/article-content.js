import articleOrigin from './images/article-origin.jpg';
import articleGoblin from './images/article-goblin.jpg';
import articleWebshooters from './images/article-webshooters.jpg';
import articleMiles from './images/article-miles.jpg';
import crawl from './images/crawl.jpg';

const articles = [
  {
    name: "the-radioactive-bite",
    title: "The Radioactive Bite",
    image: articleOrigin,
    content: [
      "On an ordinary school field trip to Oscorp Industries, fifteen-year-old Peter Parker was bitten by a genetically modified spider that had escaped its containment unit.",
      "Within hours, Peter began to notice dramatic changes — his eyesight improved overnight, his body became lean and muscular, and he could feel vibrations in the air before they reached him.",
      "The spider's venom had rewritten his DNA, granting him proportional strength of a spider, the ability to cling to any surface, and a precognitive danger sense he would come to call his Spider-Sense.",
      "Example:\nfunction spiderSense() {\n  return 'Danger detected!';\n}",
    ],
  },
  {
    name: "the-green-goblin-rises",
    title: "The Green Goblin Rises",
    image: articleGoblin,
    content: [
      "Norman Osborn, CEO of Oscorp Industries, subjected himself to an experimental performance-enhancing formula that was meant to create super-soldiers — but the serum had an unforeseen side effect.",
      "The formula split Norman's personality in two: the ruthless businessman and the cackling, sadistic Green Goblin — a villain armed with pumpkin bombs, razor bats, and a high-tech glider.",
      "The Goblin became Spider-Man's most dangerous nemesis, not just because of his power, but because Norman Osborn knew Peter Parker's greatest secret.",
      "Their rivalry would define Spider-Man's early career and cost Peter one of the people he loved most.",
    ],
  },
  {
    name: "building-the-web-shooters",
    title: "Building the Web-Shooters",
    image: articleWebshooters,
    content: [
      "Unlike the organic web-spinners of some universes, Peter Parker's web-shooters are a product of pure genius — mechanical devices worn on the wrists, loaded with cartridges of his own synthetic web fluid.",
      "The web fluid itself is a shear-thinning polymer that behaves like a solid under pressure but flows freely when forced through the nozzle at high speed — a real concept known as a non-Newtonian fluid.",
      "Peter designed the shooters at age fifteen using parts sourced from Oscorp labs and a Radio Shack near Queens. The nozzle can produce web lines, web nets, and impact web blobs depending on how he triggers it.",
      "Example:\nconst webShooter = {\n  fluid: 'synthetic-polymer',\n  tensileStrength: '120lbs/sqin',\n  dissolveTime: '2hrs'\n};",
    ],
  },
  {
    name: "miles-morales-the-legacy",
    title: "Miles Morales: The Legacy",
    image: articleMiles,
    content: [
      "Miles Morales was a thirteen-year-old kid from Brooklyn — a scholarship student at Brooklyn Visions Academy — when a spider genetically enhanced by Oscorp bit him during a visit to his uncle's apartment.",
      "His powers differed from Peter Parker's in two crucial ways: Miles could generate a venom strike — a bioelectric blast that could stun or incapacitate opponents — and he could turn himself completely invisible.",
      "When Peter Parker died stopping the Kingpin's collider, Miles stepped up. Not because anyone asked him to. Because he knew someone had to, and he was the one standing there.",
      "Miles Morales proved that the Spider-Man legacy wasn't about one person — it was about the choice to be responsible with the power you're given.",
    ],
  },
  {
    name: "the-symbiote-saga",
    title: "The Symbiote Saga",
    image: crawl,
    content: [
      "During the Secret Wars conflict on Battleworld, Peter Parker discovered what appeared to be a machine that could repair and generate costumes. What came out was an alien symbiote that bonded to him and formed a sleek black suit.",
      "The suit enhanced Peter's strength and speed, produced its own unlimited web fluid, and could mimic any clothing — but it was doing something else too: feeding off his aggression while he slept, leaving him exhausted each morning.",
      "With the help of the Fantastic Four, Peter discovered the truth: the symbiote was a living organism trying to permanently bond with him. He rejected it using sonic vibrations from a church bell.",
      "The symbiote, heartbroken and enraged, found a new host in Eddie Brock — and together they became Venom, one of Spider-Man's most terrifying enemies.",
    ],
  },
];

export default articles;