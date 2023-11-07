import { Pencil1Icon } from "@radix-ui/react-icons";
import { Button, DialogContent, DialogRoot, DialogTrigger } from "@radix-ui/themes";
import ResponseEditor from "./ResponseEditor";

export default function EditResponseDialog({ discussionId, responseId }: { discussionId: string, responseId: string }) {
    return <DialogRoot>
        <DialogTrigger>
            <Button type="button">
                <Pencil1Icon />
            </Button>
        </DialogTrigger>
        <DialogContent style={{maxWidth: '75vw', maxHeight: '75vh', overflow: 'auto'}}>
            <ResponseEditor discussionId={discussionId} responseId={responseId} cardVariant="ghost" shouldCloseDialog/>
        </DialogContent>
    </DialogRoot>
}