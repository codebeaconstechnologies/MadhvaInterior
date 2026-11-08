import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { installLinkTracking } from "./lib/analytics";
import "./styles/index.css";

installLinkTracking();

// Pages are prerendered to HTML at build time (scripts/prerender.mjs), so
// React attaches to that markup instead of rendering from scratch.
const root = document.getElementById("root")!;
const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

if (root.hasChildNodes()) ReactDOM.hydrateRoot(root, app);
else ReactDOM.createRoot(root).render(app);
