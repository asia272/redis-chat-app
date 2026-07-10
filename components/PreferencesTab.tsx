"use client";

import { usePreferencesStore } from "@/store/usePreferences";
import { Button } from "./ui/button";
import {
    MoonIcon,
    SunIcon,
    Volume2Icon,
    VolumeXIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import useSound from "use-sound";

const PreferencesTab = () => {
    const { setTheme } = useTheme();
    const { soundEnabled, setSoundEnabled } = usePreferencesStore();

    const [playClick] = useSound("/sounds/mouse-click.mp3");
    const [soundOff] = useSound("/sounds/sound-off.mp3");
    const [soundOn] = useSound("/sounds/sound-on.mp3");

    return (
        <div className="flex flex-wrap gap-2 px-1 md:px-2">
            {/* Light Theme */}
            <Button
                variant="outline"
                size="icon"
                onClick={() => {
                    setTheme("light");
                    soundEnabled && playClick();
                }}
            >
                <SunIcon className="size-5 text-muted-foreground" />
            </Button>

            {/* Dark Theme */}
            <Button
                variant="outline"
                size="icon"
                onClick={() => {
                    setTheme("dark");
                    soundEnabled && playClick();
                }}
            >
                <MoonIcon className="size-5 text-muted-foreground" />
            </Button>

            {/* Sound Toggle */}
            <Button
                variant="outline"
                size="icon"
                onClick={() => {
                    setSoundEnabled(!soundEnabled);
                    soundEnabled ? soundOff() : soundOn();
                }}
            >
                {soundEnabled ? (
                    <Volume2Icon className="size-5 text-muted-foreground" />
                ) : (
                    <VolumeXIcon className="size-5 text-muted-foreground" />
                )}
            </Button>
        </div>
    );
};

export default PreferencesTab;