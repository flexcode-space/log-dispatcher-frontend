import { useState } from "react";
import { IconButton, Menu, MenuItem, Typography, Button } from "@mui/material";
import Arrow from "src/assets/icons/arrow-pembangkit.svg";
import { openModal } from "src/state/modal";

const MenuPengaturanGangguan = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ mb: 2, height: "45px" }}
        variant="outlined"
      >
        Pengaturan Gangguan
        <IconButton>
          <IconButton>
            <Arrow />
          </IconButton>
        </IconButton>
      </Button>
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
            width: "290px",
            marginTop: "5px",
          },
        }}
      >
        <MenuItem
          onClick={() => openModal("modal-rele-announciator")}
          sx={{ m: 2 }}
        >
          <Typography variant="inherit">Rele Announciator</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => openModal("modal-jenis-gangguan")}
          sx={{ m: 2 }}
        >
          <Typography variant="inherit">Jenis Gangguan</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default MenuPengaturanGangguan;
