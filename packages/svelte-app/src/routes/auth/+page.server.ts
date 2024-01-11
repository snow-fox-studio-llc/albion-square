import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
    const session = await event.parent();

    if (session != null) {
        redirect(301, "/app");
    }
}
