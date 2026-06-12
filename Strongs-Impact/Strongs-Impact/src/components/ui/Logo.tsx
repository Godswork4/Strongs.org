import React from "react";

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <div className="h-10 w-10 overflow-hidden rounded-full white-100 flex items-center justify-center">
        <img
          src="/src/assets/Strongs.png"
          alt="Strongs Logo"
          className="h-10 w-10 object-cover"
          onError={(e) => {
            // Fallback if image fails to load
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.style.display = "none";
            const parent = target.parentElement;
            if (parent) {
              const fallback = document.createElement("div");
              fallback.textContent = "S";
              fallback.className = "text-white font-bold text-xl";
              parent.appendChild(fallback);
            }
          }}
        />
      </div>
      <div className="ml-2">
        <h1 className="text-xl font-bold text-blue-800 dark:text-blue-400">
          STRONGS
        </h1>
        <span className="text-xs text-gray-600 dark:text-gray-400">
          The Spiritual Intellectuals
        </span>
      </div>
    </div>
  );
};

export default Logo;
