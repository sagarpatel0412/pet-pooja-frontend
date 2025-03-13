import NextMonthExp from "../../charts/NextMonthExp";
import PercentageExp from "../../charts/PercentageExp";
import SpendingChart from "../../charts/SpendingChart";

function Dashboard() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 shadow rounded">
          <NextMonthExp />
        </div>
        <div className="bg-white p-4 shadow rounded">
          <PercentageExp />
        </div>
        <div className="bg-white p-4 shadow rounded">
          <SpendingChart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
