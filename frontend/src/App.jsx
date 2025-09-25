import React from "react";
import Sidebar from "./components/Sidebar";
import UrlForm from "./components/UrlForm";
import "./App.css";

function App() {
  const [shortLinks, setShortLinks] = React.useState([]);

  return (
    <div className="app">
      <Sidebar links={shortLinks} setLinks={setShortLinks} />
      <div className="main">
        <h1>URL Shortener</h1>
        <UrlForm setLinks={setShortLinks} />
      </div>
    </div>
  );
}

export default App;
