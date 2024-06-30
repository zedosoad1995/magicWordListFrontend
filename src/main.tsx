import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { WordsOfTheDay } from "./pages/WordsOfTheDay/WordsOfTheDay.tsx";
import { MainLayout } from "./components/layouts/MainLayout/MainLayout.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Word } from "./pages/Word/Word.tsx";
import { DailyWordsProvider } from "./contexts/dailyWords.tsx";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <WordsOfTheDay />,
      },
      {
        path: "/word/:wordId",
        element: <Word />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DailyWordsProvider>
      <RouterProvider router={router} />
    </DailyWordsProvider>
  </React.StrictMode>
);
