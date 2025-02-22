import React from "react";

export default function InputField({ type, placeholder, value, onChange, name }) {
    return (
        <div className="mb-4">
            <input
                type={type}
                name={name} 
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none"
                required
            />
        </div>
    );
}
