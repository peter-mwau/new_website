import { Github, Loader } from "lucide-react";
import React, { useEffect, useState } from "react";

function Team() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // List of GitHub usernames to fetch
  const githubUsernames = [
    "peter-mwau",
    "NORMTOSH",
    "Mickmacha",
    "AdoyoClifford",
  ];

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
            return {
              name: data.name || data.login,
              role: data.bio || "Developer",
              imageUrl: data.avatar_url,
              github: data.html_url,
              followers: data.followers,
              publicRepos: data.public_repos,
              location: data.location || "Not specified",
            };
          }),
        );
        setProfiles(profilesData);
        setError(null);
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

  if (loading) {
    return (
      <div className="h-[70vh] bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 flex flex-col justify-center items-center">
        <Loader className="animate-spin" size={48} />
        <p className="mt-4 text-lg">Loading team members...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[70vh] bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 flex flex-col justify-center items-center">
        <p className="text-red-600 font-semibold">Error: {error}</p>
      </div>
    );
  }

  return (
    <div
      className="h-auto min-h-[70vh] flex flex-col justify-center items-center py-12"
      style={{
        backgroundImage: "url(/team.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <h2 className="text-4xl font-bold text-white mb-12">Our Team</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {profiles.map((profile, index) => (
          <div
            key={index}
            className="backdrop-blur-lg bg-white/20 border border-white/30 p-6 rounded-xl shadow-lg w-80 hover:shadow-2xl hover:bg-white/30 transition-all"
          >
            <img
              src={profile.imageUrl}
              alt={profile.name}
              className="w-40 h-40 rounded-full mx-auto border-4 border-white/50 shadow-md"
            />
            <h2 className="text-2xl font-bold text-center mt-4 text-white drop-shadow-lg">
              {profile.name}
            </h2>
            <p className="text-center text-white/90 font-semibold drop-shadow">
              {profile.role}
            </p>
            <p className="text-center text-white/80 text-sm mt-1">
              📍 {profile.location}
            </p>

            <div className="flex justify-center gap-4 mt-4 text-sm">
              <div className="text-center">
                <p className="font-bold text-lg text-white drop-shadow">
                  {profile.followers}
                </p>
                <p className="text-white/80">Followers</p>
              </div>
              <div className="text-center border-l border-r border-white/30 px-4">
                <p className="font-bold text-lg text-white drop-shadow">
                  {profile.publicRepos}
                </p>
                <p className="text-white/80">Repos</p>
              </div>
            </div>

            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full bg-blue-500/80 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all backdrop-blur-sm"
            >
              <Github size={18} /> View GitHub Profile
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Team;
