import api from "../../axios";
import { setTransactions } from "../slices/TransactionSlice";

export const fetchTransaction = (selectedDate) => async (dispatch) => {
  try {
   const { data } = await api.get("/getAllTransaction", {
      params: {
        month: selectedDate.getMonth() + 1,
        year: selectedDate.getFullYear(),
      },
    });
    dispatch(setTransactions(data.transaction));
  } catch (error) {
    console.log(error);
  }
};
