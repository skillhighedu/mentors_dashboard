import React, { useEffect, useState } from "react";
import axios from "../auth/axiosConfig";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { motion, AnimatePresence } from "framer-motion";

export default function Questions() {
  const [questions, setQuestions] = useState([]);
  const [answerInputs, setAnswerInputs] = useState({});
  const [openAnswerId, setOpenAnswerId] = useState(null);
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await axios.get("/mentors/course/questions/getQuestions");
        console.log(response.data);
        setQuestions(response.data.additional || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const handleAnswerChange = (id, value) => {
    setAnswerInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleAnswerSubmit = async (id) => {
    try {
      const answer = answerInputs[id];
      if (!answer) return;
      await axios.put(`/mentors/course/questions/sendAnswer/${id}`, { answer });
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q.id === id ? { ...q, answer, isAnswered: true } : q
        )
      );
      setAnswerInputs((prev) => ({ ...prev, [id]: "" }));
      setOpenAnswerId(null);
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  const toggleAnswerInput = (id) => {
    setOpenAnswerId((prev) => (prev === id ? null : id));
  };

  const toggleQuestionExpand = (id) => {
    setExpandedQuestions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="p-4 sm:p-8 min-h-screen bg-white ">
      <Header title={"Questions"} />
      <div className="max-w-6xl mx-auto">
        {questions.length === 0 ? (
          <div className="text-center text-lg text-gray-600 ">
            No questions found.
          </div>
        ) : (
          <div className="space-y-6">
            {questions.map((question) => {
              const isExpanded = expandedQuestions[question.id];
              const maxQuestionLength = 120;
              const displayQuestion = isExpanded
                ? question.question
                : truncateText(question.question, maxQuestionLength);

              return (
                <motion.div
                  key={question.id}
                  className="bg-white  rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between  gap-8">
                    <div className="flex-1">
                      <p className="text-md text-left font-semibold text-black ">
                        {displayQuestion}
                        {question.question.length > maxQuestionLength && (
                          <button
                            onClick={() => toggleQuestionExpand(question.id)}
                            className="ml-2 text-blue-500 hover:text-blue-600 text-sm font-medium"
                          >
                            {isExpanded ? "Show Less" : "Show More"}
                          </button>
                        )}
                      </p>
                      
                      <p className="text-sm text-left text-gray-500 dark:text-gray-400 mt-2">
                        <span className="font-medium">Asked by: </span>
                        {question.studentName || "Unknown"}
                      </p>
                      <p className="text-sm text-left text-gray-500 dark:text-gray-400">
                        <span className="font-medium">Date: </span>
                        {new Date(question.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-3">
                      <div className="flex gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            question.isAnswered
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {question.isAnswered ? "Answered" : "Unanswered"}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            question.isVerified
                              ? "bg-blue-100 text-blue-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {question.isVerified ? "Verified" : "Not Verified"}
                        </span>
                      </div>
                      <button
                        onClick={() => toggleAnswerInput(question.id)}
                        className="px-5 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors text-sm font-medium"
                      >
                        {openAnswerId === question.id ? "Close" : "Answer"}
                      </button>
                    </div>
                  </div>
                  <AnimatePresence>
                    {openAnswerId === question.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                      >
                        <textarea
                          value={answerInputs[question.id] || ""}
                          onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                          placeholder="Type your answer here..."
                          className="w-full p-3 border rounded-lg text-black  bg-white  border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows="5"
                        />
                        <button
                          onClick={() => handleAnswerSubmit(question.id)}
                          className="mt-3 px-5 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors text-sm font-medium"
                        >
                          Submit Answer
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}