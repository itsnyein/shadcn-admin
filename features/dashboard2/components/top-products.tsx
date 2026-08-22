"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Eye, Star, TrendingUp } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Premium Dashboard",
    sales: 2847,
    revenue: "$142,350",
    growth: "+23%",
    rating: 4.8,
    stock: 145,
    category: "Software",
  },
  {
    id: 2,
    name: "Analytics Pro",
    sales: 1923,
    revenue: "$96,150",
    growth: "+18%",
    rating: 4.6,
    stock: 67,
    category: "Tools",
  },
  {
    id: 3,
    name: "Mobile App Suite",
    sales: 1456,
    revenue: "$72,800",
    growth: "+12%",
    rating: 4.9,
    stock: 234,
    category: "Mobile",
  },
  {
    id: 4,
    name: "Enterprise License",
    sales: 892,
    revenue: "$178,400",
    growth: "+8%",
    rating: 4.7,
    stock: 12,
    category: "Enterprise",
  },
  {
    id: 5,
    name: "Basic Subscription",
    sales: 3421,
    revenue: "$68,420",
    growth: "+31%",
    rating: 4.4,
    stock: 999,
    category: "Subscription",
  },
];

export function TopProducts() {
  return (
    <Card className="cursor-pointer bg-card border-border/50 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:space-y-0 pb-4">
        <div>
          <CardTitle>Top Products</CardTitle>
          <CardDescription>Best performing products this month</CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full sm:w-auto cursor-pointer"
        >
          <Eye className="size-4" />
          View All
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="flex flex-col sm:flex-row items-start sm:items-center p-3 rounded-lg border gap-3 sm:gap-2"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm shrink-0">
              #{index + 1}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 items-start sm:items-center justify-between flex-1 min-w-0 w-full">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-medium truncate">{product.name}</p>
                  <Badge variant="outline" className="text-xs shrink-0">
                    {product.category}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex items-center space-x-1">
                    <Star className="size-3 fill-yellow-400 text-yellow-400 shrink-0" />
                    <span className="text-xs text-muted-foreground">
                      {product.rating}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">
                    {product.sales} sales
                  </span>
                </div>
              </div>
              <div className="flex flex-col sm:items-end gap-2 sm:space-y-1 w-full sm:w-auto">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-medium">{product.revenue}</p>
                  <Badge
                    variant="outline"
                    className="text-green-600 border-green-200 cursor-pointer shrink-0"
                  >
                    <TrendingUp className="size-3 mr-1" />
                    {product.growth}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-xs text-muted-foreground shrink-0">
                    Stock: {product.stock}
                  </span>
                  <Progress
                    value={
                      product.stock > 100 ? 100 : (product.stock / 100) * 100
                    }
                    className="flex-1 sm:w-12 h-1"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
