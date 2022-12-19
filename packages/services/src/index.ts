import { initData, closeData } from "@as/data";

export const initServices = async () => {
    await initData();
}

export const closeServices = async () => {
    await closeData();
}

export * from "#internal/adp-version-service";
export * from "#internal/item-service";
export * from "#internal/localization-service";
