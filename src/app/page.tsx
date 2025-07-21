
"use client";

import { useState } from "react";
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
import { Stethoscope, KeyRound, Loader2 } from "lucide-react"
import { useTestStore } from "@/hooks/use-test-store";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useTestStore();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Hardcoded credentials check
    if (email === "deepika@gmail.com" && password === "Deepika@05") {
      setUser("Deepika", email);
      toast({
          title: "Login Successful",
          description: `Welcome back, Deepika!`,
      });
      router.push("/dashboard");
    } else {
      toast({
          variant: "destructive",
          title: "Invalid Credentials",
          description: "Please check your email and password.",
      });
      setIsLoading(false);
    }
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
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" placeholder="Enter your email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" placeholder="Enter your password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </div>
              </div>
              <Button type="submit" className="w-full mt-4" style={{backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))'}} disabled={isLoading}>
                  {isLoading ? <Loader2 className="animate-spin" /> : <><KeyRound className="mr-2"/> Login</>}
              </Button>
          </form>
        </CardContent>
         <CardFooter className="flex flex-col gap-4">
          <p className="text-xs text-muted-foreground text-center">
            Welcome, Deepika! Please enter your credentials to access your dashboard.
          </p>
        </CardFooter>
      </Card>
    </main>
  )
}
