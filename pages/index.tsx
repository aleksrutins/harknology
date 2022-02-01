import Banner from '@component:Banner'
import type { NextPage } from 'next'
import { useSession, signIn, signOut } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image'
import Card from '@/components/Card';
import { DashboardContent } from '@/components/DashboardLayout';

const Home: NextPage = () => {
    const {data: session, status} = useSession();
  return (
    <DashboardContent>
      <Head>
        <title>Welcome | Harknology</title>
        <meta name="description" content="Manage your class discussions easily." />
      </Head>

      <main className="max-w-[800px] mx-auto">
        <Banner/>

        <p className="text-lg mt-2 text-center">
          Manage your class discussions easily.
        </p>

        <div className="flex flex-row flex-wrap justify-center">
          {status == "authenticated"?
            <div className="flex flex-col">
            <Card href='/dashboard' title='Dashboard'/>
            <Card onClick={() => signOut()} title='Sign Out'/>
            </div>
            :
            <Card onClick={() => signIn()} title="Sign In">
                <p>Sign in with Google to start using Harknology.</p>
            </Card>
          }

          <Card href="https://nextjs.org/learn" title="Learn More">
            Learn more about Harknology, and whether it would be right for you.
          </Card>
        </div>
      </main>
    </DashboardContent>
  )
}

export default Home
