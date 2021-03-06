import {TargetObject} from "./interfaces/TargetObject";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {TargetObjectsApi} from "./api/TargetObjects.api";

export interface SetTargetObjectsAction {
    type: 'SET_TARGET_OBJECTS';
    targetObjects: TargetObject[];
}

export interface SetFetching {
    type: 'SET_FETCHING';
    isFetching: boolean;
}

export interface SetSelectedTargetObjectAction {
    type: 'SET_SELECTED_TARGET_OBJECT';
    selectedTargetObject: TargetObject;
}

export interface SetSelectedTargetObjectByIdAction {
    type: 'SET_SELECTED_TARGET_OBJECT_BY_ID',
    idSelectedTargetObject: string,
}

export type TargetObjectsAction = SetTargetObjectsAction | SetFetching | SetSelectedTargetObjectAction;

export const setTargetObject = (targetObjects: TargetObject[]): SetTargetObjectsAction => {
    return { type: 'SET_TARGET_OBJECTS', targetObjects }
}
export const isFetching = (isFetching: boolean): SetFetching => {
    return { type: 'SET_FETCHING', isFetching }
}

export const setSelectedTargetObjectById = (idSelectedTargetObject: string): SetSelectedTargetObjectByIdAction => {
    return {type: 'SET_SELECTED_TARGET_OBJECT_BY_ID', idSelectedTargetObject}
}

export const fetchTargetObject = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {

    return async dispatch => {
        dispatch(isFetching(true));
        const targetobjectsList = await TargetObjectsApi.getTargetObjects();
        dispatch(setTargetObject(targetobjectsList));
        dispatch(isFetching(false));
    }
}
