import { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const providers = [
  { key: "robinhood", label: "Robin Hood" },
  { key: "ameritrade", label: "Ameritrade" },
  { key: "fidelity", label: "Fidelity" },
  { key: "charles", label: "Charles" },
];

const chartData: Record<
  string,
  { month: string; actual: number; benchmark: number }[]
> = {
  robinhood: [
    { month: "Jan", actual: 720, benchmark: 640 },
    { month: "Feb", actual: 810, benchmark: 700 },
    { month: "Mar", actual: 660, benchmark: 590 },
    { month: "Apr", actual: 750, benchmark: 680 },
    { month: "May", actual: 820, benchmark: 760 },
    { month: "Jun", actual: 900, benchmark: 830 },
    { month: "Jul", actual: 760, benchmark: 690 },
    { month: "Aug", actual: 780, benchmark: 720 },
    { month: "Sep", actual: 840, benchmark: 780 },
    { month: "Oct", actual: 920, benchmark: 860 },
    { month: "Nov", actual: 940, benchmark: 880 },
    { month: "Dec", actual: 980, benchmark: 920 },
  ],
  ameritrade: [
    { month: "Jan", actual: 680, benchmark: 620 },
    { month: "Feb", actual: 760, benchmark: 690 },
    { month: "Mar", actual: 700, benchmark: 650 },
    { month: "Apr", actual: 820, benchmark: 760 },
    { month: "May", actual: 880, benchmark: 820 },
    { month: "Jun", actual: 940, benchmark: 880 },
    { month: "Jul", actual: 810, benchmark: 760 },
    { month: "Aug", actual: 830, benchmark: 780 },
    { month: "Sep", actual: 890, benchmark: 840 },
    { month: "Oct", actual: 940, benchmark: 900 },
    { month: "Nov", actual: 970, benchmark: 930 },
    { month: "Dec", actual: 990, benchmark: 960 },
  ],
  fidelity: [
    { month: "Jan", actual: 650, benchmark: 590 },
    { month: "Feb", actual: 720, benchmark: 680 },
    { month: "Mar", actual: 690, benchmark: 640 },
    { month: "Apr", actual: 780, benchmark: 730 },
    { month: "May", actual: 820, benchmark: 780 },
    { month: "Jun", actual: 860, benchmark: 820 },
    { month: "Jul", actual: 830, benchmark: 780 },
    { month: "Aug", actual: 850, benchmark: 800 },
    { month: "Sep", actual: 880, benchmark: 840 },
    { month: "Oct", actual: 910, benchmark: 880 },
    { month: "Nov", actual: 940, benchmark: 900 },
    { month: "Dec", actual: 970, benchmark: 940 },
  ],
  charles: [
    { month: "Jan", actual: 710, benchmark: 660 },
    { month: "Feb", actual: 790, benchmark: 730 },
    { month: "Mar", actual: 740, benchmark: 690 },
    { month: "Apr", actual: 820, benchmark: 770 },
    { month: "May", actual: 870, benchmark: 820 },
    { month: "Jun", actual: 930, benchmark: 880 },
    { month: "Jul", actual: 790, benchmark: 740 },
    { month: "Aug", actual: 820, benchmark: 780 },
    { month: "Sep", actual: 860, benchmark: 820 },
    { month: "Oct", actual: 900, benchmark: 860 },
    { month: "Nov", actual: 930, benchmark: 890 },
    { month: "Dec", actual: 960, benchmark: 920 },
  ],
};

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload.length) return null;
  const data = payload[0];
  const value = typeof data.value === "number" ? `$${data.value}` : data.value;
  const isLeftBar = data.dataKey === "actual";
  const title = isLeftBar ? "Purchase value" : "Market value";

  return (
    <>
      <style>{`
        @keyframes tooltip-fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
      <div
        style={{
          position: "relative",
          pointerEvents: "none",
          transform: isLeftBar
            ? "translate(-100%, -50%) translate(-10px, 0px)"
            : "translate(0%, -50%) translate(10px, 0px)",
          transformOrigin: isLeftBar ? "right center" : "left center",
        }}
      >
        <div
          style={{
            position: "relative",
            backgroundColor: "#3B3B45",
            color: "#FFFFFF",
            padding: "8px 16px",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            border: "none",
            whiteSpace: "nowrap",
            animation: "tooltip-fade-in 0.15s ease-out forwards",
          }}
        >
          <div
            style={{ fontSize: "16px", fontWeight: "600", color: "#FFFFFF" }}
          >
            {value}
          </div>
          <div
            style={{
              fontSize: "12px",
              opacity: 0.8,
              marginTop: "2px",
              fontWeight: "400",
              color: "#FFFFFF",
            }}
          >
            {title}
          </div>

          <div
            style={{
              position: "absolute",
              width: 0,
              height: 0,
              borderTop: "6px solid transparent",
              borderBottom: "6px solid transparent",
              top: "50%",
              marginTop: "-6px",
              right: isLeftBar ? "-6px" : "auto",
              left: isLeftBar ? "auto" : "-6px",
              borderLeft: isLeftBar ? "6px solid #3B3B45" : "none",
              borderRight: isLeftBar ? "none" : "6px solid #3B3B45",
            }}
          />
        </div>
      </div>
    </>
  );
};

const scaleSteps = [1000, 800, 600, 400, 200, 0];

export default function PortfolioChart() {
  const [activeProvider, setActiveProvider] = useState("robinhood");
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);
  const data = useMemo(() => chartData[activeProvider], [activeProvider]);

  return (
    <div className="rounded-[16px] bg-white p-6 xl:h-[320px] ">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-xl  font-bold leading-[133%] text-[#3B3B45]">
          Overview
        </p>

        <div className="flex flex-wrap items-center gap-2">
          {providers.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveProvider(key)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeProvider === key
                  ? "bg-primary text-white"
                  : "bg-[#F6F6F6] text-text-main"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-[60px_minmax(0,1fr)] gap-4">
          <div className="flex flex-col justify-between text-xs leading-[1.7] text-text-main">
            {scaleSteps.map((step) => (
              <span key={step}>{step}</span>
            ))}
          </div>
          <div className="h-[224px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 10, right: 16, left: 0, bottom: 0 }}
                onMouseMove={({ activeLabel }) => {
                  if (activeLabel) setHoveredMonth(activeLabel as string);
                }}
                onMouseLeave={() => setHoveredMonth(null)}
              >
                <CartesianGrid
                  stroke="#E5E7EB"
                  vertical={false}
                  strokeDasharray="3 3"
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  fontSize={"11px"}
                  tick={{ fill: "#6B7280" }}
                  tickFormatter={(value) =>
                    typeof value === "string" ? value.toUpperCase() : value
                  }
                />
                <YAxis domain={[0, 1000]} hide={true} />
                <Tooltip
                  shared={false}
                  content={<CustomTooltip />}
                  cursor={false}
                  isAnimationActive={false}
                  wrapperStyle={{ pointerEvents: "none" }}
                />
                <Bar dataKey="actual" name="Actual" barSize={12}>
                  {data.map((entry, index) => (
                    <Cell
                      key={`actual-${index}`}
                      fill={
                        hoveredMonth === entry.month ? "#FFB800" : "#F1F1F2"
                      }
                    />
                  ))}
                </Bar>
                <Bar dataKey="benchmark" name="Benchmark" barSize={12}>
                  {data.map((entry, index) => (
                    <Cell
                      key={`benchmark-${index}`}
                      fill={
                        hoveredMonth === entry.month ? "#FF8600" : "#E6E6E7"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
