import React, { useState, useEffect } from "react";
import VoiceInput from "./components/VoiceInput";
import ShoppingList from "./components/ShoppingList";
import Suggestions from "./components/Suggestions";
import SearchInput from "./components/SearchInput";
import SearchResults from "./components/SearchResults";
import ThemeToggle from "./components/ThemeToggle";
import { getList } from "./api";
import { Sparkles, ShoppingCart, Mic, Search, Lightbulb } from "lucide-react";

function App() {
  const [list, setList] = useState([]);
  const [results, setResults] = useState([]);
  const [filters, setFilters] = useState({});
  const [dark, setDark] = useState(false);

  useEffect(() => {
    getList().then(setList);
  }, []);

  return (
    <div className={`${dark ? "dark" : ""}`}>
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col text-black dark:text-white">
        {/* Header */}
        <header className="bg-white/70 dark:bg-gray-900/80 backdrop-blur-md shadow-lg rounded-b-3xl px-8 py-6 flex items-center justify-between border-b border-purple-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-10 h-10 text-purple-600 dark:text-purple-300 drop-shadow-lg" />
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-400 bg-clip-text text-transparent animate-gradient dark:from-purple-300 dark:via-pink-300 dark:to-indigo-200">
              Voice Shopping Assistant
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-400 dark:text-gray-300 font-semibold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              Powered by AI
            </span>
            <ThemeToggle dark={dark} setDark={setDark} />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 w-full px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left: Voice & Suggestions */}
          <section className="md:col-span-1 flex flex-col gap-6">
            <div className="bg-white/60 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-purple-100 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-4">
                <Mic className="text-indigo-500 dark:text-indigo-300" />
                <span className="font-semibold text-lg text-indigo-700 dark:text-indigo-200">
                  Speak
                </span>
              </div>
              <VoiceInput setList={setList} />
            </div>
            <div className="bg-white/60 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-purple-100 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="text-yellow-500 dark:text-yellow-300" />
                <span className="font-semibold text-lg text-yellow-700 dark:text-yellow-200">
                  Smart Suggestions
                </span>
              </div>
              <Suggestions list={list} setList={setList} />
            </div>
          </section>

          {/* Center: Shopping List */}
          <section className="md:col-span-1 flex flex-col">
            <div className="bg-white/60 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 flex-1 border border-purple-100 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-4">
                <ShoppingCart className="text-purple-600 dark:text-purple-300" />
                <span className="font-semibold text-lg text-purple-700 dark:text-purple-200">
                  Shopping List
                </span>
              </div>
              <ShoppingList list={list} setList={setList} />
            </div>
          </section>

          {/* Right: Search */}
          <section className="md:col-span-1 flex flex-col gap-6">
            <div className="bg-white/60 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-purple-100 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-4">
                <Search className="text-blue-500 dark:text-blue-300" />
                <span className="font-semibold text-lg text-blue-700 dark:text-blue-200">
                  Search by Voice
                </span>
              </div>
              <SearchInput
                setResults={(res) => {
                  setResults(res.results || []);
                  setFilters(res.filters || {});
                }}
              />
            </div>
            <div className="bg-white/60 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 flex-1 border border-purple-100 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-4">
                <Search className="text-blue-500 dark:text-blue-300" />
                <span className="font-semibold text-lg text-blue-700 dark:text-blue-200">
                  Search Results
                </span>
              </div>
              <SearchResults
                results={results}
                filters={filters}
                setList={setList}
              />
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-white/70 dark:bg-gray-900/80 backdrop-blur-md shadow-inner rounded-t-3xl px-8 py-4 text-center text-gray-500 dark:text-gray-300 text-sm border-t border-purple-200 dark:border-gray-800">
          ©️ 2025 Voice Command Shopping Assistant &mdash; Built with Akhya Verma{" "}
          <span className="text-pink-500">♥️</span>
        </footer>
      </div>
    </div>
  );
}

export default App;