import { useState } from "react";

interface PortfolioStatCardProps {
  title: string;
  figure: string;
  icon: React.ReactNode;
  baseColor: string;
  lightColor?: string;
}

export default function PortfolioStatCard({
  title,
  figure,
  icon,
  baseColor,
  lightColor,
}: PortfolioStatCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const hoverBg = lightColor || `${baseColor}1A`;

  return (
    <div
      className="rounded-xl p-4 transition-colors duration-300 ease-in-out"
      style={{
        backgroundColor: isHovered ? hoverBg : "white",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col justify-center h-[49px]">
          <p className="text-[1.5625rem] text-[#3B3B45] font-bold text-text-h">
            {figure}
          </p>
          <p className="text-[0.75rem]  text-text-main">{title}</p>
        </div>
        <div
          className="grid h-12 w-12 place-items-center rounded-full"
          style={{
            backgroundColor: hoverBg,
            color: baseColor,
          }}
        >
          <span className="text-lg font-bold">{icon}</span>
        </div>
      </div>
    </div>
  );
}
