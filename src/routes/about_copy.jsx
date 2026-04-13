import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import Taskbar from "../components/Home/Taskbar";

export const Route = createFileRoute("/about_copy")({
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
    { name: "Manjiri C.", role: "Editor-in-Chief", img: "manjiri.jpg" },
    { name: "Sanhita P.", role: "Writing Head", img: "sanhita.jpg" },
    { name: "Lauren L.", role: "Creative Head", img: "lauren.png" },
    { name: "Sreya I.", role: "Creative Director", img: "sreya.jpg" },
    { name: "Nicole C.", role: "Graphics Head", img: "nicole.jpg" },
    { name: "Alaynna O.", role: "Social & Events", img: "https://cdn.indigomagazinetx.com/about/officerpics/alaynna.png" },
    { name: "Dhiraj A.", role: "Social & Events", img: "dhiraj.jpg" },
    { name: "Jeslin M.", role: "Logistics", img: "jeslin.jpg" },
    {
      name: "Emma G.",
      role: "Web Development",
      img: "291199FA-AC0E-4C55-ADCA-8CCFA99E5BD6_1_105_c.jpeg",
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        theme === "dark" ? "bg-zinc-950 text-white" : "bg-zinc-50 text-zinc-900"
      }`}
    >
      <Taskbar />

      {/* Floating Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-indigo-600 text-white shadow-2xl hover:scale-110 transition-transform active:scale-95"
      >
        {theme === "dark" ? "☼" : "☾"}
      </button>

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        {/* Hero Section */}
        <section className="mb-32">
          <header className="mb-12">
            <span className="text-indigo-500 font-medium tracking-widest uppercase text-sm">
              UT Dallas • Est. 2023
            </span>
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter mt-4 leading-[0.8]">
              INDIGO <br />
              <span className="font-serif italic font-light lowercase">
                Magazine
              </span>
            </h1>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              className={`col-span-2 p-8 rounded-3xl border ${
                theme === "dark"
                  ? "bg-zinc-900/50 border-zinc-800"
                  : "bg-white border-zinc-200 shadow-sm"
              }`}
            >
              <p className="text-2xl md:text-3xl leading-relaxed font-medium italic">
                "UT Dallas’s first completely student-run creative magazine,
                exploring abstract themes through the lens of writing,
                photography, and design."
              </p>
            </div>
            <div
              className={`p-8 rounded-3xl border flex items-center justify-center text-center ${
                theme === "dark"
                  ? "bg-indigo-900/20 border-indigo-500/30 text-indigo-300"
                  : "bg-indigo-50 border-indigo-200 text-indigo-700"
              }`}
            >
              <p className="font-bold uppercase tracking-widest text-sm">
                By the students,
                <br />
                For the students.
              </p>
            </div>
          </div>
        </section>

        {/* Officers Section */}
        <section>
          <div className="flex items-baseline justify-between border-b border-zinc-800 mb-12 pb-4">
            <h2 className="text-4xl font-bold tracking-tight">
              The Collective
            </h2>
            <span className="text-zinc-500 hidden md:block">Meet the Team</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {officers.map((officer, index) => (
              <div key={index} className="group cursor-default">
                <div className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-zinc-800">
                  <img
                    src={`https://cdn.indigomagazinetx.com/about/officer%20pics/${officer.img}`}
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
      <footer className="py-12 border-t border-zinc-800 text-center opacity-30 grayscale">
        <h2 className="text-[15vw] font-black leading-none select-none">
          INDIGO
        </h2>
      </footer>
    </div>
  );
}
