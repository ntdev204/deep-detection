import Link from "next/link";

import { User, Car } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    title: "Nhận diện người",
    description:
      "Phát hiện và đếm số người trong ảnh hoặc video realtime với độ chính xác cao.",
    href: "/human-detection",
    icon: User,
    available: true,
  },
  {
    title: "Phát hiện giao thông",
    description:
      "Phân tích mật độ và lưu lượng giao thông theo thời gian thực.",
    href: "/traffic-detection",
    icon: Car,
    available: false,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="flex flex-1 flex-col items-center justify-center py-6">
        <div className="text-center">
          <Badge variant="outline" className="mb-4 gap-2">
            <span className="size-2 animate-pulse rounded-full bg-primary" />
            AI-Powered Detection System
          </Badge>

          <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            <span className="bg-linear-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              Deep Detection
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
            Hệ thống nhận diện thông minh sử dụng trí tuệ nhân tạo và YOLOv8 để
            phát hiện người và phân tích giao thông trong thời gian thực.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-center text-2xl font-semibold">Tính năng</h2>

          <div className="grid gap-6 md:grid-cols-2">
            {features.map((feature) => (
              <Link
                key={feature.href}
                href={feature.href}
                className="group block"
              >
                <Card className="h-full cursor-pointer transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="rounded-xl bg-primary p-3 text-primary-foreground">
                        <feature.icon className="size-6" />
                      </div>
                      {!feature.available && (
                        <Badge variant="secondary">Đang phát triển</Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
