import { useAuth } from "@/auth";
import Card from "@component:Basic/Card";
import { DashboardContent } from "@component:DashboardLayout";
import Loader from "@component:Loader";
import LoadingIndicator from "@component:LoadingIndicator";
import { trpc } from "@/util/trpc";
import { useSession } from "next-auth/react";
import Head from "next/head";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const { data: classes } = trpc.useQuery(['class.all']);
  return <DashboardContent>
    <Head>
      <title>Dashboard | Harknology</title>
    </Head>
    <Loader depends={session && classes} borderColor="black" center>

    </Loader>
  </DashboardContent>
}
