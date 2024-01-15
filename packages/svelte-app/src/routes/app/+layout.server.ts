import type { LayoutServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: LayoutServerLoad = async (event) => {
    const { session } = await event.parent();

    if (session === null) {
        throw redirect(301, "/");
    }
}
