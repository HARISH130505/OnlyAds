"use client";
import React, { useState, useEffect } from "react";

interface LeaderboardEntry {
  rank: number;
  name: string;
  username: string;
  tokens: number;
  achievements: string[];
}

const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, name: "Emma Johnson", username: "@emma_j", tokens: 2450, achievements: ["🏆", "⭐", "+2"] },
  { rank: 2, name: "Michael Chen", username: "@mike_tech", tokens: 1875, achievements: ["🏆", "⭐", "+1"] },
  { rank: 3, name: "Sophia Rodriguez", username: "@soph_r", tokens: 1640, achievements: ["⭐", "⭐"] },
  { rank: 4, name: "David Kim", username: "@d_kim", tokens: 1320, achievements: ["⭐"] },
];

const Leaderboard = () => {
  const [animatedData, setAnimatedData] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    leaderboardData.forEach((entry, index) => {
      setTimeout(() => {
        setAnimatedData((prev) => [...prev, entry]);
      }, index * 180);
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#D1D5DB] flex flex-col justify-center p-4 md:p-10 lg:p-16">
      <div className="max-w-4xl mx-auto w-full font-mono">
        <h1 className="text-2xl md:text-3xl text-center font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 animate-fade-in">
          Product Review Achievements
        </h1>
        <p className="text-center text-[#CBD5E0] mb-6 md:mb-8 text-sm md:text-base animate-slide-up">
          Top reviewers who have earned tokens through verified product reviews.
        </p>
        <div className="bg-[#1E293B] bg-opacity-80 backdrop-filter backdrop-blur-lg p-4 md:p-6 rounded-2xl shadow-lg animate-scale-in">
          <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-cyan-300 text-center">🏆 Token Achievement Leaderboard</h2>
          <p className="text-xs md:text-sm text-[#94A3B8] mb-4 md:mb-5 text-center">
            Users earn tokens by submitting verified product reviews with facial recognition.
          </p>
          <div className="grid grid-cols-4 font-semibold text-[#CBD5E0] pb-2 md:pb-3 text-xs md:text-sm">
            <span className="text-center">Rank</span>
            <span className="mx-2 md:mx-12">User</span>
            <span className="text-center">Achievements</span>
            <span className="text-center">Tokens</span>
            <div className="col-span-4 mt-1 md:mt-2">
              <div className="w-full h-0.5 rounded-full bg-gradient-to-r from-[#6366F1] to-[#38BDF8]"></div>
            </div>
          </div>
          {animatedData.map((entry, index) => (
            <div key={entry.rank}>
              <div className="grid grid-cols-4 py-2 md:py-3 items-center animate-list-item text-xs md:text-sm">
                <span className="text-lg font-bold text-cyan-300 text-center">{entry.rank}</span>
                <div className="flex items-center justify-center gap-1 md:gap-8 w-full">
                  <div className="hidden md:flex w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#ddd] items-center justify-center">
                    <span className="text-xs md:text-sm font-bold text-black">{entry.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-medium text-xs md:text-sm">{entry.name}</p>
                    <p className="text-xs text-[#94A3B8]">{entry.username}</p>
                  </div>
                </div>
                <span className="text-center">{entry.achievements.join(" ")}</span>
                <span className="font-semibold text-[#A7F3D0] text-xs md:text-sm text-center">{entry.tokens} tokens</span>
              </div>
              {index < animatedData.length - 1 && (
                <div className="w-full h-0.5 rounded-full bg-gradient-to-r from-[#6366F1] to-[#38BDF8]"></div>
              )}
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes listItem {
          from { transform: translateY(10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .animate-slide-up {
          animation: slideUp 0.6s ease-out forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.7s ease-out forwards;
        }
        .animate-list-item {
          animation: listItem 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Leaderboard;