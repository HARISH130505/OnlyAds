"use client";
import Link from "next/link";
import { useState, useRef } from "react";

export default function VideoUploadPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Ensure there's a file
    if (!file) return;

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
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!videoFile || !title || !price || !description) {
      setError("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);

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
      <header className="bg-gradient-to-r from-gray-900 to-indigo-950 text-white py-4 px-6 fixed top-0 w-full z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-extrabold tracking-wider text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text">
            OnlyAds
          </h1>
          <nav className="space-x-6">
            {["Home", "About", "Contact"].map((item) => (
              <Link key={item} href={item === "Home" ? "/" : `/${item.toLowerCase()}`} className="text-gray-400 hover:text-cyan-300 transition">
                {item}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1 pt-20 pb-16">
        <section className="py-12 px-6 max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-cyan-300 mb-8 text-center">Upload Your Ad</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900 p-6 rounded-xl shadow-lg border border-indigo-900/50">
              <div>
                <label className="block text-cyan-300 font-semibold mb-2">Video (Max 30s)</label>
                <input type="file" accept="video/*" onChange={handleVideoChange} className="w-full text-gray-400" />
              </div>
              <div>
                <label className="block text-cyan-300 font-semibold mb-2">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 bg-gray-800 border rounded-lg text-gray-200"
                  placeholder="Enter ad title"
                />
              </div>
              <div>
                <label className="block text-cyan-300 font-semibold mb-2">Price</label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full p-3 bg-gray-800 border rounded-lg text-gray-200"
                  placeholder="Price in ETH"
                />
              </div>
              <div>
                <label className="block text-cyan-300 font-semibold mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 bg-gray-800 border rounded-lg text-gray-200"
                  rows={4}
                  placeholder="Describe your ad"
                />
              </div>
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg">
                Upload Ad
              </button>
            </form>

            <div className="relative bg-gray-900 rounded-xl shadow-lg border border-indigo-900/50 overflow-hidden">
              {previewUrl ? (
                <>
                  <video ref={videoRef} src={previewUrl} controls className="w-full h-full" />
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                    <h3 className="text-xl font-bold text-cyan-300">{title || "Ad Title"}</h3>
                    <p className="text-sm text-gray-300">{description || "Ad Description"}</p>
                    <p className="text-sm text-indigo-400">{price ? `${price} ETH` : "Price"}</p>
                  </div>
                </>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">Video preview will appear here</div>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gradient-to-r from-gray-900 to-indigo-950 text-gray-400 py-8 text-center">
        <p>© {new Date().getFullYear()} OnlyAds. Decentralized rights reserved.</p>
      </footer>
    </div>
  );
}