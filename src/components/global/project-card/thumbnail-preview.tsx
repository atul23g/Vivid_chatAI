import { MasterRecursiveComponent } from "@/app/(protected)/presentation/[PresentationId]/_components/editor/MasterRecursivecomponent";

import { Slide, Theme } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Image } from "lucide-react";
import React from "react";

type Props = {
  slide: Slide;
  theme: Theme;
};

function ThumbnailPreview({ slide, theme }: Props) {
  //add preview of Slides
  return (
    <div
      className={cn(
        "w-full relative aspect-[16/9] rounded-lg overflow-hidden transition-all duration-200"
      )}
      style={{
        fontFamily: theme.fontFamily,
        color: theme.accentColor,
        backgroundColor: theme.slideBackgroundColor,
        backgroundImage: theme.gradientBackground,
      }}
    >
      {slide ? (
        <div className="scale-[0.5] origin-top-left w-[200%] h-[200%] overflow-hidden">
          <MasterRecursiveComponent
            slideId={slide.id}
            content={slide.content}
            onContentChange={() => {}}
            isPreview={true}
          />
        </div>
      ) : (
        <div className="w-full h-full bg-gray-400 flex justify-center items-center">
          <Image className="w-6 h-6 text-gray-500"></Image>
        </div>
      )}
    </div>
  );
}

export default ThumbnailPreview;
