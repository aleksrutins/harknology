import { PropType, defineComponent, h } from "vue"
import { supabase } from "../util/supabase"

type UserInfo = { email: string }

const userInfo = new Map<string, UserInfo>();

async function fetchInfo(uid: string): Promise<UserInfo | undefined> {
    if(userInfo.has(uid)) return userInfo.get(uid);
    else {
        try {
            const info = (await supabase.functions.invoke('get-user', { body: { uid } })).data
            if(info) userInfo.set(uid, info);
            return info;
        } catch(e) {
            console.log(e)
            return undefined
        }
    }
}

export default defineComponent({
    name: 'UserDisplay',
    props: {
        uid: String as PropType<string | null | undefined>
    },
    async setup({ uid }) {
        const email = (await fetchInfo(uid ?? ""))?.email

        return () => email
            ? h('p', { 'class': 'text-sm' }, email)
            : h('p', { 'class': 'text-sm' }, "Unknown User")
    }
})