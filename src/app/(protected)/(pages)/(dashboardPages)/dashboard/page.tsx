"use client";

import React, { useEffect, useState } from "react";
import { getAllProjects } from "@/actions/project";
import NotFound from "@/components/global/not-found";
import Projects from "@/components/global/projects";
import ProjectCard from "@/components/global/project-card";

const DashboardPage = () => {
  const [allProjects, setAllProjects] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const projectsData = await getAllProjects();
      setAllProjects(projectsData);
      setLoading(false);
    };
    fetchProjects();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="w-full flex flex-col gap-6 relative md:p-0 p-4">
      <div className="flex flex-col-reverse items-start w-full gap-6 sm:flex-row sm:justify-between sm:items-center">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-semibold dark:text-primary backdrop-blur-lg">
            Projects
          </h1>
          <p className="text-base font-normal dark:text-secondary">
            All of your work
          </p>
        </div>
      </div>
      
      {loading ? (
        <div>Loading projects...</div> // Simple loading indicator
      ) : allProjects?.data && allProjects.data.length > 0 ? (
        <Projects projects={allProjects.data} />
      ) : (
        <NotFound />
      )}

      {/* {projects}*/}
    </div>
  );
};

export default DashboardPage;
