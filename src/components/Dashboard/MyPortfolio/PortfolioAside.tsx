import WatchlistItem from "./WatchlistItem";
import { FaceBookIcon, InstagramIcon, LinkedinIcon } from "../../Common/Icons";
import elonMuskImg from "../../../assets/Images/elon-musk.png";
import russiaNews from "../../../assets/Images/russia-news.png";
import fuelCrisis from "../../../assets/Images/fuel-crisis.png";

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
    <aside className="w-[330px] shrink-0 space-y-4">
      <div className=" flex flex-col gap-4 justify-center w-[330px] rounded-[16px] bg-white p-5">
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-[#3B3B45] leading-[133%]">
            Watchlist
          </p>
          <button
            type="button"
            className="text-xs font-semibold text-primary bg-transparent p-0 border-none cursor-pointer hover:underline"
          >
            View all
          </button>
        </div>
        <div className="flex flex-col gap-3">
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

      <div className="flex flex-col gap-4 w-[330px] rounded-[16px] bg-white p-5">
        <p className="text-xl font-bold text-[#3B3B45] leading-[133%]">
          Revenue
        </p>
        <ul className="flex flex-col gap-3">
          {revenueItems.map((revenueItem) => (
            <li
              key={revenueItem.id}
              className="flex items-center justify-between border border-[#F1F1F1] py-2 px-4 rounded-xl shadow-[4px_5px_58px_0px_rgba(0,0,0,0.08)]"
            >
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-[#3B3B45] text-base leading-[133%]">
                  ${revenueItem.value}
                </span>
                <span className="text-xs text-[#A3A3A6] leading-[137%]">
                  {revenueItem.title}
                </span>
              </div>

              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  backgroundColor: revenueItem.color,
                  height: "48px",
                  width: "48px",
                }}
              >
                {revenueItem.icon}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-4 w-[330px] rounded-[16px] bg-white p-5">
        <p className="text-xl font-bold text-[#3B3B45] leading-[133%]">
          Trending News
        </p>
        <ul className="flex flex-col gap-3">
          {newsItems.map((newsItem) => (
            <li
              key={newsItem.id}
              className="flex items-center gap-2 border border-[#F1F1F1] p-3 rounded-xl shadow-[4px_5px_58px_0px_rgba(0,0,0,0.08)]"
            >
              <img
                src={newsItem.image}
                alt={newsItem.title}
                className="w-12 h-12 rounded-lg"
              />
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-[#3B3B45] text-[0.875rem] leading-[100%]">
                  {newsItem.title}
                </span>
                <span className="text-xs text-[#818187] leading-[140%] font-light line-clamp-1">
                  {newsItem.subtitle}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

const newsItems = [
  {
    id: "1",
    title: "Russia & Ukraine War",
    subtitle:
      "Marketing is evolving. It's changing every day as a result of the war",
    image: russiaNews,
  },
  {
    id: "2",
    title: "Elon Musk bought Twitter",
    subtitle: "Twitter is the most useful social platform as of 2022",
    image: elonMuskImg,
  },
  {
    id: "3",
    title: "Fuel Crisis Everywhere",
    subtitle: "Due to covid situation in 2020 the demand of oil reduced",
    image: fuelCrisis,
  },
];

const revenueItems = [
  {
    id: "1",
    title: "Recently Added Pages",
    value: "4000",
    icon: <FaceBookIcon />,
    color: "#1773EA14",
  },
  {
    id: "2",
    title: "Video Monetization",
    value: "2120",
    icon: <InstagramIcon />,
    color: "#EB334814",
  },
  {
    id: "3",
    title: "Community Buildup",
    value: "1752",
    icon: <LinkedinIcon />,
    color: "#2764AC14",
  },
];
