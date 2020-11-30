import * as React from "react";
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import {TechTasks} from "../components/techTasks/TechTasks";
import {TechnicalTaskPoints} from "../components/technicalTaskPoints/TechnicalTaskPoints";
import {Header} from "../components/header/Header";

export const RootRouter = () => {
    return (
        <BrowserRouter>
            <Header>
                <Switch>
                    <Route path='/technicalTasks' component={TechTasks}/>
                    <Route path='/taskPoint' component={TechnicalTaskPoints}/>
                </Switch>
            </Header>
        </BrowserRouter>
    )
}
