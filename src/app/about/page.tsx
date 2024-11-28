import React from "react";

interface TeamMember {
  name: string;
  major: string;
  graduation: string;
  university: string;
  linkedIn: string;
  github: string;
  skills: string;
  technologies: string;
  projects: { name: string; description: string }[];
  funFact: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Elhaam Bhuiyan",
    major: "Financial Mathematics Major",
    graduation: "May 2025",
    university: "Baruch College",
    linkedIn: "https://www.linkedin.com/in/elo2718/",
    github: "https://github.com/Elo2718",
    skills: "Data Science",
    technologies: "Pandas",
    projects: [
      { name: "Project A", description: "Sample Text." },
      { name: "Project B", description: "Sample Text." },
    ],
    funFact: "Sample Text",
  },
  {
    name: "Rafael Diaz",
    major: "Computer Science Major",
    graduation: "December 2024",
    university: "College of Staten Island",
    linkedIn: "https://www.linkedin.com/in/rafael-diaz1/",
    github: "https://github.com/availe",
    skills: "Frontend Development",
    technologies: "Next.js",
    projects: [
      { name: "Project A", description: "Sample Text" },
      { name: "Project B", description: "Sample Text" },
    ],
    funFact: "Sample Text",
  },
];

const AboutPage: React.FC = () => {
  const getShortenedUrl = (url: string) => {
    // Remove 'https://www.' and 'http://www.' if they exist
    return url.replace(/^https?:\/\/(www\.)?/, "");
  };

  return (
    <div className="px-6 py-8">
      <h1 className="text-3xl font-semibold mb-8 text-center">Meet The Team</h1>

      <div className="flex flex-col md:flex-row justify-between gap-8">
        {teamMembers.map((member) => (
          <div
            key={member.name}
            className="flex-1 bg-white p-6 shadow-lg rounded-lg"
          >
            <h3 className="text-xl font-semibold">{member.name}</h3>
            <div className="font-medium text-gray-600">{member.major}</div>
            <div>
              <strong>Graduation:</strong> {member.graduation}
            </div>
            <div>
              <strong>University:</strong> {member.university}
            </div>
            <div className="mt-2 flex flex-col">
              <a
                href={member.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {getShortenedUrl(member.linkedIn)}
              </a>
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {getShortenedUrl(member.github)}
              </a>
            </div>
            <div className="mt-4">
              <strong>Skills:</strong> {member.skills}
            </div>
            <div>
              <strong>Technologies:</strong> {member.technologies}
            </div>
            <div className="mt-4">
              <strong>Notable Projects:</strong>
              <ul className="list-disc pl-6">
                {member.projects.map((project) => (
                  <li key={project.name}>
                    <strong>{project.name}</strong>: {project.description}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <strong>Fun Fact:</strong> {member.funFact}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;
