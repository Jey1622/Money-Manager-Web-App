import { Box, Typography, Button, Paper, Dialog } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function DatePicker({selectedDate, setSelectedDate}) {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [selectedYear, setSelectedYear] = useState( selectedDate.getFullYear());

  const formatMonthYear = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  return (
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
                  color: selectedDate.getMonth() === index ? "#ff6347" : "#333",
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
  );
}

export default DatePicker;
