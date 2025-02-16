import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-full h-screen bg-linear-to-r/srgb from-indigo-300 to-teal-400 flex items-center justify-center">
      <main className="w-3/4 h-5/6 flex">
        {/* Left Section */}
        <div className="w-1/2 h-full bg-gray-800 p-6 flex flex-col justify-between">
          <div className="code bg-blue-300 p-4 rounded-lg shadow-md">
            Code Section
          </div>
          <div className="review bg-blue-400 p-4 rounded-lg shadow-md mt-4">
            Review Section
          </div>
          <button
            className="mt-4 bg-white text-blue-500 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
            onClick={() => setCount(count + 1)}
          >
            Click Me ({count})
          </button>
        </div>

        {/* Right Section */}
        <div className="w-1/2 h-full bg-gray-300 p-6 flex items-center justify-center">
          <p className="text-white text-lg">Right Section</p>
        </div>
      </main>
    </div>
  );
}

export default App;
