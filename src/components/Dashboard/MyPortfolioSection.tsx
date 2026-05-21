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
  LineChart,
  Line,
  ReferenceLine,
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
          <div style={{ fontSize: "16px", fontWeight: "600", color: "#FFFFFF" }}>{value}</div>
          <div style={{ fontSize: "12px", opacity: 0.8, marginTop: "2px", fontWeight: "400", color: "#FFFFFF" }}>{title}</div>

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

const aaplData = [
  { value: 20 },
  { value: 55 },
  { value: 80 },
  { value: 60 },
  { value: 30 },
  { value: 70 },
  { value: 90 },
  { value: 45 },
  { value: 65 },
  { value: 85 },
];

const bplData = [
  { value: 85 },
  { value: 70 },
  { value: 55 },
  { value: 75 },
  { value: 40 },
  { value: 25 },
  { value: 50 },
  { value: 30 },
  { value: 15 },
  { value: 20 },
];

const scaleSteps = [1000, 800, 600, 400, 200, 0];

export default function MyPortfolioSection() {
  const [activeProvider, setActiveProvider] = useState("robinhood");
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);
  const data = useMemo(() => chartData[activeProvider], [activeProvider]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-[#FF8600] font-semibold">
            My Portfolio
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-text-h">
            Portfolio performance
          </h2>
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <section className="w-full max-w-[772px] rounded-[32px] border border-neutral-200 bg-white p-6">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#FF8600]">
                Overview
              </p>
              <h3 className="mt-2 text-xl font-semibold text-text-h">
                Portfolio chart
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {providers.map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveProvider(key)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeProvider === key
                    ? "bg-primary text-white"
                    : "bg-[#F6F6F6] text-text-main"
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-neutral-200 bg-[#FCFCFC] p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-3xl font-semibold text-text-h">$248.5K</p>
                  <p className="mt-2 text-sm text-text-main">Total portfolio</p>
                </div>
                <div className="grid h-12 w-12 place-items-center rounded-full bg-[#FFF2D8] text-[#FF8600]">
                  <span className="text-lg font-bold">$</span>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-neutral-200 bg-[#FCFCFC] p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-3xl font-semibold text-text-h">+12.4%</p>
                  <p className="mt-2 text-sm text-text-main">Monthly growth</p>
                </div>
                <div className="grid h-12 w-12 place-items-center rounded-full bg-[#EAF8FF] text-[#0B6B9A]">
                  <span className="text-lg font-bold">↗</span>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-neutral-200 bg-[#FCFCFC] p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-3xl font-semibold text-text-h">82%</p>
                  <p className="mt-2 text-sm text-text-main">
                    Portfolio health
                  </p>
                </div>
                <div className="grid h-12 w-12 place-items-center rounded-full bg-[#EEF9F3] text-[#1C7A5A]">
                  <span className="text-lg font-bold">✓</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-neutral-200 bg-[#FCFCFC] p-6">
            <div className="grid grid-cols-[60px_minmax(0,1fr)] gap-4">
              <div className="flex flex-col justify-between text-xs leading-[1.7] text-text-main">
                {scaleSteps.map((step) => (
                  <span key={step}>{step}</span>
                ))}
              </div>
              <div className="h-[320px] w-full">
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
                      tick={{ fill: "#6B7280" }}
                      tickFormatter={(value) => (typeof value === "string" ? value.toUpperCase() : value)}
                    />
                    <YAxis
                      domain={[0, 1000]}
                      hide={true}
                    />
                    <Tooltip
                      shared={false}
                      content={<CustomTooltip />}
                      cursor={false}
                      isAnimationActive={false}
                      wrapperStyle={{ pointerEvents: "none" }}
                    />
                    <Bar
                      dataKey="actual"
                      name="Actual"
                      barSize={12}
                    >
                      {data.map((entry, index) => (
                        <Cell
                          key={`actual-${index}`}
                          fill={
                            hoveredMonth === entry.month ? "#FFB800" : "#F1F1F2"
                          }
                        />
                      ))}
                    </Bar>
                    <Bar
                      dataKey="benchmark"
                      name="Benchmark"
                      barSize={12}
                    >
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
        </section>

        <aside className="w-[330px] shrink-0 space-y-6">
          <div className="w-[330px] rounded-[32px] border border-neutral-200 bg-white px-5 py-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-text-h">
                Watchlist
              </p>
              <button
                type="button"
                className="text-xs font-semibold text-primary bg-transparent p-0 border-none cursor-pointer hover:underline"
              >
                View all
              </button>
            </div>
            <div className="mt-5 space-y-4">
              <div className="flex items-center h-[96px] justify-between rounded-3xl bg-[#F6F6F6] px-4 w-[290px] flex-shrink-0">
                <div className="flex items-center justify-between w-[96px] flex-shrink-0">
                  <div>
                    <p className="text-base font-bold text-text-h">AAPL</p>
                    <p className="text-sm font-semibold text-text-main mt-0.5">$142.90</p>
                    <p className="text-xs font-semibold text-[#1C7A5A] mt-0.5">+0.47%</p>
                  </div>
                  <span className="text-lg font-semibold text-[#1C7A5A] bg-[#EEF9F3] w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0">
                    ↑
                  </span>
                </div>
                <div style={{ width: 154, height: 64 }} className="flex-shrink-0">
                  <LineChart
                    width={154}
                    height={64}
                    data={aaplData}
                    margin={{ top: 6, right: 5, left: 5, bottom: 6 }}
                  >
                    <ReferenceLine y={50} stroke="#E5E7EB" strokeDasharray="3 3" strokeWidth={1} />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#FF8600"
                      strokeWidth={2}
                      dot={(props: any) => {
                        const { cx, cy, index } = props;
                        if (index === aaplData.length - 1) {
                          return (
                            <g key={`aapl-dot-${index}`}>
                              <circle cx={cx} cy={cy} r={5} fill="#FF8600" fillOpacity={0.2} />
                              <circle cx={cx} cy={cy} r={2.5} fill="#FF8600" />
                            </g>
                          );
                        }
                        return <path key={`aapl-dot-null-${index}`} d="" />;
                      }}
                      activeDot={false}
                    />
                  </LineChart>
                </div>
              </div>
              <div className="flex items-center h-[96px] justify-between rounded-3xl bg-[#F6F6F6] px-4 w-[290px] flex-shrink-0">
                <div className="flex items-center justify-between w-[96px] flex-shrink-0">
                  <div>
                    <p className="text-base font-bold text-text-h">BPL</p>
                    <p className="text-sm font-semibold text-text-main mt-0.5">$142.90</p>
                    <p className="text-xs font-semibold text-[#EA4335] mt-0.5">-0.78%</p>
                  </div>
                  <span className="text-lg font-semibold text-[#EA4335] bg-[#FCE8E6] w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0">
                    ↓
                  </span>
                </div>
                <div style={{ width: 154, height: 64 }} className="flex-shrink-0">
                  <LineChart
                    width={154}
                    height={64}
                    data={bplData}
                    margin={{ top: 6, right: 5, left: 5, bottom: 6 }}
                  >
                    <ReferenceLine y={50} stroke="#E5E7EB" strokeDasharray="3 3" strokeWidth={1} />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#FF8600"
                      strokeWidth={2}
                      dot={(props: any) => {
                        const { cx, cy, index } = props;
                        if (index === bplData.length - 1) {
                          return (
                            <g key={`bpl-dot-${index}`}>
                              <circle cx={cx} cy={cy} r={5} fill="#FF8600" fillOpacity={0.2} />
                              <circle cx={cx} cy={cy} r={2.5} fill="#FF8600" />
                            </g>
                          );
                        }
                        return <path key={`bpl-dot-null-${index}`} d="" />;
                      }}
                      activeDot={false}
                    />
                  </LineChart>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[330px] rounded-[32px] border border-neutral-200 bg-white px-5 py-6">
            <p className="text-sm font-semibold text-text-h">Top holdings</p>
            <ul className="mt-5 space-y-4 text-sm text-text-main">
              <li className="flex items-center justify-between">
                <span>Apple</span>
                <span className="font-semibold">24%</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Tesla</span>
                <span className="font-semibold">18%</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Amazon</span>
                <span className="font-semibold">14%</span>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
