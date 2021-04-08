import * as React from "react";
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import {Docs} from "../components/Docs/Docs";
import {Header} from "../components/Header/Header";
import {TechPoints} from "../components/TechPoints/TechPoints";
import {GenerateAct} from "../components/GenerateAct/GenerateAct";

export const RootRouter = () => {
    return (
        <BrowserRouter>
            <Header>
                <Switch>
                    <Route path='/docs' component={Docs}/>
                    <Route path='/techPoints' component={TechPoints}/>
                    <Route path='/generateAct' component={GenerateAct}/>
                    <Redirect to={'/docs'}/>
                </Switch>
            </Header>
        </BrowserRouter>
    )
}
