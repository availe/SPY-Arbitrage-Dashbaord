import { useRef, useState, useEffect } from "react";

export function useFullscreen() {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      elementRef.current?.requestFullscreen();
    }
    setIsFullscreen(!document.fullscreenElement);
  };

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return { elementRef, isFullscreen, toggleFullscreen };
}
