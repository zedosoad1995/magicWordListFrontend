import React from "react";
import ReactDOM from "react-dom/client";
import { WordsOfTheDay } from "./pages/WordsOfTheDay/WordsOfTheDay.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="layout">
      <WordsOfTheDay />
    </div>
  </React.StrictMode>
);
