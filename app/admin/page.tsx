"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  personalInfo,
  stats,
  aboutContent,
  skills,
  projects,
  socialLinks,
  marqueeText,
  type Project,
  type Skill,
  type SocialLink,
} from "../data";

// Simple auth - in production use proper auth
const ADMIN_PASSWORD = "zaid2025";

export default function AdminPage() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<
    "info" | "about" | "skills" | "projects" | "social" | "export"
  >("info");

  // Form states
  const [infoForm, setInfoForm] = useState({ ...personalInfo });
  const [statsForm, setStatsForm] = useState([...stats]);
  const [aboutForm, setAboutForm] = useState({ ...aboutContent });
  const [skillsForm, setSkillsForm] = useState<Skill[]>([...skills]);
  const [projectsForm, setProjectsForm] = useState<Project[]>([...projects]);
  const [socialForm, setSocialForm] = useState<SocialLink[]>([...socialLinks]);
  const [marqueeForm, setMarqueeForm] = useState(marqueeText);
  const [saved, setSaved] = useState(false);
  const [isLight, setIsLight] = useState(false);

  const toggleTheme = () => {
    const newMode = !isLight;
    setIsLight(newMode);
    if (newMode) {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  };

  useEffect(() => {
    const auth = sessionStorage.getItem("admin-auth");
    if (auth === "true") setAuthenticated(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      sessionStorage.setItem("admin-auth", "true");
    } else {
      alert("Wrong password");
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    sessionStorage.removeItem("admin-auth");
  };

  const exportData = () => {
    const data = {
      personalInfo: infoForm,
      stats: statsForm,
      aboutContent: aboutForm,
      skills: skillsForm,
      projects: projectsForm,
      socialLinks: socialForm,
      marqueeText: marqueeForm,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio-data.json";
    a.click();
    URL.revokeObjectURL(url);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const copyData = () => {
    const data = {
      personalInfo: infoForm,
      stats: statsForm,
      aboutContent: aboutForm,
      skills: skillsForm,
      projects: projectsForm,
      socialLinks: socialForm,
      marqueeText: marqueeForm,
    };
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addProject = () => {
    const newProject: Project = {
      id: `project-${Date.now()}`,
      idx: String(projectsForm.length + 1).padStart(2, "0"),
      title: "New Project",
      description: "Description here...",
      tags: ["Tag"],
      link: null,
      linkLabel: "Private",
    };
    setProjectsForm([...projectsForm, newProject]);
  };

  const removeProject = (index: number) => {
    setProjectsForm(projectsForm.filter((_, i) => i !== index));
  };

  const updateProject = (index: number, field: keyof Project, value: string | string[] | null) => {
    const updated = [...projectsForm];
    updated[index] = { ...updated[index], [field]: value };
    setProjectsForm(updated);
  };

  const addSkill = () => {
    setSkillsForm([...skillsForm, { name: "New Skill", width: 0.5, tag: "Building" }]);
  };

  const removeSkill = (index: number) => {
    setSkillsForm(skillsForm.filter((_, i) => i !== index));
  };

  const addSocial = () => {
    setSocialForm([...socialForm, { name: "New Link", url: "#", label: "↗" }]);
  };

  const removeSocial = (index: number) => {
    setSocialForm(socialForm.filter((_, i) => i !== index));
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[var(--black)] text-[var(--white)] flex items-center justify-center px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm border border-[var(--white)]/[0.06] rounded-2xl p-8"
        >
          <h1
            className="font-[family-name:var(--font-unbounded)] font-black text-2xl mb-2"
          >
            Admin
          </h1>
          <p className="text-[var(--gray)] text-sm mb-6 font-light">
            Enter password to manage portfolio content
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full bg-transparent border border-[var(--white)]/[0.14] rounded-lg px-4 py-3 text-sm text-[var(--white)] placeholder:text-[var(--gray)] focus:outline-none focus:border-[var(--accent)] mb-4"
          />
          <button
            type="submit"
            className="w-full font-[family-name:var(--font-space-mono)] text-[11px] tracking-[0.14em] uppercase px-6 py-3 rounded-full border-2 border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)] hover:bg-transparent hover:text-[var(--white)] hover:border-[var(--white)] transition-all"
          >
            Enter
          </button>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="w-full mt-3 font-[family-name:var(--font-space-mono)] text-[11px] tracking-[0.14em] uppercase px-6 py-3 rounded-full border-2 border-[var(--gray)]/35 text-[var(--gray)] hover:border-[var(--white)] hover:text-[var(--white)] transition-all"
          >
            Back to Site
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--black)] text-[var(--white)]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[var(--black)] border-b border-[var(--white)]/[0.06] px-6 md:px-10 py-4 flex justify-between items-center">
        <span className="font-[family-name:var(--font-space-mono)] text-[11px] tracking-[0.2em] uppercase">
          Z.S — Admin
        </span>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="font-[family-name:var(--font-space-mono)] text-[9px] tracking-[0.18em] uppercase text-[var(--gray)] border border-[var(--gray)]/40 rounded-full px-4 py-[7px] hover:text-[var(--white)] hover:border-[var(--white)] transition-colors"
          >
            {isLight ? "Dark Mode" : "Light Mode"}
          </button>
          <button
            onClick={() => router.push("/")}
            className="font-[family-name:var(--font-space-mono)] text-[10px] tracking-[0.14em] uppercase text-[var(--gray)] hover:text-[var(--white)] transition-colors"
          >
            View Site
          </button>
          <button
            onClick={handleLogout}
            className="font-[family-name:var(--font-space-mono)] text-[10px] tracking-[0.14em] uppercase text-[var(--gray)] hover:text-[var(--white)] transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-56 border-r border-[var(--white)]/[0.06] md:min-h-[calc(100vh-60px)]">
          <nav className="p-4 flex md:flex-col gap-1 overflow-x-auto md:overflow-visible">
            {[
              { key: "info", label: "Personal Info" },
              { key: "about", label: "About & Stats" },
              { key: "skills", label: "Skills" },
              { key: "projects", label: "Projects" },
              { key: "social", label: "Social Links" },
              { key: "export", label: "Export Data" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`text-left px-4 py-2.5 rounded-lg text-[11px] font-[family-name:var(--font-space-mono)] tracking-[0.1em] uppercase whitespace-nowrap transition-all ${
                  activeTab === tab.key
                    ? "bg-[var(--accent)]/15 text-[var(--accent)]"
                    : "text-[var(--gray)] hover:text-[var(--white)]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 p-6 md:p-10 max-w-4xl">
          {saved && (
            <div className="mb-4 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm">
              Changes saved! Copy the exported data to your data.ts file.
            </div>
          )}

          {/* PERSONAL INFO */}
          {activeTab === "info" && (
            <div className="space-y-6">
              <h2 className="font-[family-name:var(--font-unbounded)] font-black text-xl mb-6">
                Personal Information
              </h2>
              {[
                { key: "name", label: "Name" },
                { key: "tagline", label: "Tagline" },
                { key: "heroDesc", label: "Hero Description" },
                { key: "email", label: "Email" },
                { key: "phone", label: "Phone" },
                { key: "whatsapp", label: "WhatsApp Link" },
                { key: "github", label: "GitHub" },
                { key: "linkedin", label: "LinkedIn" },
                { key: "photo", label: "Photo Path" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block font-[family-name:var(--font-space-mono)] text-[9px] tracking-[0.2em] uppercase text-[var(--gray)] mb-2">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    value={String((infoForm as any)[field.key] ?? "")}
                    onChange={(e) =>
                      setInfoForm({ ...infoForm, [field.key]: e.target.value })
                    }
                    className="w-full bg-transparent border border-[var(--white)]/[0.14] rounded-lg px-4 py-2.5 text-sm text-[var(--white)] focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>
              ))}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={infoForm.available}
                  onChange={(e) =>
                    setInfoForm({ ...infoForm, available: e.target.checked })
                  }
                  className="w-4 h-4 rounded border-[var(--white)]/20"
                />
                <span className="text-sm text-[var(--gray)]">Available for work</span>
              </div>
            </div>
          )}

          {/* ABOUT & STATS */}
          {activeTab === "about" && (
            <div className="space-y-6">
              <h2 className="font-[family-name:var(--font-unbounded)] font-black text-xl mb-6">
                About & Stats
              </h2>

              <div>
                <label className="block font-[family-name:var(--font-space-mono)] text-[9px] tracking-[0.2em] uppercase text-[var(--gray)] mb-2">
                  Headline
                </label>
                <input
                  type="text"
                  value={aboutForm.headline}
                  onChange={(e) =>
                    setAboutForm({ ...aboutForm, headline: e.target.value })
                  }
                  className="w-full bg-transparent border border-[var(--white)]/[0.14] rounded-lg px-4 py-2.5 text-sm text-[var(--white)] focus:outline-none focus:border-[var(--accent)]"
                />
              </div>

              <div>
                <label className="block font-[family-name:var(--font-space-mono)] text-[9px] tracking-[0.2em] uppercase text-[var(--gray)] mb-2">
                  Paragraphs (use {"<strong>"}text{"</strong>"} for bold)
                </label>
                {aboutForm.paragraphs.map((p, i) => (
                  <textarea
                    key={i}
                    value={p}
                    onChange={(e) => {
                      const updated = [...aboutForm.paragraphs];
                      updated[i] = e.target.value;
                      setAboutForm({ ...aboutForm, paragraphs: updated });
                    }}
                    rows={3}
                    className="w-full bg-transparent border border-[var(--white)]/[0.14] rounded-lg px-4 py-2.5 text-sm text-[var(--white)] focus:outline-none focus:border-[var(--accent)] mb-2"
                  />
                ))}
              </div>

              <div>
                <label className="block font-[family-name:var(--font-space-mono)] text-[9px] tracking-[0.2em] uppercase text-[var(--gray)] mb-2">
                  Stats
                </label>
                {statsForm.map((s, i) => (
                  <div key={i} className="flex gap-3 mb-2">
                    <input
                      type="text"
                      value={s.num}
                      onChange={(e) => {
                        const updated = [...statsForm];
                        updated[i] = { ...updated[i], num: e.target.value };
                        setStatsForm(updated);
                      }}
                      className="w-20 bg-transparent border border-[var(--white)]/[0.14] rounded-lg px-3 py-2 text-sm text-[var(--white)] focus:outline-none focus:border-[var(--accent)]"
                      placeholder="Num"
                    />
                    <input
                      type="text"
                      value={s.label}
                      onChange={(e) => {
                        const updated = [...statsForm];
                        updated[i] = { ...updated[i], label: e.target.value };
                        setStatsForm(updated);
                      }}
                      className="flex-1 bg-transparent border border-[var(--white)]/[0.14] rounded-lg px-3 py-2 text-sm text-[var(--white)] focus:outline-none focus:border-[var(--accent)]"
                      placeholder="Label"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block font-[family-name:var(--font-space-mono)] text-[9px] tracking-[0.2em] uppercase text-[var(--gray)] mb-2">
                  Marquee Text
                </label>
                <input
                  type="text"
                  value={marqueeForm}
                  onChange={(e) => setMarqueeForm(e.target.value)}
                  className="w-full bg-transparent border border-[var(--white)]/[0.14] rounded-lg px-4 py-2.5 text-sm text-[var(--white)] focus:outline-none focus:border-[var(--accent)]"
                />
              </div>
            </div>
          )}

          {/* SKILLS */}
          {activeTab === "skills" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-[family-name:var(--font-unbounded)] font-black text-xl">
                  Skills
                </h2>
                <button
                  onClick={addSkill}
                  className="font-[family-name:var(--font-space-mono)] text-[10px] tracking-[0.14em] uppercase px-4 py-2 rounded-full border-2 border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)] hover:bg-transparent hover:text-[var(--white)] hover:border-[var(--white)] transition-all"
                >
                  + Add
                </button>
              </div>
              {skillsForm.map((sk, i) => (
                <div
                  key={i}
                  className="border border-[var(--white)]/[0.06] rounded-xl p-4 space-y-3"
                >
                  <div className="flex justify-between">
                    <span className="text-[var(--gray)] text-xs">Skill {i + 1}</span>
                    <button
                      onClick={() => removeSkill(i)}
                      className="text-[var(--gray)] hover:text-red-400 text-xs"
                    >
                      Remove
                    </button>
                  </div>
                  <input
                    type="text"
                    value={sk.name}
                    onChange={(e) => {
                      const updated = [...skillsForm];
                      updated[i] = { ...updated[i], name: e.target.value };
                      setSkillsForm(updated);
                    }}
                    className="w-full bg-transparent border border-[var(--white)]/[0.14] rounded-lg px-3 py-2 text-sm text-[var(--white)] focus:outline-none focus:border-[var(--accent)]"
                    placeholder="Skill name"
                  />
                  <div className="flex gap-3">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={sk.width}
                      onChange={(e) => {
                        const updated = [...skillsForm];
                        updated[i] = {
                          ...updated[i],
                          width: parseFloat(e.target.value),
                        };
                        setSkillsForm(updated);
                      }}
                      className="flex-1"
                    />
                    <span className="text-[var(--gray)] text-xs w-12">
                      {Math.round(sk.width * 100)}%
                    </span>
                  </div>
                  <input
                    type="text"
                    value={sk.tag}
                    onChange={(e) => {
                      const updated = [...skillsForm];
                      updated[i] = { ...updated[i], tag: e.target.value };
                      setSkillsForm(updated);
                    }}
                    className="w-full bg-transparent border border-[var(--white)]/[0.14] rounded-lg px-3 py-2 text-sm text-[var(--white)] focus:outline-none focus:border-[var(--accent)]"
                    placeholder="Tag (Active, Solid, Building...)"
                  />
                </div>
              ))}
            </div>
          )}

          {/* PROJECTS */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-[family-name:var(--font-unbounded)] font-black text-xl">
                  Projects
                </h2>
                <button
                  onClick={addProject}
                  className="font-[family-name:var(--font-space-mono)] text-[10px] tracking-[0.14em] uppercase px-4 py-2 rounded-full border-2 border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)] hover:bg-transparent hover:text-[var(--white)] hover:border-[var(--white)] transition-all"
                >
                  + Add Project
                </button>
              </div>
              {projectsForm.map((p, i) => (
                <div
                  key={p.id}
                  className="border border-[var(--white)]/[0.06] rounded-xl p-4 space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-[family-name:var(--font-space-mono)] text-[10px] tracking-[0.1em] text-[var(--gray)]">
                      {p.idx}
                    </span>
                    <button
                      onClick={() => removeProject(i)}
                      className="text-[var(--gray)] hover:text-red-400 text-xs"
                    >
                      Remove
                    </button>
                  </div>
                  <input
                    type="text"
                    value={p.title}
                    onChange={(e) =>
                      updateProject(i, "title", e.target.value)
                    }
                    className="w-full bg-transparent border border-[var(--white)]/[0.14] rounded-lg px-3 py-2 text-sm text-[var(--white)] focus:outline-none focus:border-[var(--accent)]"
                    placeholder="Title"
                  />
                  <textarea
                    value={p.description}
                    onChange={(e) =>
                      updateProject(i, "description", e.target.value)
                    }
                    rows={3}
                    className="w-full bg-transparent border border-[var(--white)]/[0.14] rounded-lg px-3 py-2 text-sm text-[var(--white)] focus:outline-none focus:border-[var(--accent)]"
                    placeholder="Description"
                  />
                  <input
                    type="text"
                    value={p.tags.join(", ")}
                    onChange={(e) =>
                      updateProject(
                        i,
                        "tags",
                        e.target.value.split(",").map((t) => t.trim())
                      )
                    }
                    className="w-full bg-transparent border border-[var(--white)]/[0.14] rounded-lg px-3 py-2 text-sm text-[var(--white)] focus:outline-none focus:border-[var(--accent)]"
                    placeholder="Tags (comma separated)"
                  />
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={p.link || ""}
                      onChange={(e) =>
                        updateProject(
                          i,
                          "link",
                          e.target.value || null
                        )
                      }
                      className="flex-1 bg-transparent border border-[var(--white)]/[0.14] rounded-lg px-3 py-2 text-sm text-[var(--white)] focus:outline-none focus:border-[var(--accent)]"
                      placeholder="Link URL (empty = private)"
                    />
                    <input
                      type="text"
                      value={p.linkLabel}
                      onChange={(e) =>
                        updateProject(i, "linkLabel", e.target.value)
                      }
                      className="w-24 bg-transparent border border-[var(--white)]/[0.14] rounded-lg px-3 py-2 text-sm text-[var(--white)] focus:outline-none focus:border-[var(--accent)]"
                      placeholder="Label"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SOCIAL LINKS */}
          {activeTab === "social" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-[family-name:var(--font-unbounded)] font-black text-xl">
                  Social Links
                </h2>
                <button
                  onClick={addSocial}
                  className="font-[family-name:var(--font-space-mono)] text-[10px] tracking-[0.14em] uppercase px-4 py-2 rounded-full border-2 border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)] hover:bg-transparent hover:text-[var(--white)] hover:border-[var(--white)] transition-all"
                >
                  + Add
                </button>
              </div>
              {socialForm.map((link, i) => (
                <div
                  key={i}
                  className="border border-[var(--white)]/[0.06] rounded-xl p-4 space-y-3"
                >
                  <div className="flex justify-between">
                    <span className="text-[var(--gray)] text-xs">Link {i + 1}</span>
                    <button
                      onClick={() => removeSocial(i)}
                      className="text-[var(--gray)] hover:text-red-400 text-xs"
                    >
                      Remove
                    </button>
                  </div>
                  <input
                    type="text"
                    value={link.name}
                    onChange={(e) => {
                      const updated = [...socialForm];
                      updated[i] = { ...updated[i], name: e.target.value };
                      setSocialForm(updated);
                    }}
                    className="w-full bg-transparent border border-[var(--white)]/[0.14] rounded-lg px-3 py-2 text-sm text-[var(--white)] focus:outline-none focus:border-[var(--accent)]"
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    value={link.url}
                    onChange={(e) => {
                      const updated = [...socialForm];
                      updated[i] = { ...updated[i], url: e.target.value };
                      setSocialForm(updated);
                    }}
                    className="w-full bg-transparent border border-[var(--white)]/[0.14] rounded-lg px-3 py-2 text-sm text-[var(--white)] focus:outline-none focus:border-[var(--accent)]"
                    placeholder="URL"
                  />
                  <input
                    type="text"
                    value={link.label}
                    onChange={(e) => {
                      const updated = [...socialForm];
                      updated[i] = { ...updated[i], label: e.target.value };
                      setSocialForm(updated);
                    }}
                    className="w-20 bg-transparent border border-[var(--white)]/[0.14] rounded-lg px-3 py-2 text-sm text-[var(--white)] focus:outline-none focus:border-[var(--accent)]"
                    placeholder="Label"
                  />
                </div>
              ))}
            </div>
          )}

          {/* EXPORT */}
          {activeTab === "export" && (
            <div className="space-y-6">
              <h2 className="font-[family-name:var(--font-unbounded)] font-black text-xl mb-6">
                Export Data
              </h2>
              <p className="text-[var(--gray)] text-sm mb-6">
                Export your changes as JSON. Copy this data into your{" "}
                <code className="text-[var(--white)] bg-[var(--white)]/10 px-1.5 py-0.5 rounded">
                  data.ts
                </code>{" "}
                file to update the portfolio.
              </p>
              <div className="flex gap-3 mb-4">
                <button
                  onClick={exportData}
                  className="font-[family-name:var(--font-space-mono)] text-[10px] tracking-[0.14em] uppercase px-6 py-3 rounded-full border-2 border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)] hover:bg-transparent hover:text-[var(--white)] hover:border-[var(--white)] transition-all"
                >
                  Download JSON
                </button>
                <button
                  onClick={copyData}
                  className="font-[family-name:var(--font-space-mono)] text-[10px] tracking-[0.14em] uppercase px-6 py-3 rounded-full border-2 border-[var(--gray)]/35 text-[var(--gray)] hover:border-[var(--white)] hover:text-[var(--white)] transition-all"
                >
                  Copy to Clipboard
                </button>
              </div>
              <pre className="bg-[var(--white)]/[0.03] border border-[var(--white)]/[0.06] rounded-xl p-4 text-xs text-[var(--gray)] overflow-auto max-h-96">
                {JSON.stringify(
                  {
                    personalInfo: infoForm,
                    stats: statsForm,
                    aboutContent: aboutForm,
                    skills: skillsForm,
                    projects: projectsForm,
                    socialLinks: socialForm,
                    marqueeText: marqueeForm,
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
