import { combineReducers } from "redux";
import searchRedux  from "./redux/searchRedux";

const reducer = combineReducers({
    searchRedux,
});

export default reducer;