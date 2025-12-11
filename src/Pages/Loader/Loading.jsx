import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative h-24 w-24">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: "4px solid rgba(59,130,246,0.3)",
            boxShadow: "0 0 25px rgba(59,130,246,0.5)",
            animation: "outerSpin 2s linear infinite",
          }}
        ></div>

        <div
          className="absolute inset-2 rounded-full"
          style={{
            border: "4px solid rgba(59,130,246,0.8)",
            boxShadow: "0 0 30px rgba(59,130,246,0.9)",
            animation: "pulseGlow 1.2s ease-in-out infinite alternate",
          }}
        ></div>

        <svg
          className="absolute inset-4"
          viewBox="0 0 50 50"
          style={{
            animation: "chakraSpin 1s linear infinite",
          }}
        >
          <defs>
            <linearGradient id="animeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="url(#animeGrad)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="90"
            strokeDashoffset="60"
            style={{
              filter: "drop-shadow(0px 0px 8px #3b82f6)",
            }}
          />
        </svg>

        <div
          className="absolute left-1/2 top-1/2 h-20 w-1 bg-blue-500"
          style={{
            transformOrigin: "bottom",
            animation: "speedLines 0.6s linear infinite",
            filter: "blur(2px)",
            opacity: 0.7,
          }}
        ></div>
      </div>

      <style>
        {`
          @keyframes outerSpin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes chakraSpin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(-360deg); }
          }

          @keyframes pulseGlow {
            0% { transform: scale(1); }
            100% { transform: scale(1.15); }
          }

          @keyframes speedLines {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Loading;
