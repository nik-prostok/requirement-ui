import * as React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import {AddObject} from "./addObject/AddObject";
import {Header} from "./header/Header";

export const RootRouter = () => {
    return (
        <Router>
            <Switch>
                <Route path="/addObject">
                    <Header>
                        <AddObject/>
                    </Header>
                </Route>
            </Switch>
        </Router>
    )
}
