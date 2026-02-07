import Link from "next/link";

import { ArrowLeft, Car, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const upcomingFeatures = [
  "Phát hiện ô tô, xe máy, xe tải, xe buýt",
  "Tính toán mật độ giao thông realtime",
  "Dashboard thống kê lưu lượng theo thời gian",
  "Lưu trữ dữ liệu lịch sử với PostgreSQL",
];

export default function TrafficDetectionPage() {
  return (
    <div className="flex items-center justify-center">
      <Card className="max-w-lg text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-2xl bg-chart-5">
            <Car className="size-10 text-white" />
          </div>
          <CardTitle className="text-3xl">Phát hiện giao thông</CardTitle>
          <div className="flex justify-center">
            <Badge variant="secondary" className="gap-2">
              <Clock className="size-3" />
              Đang trong quá trình phát triển
            </Badge>
          </div>
          <CardDescription className="text-base">
            Tính năng phát hiện giao thông đang được phát triển. Bạn sẽ có thể
            theo dõi mật độ và lưu lượng phương tiện theo thời gian thực.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-left">
            <h3 className="mb-3 font-medium">Tính năng sắp ra mắt:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {upcomingFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <Button variant="outline" asChild>
            <Link href="/human-detection">
              <ArrowLeft className="size-4" />
              Thử tính năng nhận diện người
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
