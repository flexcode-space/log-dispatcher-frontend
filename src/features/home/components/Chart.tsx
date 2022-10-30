import { Card, CardContent, Typography } from "@mui/material";
import ReactApexcharts from "src/@core/components/react-apexcharts";
import { ApexOptions } from "apexcharts";

const options: ApexOptions = {
  legend: { show: false },
  colors: ["#6D788D", "#4AA1B9", "#FDBE42"],
  labels: [
    `${new Date().getFullYear()}`,
    `${new Date().getFullYear() - 1}`,
    `${new Date().getFullYear() - 2}`,
  ],
  tooltip: {
    y: { formatter: (val: number) => `${val}%` },
  },
  dataLabels: {
    enabled: false,
  },
  states: {
    hover: {
      filter: { type: "none" },
    },
    active: {
      filter: { type: "none" },
    },
  },
  plotOptions: {
    pie: {
      donut: {
        size: "70%",
        labels: {
          show: true,
          name: { show: false },
          total: {
            label: "",
            show: true,
            formatter(val) {
              return typeof val === "string" ? `${val}%` : "12%";
            },
          },
          value: {
            offsetY: 6,
            formatter(val) {
              return `${val}%`;
            },
          },
        },
      },
    },
  },
};

export const Chart: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Card sx={{ height: 390 }}>
      <CardContent>
        <Typography textAlign="center" variant="h6" mb="24px">
          {title}
        </Typography>
        <ReactApexcharts
          type="donut"
          height={300}
          options={options}
          series={[35, 30, 23]}
        />
      </CardContent>
    </Card>
  );
};
