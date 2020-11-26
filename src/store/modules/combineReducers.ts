import { combineReducers } from "redux";
import targetObjectReducer from "./targetObjects/TargetObjects.reduces";

const rootReducer = combineReducers({
    targetObject: targetObjectReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
