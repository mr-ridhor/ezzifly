"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useModalStore } from "@/store/modalStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react"; // Import eye icons

// Validation schemas for each step
const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const verificationSchema = z.object({
  code: z.string().min(1, "Verification code is required"),
});

const newPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type EmailFormData = z.infer<typeof emailSchema>;
type VerificationFormData = z.infer<typeof verificationSchema>;
type NewPasswordFormData = z.infer<typeof newPasswordSchema>;

type ForgotPasswordStep = 'email' | 'verification' | 'newPassword';

export function ForgotPasswordDialog() {
  const { forgotOpen, closeForgot, switchToLogin } = useModalStore();
  const [currentStep, setCurrentStep] = useState<ForgotPasswordStep>('email');
  const [userEmail, setUserEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Email form
  const emailForm = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  // Verification code form
  const verificationForm = useForm<VerificationFormData>({
    resolver: zodResolver(verificationSchema),
  });

  // New password form
  const newPasswordForm = useForm<NewPasswordFormData>({
    resolver: zodResolver(newPasswordSchema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleEmailSubmit = async (data: EmailFormData) => {
    try {
      console.log("Sending verification code to:", data.email);
      setUserEmail(data.email);
      
      // TODO: Add actual API call to send verification code
      // await sendVerificationCode(data.email);
      
      // Show success toast
      toast.success("Verification code sent!", {
        description: "Please check your email for the verification code.",
        duration: 5000,
      });
      
      // Move to verification step
      setCurrentStep('verification');
    } catch (error) {
      console.error("Failed to send verification code:", error);
      toast.error("Failed to send code", {
        description: "Please check your email and try again.",
        duration: 5000,
      });
    }
  };

  const handleVerificationSubmit = async (data: VerificationFormData) => {
    try {
      console.log("Verifying code:", data.code);
      
      // TODO: Add actual verification code validation
      // await verifyCode(userEmail, data.code);
      
      // Show success toast
      toast.success("Code verified!", {
        description: "Please set your new password.",
        duration: 3000,
      });
      
      // Move to new password step
      setCurrentStep('newPassword');
    } catch (error) {
      console.error("Failed to verify code:", error);
      toast.error("Invalid code", {
        description: "The verification code is invalid. Please try again.",
        duration: 5000,
      });
    }
  };

  const handleNewPasswordSubmit = async (data: NewPasswordFormData) => {
    try {
      console.log("Setting new password for:", userEmail);
      
      // TODO: Add actual password reset API call
      // await resetPassword(userEmail, data.code, data.password);
      
      // Show success toast
      toast.success("Password reset successfully!", {
        description: "You can now login with your new password.",
        duration: 5000,
      });
      
      handleClose();
      switchToLogin();
    } catch (error) {
      console.error("Failed to reset password:", error);
      toast.error("Password reset failed", {
        description: "Please try again later.",
        duration: 5000,
      });
    }
  };

  const handleRequestNewCode = () => {
    if (!userEmail) {
      toast.error("Email required", {
        description: "Please enter your email first.",
        duration: 3000,
      });
      return;
    }

    try {
      // TODO: Implement resend verification code
      console.log("Requesting new code for:", userEmail);
      
      toast.success("New code sent!", {
        description: "A new verification code has been sent to your email.",
        duration: 5000,
      });
    } catch (error) {
      console.error("Failed to resend code:", error);
      toast.error("Failed to send code", {
        description: "Please try again later.",
        duration: 5000,
      });
    }
  };

  const handleClose = () => {
    setCurrentStep('email');
    setUserEmail("");
    setShowPassword(false);
    setShowConfirmPassword(false);
    emailForm.reset();
    verificationForm.reset();
    newPasswordForm.reset();
    closeForgot();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleClose();
    }
  };

  // Render email step
  const renderEmailStep = () => (
    <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)}>
      <DialogHeader>
        <DialogTitle className="text-xl font-bold">Enter Email</DialogTitle>
        <DialogDescription className="text-sm text-gray-600">
          Please enter your email address you used to register. We will send a verification code to this email address.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4 mt-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...emailForm.register("email")}
            className="border-2 border-gray-300 focus:border-blue-500 rounded-lg"
            disabled={emailForm.formState.isSubmitting}
          />
          {emailForm.formState.errors.email && (
            <p className="text-sm text-red-600">{emailForm.formState.errors.email.message}</p>
          )}
        </div>

        <Button 
          type="submit"
          className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg"
          disabled={emailForm.formState.isSubmitting}
        >
          {emailForm.formState.isSubmitting ? "Sending..." : "Send"}
        </Button>
      </div>
    </form>
  );

  // Render verification step
  const renderVerificationStep = () => (
    <form onSubmit={verificationForm.handleSubmit(handleVerificationSubmit)}>
      <DialogHeader>
        <DialogTitle className="text-xl font-bold">Enter Verification Code</DialogTitle>
        <DialogDescription className="text-sm text-gray-600">
          We have sent a verification code to {userEmail || "your email"}.
          Please check your inbox and enter the code below.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4 mt-4">
        <div className="space-y-2">
          <Label htmlFor="code">Code</Label>
          <Input
            id="code"
            type="text"
            placeholder="Enter Code"
            {...verificationForm.register("code")}
            className="border-2 border-gray-300 focus:border-blue-500 rounded-lg"
            disabled={verificationForm.formState.isSubmitting}
          />
          {verificationForm.formState.errors.code && (
            <p className="text-sm text-red-600">{verificationForm.formState.errors.code.message}</p>
          )}
        </div>

        <div className="flex justify-between items-center">
          <Button
            type="button"
            variant="link"
            className="p-0 text-primary hover:text-primary/60"
            onClick={handleRequestNewCode}
            disabled={verificationForm.formState.isSubmitting}
          >
            Request New Code
          </Button>
        </div>

        <Button 
          type="submit"
          className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg"
          disabled={verificationForm.formState.isSubmitting}
        >
          {verificationForm.formState.isSubmitting ? "Verifying..." : "Continue"}
        </Button>
      </div>
    </form>
  );

  // Render new password step
  const renderNewPasswordStep = () => (
    <form onSubmit={newPasswordForm.handleSubmit(handleNewPasswordSubmit)}>
      <DialogHeader>
        <DialogTitle className="text-xl font-bold">Enter New Password</DialogTitle>
        <DialogDescription className="text-sm text-gray-600">
          Enter a new password of your choice
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4 mt-4">
        <div className="space-y-2">
          <Label htmlFor="password">New Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              {...newPasswordForm.register("password")}
              className="border-2 border-gray-300 focus:border-blue-500 rounded-lg pr-10"
              disabled={newPasswordForm.formState.isSubmitting}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              onClick={togglePasswordVisibility}
              disabled={newPasswordForm.formState.isSubmitting}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {newPasswordForm.formState.errors.password && (
            <p className="text-sm text-red-600">{newPasswordForm.formState.errors.password.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Enter Password"
              {...newPasswordForm.register("confirmPassword")}
              className="border-2 border-gray-300 focus:border-blue-500 rounded-lg pr-10"
              disabled={newPasswordForm.formState.isSubmitting}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              onClick={toggleConfirmPasswordVisibility}
              disabled={newPasswordForm.formState.isSubmitting}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {newPasswordForm.formState.errors.confirmPassword && (
            <p className="text-sm text-red-600">{newPasswordForm.formState.errors.confirmPassword.message}</p>
          )}
        </div>

        <Button 
          type="submit"
          className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg"
          disabled={newPasswordForm.formState.isSubmitting}
        >
          {newPasswordForm.formState.isSubmitting ? "Changing..." : "Change"}
        </Button>
      </div>
    </form>
  );

  return (
    <Dialog open={forgotOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="w-md mx-auto p-6">
        {currentStep === 'email' && renderEmailStep()}
        {currentStep === 'verification' && renderVerificationStep()}
        {currentStep === 'newPassword' && renderNewPasswordStep()}
        
        <DialogFooter>
          <p className="text-xs text-gray-600 text-center">
            By signing in or registering, I confirm that I have read and agreed
            to the{" "}
            <span className="text-blue-400 cursor-pointer underline">Terms and Conditions</span>{" "}
            and <span className="text-blue-400 cursor-pointer underline">Privacy Policy</span>
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}