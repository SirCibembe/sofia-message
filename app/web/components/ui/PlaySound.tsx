// components/PlaySound.js
import { useEffect } from "react";

export default function PlaySound({ soundFile, play, onPlayEnd }: {
   soundFile: any;
   play: boolean;
   onPlayEnd?: () => void; // Callback function to reset play state after sound ends (optional)
}) {
  useEffect(() => {
    if (play) {
      const sound = new Audio(soundFile);
      sound.play().then(() => {
        if (onPlayEnd) {
          onPlayEnd(); // Reset the play state after sound ends
        }
      });
    }
  }, [play, soundFile, onPlayEnd]);

  return null; // This component doesn't render anything visible
}
