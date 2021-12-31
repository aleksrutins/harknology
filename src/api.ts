import useSWR from "swr";
import json from "./json";
import { Class } from "@prisma/client";
import { useAuth } from "./auth";


export function useClasses() {
    const {data: classes, error} = useSWR('/api/classes', json);
    const {session} = useAuth();
    return {
        classes: (classes as Class[]),
        error,
        async createClass(data: {name: string, description: string, teacherEmail: string}) {
            return await fetch('/api/createClass', {
                body: JSON.stringify(data)
            });
        }
    };
}