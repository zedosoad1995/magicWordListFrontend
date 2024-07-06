import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { WordsOfTheDay } from "./pages/WordsOfTheDay/WordsOfTheDay.tsx";
import { MainLayout } from "./components/layouts/MainLayout/MainLayout.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Word } from "./pages/Word/Word.tsx";
import { DailyWordsProvider } from "./contexts/dailyWords.tsx";
import { Play } from "./pages/Play/Play.tsx";
import { Words } from "./pages/Words/Words.tsx";
import { Settings } from "./pages/Settings/Settings.tsx";
import { Login } from "./pages/Login/Login.tsx";
import { UnprotectedLayout } from "./components/layouts/UnprotectedLayout/UnprotectedLayout.tsx";
import { Register } from "./pages/Register/Register.tsx";

const router = createBrowserRouter([
  {
    element: <UnprotectedLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <WordsOfTheDay />,
      },
      {
        path: "/words",
        element: <Words />,
      },
      {
        path: "/play",
        element: <Play />,
      },
      {
        path: "/settings",
        element: <Settings />,
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
