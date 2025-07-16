
"use client";

import { useState } from "react";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Stethoscope } from "lucide-react"
import { useTestStore } from "@/hooks/use-test-store";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useTestStore();
  const [name, setName] = useState("Student Nurse");
  const [email, setEmail] = useState("student@nurseup.com");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(name, email);
    router.push("/dashboard");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
             <Stethoscope className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="font-headline text-3xl">NurseUp</CardTitle>
          <CardDescription>Your partner in nursing exam success.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="student@nurseup.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" placeholder="********" type="password" defaultValue="password" />
              </div>
            </div>
             <Button type="submit" className="w-full mt-4" style={{backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))'}}>
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <p className="text-xs text-muted-foreground">Using dummy login. Click to proceed.</p>
        </CardFooter>
      </Card>
    </main>
  )
}
