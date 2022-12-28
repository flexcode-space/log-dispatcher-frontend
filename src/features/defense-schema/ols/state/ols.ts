import { proxy } from "valtio";
import { defenseScheme } from "../types";

const initialValues = {
  data: {} as defenseScheme,
};

export const ols = proxy<{ data: defenseScheme }>(initialValues);

export const selectData = (data: defenseScheme): void => {
  ols.data = data;
};

export const removeData = (): void => {
  ols.data = initialValues.data;
};
