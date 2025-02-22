import React, { useEffect, useState } from 'react';
import axios from '../auth/axiosConfig';
import Header from '../components/Header';
import { useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";
export default function Solutions() {
    const location = useLocation();
    const projectDetails = location.state?.project;
    const [selectedSolution, setSelectedSolution] = useState(null);
    const [solutions, setSolutions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingSolution, setUpdatingSolution] = useState(null);
    const [reviewNotes, setReviewNotes] = useState("");
    const [showFeedbackField, setShowFeedbackField] = useState(null);


    useEffect(() => {
        async function fetchSolutions() {
            try {
                const response = await axios.get(`/projectMentoring/getSolutions/${projectDetails.id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setSolutions((response.data.additional || []).filter(solution => solution.reviewState === "REVIEWING"));
            } catch (error) {
                console.error("Error fetching solutions:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchSolutions();
    }, [projectDetails.id]);

    const handleReviewStateChange = (solutionId, newState) => {
        if (newState === "FAILED") {
            setShowFeedbackField(solutionId);
        } else {
            setShowFeedbackField(null);
            updateSolutionReview(solutionId, newState, "");
        }
    };

    const updateSolutionReview = async (solutionId, newState, feedbackText) => {
        setUpdatingSolution(solutionId);
        try {
            await axios.put(`/projectMentoring/review-state/${solutionId}`, {
                reviewState: newState,
                reviewNotes: feedbackText,
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });

            setSolutions(prevSolutions =>
                prevSolutions.map(solution =>
                    solution.id === solutionId ? { ...solution, reviewState: newState, reviewNotes: feedbackText } : solution
                )
            );
            setShowFeedbackField(null);
            setReviewNotes("");
        } catch (error) {
            console.error("Error updating review state:", error);
        } finally {
            setUpdatingSolution(null);
        }
    };

    if (loading) {
        return (
            <Spinner />
        )
    }


    return (
        <div className="px-4 sm:px-10 py-8 min-h-screen flex flex-col items-center ">
            <Header title="Solutions" />

            <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">{projectDetails.projectName}</h2>
                <a href={projectDetails.projectLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline block mt-2">🔗 View Project</a>
            </div>

            <div className="w-full max-w-6xl mt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Submitted Solutions</h3>

                {solutions.length > 0 ? solutions.map((solution) => (
                    <div key={solution.id} className="bg-white p-6 mb-6 rounded-lg shadow-md border border-gray-200">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div>
                                <p className="text-lg font-semibold text-gray-800">{solution.userName}</p>
                                <a href={solution.githubLink} target="_blank" rel="noopener noreferrer" className="text-primary text-sm hover:underline">🔗 GitHub Link</a>
                            </div>

                            <div className='flex flex-col items-center justify-between'>
                                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition" onClick={() => setSelectedSolution(solution)}>
                                    Show Explanation
                                </button>
                                <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between">
                                    <div className="flex items-center space-x-2">

                                        <select className="p-2 border rounded-md bg-gray-100 focus:ring focus:ring-primary transition" value={solution.reviewState} onChange={(e) => handleReviewStateChange(solution.id, e.target.value)} disabled={updatingSolution === solution.id}>
                                            <option value="REVIEWING">Reviewing</option>
                                            <option value="FAILED">Failed</option>
                                            <option value="SUCCESSFUL">Successful</option>
                                        </select>
                                    </div>

                                </div>

                            </div>


                        </div>


                        {showFeedbackField === solution.id && (
                            <div className="mt-4">
                                <textarea className="w-full p-3 border rounded-md bg-gray-100 focus:ring focus:ring-red-400 transition" placeholder="Provide feedback on why this solution failed..." value={reviewNotes} onChange={(e) => setReviewNotes(e.target.value)} />
                                <button className="mt-3 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition w-full" onClick={() => updateSolutionReview(solution.id, "FAILED", reviewNotes)} disabled={updatingSolution === solution.id || !reviewNotes.trim()}>
                                    Submit Feedback
                                </button>
                            </div>
                        )}
                    </div>
                )) : (
                    <p className="text-gray-600 text-center">No solutions submitted yet.</p>
                )}

                {selectedSolution && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Explanation</h3>
                            <p className="text-gray-700">{selectedSolution.explanation}</p>
                            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition w-full" onClick={() => setSelectedSolution(null)}>
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
