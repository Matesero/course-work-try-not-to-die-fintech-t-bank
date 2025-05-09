/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />
interface ImportMetaEnv {
    readonly VITE_MEDICAL_SYSTEM_API_HOST: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
