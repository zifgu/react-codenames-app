import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {Game} from "./Components/Game";
import {Start} from "./Components/Start";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/game" element={<Game/>}/>
                <Route path="/" element={<Start/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
