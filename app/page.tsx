"use client";
import { useClerk } from "@clerk/nextjs";
export default function page() {
  const { openSignIn } = useClerk();
  const handleSignIn = (role: string) => {
    openSignIn({
      redirectUrl: `/${role}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col font-mono text-gray-200">
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950 via-gray-900 to-black text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('/blockchain-pattern.png')] animate-slow-scroll"></div>
          <div className="container mx-auto px-6 relative z-10">
            <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-6 animate-fade-in-down drop-shadow-[0_0_10px_rgba(79,70,229,0.5)]">
              About OnlyAds
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed animate-fade-in-up">
              A Web3 revolution in advertising powered by real user reactions.
            </p>
            <div className="mt-8 h-1 w-24 bg-gradient-to-r from-indigo-400 to-cyan-400 mx-auto rounded-full shadow-[0_0_8px_rgba(34,211,238,0.6)]"></div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-16 px-6 max-w-5xl mx-auto relative">
          <div className="absolute inset-0 bg-indigo-950 opacity-10 rounded-full blur-3xl -rotate-12"></div>
          <h2 className="text-4xl font-bold text-cyan-300 mb-8 text-center relative z-10 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
            Our Web3 Mission
          </h2>
          <div className="flex justify-center items-center">
            <p className="text-lg text-gray-300 leading-loose bg-gray-900/80 p-6 rounded-xl shadow-lg border border-indigo-900/50">
              We’re pioneering a decentralized future where advertising
              transcends traditional boundaries, driven by the power of
              blockchain technology...
            </p>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-16 bg-gradient-to-t from-gray-900 to-indigo-950 px-6 relative overflow-hidden">
          <h2 className="text-4xl font-bold text-cyan-300 text-center mb-12 z-10 relative drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
            Web3-Powered Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Authentic Reactions",
                desc: "Real-time emotions captured on-chain for ultimate transparency.",
              },
              {
                title: "NFT Rewards",
                desc: "Mint unique tokens for your decentralized engagement.",
              },
              {
                title: "Blockchain Insights",
                desc: "Immutable analytics for a trustless advertising ecosystem.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-gray-900/90 backdrop-blur-sm rounded-xl shadow-lg border border-indigo-900/50 hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:-translate-y-2 transition-all duration-300 group"
              >
                <h3 className="text-xl font-bold text-cyan-300 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 text-center">
          <h2 className="text-4xl font-bold text-cyan-300 mb-8 animate-pulse">
            Join the Web3 Revolution
          </h2>
          <div className="flex justify-center space-x-6">
            <button
              onClick={() => handleSignIn("products")}
              className="bg-gradient-to-r from-indigo-600 to-cyan-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105"
            >
              Join as User
            </button>
            <button
              onClick={() => handleSignIn("companyReg")}
              className="bg-transparent border-2 border-cyan-400 text-cyan-400 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-cyan-600 hover:text-white"
            >
              Register Company
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-indigo-950 text-gray-400 py-8 text-center">
        <p>
          © {new Date().getFullYear()} OnlyAds. Decentralized rights reserved.
        </p>
      </footer>
    </div>
  );
}
