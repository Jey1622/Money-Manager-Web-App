import {
  ListItemText,
  ListItemIcon,
  ListItemButton,
  ListItem,
  List,
  Divider,
  Typography,
  Button,
  Drawer,
  Box,
} from "@mui/material";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import SavingsIcon from "@mui/icons-material/Savings";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../axios";

export const DRAWER_WIDTH = 240;

const navItems = [
  {
    text: "Transaction",
    icon: <AccountBalanceWalletRoundedIcon />,
    path: "/",
    active: true,
  },
  // { text: "Stats", icon: <EqualizerRoundedIcon />,  path: "/stats" },
  { text: "Accounts", icon: <SavingsIcon />, path: "/accounts" },
  { text: "LogOut", icon: <SavingsIcon /> },
];
function SideBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/logout");

      navigate("/login", { replace: true });
    } catch (error) {
      console.log("Logout error:", error);
    }
  };
  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          // width: DRAWER_WIDTH,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            borderRight: "1px solid #E5E7EB",
          },
        }}
      >
        <Box
          sx={{ px: 3, py: 2.5, display: "flex", alignItems: "center", gap: 1 }}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: "8px",
              bgcolor: "primary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>
              N
            </Typography>
          </Box>
          <Typography variant="h6">Nimbus</Typography>
        </Box>
        <Divider />
        <List sx={{ px: 1.5, py: 2 }}>
          {navItems.map((item) => (
            <ListItemButton
              key={item.text}
              onClick={() => {
                if (item.text === "LogOut") {
                  handleLogout();
                } else {
                  navigate(item.path);
                }
              }}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                "&.Mui-selected": {
                  bgcolor: "primary.main",
                  color: "#fff",
                  "& .MuiListItemIcon-root": { color: "#fff" },
                  "&:hover": { bgcolor: "primary.main" },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: "text.secondary" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }}
              />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default SideBar;
