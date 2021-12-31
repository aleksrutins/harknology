import { useAuth } from "@/auth";
import LoadingIndicator from "@/components/LoadingIndicator";

export default function Dashboard() {
    const {session, status} = useAuth();
    return <LoadingIndicator borderColor="black" center/>
}