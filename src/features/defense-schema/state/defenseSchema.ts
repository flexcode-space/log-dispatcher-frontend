import { proxy } from "valtio";
import { DefenseSchemaList } from "../types";

const initialValues = {
  data: {} as DefenseSchemaList,
};

export const defenseSchema = proxy<{ data: DefenseSchemaList }>(initialValues);

export const selectData = (data: DefenseSchemaList): void => {
  defenseSchema.data = data;
};

export const removeData = (): void => {
  defenseSchema.data = initialValues.data;
};
