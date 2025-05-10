declare global {
    namespace NodeJS {
      interface ProcessEnv {
        ethURL: string;
        DATABASE_URL: string;
      }
    }
}
  
export {};