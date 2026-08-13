import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import HomeIcon from "@mui/icons-material/Home";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import PeopleIcon from "@mui/icons-material/People";
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import EqualizerRoundedIcon from '@mui/icons-material/EqualizerRounded';
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export const DRAWER_WIDTH = 240;

const navItems = [
    { text: "Transaction", icon: <AccountBalanceWalletRoundedIcon />,  path: "/" ,active: true},
    { text: "Stats", icon: <EqualizerRoundedIcon />,  path: "/stats" },
    // { text: "Logout", icon: <LogoutIcon />, call: () => setOpen(true) },    
    // { text: 'Orders', icon: <ReceiptLongRoundedIcon /> },
    // { text: 'Settings', icon: <SettingsRoundedIcon /> },
  ];
function SideBar() {
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
              onClick={item.call}
              key={item.text}
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
  )
}

export default SideBar