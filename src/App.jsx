import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import Editor from "react-simple-code-editor";
import axios from "axios";
function App() {
  const [code, setCode] = useState(`function sum() {
    return 1 + 1;
  }`);
  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    const response = await axios.post("htt://localhost:3000/ai/get-review", {
      code,
    });
    console.log(response.data);
  }

  return (
    <div className="w-full h-screen bg-gradient-to-r from-violet-900 to-black flex items-center justify-center">
      <main className="w-3/4 h-5/6 flex">
        {/* Left Section */}
        <div className="left w-1/2 h-full bg-gray-800 p-6 flex flex-col justify-between">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontSize: 12,
                height: "100%",
                width: "100%",
                backgroundColor: "transparent", // Optional: Removes default background
                color: "#ffffff", // Ensures text is visible on dark backgrounds
              }}
            />
          </div>
          <div onClick={reviewCode}>
            <div className="review bg-blue-400 p-4 rounded-lg shadow-md mt-4">
              Review
            </div>
          </div>
          {/* <pre className="!bg-transparent !p-0 !shadow-none">
            <code className="language-javascript"></code>
          </pre> */}
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
