"use client";

import { useEffect, useState } from "react";
import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  personal,
  experience,
  projects,
  certifications,
  skillCategories,
  education,
  mapLocations,
} from "./config/portfolio";

const TravelMap = dynamic(() => import("./components/TravelMap"), {
  ssr: false,
});

export default function Home() {
  const [activeSection, setActiveSection] = useState<
    "experience" | "projects" | "skills" | "education"
  >("experience");
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const sections = ["experience", "projects", "skills", "education"] as const;

  const switchSection = (index: number) => {
    setActiveSection(sections[index]);
  };

  return (
    <main className="px-6 pt-6 lg:h-screen lg:overflow-hidden">
      {/* header */}
      <header className="fixed top-0 left-0 right-0 bg-black px-6 pt-6 pb-4 z-50 flex items-center justify-between">
        <div>
          <div className="text-2xl font-semibold text-white tracking-tight">
            {personal.name},
          </div>
          <div className="mt-1 text-lg font-medium text-[#ABABAB] tracking-tight">
            {personal.title}
          </div>
        </div>
        {now && (
          <div className="text-right">
            <div className="text-[13px] text-white/40 tracking-wide">
              {now.toLocaleDateString("en-CA", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
            <div className="text-[20px] font-light text-white/70 tracking-tight tabular-nums mt-0.5">
              {now.toLocaleTimeString("en-CA", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
              })}
            </div>
          </div>
        )}
      </header>

      <div className="h-[80px]" />

      {/* main */}
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-12 lg:h-[calc(100vh-136px)]">
        {/* left col */}
        <section className="max-w-xl lg:overflow-hidden flex flex-col gap-4 lg:h-full">
          <div className="text-[14px] text-white/80 flex-shrink-0">
            <div className="border-t border-white/20">
              <a
                href={`mailto:${personal.email}`}
                className="block py-2.5 hover:text-white"
              >
                {personal.email} ↗
              </a>
            </div>

            <div className="border-t border-white/20">
              <a
                href={personal.location.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-2.5 hover:text-white"
              >
                {personal.location.label} ↗
              </a>
            </div>

            <div className="border-t border-white/20">
              <a
                href={personal.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-2.5 hover:text-white"
              >
                {personal.linkedin.label} ↗
              </a>
            </div>

            <div className="border-t border-white/20">
              <a
                href={personal.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-2.5 hover:text-white"
              >
                {personal.github.label} ↗
              </a>
            </div>

            <div className="border-t border-white/20">
              <a
                href={personal.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-2.5 hover:text-white"
              >
                Resume ↗
              </a>
            </div>

            <div className="border-t border-b border-white/20">
              <Link href="/terminal" className="block py-2.5 hover:text-white">
                Terminal View ↗
              </Link>
            </div>
          </div>

          {/* map */}
          <div className="flex-1 min-h-[180px] flex flex-col overflow-hidden">
            <div className="py-2.5 text-[11px] uppercase tracking-widest text-white/40">
              Places
            </div>
            <div className="flex-1">
              <TravelMap locations={mapLocations} />
            </div>
          </div>
        </section>

        {/* right col */}
        <section className="flex-1 max-w-full flex flex-col lg:overflow-hidden relative">
          {/* nav */}
          <div className="border-t border-white/20 mb-5 flex-shrink-0">
            <div className="flex gap-8 pt-3">
              {sections.map((s, i) => (
                <button
                  key={s}
                  onClick={() => switchSection(i)}
                  className={`text-[13px] uppercase tracking-widest pb-2 transition-colors cursor-pointer ${
                    activeSection === s
                      ? "text-white border-b border-white"
                      : "text-white/40 hover:text-white/60"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* sections */}
          <div className="flex-1 overflow-hidden relative">
            {/* experience */}
            <div
              className={`terminal-scroll absolute inset-0 overflow-y-auto pr-2 transition-opacity duration-200 ${activeSection === "experience" ? "opacity-100 slide-in pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            >
              {experience.map((company, ci) => (
                <div
                  key={ci}
                  className="grid grid-cols-[32px_minmax(220px,1fr)_2fr] gap-6 mb-12"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-white" />
                    <div className="flex-1 w-[2px] bg-white/20" />
                  </div>

                  <div className="col-span-2 grid grid-cols-[minmax(220px,1fr)_2fr] gap-6">
                    <div className="col-span-2 mb-1 -mt-1">
                      <p className="text-[15px] text-white/80">
                        {company.url ? (
                          <a
                            href={company.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white"
                          >
                            {company.name} ↗
                          </a>
                        ) : (
                          company.name
                        )}
                      </p>
                      <p className="text-[15px] text-white/60">
                        {company.location}
                      </p>
                    </div>

                    {company.roles.map((role, ri) => (
                      <React.Fragment key={ri}>
                        {ri > 0 && (
                          <div className="col-span-2 border-t border-white/10 my-3" />
                        )}
                        <div>
                          <h3 className="text-[18px] font-semibold text-white mb-1">
                            {role.title}
                          </h3>
                          <p className="text-[14px] text-white/50">
                            {role.period}
                          </p>
                        </div>
                        <div className="space-y-2 text-[15px] text-white/70 leading-relaxed">
                          {role.bullets.map((b, bi) => (
                            <p key={bi} className="flex gap-2">
                              <span className="text-white">•</span>
                              {b}
                            </p>
                          ))}
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* projects */}
            <div
              className={`terminal-scroll absolute inset-0 overflow-y-auto pr-2 transition-opacity duration-200 ${activeSection === "projects" ? "opacity-100 slide-in pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            >
              {projects.map((project, pi) => (
                <div
                  key={pi}
                  className="grid grid-cols-[32px_minmax(220px,1fr)_2fr] gap-6 mb-12"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-white" />
                    <div className="flex-1 w-[2px] bg-white/20" />
                  </div>
                  <div>
                    <h3 className="text-[18px] font-semibold text-white mb-2 -mt-1">
                      {project.name}
                    </h3>
                    {project.url && (
                      <p className="text-[15px] text-white/80">
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-white"
                        >
                          {project.urlLabel ?? project.url} ↗
                        </a>
                      </p>
                    )}
                    <p className="text-[15px] text-white/60">
                      {project.year}
                      {project.status ? ` — ${project.status}` : ""}
                    </p>
                  </div>
                  <div className="space-y-2 text-[15px] text-white/70 leading-relaxed">
                    {project.bullets.map((b, bi) => (
                      <p key={bi} className="flex gap-2">
                        <span className="text-white">•</span>
                        {b}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* skills */}
            <div
              className={`terminal-scroll absolute inset-0 overflow-y-auto pr-2 transition-opacity duration-200 ${activeSection === "skills" ? "opacity-100 slide-in pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            >
              <div className="mb-12">
                <h3 className="text-[13px] uppercase tracking-widest text-white/50 mb-4">
                  Certifications
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {certifications.map((cert, ci) => (
                    <div key={ci} className="border border-white/10 px-5 py-4">
                      {cert.url ? (
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[15px] text-white font-medium hover:text-white/70"
                        >
                          {cert.name} ↗
                        </a>
                      ) : (
                        <p className="text-[15px] text-white font-medium">
                          {cert.name}
                        </p>
                      )}
                      <p className="text-[13px] text-white/50 mt-1">
                        {cert.issuer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/20 mb-12" />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
                {skillCategories.map((cat, ci) => (
                  <div key={ci}>
                    <h3 className="text-[13px] uppercase tracking-widest text-white/50 mb-4">
                      {cat.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {cat.items.map((item) => (
                        <span
                          key={item}
                          className="text-[13px] text-white/80 border border-white/10 px-3 py-1"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* education */}
            <div
              className={`terminal-scroll absolute inset-0 overflow-y-auto pr-2 transition-opacity duration-200 ${activeSection === "education" ? "opacity-100 slide-in pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            >
              {education.map((school, si) => (
                <React.Fragment key={si}>
                  {si > 0 && <div className="border-t border-white/20 my-8" />}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                      <h3 className="text-[18px] font-normal text-white mb-4">
                        {school.url ? (
                          <a
                            href={school.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white/70"
                          >
                            {school.name}, {school.location} ↗
                          </a>
                        ) : (
                          `${school.name}, ${school.location}`
                        )}
                      </h3>
                    </div>
                    <div>
                      <h3 className="text-[18px] font-normal text-white mb-1">
                        {school.degree}
                      </h3>
                      <p className="text-[14px] text-white/50 mb-3">
                        {school.period}
                      </p>
                      {school.coursework && (
                        <p className="text-[15px] text-white/60">
                          Relevant Coursework: {school.coursework}
                        </p>
                      )}
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
