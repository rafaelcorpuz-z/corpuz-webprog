<<<<<<< HEAD
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Layout + Pages
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ArticlePage from "./pages/ArticlePage";

// ROUTES CONFIG
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "articles",
        element: <ArticlePage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
=======
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My React App!</h1>
        <p>
          Name: John Rafael P. Corpuz<br />
          Email: johnrafaelcorpuz00@gmail.com<br />
          GitHub Link: <a href="https://github.com/rafaelcorpuz-z">GitHub Link</a>
        </p>
      </header>
    </div>
  );
}


export default App;
>>>>>>> 40bedeb2a6fd4cd86b45774b627226ca7f1b7543
