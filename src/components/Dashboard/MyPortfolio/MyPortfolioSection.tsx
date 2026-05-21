import PortfolioStatCard from "./PortfolioStatCard";
import PortfolioChart from "./PortfolioChart";
import PortfolioAside from "./PortfolioAside";
import { ChannelsIcon, MembersIcon, ImpressionIcon } from "../../Common/Icons";

export default function MyPortfolioSection() {
  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <section className="w-full max-w-[772px]">
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <PortfolioStatCard
            title="Total Channels"
            figure="51"
            icon={<ChannelsIcon />}
            baseColor="#00D5AA"
            lightColor="#E0FAF5"
          />
          <PortfolioStatCard
            title="New Members"
            figure="125"
            icon={<MembersIcon />}
            baseColor="#7B91F7"
            lightColor="#EFF2FE"
          />
          <PortfolioStatCard
            title="All Impressions"
            figure="789"
            icon={<ImpressionIcon />}
            baseColor="#FF8600"
            lightColor="#FFF0E0"
          />
        </div>

        <PortfolioChart />
      </section>

      <PortfolioAside />
    </div>
  );
}
