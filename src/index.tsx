import React from "react"; // Import React
import ReactDOM from "react-dom/client"; // Import ReactDOM for React 18+
import "./styles.css"; // Import your CSS file for styling
import App from "./App"; // Import the App component

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App /> {/* Render the App component */}
  </React.StrictMode>
);
