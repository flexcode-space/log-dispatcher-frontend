import { useCallback, useState } from "react";
import { Axios } from "../axios";
import { Params } from "../types";

const endpoint = "/peralatan/master/mva";

const mvaApi = () => {
  const [mvaList, setMvaList] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getMvaList = useCallback(async (params: Params = {}) => {
    setLoading(true);

    try {
      const { data } = await Axios.get(endpoint, { params });
      setMvaList(data || []);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    mvaList,
    loading,
    getMvaList,
  };
};

export default mvaApi;
