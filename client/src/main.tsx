import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add Inter font styles
document.documentElement.classList.add('font-sans');

// Add custom styling for step cards
const style = document.createElement('style');
style.textContent = `
  .step-card {
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  }
  .step-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;
document.head.appendChild(style);

createRoot(document.getElementById("root")!).render(<App />);
