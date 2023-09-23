// ** Icon imports
import HomeOutline from "mdi-material-ui/HomeOutline";
import MasterDataIcon from "../assets/icons/masterdata-icon.svg";
import SubsistemIcon from "../assets/icons/subsistem-icon.svg";
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
import GrafikIcon from "../assets/icons/grafik-icon.svg";
import LainnyaIcon from "../assets/icons/lainnya-icon.svg";
import KitlurIcon from "../assets/icons/kitlur-icon.svg";
import CatatanPembangkitanIcon from "../assets/icons/catatan-pembangkitan-icon.svg";
import CatatanPenyaluranIcon from "../assets/icons/catatan-penyaluran-icon.svg";
import EnergizePeralatanIcon from "../assets/icons/energize-peralatan-icon.svg";
import LoadFlowIcon from "../assets/icons/load-flow-icon.svg";
import DefenseSchemaIcon from "../assets/icons/defense-schema-icon.svg";
import EnergiPrimerIcon from "../assets/icons/energi-primer-icon.svg";
import ProduksiAirIcon from "../assets/icons/produksi-air-icon.svg";
import DocumentIcon from "../assets/icons/document-icon.svg";
import ReportIcon from "../assets/icons/report-icon.svg";
import DispatchIcon from "../assets/icons/dispatch-icon.svg";
import NeracaDayaIcon from "../assets/icons/neraca-daya-icon.svg";
import PoskoApdIcon from "../assets/icons/posko-apd-icon.svg";
import SubReportIcon from "../assets/icons/sub-report-icon.svg";
import GangguanIcon from "../assets/icons/gangguan-icon.svg";
import PengaturanUserIcon from "../assets/icons/pengaturan-user-icon.svg";
// ** Type import
import { HorizontalNavItemsType } from "src/@core/layouts/types";

export const navigation = (): HorizontalNavItemsType => [
  {
    title: "Beranda",
    icon: HomeOutline,
    path: "/home",
    subject: "home-page",
    action: "read",
  },
  {
    title: "Beban",
    icon: BebanIcon,
    children: [
      {
        title: "Unggah Data",
        icon: UnggahIcon,
        path: "/beban/unggah-data",
        subject: "unggah-data-page",
        action: "read",
      },
      {
        title: "Beban Harian",
        icon: BebanHarianIcon,
        path: "/beban/beban-harian",
        subject: "beban-harian-page",
        action: "read",
      },
      {
        title: "Rencana Harian",
        icon: RencanaHarianIcon,
        path: "/beban/rencana-harian",
        subject: "rencana-harian-page",
        action: "read",
      },
      {
        title: "Beban Trafo Harian",
        icon: BebanTrafoIcon,
        path: "/beban/beban-trafo-harian",
        subject: "beban-trafo-harian-page",
        action: "read",
      },
      {
        title: "Beban Penghantar Harian",
        icon: BebanPenghantarIcon,
        path: "/beban/beban-penghantar-harian",
        subject: "beban-penghantar-harian-page",
        action: "read",
      },
      {
        title: "Beban IBT Harian",
        icon: PembebananIbtIcon,
        path: "/beban/beban-ibt-harian",
        subject: "beban-ibt-harian-page",
        action: "read",
      },
      {
        title: "Tegangan Busbar",
        icon: TrafoIcon,
        path: "/beban/tegangan-busbar",
        subject: "tegangan-busbar-page",
        action: "read",
      },
      {
        title: "Analisa Beban",
        icon: TrafoIcon,
        path: "/beban/analisa-beban",
        subject: "analisa-beban-page",
        action: "read",
      },
    ],
  },
  {
    title: "KIT & LUR",
    icon: KitlurIcon,
    children: [
      {
        title: "Catatan Pembangkitan",
        icon: CatatanPembangkitanIcon,
        path: "/catatan-pembangkitan",
        subject: "catatan-pembangkitan-page",
        action: "read",
      },
      {
        title: "Catatan Penyaluran",
        icon: CatatanPenyaluranIcon,
        path: "/catatan-penyaluran",
        subject: "catatan-penyaluran-page",
        action: "read",
      },
      {
        title: "Energize Peralatan",
        icon: EnergizePeralatanIcon,
        path: "/energize-peralatan",
        subject: "energize-peralatan-page",
        action: "read",
      },
    ],
  },
  {
    title: "Load Flow",
    icon: LoadFlowIcon,
    children: [
      {
        title: "Peta Jaringan",
        path: "/peta-jaringan",
        subject: "peta-jaringan-page",
        action: "read",
      },
    ],
  },
  {
    title: "Energi Primer",
    icon: EnergiPrimerIcon,
    children: [
      {
        title: "Produksi kWh",
        icon: SubsistemIcon,
        path: "/energi-primer/produksi-kwh",
        subject: "produksi-kwh-page",
        action: "read",
      },
      {
        title: "Air",
        icon: ProduksiAirIcon,
        path: "/energi-primer/air",
        subject: "air-page",
        action: "read",
      },
      {
        title: "Gas",
        icon: PembangkitIcon,
        path: "/energi-primer/gas-dan-hsd",
        subject: "gas-dan-hsd-page",
        action: "read",
      },
      {
        title: "Batubara & HSD",
        icon: PenghantarIcon,
        path: "/energi-primer/batubara",
        subject: "batubara-page",
        action: "read",
      },
    ],
  },
  {
    title: "Grafik",
    icon: GrafikIcon,
    path: "/grafik",
    subject: "grafik-page",
    action: "read",
  },
  {
    title: "Master Data",
    icon: MasterDataIcon,
    children: [
      {
        title: "Subsistem",
        icon: SubsistemIcon,
        path: "/master-data/sub-sistem",
        subject: "sub-sistem-page",
        action: "read",
      },
      {
        title: "Gardu Induk",
        icon: SubsistemIcon,
        path: "/master-data/gardu-induk",
        subject: "gardu-induk-page",
        action: "read",
      },
      {
        title: "IBT",
        icon: ProduksiAirIcon,
        path: "/master-data/ibt",
        subject: "ibt-page",
        action: "read",
      },
      {
        title: "Pembangkit",
        icon: PembangkitIcon,
        path: "/master-data/pembangkit",
        subject: "pembangkit-page",
        action: "read",
      },
      {
        title: "Penghantar",
        icon: PenghantarIcon,
        path: "/master-data/penghantar",
        subject: "penghantar-page",
        action: "read",
      },
      {
        title: "Trafo",
        icon: TrafoIcon,
        path: "/master-data/trafo",
        subject: "trafo-page",
        action: "read",
      },
      {
        title: "Busbar",
        icon: TrafoIcon,
        path: "/master-data/busbar",
        subject: "busbar-page",
        action: "read",
      },
      {
        title: "Reaktor & Kapasitor",
        icon: TrafoIcon,
        path: "/master-data/reaktor",
        subject: "reaktor-page",
        action: "read",
      },
    ],
  },
  {
    title: "Defense Scheme",
    icon: DefenseSchemaIcon,
    path: "/defense-schema",
    subject: "defense-schema-page",
    action: "read",
  },
  {
    title: "Lainnya",
    icon: LainnyaIcon,
    children: [
      {
        title: "Dispatch",
        icon: DispatchIcon,
        children: [
          {
            title: "Kapasitor Reaktor",
            path: "/kapasitor-reaktor",
            subject: "kapasitor-reaktor-page",
            action: "read",
          },
          {
            title: "Switching Diluar Rencana",
            path: "/switching-diluar-rencana",
            subject: "switching-diluar-rencana-page",
            action: "read",
          },
          {
            title: "Switching Pembangkit",
            path: "/switching-pembangkit",
            subject: "switching-pembangkit-page",
            action: "read",
          },
          {
            title: "Pengaturan Tegangan",
            path: "/pengaturan-tegangan",
            subject: "pengaturan-tegangan-page",
            action: "read",
          },
        ],
      },
      {
        title: "Dokumen",
        icon: DocumentIcon,
        path: "/dokumen",
        subject: "dokumen-page",
        action: "read",
      },
      {
        title: "Gangguan",
        icon: GangguanIcon,
        path: "/gangguan",
        subject: "gangguan-page",
        action: "read",
      },
      {
        title: "Laporan",
        icon: ReportIcon,
        children: [
          {
            title: "Neraca Daya",
            icon: NeracaDayaIcon,
            path: "/laporan/neraca-daya",
            subject: "laporan-neraca-daya-page",
            action: "read",
          },
          {
            title: "Posko APD",
            icon: PoskoApdIcon,
            path: "/laporan/posko-apd",
            subject: "laporan-posko-apd-page",
            action: "read",
          },
          {
            title: "Laporan FOR",
            icon: SubReportIcon,
            path: "/laporan/for",
            subject: "laporan-for-page",
            action: "read",
          },
          {
            title: "Laporan FreeGov",
            icon: SubReportIcon,
            path: "/laporan/freegov",
            subject: "laporan-freegov-page",
            action: "read",
          },
          {
            title: "Laporan Pekerjaan",
            icon: SubReportIcon,
            path: "/laporan/pekerjaan",
            subject: "laporan-pekerjaan-page",
            action: "read",
          },
          {
            title: "Rekonfigurasi",
            icon: SubReportIcon,
            path: "/laporan/rekonfigurasi",
            subject: "laporan-rekonfigurasi-page",
            action: "read",
          },
          {
            title: "Laporan SCADA",
            icon: SubReportIcon,
            path: "/laporan/scada",
            subject: "laporan-scada-page",
            action: "read",
          },
        ],
      },
      {
        title: "Piket & Shift",
        icon: PengaturanUserIcon,
        path: "/piket-dan-shift",
        subject: "piket-dan-shift-page",
        action: "read",
      },
      {
        title: "Pengaturan User",
        icon: PengaturanUserIcon,
        path: "/pengaturan-user",
        subject: "pengaturan-user-page",
        action: "read",
      },
    ],
  },
];
