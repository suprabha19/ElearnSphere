import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPlay,
} from "react-icons/fa";

const social = [
  { Icon: FaFacebook, href: "#" },
  { Icon: FaTwitter, href: "#" },
  { Icon: FaInstagram, href: "#" },
  { Icon: FaLinkedin, href: "#" },
];

const team = [
  {
    name: "MELINDA STEEL",
    role: "Corporate Trainer",
    img: "/images/melinda.jpeg",
  },
  {
    name: "ALEX DEWES",
    role: "University Professor",
    img: "/images/alex.jpeg",
  },
  {
    name: "ANNA LEWIS",
    role: "Adjunct Faculty",
    img: "/images/anna.jpeg",
  },
  {
    name: "OMAR HAMILTON",
    role: "Instructional Designer",
    img: "/images/omar.jpeg",
  },
];

const Play = () => <FaPlay className="h-6 w-6" />;

function AboutUs() {
  return (
    <main className="w-full bg-[#fbf6ef] text-[#0f0f0f]">
      {/* Header */}
      <section className="relative py-16 lg:py-20">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            About Us
          </h1>
          <div className="mt-4 flex justify-center">
            <span className="inline-block h-5 w-5 rotate-180 border-b-2 border-r-2 border-black" />
          </div>
          <div className="mx-auto mt-10 h-px w-full max-w-5xl bg-black/10" />
        </div>
      </section>

      {/* Mission with side image/video block */}
      <section className="container mx-auto max-w-7xl px-4 pb-24 pt-4">
        <div className="grid items-start gap-8 lg:grid-cols-2">
          {/* Left copy */}
          <div className="relative z-10">
            <p className="mb-4 flex items-center gap-2 text-sm font-medium text-rose-600">
              <span className="text-lg">✱</span> Enhancing Learning Experiences
            </p>
            <h2 className="text-3xl font-extrabold leading-snug md:text-4xl">
              The mission in the <br /> Company starts with team <br /> and with
              your input
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-neutral-600">
              We have established ourselves as a leader in the e-learning
              industry by consistently delivering high-quality content and
              cutting-edge learning tools. Our commitment to excellence ensures
              that every course, tutorial, and resource is designed to meet the
              highest standards and provide real value to our users.
            </p>
          </div>

          {/* Right visual collage */}
          <div className="relative flex flex-col items-center gap-4 md:flex-row md:items-stretch md:gap-4">
            <div className="overflow-hidden rounded-xl w-full md:w-1/2 h-64 md:h-auto">
              <img
                src="/images/enhancelearning1.png"
                alt="mission guy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="relative overflow-hidden rounded-[32px] w-full md:w-1/2 h-64 md:h-auto">
              <img
                src="/images/enhancelearning2.png"
                alt="video thumb"
                className="h-full w-full object-cover"
              />
              <button
                aria-label="play video"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90 p-4 shadow-lg backdrop-blur-md transition hover:scale-105"
              >
                <Play />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="container mx-auto max-w-7xl px-4 pb-24">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="mb-1 flex items-center gap-2 text-sm font-medium text-rose-600">
              <span className="text-lg">✱</span> Meet the Team
            </p>
            <h3 className="text-2xl font-bold md:text-3xl">
              Our Expert Guides
            </h3>
          </div>

          <button className="hidden rounded bg-rose-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-600 md:inline-flex">
            View All Teachers →
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {team.map((t) => (
            <article
              key={t.name}
              className="group overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-black/5"
            >
              <div className="overflow-hidden">
                <img
                  src={t.img}
                  alt={t.name}
                  className="h-64 w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="space-y-4 p-5">
                <div className="flex items-center gap-3 text-neutral-500">
                  {social.map(({ Icon, href }, i) => (
                    <a
                      key={i}
                      href={href}
                      aria-label={`social-${i}`}
                      className="transition hover:text-neutral-800"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
                <div>
                  <h4 className="text-sm font-extrabold tracking-wide">
                    {t.name}
                  </h4>
                  <p className="mt-1 text-xs text-neutral-500">{t.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center md:hidden">
          <button className="rounded bg-rose-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-600">
            View All Teachers →
          </button>
        </div>
      </section>

      {/* Testimonial */}
      <section className="relative overflow-hidden bg-[#5863f8] py-20 text-white">
        <span className="pointer-events-none absolute -right-10 bottom-10 hidden rotate-12 rounded-md bg-pink-400 p-10 md:block" />

        <div className="container mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 md:grid-cols-2">
          <div className="relative">
            <img
              src="/images/bluetestimonial.jpg"
              alt="happy student"
              className="mx-auto max-h-[380px] w-full rounded-md object-cover shadow-2xl"
            />
          </div>

          <div className="space-y-8">
            <blockquote className="relative text-sm leading-relaxed md:text-base">
              <span className="absolute -left-6 -top-4 text-5xl leading-none opacity-60">
                “
              </span>
              Since discovering this knowledge base website, my productivity has
              skyrocketed. The comprehensive and well-organized resources have
              been invaluable for both my professional and personal projects.
            </blockquote>

            <div className="flex items-center gap-4">
              <div className="h-12 w-12 overflow-hidden rounded-full">
                <img
                  src="/images/elena.jpeg"
                  alt="Elena Jackson"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="font-semibold">Elena Jackson</p>
                <p className="text-xs opacity-80">Bank Director</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AboutUs;
