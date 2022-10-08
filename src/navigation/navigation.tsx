// ** Icon imports
import HomeOutline from "mdi-material-ui/HomeOutline";
import MasterDataIcon from "../assets/icons/masterdata-icon.svg";
import SubsistemIcon from "../assets/icons/subsistem-icon.svg";
import IBTIcon from "../assets/icons/ibt-icon.svg";
import PenghantarIcon from "../assets/icons/penghantar-icon.svg";
import PembangkitIcon from "../assets/icons/pembangkit-icon.svg";
import TrafoIcon from "../assets/icons/trafo-icon.svg";
import BebanIcon from "../assets/icons/beban-icon.svg";
import UnggahIcon from "../assets/icons/unggah-icon.svg";
import BebanHarianIcon from "../assets/icons/beban-harian-icon.svg";
import RencanaHarianIcon from "../assets/icons/rencana-harian-icon.svg";
import BebanTrafoIcon from "../assets/icons/beban-trafo-icon.svg";
import BebanPenghantarIcon from "../assets/icons/beban-penghantar-icon.svg";
import PembebananIbtIcon from "../assets/icons/pembebanan-ibt-icon.svg";

// ** Type import
import { HorizontalNavItemsType } from "src/@core/layouts/types";

export const navigation = (): HorizontalNavItemsType => [
  {
    title: "Beranda",
    icon: HomeOutline,
    path: "/home",
  },
  {
    title: "Beban",
    icon: BebanIcon,
    children: [
      {
        title: "Unggah Data",
        icon: UnggahIcon,
        path: "/beban/unggah-data",
      },
      {
        title: "Beban Harian",
        icon: BebanHarianIcon,
        path: "/beban/beban-harian",
      },
      {
        title: "Rencana Harian",
        icon: RencanaHarianIcon,
        path: "/beban/rencana-data",
      },
      {
        title: "Beban Trafo Harian",
        icon: BebanTrafoIcon,
        path: "/beban/beban-trafo",
      },
      {
        title: "Beban Penghantar Harian",
        icon: BebanPenghantarIcon,
        path: "/beban/beban-penghantar",
      },
      {
        title: "Pembebanan IBT",
        icon: PembebananIbtIcon,
        path: "/beban/pembebanan-ibt",
      },
      {
        title: "Tegangan Busbar",
        icon: TrafoIcon,
        path: "/beban/tegangan-busbar",
      },
      {
        title: "Analisa Beban",
        icon: TrafoIcon,
        path: "/beban/analisa-beban",
      },
    ],
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
