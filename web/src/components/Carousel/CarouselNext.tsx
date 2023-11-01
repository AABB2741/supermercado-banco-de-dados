import { useCarousel } from "./CarouselRoot";

type CarouselNextProps = Omit<React.ComponentProps<"button">, "onClick">;

export function CarouselNext({ children, ...rest }: CarouselNextProps) {
    const { slide, setSlide } = useCarousel();

    return (
        <button {...rest} onClick={() => setSlide(slide + 1)}>
            {children}
        </button>
    );
}
