"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useModalStore } from "@/store/modalStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { authService } from "@/services";
import { storageService } from "@/services/storage";

// Validation schemas (keep the same as before)
const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const verificationSchema = z.object({
  code: z.string().min(6, "Verification code must be at least 6 characters"),
});

const personalInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type EmailFormData = z.infer<typeof emailSchema>;
type VerificationFormData = z.infer<typeof verificationSchema>;
type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

export function RegisterDialog() {
  const {
    registerOpen,
    closeRegister,
    openLogin,
  } = useModalStore();

  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  // Forms (keep the same as before)
  const emailForm = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" }
  });

  const verificationForm = useForm<VerificationFormData>({
    resolver: zodResolver(verificationSchema),
    defaultValues: { code: "" }
  });

  const personalInfoForm = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    }
  });

  // Handle email submission
  const handleEmailSubmit = async (data: EmailFormData) => {
    try {
      toast.loading("Sending verification code...");
      
      await authService.sendVerificationCode(data.email);
      
      setUserEmail(data.email);
      toast.dismiss();
      toast.success("Verification code sent to your email!");
      setStep(2);
    } catch (error) {
      toast.dismiss();
      console.error("Failed to send verification code:", error);
      toast.error(error instanceof Error ? error.message : "Failed to send verification code. Please try again.");
    }
  };

  // Handle verification submission
  const handleVerificationSubmit = async (data: VerificationFormData) => {
    try {
      toast.loading("Verifying code...");
      
      await authService.verifyCode(userEmail, data.code);
      
      toast.dismiss();
      toast.success("Email verified successfully!");
      setStep(3);
    } catch (error) {
      toast.dismiss();
      console.error("Failed to verify code:", error);
      toast.error(error instanceof Error ? error.message : "Invalid verification code. Please try again.");
    }
  };

  // Handle personal info submission
  const handlePersonalInfoSubmit = async (data: PersonalInfoFormData) => {
    try {
      toast.loading("Creating your account...");
      
      const result = await authService.registerUser({
        email: userEmail,
        first_name: data.firstName,
        last_name: data.lastName,
        password: data.password,
        password_confirmation: data.confirmPassword,
      });

      toast.dismiss();
      toast.success("Account created successfully!");
      
      // Store authentication data
      storageService.setItem("authToken", result.token);
      storageService.setItem("user", result.user);
      
      handleClose();
      openLogin();
    } catch (error) {
      toast.dismiss();
      console.error("Failed to register:", error);
      toast.error(error instanceof Error ? error.message : "Failed to create account. Please try again.");
    }
  };

  const handleRequestNewCode = async () => {
    try {
      toast.loading("Sending new code...");
      
      await authService.resendVerificationCode(userEmail);
      
      toast.dismiss();
      toast.success("New verification code sent!");
    } catch (error) {
      toast.dismiss();
      console.error("Failed to resend code:", error);
      toast.error(error instanceof Error ? error.message : "Failed to send new code. Please try again.");
    }
  };

  const handleClose = () => {
    setStep(1);
    setUserEmail("");
    setShowPassword(false);
    emailForm.reset();
    verificationForm.reset();
    personalInfoForm.reset();
    closeRegister();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleClose();
    }
  };

  // Render Step 1: Email Registration
  const renderEmailStep = () => (
    <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)}>
      <DialogHeader>
        <DialogTitle className="text-xl font-bold">
          Sign in or Register
        </DialogTitle>
        <DialogDescription className="text-sm text-gray-600">
          Manage Your Bookings Easily and Start Your Travels
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email Address
          </Label>
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
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg"
          disabled={emailForm.formState.isSubmitting}
        >
          {emailForm.formState.isSubmitting ? "Sending..." : "Continue"}
        </Button>

        <div className="relative flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-3 text-sm text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full border-2 border-gray-300 text-gray-700 font-semibold py-2 rounded-lg flex items-center justify-center gap-2 bg-transparent"
        >
          <Image src={"/google.svg"} height={20} width={20} alt="google" />
          Continue with Google
        </Button>
      </div>
    </form>
  );

  // Render Step 2: Verify Email
  const renderVerificationStep = () => (
    <form onSubmit={verificationForm.handleSubmit(handleVerificationSubmit)}>
      <DialogHeader>
        <DialogTitle className="text-xl font-bold">
          Verify Your Email
        </DialogTitle>
        <DialogDescription className="text-sm text-gray-600">
          We sent a verification code to{" "}
          <span className="font-semibold text-red-500">{userEmail}</span>. Please
          use the code to continue.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="code" className="text-sm font-medium">
            Code
          </Label>
          <Input
            id="code"
            placeholder="Enter verification code"
            {...verificationForm.register("code")}
            className="border-2 border-gray-300 focus:border-blue-500 rounded-lg"
            disabled={verificationForm.formState.isSubmitting}
          />
          {verificationForm.formState.errors.code && (
            <p className="text-sm text-red-600">{verificationForm.formState.errors.code.message}</p>
          )}
        </div>

        <Button
          type="button"
          variant="link"
          className="w-full flex justify-start text-left text-sm !text-primary p-0 h-auto hover:no-underline"
          onClick={handleRequestNewCode}
          disabled={verificationForm.formState.isSubmitting}
        >
          Request New Code
        </Button>

        <Button
          type="submit"
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg"
          disabled={verificationForm.formState.isSubmitting}
        >
          {verificationForm.formState.isSubmitting ? "Verifying..." : "Verify"}
        </Button>

        <div className="flex justify-center gap-2 text-sm">
          Already Have an Account?{" "}
          <button
            type="button"
            onClick={() => {
              closeRegister();
              openLogin();
            }}
            className="text-[#295B86] font-medium hover:underline"
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );

  // Render Step 3: Personal Information
  const renderPersonalInfoStep = () => (
    <form onSubmit={personalInfoForm.handleSubmit(handlePersonalInfoSubmit)}>
      <DialogHeader>
        <DialogTitle className="text-xl font-bold">
          Personal Information
        </DialogTitle>
        <DialogDescription className="text-sm text-gray-600">
          Please fill in the information below to complete your sign up
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-sm font-medium">
              First Name
            </Label>
            <Input
              id="firstName"
              placeholder="First Name"
              {...personalInfoForm.register("firstName")}
              className="border-2 border-gray-300 focus:border-blue-500 rounded-lg"
              disabled={personalInfoForm.formState.isSubmitting}
            />
            {personalInfoForm.formState.errors.firstName && (
              <p className="text-sm text-red-600">{personalInfoForm.formState.errors.firstName.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-sm font-medium">
              Last Name
            </Label>
            <Input
              id="lastName"
              placeholder="Last Name"
              {...personalInfoForm.register("lastName")}
              className="border-2 border-gray-300 focus:border-blue-500 rounded-lg"
              disabled={personalInfoForm.formState.isSubmitting}
            />
            {personalInfoForm.formState.errors.lastName && (
              <p className="text-sm text-red-600">{personalInfoForm.formState.errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">
            Create Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              {...personalInfoForm.register("password")}
              className="border-2 border-gray-300 focus:border-blue-500 rounded-lg pr-10"
              disabled={personalInfoForm.formState.isSubmitting}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {personalInfoForm.formState.errors.password && (
            <p className="text-sm text-red-600">{personalInfoForm.formState.errors.password.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm font-medium">
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            {...personalInfoForm.register("confirmPassword")}
            className="border-2 border-gray-300 focus:border-blue-500 rounded-lg"
            disabled={personalInfoForm.formState.isSubmitting}
          />
          {personalInfoForm.formState.errors.confirmPassword && (
            <p className="text-sm text-red-600">{personalInfoForm.formState.errors.confirmPassword.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg"
          disabled={personalInfoForm.formState.isSubmitting}
        >
          {personalInfoForm.formState.isSubmitting ? "Creating Account..." : "Register"}
        </Button>

    
      </div>
    </form>
  );

  return (
    <Dialog open={registerOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="w-md mx-auto p-6">
        {step === 1 && renderEmailStep()}
        {step === 2 && renderVerificationStep()}
        {step === 3 && renderPersonalInfoStep()}

        <DialogFooter>
          <p className="text-xs text-gray-600 text-center">
            By signing in or registering, I confirm that I have read and agreed
            to the{" "}
            <span className="text-blue-600 cursor-pointer underline">Terms and Conditions</span>{" "}
            and <span className="text-blue-600 cursor-pointer underline">Privacy Policy</span>
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}