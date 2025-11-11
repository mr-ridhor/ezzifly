import { Button } from "@/components/ui/button"

export default function VisualSafety() {
  return (
    <section className="py-8  md:px-12 bg-background">
      <div className="w-full md:max-w-6xl mx-auto">
        <div className=" items-center">
          <div className="relative md:h-96 bg-muted rounded-lg overflow-hidden">
            <img
              src="/Rectangle 6.png"
              alt="Safe flying experience"
              className="w-full h-full object-contain md:object-cover"
            />
          </div>
          <div>
            <h2 className="text-sm md:text-xl font-bold my-4 text-foreground text-balance">
              Making Flight Booking Simple and Stress-Free
            </h2>
            <p className="textsm md:text-base text-muted-foreground mb-6">
            Ezzilify is a modern flight booking platform designed to make travel easier, faster, and more affordable. We connect travelers with top airlines worldwide, giving you the power to search, compare, and book flights with just a few clicks. Our goal is simple — to help you reach your destination without the stress of complicated booking processes. 
            </p>
            <p className="textsm md:text-base text-muted-foreground mb-8">
            Founded with a vision to transform how people travel, Ezzilify was built on the belief that booking a flight should be as effortless as choosing your destination. We leverage cutting-edge technology and smart design to give every traveler a smooth, transparent, and enjoyable experience.
            </p>
          
          </div>
        </div>
      </div>
    </section>
  )
}
