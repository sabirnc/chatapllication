import React, { useState, useEffect } from "react";

// Loading component definition
const Loading = () => {
  // State to manage the progress value
  const [value, setValue] = useState(10); // Default value

  // useEffect to update the progress value
  useEffect(() => {
    const interval = setInterval(() => {
      // Incrementing the value by 10 every second
      setValue((prevValue) => prevValue + 10);
    }, 1000);

    // Clearing the interval if the value reaches 100
    if (value >= 100) {
      clearInterval(interval);
    }

    // Cleaning up the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [value]); // Adding 'value' to the dependency array to ensure effect updates


  return (
    <section className="chat-sec">
      <div className="svg-container">
        {/* SVG loading animation */}
        <svg
          fill="#4ade54"
          height="256px"
          width="256px"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="-6 -6 72.00 72.00"
          xmlSpace="preserve"
          stroke="#4ade54"
          strokeWidth="0.3"
        >
          <g
            id="SVGRepo_bgCarrier"
            strokeWidth="0"
            transform="translate(0,0), scale(1)"
          >
            <rect
              x="-6"
              y="-6"
              width="72.00"
              height="72.00"
              rx="0"
              fill="#0a1014"
              strokeWidth="0"
            ></rect>
          </g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="#f7f7f7"
            strokeWidth="4.08"
          >
            {" "}
            <g>
              {" "}
              <path d="M26,9.586C11.664,9.586,0,20.09,0,33c0,4.499,1.418,8.856,4.106,12.627c-0.51,5.578-1.86,9.712-3.813,11.666 c-0.304,0.304-0.38,0.768-0.188,1.153C0.276,58.789,0.625,59,1,59c0.046,0,0.093-0.003,0.14-0.01 c0.349-0.049,8.432-1.213,14.317-4.585c3.33,1.333,6.874,2.009,10.544,2.009c14.336,0,26-10.503,26-23.414S40.337,9.586,26,9.586z"></path>{" "}
              <path d="M55.894,37.042C58.582,33.27,60,28.912,60,24.414C60,11.503,48.337,1,34,1c-8.246,0-15.968,3.592-20.824,9.42 C17.021,8.614,21.38,7.586,26,7.586c15.439,0,28,11.4,28,25.414c0,5.506-1.945,10.604-5.236,14.77 c4.946,1.887,9.853,2.6,10.096,2.634c0.047,0.006,0.094,0.01,0.14,0.01c0.375,0,0.724-0.211,0.895-0.554 c0.192-0.385,0.116-0.849-0.188-1.153C57.753,46.753,56.403,42.619,55.894,37.042z"></path>{" "}
            </g>{" "}
          </g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g>
              {" "}
              <path d="M26,9.586C11.664,9.586,0,20.09,0,33c0,4.499,1.418,8.856,4.106,12.627c-0.51,5.578-1.86,9.712-3.813,11.666 c-0.304,0.304-0.38,0.768-0.188,1.153C0.276,58.789,0.625,59,1,59c0.046,0,0.093-0.003,0.14-0.01 c0.349-0.049,8.432-1.213,14.317-4.585c3.33,1.333,6.874,2.009,10.544,2.009c14.336,0,26-10.503,26-23.414S40.337,9.586,26,9.586z"></path>{" "}
              <path d="M55.894,37.042C58.582,33.27,60,28.912,60,24.414C60,11.503,48.337,1,34,1c-8.246,0-15.968,3.592-20.824,9.42 C17.021,8.614,21.38,7.586,26,7.586c15.439,0,28,11.4,28,25.414c0,5.506-1.945,10.604-5.236,14.77 c4.946,1.887,9.853,2.6,10.096,2.634c0.047,0.006,0.094,0.01,0.14,0.01c0.375,0,0.724-0.211,0.895-0.554 c0.192-0.385,0.116-0.849-0.188-1.153C57.753,46.753,56.403,42.619,55.894,37.042z"></path>{" "}
            </g>{" "}
          </g>
        </svg>
        {/* Progress bar */}
        <progress max={100} value={value} className="progress" />
      </div>
    </section>
  );
};

export default Loading;
