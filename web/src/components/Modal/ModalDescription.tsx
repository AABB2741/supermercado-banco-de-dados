import * as Dialog from "@radix-ui/react-dialog";

interface ModalDescriptionProps extends Dialog.DialogDescriptionProps {}

export function ModalDescription(props: ModalDescriptionProps) {
    return <Dialog.Description {...props} />;
}
// "mb-4 mt-2
