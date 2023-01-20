import { proxy } from "valtio";
import { Data } from "../types";

const initialValues = {
  data: {} as Data,
};

export const defenseSchema = proxy<{ data: Data }>(initialValues);

export const selectData = (data: Data): void => {
  defenseSchema.data = data;
};

export const removeData = (): void => {
  defenseSchema.data = initialValues.data;
};
