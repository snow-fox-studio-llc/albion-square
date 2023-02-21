import { GameVersion } from "#types";
export declare const createGameVersion: (version: GameVersion["version"]) => Promise<void>;
export declare const findLatestVersion: () => Promise<string | null>;
export declare const fetchLatestVersion: () => Promise<string>;
