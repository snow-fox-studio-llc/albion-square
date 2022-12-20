import { model, Schema } from "mongoose";
import axios from "axios";
import { AdpVersion, AdpVersionDocument, AdpVersionStatus } from "@as/types";

const adpVersionSchema = new Schema<AdpVersionDocument>(
	{
		sha: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const AdpVersionModel = model<AdpVersionDocument>(
	"AdpVersion",
	adpVersionSchema
);

export const createAdpVersion = async (
	version: AdpVersion["sha"]
): Promise<void> => {
	await AdpVersionModel.create({ version });
};

export const findLocalAdpVersion = async (): Promise<string | null> => {
	const adpVersionDocument = await AdpVersionModel.findOne()
		.sort({ created_at: -1 })
		.lean()
		.exec();
	return adpVersionDocument ? adpVersionDocument.sha : null;
};

export const fetchRemoteAdpVersion = async (): Promise<string> => {
	return (
		await axios.get(
			"https://api.github.com/repos/broderickhyman/ao-bin-dumps/commits/master",
			{ responseType: "json" }
		)
	).data.sha;
};
