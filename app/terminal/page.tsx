"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  personal,
  experience,
  projects,
  skillCategories,
  certifications,
  education,
} from "../config/portfolio";

type Line = {
  id: number;
  type: "input" | "output" | "welcome";
  content: React.ReactNode;
};

function buildLine(
  id: number,
  type: Line["type"],
  content: React.ReactNode,
): Line {
  return { id, type, content };
}

type Tokens = {
  bg: string;
  primary: string;
  secondary: string;
  muted: string;
  dim: string;
  error: string;
  link: string;
  linkMuted: string;
  chromeText: string;
  chromeBorder: string;
  chromeBg: string;
  inputBorder: string;
  navLink: string;
  promptColor: string;
  promptGlow: string | undefined;
  cursorBg: string;
  cursorAnim: string;
  ghostText: string;
  inputText: string;
  placeholderText: string;
  scanVignette: boolean;
};

const DARK: Tokens = {
  bg: "bg-black",
  primary: "text-white",
  secondary: "text-white/70",
  muted: "text-white/50",
  dim: "text-white/30",
  error: "text-red-400/80",
  link: "text-white/80 hover:text-white hover:underline",
  linkMuted: "text-white/40 hover:text-white/70 hover:underline",
  chromeText: "text-white/25",
  chromeBorder: "border-white/10",
  chromeBg: "bg-white/[0.02]",
  inputBorder: "border-white/10",
  navLink: "text-white/30 hover:text-white/70",
  promptColor: "text-green-400/80",
  promptGlow: "0 0 6px currentColor, 0 0 14px currentColor",
  cursorBg: "bg-green-400/70",
  cursorAnim: "cursor-blink",
  ghostText: "text-white/25",
  inputText: "text-white",
  placeholderText: "placeholder-white/20",
  scanVignette: true,
};

const LIGHT: Tokens = {
  bg: "bg-[#f7f7f2]",
  primary: "text-neutral-900",
  secondary: "text-neutral-700",
  muted: "text-neutral-500",
  dim: "text-neutral-400",
  error: "text-red-600/80",
  link: "text-neutral-700 hover:text-black hover:underline",
  linkMuted: "text-neutral-500 hover:text-neutral-800 hover:underline",
  chromeText: "text-neutral-400",
  chromeBorder: "border-neutral-200",
  chromeBg: "bg-neutral-100",
  inputBorder: "border-neutral-200",
  navLink: "text-neutral-400 hover:text-neutral-700",
  promptColor: "text-green-700",
  promptGlow: undefined,
  cursorBg: "bg-green-700/70",
  cursorAnim: "cursor-blink-simple",
  ghostText: "text-neutral-400",
  inputText: "text-neutral-900",
  placeholderText: "placeholder-neutral-400",
  scanVignette: false,
};

// tab completion
const COMPLETABLE = [
  "help",
  "whoami",
  "experience",
  "projects",
  "skills",
  "education",
  "contact",
  "lightmode",
  "darkmode",
  "clear",
];

const ThemeCtx = createContext<Tokens>(DARK);

function Txt({
  children,
  dim,
  muted,
  error,
}: {
  children: React.ReactNode;
  dim?: boolean;
  muted?: boolean;
  error?: boolean;
}) {
  const T = useContext(ThemeCtx);
  const cls = error ? T.error : dim ? T.dim : muted ? T.muted : T.secondary;
  return <span className={cls}>{children}</span>;
}

function Welcome() {
  const T = useContext(ThemeCtx);
  return (
    <div className="space-y-0.5 pb-1">
      <p className={T.primary}>
        {personal.name} — {personal.title}
      </p>
      <p className={T.muted}>{personal.location.label}</p>
      <p className={`${T.dim} mt-3`}>
        type <span className={T.primary}>help</span> to see available commands
      </p>
    </div>
  );
}

function Help() {
  const T = useContext(ThemeCtx);
  const cmds = [
    ["whoami", "personal info"],
    ["experience", "work history"],
    ["projects", "personal projects"],
    ["skills", "tech stack & certifications"],
    ["education", "academic background"],
    ["contact", "links & contact info"],
    ["lightmode", "switch to light mode"],
    ["darkmode", "switch to dark mode"],
    ["clear", "clear terminal"],
  ];
  return (
    <div className="space-y-0.5">
      <p className={`${T.muted} mb-2`}>available commands</p>
      {cmds.map(([cmd, desc]) => (
        <p key={cmd}>
          <span className={`${T.primary} inline-block w-24`}>{cmd}</span>
          <span className={`${T.dim} ml-4`}>— {desc}</span>
        </p>
      ))}
    </div>
  );
}

function Whoami() {
  const T = useContext(ThemeCtx);
  return (
    <div className="space-y-0.5">
      <p className={T.primary}>{personal.name}</p>
      <p className={T.muted}>{personal.title}</p>
      <p className={T.dim}>{personal.location.label}</p>
    </div>
  );
}

function Contact() {
  const T = useContext(ThemeCtx);
  const items = [
    { label: "email", href: `mailto:${personal.email}`, text: personal.email },
    {
      label: "linkedin",
      href: personal.linkedin.url,
      text: personal.linkedin.url,
    },
    { label: "github", href: personal.github.url, text: personal.github.url },
    { label: "resume", href: personal.resume, text: "/resume.pdf ↗" },
  ];
  return (
    <div className="space-y-1">
      {items.map(({ label, href, text }) => (
        <p key={label}>
          <span className={`${T.dim} inline-block w-20`}>{label}</span>
          <a
            href={href}
            target={href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className={`${T.link} ml-3`}
          >
            {text}
          </a>
        </p>
      ))}
    </div>
  );
}

function Experience() {
  const T = useContext(ThemeCtx);
  return (
    <div className="space-y-6">
      {experience.map((company, ci) => (
        <div key={ci}>
          <p className={T.primary}>
            {company.url ? (
              <a
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {company.name} ↗
              </a>
            ) : (
              company.name
            )}
            <span className={`${T.dim} font-normal ml-2`}>
              — {company.location}
            </span>
          </p>
          {company.roles.map((role, ri) => (
            <div key={ri} className="mt-2 ml-3">
              <p className={T.secondary}>
                {role.title} <span className={T.dim}>({role.period})</span>
              </p>
              <ul className="mt-1 space-y-1">
                {role.bullets.map((b, bi) => (
                  <li key={bi} className={`${T.muted} flex gap-2`}>
                    <span className={`${T.dim} shrink-0 mt-0.5`}>›</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function Projects() {
  const T = useContext(ThemeCtx);
  return (
    <div className="space-y-5">
      {projects.map((project, pi) => (
        <div key={pi}>
          <p className={T.primary}>
            {project.name}
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${T.linkMuted} ml-2`}
              >
                [{project.urlLabel ?? "link"} ↗]
              </a>
            )}
            <span className={`${T.dim} ml-2`}>
              {project.year}
              {project.status ? ` — ${project.status}` : ""}
            </span>
          </p>
          <ul className="mt-1 ml-3 space-y-1">
            {project.bullets.map((b, bi) => (
              <li key={bi} className={`${T.muted} flex gap-2`}>
                <span className={`${T.dim} shrink-0 mt-0.5`}>›</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function Skills() {
  const T = useContext(ThemeCtx);
  return (
    <div className="space-y-4">
      {certifications.length > 0 && (
        <div>
          <p className={`${T.dim} mb-1`}>certifications</p>
          {certifications.map((cert, ci) => (
            <p key={ci} className={`${T.secondary} ml-3`}>
              {cert.name} <span className={T.dim}>— {cert.issuer}</span>
            </p>
          ))}
        </div>
      )}
      {skillCategories.map((cat, ci) => (
        <div key={ci}>
          <p className={`${T.dim} mb-1`}>{cat.title.toLowerCase()}</p>
          <p className={`${T.secondary} ml-3`}>{cat.items.join(", ")}</p>
        </div>
      ))}
    </div>
  );
}

function Education() {
  const T = useContext(ThemeCtx);
  return (
    <div className="space-y-5">
      {education.map((school, si) => (
        <div key={si}>
          <p className={T.primary}>
            {school.url ? (
              <a
                href={school.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {school.name} ↗
              </a>
            ) : (
              school.name
            )}
            <span className={`${T.dim} ml-2`}>— {school.location}</span>
          </p>
          <p className={`${T.secondary} ml-3`}>
            {school.degree} <span className={T.dim}>({school.period})</span>
          </p>
          {school.coursework && (
            <p className={`${T.dim} ml-3 mt-0.5`}>
              coursework: {school.coursework}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

function CmdError({ cmd }: { cmd: string }) {
  const T = useContext(ThemeCtx);
  return (
    <p className={T.error}>
      command not found: {cmd} — type <span className={T.primary}>help</span>{" "}
      for available commands
    </p>
  );
}

function TabHints({ matches }: { matches: string[] }) {
  const T = useContext(ThemeCtx);
  return <p className={T.dim}>{matches.join("    ")}</p>;
}

// easter eggs
const EGGS: Record<string, React.ReactNode> = {
  sudo: <Txt error>Permission denied.</Txt>,
  "sudo !!": <Txt error>Still no.</Txt>,
  vim: (
    <Txt muted>
      Entering vim... type :q! to exit. Actually you can&apos;t. This is a
      browser.
    </Txt>
  ),
  nano: <Txt muted>nano: command not found. (good)</Txt>,
  exit: <Txt muted>There is no escape.</Txt>,
  logout: <Txt muted>Session will persist indefinitely.</Txt>,
  pwd: <Txt muted>/home/affan/portfolio</Txt>,
  ls: (
    <Txt muted>
      whoami &nbsp; experience &nbsp; projects &nbsp; skills &nbsp; education
      &nbsp; contact &nbsp; clear
    </Txt>
  ),
  "ls -la": (
    <Txt muted>
      whoami &nbsp; experience &nbsp; projects &nbsp; skills &nbsp; education
      &nbsp; contact &nbsp; clear
    </Txt>
  ),
  "rm -rf /": <Txt error>Nice try.</Txt>,
  "rm -rf .": <Txt error>Nice try.</Txt>,
  "rm -rf ~": <Txt error>Nice try.</Txt>,
  hello: <Txt muted>Hello, world.</Txt>,
  hi: <Txt muted>Hey. Type &apos;help&apos; to get started.</Txt>,
  date: <Txt muted>{new Date().toString()}</Txt>,
  uptime: <Txt muted>up since the day I decided to be a developer</Txt>,
  whoops: <Txt muted>happens to the best of us</Txt>,
  "cat resume.pdf": (
    <Txt muted>
      Binary file.{" "}
      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        Open resume ↗
      </a>
    </Txt>
  ),
};

function commonPrefix(strs: string[]): string {
  return strs.reduce((acc, s) => {
    let i = 0;
    while (i < acc.length && i < s.length && acc[i] === s[i]) i++;
    return acc.slice(0, i);
  });
}

export default function TerminalPage() {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [minimized, setMinimized] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const lineId = useRef(0);
  const router = useRouter();

  const handleClose = () => router.push("/");
  const handleMinimize = () => setMinimized((v) => !v);
  const handleMaximize = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };
  const newLine = (type: Line["type"], content: React.ReactNode) =>
    buildLine(++lineId.current, type, content);

  const T = theme === "dark" ? DARK : LIGHT;

  useEffect(() => {
    setLines([newLine("welcome", null)]);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const processCommand = useCallback(
    (raw: string) => {
      const cmd = raw.trim().toLowerCase();

      if (!cmd) {
        setLines((prev) => [...prev, newLine("input", "")]);
        return;
      }

      if (cmd === "clear") {
        setLines([newLine("welcome", null)]);
        return;
      }

      const push = (content: React.ReactNode) => {
        setLines((prev) => [
          ...prev,
          newLine("input", raw),
          newLine("output", content),
        ]);
      };

      if (cmd === "lightmode") {
        if (theme === "light") {
          push(<Txt muted>Already in light mode.</Txt>);
          return;
        }
        setTheme("light");
        push(
          <Txt muted>
            Switched to light mode. Type darkmode to switch back.
          </Txt>,
        );
        return;
      }

      if (cmd === "darkmode") {
        if (theme === "dark") {
          push(<Txt muted>Already in dark mode.</Txt>);
          return;
        }
        setTheme("dark");
        push(
          <Txt muted>
            Switched to dark mode. Type lightmode to switch back.
          </Txt>,
        );
        return;
      }

      if (EGGS[cmd]) {
        push(EGGS[cmd]);
        return;
      }

      switch (cmd) {
        case "help":
          push(<Help />);
          break;
        case "whoami":
          push(<Whoami />);
          break;
        case "contact":
          push(<Contact />);
          break;
        case "experience":
          push(<Experience />);
          break;
        case "projects":
          push(<Projects />);
          break;
        case "skills":
          push(<Skills />);
          break;
        case "education":
          push(<Education />);
          break;
        default:
          push(<CmdError cmd={raw} />);
      }
    },
    [theme, setTheme],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const val = input;
      if (val.trim()) setCmdHistory((prev) => [val, ...prev]);
      setHistoryIdx(-1);
      processCommand(val);
      setInput("");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const prefix = input.toLowerCase();
      if (!prefix) return;
      const matches = COMPLETABLE.filter((c) => c.startsWith(prefix));
      if (matches.length === 0) return;
      if (matches.length === 1) {
        setInput(matches[0]);
        return;
      }
      const shared = commonPrefix(matches);
      if (shared.length > prefix.length) {
        setInput(shared);
      } else {
        setLines((prev) => [
          ...prev,
          newLine("input", input),
          newLine("output", <TabHints matches={matches} />),
        ]);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(historyIdx + 1, cmdHistory.length - 1);
      setHistoryIdx(next);
      if (cmdHistory[next] !== undefined) setInput(cmdHistory[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(historyIdx - 1, -1);
      setHistoryIdx(next);
      setInput(next === -1 ? "" : (cmdHistory[next] ?? ""));
    }
  };

  const ghost = (() => {
    if (!input) return "";
    const m = COMPLETABLE.filter((c) => c.startsWith(input.toLowerCase()));
    return m.length === 1 && m[0] !== input.toLowerCase()
      ? m[0].slice(input.length)
      : "";
  })();

  return (
    <ThemeCtx.Provider value={T}>
      <div
        className={`${T.scanVignette ? "terminal-scanlines terminal-vignette" : ""} ${T.bg} h-screen flex flex-col overflow-hidden text-[14px] leading-relaxed transition-colors duration-300`}
        onClick={() => inputRef.current?.focus()}
      >
        {/* chrome bar */}
        <div
          className={`flex items-center justify-between px-4 py-3 border-b ${T.chromeBorder} ${T.chromeBg} flex-shrink-0`}
        >
          <div className="flex gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              title="Close"
              className="group w-3 h-3 rounded-full bg-[#ff5f56] flex items-center justify-center cursor-pointer transition-all"
            >
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#820000] text-[11px] font-black leading-none select-none">
                ✕
              </span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleMinimize();
              }}
              title={minimized ? "Restore" : "Minimize"}
              className="group w-3 h-3 rounded-full bg-[#ffbd2e] flex items-center justify-center cursor-pointer transition-all"
            >
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#7a4900] text-[11px] font-black leading-none select-none">
                −
              </span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleMaximize();
              }}
              title="Fullscreen"
              className="group w-3 h-3 rounded-full bg-[#27c93f] flex items-center justify-center cursor-pointer transition-all"
            >
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#004d00] text-[11px] font-black leading-none select-none">
                +
              </span>
            </button>
          </div>
          <p
            className={`${T.chromeText} text-[12px] tracking-wide select-none`}
          >
            affan@portfolio — zsh
          </p>
          <Link
            href="/"
            className={`${T.navLink} text-[12px] transition-colors`}
            onClick={(e) => e.stopPropagation()}
          >
            ← portfolio
          </Link>
        </div>

        {/* output */}
        <div
          className={`flex-1 overflow-y-auto px-5 py-5 space-y-1 ${theme === "dark" ? "terminal-scroll" : "terminal-scroll-light"} ${minimized ? "hidden" : ""}`}
        >
          {lines.map((l) => (
            <div key={l.id}>
              {l.type === "input" && (
                <div className="slide-in flex gap-2 items-baseline mt-4 first:mt-0">
                  <span
                    className={`${T.promptColor} shrink-0 select-none`}
                    style={
                      T.promptGlow ? { textShadow: T.promptGlow } : undefined
                    }
                  >
                    affan@portfolio:~$
                  </span>
                  <span className={`${T.primary} break-all`}>{l.content}</span>
                </div>
              )}
              {l.type === "welcome" && (
                <div className="slide-in mt-1">
                  <Welcome />
                </div>
              )}
              {l.type === "output" && (
                <div className="slide-in mt-1">{l.content}</div>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* input */}
        <div
          className={`flex-shrink-0 border-t ${T.inputBorder} px-5 py-4 flex gap-2 items-center ${minimized ? "hidden" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            inputRef.current?.focus();
          }}
        >
          <span
            className={`${T.promptColor} shrink-0 select-none`}
            style={T.promptGlow ? { textShadow: T.promptGlow } : undefined}
          >
            affan@portfolio:~$
          </span>
          <div className="flex-1 relative">
            <div
              className="absolute inset-0 flex items-center pointer-events-none select-none"
              aria-hidden
            >
              <span className="invisible whitespace-pre">{input}</span>
              <span
                className={`${T.cursorAnim} inline-block w-[2px] h-[1em] ${T.cursorBg} translate-y-[1px] shrink-0`}
              />
              <span className={`${T.ghostText} whitespace-pre`}>{ghost}</span>
            </div>
            <input
              ref={inputRef}
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`relative w-full bg-transparent ${T.inputText} outline-none caret-transparent ${T.placeholderText}`}
              placeholder="type a command..."
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
          </div>
        </div>
      </div>
    </ThemeCtx.Provider>
  );
}
