import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { IEaten, IFoods } from "../shared/FoodEatenTable";
import { IFinalCalcTable } from "../shared/FinalCalcTable";
import { IOrder } from "../shared/Order";
import IState from "./IState";

const initialState: IState = {
  orderList: [],
  uniqueFriends: [],
  uniqueFoods: [],
  foodEaten: [],
  finalCalc: [],
};

const calc = createSlice({
  name: "calc",
  initialState,
  reducers: {
    setOrderList(state: Draft<IState>, action: PayloadAction<Array<IOrder>> ) {
      state.orderList = action.payload;
    },
    setUniqueFriends(state: Draft<IState>, action: PayloadAction<Array<string>> ) {
      state.uniqueFriends = action.payload;
    },
    setUniqueFoods(state: Draft<IState>, action: PayloadAction<Array<IFoods>> ) {
      state.uniqueFoods = action.payload;
    },
    setFoodEaten(state: Draft<IState>, action: PayloadAction<Array<IEaten>> ) {
      state.foodEaten = action.payload;
    },
    setFinalCalc(state: Draft<IState>, action: PayloadAction<Array<IFinalCalcTable>> ) {
      state.finalCalc = action.payload;
    },
  },
});

const {actions, reducer} = calc;
export const { setOrderList, setUniqueFriends, setUniqueFoods, setFoodEaten, setFinalCalc} = actions;
export default reducer;