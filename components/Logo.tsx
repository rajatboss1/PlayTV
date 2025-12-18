
import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 300, className = "" }) => {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-2xl"
      >
        {/* Shadow layer for the bubble */}
        <path
          d="M100 150 C 100 120, 120 100, 150 100 H 350 C 380 100, 400 120, 400 150 V 300 C 400 330, 380 350, 350 350 H 330 L 355 390 L 310 350 H 150 C 120 350, 100 330, 100 300 V 150 Z"
          fill="black"
          transform="translate(8, 8)"
        />

        {/* Main White Bubble with Black Outline */}
        <path
          d="M100 150 C 100 120, 120 100, 150 100 H 350 C 380 100, 400 120, 400 150 V 300 C 400 330, 380 350, 350 350 H 330 L 355 390 L 310 350 H 150 C 120 350, 100 330, 100 300 V 150 Z"
          fill="white"
          stroke="black"
          strokeWidth="6"
          strokeLinejoin="round"
        />

        {/* Play Button Shadow */}
        <path
          d="M210 190 L 290 240 L 210 290 Z"
          fill="#99f6e4"
          opacity="0.6"
          transform="translate(5, 5)"
        />

        {/* Main Play Button (Triangle) */}
        <path
          d="M210 190 L 290 240 L 210 290 Z"
          fill="#cffafe"
          stroke="#083344"
          strokeWidth="6"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default Logo;
