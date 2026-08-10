import SideBar from "../pages/navBar/SideBar";
import { Outlet } from "react-router-dom";
import TopBar from "../pages/navBar/TopBar";
import { Box, Toolbar } from "@mui/material";

const DRAWER_WIDTH = 240;
function DashboardLayout() {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <SideBar />

      {/* Right Side */}
      <Box sx={{ flexGrow: 1, ml: `${DRAWER_WIDTH}px` }}>
        <TopBar />
        <Toolbar />

        <Box sx={{ p: 2 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}

export default DashboardLayout