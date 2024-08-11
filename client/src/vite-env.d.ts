/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_WS: string;
    readonly VITE_API_URL: string;
    readonly VITE_VERSION: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
