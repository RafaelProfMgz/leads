// src/components/lead/LeadCardSkeleton.tsx
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; // Shadcn Skeleton

export default function LeadCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-3/5 rounded" /> {/* Skeleton for Title */}
        <Skeleton className="h-4 w-4/5 rounded" />{" "}
        {/* Skeleton for Description */}
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-4 w-1/2 rounded" /> {/* Skeleton for Phone */}
        <Skeleton className="h-4 w-full rounded" /> {/* Skeleton for Message */}
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Skeleton className="h-9 w-9 rounded" />{" "}
        {/* Skeleton for Edit Button */}
        <Skeleton className="h-9 w-9 rounded" />{" "}
        {/* Skeleton for Remove Button */}
      </CardFooter>
    </Card>
  );
}
