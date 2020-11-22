import * as React from "react";
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import {TechnicalTasks} from "../technicalTasks/TechnicalTasks";
import {TechnicalTaskPoints} from "../technicalTaskPoints/TechnicalTaskPoints";
import {Header} from "../header/Header";

export const RootRouter = () => {
    return (
        <BrowserRouter>
            <Header>
                <Switch>
                    <Route path='/technicalTasks' component={TechnicalTasks}/>
                    <Route path='/taskPoint' component={TechnicalTaskPoints}/>
                </Switch>
            </Header>
        </BrowserRouter>
    )
}
