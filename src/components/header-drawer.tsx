import { Box, Drawer, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

type HeaderDrawerProps = {
  handleDrawerToggle: () => void;
  mobileOpen: boolean;
  navItems: string[];
  getRouteURL: (item: string) => string;
  onItemClick: (item: string) => void;
};

const drawerWidth = 240;

export const HeaderDrawer = ({
  handleDrawerToggle,
  mobileOpen,
  navItems,
  getRouteURL,
  onItemClick,
}: HeaderDrawerProps) => {
  const t = useTranslations('Routes');

  return (
    <Drawer
      anchor="right"
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: { xs: 'block', sm: 'none' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
    >
      <Box component={'nav'} onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <Typography component="h1" variant="h6" sx={{ my: 2 }}>
          RESTful Client
        </Typography>

        <Divider />

        <List>
          {navItems.map((item) => (
            <ListItem key={item} disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }} onClick={() => onItemClick(item)}>
                <Link href={getRouteURL(item)}>
                  <ListItemText primary={t(item)} />
                </Link>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
