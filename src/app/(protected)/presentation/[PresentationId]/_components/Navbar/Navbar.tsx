"use client";
import { useSlideStore } from "@/store/useSlideStore";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Share, Play } from "lucide-react";
import { toast } from "sonner";
import PresentationMode from "./PresentationMode";

type Props = { presentationId: string };

const Navbar = ({ presentationId }: Props) => {
  const { currentTheme } = useSlideStore();
  const [isPresentationMode, setIsPresentationMode] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/share/${presentationId}`
    );
    toast.success("Link Copied", {
      description: "The link has been copied to your clipboard",
    });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 w-full h-20 flex justify-between items-center py-4 px-7 border-b"
      style={{
        backgroundColor:
          currentTheme.navbarColor || currentTheme.backgroundColor,
        color: currentTheme.accentColor,
      }}
    >
      <Link href="/dashboard" passHref>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          style={{
            backgroundColor: currentTheme.backgroundColor,
          }}
        >
          <Home className="w-4 h-4" />
          <span className="hidden sm:inline">Return Home</span>
        </Button>
      </Link>
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={handleCopy}>
          <Share className="w-4 h-4" />
        </Button>
        <Button>Presentation Editor</Button>
        <Button
          variant="default"
          className="flex items-center gap-2"
          onClick={() => setIsPresentationMode(true)}
        >
          <Play className="w-4 h-4" />
          <span className="hidden sm:inline">Present</span>
        </Button>
      </div>
      {isPresentationMode && (
        <PresentationMode onClose={() => setIsPresentationMode(false)} />
      )}
    </nav>
  );
};

export default Navbar;
