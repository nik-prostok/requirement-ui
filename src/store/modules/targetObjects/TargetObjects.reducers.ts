import {TargetObject} from "./interfaces/TargetObject";
import {combineReducers} from "redux";
import {
    SetSelectedTargetObjectByIdAction,
    TargetObjectsAction
} from "./TargetObjects.action";

export interface TargetObjectsListRequest {
    isFetching: boolean;
    targetObjectsList: TargetObject[];
}

export interface SelectedTargetObject {
    selectedTargetObjectId: string;
}

export interface TargetObjectsState {
    targetObjects: TargetObjectsListRequest;
    selectedTargetObject: SelectedTargetObject;
}

const targetObjects = (state: TargetObjectsListRequest = {isFetching: false, targetObjectsList: []},
                       action: TargetObjectsAction): TargetObjectsListRequest => {
    switch (action.type) {
        case 'SET_TARGET_OBJECTS':
            return {...state, targetObjectsList: action.targetObjects}
        case 'SET_FETCHING':
            return {...state, isFetching:  action.isFetching}
    }
    return state;
}

const selectedTargetObject = (state: SelectedTargetObject = {selectedTargetObjectId: ''},
                              action: SetSelectedTargetObjectByIdAction): SelectedTargetObject => {
    switch (action.type) {
        case 'SET_SELECTED_TARGET_OBJECT_BY_ID':
           return {...state, selectedTargetObjectId: action.idSelectedTargetObject}
    }
    return state;
}

export default combineReducers<TargetObjectsState>({
    targetObjects,
    selectedTargetObject
})
