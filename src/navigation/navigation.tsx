// ** Icon imports
import HomeOutline from "mdi-material-ui/HomeOutline";
import EmailOutline from "mdi-material-ui/EmailOutline";
import MasterDataIcon from "../assets/icons/masterdata-icon.svg";
import SubsistemIcon from "../assets/icons/subsistem-icon.svg";
import IBTIcon from "../assets/icons/ibt-icon.svg";
import PenghantarIcon from "../assets/icons/penghantar-icon.svg";
import PembangkitIcon from "../assets/icons/pembangkit-icon.svg";
import TrafoIcon from "../assets/icons/trafo-icon.svg";

// ** Type import
import { HorizontalNavItemsType } from "src/@core/layouts/types";

export const navigation = (): HorizontalNavItemsType => [
  {
    title: "Beranda",
    icon: HomeOutline,
    path: "/home",
  },
  {
    title: "Master Data",
    icon: MasterDataIcon,
    children: [
      {
        title: "Subsistem",
        icon: SubsistemIcon,
        path: "/master-data/subsistem",
      },
      {
        title: "IBT",
        icon: IBTIcon,
        path: "/master-data/ibt",
      },
      {
        title: "Pembangkit",
        icon: PembangkitIcon,
        path: "/master-data/pembangkit",
      },
      {
        title: "Penghantar",
        icon: PenghantarIcon,
        path: "/master-data/penghantar",
      },
      {
        title: "Trafo",
        icon: TrafoIcon,
        path: "/master-data/trafo",
      },
      {
        title: "Busbar",
        icon: TrafoIcon,
        path: "/master-data/busbar",
      },
      {
        title: "Reaktor & Kapasitor",
        icon: TrafoIcon,
        path: "/master-data/reaktor",
      },
    ],
  },
];
