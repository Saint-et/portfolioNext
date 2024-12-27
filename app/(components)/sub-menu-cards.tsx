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
import DialogInfoRealisations from "./dialog-info-realisation";

interface SubMenuCardsProps {
  el: any;
  setSrcImg: React.Dispatch<React.SetStateAction<string>>;
}

const SubMenuCards: React.FC<SubMenuCardsProps> = (props) => {
  const pluginPresentation = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  );

  return (
    <>
      <div className="rounded-md shadow-md overflow-clip shadow-md bg-white dark:bg-black">
        <img
          src={props.el.image.src}
          alt="Project 1"
          className="w-full h-48 object-cover border-b border-zinc-300 dark:border-black"
          style={{ aspectRatio: "500/300", objectFit: "cover" }}
          onMouseDown={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          onContextMenu={(e) => e.preventDefault()}
          onClick={() => {
            props.setSrcImg(props.el.image.src);
          }}
        />
        <div className="p-4">
          <h3 className="text-lg font-bold">{props.el.title}</h3>
          <div className="flex gap-2 mt-4">
            {props.el.platforms?.map((el: any, index: any) => (
              <Badge variant="default" key={index}>
                {el}
              </Badge>
            ))}
          </div>
          <Separator className="my-4 bg-[#d4d4d8] dark:bg-[#1c1917]" />
          <p className="text-slate-800 dark:text-white mt-2 truncate">
            {props.el.description}
          </p>
          <Separator className="my-4 bg-[#d4d4d8] dark:bg-[#1c1917]" />
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
          <Separator className="my-4 bg-[#d4d4d8] dark:bg-[#1c1917]" />
          <DialogInfoRealisations el={props.el} />
        </div>
      </div>
    </>
  );
};

export default SubMenuCards;
