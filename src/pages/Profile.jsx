import React, { useEffect, useState,useContext } from "react";
import axios from "../auth/axiosConfig";
import { useNavigate } from "react-router-dom";
import { navigateTo } from "../utils/navigateUtils";
import Header from "../components/Header";
import { ExitIcon } from "../assets/icons/icons";
import AuthContext from "../store/AuthContext";
import Spinner from "../components/Spinner";

export default function Profile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    useEffect(() => {
        async function fetchProfile() {
            try {
                const response = await axios.get("/projectMentoring/profile", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });

                if (response.data.additional?.length > 0) {
                    setProfile(response.data.additional[0]);
                } else {
                    setProfile(null);
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProfile();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        logout()
        navigateTo(navigate, "/login", {});
    };

    return (
        <div className="px-2 sm:p-10 min-h-screen flex flex-col items-center ">
            <Header title="Mentor Profile" />
            <div className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-md ">
                {loading ? (
                    <Spinner/>
                ) : profile ? (
                    <div className="flex flex-col items-center">
                        {/* Profile Image (Initials Placeholder) */}
                        <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-bold uppercase">
                            {profile.mentorName?.charAt(0)}
                        </div>

                        <h2 className="text-lg sm:text-3xl font-bold text-gray-900 mt-4">{profile.mentorName}</h2>
                        <p className="text-gray-600 text-md sm:text-lg">{profile.email}</p>

                        <div className="mt-6 w-full">
                            <div className="bg-gray-100 text-md sm:text-2xl p-1 md:p-4 rounded-lg">

                                <span className="text-gray-900 font-semibold ml-2">{profile.coureName}</span>
                            </div>
                        </div>

                        {/* Logout Button */}
                        <button 
                            onClick={handleLogout} 
                            className=" cursor-pointer mt-8 flex gap-2 items-center px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition"
                        >
                            <ExitIcon className="w-5 h-5" />
                            Logout
                        </button>
                    </div>
                ) : (
                    <p className="text-red-600 text-center text-lg font-medium">No profile data available.</p>
                )}
            </div>
        </div>
    );
}
