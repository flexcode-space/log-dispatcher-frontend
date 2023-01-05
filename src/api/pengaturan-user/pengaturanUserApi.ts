import { useCallback, useState } from "react";
import { Axios } from "../axios";
import { toast } from 'src/components/toast'
import { Params } from "../types";

const endpoint = "/users";

const pengaturanUserApi = () => {
  const [pengaturanUserList, setPengaturanUserList] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  const getPengaturanUser = useCallback(async (params: Params = {}) => {
    setLoading(true);
    
    try {
          const { data } = await Axios.get(endpoint, { params })
      console.log('data :' , data)
          setPengaturanUserList(data || []);
      
    } finally {
      setLoading(false);
    }
  }, []);

  const createPengaturanUser = useCallback(async(payload : any)=>{
    setLoading(true)
    try{
      await Axios.post(endpoint, payload)
      toast.success('berhasil menambahkan User');
    }catch(error){
      toast.error('gagal menambahkan energize peralatan');
    }finally{
      setLoading(false);
    }
  },[])


  return {
    pengaturanUserList,
    loading,
    getPengaturanUser,
  };
};

export default pengaturanUserApi;
