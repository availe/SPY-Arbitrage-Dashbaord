"use client";

import React from "react";

interface Project {
  name: string;
  description: string;
}

interface TeamMember {
  name: string;
  major: string;
  graduation: string;
  university: string;
  linkedIn: string;
  github: string;
  skills: string;
  technologies: string;
  projects: Project[];
  funFact: string;
  website?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Rafael Diaz",
    major: "Computer Science Major",
    graduation: "December 2024",
    university: "College of Staten Island",
    linkedIn: "https://www.linkedin.com/in/rafael-diaz1/",
    github: "https://github.com/availe",
    website: "https://www.availe.io",
    skills: "Frontend Development",
    technologies: "Next.js",
    projects: [
      { name: "Project A", description: "Sample Text" },
      { name: "Project B", description: "Sample Text" },
    ],
    funFact: "Sample Text",
  },
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
    name: "Robert Neagu",
    major: "Computer Information Systems Major",
    graduation: "June 2025",
    university: "Baruch College",
    linkedIn: "https://www.linkedin.com/in/neagurobert/",
    github: "https://github.com/robotneagu",
    skills: "Data Analytics",
    technologies: "Next.js",
    projects: [
      { name: "Project A", description: "Sample Text" },
      { name: "Project B", description: "Sample Text" },
    ],
    funFact: "Sample Text",
  },
];

const shortenUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "");

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <h1 className="mb-8 text-center text-4xl font-bold text-gray-800">Meet The Team</h1>
      <p className="mx-auto mb-10 max-w-2xl text-center text-gray-600">
        We’re a team of passionate students bringing innovative ideas to life. Get to know the minds behind our projects.
      </p>

      <div className="flex flex-col laptop:flex-row justify-between gap-8">
        {teamMembers.map((member) => {
          const {
            name,
            major,
            graduation,
            university,
            linkedIn,
            github,
            website,
            skills,
            technologies,
            projects,
            funFact,
          } = member;

          return (
            <div
              key={name}
              onClick={() => window.open(linkedIn, "_blank")}
              className="flex-1 cursor-pointer rounded-lg bg-white p-6 shadow-lg transition-transform hover:scale-105 hover:bg-gray-50 hover:shadow-2xl"
              title="Click to open LinkedIn profile"
              role="link"
              tabIndex={0}
            >
              <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
              <div className="font-medium text-gray-600">{major}</div>
              <div className="mt-2 text-gray-700">
                <strong>Graduation:</strong> {graduation}
              </div>
              <div className="text-gray-700">
                <strong>University:</strong> {university}
              </div>

              <div className="mt-4 space-y-2 text-gray-700">
                <div>
                  <strong>GitHub:</strong>{" "}
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1 text-blue-500 hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {shortenUrl(github)}
                  </a>
                </div>
                {website && (
                  <div>
                    <strong>Website:</strong>{" "}
                    <a
                      href={website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 text-blue-500 hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {shortenUrl(website)}
                    </a>
                  </div>
                )}
              </div>

              <div className="mt-4 text-gray-700">
                <strong>Skills:</strong> {skills}
              </div>
              <div className="text-gray-700">
                <strong>Technologies:</strong> {technologies}
              </div>

              <div className="mt-4 text-gray-700">
                <strong>Notable Projects:</strong>
                <ul className="list-disc pl-6">
                  {projects.map(({ name, description }) => (
                    <li key={name}>
                      <strong>{name}</strong>: {description}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 text-gray-700">
                <strong>Fun Fact:</strong> {funFact}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AboutPage;
