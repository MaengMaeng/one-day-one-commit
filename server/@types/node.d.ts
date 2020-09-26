declare namespace NodeJS {
  export interface ProcessEnv {
    /** node environment */
    PORT_DEV: number;
    PORT: number;
    MONGO_URL: string;
    MONGO_URL_DEV: string;
    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;
  }
}
