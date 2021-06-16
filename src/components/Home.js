import React, { useEffect, useState } from 'react';
import './Home.css';

import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import PersonIcon from '@material-ui/icons/Person';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import { Link } from 'react-router-dom';

import TableComponent from './TableComponent';

import encryptedString from '../utils/dataStrings'

import moment from 'moment'

function Home() {

    const [people, setPeople] = useState([])
    
    const socket = new WebSocket('ws://localhost:8080/');
    const encryptedData = encryptedString();

    useEffect(() => {
        socket.onopen = () => {
            console.log('🚀 socket connected.')
            socket.send(JSON.stringify({ type: 'GET', data: null }))
        }

        socket.onclose = () => {
            console.log('disconnected')
        }
    }, [])

    useEffect(() => {
        socket.onmessage = ({ data }) => {
            let peopleData = (JSON.parse(data).data[0].data).map(p => {
                return { id: p._id, data: {...p, time: moment(p.time).format("MMMM Do YYYY, h:mm:ss a")} }
            })
            setPeople(peopleData)
        }
    }, [])

    useEffect(() => {
        setInterval(() => {
            socket.send(JSON.stringify({ type: 'POST', data: encryptedData }))
        }, 10000);
    }, [])

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
                <Link to='/items' className="home__card">
                    <AllInboxIcon />
                    <p>Items</p>
                </Link>
                <Link to='/customers' className="home__card">
                    <PersonIcon />
                    <p>Customers</p>
                </Link>
                <Link to='/orders' className="home__card">
                    <CreditCardIcon />
                    <p>Orders</p>
                </Link>
            </div>

            <div className="home__table">

                <p>NJS-Service Data</p>

                <TableComponent 
                    heading={[
                        { name: "Name", value: "name" }, 
                        { name: "Time", value: "time" },
                        { name: "Total Trips", value: "trips" }
                    ]}
                    content={people} />

            </div>

        </div>
    )
}

export default Home
