"use client";

import React from "react";

import { Card } from "@/components/ui/card";
import { useState } from "react";
import { ChevronLeft, ChevronRight, MoveLeft, MoveRight } from "lucide-react";
import Image from "next/image";
const routes = [
  {
    id: 1,
    from: "Lagos",
    to: "London",
    image:
      "/routes/Rectangle 5 (7).png",
    price: "$300",
    tripType: "Round Trip",
  },
  {
    id: 2,
    from: "Abuja",
    to: "Dubai",
    image:
      "/routes/Rectangle 5 (8).png",
    price: "$250",
    tripType: "One Way",
  },
  {
    id: 3,
    from: "Accra",
    to: "Paris",
    image:
      "/routes/Rectangle 5 (9).png",
    price: "$300",
    tripType: "One Way",
  },
  {
    id: 4,
    from: "Kogi",
    to: "Canada",
    image:
      "/routes/Rectangle 5 (10).png",
    price: "$500",
    tripType: "Round Trip",
  },
];

export default function PopularRoutes() {
  const [scrollPosition, setScrollPosition] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const containerRef: any = React.useRef(null);

  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    const scrollAmount = 300;
    const newPosition =
      direction === "left"
        ? Math.max(0, scrollPosition - scrollAmount)
        : scrollPosition + scrollAmount;

    containerRef.current.scrollLeft = newPosition;
    setScrollPosition(newPosition);
  };

  return (
    <section className="py-6 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-base md:text-3xl font-bold text-black">
            Popular Routes
          </h2>
          <div className="flex gap-4">
            <button
              onClick={() => scroll("left")}
              //   className="p-2 h-6 w-6 flex items-center justify-between bg-white hover:bg-gray-100 rounded transition-colors"
              className="p-2 h-10 w-10 flex items-center justify-between bg-white hover:bg-gray-100 rounded-full shadow transition-colors"
              aria-label="Scroll left"
            >
              <MoveLeft className="w-6 h-6 text-black" />
            </button>
            <button
              onClick={() => scroll("right")}
              //   className="p-2 h-6 w-6 flex items-center justify-between bg-white hover:bg-gray-100 rounded transition-colors"
              className="p-2 h-10 w-10 flex items-center justify-between bg-white hover:bg-gray-100 rounded-full shadow transition-colors"
              aria-label="Scroll right"
            >
              <MoveRight className="w-6 h-6 text-black" />
            </button>
          </div>
        </div>
        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-2 snap-x snap-mandatory"
          style={{ scrollBehavior: "smooth" }}
        >
          {routes.map((route) => (
            <Card
              key={route.id}
              className="overflow-hidden hover:shadow-none shadow-none transition-shadow cursor-pointer bg-white border-0 border-gray-200 flex-shrink-0 w-80 rounded-lg"
            >
              <div className="relative rounded-md overflow-hidden h-72 bg-gray-200">
                <img
                  src={route.image || "/placeholder.svg"}
                  alt={`${route.from} to ${route.to}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="px4 space-y2">
                <div className="flex items-center justify-between">
                  <div className="relative flex gap-1 font-semibold text-sm text-black">
                    <p>{route.from}</p>

                    <img
                      src="svg/circum_plane.svg"
                      alt="plane"
                      className="h-6 w-6"
                    //   fill
                    />
                    <p className="px2">{route.to}</p>
                  </div>
                <p className="text-red-500 font-bold text-lg">{route.price}</p>
                </div>
                <p className="text-gray-600 text-sm">{route.tripType}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
