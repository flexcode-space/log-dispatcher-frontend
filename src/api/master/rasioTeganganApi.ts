import { useCallback, useState } from "react";
import { Axios } from "../axios";
import { Params } from "../types";

const endpoint = "/peralatan/master/rasio-tegangan";

const rasioTeganganApi = () => {
  const [rasioTeganganList, setRasioTeganganList] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getRasioTeganganList = useCallback(async (params: Params = {}) => {
    setLoading(true);

    try {
      const { data } = await Axios.get(endpoint, { params });
      setRasioTeganganList(data || []);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    rasioTeganganList,
    loading,
    getRasioTeganganList,
  };
};

export default rasioTeganganApi;
