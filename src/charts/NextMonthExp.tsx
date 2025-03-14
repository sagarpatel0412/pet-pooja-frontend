import { useQuery } from "@tanstack/react-query";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getNextMonthExp } from "../features/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function NextMonthExp() {
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["nextMonthExp"],
    queryFn: () => getNextMonthExp(),
  });

  if (isLoading) return <div className="text-center py-4">Loading...</div>;
  if (isError)
    return (
      <div className="text-center py-4 text-red-500">Error loading data.</div>
    );

  const labels = data.data.map((item: any) => item.name);
  const expenditures = data.data.map((item: any) =>
    parseFloat(item.predicted_next_month_expenditure)
  );
  const chartData = {
    labels,
    datasets: [
      {
        label: "Predicted Expenditure ($)",
        data: expenditures,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Predicted Next Month Expenditure",
      },
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div
      className="p-4 bg-white rounded shadow"
      style={{ width: "800px", height: "650px" }}
    >
      <h2 className="text-xl font-semibold mb-4">
        Predicted Next Month Expenditure
      </h2>
      <div style={{ width: "800px", height: "500px" }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}

export default NextMonthExp;
