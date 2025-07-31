"use client";

import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LuYoutube } from "react-icons/lu";
import DialogInfoRealisations from "./dialog-info-realisation";
import ReactPlayer from "react-player";

interface CarouselVideoProps {
  el: any;
}

const CarouselVideo: React.FC<CarouselVideoProps> = (props) => {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  return (
    <>
      <Carousel
        plugins={[plugin.current]}
        opts={
          {
            //loop: true,
          }
        }
        onMouseDown={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        onContextMenu={(e) => e.preventDefault()}
      >
        <CarouselContent>
          {props.el?.map((el: any, index: number) => (
            <CarouselItem
              key={index}
              className="container mx-auto px-4 basis-1/1 lg:basis-1/2 md:px-6 lg:px-8"
            >
              <div className="flex justify-center">
                <Card className="w-full max-w-3xl overflow-hidden border-none bg-white dark:bg-black">
                  <ReactPlayer
                    url={el.video}
                    controls
                    width="100%"
                    height="250px"
                  />
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-black dark:text-white">
                      {el.title}
                    </CardTitle>
                    <CardDescription className="text-slate-800 dark:text-white">
                      {el.description}
                    </CardDescription>
                    <div className="flex gap-2 mt-4">
                      {el.platforms?.map((el: any, index: number) => (
                        <Badge variant="default" key={index}>
                          {el}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Separator className="my-4 bg-[#d4d4d8] dark:bg-[#1c1917]" />
                    <p className="text-slate-800 dark:text-white mb-4 truncate">
                      {el.data.presentation}
                    </p>
                    <Separator className="my-4 bg-[#d4d4d8] dark:bg-[#1c1917]" />
                    <div className="flex gap-2 mt-4">
                      {el.languages?.map((language: any, index: number) => (
                        <Badge
                          className="text-white"
                          key={index}
                          style={{ background: language.color }}
                        >
                          {language.name}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:display"/>
        <CarouselNext className="hidden md:display"/>
      </Carousel>
    </>
  );
};

export default CarouselVideo;
