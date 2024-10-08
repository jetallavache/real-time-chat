const { VITE_API_URL, VITE_API_WS } = import.meta.env;

export default {
    apiUrl: VITE_API_URL || "http://localhost:8080/",
    wsUrl: VITE_API_WS || "ws://localhost:8080",
    /** Do not change! */
    version: "1.0.6",
};
