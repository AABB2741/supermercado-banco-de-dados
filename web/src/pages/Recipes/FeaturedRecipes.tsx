import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

import { Carousel } from "../../components/Carousel";

import listBanner from "../../assets/list-banner.jpg";
import avatar from "../../assets/avatar.png";

export function FeaturedRecipes() {
    const [page, setPage] = useState(1);

    return (
        <Carousel.Root slide={page} onSlideChange={setPage}>
            <Carousel.Container className="relative mx-4 flex h-[500px] overflow-hidden rounded-xl text-white dark:bg-zinc-900 md:mx-6 lg:mx-8">
                <Carousel.Slide value={1} className="relative h-full w-full">
                    <img
                        src={listBanner}
                        className="absolute bottom-0 left-0 right-0 top-0 z-0 h-full w-full object-cover object-top"
                    />

                    <div className="pointer-events-none absolute h-full w-full bg-gradient-to-b from-transparent to-black" />

                    <div className="relative flex h-full flex-col justify-between md:p-6">
                        <div className="flex-1">
                            <p className="inline-block rounded-full bg-black/50 px-4 py-2">
                                Aproveite essa receita deliciosa que combina bem
                                com esse calor!
                            </p>
                        </div>

                        <div className="flex items-center justify-between">
                            <Carousel.Prev className="rounded-full bg-white/50 p-2 text-black hover:bg-white">
                                <ChevronLeft />
                            </Carousel.Prev>
                            <Carousel.Next className="rounded-full bg-white/50 p-2 text-black hover:bg-white">
                                <ChevronRight />
                            </Carousel.Next>
                        </div>

                        <div className="flex flex-1 items-end justify-between">
                            <div>
                                <h1 className="text-4xl font-bold">
                                    Suco de laranja
                                </h1>
                                <p className="my-2">
                                    Uma receita simples, mas que vale a pena o
                                    esforço.
                                </p>
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={avatar}
                                            className="h-7 w-7 rounded-full"
                                        />
                                        <span>por Joãozinho</span>
                                    </div>
                                    <span className="font-bold">
                                        3/14 ingredientes
                                    </span>
                                </div>
                            </div>
                            <div>
                                <button className="rounded-full bg-sky-500 p-4">
                                    <Plus />
                                </button>
                            </div>
                        </div>
                    </div>
                </Carousel.Slide>
            </Carousel.Container>
        </Carousel.Root>
    );
}
