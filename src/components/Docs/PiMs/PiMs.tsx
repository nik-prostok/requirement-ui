import * as React from "react";
import {Grid} from "@material-ui/core";
import {AddDoc} from "../AddDocs/AddDoc";
import {AddDocsApi} from "../AddDocs/api/AddDocsApi";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/createStore";

import {PimsList} from "./ListPiMs/PimsList";
import {PimsApi} from "./ListPiMs/api/getPims.api";
import {Pim} from "./ListPiMs/interfaces/pims.interface";

export interface PiMsProps {
    onPiMsAdd?: () => void;
}

export const PiMs = ({onPiMsAdd}: PiMsProps) => {

    const [pimsList, setPimsList] = useState<Pim[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [isSuccessLoaded, setIsSuccessLoaded] = useState<boolean>(false);

    const {selectedTargetObjectId} = useSelector((state: RootState) => {
        return {
            selectedTargetObjectId: state.targetObjects.selectedTargetObject.selectedTargetObjectId,
        }
    })

    useEffect(() => {
        if (selectedTargetObjectId) fetchPimsList();
    }, [selectedTargetObjectId])

    const fetchPimsList = async () => {
        setIsLoading(true);
        setIsError(false);
        try {
            setPimsList(await PimsApi.getPimsByObjectId(selectedTargetObjectId));
        } catch {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }

    const onSavePim = async (namePiM: string, file: File) => {
        setIsLoading(true);
        setIsSuccessLoaded(false);
        setIsError(false);
        try {
            let bodyFormData = new FormData();
            bodyFormData.append('targetObjectId', selectedTargetObjectId);
            bodyFormData.append('namePiM', namePiM);
            bodyFormData.append('pimDoc', file);
            await AddDocsApi.addPim(bodyFormData);
            fetchPimsList();
            setIsSuccessLoaded(true);
        } catch {
            setIsError(true);
        } finally {
            if (onPiMsAdd) {
                onPiMsAdd();
            }
            setIsLoading(false);
        }
    }

    return (
        <Grid container spacing={2} direction={"row"}>
            <Grid item xs={3}>
                <AddDoc
                    onSaveDoc={onSavePim}
                    isError={isError}
                    isLoading={isLoading}
                    isSuccessLoaded={isSuccessLoaded}
                    titleForm={'ПиМ'}
                />
            </Grid>
            <Grid item xs={5}>
                <PimsList pimsList={pimsList} isLoadingRender={isLoading} isErrorRender={isError}/>
            </Grid>
        </Grid>
    )
}
