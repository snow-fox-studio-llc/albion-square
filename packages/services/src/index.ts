import { initData, closeData } from "@as/data";

export const initServices = async () => {
    await initData();
}

export const closeServices = async () => {
    await closeData();
}

export * from "#internal/game-version-service";
export * from "#internal/item-service";
export * from "#internal/localization-service";
