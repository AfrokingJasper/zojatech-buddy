import WatchlistItem from "./WatchlistItem";

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

export default function PortfolioAside() {
  return (
    <aside className="w-[330px] shrink-0 space-y-6">
      <div className="w-[330px] rounded-[32px] border border-neutral-200 bg-white px-5 py-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-text-h">Watchlist</p>
          <button
            type="button"
            className="text-xs font-semibold text-primary bg-transparent p-0 border-none cursor-pointer hover:underline"
          >
            View all
          </button>
        </div>
        <div className="mt-5 space-y-4">
          <WatchlistItem
            symbol="AAPL"
            price="$142.90"
            change="+0.47%"
            isPositive={true}
            data={aaplData}
          />
          <WatchlistItem
            symbol="BPL"
            price="$142.90"
            change="-0.78%"
            isPositive={false}
            data={bplData}
          />
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
  );
}
