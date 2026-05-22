import PortfolioStatCard from "./PortfolioStatCard";
import PortfolioChart from "./PortfolioChart";
import PortfolioAside from "./PortfolioAside";
import {
  ChannelsIcon,
  MembersIcon,
  ImpressionIcon,
  ShareIcon,
  CommentIcon,
} from "../../Common/Icons";
import wandaImg from "../../../assets/Images/wanda.png";
import terryImg from "../../../assets/Images/terry-1.png";
import terryImg2 from "../../../assets/Images/terry-2.png";
import lucasImg from "../../../assets/Images/lucas.png";
import janiceImg from "../../../assets/Images/janice.png";

export default function MyPortfolioSection() {
  return (
    <div className="flex flex-col gap-6 lg:flex-row  justify-between">
      <section className="flex flex-col gap-4 w-full max-w-[772px] mx-auto">
        <div className="grid gap-4 sm:grid-cols-3">
          <PortfolioStatCard
            title="Total Channels"
            figure="51"
            icon={<ChannelsIcon className="w-4 h-4 xl:w-5 xl:h-5" />}
            baseColor="#00D5AA"
            lightColor="#E0FAF5"
          />
          <PortfolioStatCard
            title="New Members"
            figure="125"
            icon={<MembersIcon className="w-4 h-4 xl:w-5 xl:h-5" />}
            baseColor="#7B91F7"
            lightColor="#EFF2FE"
          />
          <PortfolioStatCard
            title="All Impressions"
            figure="789"
            icon={<ImpressionIcon className="w-4 h-4 xl:w-5 xl:h-5" />}
            baseColor="#FF8600"
            lightColor="#FFF0E0"
          />
        </div>

        <PortfolioChart />

        <div className="flex flex-col gap-5 rounded-[16px] bg-white p-6">
          <p className="text-xl font-bold leading-[133%] text-[#3B3B45]">
            Trending posts
          </p>
          <ul className="grid grid-cols-2 justify-between gap-4">
            {trendingPosts.map((post) => (
              <li
                key={post.id}
                className="flex flex-col gap-5 border border-[#F1F1F1] rounded-xl p-4"
              >
                <div className="flex flex-col gap-2">
                  <p className="text-base font-semibold leading-[140%] text-[#3B3B45]">
                    {post.title}
                  </p>
                  <p className="text-[0.875rem] font-light leading-[140%] text-[#818187] line-clamp-2">
                    {post.content}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-1 rounded-[17px] bg-[#F6F6F6] py-1 px-2.5">
                    <span>❤️</span>
                    <span className="text-[#3B3B45] text-xs font-normal leading-[149%]">
                      {post.likes}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 rounded-[17px] bg-[#F6F6F6] py-1 p-2.5">
                    <CommentIcon />
                    <span className="text-[#3B3B45] text-xs font-normal leading-[149%]">
                      {post.comments}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 rounded-[17px] bg-[#F6F6F6] py-1 p-2.5">
                    <ShareIcon />
                    <span className="text-[#3B3B45] text-xs font-normal leading-[149%]">
                      {post.shares}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-5 rounded-[16px] bg-white p-6">
          <p className="text-xl font-bold leading-[133%] text-[#3B3B45]">
            Trending posts
          </p>

          <ul className="grid grid-cols-3 xl:grid-cols-5 gap-2">
            {potentialMembers.map((member) => (
              <li
                key={member.id}
                className="flex flex-col items-center gap-2 border border-[#F1F1F1] rounded-xl py-3 px-4"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex flex-col items-center gap-1">
                  <p className="text-[#3B3B45] font-semibold leading-[100%]">
                    {member.name}
                  </p>
                  <p className="text-[0.6875rem] text-[#818187] leading-[100%]">
                    {member.username}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    style={{
                      color: "#35DB95",
                    }}
                  >
                    <ImpressionIcon className="h-5 w-5" />
                  </div>
                  <p className="font-bold text-[1rem] text-[#3B3B45] leading-[100%]">
                    {member.rating}%
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PortfolioAside />
    </div>
  );
}

const trendingPosts = [
  {
    id: "1",
    title: "8 Upcoming Influencer Marketing Trends and Benefits",
    content:
      "Marketing is evolving. It's changing from a one-way street to a two-way conversation lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    likes: 260,
    comments: 234,
    shares: 123,
  },
  {
    id: "2",
    title: "How Influencer Marketing Affects Consumer Buying Behavior",
    content:
      "As influencer marketing continues to grow, consumers have been turning to their favorite social media stars for recommendations",
    likes: 260,
    comments: 234,
    shares: 123,
  },
];

const potentialMembers = [
  {
    id: "1",
    name: "Wanda Parker",
    username: "@ashking1234",
    rating: 10.3,
    image: wandaImg,
  },
  {
    id: "2",
    name: "Terry Brown",
    username: "@ashking1234",
    rating: 9.8,
    image: terryImg,
  },
  {
    id: "3",
    name: "Lucas Holmes",
    username: "@ashking1234",
    rating: 6.5,
    image: lucasImg,
  },
  {
    id: "4",
    name: "Janice Miller",
    username: "@ashking1234",
    rating: 8.6,
    image: janiceImg,
  },
  {
    id: "5",
    name: "Terry Brown",
    username: "@ashking1234",
    rating: 9.8,
    image: terryImg2,
  },
];
