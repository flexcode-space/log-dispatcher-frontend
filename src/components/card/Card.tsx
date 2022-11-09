import CardHeaderMui from "@mui/material/CardHeader";

type CardHeaderProps = {
  title: string | React.ReactNode;
  action?: React.ReactNode;
};

export const CardHeader = ({ title, action }: CardHeaderProps) => {
  return (
    <CardHeaderMui
      title={title}
      titleTypographyProps={{ variant: "h6" }}
      subheaderTypographyProps={{
        variant: "caption",
        sx: { color: "text.disabled" },
      }}
      sx={{
        flexDirection: ["column", "row"],
        alignItems: ["flex-start", "center"],
        "& .MuiCardHeader-action": { mb: 0 },
        "& .MuiCardHeader-content": { mb: [2, 0] },
      }}
      action={action}
    />
  );
};
