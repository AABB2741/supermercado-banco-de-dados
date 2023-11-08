import * as Dialog from "@radix-ui/react-dialog";

interface ModalRootProps extends Dialog.DialogProps {}

export function ModalRoot(props: ModalRootProps) {
    return <Dialog.Root {...props} />;
}
