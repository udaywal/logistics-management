import React from 'react';
import './Home.css';

import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import PersonIcon from '@material-ui/icons/Person';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="home">

            <div className="home__heading">
                Welcome back, admin
            </div>
            
            <div className="home__stats">
                <Link to='/vehicles' className="home__card">
                        <LocalShippingIcon />
                        <p>Vehicles</p>
                </Link>
                <Link to='/vehicles' className="home__card">
                    <AllInboxIcon />
                    <p>Items</p>
                </Link>
                <Link to='/vehicles' className="home__card">
                    <PersonIcon />
                    <p>Customers</p>
                </Link>
                <Link to='/vehicles' className="home__card">
                    <CreditCardIcon />
                    <p>Orders</p>
                </Link>
            </div>

        </div>
    )
}

export default Home
