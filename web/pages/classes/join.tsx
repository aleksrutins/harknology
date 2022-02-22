import { useAuth } from "@/auth";
import Button from "@component:Basic/Button";
import Loader from "@/components/Loader";
import UserDisplay from "@/components/UserDisplay";
import json from "@/json";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import { JoinInfo } from "../api/classes/join/[code]/info";

export default function Dashboard() {
    useAuth();
    const router = useRouter();
    const { data } = useSWR<JoinInfo>(`/api/classes/join/${router.query.code}/info`, json);
    async function join() {
        await fetch('/api/classes/join/' + router.query.code);
        router.push('/classes/view?id=' + data?.class.id);
    }
    return <Loader borderColor="black" depends={data} center>
        <div className="flex justify-center items-center w-full h-full">
            <div className="text-center">
                <h1 className="text-xl font-light text-center">Joining &ldquo;{data?.class.name}&rdquo;</h1>
                <span className="text-[0.75rem]">Taught by</span>
                <span className="flex flex-row justify-center text-[0.75rem]"> <UserDisplay email={data?.teacher.email!} /></span>
                <p>Would you like to join this class?</p>
                <Button buttonStyle="primary" onClick={join}>Join</Button>
                <Link href="/classes" passHref><Button buttonStyle="danger">Cancel</Button></Link>
            </div>
        </div>
    </Loader>
}
