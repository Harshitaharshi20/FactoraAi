"use client";

import { useState } from "react";
import axios from "axios";
import { AlertTriangle, CheckCircle, ShieldAlert, Share2, Activity, Info } from "lucide-react";

interface AnalyzeResponse {
  prediction: "REAL" | "UNVERIFIED" | "FAKE";
  confidence: number;
  highlight: string[];
  reason: string;
  origin: string;
  spread: string[];
  virality: "LOW" | "MEDIUM" | "HIGH";
  credibility: "LOW" | "MEDIUM" | "HIGH";
}

export default function Dashboard() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await axios.post<AnalyzeResponse>("http://localhost:8080/api/analyze", { text });
      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to connect to the server. Please ensure the backend and AI services are running.");
    } finally {
      setLoading(false);
    }
  };

  const renderHighlightedText = (content: string, wordsToHighlight: string[]) => {
    if (!wordsToHighlight || wordsToHighlight.length === 0) return <p className="text-gray-700">{content}</p>;
    
    // Simple logic to highlight words (ignoring case)
    const regex = new RegExp(`(${wordsToHighlight.join("|")})`, "gi");
    const parts = content.split(regex);

    return (
      <p className="text-gray-700 min-h-[100px] border p-4 rounded-lg bg-gray-50 mt-4 text-lg">
        {parts.map((part, i) => {
          if (wordsToHighlight.some(w => w.toLowerCase() === part.toLowerCase())) {
            return (
              <span key={i} className="bg-red-200 text-red-800 font-bold px-1 rounded mx-0.5">
                {part}
              </span>
            );
          }
          return <span key={i}>{part}</span>;
        })}
      </p>
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 font-sans">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center gap-3">
          <ShieldAlert className="text-indigo-600 w-10 h-10" />
          FactorAI
        </h1>
        <p className="text-gray-500 mt-2 text-lg">AI-powered misinformation detection system.</p>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
        {/* Input Section */}
        <section className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 flex flex-col h-full">
          <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2">
            Paste message or article text:
          </label>
          <textarea
            id="content"
            rows={10}
            className="w-full border border-gray-300 rounded-xl p-4 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all resize-none text-gray-800 text-base"
            placeholder="E.g., URGENT: 100% shocking news breaking right now! Share with everyone!"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>

          <button
            onClick={handleAnalyze}
            disabled={loading || !text.trim()}
            className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl transition-colors text-lg flex justify-center items-center shadow-md hover:shadow-lg"
          >
            {loading ? "Analyzing Context..." : "Analyze Content"}
          </button>

          {error && <p className="text-red-600 mt-4 text-sm font-medium">{error}</p>}
        </section>

        {/* Results Section */}
        <section className={`bg-white rounded-2xl shadow-xl border border-gray-100 p-6 flex flex-col items-center justify-center transition-opacity duration-500 ${!result ? 'opacity-50 min-h-[400px]' : ''}`}>
          {!result ? (
            <div className="text-center text-gray-400 p-8">
              <Activity className="w-16 h-16 mx-auto mb-4 opacity-50 text-indigo-400" />
              <p className="text-lg">Waiting for analysis...</p>
              <p className="text-sm mt-2">Submit text to view insights, spread patterns, and credibility scoring.</p>
            </div>
          ) : (
            <div className="w-full flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col">
              
              {/* Top Result Banner */}
              <div className={`w-full rounded-xl p-4 flex items-center gap-4 mb-6
                ${result.prediction === "FAKE" ? 'bg-red-50 border border-red-200 text-red-800' : 
                  result.prediction === "REAL" ? 'bg-green-50 border border-green-200 text-green-800' : 
                  'bg-yellow-50 border border-yellow-200 text-yellow-800'}`}>
                {result.prediction === "FAKE" ? <ShieldAlert className="w-10 h-10 flex-shrink-0" /> : 
                 result.prediction === "REAL" ? <CheckCircle className="w-10 h-10 flex-shrink-0" /> : 
                 <AlertTriangle className="w-10 h-10 flex-shrink-0" />}
                
                <div className="flex-1">
                  <h2 className="text-2xl font-black tracking-tight">{result.prediction}</h2>
                  <p className="text-sm font-medium mt-1 opacity-90">{result.reason}</p>
                </div>
              </div>

              {/* Fake Warning */}
              {result.prediction === "FAKE" && (
                <div className="mb-6 bg-red-600 text-white p-3 rounded-lg text-center font-bold text-sm uppercase tracking-wide shadow-md animate-pulse">
                  🚨 This content is likely fake. Avoid resharing. 🚨
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Confidence */}
                <div className="bg-gray-50 border rounded-xl p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs font-bold text-gray-500 uppercase">Confidence</span>
                    <span className="text-sm font-bold">{result.confidence}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${result.prediction === 'FAKE' ? 'bg-red-500' : result.prediction === 'REAL' ? 'bg-green-500' : 'bg-yellow-500'}`}
                      style={{ width: `${result.confidence}%` }}
                    ></div>
                  </div>
                </div>

                {/* Credibility */}
                <div className="bg-gray-50 border rounded-xl p-4 flex flex-col justify-center">
                  <span className="text-xs font-bold text-gray-500 uppercase mb-1">Source Credibility</span>
                  <span className={`text-lg font-black ${result.credibility === 'LOW' ? 'text-red-600' : result.credibility === 'HIGH' ? 'text-green-600' : 'text-yellow-600'}`}>
                    {result.credibility}
                  </span>
                </div>
              </div>

              {/* Spread & Origin */}
              <div className="border border-indigo-100 bg-indigo-50/30 rounded-xl p-4 mb-6">
                <h3 className="text-xs font-bold text-indigo-800 uppercase flex items-center gap-2 mb-3">
                  <Share2 className="w-4 h-4" /> Origin & Spread Network
                </h3>
                
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-500 w-16">ORIGIN</span>
                    <span className="bg-white border shadow-sm px-3 py-1 rounded-md text-sm font-medium text-gray-800">{result.origin}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-500 w-16">SPREAD TO</span>
                    <div className="flex gap-2 flex-wrap">
                      {result.spread.map((platform, i) => (
                        <span key={i} className="bg-white border shadow-sm px-3 py-1 rounded-md text-sm font-medium text-gray-800">
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs font-bold text-gray-500 w-16">VIRALITY</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${result.virality === 'HIGH' ? 'bg-red-100 text-red-700' : 'bg-gray-200 text-gray-700'}`}>
                      {result.virality}
                    </span>
                  </div>
                </div>
              </div>

              {/* Analysis Highlights */}
              <div className="flex-1 border rounded-xl p-4 bg-white relative overflow-hidden group">
                <h3 className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2 mb-2">
                  <Info className="w-4 h-4" /> Text Analysis
                </h3>
                <div className="text-sm">
                  {renderHighlightedText(text, result.highlight)}
                </div>
                {result.highlight?.length > 0 && (
                  <p className="mt-3 text-xs text-red-600 font-medium">
                    * Highlighted words indicate sensationalism or unverified claims.
                  </p>
                )}
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
