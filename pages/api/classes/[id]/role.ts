import apiRoute from "@/util/apiRoute";
import { getSession } from "next-auth/react";

export default apiRoute<string>(['checkClassAuth'], async ({ id }, { req }, checkClassAuth) => {
    const session = await getSession({ req });
    if(!session) {
        return [403, 'Not authorized'];
    }
    try {
        const [_, role] = await checkClassAuth(id, session);
        return [200, role];
    } catch(e) {
        return [200, 'none'];
    }
})