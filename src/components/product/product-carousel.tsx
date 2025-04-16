"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Media {
  id: string;
  normal: {
    url: string;
    width: number;
    height: number;
  };
}

interface Props {
  images: Media[];
}

export const ProductCarousel = ({ images }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi]);

  const scrollTo = (index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  };

  return (
    <div className="relative w-full lg:flex-1">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((image) => (
            <div className="min-w-0 flex-[0_0_100%]" key={image.id}>
              <Image
                src={image.normal.url}
                alt=""
                width={image.normal.width}
                height={image.normal.height}
                className="object-cover w-full aspect-[3/4]"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/40 px-2 py-1 rounded-full flex items-center gap-1">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={cn(
              "w-2 h-2 cursor-pointer rounded-full border border-white transition-all duration-200",
              selectedIndex === index ? "bg-white" : "bg-transparent"
            )}
          />
        ))}
      </div>
    </div>
  );
};
