import {
  Github,
  Linkedin,
  Mail,
  Award,
  Briefcase,
  Calendar,
  MapPin,
  Code,
  Star,
  GitBranch,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import React, { useEffect, useState } from "react";

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
      fullName: "Peter Mwau",
      position: "Blockchain & Fullstack Engineer",
      expertise: ["React", "Node.js", "Blockchain", "DevOps"],
      bio: "5+ years experience building scalable web applications. Leads development team with focus on cutting-edge technologies and best practices.",
      contributions: [
        "Architected core systems",
        "Led team of 8 developers",
        "Optimized CI/CD pipelines",
      ],
      yearsAtCompany: 3,
      location: "Nairobi, Kenya",
      email: "peter@nyota.dev",
      linkedin: "https://linkedin.com/in/petermwau",
      website: "https://petermwauportfolio.netlify.app/",
      skills: [
        { name: "Solidity", level: 85 },
        { name: "React", level: 95 },
        { name: "Node.js", level: 90 },
        { name: "TypeScript", level: 88 },
        { name: "AWS", level: 80 },
      ],
    },
    NORMTOSH: {
      fullName: "Norman Tosh",
      position: "Senior Backend Engineer",
      expertise: ["Python", "Django", "PostgreSQL", "Microservices"],
      bio: "Specializes in building robust backend systems and APIs. Focuses on performance optimization and database architecture.",
      contributions: [
        "Built payment processing system",
        "Implemented microservices",
        "Reduced API latency by 60%",
      ],
      yearsAtCompany: 2,
      location: "Mombasa, Kenya",
      email: "norman@nyota.dev",
      linkedin: "https://linkedin.com/in/normantosh",
      skills: [
        { name: "Python", level: 98 },
        { name: "Django", level: 92 },
        { name: "PostgreSQL", level: 90 },
        { name: "Docker", level: 88 },
      ],
    },
    Mickmacha: {
      fullName: "Michael Macharia",
      position: "AI/ML Engineer & Frontend Developer",
      expertise: ["React", "TypeScript", "UI/UX", "Performance"],
      bio: "Crafts beautiful, performant user interfaces with focus on user experience and accessibility standards.",
      contributions: [
        "Designed component library",
        "Improved Core Web Vitals",
        "Led accessibility initiatives",
      ],
      yearsAtCompany: 4,
      location: "Nairobi, Kenya",
      email: "michael@nyota.dev",
      linkedin: "https://linkedin.com/in/michaelmacharia",
      skills: [
        { name: "React", level: 96 },
        { name: "TypeScript", level: 94 },
        { name: "CSS/SCSS", level: 92 },
        { name: "Web Performance", level: 90 },
      ],
    },
    AdoyoClifford: {
      fullName: "Clifford Adoyo",
      position: "Android, DevOps & Cloud Specialist",
      expertise: ["AWS", "Kubernetes", "Terraform", "CI/CD"],
      bio: "Ensures smooth deployments and maintains cloud infrastructure. Focuses on automation and system reliability.",
      contributions: [
        "Reduced deployment time by 80%",
        "Implemented monitoring",
        "Cut cloud costs by 30%",
      ],
      yearsAtCompany: 2,
      location: "Kisumu, Kenya",
      email: "clifford@nyota.dev",
      linkedin: "https://linkedin.com/in/cliffordadoyo",
      skills: [
        { name: "AWS", level: 92 },
        { name: "Kubernetes", level: 88 },
        { name: "Terraform", level: 90 },
        { name: "Docker", level: 95 },
      ],
    },
  };

  useEffect(() => {
    const fetchGitHubProfiles = async () => {
      try {
        setLoading(true);
        const profilesData = await Promise.all(
          githubUsernames.map(async (username) => {
            const response = await fetch(
              `https://api.github.com/users/${username}`,
            );
            if (!response.ok) throw new Error(`Failed to fetch ${username}`);
            const data = await response.json();

            const reposResponse = await fetch(data.repos_url);
            const repos = reposResponse.ok ? await reposResponse.json() : [];
            const topRepos = repos
              .sort((a, b) => b.stargazers_count - a.stargazers_count)
              .slice(0, 2);

            return {
              username: data.login,
              name: data.name || data.login,
              role: data.bio || "Developer",
              imageUrl: data.avatar_url,
              github: data.html_url,
              followers: data.followers,
              following: data.following,
              publicRepos: data.public_repos,
              location: data.location || "Kenya",
              topRepos,
              ...memberDetails[username],
            };
          }),
        );
        setProfiles(profilesData);
        // Set first member as active by default
        if (profilesData.length > 0) {
          setActiveMember(profilesData[0]);
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching GitHub profiles:", err);
      } finally {
        setLoading(false);
      }
    };

    if (githubUsernames.length > 0) {
      fetchGitHubProfiles();
    }
  }, []);

  const selectMember = (profile) => {
    setActiveMember(profile);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading team members...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
          <div className="text-red-500 mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Error</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-blue-50 rounded-full">
            <span className="text-sm font-medium text-blue-700">Our Team</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Meet Our Experts
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A team of passionate professionals dedicated to delivering
            exceptional solutions
          </p>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          {/* Sidebar - Other Team Members */}
          <div className="lg:w-1/4">
            <div className="sticky top-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Team Members
              </h3>
              <div className="space-y-4">
                {profiles
                  .filter((p) => p.username !== activeMember?.username)
                  .map((profile) => (
                    <button
                      key={profile.username}
                      onClick={() => selectMember(profile)}
                      className="w-full flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 hover:border-blue-200"
                    >
                      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-200">
                        <img
                          src={profile.imageUrl}
                          alt={profile.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-left flex-1">
                        <h4 className="font-semibold text-gray-900">
                          {profile.name}
                        </h4>
                        <p className="text-sm text-gray-500 truncate">
                          {profile.position}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded">
                            {profile.expertise[0]}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
              </div>

              {/* Team Stats */}
              <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <h4 className="font-semibold text-gray-800 mb-4">Team Stats</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Total Experience
                    </span>
                    <span className="font-semibold text-gray-900">
                      {profiles.reduce((sum, p) => sum + p.yearsAtCompany, 0)}+
                      years
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Public Repos</span>
                    <span className="font-semibold text-gray-900">
                      {profiles.reduce((sum, p) => sum + p.publicRepos, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Total Followers
                    </span>
                    <span className="font-semibold text-gray-900">
                      {profiles.reduce((sum, p) => sum + p.followers, 0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Active Member Details */}
          <div className="lg:w-3/4">
            {activeMember && (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                {/* Header Section */}
                <div className="p-8 border-b border-gray-100">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                        <img
                          src={activeMember.imageUrl}
                          alt={activeMember.fullName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Basic Info */}
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h2 className="text-3xl font-bold text-gray-900">
                            {activeMember.fullName}
                          </h2>
                          <p className="text-xl text-blue-600 font-semibold mt-1">
                            {activeMember.position}
                          </p>
                        </div>
                        <div className="flex gap-3">
                          <a
                            href={activeMember.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                            title="GitHub"
                          >
                            <Github className="w-5 h-5 text-gray-700" />
                          </a>
                          {activeMember.linkedin && (
                            <a
                              href={activeMember.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                              title="LinkedIn"
                            >
                              <Linkedin className="w-5 h-5 text-gray-700" />
                            </a>
                          )}
                          <a
                            href={`mailto:${activeMember.email}`}
                            className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                            title="Email"
                          >
                            <Mail className="w-5 h-5 text-gray-700" />
                          </a>
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="flex flex-wrap gap-6 mt-6">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-700">
                            {activeMember.location}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-700">
                            {activeMember.yearsAtCompany} years at Nyota
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Code className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-700">
                            {activeMember.publicRepos} public repos
                          </span>
                        </div>
                      </div>

                      {/* Expertise Tags */}
                      <div className="flex flex-wrap gap-2 mt-6">
                        {activeMember.expertise.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">
                      {/* Bio */}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                          About
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {activeMember.bio}
                        </p>
                      </div>

                      {/* Key Contributions */}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <Award className="w-5 h-5 text-blue-600" />
                          Key Contributions
                        </h3>
                        <ul className="space-y-3">
                          {activeMember?.contribributions?.map(
                            (contribution, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-3"
                              >
                                <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                                <span className="text-gray-700">
                                  {contribution}
                                </span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>

                      {/* GitHub Repos */}
                      {activeMember.topRepos &&
                        activeMember.topRepos.length > 0 && (
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                              Top Repositories
                            </h3>
                            <div className="space-y-3">
                              {activeMember.topRepos.map((repo, index) => (
                                <a
                                  key={index}
                                  href={repo.html_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                                >
                                  <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                      <h4 className="font-semibold text-gray-900">
                                        {repo.name}
                                      </h4>
                                      {repo.description && (
                                        <p className="text-sm text-gray-600 mt-1">
                                          {repo.description}
                                        </p>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-3 ml-4">
                                      <div className="flex items-center gap-1 text-gray-600">
                                        <Star className="w-4 h-4" />
                                        <span className="text-sm font-medium">
                                          {repo.stargazers_count}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-1 text-gray-600">
                                        <GitBranch className="w-4 h-4" />
                                        <span className="text-sm font-medium">
                                          {repo.forks_count}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>

                    {/* Right Column - Skills & Stats */}
                    <div className="space-y-8">
                      {/* Skills */}
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-6">
                          Skills
                        </h3>
                        <div className="space-y-5">
                          {activeMember.skills.map((skill, index) => (
                            <div key={index} className="space-y-2">
                              <div className="flex justify-between">
                                <span className="font-medium text-gray-800">
                                  {skill.name}
                                </span>
                                <span className="text-sm text-gray-600">
                                  {skill.level}%
                                </span>
                              </div>
                              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                                  style={{ width: `${skill.level}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* GitHub Stats */}
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-6">
                          GitHub Stats
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                            <p className="text-2xl font-bold text-gray-900">
                              {activeMember.followers}
                            </p>
                            <p className="text-sm text-gray-600">Followers</p>
                          </div>
                          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                            <p className="text-2xl font-bold text-gray-900">
                              {activeMember.following}
                            </p>
                            <p className="text-sm text-gray-600">Following</p>
                          </div>
                          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                            <p className="text-2xl font-bold text-gray-900">
                              {activeMember.publicRepos}
                            </p>
                            <p className="text-sm text-gray-600">
                              Repositories
                            </p>
                          </div>
                          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                            <p className="text-2xl font-bold text-gray-900">
                              {activeMember.yearsAtCompany}
                            </p>
                            <p className="text-sm text-gray-600">Years</p>
                          </div>
                        </div>
                      </div>

                      {/* Contact */}
                      <div className="bg-blue-50 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                          Contact
                        </h3>
                        <div className="space-y-3">
                          <a
                            href={`mailto:${activeMember.email}`}
                            className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-blue-100 transition-colors"
                          >
                            <Mail className="w-5 h-5 text-blue-600" />
                            <span className="text-gray-800">
                              {activeMember.email}
                            </span>
                          </a>
                          {activeMember.website && (
                            <a
                              href={activeMember.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-blue-100 transition-colors"
                            >
                              <ExternalLink className="w-5 h-5 text-blue-600" />
                              <span className="text-gray-800">
                                Visit Website
                              </span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile View - Team Cards */}
        <div className="mt-12 lg:hidden">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Team Members
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {profiles.map((profile) => (
              <button
                key={profile.username}
                onClick={() => selectMember(profile)}
                className={`p-4 bg-white rounded-xl shadow-sm border transition-all ${
                  activeMember?.username === profile.username
                    ? "border-blue-500 shadow-md"
                    : "border-gray-200 hover:border-blue-300"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200">
                    <img
                      src={profile.imageUrl}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-left flex-1">
                    <h4 className="font-semibold text-gray-900">
                      {profile.name}
                    </h4>
                    <p className="text-sm text-gray-500">{profile.position}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded">
                        {profile.expertise[0]}
                      </span>
                    </div>
                  </div>
                  {activeMember?.username === profile.username && (
                    <ChevronRight className="w-5 h-5 text-blue-600" />
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
