import { Pencil1Icon } from "@radix-ui/react-icons";
import { Button, DialogContent, DialogRoot, DialogTrigger, IconButton } from "@radix-ui/themes";
import ResponseEditor from "./ResponseEditor";

export default function EditResponseDialog({ discussionId, responseId }: { discussionId: string, responseId: string }) {
    return <DialogRoot>
        <DialogTrigger>
            <IconButton type="button">
                <Pencil1Icon />
            </IconButton>
        </DialogTrigger>
        <DialogContent style={{maxWidth: '75vw', maxHeight: '75vh', display: 'flex', flexDirection: 'column'}}>
            <ResponseEditor discussionId={discussionId} responseId={responseId} cardVariant="ghost" shouldCloseDialog/>
        </DialogContent>
    </DialogRoot>
}