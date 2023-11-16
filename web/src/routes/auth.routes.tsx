import { useState } from "react";
import { Outlet } from "react-router-dom";

import { Carousel } from "../components/Carousel";

import authBackground from "../assets/auth-background.jpg";
import { Slider } from "@radix-ui/react-slider";

export function AuthRoutes() {
    const [slide, setSlide] = useState(1);

    return (
        <div className="max-h-screen min-h-screen flex-1 flex-col items-center justify-between overflow-y-auto lg:flex lg:h-screen lg:flex-row lg:overflow-y-hidden">
            <Carousel.Root slide={slide} onSlideChange={setSlide}>
                <Carousel.Slide
                    value={1}
                    className="relative flex h-[50vh] w-full flex-col justify-end overflow-hidden bg-cover bg-center lg:h-full lg:w-1/2"
                    style={{
                        backgroundImage: `url('${authBackground}')`,
                    }}
                >
                    <div className="pointer-events-none absolute h-full w-full bg-gradient-to-b from-transparent to-black" />

                    <div className="z-10">
                        <h1 className="mx-4 text-center text-3xl font-bold">
                            A sua lista de compras. Do seu jeito.
                        </h1>
                        <p className="mx-4 my-4 text-center">
                            Com opções altamente personalizáveis, o RPB Shopping
                            permite você criar a sua lista de compras do jeito
                            que você quiser.
                        </p>
                    </div>
                </Carousel.Slide>
            </Carousel.Root>
            <div className="mx-auto max-w-[600px] flex-1 p-8 lg:max-h-full lg:overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
}
