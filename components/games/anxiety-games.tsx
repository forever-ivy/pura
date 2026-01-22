"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Gamepad2,
  CloudHail,
  Wind,
  TreePine,
  Waves,
  Music2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BreathingGame } from "@/components/games/breathing-game";
import { Forest } from "@/components/games/forest";
import { OceanWaves } from "@/components/games/waves";
import { Rain } from "@/components/games/rain";

const games = [
  {
    id: "breathing",
    title: "呼吸练习",
    description: "通过视觉引导进行平缓的呼吸训练",
    icon: Wind,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    duration: "5 分钟",
  },
  {
    id: "rain",
    title: "寂静小雨",
    description: "感受雨水流过脸颊的清凉和镇静",
    icon: CloudHail,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    duration: "10 分钟",
  },
  {
    id: "forest",
    title: "正念森林",
    description: "在虚拟森林中进行一次平静的正念漫步",
    icon: TreePine,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    duration: "15 分钟",
  },
  {
    id: "waves",
    title: "海浪呼吸",
    description: "将呼吸节奏与轻柔的海浪同步",
    icon: Waves,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    duration: "8 分钟",
  },
];

interface AnxietyGamesProps {
  onGamePlayed?: (gameName: string, description: string) => Promise<void>;
}

export const AnxietyGames = ({ onGamePlayed }: AnxietyGamesProps) => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [showGame, setShowGame] = useState(false);

  const handleGameStart = async (gameId: string) => {
    setSelectedGame(gameId);
    setShowGame(true);

    if (onGamePlayed) {
      try {
        await onGamePlayed(
          gameId,
          games.find((g) => g.id === gameId)?.description || "",
        );
      } catch (error) {
        console.error("Error logging game activity:", error);
      }
    }
  };

  const renderGame = () => {
    switch (selectedGame) {
      case "breathing":
        return <BreathingGame />;
      case "rain":
        return <Rain />;
      case "forest":
        return <Forest />;
      case "waves":
        return <OceanWaves />;
      default:
        return null;
    }
  };

  return (
    <>
      <Card className="border-primary/10">
        <CardHeader>
          <CardTitle className="text-xl font-sans flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-primary" />
            焦虑放松游戏
          </CardTitle>
          <CardDescription>互动练习，帮助减轻压力和焦虑</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {games.map((game) => (
              <motion.div
                key={game.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className={`border-primary/10 hover:bg-primary/5 transition-colors cursor-pointer ${
                    selectedGame === game.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => handleGameStart(game.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-3 rounded-xl ${game.bgColor} ${game.color}`}
                      >
                        <game.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{game.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {game.description}
                        </p>
                        <div className="flex items-center gap-2 mt-3">
                          <Music2 className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {game.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={showGame} onOpenChange={setShowGame}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {games.find((g) => g.id === selectedGame)?.title}
            </DialogTitle>
          </DialogHeader>
          {renderGame()}
        </DialogContent>
      </Dialog>
    </>
  );
};
