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
import { getPercentageExp } from "../features/api";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Example fetch function – adjust the endpoint to match your backend
const fetchExpenditureData = async () => {
  const response = await fetch("/api/expenditures");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const PercentageExp = () => {
  // Using react query to fetch the data
  const { data, isLoading, isError } = useQuery({
    queryKey: ["precentageExp"],
    queryFn: () => getPercentageExp(),
  });

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (isError)
    return <div className="text-center text-red-500">Error loading data</div>;

  // Process data:
  // 1. Extract all unique months and sort them
  const monthsSet = new Set();
  data.forEach((item: any) => monthsSet.add(item.month));
  const months = Array.from(monthsSet).sort();

  // 2. Group data by user (using user_id) and map month to expenditure
  const users: any = {};
  data.forEach((item: any) => {
    if (!users[item.user_id]) {
      users[item.user_id] = { name: item.name, data: {} };
    }
    // Parse expenditure to a number
    users[item.user_id].data[item.month] = parseFloat(item.total_expenditure);
  });

  // 3. Prepare datasets for the chart; one dataset per user
  const datasets = Object.values(users).map((user: any, index) => {
    const userData = months.map((month: any) => user.data[month] || 0);
    return {
      label: user.name,
      data: userData,
      fill: false,
      // Generate a unique color for each user (you can adjust the color scheme as needed)
      borderColor: `hsl(${index * 50}, 70%, 50%)`,
      tension: 0.1,
    };
  });

  const chartData = {
    labels: months,
    datasets,
  };

  const options: any = {
    maintainAspectRatio: true, // Allow custom sizing
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Expenditure",
      },
    },
  };

  return (
    <div
      className="p-4 bg-white shadow rounded"
      style={{ width: "800px", height: "650px" }}
    >
      <h2 className="text-xl font-semibold mb-4">Monthly Expenditure</h2>
      <div style={{ width: "800px", height: "500px" }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PercentageExp;
