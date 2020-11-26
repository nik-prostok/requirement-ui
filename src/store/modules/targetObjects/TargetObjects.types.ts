import {TargetObject} from "../../../components/header/SelectObject/interfaces/TargetObject";

export interface TargetObjectState {
    targetObjects: TargetObject[];
}

export const SET_TARGET_OBJECT = "@targetObject/SET_TARGET_OBJECT_REQUEST";

interface SetTargetObjectRequest {
    type: typeof SET_TARGET_OBJECT;
    payload: { targetObjects: TargetObject[]};
}

export type TargetObjectActionsTypes = SetTargetObjectRequest;
