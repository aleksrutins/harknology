import useSWR from "swr";
import json from "./json";
import { Class } from "@prisma/client";
import { useAuth } from "./auth";


export function useClasses() {
    const {data: classes, error} = useSWR('/api/classes', json);
    const {session} = useAuth();
    return {
        data: (classes as {classes: Class[], classesTeaching: Class[]}),
        error,
        async createClass(data: {name: string, description: string}) {
            return await fetch('/api/classes/create', {
                method: 'POST',
                body: JSON.stringify(data)
            });
        }
    };
}