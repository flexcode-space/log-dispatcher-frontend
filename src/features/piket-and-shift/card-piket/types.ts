// ** React Imports
import { ReactNode } from "react";

// ** Types
import { ThemeColor } from "src/@core/layouts/types";

export type CardPiketProps = {
  src: string;
  title: string;
  stats?: string;
  chipText: string;
  trendNumber?: string;
  chipColor?: ThemeColor;
  trend?: "positive" | "negative";
};
