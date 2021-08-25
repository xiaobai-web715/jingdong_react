import { combineReducers } from "redux";
import searchRedux  from "./hkReducer";
import cartRedux from './cartReducer';
//因为不同的部分可能存储不同的redux文件当中,所以这里将所有的分redux文件汇聚起来
const reducer = combineReducers({
    // searchRedux:searchRedux,
    searchRedux,
    cartRedux,
});

export default reducer;