import { useCarousel } from "./CarouselRoot";

type CarouselPrevProps = Omit<React.ComponentProps<"button">, "onClick">;

export function CarouselPrev({ children, ...rest }: CarouselPrevProps) {
    const { slide, setSlide } = useCarousel();

    return (
        <button {...rest} onClick={() => setSlide(slide - 1)}>
            {children}
        </button>
    );
}
