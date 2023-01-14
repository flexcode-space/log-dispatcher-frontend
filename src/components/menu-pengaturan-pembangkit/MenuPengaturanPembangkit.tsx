import { useState } from "react";
import { IconButton, Menu, MenuItem, Typography, Button } from "@mui/material";
import Arrow from "src/assets/icons/arrow-pembangkit.svg";

import MoreMenuIcon from "src/assets/icons/more-menu-icon.svg";

type MenuMoreProps = {
  onClickKoefisien: () => void;
};

const MenuPengaturanPembangkit = ({ onClickKoefisien }: MenuMoreProps) => {
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
        Pengaturan Pembangkit
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
        <MenuItem onClick={onClickKoefisien} sx={{ m: 2 }}>
          <Typography variant="inherit">Jenis Pembangkit</Typography>
        </MenuItem>
        <MenuItem sx={{ m: 2 }}>
          <Typography variant="inherit">Kategori</Typography>
        </MenuItem>
        <MenuItem sx={{ m: 2 }}>
          <Typography variant="inherit">Bahan Bakar</Typography>
        </MenuItem>
        <MenuItem sx={{ m: 2 }}>
          <Typography variant="inherit">Tipe Pembangkit</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default MenuPengaturanPembangkit;
