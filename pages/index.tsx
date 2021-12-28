import Banner from '@component:Banner'
import type { NextPage } from 'next'
import { useSession, signIn, signOut } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image'
import styles from '@~/styles/Home.module.css'

const Home: NextPage = () => {
    const {data: session, status} = useSession();
  return (
    <div className={styles.container}>
      <Head>
        <title>Welcome | Harknology</title>
        <meta name="description" content="Manage your class discussions easily." />
      </Head>

      <main className={styles.main}>
        <Banner/>

        <p className={styles.description}>
          Manage your class discussions easily.
        </p>

        <div className={styles.grid}>
          {status == "authenticated"?
            <div className={styles.cardStack}>
            <Link href="/dashboard">
                <a className={styles.card}><h2>Dashboard &rarr;</h2></a>
            </Link>
            <a onClick={() => signOut()} className={styles.card}>
                <h2>Sign out &rarr;</h2>
            </a>
            </div>
            :
            <a onClick={() => signIn()} className={styles.card}>
                <h2>Sign In &rarr;</h2>
                <p>Sign in with Google to start using Harknology.</p>
            </a>
          }

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn More&rarr;</h2>
            <p>Learn more about Harknology, and whether it would be right for you.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
