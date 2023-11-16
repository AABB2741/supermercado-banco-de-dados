import React, { useState, createContext, useContext } from "react";

type CarouselRootProps = {
    children?: React.ReactNode;
    slide: number;
    onSlideChange?: (slide: number) => void;
};

type CarouselValue = {
    slide: number;
    setSlide: (slide: number) => void;
    setSlides: React.Dispatch<React.SetStateAction<number[]>>;
};

const CarouselContext = createContext({} as CarouselValue);

export function CarouselRoot({
    slide,
    children,
    onSlideChange,
}: CarouselRootProps) {
    const [slides, setSlides] = useState<number[]>([]);

    function setSlide(slide: number) {
        if (slides.indexOf(slide) === -1) {
            if (slides.sort((a, b) => (a > b ? 1 : -1))[0] > slide) {
                onSlideChange?.(slides[slides.length - 1]);
            } else {
                onSlideChange?.(slides[0]);
            }
        } else {
            onSlideChange?.(slide);
        }
    }

    return (
        <CarouselContext.Provider value={{ slide, setSlide, setSlides }}>
            {children}
        </CarouselContext.Provider>
    );
}

export const useCarousel = () => useContext(CarouselContext);
