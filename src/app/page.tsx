import prisma from "@/lib/prisma";
import { getClasses } from "@/utils/classes";
import { UserButton, auth } from "@clerk/nextjs";
import { Class } from "@prisma/client";
import { Button, Container, Flex, TextArea, TextField, TextFieldInput } from "@radix-ui/themes";
import { revalidateTag } from "next/cache";
import { cache } from "react";
import styles from './home.module.css';

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
          <h1>Your Classes</h1>
          <UserButton afterSignOutUrl="/" />
        </Flex>
        <Flex direction="row" wrap="wrap" gap="5">
          {classes.map(cls =>
            <a key={cls.id} className={styles.classCard}>
              <h2 style={{margin: 0}}>{cls.name}</h2>
              <p>{cls.description}</p>
            </a>
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
