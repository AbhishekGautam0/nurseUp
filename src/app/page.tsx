
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
import { Stethoscope, Mail, KeyRound, Loader2 } from "lucide-react"
import { useTestStore } from "@/hooks/use-test-store";
import { useToast } from "@/hooks/use-toast";
import { sendOtp } from "@/ai/flows/send-otp-flow";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useTestStore();
  const { toast } = useToast();

  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [name, setName] = useState("Student Nurse");
  const [email, setEmail] = useState("student@nurseup.com");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({ variant: "destructive", title: "Email is required" });
      return;
    }
    setIsLoading(true);
    try {
      const response = await sendOtp({ email });
      toast({
        title: "OTP Sent",
        description: `An OTP has been sent to your console for ${email}. Please use it to log in.`,
      });
      setStep('otp');
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not send OTP. Please try again.",
      });
    }
    setIsLoading(false);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
     e.preventDefault();
     setIsLoading(true);
    // In a real app, you would verify the OTP against a backend service.
    // Here we are just logging in the user.
    // A simple check for demo purposes, actual OTP is in the console.
     if (otp) { 
        setUser(name, email);
        toast({
            title: "Login Successful",
            description: `Welcome back, ${name}!`,
        });
        router.push("/dashboard");
     } else {
        toast({
            variant: "destructive",
            title: "Invalid OTP",
            description: "Please check the OTP and try again.",
        });
     }
     setIsLoading(false);
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
          {step === 'email' && (
             <form onSubmit={handleSendOtp}>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" placeholder="Enter your email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                </div>
                <Button type="submit" className="w-full mt-4" style={{backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))'}} disabled={isLoading}>
                    {isLoading ? <Loader2 className="animate-spin" /> : <><Mail className="mr-2"/> Send OTP</>}
                </Button>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp}>
                <div className="grid w-full items-center gap-4">
                     <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="otp">Enter OTP</Label>
                        <Input id="otp" placeholder="Check console for OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                    </div>
                </div>
                <Button type="submit" className="w-full mt-4" style={{backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))'}} disabled={isLoading}>
                    {isLoading ? <Loader2 className="animate-spin" /> : <><KeyRound className="mr-2"/> Verify & Login</>}
                </Button>
                 <Button variant="link" onClick={() => setStep('email')} className="w-full mt-2">Back to email</Button>
            </form>
          )}
        </CardContent>
         <CardFooter className="flex flex-col gap-4">
          <p className="text-xs text-muted-foreground text-center">
            {step === 'email' ? 'Enter your details to receive a one-time password.' : 'Check the server console for your OTP.'}
          </p>
        </CardFooter>
      </Card>
    </main>
  )
}
