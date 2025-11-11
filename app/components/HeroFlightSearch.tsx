"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Plus,
  Trash2,
  CalendarDays,
  Users,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  MapPin,
  Minus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type TripType = "round" | "oneway" | "multi";
type CabinClass = "economy" | "business" | "first" | "premium";

const HERO_IMAGES = [
  "/backgroundimage.jpg",
  "/backgroundimage.jpg",
  "/backgroundimage.jpg",
];

const AIRPORTS = {
  from: [
    {
      city: "Lagos, Nigeria",
      code: "LOS",
      airport: "Murtala Muhammed Airport",
    },
    {
      city: "Abuja, Nigeria",
      code: "ABV",
      airport: "Nnamdi Azikiwe International",
    },
    { city: "Akure, Nigeria", code: "AKF", airport: "Akure Airport" },
    {
      city: "Kano, Nigeria",
      code: "KAN",
      airport: "Kano International Airport",
    },
    { city: "Ibadan, Nigeria", code: "IBD", airport: "Ibadan Airport" },
  ],
  to: [
    { city: "London, United Kingdom", code: "LHR", airport: "London Heathrow" },
    { city: "London, United Kingdom", code: "LGW", airport: "London Gatwick" },
    { city: "London, United Kingdom", code: "LCY", airport: "London City" },
    { city: "London, United Kingdom", code: "STN", airport: "London Stansted" },
    {
      city: "East London, South Africa",
      code: "ELS",
      airport: "East London South Africa",
    },
  ],
};

export default function HeroFlightSearch() {
  const [active, setActive] = useState<number>(0);
  const [trip, setTrip] = useState<TripType>("round");
  const [cabinClass, setCabinClass] = useState<CabinClass>("economy");

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [depart, setDepart] = useState<Date | undefined>(undefined);
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined);

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [showTravellerDropdown, setShowTravellerDropdown] = useState(false);

  const [segments, setSegments] = useState([
    { id: 1, from: "", to: "", depart: undefined as Date | undefined },
    { id: 2, from: "", to: "", depart: undefined as Date | undefined },
  ]);

  useEffect(() => {
    const t = setInterval(() => {
      setActive((p) => (p + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  const prev = () =>
    setActive((p) => (p - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);
  const next = () => setActive((p) => (p + 1) % HERO_IMAGES.length);

  const addSegment = () =>
    setSegments((s) => [
      ...s,
      { id: Date.now(), from: "", to: "", depart: undefined },
    ]);
  const removeSegment = (id: number) => {
    // Only allow deletion if there are more than 2 segments, or keep at least 2
    setSegments((s) => (s.length > 1 ? s.filter((seg) => seg.id !== id) : s));
  };

  const handleSearch = () => {
    const travellers = {
      adults,
      children,
      infants,
      total: adults + children + infants,
    };
    const payload =
      trip === "multi"
        ? { trip, segments, travellers, cabinClass }
        : {
            trip,
            from,
            to,
            depart,
            returnDate: trip === "round" ? returnDate : undefined,
            travellers,
            cabinClass,
          };
    console.log("Searching", payload);
  };

  const variants = {
    enter: (dir = 0) => ({ opacity: 0, x: dir > 0 ? 40 : -40, scale: 1.03 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (dir = 0) => ({ opacity: 0, x: dir > 0 ? -30 : 30, scale: 1 }),
  };

  const getCabinLabel = (cabin: CabinClass) => {
    const labels: Record<CabinClass, string> = {
      economy: "Economy Class",
      business: "Business Class",
      first: "First Class",
      premium: "Premium Economy",
    };
    return labels[cabin];
  };

  const getTripLabel = (type: TripType) => {
    const labels: Record<TripType, string> = {
      round: "Round Trip",
      oneway: "One Way",
      multi: "Multi City",
    };
    return labels[type];
  };

  return (
    <section
      className="relative h-max md:h-[80vh] w-full overflow-hidden"
      style={{
        backgroundImage: `url(${HERO_IMAGES[active]})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        filter: "saturate(0.95)",
      }}
    >
      <div className="absolute inset-0 -z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            custom={1}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 1.1 }}
            className="absolute inset-0"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
      </div>

      <div className="absolute inset-y-0 left-4 z-20 hidden md:flex items-center">
        <button
          aria-label="Previous"
          onClick={prev}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white shadow-md"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>
      <div className="absolute inset-y-0 right-4 z-20 hidden md:flex items-center">
        <button
          aria-label="Next"
          onClick={next}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white shadow-md"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto h-full flex flex-col items-center justify-center px-4">
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white text-2xl md:text-4xl lg:text-5xl font-extrabold text-center drop-shadow-lg"
        >
          Travel Safe with Us and Enjoy Seamless Movement
        </motion.h2>

        {/* <p className="text-white/90 mt-3 mb-7 max-w-2xl text-center text-sm md:text-base">
          Compare fares across major airlines. Book round-trip, one-way or multi-city flights in seconds.
        </p> */}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="w-full px-4"
        >
          <Card className="mx-auto max-w-5xl  bg-transparent shadow-none border-none">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs md:text-sm font-medium border border-white bg-transparent text-white hover:text-black hover:bg-slate-50">
                      {getTripLabel(trip)}
                      <ChevronDown className="w-3 h-3" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="hove:text-black"
                  >
                    <DropdownMenuItem
                      className="hove:text-black"
                      onClick={() => setTrip("oneway")}
                    >
                      One Way
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTrip("round")}>
                      Round Trip
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTrip("multi")}>
                      Multi City
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs md:text-sm font-medium border border-white bg-transparent text-white hove:text-black hover:bg-slate-50">
                      {getCabinLabel(cabinClass)}
                      <ChevronDown className="w-3 h-3" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => setCabinClass("economy")}>
                      Economy Class
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setCabinClass("business")}>
                      Business Class
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setCabinClass("first")}>
                      First Class
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setCabinClass("premium")}>
                      Premium Economy
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {trip !== "multi" ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end mb-3">
                    <div className="bg-white border border-slate-200 rounded-lg p-2">
                      <label className="text-xs text-black p3 mb-1 block">
                        From
                      </label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild className="p-0">
                          <button className="w-full flex items-center justify-between gap-2 px3  text-left">
                            <div className="flex items-center gap-2 flex-1">
                              <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                              <span className="text-sm text-slate-700 truncate">
                                {from || "Select"}
                              </span>
                            </div>
                            <ChevronDown className="w-3 h-3 text-slate-400 flex-shrink-0" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-72">
                          {AIRPORTS.from.map((airport) => (
                            <DropdownMenuItem
                              key={airport.code}
                              onClick={() =>
                                setFrom(`${airport.city} (${airport.code})`)
                              }
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <MapPin className="w-4 h-4 text-slate-400" />
                              <div className="flex flex-col">
                                <span className="text-sm font-medium">
                                  {airport.city}
                                </span>
                                <span className="text-xs text-slate-500">
                                  {airport.airport}
                                </span>
                              </div>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-lg p-2">
                      <label className="text-xs text-black p3 mb-1 block">
                        To
                      </label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild className="p-0">
                          <button className="w-full flex items-center justify-between gap-2 px3  text-left">
                            <div className="flex items-center gap-2 flex-1">
                              <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                              <span className="text-sm text-slate-700 truncate">
                                {to || "Select"}
                              </span>
                            </div>
                            <ChevronDown className="w-3 h-3 text-slate-400 flex-shrink-0" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-72">
                          {AIRPORTS.from.map((airport) => (
                            <DropdownMenuItem
                              key={airport.code}
                              onClick={() =>
                                setFrom(`${airport.city} (${airport.code})`)
                              }
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <MapPin className="w-4 h-4 text-slate-400" />
                              <div className="flex flex-col">
                                <span className="text-sm font-medium">
                                  {airport.city}
                                </span>
                                <span className="text-xs text-slate-500">
                                  {airport.airport}
                                </span>
                              </div>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="bg-white  border border-slate-200 rounded-lg p-2">
                      <label className="text-xs text-black p3 mb-1 block">
                        Depart
                      </label>
                      <div className="flex flex-row md:items-center justify-between  gap-2 bg-white  ">
                        <CalendarDays className="hidden md:flex w-4 h-4 text-slate-400 flex-shrink-0" />
                        <PopoverDate
                          selected={depart}
                          onSelect={(d) => setDepart(d)}
                          placeholder="Select Date"
                        />
                        <CalendarDays className=" md:hidden flex w-4 h-4 text-slate-400 flex-shrink-0" />
                      </div>
                    </div>

                    {trip === "round" ? (
                      <div className="bg-white border border-slate-200 rounded-lg p-2">
                        <label className="text-xs text-black p3 mb-1 block">
                          Return
                        </label>
                        <div className="flex flex-row items-center justify-between  gap-2 bg-white  ">
                          <CalendarDays className="hidden md:flex w-4 h-4 text-slate-400 flex-shrink-0" />
                          <PopoverDate
                            selected={returnDate}
                            onSelect={(d) => setReturnDate(d)}
                            placeholder="Select Date"
                          />

                          <CalendarDays className=" md:hidden flex w-4 h-4 text-slate-400 flex-shrink-0" />
                        </div>
                      </div>
                    ) : null}

                    <div className="bg-white border border-slate-200 rounded-lg p-2">
                      <label className="text-xs text-black p3 mb-1 block">
                        Travellers
                      </label>
                      <DropdownMenu
                        open={showTravellerDropdown}
                        onOpenChange={setShowTravellerDropdown}
                      >
                        <DropdownMenuTrigger asChild>
                          <button className="w-full flex items-center justify-between gap-2 bg-white   text-left">
                            <span className="text-sm text-slate-700">{`${
                              adults + children + infants
                            }`}</span>
                            <ChevronDown className="w-3 h-3 text-slate-400" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-64 p-4">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium">Adults</p>
                                <p className="text-xs text-slate-500">
                                  Age 12+
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() =>
                                    setAdults(Math.max(1, adults - 1))
                                  }
                                  className="p-1 rounded hover:bg-slate-100"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-6 text-center text-sm font-medium">
                                  {adults}
                                </span>
                                <button
                                  onClick={() => setAdults(adults + 1)}
                                  className="p-1 rounded hover:bg-slate-100"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium">Children</p>
                                <p className="text-xs text-slate-500">
                                  Age 2-11
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() =>
                                    setChildren(Math.max(0, children - 1))
                                  }
                                  className="p-1 rounded hover:bg-slate-100"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-6 text-center text-sm font-medium">
                                  {children}
                                </span>
                                <button
                                  onClick={() => setChildren(children + 1)}
                                  className="p-1 rounded hover:bg-slate-100"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium">Infants</p>
                                <p className="text-xs text-slate-500">
                                  Below 2
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() =>
                                    setInfants(Math.max(0, infants - 1))
                                  }
                                  className="p-1 rounded hover:bg-slate-100"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-6 text-center text-sm font-medium">
                                  {infants}
                                </span>
                                <button
                                  onClick={() => setInfants(infants + 1)}
                                  className="p-1 rounded hover:bg-slate-100"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            <button
                              onClick={() => setShowTravellerDropdown(false)}
                              className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-lg text-sm font-medium"
                            >
                              Apply
                            </button>
                          </div>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <div className="flex justify-center md:justify-center">
                    <Button
                      onClick={handleSearch}
                      className="bg-primary md:w-max w-full hover:bg-primary/90 text-white px-8 py-2.5 rounded-lg shadow-md text-sm"
                    >
                      Search
                    </Button>
                  </div>
                </>
              ) : (
                <div className="space-y-3 w-full ">
                  {segments.map((seg, idx) => (
                    <div
                      key={seg.id}
                      className="grid grid-cols-1  md:grid-cols-7  flex-col md:flex-row gap-3 items-center"
                    >
                        <div className="w-full bg-white border col-span-2 border-slate-200 rounded-lg p-2">
                      <label className="text-xs text-black p3 mb-1 block">
                          From
                        </label>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="w-full flex items-center justify-between gap-2 bg-white w-full rounded-lg p-0 py-2.5 text-left">
                              <div className="flex items-center gap-2 flex-1">
                                <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                <span className="text-sm text-slate-700 truncate">
                                  {seg.from || "Select"}
                                </span>
                              </div>
                              <ChevronDown className="w-3 h-3 text-slate-400 flex-shrink-0" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start" className="w-72">
                            {AIRPORTS.from.map((airport) => (
                              <DropdownMenuItem
                                key={airport.code}
                                onClick={() =>
                                  setSegments((s) =>
                                    s.map((seg2) =>
                                      seg2.id === seg.id
                                        ? {
                                            ...seg2,
                                            from: `${airport.city} (${airport.code})`,
                                          }
                                        : seg2
                                    )
                                  )
                                }
                                className="flex items-center gap-2 cursor-pointer"
                              >
                                <MapPin className="w-4 h-4 text-slate-400" />
                                <div className="flex flex-col">
                                  <span className="text-sm font-medium">
                                    {airport.city}
                                  </span>
                                  <span className="text-xs text-slate-500">
                                    {airport.airport}
                                  </span>
                                </div>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="w-full bg-white border col-span-2 border-slate-200 rounded-lg p-2">
                      <label className="text-xs text-black p3 mb-1 block">
                          To
                        </label>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="w-full flex items-center justify-between gap-2 bg-white w-full rounded-lg p-0 py-2.5 text-left">
                              <div className="flex items-center gap-2 flex-1">
                                <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                <span className="text-sm text-slate-700 truncate">
                                  {seg.to || "Select"}
                                </span>
                              </div>
                              <ChevronDown className="w-3 h-3 text-slate-400 flex-shrink-0" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start" className="w-72">
                            {AIRPORTS.from.map((airport) => (
                              <DropdownMenuItem
                                key={airport.code}
                                onClick={() =>
                                  setSegments((s) =>
                                    s.map((seg2) =>
                                      seg2.id === seg.id
                                        ? {
                                            ...seg2,
                                            from: `${airport.city} (${airport.code})`,
                                          }
                                        : seg2
                                    )
                                  )
                                }
                                className="flex items-center gap-2 cursor-pointer"
                              >
                                <MapPin className="w-4 h-4 text-slate-400" />
                                <div className="flex flex-col">
                                  <span className="text-sm font-medium">
                                    {airport.city}
                                  </span>
                                  <span className="text-xs text-slate-500">
                                    {airport.airport}
                                  </span>
                                </div>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="w-full bg-white border col-span-2 h-20 flex flex-col gap-6 border-slate-200 rounded-lg p-2">
                      <label className="text-xs text-black p3  block">
                          Depart
                        </label>
                        <div className="flex  flex-row items-center justify-between  gap-2 bg-white  ">
                          <CalendarDays className="hidden md:flex w-4 h-4 text-slate-400 flex-shrink-0" />
                          <PopoverDate
                            selected={depart}
                            onSelect={(d) => setDepart(d)}
                            placeholder="Select Date"
                          />
                          <CalendarDays className=" md:hidden flex w-4 h-4 text-slate-400 flex-shrink-0" />
                        </div>
                      </div>
<div className="flex col-span-1 justify-end">

                      <button
                        onClick={() => removeSegment(seg.id)}
                        className="md:flex hidden p-2 rounded-full h-12 w-12 justify-center items-center  hover:bg-red-50 text-gra-900 bg-white"
                        aria-label="Remove segment"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
</div>
                    </div>
                  ))}
                  <div className="w-full md:flex fle-col gap-4 justify-between items-center">
                    <div className="bg-white  rounded-lg p-2">
                      <label className="text-xs text-black p3 mb1 block">
                        Travelers
                      </label>
                      <DropdownMenu
                        open={showTravellerDropdown}
                        onOpenChange={setShowTravellerDropdown}
                      >
                        <DropdownMenuTrigger asChild>
                          <button className="w-full md:w-64 flex items-center justify-between gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-left">
                            <div className="flex items-center gap-2 flex-1">
                              <Users className="w-4 h-4 text-slate-400 flex-shrink-0" />
                              <span className="text-sm text-slate-700">{`${
                                adults + children + infants
                              }`}</span>
                            </div>
                            <ChevronDown className="w-3 h-3 text-slate-400" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-64 p-4">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium">Adults</p>
                                <p className="text-xs text-slate-500">
                                  Age 12+
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() =>
                                    setAdults(Math.max(1, adults - 1))
                                  }
                                  className="p-1 rounded hover:bg-slate-100"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-6 text-center text-sm font-medium">
                                  {adults}
                                </span>
                                <button
                                  onClick={() => setAdults(adults + 1)}
                                  className="p-1 rounded hover:bg-slate-100"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium">Children</p>
                                <p className="text-xs text-slate-500">
                                  Age 2-11
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() =>
                                    setChildren(Math.max(0, children - 1))
                                  }
                                  className="p-1 rounded hover:bg-slate-100"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-6 text-center text-sm font-medium">
                                  {children}
                                </span>
                                <button
                                  onClick={() => setChildren(children + 1)}
                                  className="p-1 rounded hover:bg-slate-100"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium">Infants</p>
                                <p className="text-xs text-slate-500">
                                  Below 2
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() =>
                                    setInfants(Math.max(0, infants - 1))
                                  }
                                  className="p-1 rounded hover:bg-slate-100"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-6 text-center text-sm font-medium">
                                  {infants}
                                </span>
                                <button
                                  onClick={() => setInfants(infants + 1)}
                                  className="p-1 rounded hover:bg-slate-100"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            <button
                              onClick={() => setShowTravellerDropdown(false)}
                              className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-lg text-sm font-medium"
                            >
                              Apply
                            </button>
                          </div>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <button
                      onClick={addSegment}
                      className="inline-flex text-white items-center  md:w-max w-full gap-2 px-4 py-2 rounded-lg border border-slate-300 text-sm text-center justify-center md:mt-0 mt-3   hover:bg-slate-50"
                    >
                      <Plus className="w-4 h-4" /> Add Flight
                    </button>
                  </div>

                  <div className="w-full flex flex-col md:flex-row gap-3 items-start md:items-center justify-between pt-2"></div>
                  <Button
                    onClick={handleSearch}
                    className="w-full md:w-max bg-primary hover:bg-primary text-white px-8 py-2.5 rounded-lg shadow-md text-sm"
                  >
                    Search
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <div className="flex gap-2 mt-6">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setActive(i)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all",
                i === active ? "bg-pink-600 scale-110 shadow" : "bg-white/40"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function PopoverDate({
  selected,
  onSelect,
  placeholder = "Select date",
}: {
  selected?: Date | undefined;
  onSelect?: (d: Date | undefined) => void;
  placeholder?: string;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="w-full text-left text-sm text-slate-700 hover:text-slate-900">
          <span>{selected ? format(selected, "MMM d") : placeholder}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Calendar mode="single" selected={selected} onSelect={onSelect} />
      </PopoverContent>
    </Popover>
  );
}
