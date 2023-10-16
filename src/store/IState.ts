import { IEaten, IFoods } from '../shared/FoodEatenTable';
import { IFinalCalcTable } from '../shared/FinalCalcTable';
import { IOrder } from '../shared/Order';

interface IState {
    orderList: Array<IOrder>;
    uniqueFriends: Array<string>;
    uniqueFoods: Array<IFoods>;
    foodEaten: Array<IEaten>;
    finalCalc: Array<IFinalCalcTable>;
};

export default IState;
