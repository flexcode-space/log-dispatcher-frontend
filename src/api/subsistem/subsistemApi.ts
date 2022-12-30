import { useCallback, useState } from "react";
import { toast } from "src/components/toast";
import { Axios } from "../axios";
import { Params } from "../types";

const endpoint = "/sub-sistem";

const subsistemApi = () => {
  const [subsistemList, setSubsistemList] = useState<[]>([]);
  const [totalData, setTotalData] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const getSubsistemList = useCallback(async (params: Params = {}) => {
    setLoading(true);

    try {
      const {
        data: { data, total },
      } = await Axios.get(endpoint, { params });
      setSubsistemList(data || []);
      setTotalData(total);
    } finally {
      setLoading(false);
    }
  }, []);

  const getSubsistemDetail = useCallback(async (id: String) => {
    setLoading(true);

    try {
      const { data } = await Axios.get(`${endpoint}/${id}`);
      return data;
    } finally {
      setLoading(false);
    }
  }, []);

  const createSubsistem = useCallback(async (payload: any) => {
    setLoading(true);

    try {
      await Axios.post(endpoint, payload);
      toast.success("Berhasil menambahkan subsistem");
    } catch (error) {
      toast.error("Gagal menambahkan subsistem");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSubsistem = useCallback(async (payload: any) => {
    setLoading(true);

    try {
      await Axios.put(endpoint, payload);
      toast.success("Berhasil mengubah subsistem");
    } catch (error) {
      toast.error("Gagal mengubah subsistem");
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteSubsistem = useCallback(async (payload: any) => {
    setLoading(true);
    try {
      await Axios.delete(endpoint, { data: payload });
      toast.success("Berhasil menghapus subsistem");
    } catch (error) {
      toast.error("Gagal menghapus subsistem");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    subsistemList,
    totalData,
    loading,
    getSubsistemList,
    getSubsistemDetail,
    createSubsistem,
    updateSubsistem,
    deleteSubsistem,
  };
};

export default subsistemApi;
