import { useQuery } from "@tanstack/react-query";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getTopSpendingExp } from "../features/api";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SpendingChart = () => {
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["topSpends"],
    queryFn: () => getTopSpendingExp(),
  });

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (isError)
    return <div className="text-center text-red-500">Error loading data</div>;

  const labels = data.map((item: any) =>
    moment(item.date).format("YYYY-MM-DD")
  );

  const totalSpentData = data?.map((item: any) => parseFloat(item.total_spent));

  const chartData = {
    labels,
    datasets: [
      {
        label: "Total Spent",
        data: totalSpentData,
        fill: false,
        borderColor: "blue",
        tension: 0.1,
      },
    ],
  };

  const options: any = {
    maintainAspectRatio: false, // Allow the chart to use container dimensions
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Spending Over Time",
      },
    },
  };

  return (
    <div
      className="p-4 bg-white shadow rounded"
      style={{ width: "800px", height: "650px" }}
    >
      <h2 className="text-xl font-semibold mb-4">Spending Chart</h2>
      <div style={{ width: "800px", height: "500px" }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default SpendingChart;
