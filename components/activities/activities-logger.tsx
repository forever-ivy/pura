"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";

const activityTypes = [
  { id: "meditation", name: "冥想" },
  { id: "exercise", name: "运动" },
  { id: "walking", name: "散步" },
  { id: "reading", name: "阅读" },
  { id: "journaling", name: "写日记" },
  { id: "therapy", name: "咨询" },
];

const activityTypeIds = activityTypes.map((a) => a.id) as [
  "meditation",
  "exercise",
  "walking",
  "reading",
  "journaling",
  "therapy",
];

interface ActivityLoggerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ActivityLogger({ open, onOpenChange }: ActivityLoggerProps) {
  const schema = z.object({
    type: z.enum(activityTypeIds),
    description: z.preprocess(
      (value) => (value === "" ? undefined : value),
      z.string().min(1).optional(),
    ),
    name: z.string().min(1),
  });

  type FormData = z.infer<typeof schema>;

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: activityTypeIds[0],
      description: "",
      name: "",
    },
  });

  const handleSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>记录活动</DialogTitle>
          <DialogDescription>记录你的身心健康活动</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-5"
          >
            {/* <div className="space-y-2">
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
            </div> */}

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>活动类型</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                          role="combobox"
                          variant="outline"
                        >
                          {field.value
                            ? activityTypes.find(
                                (activityType) =>
                                  activityType.id === field.value,
                              )?.name
                            : "选择活动类型"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0 ">
                      <Command>
                        <CommandInput
                          className="h-8 p-2"
                          placeholder="寻找活动..."
                        />
                        <CommandList>
                          <CommandEmpty>No language found.</CommandEmpty>
                          <CommandGroup>
                            {activityTypes.map((activityType) => (
                              <CommandItem
                                key={activityType.id}
                                onSelect={() => {
                                  form.setValue("type", activityType.id, {
                                    shouldDirty: true,
                                    shouldValidate: true,
                                  });
                                }}
                                value={activityType.name}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    activityType.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {activityType.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>名称</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="例如：早晨冥想、晚间散步…"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>描述（选填）</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="感觉如何？" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 ">
              <Button type="button" variant="ghost">
                取消
              </Button>
              <Button type="submit">保存活动</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
