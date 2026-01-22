"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email({ message: "请输入有效邮箱。" }),
  password: z.string().min(6, { message: "密码至少 6 位。" }),
});

export default function LoginPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br  from-primary/10 via-background to-secondary/30">
      <Container className="flex flex-col items-center justify-center w-full">
        <Card className="w-full md:w-5/12 max-w-2xl p-8 md:p-10 rounded-3xl shadow-2xl border border-primary/10 bg-card/90 backdrop-blur-lg mt-12">
          {/* text */}
          <div className="mb-6 text-center space-y-3">
            <h1 className="text-3xl md:text-4xl font-sans bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-1 tracking-tight">
              登录
            </h1>
            <p className="text-base text-muted-foreground font-sans">
              欢迎回来! 请登录继续你的旅程
            </p>
          </div>

          {/* form */}
          <div className="space-y-6">
            <div className="space-y-3">
              <Form {...form}>
                <form
                  className="space-y-5"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>邮箱</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              type="email"
                              autoComplete="email"
                              placeholder="you@example.com"
                              className="pl-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>密码</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              type="password"
                              autoComplete="current-password"
                              placeholder="••••••••"
                              className="pl-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full rounded-xl"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? "登录中..." : "登录"}
                  </Button>
                </form>
              </Form>
            </div>

            <div className="font-sans text-center text-sm text-muted-foreground">
              还没有账号？{" "}
              <Link
                href="/signup"
                className="text-primary hover:underline underline-offset-4"
              >
                去注册
              </Link>
              <span className="text-muted-foreground"> · </span>
              <Link
                href="/forgot-password"
                className="text-primary underline hover:text-primary/80 transition-colors"
              >
                忘记密码?
              </Link>
            </div>
          </div>
        </Card>
      </Container>
    </div>
  );
}
