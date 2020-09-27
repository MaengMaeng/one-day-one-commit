declare namespace NodeJS {
  export interface ProcessEnv {
    /** node environment */
    PORT: number;
    MONGO_URL: string;
    MONGO_URL_DEV: string;
    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;
    GITHUB_CLIENT_ID_DEV: string;
    GITHUB_CLIENT_SECRET_DEV: string;
    COOKIE_SECRET: string;
  }
}
