import { initData, closeData } from "#internal/data/index";

export * from "#internal/services/game-version-service";
export * from "#internal/services/localization-service";
export * from "#internal/services/item-service";

export const initServices = async () => {
	await initData();
};

export const closeServices = async () => {
	await closeData();
};
