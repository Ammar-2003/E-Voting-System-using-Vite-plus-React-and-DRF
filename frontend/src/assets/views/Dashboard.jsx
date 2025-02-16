import StatisticsCards from "../card/statisticscard";
export function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

      {/* Render Statistics Cards Below Navbar */}
      <StatisticsCards />

      {/* You can add more components here later */}
    </div>
  );
}

export default Dashboard;
