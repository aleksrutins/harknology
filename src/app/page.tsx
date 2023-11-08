import prisma from "@/lib/prisma";
import { getClasses } from "@/utils/classes";
import { UserButton, auth } from "@clerk/nextjs";
import { Class } from "@prisma/client";
import { Button, Container, Flex, TextArea, TextField, TextFieldInput } from "@radix-ui/themes";
import { revalidateTag } from "next/cache";
import { cache } from "react";
import styles from './home.module.css';
import UserProfile from "./components/UserProfile";
import Link from "next/link";
import Image from "next/image";
import logo from '@/../public/logo.svg'
import CreateClassDialog from "./CreateClassDialog";

export default async function Home() {
  const { userId } = auth();
  const classes = await getClasses(userId!)

  return (
    <Flex direction="column" align="center" px="2" style={{ backgroundColor: 'var(--gray-a2)', width: '100vw', height: '100vh' }}>
      <Flex direction="row" justify="between" align="center" gap="2" style={{alignSelf: 'stretch'}} px="2">
        <Flex direction="row" align="center" gap="2">
          <Image src={logo} alt="Harknology" width="32" height="32"/>
          <h2>Harknology</h2>
        </Flex>
        <UserButton afterSignOutUrl="/" />
      </Flex>
      <Container size="3" style={{ minHeight: "50vh", maxWidth: '90vw' }}>
        <Flex direction="row" justify="between" align="center" gap="2">
          <h1>Your Classes</h1>
          <CreateClassDialog teacherId={userId!}/>
        </Flex>
        <Flex direction="row" justify="start" wrap="wrap" gap="5">
          {classes.map(cls =>
            <Link href={`/c/${cls.id}`} key={cls.id} className={styles.classCard}>
              <h2 style={{margin: 0}}>{cls.name}</h2>
              <UserProfile userId={cls.teacher_id}/>
              <p>{cls.description}</p>
            </Link>
          )}
        </Flex>
      </Container>
    </Flex>
  )
}
