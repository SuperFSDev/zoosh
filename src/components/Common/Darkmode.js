import React, { useState, useEffect } from "react";
import {Nav} from 'react-bootstrap'
import {FiMoon,FiSun} from 'react-icons/fi'

function useThemeSwitcher() {
    const [mode, setMode] = useState(() => localStorage.getItem("mode"));

    useEffect(() => {
        window.addEventListener("storage", setPreferedTheme);
        return () => {
            window.removeEventListener("storage", setPreferedTheme);
        };
    }, []);

    const setPreferedTheme = () => {
        const _mode = localStorage.getItem("mode");
        if (_mode) {
            setMode(_mode);
        } else {
            setMode("light");
        }
    };

    useEffect(() => {
        if (mode === "dark") {
            document.body.classList.add("dark-mode");
            localStorage.setItem("mode", "dark");
        } else {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("mode", "light");
        }
    }, [mode]);

    return (
        <Nav.Link
            className="cursor-pointer"
            onClick={() =>
                setMode(mode => (mode === "dark" ? "light" : "dark"))
            }
        >
            <small> {mode === "dark" ? <FiSun  size={25}/>: <FiMoon size={25}/>}  Mode</small>
        </Nav.Link>
    );
}

export default useThemeSwitcher;