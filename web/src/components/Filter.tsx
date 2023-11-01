import { LucideProps, ChevronLeft, ChevronRight } from "lucide-react";

import { Carousel } from "./Carousel";
import { useState } from "react";

type FilterOption = {
    label: string;
    icon: React.ElementType<LucideProps>;
    value: string;
    color?: string;
};

interface FilterProps {
    title?: string;
    value?: string;
    options: FilterOption[];
    onValueChange?: (value: string) => void;
}

export function Filter({ title, value, options, onValueChange }: FilterProps) {
    const [slide, setSlide] = useState(0);

    return (
        <div>
            {title && (
                <p className="mb-4 px-4 pt-4 text-lg font-bold md:px-6 md:pt-6 lg:px-10 lg:pt-10">
                    {title}
                </p>
            )}
            <Carousel.Root slide={slide} onSlideChange={setSlide}>
                <Carousel.Prev>
                    <ChevronLeft />
                </Carousel.Prev>
                <Carousel.Next>
                    <ChevronRight />
                </Carousel.Next>

                <Carousel.Slide value={0}>Slide 0</Carousel.Slide>
                <Carousel.Slide value={1}>Slide 1</Carousel.Slide>
                <Carousel.Slide value={2}>Slide 2</Carousel.Slide>
                <Carousel.Slide value={3}>Slide 3</Carousel.Slide>
                <Carousel.Slide value={4}>Slide 4</Carousel.Slide>
                <Carousel.Slide value={5}>Slide 5</Carousel.Slide>
                <Carousel.Slide value={6}>Slide 6</Carousel.Slide>
                <Carousel.Slide value={7}>Slide 7</Carousel.Slide>
                <Carousel.Slide value={8}>Slide 8</Carousel.Slide>
                <Carousel.Slide value={9}>Slide 9</Carousel.Slide>
                <Carousel.Slide value={10}>Slide 10</Carousel.Slide>
            </Carousel.Root>
            <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-8 md:px-6 lg:px-10">
                {options.map((o) => (
                    <button
                        className="flex flex-col items-center whitespace-nowrap rounded-xl bg-gray-100 px-8 py-4 shadow-md data-[selected=true]:border-transparent data-[selected=true]:bg-gradient-to-br data-[selected=true]:from-sky-400 data-[selected=true]:to-sky-600 data-[selected=true]:text-white dark:border dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                        data-selected={value === o.value}
                        key={o.value}
                        onClick={() => onValueChange?.(o.value)}
                    >
                        <o.icon size={28} />
                        <p className="mt-2 font-bold">{o.label}</p>
                    </button>
                ))}
            </div>
        </div>
    );
}
