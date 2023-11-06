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

export default async function Home() {
  const { userId } = auth();
  const classes = await getClasses(userId!)

  async function createClass(data: FormData) {
    'use server'

    await prisma.class.create({
      data: {
        name: data.get('name') as string,
        description: data.get('description') as string,
        teacher_id: userId!
      }
    });

    revalidateTag('classes')
  }

  return (
    <Flex align="center" justify="center" style={{ backgroundColor: 'var(--gray-a2)', width: '100vw', height: '100vh', padding: '20px' }}>
      <Container size="3" style={{ minHeight: "50vh", maxWidth: '90vw' }}>
        <Flex direction="row" justify="between" align="center">
          <Flex direction="row" align="center" gap="3">
            <Image src={logo} alt="Harknology" width="48" height="48"/>
            <h1>Your Classes</h1>
          </Flex>
          <UserButton afterSignOutUrl="/" />
        </Flex>
        <Flex direction="row" wrap="wrap" gap="5">
          {classes.map(cls =>
            <Link href={`/c/${cls.id}`} key={cls.id} className={styles.classCard}>
              <h2 style={{margin: 0}}>{cls.name}</h2>
              <UserProfile userId={cls.teacher_id}/>
              <p>{cls.description}</p>
            </Link>
          )}

          <form action={createClass} className={styles.classCard}>
            <TextFieldInput placeholder="Name" name="name" />
            <TextArea placeholder="Description" name="description" />
            <Button type="submit" variant="solid">Create Class</Button>
          </form>
        </Flex>
      </Container>
    </Flex>
  )
}
