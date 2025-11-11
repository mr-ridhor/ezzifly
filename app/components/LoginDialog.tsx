"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { useModalStore } from "@/store/modalStore";
import Image from "next/image";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";
import { z } from "zod";
import { toast } from "sonner";
import { authService, authStorage } from "@/services";
import { useRouter } from "next/navigation";

export function LoginDialog() {
  const { loginOpen, closeLogin, switchToRegister, switchToForgot } =
    useModalStore();
    const navigate=useRouter()

  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<"email" | "password">("email");

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });

  const { watch, formState, trigger, getValues, setError } = form;
  const emailValue = watch("email");
  const passwordValue = watch("password");

  // Calculate canContinue directly without useEffect
  const canContinue = step === "email" 
    ? !formState.errors.email && (emailValue?.length ?? 0) > 0
    : !formState.errors.password && (passwordValue?.length ?? 0) > 0;

  const handleContinue = async () => {
    const isValid = await trigger("email");
    if (isValid) {
      setStep("password");
    }
  };
  const onSubmit = async (data: LoginFormData) => {
    try {
      // Show loading state
      toast.loading("Signing in...");

      // Call login API
      const result = await authService.login({
        email: data.email,
        password: data.password,
      });

      // Dismiss loading toast
      toast.dismiss();

      // Store authentication data
      authStorage.setToken(result.token);
      authStorage.setUser(result.user);

      // Show success message
      toast.success("Login successful!");
navigate.push("/dashboard")

      // Close dialog and reset form
      closeLogin();
      form.reset();
      setStep("email");

      // Optional: Redirect or refresh user state
      console.log("User logged in:", result.user);

    } catch (error) {
      // Dismiss loading toast
      toast.dismiss();

      console.error("Login failed:", error);

      // Handle specific error cases
      if (error instanceof Error) {
        const errorMessage = error.message.toLowerCase();

        if (errorMessage.includes('invalid credentials') || 
            errorMessage.includes('email') || 
            errorMessage.includes('password')) {
          toast.error("Invalid email or password. Please try again.");
          setError('email', { type: 'manual', message: ' ' });
          setError('password', { type: 'manual', message: 'Invalid email or password' });
        } else if (errorMessage.includes('network') || 
                   errorMessage.includes('failed to fetch')) {
          toast.error("Network error. Please check your connection and try again.");
        } else if (errorMessage.includes('user not found')) {
          toast.error("No account found with this email. Please sign up.");
          setStep("email");
          setError('email', { type: 'manual', message: 'No account found with this email' });
        } else if (errorMessage.includes('email not verified')) {
          toast.error("Please verify your email before logging in.");
          setStep("email");
        } else {
          toast.error("Login failed. Please try again.");
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      console.log("Google login");
      // TODO: Add Google OAuth logic here
      // For now, show a message
      toast.info("Google login coming soon!");
    } catch (error) {
      console.error("Google login failed:", error);
      toast.error("Google login failed. Please try again.");
    }
  };

  const handleForgotPassword = () => {
    // Get the current email value to pre-fill the forgot password form
    const currentEmail = getValues("email");
    
    // You can pass this email to the forgot password modal if needed
    // For example, you might want to store it in your modal store
    console.log("Current email for password reset:", currentEmail);
    
    switchToForgot();
  };

  const handleBackToEmail = () => {
    setStep("email");
    // Clear password field when going back
    form.setValue("password", "");
  };

  // Reset form when dialog closes
  useEffect(() => {
    if (!loginOpen) {
      form.reset();
      setStep("email");
      setShowPassword(false);
    }
  }, [loginOpen, form]);

  return (
    <Dialog open={loginOpen} onOpenChange={closeLogin}>
      <DialogContent className="w-md mx-auto p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                {step === "email"
                  ? "Sign In or Register"
                  : "Enter your Password"}
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-600">
                {step === "email"
                  ? "Manage your bookings easily and start your travels"
                  : `Welcome back! Please enter your password to continue.`}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              {step === "email" ? (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your email"
                            {...field}
                            className="border-2 border-gray-300 focus:border-blue-500 rounded-lg"
                            type="email"
                            autoComplete="email"
                            disabled={formState.isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="button"
                    onClick={handleContinue}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg"
                    disabled={!canContinue || formState.isSubmitting}
                  >
                    {formState.isSubmitting ? "Checking..." : "Continue"}
                  </Button>

                  <div className="relative flex items-center my-4">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="px-3 text-sm text-gray-500">OR</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGoogleLogin}
                    className="w-full border-2 border-gray-300 text-gray-700 font-semibold py-2 rounded-lg flex items-center justify-center gap-2 bg-transparent"
                    disabled={formState.isSubmitting}
                  >
                    <Image
                      src="/google.svg"
                      height={20}
                      width={20}
                      alt="google"
                    />
                    Continue with Google
                  </Button>

                  <div className="text-center space-y-2">
                    <button
                      type="button"
                      onClick={switchToRegister}
                      className="text-[#295B86] font-medium text-sm block w-full hover:underline"
                      disabled={formState.isSubmitting}
                    >
                      Don&apos;t have an account? Sign up
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Email display */}
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <p className="text-sm text-gray-600">Signed in as</p>
                    <p className="font-medium text-gray-900">{emailValue}</p>
                    <button
                      type="button"
                      onClick={handleBackToEmail}
                      className="text-sm text-red-500 hover:text-red-600 mt-1"
                    >
                      Not you?
                    </button>
                  </div>

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              {...field}
                              className="border-2 border-gray-300 focus:border-blue-500 rounded-lg pr-10"
                              autoComplete="current-password"
                              disabled={formState.isSubmitting}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
                              disabled={formState.isSubmitting}
                            >
                              {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-[#295B86] text-sm font-medium w-full text-left hover:underline"
                    disabled={formState.isSubmitting}
                  >
                    Forgot your password?
                  </button>

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBackToEmail}
                      className="flex-1 border-2 border-gray-300 text-gray-700 font-semibold py-2 rounded-lg"
                      disabled={formState.isSubmitting}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg"
                      disabled={!canContinue || formState.isSubmitting}
                    >
                      {formState.isSubmitting ? "Signing in..." : "Sign In"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </form>
        </Form>

        <DialogFooter>
          <p className="text-xs text-gray-600 text-center">
            By signing in or registering, I confirm that I have read and agreed
            to the{" "}
            <span className="text-blue-600 cursor-pointer underline">
              Terms and Conditions
            </span>{" "}
            and{" "}
            <span className="text-blue-600 cursor-pointer underline">
              Privacy Policy
            </span>
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}