import UserProfile from "@/app/components/UserProfile";
import { getMembers } from "@/utils/classes";
import { Container, Flex } from "@radix-ui/themes";
import InviteDialog from "./InviteDialog";

export default async function ClassMembers({ params: { id: classId } }: { params: { id: string }}) {
    const members = (await getMembers(classId))!;
    return <Container px="3">
        <Flex align="center" gap="3">
            <h1>Members</h1>
            <InviteDialog classId={classId} />
        </Flex>

        <h2>Teachers</h2>
        <UserProfile userId={members.teacher_id}/>
        
        <h2>Students</h2>
        <Flex direction="row" gap="3" wrap="wrap">
            {members.students.map(({ student_id: id }) => <UserProfile key={id} userId={id} />)}
        </Flex>
    </Container>
}