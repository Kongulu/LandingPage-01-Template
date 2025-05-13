import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Router } from "wouter";

// Use hash-based routing for better compatibility
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router base="/website-guide">
    <App />
  </Router>
);