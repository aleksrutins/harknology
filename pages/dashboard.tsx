import DashboardLayout from "@/components/DashboardLayout";
import LoadingIndicator from "@/components/LoadingIndicator";

export default function Dashboard() {
    return <DashboardLayout>
        <LoadingIndicator borderColor="black" center/>
    </DashboardLayout>
}