/// <reference types="mongoose/types/aggregate.js" />
/// <reference types="mongoose/types/callback.js" />
/// <reference types="mongoose/types/collection.js" />
/// <reference types="mongoose/types/connection.js" />
/// <reference types="mongoose/types/cursor.js" />
/// <reference types="mongoose/types/document.js" />
/// <reference types="mongoose/types/error.js" />
/// <reference types="mongoose/types/expressions.js" />
/// <reference types="mongoose/types/helpers.js" />
/// <reference types="mongoose/types/middlewares.js" />
/// <reference types="mongoose/types/indexes.js" />
/// <reference types="mongoose/types/models.js" />
/// <reference types="mongoose/types/mongooseoptions.js" />
/// <reference types="mongoose/types/pipelinestage.js" />
/// <reference types="mongoose/types/populate.js" />
/// <reference types="mongoose/types/query.js" />
/// <reference types="mongoose/types/schemaoptions.js" />
/// <reference types="mongoose/types/schematypes.js" />
/// <reference types="mongoose/types/session.js" />
/// <reference types="mongoose/types/types.js" />
/// <reference types="mongoose/types/utility.js" />
/// <reference types="mongoose/types/validation.js" />
/// <reference types="mongoose/types/virtuals.js" />
/// <reference types="mongoose/types/inferschematype.js" />
import { Schema } from "mongoose";
import { Item, DistinctItem, Localization, LocalizationDocument } from "#types";
export declare const localizationSchema: Schema<LocalizationDocument, import("mongoose").Model<LocalizationDocument, any, any, any, any>, {}, {}, {}, {}, "type", LocalizationDocument>;
export declare const LocalizationModel: import("mongoose").Model<LocalizationDocument, {}, {}, {}, any>;
export declare const upsertLocalization: (localization: Localization) => Promise<void>;
export declare const upsertLocalizationList: (localizationList: Localization[]) => Promise<void>;
export declare const validateLocalization: (localization: Localization) => Promise<void>;
export declare const findLocalizationList: (filter: Pick<Localization, "namespace" | "key">[]) => Promise<LocalizationDocument[]>;
export declare const findLocalizationByItemUniqueName: (uniqueName: Item["uniqueName"]) => Promise<LocalizationDocument | null>;
export declare const findLocalizationListByItemUniqueName: (uniqueNames: Item["uniqueName"][]) => Promise<Localization[]>;
export declare const findLocalizationByShopCategoryId: (id: string) => Promise<LocalizationDocument | null>;
export declare const findLocalizationByShopSubCategoryId: (id: string) => Promise<LocalizationDocument | null>;
export declare const findLocalizationByItemQuality: (quality: DistinctItem["quality"]) => Promise<LocalizationDocument | null>;
export declare const findAllMarketplaceRolloutLocalization: () => Promise<LocalizationDocument[]>;
export declare const deleteLocalizationGhosts: (currentVersion: Localization["version"]) => Promise<void>;
export declare const fetchLocalization: (commit: string) => Promise<any>;
