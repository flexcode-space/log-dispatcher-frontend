import { useCallback, useState } from "react";
import { Axios } from "../axios";
import { Params } from "../types";

const endpoint = "/peralatan/master/tegangan";

const teganganApi = () => {
  const [teganganList, setTeganganList] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getTeganganList = useCallback(async (params: Params = {}) => {
    setLoading(true);

    try {
      const { data } = await Axios.get(endpoint, { params });
      setTeganganList(data || []);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    teganganList,
    loading,
    getTeganganList,
  };
};

export default teganganApi;
