import { useEffect } from "react";

import { useCarousel } from "./CarouselRoot";

type CarouselSlideProps = {
    value: number;
} & React.ComponentProps<"div">;

export function CarouselSlide({ value, ...rest }: CarouselSlideProps) {
    const { slide, setSlides } = useCarousel();

    useEffect(() => {
        setSlides((slides) =>
            slides.includes(value) ? slides : [...slides, value],
        );
    }, []);

    if (slide !== value) return null;

    return <div {...rest} />;
}
