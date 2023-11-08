import * as Dialog from "@radix-ui/react-dialog";

interface ModalTriggerProps extends Dialog.DialogTriggerProps {}

export function ModalTrigger(props: ModalTriggerProps) {
    return <Dialog.Trigger asChild {...props} />;
}
