import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

const randomBetween = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

interface StarProps {
  id: string;
}

const Star: React.FC<StarProps> = () => {
  const size = useMemo(() => randomBetween(0.5, 2), []);
  const initialOpacity = useMemo(() => randomBetween(0.3, 1.0), []);
  const position = useMemo(
    () => ({
      top: `${randomBetween(0, 100)}%`,
      left: `${randomBetween(0, 100)}%`,
    }),
    [],
  );
  const twinkleDelay = useMemo(() => randomBetween(0, 5), []);

  return (
    <motion.div
      className="absolute bg-white rounded-full pointer-events-none"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        top: position.top,
        left: position.left,
        opacity: initialOpacity,
      }}
      animate={{
        opacity: [initialOpacity, initialOpacity * 0.3, initialOpacity],
      }}
      transition={{
        duration: randomBetween(2, 5),
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
        delay: twinkleDelay,
      }}
    />
  );
};

interface ShootingStarProps {
  id: string;
}

const ShootingStar: React.FC<ShootingStarProps> = () => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0,
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const duration = useMemo(() => randomBetween(1.5, 4), []);
  const initialDelay = useMemo(() => randomBetween(5, 25), []);
  const repeatDelay = useMemo(() => randomBetween(2, 15), []);
  const initialPosition = useMemo(
    () => ({
      top: `${randomBetween(-10, 60)}%`,
      left: `${randomBetween(-10, 110)}%`,
    }),
    [],
  );
  const angle = useMemo(() => randomBetween(10, 70), []);
  const tailLength = useMemo(() => randomBetween(50, 150), []);

  const travelDistance = useMemo(
    () => Math.max(windowWidth * 1.2, 500),
    [windowWidth],
  );

  const endX = useMemo(
    () => Math.cos((angle * Math.PI) / 180) * travelDistance,
    [angle, travelDistance],
  );
  const endY = useMemo(
    () => Math.sin((angle * Math.PI) / 180) * travelDistance,
    [angle, travelDistance],
  );

  return (
    <motion.div
      className="absolute h-[1px] bg-gradient-to-r from-white/70 via-white/50 to-transparent pointer-events-none"
      style={{
        top: initialPosition.top,
        left: initialPosition.left,
        width: `${tailLength}px`,
        rotate: `${angle}deg`,
        transformOrigin: "left center",
      }}
      initial={{
        opacity: 0,
        x: 0,
        y: 0,
      }}
      animate={{
        opacity: [0, 1, 1, 0],
        x: [0, endX],
        y: [0, endY],
      }}
      transition={{
        duration: duration,
        delay: initialDelay,
        ease: "linear",
        repeat: Infinity,
        repeatDelay: repeatDelay,
      }}
    />
  );
};

interface StarrySkyBackgroundProps {
  numStars?: number;
  numShootingStars?: number;
}

const StarrySkyBackground: React.FC<StarrySkyBackgroundProps> = ({
  numStars = 150,
  numShootingStars = 7,
}) => {
  const stars = useMemo(
    () => Array.from({ length: numStars }, (_, i) => `star-${i}`),
    [numStars],
  );

  const shootingStars = useMemo(
    () =>
      Array.from({ length: numShootingStars }, (_, i) => `shooting-star-${i}`),
    [numShootingStars],
  );

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {stars.map((id) => (
        <Star key={id} id={id} />
      ))}
      {shootingStars.map((id) => (
        <ShootingStar key={id} id={id} />
      ))}
    </div>
  );
};

export default StarrySkyBackground;
