import React from "react";
import Header from "../components/Header";
import { CheckCircle, Info, ClipboardList, MessageSquare } from "lucide-react";

export default function Instructions() {
  return (
    <div className="p-4 sm:p-10 min-h-screen flex flex-col items-center ">
      {/* Page Header */}
      <Header title={"Instructions for Mentors"} />

      {/* Hero Section */}
      <div className="text-center max-w-2xl mt-6">
        <p className="text-gray-700 text-lg sm:text-xl">
          Welcome, Mentor Your guidance shapes future developers. Follow these
          instructions to ensure an effective mentoring experience.
        </p>
      </div>

      {/* Instructions Section */}
      <div className="mt-8 grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 max-w-5xl w-full">
        {/* Instruction Card 1 */}
        <div className="bg-white shadow-md rounded-xl p-6 border flex items-start gap-4">
          <CheckCircle className="text-green-500 w-8 h-8" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Thorough Code Review
            </h3>
            <p className="text-gray-600 text-sm">
              Carefully review each submission, checking for logic, readability,
              and adherence to best practices.
            </p>
          </div>
        </div>

        {/* Instruction Card 2 */}
        <div className="bg-white shadow-md rounded-xl p-6 border flex items-start gap-4">
          <ClipboardList className="text-blue-500 w-8 h-8" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Provide Constructive Feedback
            </h3>
            <p className="text-gray-600 text-sm">
              Offer clear and actionable feedback to help mentees grow in their
              coding skills.
            </p>
          </div>
        </div>

        {/* Instruction Card 3 */}
        <div className="bg-white shadow-md rounded-xl p-6 border flex items-start gap-4">
          <Info className="text-yellow-500 w-8 h-8" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Follow Project Guidelines
            </h3>
            <p className="text-gray-600 text-sm">
              Ensure all submissions adhere to the project requirements and
              maintain coding standards.
            </p>
          </div>
        </div>

        {/* Instruction Card 4 */}
        <div className="bg-white shadow-md rounded-xl p-6 border flex items-start gap-4">
          <MessageSquare className="text-purple-500 w-8 h-8" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Engage with Mentees
            </h3>
            <p className="text-gray-600 text-sm">
              Encourage discussion, answer queries, and create a supportive
              learning environment.
            </p>
          </div>
        </div>
      </div>

  
    </div>
  );
}
