import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LeftArrowIcon } from "../assets/icons/icons";

export default function Header({ title }) {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <header className="w-full max-w-7xl px-4 sm:px-0 mb-6 sm:mb-10 flex items-center space-x-6 mt-20">
            {/* Hide button if route is "/" */}
            {location.pathname !== "/" && (
                <button
                    onClick={() => navigate(-1)}
                    className="p-1 rounded-full bg-primary opacity-60 hover:bg-primary hover:opacity-75 transition cursor-pointer"
                >
                    <LeftArrowIcon className="w-5 h-5 text-white" />
                </button>
            )}
            <h1 className="text-lg sm:text-3xl font-bold text-gray-900">{title}</h1>
        </header>
    );
}
