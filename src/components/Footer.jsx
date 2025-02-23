import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const teamMembers = [
  { name: 'Ashok Suthar', linkedin: 'https://www.linkedin.com/in/alicejohnson', email: 'alice@example.com' },
  { name: 'Priyanshu Valiya', linkedin: 'https://www.linkedin.com/in/bobsmith', email: 'bob@example.com' },
  { name: 'Vasu Vaghasia', linkedin: 'https://www.linkedin.com/in/charliedavis', email: 'charlie@example.com' },
  { name: 'Veer Patel', linkedin: 'https://www.linkedin.com/in/dianalee', email: 'diana@example.com' }
];

export default function Footer() {
  return (
    <footer className="w-full py-10 bg-gray-900 text-white mt-10 border-t border-gray-700 text-sm">
      <div className="container mx-auto px-6 max-w-5xl text-center">
        <h2 className="text-4xl font-bold text-blue-400">DUHacks 4.0 - Hackathon '25</h2>
        <h3 className="text-2xl font-semibold mt-2">Team Name - CodeVortex</h3>
      
        <div className="mt-8 flex flex-wrap md:flex-nowrap gap-36 justify-between">
          {/* Meet the Team Section */}
          <div className="w-full md:w-1/2 p-6 -mx-24 border border-blue-400 rounded-2xl bg-gray-800 shadow-lg">
            <h4 className="text-2xl font-semibold text-blue-400">Meet the Team</h4>
            <div className="mt-4 grid grid-cols-2 gap-4 text-gray-300">
              {teamMembers.map((member, index) => (
                <div key={index} className="p-3 border border-gray-600 rounded-xl bg-gray-900 shadow-md">
                  <p className="font-medium text-base text-white">{member.name}</p>
                  <div className="flex justify-center space-x-3 mt-1">
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 flex items-center space-x-1">
                      <FaLinkedin size={22} /> <span>LinkedIn</span>
                    </a>
                    <a href={`mailto:${member.email}`} className="hover:text-blue-400 text-base flex items-center space-x-1">
                      ✉️ <span>Email</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Project & Tech Stack */}
          <div className="w-full md:w-1/2 -mx-24 p-6 border border-blue-400 rounded-2xl bg-gray-800 shadow-lg flex flex-col justify-between">
            <div>
              <h4 className="text-2xl font-semibold text-blue-400">Project Repository</h4>
              <a href="https://github.com/team-codevortex/project" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-1 text-white hover:underline mt-3">
                <FaGithub size={26} /> <span>GitHub - CodeVortex</span>
              </a>
            </div>
            <div className="mt-6 text-gray-400">
              <p className="text-gray-400 text-xl italic mb-8">"We try to Provide best solutions with dedication"</p>
              <h4 className="text-xl font-semibold text-white">Built with Passion ❤️</h4>
              <p className="mt-1">Tech Stack: React, Next.js, Node.js, Supabase, AI Integration</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
