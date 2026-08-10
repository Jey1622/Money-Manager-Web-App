import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded'
import { DRAWER_WIDTH } from './SideBar'

function TopBar() {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      color="transparent"
      sx={{
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        ml: `${DRAWER_WIDTH}px`,
        bgcolor: 'background.paper',
        borderBottom: '1px solid #E5E7EB',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', gap: 2 }}>
        <Box>
          <Typography variant="h6">Money Manager</Typography>
          <Typography variant="body2" color="text.secondary">
            Welcome back, here's what's happening today.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              gap: 1,
              bgcolor: '#F3F4F6',
              borderRadius: 2,
              px: 1.5,
              py: 0.75,
              width: 240,
            }}
          >
            <SearchRoundedIcon fontSize="small" sx={{ color: 'text.secondary' }} />
            <InputBase placeholder="Search…" sx={{ fontSize: 14, width: '100%' }} />
          </Box>

          <IconButton>
            <Badge color="error" variant="dot">
              <NotificationsRoundedIcon />
            </Badge>
          </IconButton>

          <Avatar sx={{ width: 36, height: 36, bgcolor: 'secondary.main' }}>J</Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar