import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/styles/index.css"; 
import './i18n';

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <div className="h-screen overflow-y-scroll">
            <App />
        </div>
    </React.StrictMode>
);