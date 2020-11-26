import {TargetObject} from "../../../components/header/SelectObject/interfaces/TargetObject";
import {SET_TARGET_OBJECT, TargetObjectActionsTypes} from "./TargetObjects.types";

export function setTargetObject(targetObjects: TargetObject[]): TargetObjectActionsTypes {
    return {
        type: SET_TARGET_OBJECT,
        payload: {targetObjects}
    };
}

