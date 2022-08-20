import { CreateClassDialog } from "@component:CreateClassDialog";
import { DashboardContent } from "@component:DashboardLayout";
import Loader from "@component:Loader";
import UserDisplay from "@component:UserDisplay";
import truncate from "@/truncate";
import { trpc } from "@/util/trpc";
import Card from "@component:Basic/Card";
import { PlusIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

export default function Classes() {
  const { data: session, status } = useSession();
  const classes = trpc.useQuery(['class.all']);
  const createClassMutation = trpc.useMutation('class.create');
  const [createClassOpen, setCreateClassOpen] = useState(false);
  const createClass = async (name: string, description: string) => {
    createClassMutation.mutate({ name, description }, { onSuccess(data, variables, context) {
      setCreateClassOpen(false);
      classes.refetch();
    }});
  }
  return <DashboardContent>
    <Head>
      <title>Classes | Harknology</title>
    </Head>
    <h1 className="text-2xl font-light text-center">Classes</h1>
    <h2 className="text-xl font-light text-center">Classes You Teach</h2>
    <Loader depends={classes} borderColor="black" center>
      <div className="flex flex-row flex-wrap max-w-[800px] mx-auto justify-center">
        {classes.data?.classesTeaching?.map(classroom => <Link key={classroom.id} href={"/classes/" + classroom.id} passHref>
          <Card title={classroom.name} href={`/classes/${classroom.id}`}>
            <UserDisplay email={classroom.teacherEmail} />
            <p>{truncate(classroom.description, 100)}</p>
          </Card>
        </Link>)}
        <Card onClick={() => setCreateClassOpen(true)} title="Create Class" cardType="placeholder" icon={PlusIcon} />
      </div>
    </Loader>
    <h2 className="text-xl font-light text-center">Your Classes</h2>
    <Loader depends={classes} borderColor="black" center>
      <div className="flex flex-row flex-wrap max-w-[800px] mx-auto justify-center">
        {classes?.data?.classes?.map(classroom => <Link key={classroom.id} href={"/classes/" + classroom.id} passHref>
          <Card title={classroom.name} href={`/classes/${classroom.id}`}>
            <UserDisplay email={classroom.teacherEmail} />
            <p>{truncate(classroom.description, 100)}</p>
          </Card>
        </Link>)}
      </div>
    </Loader>

    <CreateClassDialog open={createClassOpen} onSubmit={createClass} onCancel={() => setCreateClassOpen(false)} />
  </DashboardContent>
}
