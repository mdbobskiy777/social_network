import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className={s.navBar}>
            <div>
                <NavLink to="/profile" activeClassName={s.active}>Profile</NavLink>
            </div>
            <div>
                <NavLink to="/dialogs" activeClassName={s.active}>Messages</NavLink>
            </div>
            <div>
                <NavLink to="/users" activeClassName={s.active}>Users</NavLink>
            </div>

            <div>
                <a href={"/#"}>News</a>
            </div>
            <div>
                <a href={"/#"}>Music</a>
            </div>
            <div>
                <a href={"/#"}>Settings</a>
            </div>
        </nav>
    )
}

export default Navbar;