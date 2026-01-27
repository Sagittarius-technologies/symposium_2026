import { Sparkles, Trophy } from "lucide-react";
import { motion } from "framer-motion";

const ScrollingTicker = () => {
  return (
    <div className="pt-16 top-16 z-40 bg-[#0B1220] border-b border-cyan-500/20 overflow-hidden">
      
      <motion.div
        className="flex whitespace-nowrap text-white py-3"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        }}
      >
        {/* ===== CONTENT (DUPLICATED) ===== */}
        <div className="flex w-max">
          <TickerContent />
          <TickerContent />
          <TickerContent />
          <TickerContent />
          <TickerContent />
          <TickerContent />
          <TickerContent />
        </div>
      </motion.div>
    </div>
  );
};

const TickerContent = () => (
  <>
    <span className="flex items-center gap-3 px-8">
      <Sparkles className="w-5 h-5 text-cyan-400" />
      <span className="font-bold tracking-widest">₹50K CASH PRIZE</span>
      <Trophy className="w-5 h-5 text-cyan-400" />
    </span>

    <span className="mx-4 text-cyan-500/60">|</span>

    <span className="flex items-center gap-3 px-8">
      <Sparkles className="w-5 h-5 text-blue-400" />
      <span className="font-bold tracking-widest">WIN EXCITING PRIZES</span>
      <Trophy className="w-5 h-5 text-blue-400" />
    </span>

    <span className="mx-4 text-cyan-500/60">|</span>

    <span className="flex items-center gap-3 px-8">
      <Sparkles className="w-5 h-5 text-cyan-400" />
      <span className="font-bold tracking-widest">REGISTER NOW</span>
      <Trophy className="w-5 h-5 text-cyan-400" />
    </span>

    <span className="mx-4 text-cyan-500/60">|</span>
  </>
);

export default ScrollingTicker;
