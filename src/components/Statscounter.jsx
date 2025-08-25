// src/components/StatsCounter.jsx
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const statsData = [
  { id: 1, label: "Exclusive Professors", target: 33 },
  { id: 2, label: "Hours Studied", target: 750 },
  { id: 3, label: "Support Material", target: 125 },
  { id: 4, label: "Active Students", target: 500 },
];

const formatNumber = (num) => {
  if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
  return `${num}`;
};

const CounterCard = ({ label, target, inView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 1500;
    const increment = target / (duration / 10);

    const interval = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(interval);
      }
      setCount(Math.ceil(start));
    }, 10);

    return () => clearInterval(interval);
  }, [target, inView]);

  return (
    <div className="flex flex-col items-center justify-center text-white">
      <h3 className="text-5xl font-bold">
        {formatNumber(count)}
        {target < 1000 ? "+" : ""}
      </h3>
      <p className="text-lg mt-2">{label}</p>
    </div>
  );
};

const Statscounter = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3, // Start counting when 30% of the section is visible
  });

  return (
    <section ref={ref} className="bg-[#e0872e] w-full py-10 px-4 md:px-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 text-center divide-x divide-white/20">
        {statsData.map((stat) => (
          <CounterCard
            key={stat.id}
            label={stat.label}
            target={stat.target}
            inView={inView}
          />
        ))}
      </div>
    </section>
  );
};

export default Statscounter;
