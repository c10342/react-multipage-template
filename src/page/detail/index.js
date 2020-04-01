import "core-js/stable";
import "regenerator-runtime/runtime";

import {hot} from 'react-hot-loader'

import React from 'react'

import ReactDOM from 'react-dom'

const App = () => {
    return (
        <div>hello,world --- detail</div>
    )
}

const HotApp = hot(module)(App)


ReactDOM.render(
    <HotApp/>,
    document.getElementById('root')
)