import { useState } from "react";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MoreMenuIcon from "src/assets/icons/more-menu-icon.svg";

const MenuMore = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    console.log("klik ini");
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreMenuIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: "181px",
          },
        }}
      >
        <MenuItem>
          <Typography variant="inherit" fontWeight={600}>
            Lainnya
          </Typography>
        </MenuItem>
        <MenuItem>
          <Typography variant="inherit">1x Koefisien</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default MenuMore;
