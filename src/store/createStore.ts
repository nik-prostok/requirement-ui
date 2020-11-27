import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import targetObjects, {TargetObjectsState} from "./modules/targetObjects/TargetObjects.reducers";

import { composeWithDevTools } from 'redux-devtools-extension';

export interface RootState {
    targetObjects: TargetObjectsState
}

export default createStore(combineReducers<RootState>({
    targetObjects
}),  composeWithDevTools(applyMiddleware(thunk)))
