import { useClasses } from "@/api";
import { useAuth } from "@/auth";
import Card from "@/components/Basic/Card";
import { DashboardContent } from "@/components/DashboardLayout";
import Loader from "@/components/Loader";
import LoadingIndicator from "@/components/LoadingIndicator";
import Head from "next/head";

export default function Dashboard() {
  const { session, status } = useAuth();
  const { data: classes } = useClasses();
  return <DashboardContent>
    <Head>
      <title>Dashboard | Harknology</title>
    </Head>
    <Loader depends={session && classes} borderColor="black" center>
        
    </Loader>
  </DashboardContent>
}