import Button from "@component:Basic/Button";
import Loader from "@/components/Loader";
import UserDisplay from "@/components/UserDisplay";
import Link from "next/link";
import { useRouter } from "next/router";
import { trpc } from "@/util/trpc";

export default function JoinClass() {
    const router = useRouter();
    const { data } = trpc.useQuery(['joinCode.info', router.query.code as string]);
    const mutation = trpc.useMutation('joinCode.joinClass');
    async function join() {
        await mutation.mutateAsync(router.query.code as string);
        router.push('/classes/' + data?.class.id);
    }
    return (
        <Loader borderColor="black" depends={data} center>
            <div className="flex justify-center items-center w-full h-full">
                <div className="text-center">
                    <h1 className="text-xl font-light text-center">Joining &ldquo;{data?.class.name}&rdquo;</h1>
                    <span className="text-[0.75rem]">Taught by</span>
                    <span className="flex flex-row justify-center text-[0.75rem]"> <UserDisplay email={data?.teacher.email!} /></span>
                    <p>Would you like to join this class?</p>
                    <Button buttonStyle="primary" onClick={join}>Join</Button>
                    <Link href="/classes" passHref legacyBehavior><Button buttonStyle="danger">Cancel</Button></Link>
                </div>
            </div>
        </Loader>
    );
}
