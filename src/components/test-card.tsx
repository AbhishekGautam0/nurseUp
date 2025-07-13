import Link from "next/link";
import { type Test } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, FileText, ArrowRight } from "lucide-react";

interface TestCardProps {
  test: Test;
}

export function TestCard({ test }: TestCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-xl">{test.title}</CardTitle>
        <CardDescription>{test.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <FileText className="mr-1.5 h-4 w-4" />
            {test.questions.length} Questions
          </div>
          <div className="flex items-center">
            <Clock className="mr-1.5 h-4 w-4" />
            {test.duration} min
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" style={{backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))'}}>
          <Link href={`/test/${test.id}`}>
            Start Test <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
