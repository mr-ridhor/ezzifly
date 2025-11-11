"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { toast } from "sonner";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// ✅ Validation Schema
const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

export default function NewsletterDialog() {
  const form = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
    mode: "onChange",
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: NewsletterFormData) => {
    try {
      // Simulate async API call
      await new Promise((r) => setTimeout(r, 1000));

      toast.success("🎉 You’re subscribed!", {
        description: "We’ll send you the latest flight deals soon.",
      });

      reset();
    } catch (error) {
      toast.error("Subscription failed", {
        description: "Please try again later.",
      });
    }
  };

  return (
    <Card className="flex flex-col md:flex-row overflow-hidden rounded-2xl shadow-md border border-gray-200 bg-white">
      {/* Left: Image */}
      <div className="relative w-full md:w-1/2 h-64 md:h-auto">
        <Image
          src="/newsletter.jpg"
          alt="Airplane wing at sunset"
          fill
          className="object-cover rounded-t-2xl md:rounded-none md:rounded-l-2xl"
          priority
        />
      </div>

      {/* Right: Content */}
      <CardContent className="flex flex-col justify-center w-full md:w-1/2 p-8 space-y-5">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Subscribe To Our Newsletter
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            Get notified when flight prices drop and when the best deals become
            available for your travels.
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col sm:flex-row gap-3"
          >
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                      className="h-11 border-gray-300 focus:border-blue-500 focus:ring-0"
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500 mt-1" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-2 rounded-lg h-11 transition-colors"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
