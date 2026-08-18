import React, { useEffect, useState } from "react";
import api from "../../axios";
import { Box, Typography, Button, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddTransaction from "./AddTransaction";
import DatePicker from "../../components/DatePicker";

function TransactionPage() {
  const [transactions, setTransactions] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const totalIncome = transactions
    .filter((transaction) => transaction.category.type === "Income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalExpense = transactions
    .filter((transaction) => transaction.category.type === "Expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const total = totalIncome - totalExpense;

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  function fetchData() {
    api
      .get("/getAllTransaction", {
        params: {
          month: selectedDate.getMonth() + 1,
          year: selectedDate.getFullYear(),
        },
      })
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

    let weekdayColor = "#777";

    if (weekday === "Sat") {
      weekdayColor = "#2196f3";
    } else if (weekday === "Sun") {
      weekdayColor = "#f44336";
    }

    return {
      day,
      weekday,
      monthYear: `${month}.${year}`,
      weekdayColor,
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
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Date picker  */}
      <DatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      {/* Monthly summary*/}
      <Box
        sx={{
          flexShrink: 0,
          backgroundColor: "#fff",
          borderTop: "1px solid #ddd",
          borderBottom: "1px solid #ddd",

          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          textAlign: "center",
          py: 0.5,
        }}
      >
        {/* Income */}
        <Box>
          <Typography
            sx={{
              fontSize: 14,
              color: "#555",
            }}
          >
            Income
          </Typography>

          <Typography
            sx={{
              fontSize: 18,
              color: "#2196f3",
            }}
          >
            {totalIncome.toFixed(2)}
          </Typography>
        </Box>

        {/* Expenses */}
        <Box>
          <Typography
            sx={{
              fontSize: 14,
              color: "#555",
            }}
          >
            Expenses
          </Typography>

          <Typography
            sx={{
              fontSize: 18,
              color: "#f44336",
            }}
          >
            {totalExpense.toFixed(2)}
          </Typography>
        </Box>

        {/* Total */}
        <Box>
          <Typography
            sx={{
              fontSize: 14,
              color: "#555",
            }}
          >
            Total
          </Typography>

          <Typography
            sx={{
              fontSize: 18,
              color: "#555",
            }}
          >
            {total.toFixed(2)}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          minHeight: 0,
        }}
      >
        {/* Transaction list */}
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
                mb: 1,
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
                      backgroundColor: formattedDate.weekdayColor,
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
                    gridTemplateColumns: "150px 1fr 150px 150px",
                    alignItems: "center",
                    px: 2,
                    py: 1.5,
                  }}
                >
                  {/* Category */}
                  <Typography
                    sx={{
                      color: "#888",
                      fontSize: 16,
                    }}
                  >
                    {transaction.category.emoji}
                    {transaction.category.name}
                  </Typography>

                  {/* Note + Account */}
                  <Box>
                    <Typography>{transaction.note}</Typography>

                    <Typography
                      sx={{
                        color: "#999",
                        fontSize: 14,
                        mt: 0.3,
                      }}
                    >
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
      <Button
        sx={{
          position: "fixed",
          right: 30,
          bottom: 30,

          minWidth: 60,
          width: 60,
          height: 60,

          borderRadius: "50%",
          bgcolor: "primary.main",
          color: "#fff",

          fontSize: 30,

          boxShadow: "0 4px 12px rgba(0,0,0,0.25)",

          zIndex: 1000,

          "&:hover": {
            bgcolor: "primary.main",
          },
        }}
        onClick={() => setOpenDialog(true)}
      >
        <AddIcon />
      </Button>
      <AddTransaction
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        onTransactionAdded={fetchData}
      />
    </Box>
  );
}

export default TransactionPage;
