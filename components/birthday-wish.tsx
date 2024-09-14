"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { FaBirthdayCake, FaGift } from "react-icons/fa";
import { GiBalloons } from "react-icons/gi";

// Lazy load confetti effect to avoid SSR issues
const DynamicConfetti = dynamic(() => import("react-confetti"), { ssr: false });

// Custom color schemes
const candleColors = ["#FF6F61", "#6B5B95", "#88B04B", "#F7CAC9", "#92A8D1"];
const balloonColors = ["#F67280", "#C06C84", "#6C5B7B", "#355C7D", "#F8B195"];
const confettiColors = ["#FFBF00", "#FF7F50", "#FF6347", "#4682B4", "#32CD32"];

export default function BirthdayWish() {
  // State management
  const [candlesLit, setCandlesLit] = useState<number>(0);
  const [balloonsPop, setBalloonsPop] = useState<number>(0);
  const [celebrating, setCelebrating] = useState<boolean>(false);
  const [confetti, setConfetti] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  // Card visibility state
  const [showCard, setShowCard] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [age, setAge] = useState<number | null>(null);

  // Handler for creating the card
  const handleCreateCard = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowCard(true);
  };

  // Total count settings
  const totalCandles = 5;
  const totalBalloons = 5;

  // Set window size for confetti on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Trigger confetti when all candles and balloons are interacted with
  useEffect(() => {
    if (candlesLit === totalCandles && balloonsPop === totalBalloons) {
      setConfetti(true);
    }
  }, [candlesLit, balloonsPop]);

  // Function to light candles sequentially
  const handleLightCandles = (index: number) => {
    if (index === candlesLit) {
      setCandlesLit((prev) => prev + 1);
    }
  };

  // Function to pop balloons sequentially
  const handlePopBalloons = (index: number) => {
    if (index === balloonsPop) {
      setBalloonsPop((prev) => prev + 1);
    }
  };

  // Calculate age based on the selected date
  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  // Celebration trigger
  const handleCelebrate = () => {
    setCelebrating(true);
    setConfetti(true);
    const interval = setInterval(() => {
      setCandlesLit((prev) => {
        if (prev < totalCandles) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 300); // Faster interval for lighting candles

    // Calculate age when celebrating
    if (date) {
      setAge(calculateAge(date));
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
      style={{
        backgroundImage: `url(https://img.freepik.com/free-photo/cupcake-still-life_23-2148097749.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1725235200&semt=ais_hybrid)`,
        backgroundSize: 'cover', // Ensures the background image covers the entire screen
        backgroundPosition: 'center', // Centers the background image
      }}
    >
      {/* Display form or birthday card based on state */}
      {!showCard ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md shadow-xl border-2 border-gray-600 p-4 bg-white rounded-xl"
        >
          <form onSubmit={handleCreateCard}>
            <div className="mb-4">
              <label className="block text-gray-800 font-semibold mb-1">Name:</label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 font-semibold mb-1">Birthday Date:</label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 font-semibold mb-1">Message:</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 transition-colors w-full py-2 rounded-lg"
            >
              Create Your Card
            </Button>
          </form>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="mx-auto shadow-xl border-2 border-gray-800 bg-white rounded-lg">
            <CardHeader className="text-center bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-t-lg py-2">
              <CardTitle className="text-4xl font-bold">🎉 Happy Birthday!</CardTitle>
              <h2 className="text-2xl font-bold">{name}</h2>
              <p className="text-lg">{date}</p>
              <CardDescription className="text-xl font-semibold">
                {message}
              </CardDescription>
              {age !== null && (
                <p className="text-lg font-semibold mt-2">
                  You are {age} years old!
                </p>
              )}
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <div>
                <h3 className="text-lg font-semibold mb-2">Light the Candles:</h3>
                <div className="flex justify-center space-x-2">
                  {[...Array(totalCandles)].map((_, index) => (
                    <AnimatePresence key={index}>
                      {(celebrating && index <= candlesLit) ||
                      (!celebrating && index < candlesLit) ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: celebrating ? index * 0.3 : 0,
                          }}
                        >
                          <FaBirthdayCake
                            aria-label="Candle"
                            className="w-8 h-8 cursor-pointer hover:scale-110"
                            style={{
                              color: candleColors[index % candleColors.length],
                            }}
                            onClick={() => handleLightCandles(index)}
                          />
                        </motion.div>
                      ) : (
                        <FaBirthdayCake
                          className="w-8 h-8 text-gray-300 cursor-pointer hover:scale-110"
                          onClick={() => handleLightCandles(index)}
                        />
                      )}
                    </AnimatePresence>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Pop the Balloons:</h3>
                <div className="flex justify-center space-x-2">
                  {[...Array(totalBalloons)].map((_, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 1 }}
                      animate={{ scale: index < balloonsPop ? 0 : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <GiBalloons
                        aria-label="Balloon"
                        className="w-8 h-8 cursor-pointer hover:scale-110"
                        style={{
                          color:
                            index < balloonsPop
                              ? "#D1D5DB"
                              : balloonColors[index % balloonColors.length],
                        }}
                        onClick={() => handlePopBalloons(index)}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button
                className="bg-gradient-to-r from-green-400 to-green-600 text-white hover:from-green-500 hover:to-green-700 transition-all duration-300 py-2 px-4 rounded-lg"
                onClick={handleCelebrate}
                disabled={celebrating}
              >
                Celebrate <FaGift className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
          {confetti && (
            <DynamicConfetti
              width={windowSize.width}
              height={windowSize.height}
              recycle={false}
              numberOfPieces={800}
              colors={confettiColors}
            />
          )}
        </motion.div>
      )}
    </div>
  );
}
