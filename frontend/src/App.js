import React, { useState, useEffect } from "react";
import VoiceInput from "./components/VoiceInput";
import ShoppingList from "./components/ShoppingList";
import Suggestions from "./components/Suggestions"; 
import SearchInput from "./components/SearchInput";
import SearchResults from "./components/SearchResults"; 
import { getList } from "./api";

function App() {
  const [list, setList] = useState([]);
  const [results, setResults] = useState([]);
  const [filters, setFilters] = useState({}); // ✅ new state for filters

  useEffect(() => {
    getList().then(setList);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🛒 Voice Shopping Assistant</h1>

      {/* 🎙 Voice commands */}
      <VoiceInput setList={setList} />

      {/* 🛒 Shopping list display */}
      {/* <ShoppingList list={list} /> */}
<ShoppingList list={list} setList={setList} />

      {/* ✨ Smart Suggestions */}
      <Suggestions list={list} setList={setList} />

      {/* 🔎 Search products */}
      <SearchInput
        setResults={(res) => {
          setResults(res.results || []);
          setFilters(res.filters || {});
        }}
      />
      <SearchResults results={results} filters={filters} setList={setList} />
    </div>
  );
}

export default App;
