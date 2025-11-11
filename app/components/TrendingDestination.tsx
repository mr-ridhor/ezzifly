"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import { ChevronLeft, ChevronRight, MoveLeft, MoveRight } from "lucide-react"

const trendingDestinations = [
  {
    id: 1,
    name: "Barcelona",
    image: "/trending/Frame 1000003590 (1).png",
    badge: "Popular",
  },
  {
    id: 2,
    name: "Tokyo",
    image: "/trending/Rectangle 5 (11).png",
    badge: "Trending",
},
{
    id: 3,
    name: "Berlin",
    image: "/trending/Frame 1000003593.png",
    badge: "Hot Deal",
},
{
    id: 4,
    name: "Bangkok",
    image: "/trending/Frame 1000003591.png",
    badge: "Best Price",
  },
]

export default function TrendingDestination() {
  const [scrollPosition, setScrollPosition] = useState(0)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const containerRef: any = React.useRef(null)

  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return
    const scrollAmount = 320
    const newPosition =
      direction === "left" ? Math.max(0, scrollPosition - scrollAmount) : scrollPosition + scrollAmount

    containerRef.current.scrollLeft = newPosition
    setScrollPosition(newPosition)
  }

  return (
    <section className="py-6 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <h2 className="text-base md:text-3xl font-bold text-black">Trending Destination</h2>
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
          className="flex gap-6 overflow-x-auto scroll-smooth pb-2"
          style={{ scrollBehavior: "smooth" }}
        >
          {trendingDestinations.map((dest) => (
            <Card
              key={dest.id}
              className="overflow-hidden shadow-none cursor-pointer group relative bg-card border-none rounded-md flex-shrink-0 w-full md:w-80"
            >
              <div className="relative overflow-hidden h-74 rounded-md">
                <img
                  src={dest.image || "/placeholder.svg"}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              </div>
             
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
