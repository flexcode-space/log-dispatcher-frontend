import { useState } from "react";
import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import DatePickerMui from "@mui/lab/DatePicker";
import SelectDateIcon from "src/assets/icons/select-date-icon.svg";
import CloseIcon from "src/assets/icons/close-icon.svg";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import dayjs, { Dayjs } from "dayjs";

const MenuGrafikDistribusi = () => {
  const [dateList, setDateList] = useState<string[]>([]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectDate = (value: Dayjs | null) => {
    const date = dayjs(value).format("YYYY-MM-DD");
    setDateList((prevState) => {
      if (!prevState.includes(date)) {
        return [...prevState, date];
      } else {
        return [...prevState];
      }
    });
  };

  const removeSelectDate = (value: string) => {
    const index = dateList.indexOf(value);
    const newDateList = [...dateList];
    newDateList.splice(index, 1);
    setDateList(newDateList);
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
        <OutlinedInput
          size="small"
          sx={{ width: "250px" }}
          readOnly
          placeholder="Tanggal Laporan"
          endAdornment={
            <InputAdornment position="end">
              <SelectDateIcon />
            </InputAdornment>
          }
        />
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
            width: "250px",
            marginTop: "5px",
          },
        }}
      >
        {dateList.map((value) => (
          <MenuItem key={value} sx={{ m: 2 }}>
            <Box
              display="flex"
              alignContent="center"
              width="100%"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="inherit">{dayjs(value, "YYYY-MM-DD").format("DD MMMM YYYY")}</Typography>
              <IconButton onClick={() => removeSelectDate(value)}>
                <CloseIcon />
              </IconButton>
            </Box>
          </MenuItem>
        ))}
        <Divider />
        <Box p="10px">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePickerMui
              value={null}
              inputFormat="dd/M/yyyy"
              onChange={(e: Dayjs | null) => handleSelectDate(e)}
              renderInput={(params) => (
                <TextField size="small" {...params} fullWidth />
              )}
            />
          </LocalizationProvider>
        </Box>
      </Menu>
    </>
  );
};

export default MenuGrafikDistribusi;
