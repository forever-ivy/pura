"use client";

import { Container } from "@/components/ui/container";
import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  MessageSquare,
  Heart,
  BrainCircuit,
  ArrowRight,
  Loader2,
  Trophy,
  Brain,
  Activity,
} from "lucide-react";
import SparklesIcon from "@/components/ui/sparkles-icon";
import type { AnimatedIconHandle } from "@/components/ui/types";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { AnxietyGames } from "@/components/games/anxiety-games";
import { MoodForm } from "@/components/mood/mood-form";
import { ActivityLogger } from "@/components/activities/activities-logger";

export default function Dashboard() {
  const [currentime, setCurrentime] = useState(new Date());
  const [showMoodModal, setShowMoodModal] = useState(false);
  const [isSavingMood, setIsSavingMood] = useState(false);
  const [showActivitiesLogger, setShowActivitesLogger] = useState(false);
  const sparklesRef = useRef<AnimatedIconHandle>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Update wellness stats to reflect the changes
  const wellnessStats = [
    {
      title: "心情评分",
      value: "暂无数据",
      icon: Brain,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      description: "今日平均心情",
    },
    {
      title: "完成率",
      value: "100%",
      icon: Trophy,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      description: "完美完成率",
    },
    {
      title: "治疗会话",
      value: "0 次",
      icon: Heart,
      color: "text-rose-500",
      bgColor: "bg-rose-500/10",
      description: "累计完成会话",
    },
    {
      title: "今日活动",
      value: 0,
      icon: Activity,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      description: "今天计划的活动数",
    },
  ];

  const handleMoodsubmit = async (data: { moodScore: number }) => {
    setIsSavingMood(true);
    try {
      setShowMoodModal(false);
    } catch (error) {
      console.error("error saving mood:", error);
    } finally {
      setIsSavingMood(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <Container className="pt-20 pb-8 space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-2"
        >
          <h1 className="text-3xl font-bold">欢迎回来 🤗</h1>
          <p className="text-muted-foreground text-sm font-sans">
            {currentime.toLocaleDateString("zh-CN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </motion.div>

        {/* main grid */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card
              className="border-primary/10 relative overflow-hidden group"
              onMouseEnter={() => sparklesRef.current?.startAnimation()}
              onMouseLeave={() => sparklesRef.current?.stopAnimation()}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent" />
              <CardContent className="p-6 relative">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <SparklesIcon
                        ref={sparklesRef}
                        className="w-5 h-5 text-primary cursor-default"
                      />
                    </div>
                    <div>
                      <h3 className="font-sans tetx-lg">快速开始</h3>
                      <p className="text-sm text-muted-foreground">
                        开始你的治愈之旅 ❤️‍🩹
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <Button
                      variant="default"
                      className={cn(
                        "w-full justify-between items-center p-6 h-auto group/button",
                        "bg-gradient-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/90",
                        "transition-all duration-200 group-hover:translate-y-[-2px]",
                      )}
                      //   onClick={handleStartTherapy}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                          <MessageSquare className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-white">开启</div>
                          <div className="text-xs text-white/80">新的对话</div>
                        </div>
                      </div>
                      <div className="opacity-0 group-hover/button:opacity-100 transition-opacity">
                        <ArrowRight className="w-5 h-5 text-white" />
                      </div>
                    </Button>

                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        className={cn(
                          "flex flex-col h-[120px] px-4 py-3 group/mood hover:border-primary/50",
                          "justify-center items-center text-center",
                          "transition-all duration-200 group-hover:translate-y-[-2px]",
                        )}
                        onClick={() => setShowMoodModal(true)}
                      >
                        <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center mb-2">
                          <Heart className="w-5 h-5 text-rose-500" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">记录心情</div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            现在感觉怎样 ？
                          </div>
                          {/* mood form */}
                        </div>
                      </Button>

                      <Button
                        variant="outline"
                        className={cn(
                          "flex flex-col h-[120px] px-4 py-3 group/ai hover:border-primary/50",
                          "justify-center items-center text-center",
                          "transition-all duration-200 group-hover:translate-y-[-2px]",
                        )}
                        onClick={() => setShowActivitesLogger(true)}
                      >
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mb-2">
                          <BrainCircuit className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">自查</div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            快速健康检查
                          </div>
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* today's review */}
            <Card className="border-primary/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle> 今日复盘</CardTitle>
                    <CardDescription>
                      您{format(new Date(), "M月d日", { locale: zhCN })}
                      的健康指标
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    // onClick={fetchDailyStats}
                    className="h-8 w-8"
                  >
                    <Loader2 className={cn("h-4 w-4", "animate-spin")} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {wellnessStats.map((stat) => (
                    <div
                      key={stat.title}
                      className={cn(
                        "p-4 rounded-lg transition-all duration-200 hover:scale-[1.02]",
                        stat.bgColor,
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <stat.icon className={cn("w-5 h-5", stat.color)} />
                        <p className="text-sm font-medium">{stat.title}</p>
                      </div>
                      <p className="text-2xl font-bold mt-2">{stat.value}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {stat.description}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-xs text-muted-foreground text-right">
                  {/* Last updated: {format(dailyStats.lastUpdated, "h:mm a")} */}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* content grid for game */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="lg:col-span-3 space-y-6">
              {/* anxiety game */}
              <AnxietyGames />
            </div>
          </div>

          {/* mood tracking */}
          <Dialog open={showMoodModal} onOpenChange={setShowMoodModal}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>今天心情怎么样？</DialogTitle>
                <DialogDescription>滑动去记录今日心情</DialogDescription>
              </DialogHeader>
              {/* mood-form */}
              <MoodForm onSuccess={() => setShowMoodModal(false)} />
            </DialogContent>
          </Dialog>

          {/* activity logger */}
          <ActivityLogger
            open={showActivitiesLogger}
            onOpenChange={setShowActivitesLogger}
          />
        </div>
      </Container>
    </div>
  );
}
