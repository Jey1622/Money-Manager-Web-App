import { useEffect, useState } from "react";
import api from "../../axios";
import { Box, Card, CardContent, Typography } from "@mui/material";

function AccountDetails() {
  const [totals, setTotals] = useState({
    cashTotal: 0,
    accountTotal: 0,
    cardTotal: 0,
    cardLiability: 0,
    assets: 0,
    total: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    api
      .get("/getAccountDetails")
      .then((response) => {
        const data = response.data;

        setTotals({
          cashTotal: Number(data.cashTotal),
          accountTotal: Number(data.accountTotal),
          cardTotal: Number(data.cardTotal),
          cardLiability: Number(data.cardLiability),
          assets: Number(data.assets),
          total: Number(data.total),
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const getValueColor = (value, isLiability = false) => {
    if (value === 0) {
      return "#000000";
    }

    if (isLiability) {
      return value > 0 ? "#d32f2f" : "#1976d2";
    }

    return value > 0 ? "#1976d2" : "#d32f2f";
  };

  return (
    <Box>
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
        {/* Assets */}
        <Box>
          <Typography
            sx={{
              fontSize: 14,
              color: "#555",
            }}
          >
            Assets
          </Typography>

          <Typography
            sx={{
              fontSize: 18,
              color:
                totals.assets > 0
                  ? "#2196f3"
                  : totals.assets < 0
                    ? "#f44336"
                    : "#555",
            }}
          >
            {totals.assets.toFixed(2)}
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
            liabilities
          </Typography>

          <Typography
            sx={{
              fontSize: 18,
              color:
                totals.cardLiability > 0
                  ? "#f44336"
                  : totals.cardLiability < 0
                    ? "#2196f3"
                    : "#555",
            }}
          >
            {totals.cardLiability.toFixed(2)}
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
            {totals.total.toFixed(2)}
          </Typography>
        </Box>
      </Box>
      {/* account details  */}
      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 2,
          p: 2,
        }}
      >
        {/* Cash */}
        <Card
          variant="outlined"
          sx={{
            backgroundColor: "#e3f2fd",
            borderRadius: 2,
            borderColor: "#90caf9",
            textAlign: "center",
          }}
        >
          <CardContent>
            <Typography
              sx={{
                color: "#555",
                fontSize: 15,
                fontWeight: 500,
              }}
            >
              Cash
            </Typography>

            <Typography
              sx={{
                fontSize: 22,
                fontWeight: 600,
                color: getValueColor(totals.cashTotal),
                mt: 1,
              }}
            >
              ₹ {Math.abs(totals.cashTotal.toFixed(2))}
            </Typography>
          </CardContent>
        </Card>

        {/* Account */}
        <Card
          variant="outlined"
          sx={{
            backgroundColor: "#e8f5e9",
            borderRadius: 2,
            borderColor: "#a5d6a7",
            textAlign: "center",
          }}
        >
          <CardContent>
            <Typography
              sx={{
                color: "#555",
                fontSize: 15,
                fontWeight: 500,
              }}
            >
              Account
            </Typography>

            <Typography
              sx={{
                fontSize: 22,
                fontWeight: 600,
                color: getValueColor(totals.accountTotal),
                mt: 1,
              }}
            >
              ₹ {Math.abs(totals.accountTotal.toFixed(2))}
            </Typography>
          </CardContent>
        </Card>

        {/* Card */}
        <Card
          variant="outlined"
          sx={{
            backgroundColor: "#ffebee",
            borderRadius: 2,
            borderColor: "#ef9a9a",
            textAlign: "center",
          }}
        >
          <CardContent>
            <Typography
              sx={{
                color: "#555",
                fontSize: 15,
                fontWeight: 500,
              }}
            >
              Card
            </Typography>

            <Typography
              sx={{
                fontSize: 22,
                fontWeight: 600,
                color: getValueColor(totals.cardLiability, true),
                mt: 1,
              }}
            >
              ₹ {Math.abs(totals.cardLiability.toFixed(2))}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box>
        
      </Box>
    </Box>
  );
}

export default AccountDetails;
