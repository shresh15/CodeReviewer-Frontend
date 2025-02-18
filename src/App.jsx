import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import Editor from "react-simple-code-editor";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";

function App() {
  const [code, setCode] = useState(`function sum() {
    return 1 + 1;
  }`);
  const [review, setReview] = useState("");

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    try {
      const response = await axios.post("http://localhost:3000/ai/get-review", {
        code,
      });
      setReview(response.data);
    } catch (error) {
      console.error("Error fetching review:", error);
      setReview("⚠️ Error fetching review. Please try again.");
    }
  }

  return (
    <div className="w-full h-screen bg-gradient-to-r from-purple-900 to-black flex items-center justify-center">
      <main className="w-3/4 h-5/6 flex shadow-lg rounded-lg overflow-hidden">
        {/* Left Section: Code Editor */}
        <div className="w-1/2 h-full bg-gray-900 p-6 flex flex-col">
          <h2 className="text-white text-lg font-semibold mb-2">Code Editor</h2>
          <div className="flex-1 bg-gray-800 rounded-lg p-3">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontSize: 14,
                height: "100%",
                width: "100%",
                backgroundColor: "transparent",
                color: "#ffffff",
                outline: "none",
                border: "none",
              }}
            />
          </div>

          {/* Review Button */}
          <button
            onClick={reviewCode}
            className="bg-purple-400 text-black font-semibold py-2 px-4 rounded-md text-sm transition-all duration-300 hover:bg-purple-600 hover:text-white"
          >
            Review
          </button>
        </div>

        {/* Right Section: Review Output */}
        <div className="w-1/2 h-full bg-gray-200 p-6 flex flex-col">
          <h2 className="text-gray-900 text-lg font-semibold mb-2">
            Code Review
          </h2>
          <div className="flex-1 bg-white rounded-lg p-4 shadow-md overflow-auto">
            {review ? (
              <Markdown
                className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none"
                rehypePlugins={[rehypeHighlight]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    return inline ? (
                      <code
                        className="bg-gray-800 text-white px-1 py-0.5 rounded"
                        {...props}
                      >
                        {children}
                      </code>
                    ) : (
                      <pre className="bg-gray-900 text-white p-3 rounded-lg overflow-x-auto">
                        <code {...props}>{children}</code>
                      </pre>
                    );
                  },
                }}
              >
                {review}
              </Markdown>
            ) : (
              <p className="text-gray-600 italic">
                Click "Review" to generate feedback.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
