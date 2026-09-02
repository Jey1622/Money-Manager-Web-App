import api from "../../axios";
import { setTransactions, setLoader } from "../slices/TransactionSlice";

export const fetchTransaction = (selectedDate) => async (dispatch) => {
  try {
    dispatch(setLoader(true));
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

export const addTransaction = (transactionData) => async (dispatch) => {
  try {
    dispatch(setLoader(true));

    const { data } = await api.post("/addTransaction", transactionData);

    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
