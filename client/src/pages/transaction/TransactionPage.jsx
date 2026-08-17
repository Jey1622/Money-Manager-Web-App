import React, { useEffect, useState } from "react";
import api from "../../axios";
import { Box, Typography, Button, Paper, Dialog } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddTransaction from "./AddTransaction";

function TransactionPage() {
  const [transactions, setTransactions] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const formatMonthYear = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };
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
    <Box>
      {/* Date picker  */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "left",
          gap: 2,
          py: 1.5,
          position: "sticky",
          top: 0,
          backgroundColor: "#ffffff",
          zIndex: 10,
          height: 20,
          width: 2 / 5,
        }}
      >
        <Button
          sx={{
            minWidth: 20,
            width: 20,
            color: "#333",
            fontSize: 22,
            fontWeight: 300,
            textAlign: "center",
          }}
          onClick={() => {
            setSelectedDate((prev) => {
              const date = new Date(prev);
              date.setMonth(date.getMonth() - 1);
              return date;
            });
          }}
        >
          ‹
        </Button>

        <Typography
          sx={{
            fontSize: 15,
            fontWeight: 500,
            minWidth: 80,
            textAlign: "center",
            cursor: "pointer",
          }}
          onClick={() => setOpenDatePicker(true)}
        >
          {formatMonthYear(selectedDate)}
        </Typography>

        <Button
          sx={{
            minWidth: 20,
            width: 20,
            color: "#333",
            fontSize: 22,
            fontWeight: 300,
          }}
          onClick={() => {
            setSelectedDate((prev) => {
              const date = new Date(prev);
              date.setMonth(date.getMonth() + 1);
              return date;
            });
          }}
        >
          ›
        </Button>
        {/* Date Picker Popup  */}
        <Dialog
          open={openDatePicker}
          onClose={() => setOpenDatePicker(false)}
          PaperProps={{
            sx: {
              width: 450,
              maxWidth: "90%",
              borderRadius: 3,
            },
          }}
        >
          <Box
            sx={{
              bgcolor: "#454d7c",
              color: "#fff",
              px: 2,
              py: 1.5,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>Date</Typography>

            <Typography
              sx={{
                cursor: "pointer",
              }}
              onClick={() => {
                setSelectedDate(new Date());
                setOpenDatePicker(false);
              }}
            >
              THIS MONTH
            </Typography>

            <Typography
              sx={{
                cursor: "pointer",
                fontSize: 24,
              }}
              onClick={() => setOpenDatePicker(false)}
            >
              ×
            </Typography>
          </Box>

          <Box sx={{ p: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              {/* Previous Year */}
              <Button
                onClick={() => setSelectedYear((prev) => prev - 1)}
                sx={{
                  minWidth: 40,
                  fontSize: 24,
                  color: "#333",
                }}
              >
                ‹
              </Button>

              {/* Year */}
              <Typography
                sx={{
                  fontSize: 20,
                  fontWeight: 500,
                }}
              >
                {selectedYear}
              </Typography>

              {/* Next Year */}
              <Button
                onClick={() => setSelectedYear((prev) => prev + 1)}
                sx={{
                  minWidth: 40,
                  fontSize: 24,
                  color: "#333",
                }}
              >
                ›
              </Button>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 2,
              }}
            >
              {[
                "JAN",
                "FEB",
                "MAR",
                "APR",
                "MAY",
                "JUN",
                "JUL",
                "AUG",
                "SEP",
                "OCT",
                "NOV",
                "DEC",
              ].map((month, index) => (
                <Button
                  key={month}
                  onClick={() => {
                    setSelectedDate((prev) => {
                      const date = new Date(prev);

                      date.setFullYear(selectedYear);
                      date.setMonth(index);

                      return date;
                    });

                    setOpenDatePicker(false);
                  }}
                  sx={{
                    color:
                      selectedDate.getMonth() === index ? "#ff6347" : "#333",
                    fontSize: 15,
                  }}
                >
                  {month}
                </Button>
              ))}
            </Box>
          </Box>
        </Dialog>
      </Box>
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
                  gridTemplateColumns: "120px 1fr 150px 150px",
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
