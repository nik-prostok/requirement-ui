import {SET_TARGET_OBJECT, TargetObjectActionsTypes, TargetObjectState} from "./TargetObjects.types";

const initialState: TargetObjectState = {
    targetObjects: []
}

export default function targetObjectReducer(
    state = initialState,
    action: TargetObjectActionsTypes
): TargetObjectState {
    switch (action.type) {
        case SET_TARGET_OBJECT:
            return {
                targetObjects: action.payload.targetObjects
            };
        default:
            return state;
    }
}
