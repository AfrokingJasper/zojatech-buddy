import { LineChart, Line, ReferenceLine } from "recharts";
import { Arrow } from "../../Common/Icons";

interface WatchlistItemProps {
  symbol: string;
  price: string;
  change: string;
  isPositive: boolean;
  data: { value: number }[];
}

export default function WatchlistItem({
  symbol,
  price,
  change,
  isPositive,
  data,
}: WatchlistItemProps) {
  const color = isPositive ? "#00A441" : "#FF5252";

  return (
    <div className="flex items-center h-[96px] justify-between rounded-3xl bg-[#F6F6F6] px-4 w-[290px] shrink-0">
      <div className="flex flex-col gap-2 w-[96px] shrink-0">
        <div className="flex items-center gap-6 w-full justify-between pr-1">
          <p className="text-base font-semibold leading-[100%] text-[#3B3B45]">
            {symbol}
          </p>
          <Arrow
            className={`w-6 h-6 ${isPositive ? "rotate-180" : ""}`}
            color={color}
            fill={color}
            stroke={color}
          />
        </div>
        <div className="w-[57px]">
          <p className="text-[0.9375rem] font-medium text-[#A3A3A6] mt-0.5 leading-[149%]">
            {price}
          </p>
          <p
            className="text-xs font-medium mt-0.5 leading-[149%]"
            style={{ color: color }}
          >
            {change}
          </p>
        </div>
      </div>
      <div style={{ width: 154, height: 64 }} className="shrink-0">
        <LineChart
          width={154}
          height={64}
          data={data}
          margin={{ top: 6, right: 5, left: 5, bottom: 6 }}
        >
          <ReferenceLine
            y={50}
            stroke="#E5E7EB"
            strokeDasharray="3 3"
            strokeWidth={1}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#FF8600"
            strokeWidth={2}
            dot={(props: any) => {
              const { cx, cy, index } = props;
              if (index === data.length - 1) {
                return (
                  <g key={`${symbol}-dot-${index}`}>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={5}
                      fill="#FF8600"
                      fillOpacity={0.2}
                    />
                    <circle cx={cx} cy={cy} r={2.5} fill="#FF8600" />
                  </g>
                );
              }
              return <path key={`${symbol}-dot-null-${index}`} d="" />;
            }}
            activeDot={false}
          />
        </LineChart>
      </div>
    </div>
  );
}
