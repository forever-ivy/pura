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
import { Lock, Mail, UsersRound } from "lucide-react";
import Link from "next/link";

const formSchema = z
  .object({
    name: z.string().trim().min(1, "请输入姓名"),
    email: z.email("请输入有效邮箱"),
    password: z.string().min(6, "密码至少 6 位"),
    confirmPassword: z.string().min(6, "密码至少 6 位"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "两次密码不一致",
    path: ["confirmPassword"],
  });

export default function LoginPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
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
              注册
            </h1>
            <p className="text-base text-muted-foreground font-sans">
              欢迎! 请注册开启你的旅程
            </p>
          </div>

          {/* form */}
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex flex-col md:flex-row gap-4"></div>
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
                        <FormLabel>姓名</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <UsersRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              type="name"
                              autoComplete="name"
                              placeholder="xxx"
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

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>确认密码</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              type="confirmPassword"
                              autoComplete="confirmPassword"
                              placeholder=""
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
              已经有账号？{" "}
              <Link
                href="/login"
                className="text-primary hover:underline underline-offset-4"
              >
                去登录
              </Link>
            </div>
          </div>
        </Card>
      </Container>
    </div>
  );
}
