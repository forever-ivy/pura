/* eslint-disable react-hooks/immutability */
"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Waves, Volume2, VolumeX, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";

const BREATH_DURATION = 8; // seconds for one breath cycle
const SESSION_DURATION = 5 * 60; // 5 minutes in seconds

export function OceanWaves() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(SESSION_DURATION);
  const waveControls = useAnimation();
  const [audio] = useState(new Audio("/sounds/waves.mp3"));

  useEffect(() => {
    audio.loop = true;
    audio.volume = volume / 100;

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    audio.volume = volume / 100;
  }, [volume]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          setProgress(((SESSION_DURATION - newTime) / SESSION_DURATION) * 100);
          return newTime;
        });
      }, 1000);

      // Animate waves
      waveControls.start({
        y: [0, -20, 0],
        transition: {
          duration: BREATH_DURATION,
          repeat: Infinity,
          ease: "easeInOut",
        },
      });
    } else {
      waveControls.stop();
    }

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-[400px] space-y-8">
      <div className="relative w-48 h-48">
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-b from-sky-400/25 via-blue-500/10 to-transparent blur-2xl"
          animate={{ scale: [0.9, 1.06, 0.95], opacity: [0.5, 0.9, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-3 rounded-full border border-sky-400/25"
          animate={{ rotate: 360, opacity: [0.15, 0.45, 0.15] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-7 rounded-full border border-blue-400/15"
          animate={{ rotate: -360, opacity: [0.1, 0.35, 0.1] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          animate={waveControls}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative">
            <motion.div
              animate={{
                rotate: [0, 1, -1, 0],
                scale: [1, 1.04, 1],
              }}
              transition={{
                duration: BREATH_DURATION,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Waves className="w-24 h-24 text-blue-600 drop-shadow-[0_12px_24px_rgba(37,99,235,0.25)]" />
            </motion.div>
            <motion.div
              animate={{
                opacity: [0.4, 0.85, 0.4],
                scale: [0.9, 1.05, 0.95],
              }}
              transition={{
                duration: BREATH_DURATION,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-blue-400/10 blur-xl rounded-full"
            />
            <motion.div
              className="absolute left-1/2 top-14 h-6 w-24 -translate-x-1/2 rounded-full bg-sky-300/10 blur-xl"
              animate={{ scaleX: [0.7, 1.15, 0.75], opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span
              className="absolute left-2 top-6 h-1.5 w-1.5 rounded-full bg-sky-200/70 blur-[1px]"
              animate={{ x: [0, 16, 0], opacity: [0.2, 0.7, 0.2] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span
              className="absolute right-4 top-10 h-1 w-1 rounded-full bg-blue-200/70 blur-[1px]"
              animate={{ x: [0, -14, 0], opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span
              className="absolute left-10 bottom-10 h-1.5 w-1.5 rounded-full bg-sky-100/60 blur-[1px]"
              animate={{ x: [0, 12, 0], opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>

      <div className="w-64 space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Volume</span>
            <span>{volume}%</span>
          </div>
          <div className="flex items-center gap-2">
            {volume === 0 ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
            <Slider
              value={[volume]}
              onValueChange={(value) => setVolume(value[0])}
              max={100}
              step={1}
            />
          </div>
        </div>

        <Progress value={progress} className="h-2" />

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {formatTime(timeLeft)}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={togglePlay}
            className="rounded-full"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
          <span className="text-sm text-muted-foreground">
            {formatTime(SESSION_DURATION)}
          </span>
        </div>
      </div>
    </div>
  );
}
