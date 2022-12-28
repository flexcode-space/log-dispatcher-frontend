import { useCallback, useState } from "react";
import { toast } from "src/components/toast";
import { Axios } from "../axios";

const endpoint = "/defense/ols";
export type Params = {
  search?: string;
  tanggal?: string;
};
const defenseSchemeOlsApi = () => {
  const [defenseScheme, setDefenseScheme] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getDefenseSchemeList = useCallback(async (params: Params = {}) => {
    setLoading(true);

    try {
      const {
        data: { data },
      } = await Axios.get(endpoint, { params });
      setDefenseScheme(data || []);
    } finally {
      setLoading(false);
    }
  }, []);

  const createDefenseScheme = useCallback(async (payload: any) => {
    setLoading(true);
    try {
      await Axios.post(endpoint, payload);
      toast.success("berhasil menambahkan data ols");
    } catch (error) {
      toast.error("Gagal menambahkan data ols");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    defenseScheme,
    loading,
    getDefenseSchemeList,
    createDefenseScheme,
  };
};

export default defenseSchemeOlsApi;
