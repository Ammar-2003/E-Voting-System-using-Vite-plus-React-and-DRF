import { useState, useEffect } from "react";
import { FaUsers, FaUserCheck, FaVoteYea, FaTrophy } from "react-icons/fa";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Spinner,
} from "@material-tailwind/react";

// Single Statistic Card Component
const StatisticCard = ({ icon, title, value, footer }) => {
  return (
    <Card className="border border-gray-300 rounded-lg shadow-md bg-white w-67 h-35 flex flex-col justify-between p-4">
      <div className="flex justify-between items-center">
        {/* Title at Top Right */}
        <p className="text-sm font-semibold text-gray-600">{title}</p>
        {/* Icon with Black Background */}
        <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-lg text-xl">
          {icon}
        </div>
      </div>

      {/* Value Below Title (Normal Text) */}
      <p className="text-lg text-gray-700 -mt-2">{value}</p>

      {/* Footer */}
      {footer && (
        <CardFooter className="border-t border-gray-200 pt-2 text-xs text-gray-600 mt-4">
          <strong className={`${footer.color} font-semibold`}>
            {footer.value}
          </strong>{" "}
          {footer.label}
        </CardFooter>
      )}
    </Card>
  );
};

// Main StatisticsCards Component
export function StatisticsCards() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/dashboard")
      .then((response) => response.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching stats:", error);
        setLoading(false);
      });
  }, []);

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Spinner className="h-10 w-10 text-blue-500" />
        <p className="ml-3 text-gray-500">Loading stats...</p>
      </div>
    );
  }

  // Stats Data
  const statisticsCardsData = [
    {
      icon: <FaUsers />,
      title: "Total Users",
      value: stats.total_users,
      footer: { value: "Users", color: "text-blue-500", label: "in system" },
    },
    {
      icon: <FaVoteYea />,
      title: "Total Votes",
      value: stats.total_votes,
      footer: { value: "Votes", color: "text-yellow-500", label: "submitted" },
    },
    {
      icon: <FaUserCheck />,
      title: "Most Voted",
      value: stats.most_voted_option,
      footer: {
        value: "Active",
        color: "text-green-500",
        label: "currently online",
      },
    },
    {
      icon: <FaTrophy />,
      title: "Most Votes",
      value: stats.most_voted_count,
      footer: { value: "Top", color: "text-red-500", label: "choice" },
    },
  ];

  return (
    <div className="p-6 flex justify-end">
      {" "}
      {/* Shift cards to the right */}
      <div className="flex gap-3">
        {" "}
        {/* Align cards in a row */}
        {statisticsCardsData.map((stat, index) => (
          <StatisticCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
}

export default StatisticsCards;
