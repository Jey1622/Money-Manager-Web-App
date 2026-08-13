import React, { useEffect, useState } from "react";
import api from "../../axios";
import { Box, Typography, Paper } from "@mui/material";

function TransactionPage() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    api
      .get("/getAllTransaction")
      .then((response) => {
        setTransactions(response.data.transaction);
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate();

    const weekday = date.toLocaleDateString("en-US", {
      weekday: "short",
    });

    const month = String(date.getMonth() + 1).padStart(2, "0");

    const year = date.getFullYear();

    return {
      day,
      weekday,
      monthYear: `${month}.${year}`,
    };
  };

  // Group transactions by date
  const groupedTransactions = transactions.reduce((groups, transaction) => {
    const date = transaction.date.split("T")[0];

    if (!groups[date]) {
      groups[date] = [];
    }

    groups[date].push(transaction);

    return groups;
  }, {});
  return (
    <Box>
      {Object.entries(groupedTransactions).map(([date, transactions]) => {
        const income = transactions
          .filter((transaction) => transaction.category.type === "Income")
          .reduce((total, transaction) => total + transaction.amount, 0);

        const expense = transactions
          .filter((transaction) => transaction.category.type === "Expense")
          .reduce((total, transaction) => total + transaction.amount, 0);
        const formattedDate = formatDate(transactions[0].date);
        return (
          <Paper
            key={date}
            elevation={0}
            sx={{
              borderBottom: "1px solid #ddd",
              borderRadius: 0,
            }}
          >
            {/* Date Header */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "180px 1fr 150px 150px",
                alignItems: "center",
                px: 2,
                py: 1.5,
                bgcolor: "#fafafa",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                {/* Day */}
                <Typography
                  sx={{
                    fontSize: 28,
                    fontWeight: 600,
                    lineHeight: 1,
                  }}
                >
                  {formattedDate.day}
                </Typography>

                {/* Weekday */}
                <Box
                  sx={{
                    backgroundColor: "#777",
                    color: "#fff",
                    borderRadius: "3px",
                    px: 0.7,
                    py: 0.3,
                    fontSize: 12,
                    fontWeight: 500,
                  }}
                >
                  {formattedDate.weekday}
                </Box>

                {/* Month / Year */}
                <Typography
                  sx={{
                    color: "#999",
                    fontSize: 14,
                  }}
                >
                  {formattedDate.monthYear}
                </Typography>
              </Box>

              <Box />

              <Typography
                sx={{
                  textAlign: "right",
                  color: "#2196f3",
                }}
              >
                ₹ {income.toFixed(2)}
              </Typography>

              <Typography
                sx={{
                  textAlign: "right",
                  color: "#f44336",
                }}
              >
                ₹ {expense.toFixed(2)}
              </Typography>
            </Box>

            {/* Transactions */}
            {transactions.map((transaction) => (
              <Box
                key={transaction._id}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "120px 1fr 150px 150px",
                  alignItems: "center",
                  px: 2,
                  py: 1.5,
                }}
              >
                {/* Category */}
                <Typography color="text.secondary">
                  {transaction.category.name}
                </Typography>

                {/* Note + Account */}
                <Box>
                  <Typography>{transaction.note}</Typography>

                  <Typography variant="body2" color="text.secondary">
                    {transaction.account}
                  </Typography>
                </Box>

                {/* Income */}
                <Typography
                  sx={{
                    textAlign: "right",
                    color: "#2196f3",
                  }}
                >
                  {transaction.category.type === "Income"
                    ? `₹ ${transaction.amount.toFixed(2)}`
                    : ""}
                </Typography>

                {/* Expense */}
                <Typography
                  sx={{
                    textAlign: "right",
                    color: "#f44336",
                  }}
                >
                  {transaction.category.type === "Expense"
                    ? `₹ ${transaction.amount.toFixed(2)}`
                    : ""}
                </Typography>
              </Box>
            ))}
          </Paper>
        );
      })}
    </Box>
  );
}

export default TransactionPage;
