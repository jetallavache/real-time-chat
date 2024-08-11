/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_HOST: string;
    readonly VITE_PORT: string;
    readonly VITE_API_URL: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
