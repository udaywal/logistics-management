import React from 'react';
import "./TopBar.css"

import SearchIcon from '@material-ui/icons/Search';

function TopBar({ as, handleAdd }) {
    return (
        <div className="topbar">
            <div className="topbar__input">
                <SearchIcon />
                <input placeholder={`Search ${as}`} type="text"/>
            </div>
            <button onClick={handleAdd}>Add {as}</button>
        </div>
    )
}

export default TopBar;