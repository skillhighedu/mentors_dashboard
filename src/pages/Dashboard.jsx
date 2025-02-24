import React, { useEffect, useState } from "react";
import axios from "../auth/axiosConfig";
import Header from "../components/Header";
import { navigateTo } from "../utils/navigateUtils";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await axios.get("/projectMentoring/getData");
        setProjects(response.data.additional || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="p-4 sm:p-10 min-h-screen flex flex-col items-center">
      <Header title={"Projects"} />
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 w-full max-w-7xl sm:px-0">
        {projects.map((project, index) => {
          const newSolutions = project.solutions?.filter(
            (solution) => solution.reviewState === "REVIEWING"
          ).length;

          return (
            <div
              key={project.id}
              className={`p-5 sm:p-6 text-left rounded-xl shadow-sm hover:shadow-lg transition transform hover:-translate-y-2 border border-gray-100 flex flex-col justify-between
              ${newSolutions > 0 ? "bg-red-100 border-red-400" : "bg-white"}`}
            >
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-gray-900 truncate">
                  <span className="text-primary font-bold mr-2">#{index + 1}.</span>
                  {project.projectName}
                </h2>

                {newSolutions > 0 && (
                  <p className="text-sm sm:text-md text-red-600 font-medium mb-3 sm:mb-4">
                    New {newSolutions} {newSolutions === 1 ? "Solution" : "Solutions"}
                  </p>
                )}
              </div>

              <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a
                  href={project.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex-1 px-4 py-2 sm:px-5 sm:py-3 bg-primary text-white rounded-lg transition font-medium shadow-sm text-center"
                >
                  View Project
                </a>

                <button
                  onClick={() => navigateTo(navigate, "/project_solutions", { project })}
                  className="w-full sm:w-auto flex-1 px-4 py-2 border-1 bg-white border-primary text-primary sm:px-5 sm:py-3 rounded-lg transition font-medium shadow-sm cursor-pointer"
                >
                  Review Solutions
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
