import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import Taskbar from "../components/Home/Taskbar";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const officers = [
    {
      name: "Manjiri C.",
      role: "Editor-in-Chief",
      img: "https://cdn.indigomagazinetx.com/about/officerpics/manjiri.png",
    },
    {
      name: "Sanhita P.",
      role: "Writing Head",
      img: "https://cdn.indigomagazinetx.com/about/officerpics/sanhita.png",
    },
    {
      name: "Lauren L.",
      role: "Creative Head",
      img: "https://cdn.indigomagazinetx.com/about/officerpics/lauren.png",
    },
    {
      name: "Sreya I.",
      role: "Creative Director",
      img: "https://cdn.indigomagazinetx.com/about/officerpics/sreya.png",
    },
    {
      name: "Nicole C.",
      role: "Graphics Head",
      img: "https://cdn.indigomagazinetx.com/about/officerpics/nicole.png",
    },
    {
      name: "Alaynna O.",
      role: "Social & Events",
      img: "https://cdn.indigomagazinetx.com/about/officerpics/alaynna.png",
    },
    {
      name: "Dhiraj A.",
      role: "Social & Events",
      img: "https://cdn.indigomagazinetx.com/about/officerpics/dhiraj.jpg",
    },
    {
      name: "Jeslin M.",
      role: "Logistics",
      img: "https://cdn.indigomagazinetx.com/about/officerpics/jeslin.png",
    },
    {
      name: "Emma G.",
      role: "Web Development",
      img: "https://cdn.indigomagazinetx.com/about/officerpics/emma.png",
    },
  ];

  return (
    <div
      className={`min-h-full transition-colors duration-500 ${
        theme === "dark" ? "bg-zinc-950 text-white" : "bg-zinc-50 text-zinc-900"
      }`}
    >
      <div className="z-[100]">
        <Taskbar />
      </div>

      {/* Floating Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-indigo-600 text-white shadow-2xl hover:scale-110 transition-transform active:scale-95"
      >
        {theme === "dark" ? "☼" : "☾"}
      </button>
      <main className=" mx-auto px-6 pt-32 pb-24 ">
        {/* Hero Section */}
        <section className="ml-3 mb-12 max-w-7xl">
          <header className="mb-10">
            <span className="text-indigo-500 font-medium tracking-widest uppercase text-sm font-serif italic">
              UT Dallas • Est. 2023
            </span>
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter mt-1 leading-[0.8]">
              INDIGO <br />
              <span className="font-serif italic font-light lowercase">
                Magazine
              </span>
            </h1>
          </header>

          <div
            className={`col-span-2 w-fit p-8 md:p-12 flex items-center justify-center rounded-3xl border ${
              theme === "dark"
                ? "bg-zinc-900/50 border-zinc-800"
                : "bg-white border-zinc-200 shadow-sm"
            }`}
          >
            <p className="max-w-3xl text-left m-0 text-2xl md:text-3xl leading-relaxed font-medium italic">
              Indigo Magazine is UT Dallas’ first completely student-run
              creative magazine, exploring different abstract themes through the
              lens of writing, photography, and design. We amplify creativity
              through different forms of media for the students, by the
              students.
            </p>
          </div>
        </section>

        {/* Officers Section */}
        <section>
          <div className="flex items-baseline justify-between border-b border-zinc-800 mb-10 pb-4">
            <h2 className="text-8xl font-bold tracking-tight font-[vtks_show] tracking-wider">
              Meet the Officers
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {officers.map((officer, index) => (
              <div key={index} className="group cursor-default">
                <div className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-zinc-800">
                  <img
                    src={officer.img}
                    alt={officer.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="mt-6 flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">{officer.name}</h3>
                    <p
                      className={`text-sm uppercase tracking-widest mt-1 ${
                        theme === "dark" ? "text-zinc-400" : "text-zinc-500"
                      }`}
                    >
                      {officer.role}
                    </p>
                  </div>
                  <span className="text-indigo-500 text-xs font-mono">
                    0{index + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer Branding */}
      <footer className="py-12 border-t border-zinc-800 text-center opacity-30">
        <h2 className="text-[15vw] font-black leading-none select-none text-indigo-700">
          INDIGO
        </h2>
      </footer>
    </div>
  );
}
