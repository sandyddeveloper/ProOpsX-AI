"use client";
import Button from "@/components/ui/Button";
import startBg from "@/assets/stars.png"
import gridLines from "@/assets/grid-lines.png"
import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from "framer-motion";
import { RefObject, useEffect, useRef } from "react";

const useRelativeMousePosition = (to: RefObject<HTMLElement>) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const updateMousePosition = (event: MouseEvent) => {
    if (to.current) {
      const rect = to.current.getBoundingClientRect();
      mouseX.set(event.clientX - rect.left);
      mouseY.set(event.clientY - rect.top);
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return [mouseX, mouseY];
};

export const CallToAction = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const borderedDivRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundPositionY = useTransform(scrollXProgress, [0, 1], [300, -300]);

  const [mouseX, mouseY] = useRelativeMousePosition(borderedDivRef);

  const maskImage = useMotionTemplate`radial-gradient(50% 50% at ${mouseX}px ${mouseY}px, black, transparent)`
  return (
    <section className="py-20 md:py-24" ref={sectionRef}>
      <div className="mx-6">
        <motion.div
          ref={borderedDivRef}
          animate={{
            backgroundPositionY: startBg.width,
          }}
          transition={{ duration: 60, ease: "linear", repeat: Infinity }}
          className="border border-white/15 py-24 rounded-xl overflow-hidden relative group" style={{ backgroundPositionY, backgroundImage: `url(${startBg.src})` }}>
          <div className="absolute inset-0 bg-[rgb(74,32,138)] bg-blend-overlay [mask-image:radial-gradient(50%_50%_at_50%_35%,black,transparent)] group-hover:opacity-0 transition duration-700" style={{ backgroundImage: `url(${gridLines.src})` }}></div>

          <motion.div className="absolute inset-0 bg-[rgb(74,32,138)] bg-blend-overlay opacity-0 group-hover:opacity-100 transition duration-700" style={{ maskImage, backgroundImage: `url(${gridLines.src})` }}></motion.div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-5xl md:text-6xl max-w-lg sm:max-w-sm mx-auto tracking-tighter text-center font-medium"> Smarter Project Management for Teams.</h2>
            <p className="text-center text-lg md:text-xl max-w-xs mx-auto text-white/70 px-4 mt-5 tracking-tight">Collaborate in real-time, track progress, and streamline workflows — all in one powerful platform.</p>
            <div className="flex justify-center mt-8">
              <Button>Start Managing Projects</Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
