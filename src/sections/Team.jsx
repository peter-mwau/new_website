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
} from "lucide-react";
import React, { useEffect, useState } from "react";
import VantaDotsBG from "../backgrounds/VantaDotsBg";

function Team() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeMember, setActiveMember] = useState(null);

  const githubUsernames = ["peter-mwau", "NORMTOSH", "Mickmacha", "AdoyoClifford"];

  const memberDetails = {
    // include the same memberDetails object you had before
  };

  useEffect(() => {
    const fetchGitHubProfiles = async () => {
      try {
        setLoading(true);
        const profilesData = await Promise.all(
          githubUsernames.map(async (username) => {
            const response = await fetch(`https://api.github.com/users/${username}`);
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
          })
        );
        setProfiles(profilesData);
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
          <div className="w-12 h-12 border-4 border-gray-700 border-t-cyan-400 rounded-full animate-spin mx-auto"></div>
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
    <div className="min-h-screen relative bg-black text-white overflow-hidden">
      <VantaDotsBG />

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 relative z-10">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-cyan-900 rounded-full">
            <span className="text-sm font-medium text-cyan-400">Our Team</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Meet Our Experts
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A team of passionate professionals dedicated to delivering exceptional solutions
          </p>
        </div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto relative z-10">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="sticky top-8 space-y-6">
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">Team Members</h3>
              <div className="space-y-4">
                {profiles
                  .filter((p) => p.username !== activeMember?.username)
                  .map((profile) => (
                    <button
                      key={profile.username}
                      onClick={() => selectMember(profile)}
                      className="w-full flex items-center gap-4 p-4 bg-gray-900 rounded-xl shadow-lg border border-gray-700 hover:border-cyan-400 transition-all"
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
                        <p className="text-sm text-gray-400 truncate">{profile.position}</p>
                        {profile.expertise?.length > 0 && (
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs px-2 py-1 bg-cyan-900 text-cyan-400 rounded">
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
              <div className="bg-gray-900/70 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-gray-700">
                {/* Header */}
                <div className="p-8 border-b border-gray-700">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex-shrink-0">
                      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-800 shadow-lg">
                        <img
                          src={activeMember.imageUrl}
                          alt={activeMember.fullName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h2 className="text-3xl font-bold">{activeMember.fullName}</h2>
                          <p className="text-xl text-cyan-400 font-semibold mt-1">{activeMember.position}</p>
                        </div>
                        <div className="flex gap-3">
                          {activeMember.github && (
                            <a
                              href={activeMember.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                            >
                              <Github className="w-5 h-5 text-cyan-400" />
                            </a>
                          )}
                          {activeMember.linkedin && (
                            <a
                              href={activeMember.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                            >
                              <Linkedin className="w-5 h-5 text-cyan-400" />
                            </a>
                          )}
                          {activeMember.email && (
                            <a
                              href={`mailto:${activeMember.email}`}
                              className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                            >
                              <Mail className="w-5 h-5 text-cyan-400" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="flex flex-wrap gap-6 mt-6 text-gray-400">
                        {activeMember.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{activeMember.location}</span>
                          </div>
                        )}
                        {activeMember.yearsAtCompany && (
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{activeMember.yearsAtCompany} years at Nyota</span>
                          </div>
                        )}
                        {activeMember.publicRepos && (
                          <div className="flex items-center gap-2">
                            <Code className="w-4 h-4" />
                            <span>{activeMember.publicRepos} public repos</span>
                          </div>
                        )}
                      </div>

                      {/* Expertise Tags */}
                      {activeMember.expertise?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-6">
                          {activeMember.expertise.map((skill, index) => (
                            <span key={index} className="px-3 py-1 bg-cyan-900 text-cyan-400 rounded-full text-sm font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-8">
                    {/* Bio */}
                    {activeMember.bio && (
                      <div>
                        <h3 className="text-xl font-semibold text-cyan-400 mb-4">About</h3>
                        <p className="text-gray-300 leading-relaxed">{activeMember.bio}</p>
                      </div>
                    )}

                    {/* Key Contributions */}
                    {(activeMember.contributions || []).length > 0 && (
                      <div>
                        <h3 className="text-xl font-semibold text-cyan-400 mb-4 flex items-center gap-2">
                          <Award className="w-5 h-5" /> Key Contributions
                        </h3>
                        <ul className="space-y-3">
                          {activeMember.contributions.map((c, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                              <span className="text-gray-300">{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Right Column */}
                  <div className="space-y-8">
                    {/* Skills */}
                    {activeMember.skills?.length > 0 && (
                      <div className="bg-gray-800 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-cyan-400 mb-6">Skills</h3>
                        <div className="space-y-5">
                          {activeMember.skills.map((skill, index) => (
                            <div key={index} className="space-y-2">
                              <div className="flex justify-between">
                                <span className="font-medium text-gray-300">{skill.name}</span>
                                <span className="text-sm text-gray-400">{skill.level}%</span>
                              </div>
                              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                                  style={{ width: `${skill.level}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* GitHub Stats */}
                    <div className="bg-gray-800 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-cyan-400 mb-6">GitHub Stats</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-gray-900 rounded-lg border border-gray-700">
                          <p className="text-2xl font-bold">{activeMember.followers || 0}</p>
                          <p className="text-sm text-gray-400">Followers</p>
                        </div>
                        <div className="text-center p-4 bg-gray-900 rounded-lg border border-gray-700">
                          <p className="text-2xl font-bold">{activeMember.following || 0}</p>
                          <p className="text-sm text-gray-400">Following</p>
                        </div>
                        <div className="text-center p-4 bg-gray-900 rounded-lg border border-gray-700">
                          <p className="text-2xl font-bold">{activeMember.publicRepos || 0}</p>
                          <p className="text-sm text-gray-400">Repositories</p>
                        </div>
                        <div className="text-center p-4 bg-gray-900 rounded-lg border border-gray-700">
                          <p className="text-2xl font-bold">{activeMember.yearsAtCompany || 0}</p>
                          <p className="text-sm text-gray-400">Years</p>
                        </div>
                      </div>
                    </div>

                    {/* Contact */}
                    {(activeMember.email || activeMember.website) && (
                      <div className="bg-gray-800 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-cyan-400 mb-4">Contact</h3>
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
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile */}
        <div className="mt-12 lg:hidden relative z-10">
          <h3 className="text-xl font-semibold text-cyan-400 mb-6">Team Members</h3>
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
