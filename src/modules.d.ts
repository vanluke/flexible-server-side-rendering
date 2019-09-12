declare interface NodeModule {
  hot: {
    accept(path?: string | (() => void), callback?: () => void): void;
  };
}

declare module '.*jpg';
declare module '.*png';
