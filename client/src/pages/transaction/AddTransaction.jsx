import React, { useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  MenuItem,
  FormControl,
  Select,
  TextField,
  Typography,
  InputLabel,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import SyncIcon from "@mui/icons-material/Sync";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { useState } from "react";
import api from "../../axios";

function AddTransaction({ open, handleClose, onTransactionAdded }) {
  const [categoryType, setCategoryType] = useState("Expense");
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    amount: "",
    category: "",
    account: "",
    note: "",
    desc: "",
  });

  

  useEffect(() => {
    if (open) {
      fetchCategories(categoryType);
    }
  }, [open, categoryType]);

  function fetchCategories(categoryType) {
    api
      .get("/getCategories", {
        params: {
          type: categoryType,
        },
      })
      .then((res) => {
        setCategories(res.data.categories);
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addTransaction = async () => {
    const now = new Date();

    const data = {
      date: now,
      amount: formData.amount,
      category: formData.category,
      account: formData.account,
      note: formData.note,
      desc: formData.desc,
    };

    console.log(data);

    try {
      const response = await api.post("/addTransaction", data);

      console.log(response.data);
      onTransactionAdded();
      setFormData({
        date: "",
        amount: "",
        category: "",
        account: "",
        note: "",
        desc: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const now = new Date();
  const currentDate = now.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    weekday: "short",
  });

  const currentTime = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "8px",
          margin: 2,
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        {/* Header */}
        <Box
          sx={{
            height: 55,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            borderBottom: "1px solid #eee",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton onClick={handleClose} size="small">
              <CloseIcon />
            </IconButton>

            <Typography
              sx={{
                fontSize: 20,
                fontWeight: 500,
              }}
            >
              Expense
            </Typography>
          </Box>

          <IconButton>
            <StarBorderIcon />
          </IconButton>
        </Box>

        {/* Income / Expense / Transfer */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 1,
            px: 2,
            py: 1.5,
          }}
        >
          {/* Income  */}
          <Button
            variant="outlined"
            onClick={() => setCategoryType("Income")}
            sx={{
              color: categoryType === "Income" ? "#2196f3" : "#888",
              borderColor: categoryType === "Income" ? "#2196f3" : "#ddd",
              textTransform: "none",
              fontSize: 16,
              fontWeight: categoryType === "Income" ? 600 : 400,
              height: 38,
            }}
          >
            Income
          </Button>

          <Button
            variant="outlined"
            onClick={() => setCategoryType("Expense")}
            sx={{
              color: categoryType === "Expense" ? "#ff6347" : "#888",
              borderColor: categoryType === "Expense" ? "#ff6347" : "#ddd",
              textTransform: "none",
              fontSize: 16,
              fontWeight: categoryType === "Expense" ? 600 : 400,
              height: 38,
            }}
          >
            Expense
          </Button>

          <Button
            variant="outlined"
            onClick={() => setCategoryType("Transfer")}
            sx={{
              color: categoryType === "Transfer" ? "#4caf50" : "#888",
              borderColor: categoryType === "Transfer" ? "#4caf50" : "#ddd",
              textTransform: "none",
              fontSize: 16,
              fontWeight: categoryType === "Transfer" ? 600 : 400,
              height: 38,
            }}
          >
            Transfer
          </Button>
        </Box>

        {/* Date */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            px: 2,
            py: 1.5,
          }}
        >
          <Typography
            sx={{
              width: 70,
              color: "#888",
              fontSize: 16,
            }}
          >
            Date
          </Typography>

          <Typography sx={{ fontSize: 16 }}>{currentDate}</Typography>

          <Typography
            sx={{
              fontSize: 17,
              fontWeight: 500,
              ml: 2,
            }}
          >
            {currentTime}
          </Typography>
        </Box>

        {/* Amount */}
        <Box sx={{ px: 2 }}>
          <TextField
            fullWidth
            variant="standard"
            label="Amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
          />
        </Box>

        {/* Category */}
        <Box sx={{ px: 2, mt: 2 }}>
          <FormControl fullWidth variant="standard">
            <InputLabel>Category</InputLabel>

            <Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              label="Category"
              sx={{
                height: 38,
              }}
            >
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.emoji}
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {/* Account */}
        <Box sx={{ px: 2, mt: 2 }}>
          <FormControl fullWidth variant="standard">
            <InputLabel>Account</InputLabel>

            <Select
              name="account"
              value={formData.account}
              onChange={handleChange}
              label="Account"
            >
              <MenuItem value="Cash">Cash</MenuItem>
              <MenuItem value="Account">Account</MenuItem>
              <MenuItem value="Card">Card</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {/* Note */}
        <Box sx={{ px: 2, mt: 2 }}>
          <TextField
            fullWidth
            variant="standard"
            label="Note"
            name="note"
            value={formData.note}
            onChange={handleChange}
          />
        </Box>

        {/* Description section */}
        <Box
          sx={{
            borderTop: "10px solid #f7f7f7",
            px: 2,
            pt: 2,
          }}
        >
          <TextField
            fullWidth
            multiline
            minRows={3}
            variant="standard"
            label="Description"
            name="desc"
            value={formData.desc}
            onChange={handleChange}
          />
        </Box>

        {/* Bottom buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            px: 2,
            py: 2,
          }}
        >
          <Button
            fullWidth
            variant="contained"
            sx={{
              height: 46,
              backgroundColor: "#ff6347",
              color: "#fff",
              borderRadius: "8px",
              textTransform: "none",
              fontSize: 16,
              boxShadow: "none",

              "&:hover": {
                backgroundColor: "#ff6347",
                boxShadow: "none",
              },
            }}
            onClick={() => {
              addTransaction();
              handleClose();
            }}
          >
            Save
          </Button>

          <Button
            variant="outlined"
            sx={{
              width: 100,
              height: 46,
              color: "#333",
              borderColor: "#aaa",
              borderRadius: "8px",
              textTransform: "none",
              fontSize: 16,
            }}
            onClick={() => {
              addTransaction();
            }}
          >
            Continue
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default AddTransaction;
