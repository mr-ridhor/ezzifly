import { Card } from "@/components/ui/card"
import { Heart, Shield, Zap, Users } from "lucide-react"

const features = [
  {
    id: 1,
    icon: "/svg/Frame.svg",
    title: "Best Flight Deals",
    description: "Get unbeatable prices on domestic and international flights no hidden fees, just transparent fares.",
},
{
    id: 2,
    icon: "/svg/Frame (1).svg",
    title: "Secure & Reliable",
    description: "Search, compare, and book flights in real time with live seat and fare updates.",
},
{
    id: 3,
    icon: "/svg/Frame (2).svg",
    title: "Instant & Fast Booking",
    description: "Book your flight in just a few clicks with our smooth, intuitive interface.",
},
{
    id: 4,
    icon: "/svg/Frame (3).svg",
    title: "Trusted by Thousands",
    description: "Join thousands of satisfied travellers who trust Ezzilify to get them to their destination hassle-free.",
  },
]

export default function WhyEzzifly() {
  return (
    <section className="py-8 px-6 md:px-12 bgmuted">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 textcenter text-foreground">Why Easily</h2>
       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            // const IconComponent = feature.icon
            return (
              <Card key={feature.id} className="p-6 gap-0 bg-card border-0 hover:shadow-lg transition-shadow">
                <div className="mb4 inline-block py-3 bgprimary/10 rounded-lg">
                  {/* <IconComponent className="w-6 h-6 text-primary" /> */}
                  <img src={feature.icon} className="h-14 w-14"/>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-card-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
