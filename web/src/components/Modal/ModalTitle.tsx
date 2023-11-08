import * as Dialog from "@radix-ui/react-dialog";

interface ModalTitleProps extends Dialog.DialogTitleProps {}

export function ModalTitle(props: ModalTitleProps) {
    return <Dialog.Title {...props} className="mb-4 text-lg font-bold" />;
}
