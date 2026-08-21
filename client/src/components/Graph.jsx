import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../axios";
import DatePicker from "./DatePicker";

function Graph() {
  const [chartData, setChartData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const data = [
    {
      month: "Nov",
      income: 15247,
      expense: 9459,
    },
    {
      month: "Dec",
      income: 36430,
      expense: 16369,
    },
    {
      month: "Jan",
      income: 40309,
      expense: 39661,
    },
    {
      month: "Feb",
      income: 31400,
      expense: 31683,
    },
    {
      month: "Mar",
      income: 28400,
      expense: 24086,
    },
    {
      month: "Apr",
      income: 29788,
      expense: 32864,
    },
  ];
  const formatValue = (value) => {
    return `₹${Number(value).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };
  useEffect(() => {
    api
      .get("/getGraphDetails", {
        params: {
          month: selectedDate.getMonth() + 1,
          year: selectedDate.getFullYear(),
        },
      })
      .then((response) => {
        setChartData(response.data.result);
        console.log(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedDate]);

  return (
    <Box>
      <DatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      {/* line chart  */}
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Monthly Balance
        </Typography>

        <Box sx={{ width: "100%", height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="month"
                tickFormatter={(value) => {
                  const date = new Date(`${value}-01`);

                  return date.toLocaleDateString("en-US", {
                    month: "short",
                  });
                }}
              />

              <YAxis
                dataKey="balance"
                tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
              />

              <Tooltip
                labelFormatter={(value) => {
                  const date = new Date(`${value}-01`);

                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  });
                }}
                formatter={(value) => [
                  `₹ ${Number(value).toFixed(2)}`,
                  "Balance",
                ]}
              />

              <Line
                type="monotone"
                dataKey="balance"
                stroke="#1976d2"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>

      {/* bar chart  */}
      <Box>
        <ResponsiveContainer width="100%" height={450}>
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 20,
              left: 20,
              bottom: 20,
            }}
            barGap={8}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="month"
              tickFormatter={(value) => {
                const date = new Date(`${value}-01`);

                return date.toLocaleDateString("en-US", {
                  month: "short",
                });
              }}
            />

            <YAxis
              tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
            />

            <Tooltip
              labelFormatter={(value) => {
                const date = new Date(`${value}-01`);

                return date.toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                });
              }}
              formatter={(value, name) => {
                let label = "";

                if (name === "income") {
                  label = "Income";
                } else if (name === "expense") {
                  label = "Expenses";
                }

                return [
                  `₹${Number(value).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`,
                  label,
                ];
              }}
            />

            <Legend
              formatter={(value) => {
                if (value === "income") return "Income";
                if (value === "expense") return "Expenses";
                return value;
              }}
            />

            <Bar
              dataKey="income"
              name="income"
              fill="#42a5f5"
              radius={[3, 3, 0, 0]}
            />

            <Bar
               dataKey="expense"
              name="expense"
              fill="#ff7043"
              radius={[3, 3, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}

export default Graph;
