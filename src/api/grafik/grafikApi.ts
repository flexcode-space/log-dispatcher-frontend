import { useCallback, useState } from "react";
import { Axios } from "../axios";
import { Params, MWandMVAR } from "../types";
import { BebanSubsistem, MonitorBusbar } from "./type";
import { TIME } from "src/constants/time";

const endpoint = "/beban/grafik";

type ParamsGrafik = Params & {
  tanggal?: string;
};

type GrafikData = {
  time: string;
  beban: any;
  rencana: any;
}[];

const grafikApi = () => {
  const [grafikBeban, setGrafikBeban] = useState<GrafikData>(
    [] as GrafikData
  );

  const [grafikSubsistem, setGrafikSubsistem] = useState<GrafikData>(
    [] as GrafikData
  );
  const [grafikPembangkit, setGrafikPembangkit] = useState<[]>([]);

  const getGrafik = useCallback(async (params: ParamsGrafik = {}, path?: string) => {
    const url = path ? `${endpoint}/${path}` : endpoint
    const {
      data: { data, rencana, selisih },
    } = await Axios.get(url, { params });

    if (data) {
      const result = Object.values(TIME).map((time) => {
        const mw = "mw_" + time.replace(".", "");

        return {
          time,
          beban: (data as any)[mw]! || 0,
          rencana: rencana ? (rencana as any)[mw]! || 0 : [],
          selisih: selisih ? (selisih as any)[mw]! || 0 : [],
        };
      });
      setGrafikBeban(result);
    } else {
      setGrafikBeban([]);
    }
  }, []);

  const getGrafikSubsistem = useCallback(
    async (id?: string, params: ParamsGrafik = {}) => {
      const {
        data: { data, rencana, selisih },
      } = await Axios.get(`${endpoint}/subsistem/${id}`, { params });

      if (data) {
        const result = Object.values(TIME).map((time) => {
          const mw = "mw_" + time.replace(".", "");

          return {
            time,
            beban: (data as any)[mw]! || 0,
            rencana: rencana ? (rencana as any)[mw]! : 0,
            selisih: selisih ? (selisih as any)[mw]! : 0,
          };
        });
        setGrafikSubsistem(result);
      } else {
        setGrafikSubsistem([]);
      }
    },
    []
  );

  const getGrafikPembangkit = useCallback(
    async (id?: string, params: ParamsGrafik = {}) => {
      const { data } = await Axios.get(`${endpoint}/kategori-pembangkit/${id}`, { params });
      setGrafikPembangkit(data || [])

    },
    []
  );

  return {
    grafikBeban,
    getGrafikSubsistem,
    getGrafikPembangkit,
    getGrafik,
    grafikSubsistem,
    grafikPembangkit,
  };
};

export default grafikApi;
