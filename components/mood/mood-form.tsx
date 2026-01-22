"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface MoodFormProps {
  onSuccess?: () => void;
}

export function MoodForm({ onSuccess }: MoodFormProps) {
  const [moodScore, setMoodScore] = useState(50);
  const [isLoading, stIsLoading] = useState(false);
  const router = useRouter();

  const emotions = [
    { value: 0, label: "😔", description: "低落" },
    { value: 25, label: "😕", description: "还好" },
    { value: 50, label: "😊", description: "平静" },
    { value: 75, label: "😃", description: "开心" },
    { value: 100, label: "🤗", description: "兴奋" },
  ];

  const currentEmotion =
    emotions.find((e) => Math.abs(moodScore - e.value) < 15) || emotions[2];
  return (
    <div className="space-y-6 py-4">
      <div className="text-center space-y-2">
        <div className="text-4xl">{currentEmotion?.label}</div>
        <div className="text-sm text-muted-foreground">
          {currentEmotion?.description}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between px-2">
          {emotions.map((em) => (
            <div
              key={em.value}
              className={`cursor-pointer trasnition-opacity ${Math.abs(moodScore - em.value) < 15 ? "opacity-100" : "opacity-50"}`}
              onClick={() => setMoodScore(em.value)}
            >
              <div className="text-2xl ">{em.label}</div>
            </div>
          ))}
        </div>

        <Slider
          className="py-4"
          value={[moodScore]}
          onValueChange={(value) => setMoodScore(value[0])}
          min={0}
          max={100}
          step={1}
        />
      </div>

      <Button className="w-full">保存</Button>
    </div>
  );
}
