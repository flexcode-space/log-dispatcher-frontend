import { useState } from "react";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { DotsVertical } from "mdi-material-ui";

type MenuRealisasiProps = {
  onChange: (value: "a" | "mw") => void;
};

const MenuRealisasi = ({ onChange }: MenuRealisasiProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickMenu = (value: "a" | "mw") => {
    onChange(value);
    handleClose();
  };

  return (
    <>
      <IconButton
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        size="small"
        aria-label="settings"
        className="card-more-options"
      >
        <DotsVertical />
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
            width: "150px",
            marginTop: "5px",
          },
        }}
      >
        <MenuItem onClick={() => handleClickMenu("a")} sx={{ m: 2 }}>
          <Typography variant="inherit">I (A)</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleClickMenu("mw")} sx={{ m: 2 }}>
          <Typography variant="inherit">MW</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default MenuRealisasi;
