import React from "react";

function ProjectCard({ project }) {
  return (
    <div className="relative w-full mb-8 rounded-lg border bg-gradient-to-r from-[#d70466] to-[#ff385c]  hover:shadow-lg hover:scale-[1.02] transition-transform duration-300">
      {/* Header with project title */}
      <div className="px-4 lg:px-8 py-3 lg:py-5">
        <h3 className="text-center text-[#ffffff] text-base lg:text-xl font-bold">
          {project.title || "Untitled Project"}
        </h3>
      </div>

      {/* Project Image */}
      <div className="overflow-hidden border-t-2 ">
        <img
          src={
            project.image || "https://via.placeholder.com/400x225?text=No+Image"
          }
          alt={project.title || "Project Image"}
          className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Project Description */}
      <div className="px-4 lg:px-8 py-4 lg:py-6">
        <p className="text-sm lg:text-base text-gray-300">
          {project.description || "No description available for this project."}
        </p>
      </div>
    </div>
  );
}

export default ProjectCard;
