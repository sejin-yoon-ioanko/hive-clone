declare namespace NodeJS {
  interface Process {
    env: ProcessEnv
  }
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'; // https://cli.vuejs.org/guide/mode-and-env.html#modes-and-environment-variables
    [key: string]: string;
  }
}