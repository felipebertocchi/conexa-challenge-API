import dotenv from 'dotenv';
dotenv.config({ path: '.env.test.local' });
import type { Config } from "@jest/types";

export default async (): Promise<Config.InitialOptions> => {
  return {
    preset: "ts-jest",
    displayName: {
      name: "API",
      color: "cyan",
    },
    verbose: true,
    silent: true,
    setupFiles: ["dotenv/config"],
    testMatch: ["**/**/*.test.ts"],
    testEnvironment: "node",
    detectOpenHandles: true,
    transform: { "^.+\\.tsx?$": "ts-jest" },
    forceExit: true,
  };
};