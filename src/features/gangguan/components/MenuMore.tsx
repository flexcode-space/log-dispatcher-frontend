import { useState } from "react";
import { useRouter } from "next/router";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
  Link,
} from "@mui/material";
import { openModal } from "src/state/modal";
import MoreMenuIcon from "src/assets/icons/more-menu-icon.svg";
import LihatKeteranganIcon from "src/assets/icons/lihat-keterangan-icon.svg";
import TambahManuverIcon from "src/assets/icons/tambah-manuver-icon.svg";
import DataPadamIcon from "src/assets/icons/data-padam-icon.svg";
import FilePendukungIcon from "src/assets/icons/file-pendukung-icon.svg";
import HapusIcon from "src/assets/icons/hapus-icon.svg";
import { selectData, setGangguanID } from "../state/gangguan";
import { GangguanList } from "../types";

type MenuMoreProps = {
  data: GangguanList;
};

const MenuMore = ({ data }: MenuMoreProps) => {
  const router = useRouter();
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
            width: "316px",
          },
        }}
      >
        <MenuItem
          onClick={() => {
            openModal("modal-keterangan-gangguan");
            selectData(data);
          }}
        >
          <ListItemIcon>
            <IconButton>
              <LihatKeteranganIcon />
            </IconButton>
          </ListItemIcon>
          <Typography variant="inherit">Lihat Keterangan</Typography>
        </MenuItem>
        <MenuItem onClick={() => router.push(`/gangguan/manuver/${data.id}`)}>
          <IconButton>
            <TambahManuverIcon />
          </IconButton>
          <Typography variant="inherit">Tambah Manuver</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            openModal("modal-data-padam");
            setGangguanID(data.id);
          }}
        >
          <IconButton>
            <DataPadamIcon />
          </IconButton>
          <Typography variant="inherit">Data Padam</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            openModal("modal-gangguan-file-pendukung");
            selectData(data);
          }}
        >
          <IconButton>
            <FilePendukungIcon />
          </IconButton>
          <Typography variant="inherit">File Pendukung</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            openModal("modal-confirmation-delete");
            selectData(data);
          }}
        >
          <IconButton>
            <HapusIcon />
          </IconButton>
          <Typography variant="inherit">Hapus</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default MenuMore;
