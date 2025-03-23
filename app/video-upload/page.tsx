"use client";
import Link from "next/link";
import { useState, useRef } from "react";

export default function VideoUploadPage() {
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const videoRef = useRef(null);

  const handleVideoChange = (e: { target: { files: unknown[]; }; }) => {
    const file = e.target.files[0];
    if (file) {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = () => {
        if (video.duration > 30) {
          setError("Video must be 30 seconds or shorter.");
          setVideoFile(null);
          setPreviewUrl(null);
        } else {
          setError("");
          setVideoFile(file);
          setPreviewUrl(URL.createObjectURL(file));
        }
      };
      video.src = URL.createObjectURL(file);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!videoFile || !title || !price || !description) {
      setError("All fields are required.");
      return;
    }

    // Placeholder for backend upload logic
    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);

    // Example: Uncomment and replace with actual API call
    // const response = await fetch("/api/upload", { method: "POST", body: formData });
    // if (response.ok) { console.log("Upload successful!"); }

    console.log("Form submitted:", { title, price, description, videoFile });
    setError("");
    setTitle("");
    setPrice("");
    setDescription("");
    setVideoFile(null);
    setPreviewUrl(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col font-mono text-gray-200">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900 to-indigo-950 text-white py-4 px-6 fixed top-0 w-full z-50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(79,70,229,0.5)]">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 animate-pulse">
            OnlyAds
          </h1>
          <nav className="space-x-6">
            {["Home", "About", "Contact"].map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="relative text-gray-400 hover:text-cyan-300 transition-colors duration-300 group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full shadow-[0_0_5px_rgba(34,211,238,0.7)]"></span>
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1 pt-20 pb-16">
        {/* Upload Section */}
        <section className="py-12 px-6 max-w-5xl mx-auto relative">
          <div className="absolute inset-0 bg-indigo-950 opacity-10 rounded-full blur-3xl -rotate-12"></div>
          <h2 className="text-4xl font-bold text-cyan-300 mb-8 text-center relative z-10 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)] animate-fade-in-down">
            Upload Your  Ad
          </h2>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900/80 p-6 rounded-xl shadow-lg border border-indigo-900/50 relative z-10">
              <div>
                <label className="block text-cyan-300 font-semibold mb-2">Video (Max 30s)</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  className="w-full text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-indigo-900/50 file:text-cyan-400 hover:file:bg-cyan-900/70 transition-colors"
                />
              </div>
              <div>
                <label className="block text-cyan-300 font-semibold mb-2">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 bg-gray-800 border border-indigo-900/50 rounded-lg text-gray-200 focus:border-cyan-400 focus:outline-none transition-colors"
                  placeholder="Enter ad title"
                />
              </div>
        
              <div>
                <label className="block text-cyan-300 font-semibold mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 bg-gray-800 border border-indigo-900/50 rounded-lg text-gray-200 focus:border-cyan-400 focus:outline-none transition-colors"
                  rows="4"
                  placeholder="Describe your ad"
                />
              </div>
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 text-white py-3 rounded-full font-semibold text-lg hover:from-indigo-700 hover:to-cyan-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]"
              >
                Upload Ad
              </button>
            </form>

            {/* Video Preview */}
            <div className="relative group max-h-[600px] bg-gray-900/90 rounded-xl shadow-lg border border-indigo-900/50 overflow-hidden">
              {previewUrl ? (
                <>
                  <video
                    ref={videoRef}
                    src={previewUrl}
                    controls
                    className="w-full h-full object-cover"
                  />
                  {/* YouTube Shorts-like Overlay */}
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                    <h3 className="text-xl font-bold text-cyan-300">{title || "Ad Title"}</h3>
                    <p className="text-sm text-gray-300">{description || "Ad Description"}</p>
                    <p className="text-sm text-indigo-400 mt-1">{price ? `${price} ETH` : "Price"}</p>
                  </div>
                </>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  Video preview will appear here
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-indigo-950 text-gray-400 py-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('/blockchain-pattern.png')] animate-slow-scroll"></div>
        <p className="relative z-10">© {new Date().getFullYear()} OnlyAds. Decentralized rights reserved.</p>
      </footer>

      {/* Custom CSS for Tailwind Animations */}
      <style jsx global>{`
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes slow-scroll {
          0% { background-position: 0 0; }
          100% { background-position: 100px 100px; }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out 0.2s both;
        }
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animate-slow-scroll {
          animation: slow-scroll 20s linear infinite;
        }
        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}