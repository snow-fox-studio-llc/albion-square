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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype.js" />
import { Item, ItemDocument, DistinctItem, ResultPage } from "#types";
export declare const ItemModel: import("mongoose").Model<ItemDocument, {}, {}, {}, any>;
export declare const upsertItem: (item: Item) => Promise<void>;
export declare const upsertItems: (items: Item[]) => Promise<void>;
export declare const validateItem: (item: Item) => Promise<void>;
export declare const findOneItem: (distinctItem: DistinctItem) => Promise<ItemDocument | null>;
export declare const findItems: (distinctItem: DistinctItem) => Promise<ItemDocument[]>;
/**
 * @deprecated The method should not be used
 */
export declare const findItemsAtPage: (filter: Item, limit: number, page: number) => Promise<ResultPage<ItemDocument>>;
export declare const findAllItems: () => Promise<ItemDocument[]>;
export declare const searchItems: (query: string, lang: string, distinctItem: DistinctItem) => Promise<ItemDocument[]>;
/**
 * @deprecated The method should not be used
 */
export declare const searchItemsAtPage: (query: string, lang: string, filter: Item, limit: number, page: number) => Promise<ResultPage<ItemDocument>>;
export declare const deleteItemGhosts: (currentVersion: Item["version"]) => Promise<void>;
export declare const fetchItems: (commit: string) => Promise<any>;
