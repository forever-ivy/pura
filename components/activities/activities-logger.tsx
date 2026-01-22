"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const activityTypes = [
  { id: "meditation", name: "冥想" },
  { id: "exercise", name: "运动" },
  { id: "walking", name: "散步" },
  { id: "reading", name: "阅读" },
  { id: "journaling", name: "写日记" },
  { id: "therapy", name: "咨询" },
];

interface ActivityLoggerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ActivityLogger({ open, onOpenChange }: ActivityLoggerProps) {
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    setTimeout(() => {
      console.log({
        type,
        name,
        duration,
        description,
      });

      //Rest fields
      setType("");
      setName("");
      setDuration("");
      setDescription("");
      setIsLoading(false);

      alert("活动已记录（模拟）！");
      onOpenChange(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>记录活动</DialogTitle>
          <DialogDescription>记录你的身心健康活动</DialogDescription>
        </DialogHeader>
        <form action="" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label>活动类型</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="选择活动类型" />
              </SelectTrigger>
              <SelectContent>
                {activityTypes.map((activity) => (
                  <SelectItem key={activity.id} value={activity.id}>
                    {activity.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </form>

        <div className="space-y-2">
          <Label>名称</Label>
          <Input
            value={name}
            onValueChange={(e) => setName(e.target.value)}
            placeholder="例如：早晨冥想、晚间散步…"
          />
        </div>

        <div className="space-y-2">
          <Label>描述（选填）</Label>
          <Input
            value={description}
            onValueChange={(e) => setDescription(e.target.value)}
            placeholder="感觉如何？"
          />
        </div>

        <div className="flex justify-end gap-2 ">
          <Button type="button" variant="ghost">
            取消
          </Button>
          <Button type="submit" disabled>
            保存活动
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
