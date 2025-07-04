"use client";

import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface DialogInfoRealisationsProps {
  el: any;
}

const DialogInfoRealisations: React.FC<DialogInfoRealisationsProps> = (
  props
) => {
  const pluginPresentation = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  );

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" className="text-white">
            En savoir plus
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="h-[85vh] w-[98%] max-w-[1400px] flex flex-col justify-start p-2 overflow-clip">
          <DialogHeader>
            <DialogTitle>{props.el.title}</DialogTitle>
            <DialogDescription>
              En savoir plus sur {props.el.title}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-full p-4">
            <div className="container mx-auto px-4 py-8">
              <div className="flex flex-col items-center">
                <div className="my-8 text-4xl font-bold text-blue-500">
                  {props.el.title}
                </div>
                <p className="text-lg w-full max-w-[800px]">
                  {props.el.data.presentation}
                </p>
                <div className="flex flex-col items-center my-8">
                  <Image
                    src={props.el.image.src}
                    width={300}
                    height={300}
                    alt={props.el.title}
                    className="rounded"
                    onMouseDown={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </div>
                <div className="w-full max-w-[800px]">
                  <div className="my-8 text-2xl font-bold text-slate-500">
                    Languages utilisé :
                  </div>
                  <div className="flex gap-2 mt-4">
                    {props.el.languages?.map((language: any, index: any) => (
                      <Badge
                        className="text-white"
                        key={index}
                        style={{ background: language.color }}
                      >
                        {language.name}
                      </Badge>
                    ))}
                  </div>
                  <div className="my-8 text-2xl font-bold text-slate-500">
                    Le projet inclut les éléments suivants :
                  </div>
                  <ul className="space-y-8">
                    {props.el.data.li?.map((el: string, index: number) => (
                      <li key={index} className="text-lg">
                        <span className="text-blue-800 font-bold">
                          {el.split(":")[0]}:
                        </span>
                        {el.split(":")[1]}
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator className="my-4" />
                <div className="w-full max-w-[800px] my-8 text-2xl font-bold text-slate-500">
                  Illustrations :
                </div>
                <Carousel
                  className="w-full"
                  plugins={[pluginPresentation.current]}
                  opts={{
                    loop: true,
                  }}
                >
                  <CarouselContent>
                    {props.el.imageProjet?.map((img: any, index: any) => (
                      <CarouselItem key={index}>
                        <div className="flex flex-col items-center" key={index}>
                          <Image
                            src={img.src}
                            width={1000}
                            height={1000}
                            alt={props.el.title}
                            className="rounded w-full max-w-[800px] max-h-[500px] object-contain"
                            onMouseDown={(e) => e.preventDefault()}
                            onDragStart={(e) => e.preventDefault()}
                            onContextMenu={(e) => e.preventDefault()}
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
                <Separator className="my-4" />
                <p className="text-lg w-full max-w-[800px]">
                  {props.el.data.conclusion}
                </p>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogInfoRealisations;
