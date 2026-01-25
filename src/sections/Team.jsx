// src/sections/Team.jsx

import {
  Github,
  Linkedin,
  Mail,
  Award,
  Calendar,
  MapPin,
  Code,
  Star,
  GitBranch,
  ExternalLink,
  ChevronRight,
  Calendar1,
  Code2,
  MapPinCheck,
} from "lucide-react";
import React, { useEffect, useState } from "react";
//import VantaDotsBG from "../backgrounds/VantaDotsBg";
import VantaNetBG from "../backgrounds/VantaNetBg";

function Team() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeMember, setActiveMember] = useState(null);

  const githubUsernames = [
    "peter-mwau",
    "NORMTOSH",
    "Mickmacha",
    "AdoyoClifford",
  ];

  const memberDetails = {
    "peter-mwau": {
      position: "Full Stack Developer",
      email: "pierremwau4050@gmail.com",
      linkedin: "https://www.linkedin.com/in/peter-kyale-6b11a4233/",
      website: "https://petermwauportfolio.netlify.app/",
      expertise: ["Solidity", "React", "Node.js", "MongoDB"],
      yearsAtCompany: 1,
      skills: [
        { name: "Solidity", level: 85 },
        { name: "React", level: 95 },
        { name: "Node.js", level: 90 },
        { name: "TypeScript", level: 88 },
      ],
      contributions: [
        "Led the development of Nyota's core platform",
        "Implemented CI/CD pipeline for faster deployments",
        "Mentored junior developers in modern web practices",
      ],
    },
    NORMTOSH: {
      position: "Frontend Developer",
      email: "normtosh@example.com",
      linkedin: "https://linkedin.com/in/normtosh",
      expertise: ["React", "UI/UX", "Tailwind"],
      yearsAtCompany: 2,
      skills: [
        { name: "React", level: 92 },
        { name: "CSS/Tailwind", level: 95 },
        { name: "JavaScript", level: 90 },
        { name: "UI/UX Design", level: 85 },
      ],
      contributions: [
        "Created responsive design system for Nyota",
        "Optimized application performance by 40%",
        "Built reusable component library",
      ],
    },
    Mickmacha: {
      position: "Backend Developer",
      email: "mickmacha@example.com",
      linkedin: "https://linkedin.com/in/mickmacha",
      expertise: ["Python", "Django", "PostgreSQL"],
      yearsAtCompany: 2,
      skills: [
        { name: "Python", level: 93 },
        { name: "Django", level: 90 },
        { name: "PostgreSQL", level: 87 },
        { name: "API Design", level: 89 },
      ],
      contributions: [
        "Architected scalable backend infrastructure",
        "Implemented secure authentication system",
        "Reduced API response time by 50%",
      ],
    },
    AdoyoClifford: {
      position: "DevOps Engineer",
      email: "adoyoclifford@example.com",
      linkedin: "https://linkedin.com/in/adoyoclifford",
      expertise: ["Docker", "Kubernetes", "AWS"],
      yearsAtCompany: 1,
      skills: [
        { name: "Docker", level: 91 },
        { name: "Kubernetes", level: 88 },
        { name: "AWS", level: 86 },
        { name: "CI/CD", level: 90 },
      ],
      contributions: [
        "Set up automated deployment pipelines",
        "Reduced infrastructure costs by 30%",
        "Implemented monitoring and alerting systems",
      ],
    },
  };

  const calculateYearsAndDaysSince = (dateString) => {
    if (!dateString) return { years: 0, days: 0, label: "0 days" };

    const start = new Date(dateString);
    const now = new Date();

    let years = now.getFullYear() - start.getFullYear();
    const anniversaryThisYear = new Date(
      now.getFullYear(),
      start.getMonth(),
      start.getDate(),
    );

    if (now < anniversaryThisYear) years -= 1;

    const lastAnniversaryYear =
      now < anniversaryThisYear ? now.getFullYear() - 1 : now.getFullYear();
    const lastAnniversary = new Date(
      lastAnniversaryYear,
      start.getMonth(),
      start.getDate(),
    );

    const msInDay = 1000 * 60 * 60 * 24;
    const days = Math.max(0, Math.floor((now - lastAnniversary) / msInDay));

    const labelParts = [];
    if (years > 0) labelParts.push(`${years} yr${years === 1 ? "" : "s"}`);
    labelParts.push(`${days} day${days === 1 ? "" : "s"}`);

    return { years, days, label: labelParts.join(" ") };
  };

  const getYearsOnGithubLabel = (member) => {
    if (!member) return "0 days";
    if (member.createdAt)
      return calculateYearsAndDaysSince(member.createdAt).label;
    if (member.yearsOnGithub?.label) return member.yearsOnGithub.label;
    return "0 days";
  };

  useEffect(() => {
    const fetchGitHubProfiles = async () => {
      try {
        setLoading(true);
        const profilesData = await Promise.all(
          githubUsernames.map(async (username) => {
            try {
              const response = await fetch(
                `https://api.github.com/users/${username}`,
              );
              if (!response.ok) {
                console.error(
                  `Failed to fetch ${username}: ${response.status} ${response.statusText}`,
                );
                throw new Error(`Failed to fetch ${username}`);
              }
              const data = await response.json();

              const reposResponse = await fetch(data.repos_url);
              const repos = reposResponse.ok ? await reposResponse.json() : [];
              const topRepos = repos
                .sort((a, b) => b.stargazers_count - a.stargazers_count)
                .slice(0, 2);

              const profileData = {
                username: data.login,
                name: data.name || data.login,
                bio:
                  data.bio || memberDetails[username]?.position || "Developer",
                imageUrl: data.avatar_url,
                github: data.html_url,
                followers: data.followers,
                following: data.following,
                publicRepos: data.public_repos,
                createdAt: data.created_at,
                yearsOnGithub: calculateYearsAndDaysSince(data.created_at),
                location: data.location || "Kenya",
                topRepos,
                ...memberDetails[username],
              };

              console.log(`Fetched profile for ${username}:`, profileData);
              return profileData;
            } catch (error) {
              console.error(`Error fetching ${username}:`, error);
              throw error;
            }
          }),
        );
        setProfiles(profilesData);
        console.log("All profiles data:", profilesData);

        if (profilesData.length > 0) setActiveMember(profilesData[0]);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching GitHub profiles:", err);
      } finally {
        setLoading(false);
      }
    };

    if (githubUsernames.length > 0) fetchGitHubProfiles();
  }, []);

  const selectMember = (profile) => setActiveMember(profile);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-700 border-t-blue-400 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading team members...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center p-8 bg-gray-900 rounded-xl shadow-lg max-w-md">
          <div className="text-red-500 mb-4">⚠️</div>
          <h3 className="text-xl font-semibold mb-2">Error</h3>
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className="max-h-[calc(90vh-4rem)] relative bg-black text-white overflow-y-auto">
      <VantaNetBG />

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="relative text-center mt-16 mb-16 h-24 sm:h-28 flex-shrink-0">
          <h2
            className="absolute inset-0 flex items-center justify-center text-7xl sm:text-8xl md:text-9xl
            font-extrabold text-white/8 uppercase tracking-widest pointer-events-none select-none"
          >
            Experts
          </h2>
          <div className="relative z-10">
            <h3 className="text-gray-400 text-3xl md:text-4xl mb-4 tracking-widest backdrop-blur-sm inline-block px-3 py-1 rounded-3xl">
              Our Team
            </h3>
          </div>
        </div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto relative z-10">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="sticky top-8 space-y-6">
              <h3 className="text-lg font-semibold text-blue-300 mb-4">
                Team Members
              </h3>
              <div className="space-y-4">
                {profiles
                  .filter((p) => p.username !== activeMember?.username)
                  .map((profile) => (
                    <button
                      key={profile.username}
                      onClick={() => selectMember(profile)}
                      className="w-full flex items-center gap-4 p-4 bg-gray-900/50 rounded-xl shadow-lg border border-gray-700 hover:border-blue-400 transition-all"
                    >
                      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-700">
                        <img
                          src={profile.imageUrl}
                          alt={profile.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-left flex-1">
                        <h4 className="font-semibold">{profile.name}</h4>
                        <p className="text-sm text-gray-400 truncate">
                          {profile.position}
                        </p>
                        {profile.expertise?.length > 0 && (
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs px-2 py-1 bg-blue-300/10 text-blue-400 rounded">
                              {profile.expertise[0]}
                            </span>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          </div>

          {/* Active Member */}
          <div className="lg:w-3/4">
            {activeMember && (
              <div className="bg-gray-900/70 backdrop-blur-md rounded-2xl shadow-xl border border-gray-700 max-h-[80vh] flex flex-col">
                {/* Header */}
                <div className="p-8 border-b border-gray-700 shrink-0">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex-shrink-0">
                      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-800 shadow-lg">
                        <img
                          src={activeMember.imageUrl}
                          alt={activeMember.login}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="mt-8">
                          <h2 className="text-3xl font-bold">
                            {activeMember.name}
                          </h2>
                          <p className="text-xl text-blue-300 font-semibold mt-1">
                            {activeMember.bio}
                          </p>
                        </div>
                        <div className="flex gap-3">
                          {activeMember.github && (
                            <a
                              href={activeMember.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                            >
                              <Github className="w-5 h-5 text-blue-300" />
                            </a>
                          )}
                          {activeMember.linkedin && (
                            <a
                              href={activeMember.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                            >
                              <Linkedin className="w-5 h-5 text-blue-300" />
                            </a>
                          )}
                          {activeMember.email && (
                            <a
                              href={`mailto:${activeMember.email}`}
                              className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                            >
                              <Mail className="w-5 h-5 text-blue-300" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="flex flex-wrap gap-6 mt-6 text-gray-400">
                        {activeMember.location && (
                          <div className="flex items-center gap-2">
                            <MapPinCheck className="w-4 h-4" />
                            <span>{activeMember.location}</span>
                          </div>
                        )}
                        {activeMember.yearsAtCompany && (
                          <div className="flex items-center gap-2">
                            <Calendar1 className="w-4 h-4" />
                            <span>
                              {activeMember.yearsAtCompany} years at Nyota
                            </span>
                          </div>
                        )}
                        {activeMember.publicRepos && (
                          <div className="flex items-center gap-2">
                            <Code2 className="w-4 h-4" />
                            <span>{activeMember.publicRepos} public repos</span>
                          </div>
                        )}
                      </div>

                      {/* Expertise Tags */}
                      {activeMember.expertise?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-6">
                          {activeMember.expertise.map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-300/20 text-blue-400 rounded-full text-sm font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 overflow-y-auto max-h-[600px]">
                  <div className="lg:col-span-2 space-y-8">
                    {/* Bio */}
                    {activeMember.bio && (
                      <div>
                        <h3 className="text-xl font-semibold text-blue-300 mb-4">
                          About
                        </h3>
                        <p className="text-gray-300 leading-relaxed">
                          {activeMember.bio}
                        </p>
                      </div>
                    )}

                    {/* Key Contributions */}
                    {(activeMember.contributions || []).length > 0 && (
                      <div>
                        <h3 className="text-xl font-semibold text-blue-300 mb-4 flex items-center gap-2">
                          <Award className="w-5 h-5" /> Key Contributions
                        </h3>
                        <ul className="space-y-3">
                          {activeMember.contributions.map((c, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
                              <span className="text-gray-300">{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Right Column */}
                  <div className="space-y-8">
                    {/* GitHub Stats */}
                    <div className="bg-gray-800 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-blue-300 mb-6">
                        GitHub Stats
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-gray-900 rounded-lg border border-gray-700">
                          <p className="text-2xl font-bold">
                            {activeMember.followers || 0}
                          </p>
                          <p className="text-sm text-gray-400">Followers</p>
                        </div>
                        <div className="text-center p-4 bg-gray-900 rounded-lg border border-gray-700">
                          <p className="text-2xl font-bold">
                            {activeMember.following || 0}
                          </p>
                          <p className="text-sm text-gray-400">Following</p>
                        </div>
                        <div className="text-center p-4 bg-gray-900 rounded-lg border border-gray-700">
                          <p className="text-2xl font-bold">
                            {activeMember.publicRepos || 0}
                          </p>
                          <p className="text-sm text-gray-400">Repos</p>
                        </div>
                        <div className="text-center p-4 bg-gray-900 rounded-lg border border-gray-700">
                          <p className="text-sm font-semibold">
                            {getYearsOnGithubLabel(activeMember)}
                          </p>
                          {/* <p className="text-sm text-gray-400">
                            Years on GitHub
                          </p> */}
                        </div>
                      </div>
                    </div>

                    {/* Contact */}
                    {/* {(activeMember.email || activeMember.website) && (
                      <div className="bg-gray-800 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-cyan-400 mb-4">
                          Contact
                        </h3>
                        <div className="space-y-3">
                          {activeMember.email && (
                            <a
                              href={`mailto:${activeMember.email}`}
                              className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg hover:bg-cyan-900 transition-colors"
                            >
                              <Mail className="w-5 h-5 text-cyan-400" />
                              <span>{activeMember.email}</span>
                            </a>
                          )}
                          {activeMember.website && (
                            <a
                              href={activeMember.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg hover:bg-cyan-900 transition-colors"
                            >
                              <ExternalLink className="w-5 h-5 text-cyan-400" />
                              <span>Visit Website</span>
                            </a>
                          )}
                        </div>
                      </div>
                    )} */}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile */}
        <div className="mt-12 lg:hidden relative z-10">
          <h3 className="text-xl font-semibold text-cyan-400 mb-6">
            Team Members
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {profiles.map((profile) => (
              <button
                key={profile.username}
                onClick={() => selectMember(profile)}
                className={`p-4 rounded-xl border transition-all ${
                  activeMember?.username === profile.username
                    ? "border-cyan-400 shadow-lg bg-gray-900"
                    : "border-gray-700 bg-gray-800 hover:border-cyan-400"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-700">
                    <img
                      src={profile.imageUrl}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-left flex-1">
                    <h4 className="font-semibold">{profile.name}</h4>
                    <p className="text-sm text-gray-400">{profile.position}</p>
                    {profile.expertise?.length > 0 && (
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs px-2 py-1 bg-cyan-900 text-cyan-400 rounded">
                          {profile.expertise[0]}
                        </span>
                      </div>
                    )}
                  </div>
                  {activeMember?.username === profile.username && (
                    <ChevronRight className="w-5 h-5 text-cyan-400" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;
