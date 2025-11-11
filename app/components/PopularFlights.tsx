import { Card } from "@/components/ui/card"

const destinations = [
  {
    id: 1,
    name: "Dubai",
    code: "DXB",
    from: "Lagos",
    to: "Dubai",
    image: "/popular/Frame 1000003590.png",
    rating: "4.8",
    price: "$300",
    tripType: "Round Trip",
  },
  {
    id: 2,
    name: "Dubai",
    code: "DXB",
    from: "Lagos",
    to: "Dubai",
    image: "/popular/Rectangle 5 (1).png",
    rating: "4.9",
    price: "$250",
    tripType: "One Way",
  },
  {
    id: 3,
    name: "Paris",
    code: "CDG",
    from: "Lagos",
    to: "Paris",
    image: "/popular/Rectangle 5 (2).png",
    rating: "4.7",
    price: "$300",
    tripType: "One Way",
  },
  {
    id: 4,
    name: "New York",
    code: "JFK",
    from: "Lagos",
    to: "New York",
    image: "/popular/Rectangle 5 (3).png",
    rating: "4.8",
    price: "$500",
    tripType: "Round Trip",
  },
  {
    id: 5,
    name: "London",
    code: "LHR",
    from: "Lagos",
    to: "London, UK",
    image: "/popular/Rectangle 5 (4).png",
    rating: "4.8",
    price: "$300",
    tripType: "One Way",
  },
  {
    id: 6,
    name: "Tokyo",
    code: "NRT",
    from: "Lagos",
    to: "Tokyo, Japan",
    image: "/popular/Rectangle 5 (5).png",
    rating: "4.8",
    price: "$500",
    tripType: "Round Trip",
  },
  {
    id: 7,
    name: "Sydney",
    code: "SYD",
    from: "Lagos",
    to: "Sydney",
    image: "/popular/Rectangle 5 (6).png",
    rating: "4.8",
    price: "$300",
    tripType: "Round Trip",
  },
  {
    id: 8,
    name: "Singapore",
    code: "SIN",
    from: "Lagos",
    to: "Singapore",
    image: "/popular/Rectangle 5.png",
    rating: "4.8",
    price: "$300",
    tripType: "Round Trip",
  },
]

export default function PopularFlights() {
  return (
    <section className="py-6 px-6 md:px-12 bg-background">
      <div className=" w-full md:max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-foreground">Popular Flights From Lagos</h2>
        <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest) => (
            <Card
              key={dest.id}
              className="w-full  hover:shadow-none shadow-none transition-shadow cursor-pointer  border-0 border-gray-200 flex-shrink-0 md:w-60 rounded-lg"
            >
              <div className="relative overflow-hidden h-48 bg-muted rounded-md">
                <img
                  src={dest.image || "/placeholder.svg"}
                  alt={dest.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="px4 space-y2">
                <div className="flex items-center justify-between">
                  <div className="relative flex gap-1 font-semibold text-sm text-black">
                    <p>{dest.from}</p>

                    <img
                      src="svg/circum_plane.svg"
                      alt="plane"
                      className="h-6 w-6"
                    //   fill
                    />
                    <p className="px2">{dest.to}</p>
                  </div>
                <p className="text-red-500 font-bold text-lg">{dest.price}</p>
                </div>
                <p className="text-gray-600 text-sm">{dest.tripType}</p>
              </div>
              {/* <div className="p-4">
                <h3 className="font-semibold text-lg text-card-foreground">{dest.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{dest.code}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Rating: {dest.rating}</span>
                  <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded">View</span>
                </div>
              </div> */}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
