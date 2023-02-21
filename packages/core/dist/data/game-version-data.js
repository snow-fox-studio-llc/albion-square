import { model, Schema } from "mongoose";
import axios from "axios";
const gameVersionSchema = new Schema({
    version: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const GameVersionModel = model("GameVersion", gameVersionSchema);
export const createGameVersion = async (version) => {
    await GameVersionModel.create({ version });
};
export const findLatestVersion = async () => {
    const gameVersionDocument = await GameVersionModel.findOne()
        .sort({ created_at: -1 })
        .lean()
        .exec();
    return gameVersionDocument ? gameVersionDocument.version : null;
};
export const fetchLatestVersion = async () => {
    return (await axios.get("https://api.github.com/repos/broderickhyman/ao-bin-dumps/commits/master", { responseType: "json" })).data.sha;
};
//# sourceMappingURL=game-version-data.js.map