import React, { useState, useEffect } from 'react';
import './Vehicle.css'

import firebase from 'firebase';
import db from '../firebase';

import { muiTableStyle } from "../utils/theme";

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent } from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';

import { useFormik } from 'formik';
import * as Yup from 'yup';

function Vehicle() {

    const [vehicles, setVehicles] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const tableClasses = muiTableStyle();

    const VehicleForm = {
        registrationNumber: '',
        vehicleType: '',
        city: '',
    }

    const VehicleSchema = Yup.object().shape({
        registrationNumber: Yup.string().required('Registration number is required'),
        vehicleType: Yup.string().required('Vehicle type is required'),
        city: Yup.string().required('City is required'),
    });

    const formik = useFormik({
        initialValues: VehicleForm,
        validationSchema: VehicleSchema,
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            db.collection("vehicles").add({
                ...values,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
            setIsFormOpen(false);
            resetForm();
        },
      });

    useEffect(() => {
        db.collection("vehicles").orderBy("timestamp", "desc").onSnapshot(snapshot => {
            setVehicles(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
        })
    }, [])

    return (
        <div className="vehicle">

            <div className="topbar">

                <div className="header__input">
                    <SearchIcon />
                    <input placeholder="Search Vehicles" type="text"/>
                </div>

                <button onClick={() => setIsFormOpen(true)}>Add vehicle</button>

                <Dialog open={isFormOpen} onClose={() => setIsFormOpen(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Add Vehicle Details"}</DialogTitle>
                    <DialogContent>
                    <div className="forms">
                        <form onSubmit={formik.handleSubmit}>
                            <label>Registration Number</label>
                            <input id="registrationNumber" name="registrationNumber" type="text"
                                onChange={formik.handleChange} value={formik.values.registrationNumber}
                            />
                            {formik.errors.registrationNumber && formik.touched.registrationNumber ? <div className="form__error">{formik.errors.registrationNumber}</div> : null}

                            <label>Vehicle Type</label>
                            <input id="vehicleType" name="vehicleType" type="text"
                                onChange={formik.handleChange} value={formik.values.vehicleType}
                            />
                            {formik.errors.vehicleType && formik.touched.vehicleType ? <div className="form__error">{formik.errors.vehicleType}</div> : null}

                            <label>City</label>
                            <input id="city" name="city" type="text"
                                onChange={formik.handleChange} value={formik.values.city}
                            />
                            {formik.errors.city && formik.touched.city ? <div className="form__error">{formik.errors.city}</div> : null}

                            <button type="submit">Submit</button>
                        </form>
                    </div>
                    </DialogContent>
                </Dialog>

            </div>

            <TableContainer component={Paper} className={tableClasses.tableContainer}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={tableClasses.tableHeaderCell}>Registration Number</TableCell>
                            <TableCell className={tableClasses.tableHeaderCell}>Vehicle Type</TableCell>
                            <TableCell className={tableClasses.tableHeaderCell}>City</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {console.log(vehicles)}
                        {vehicles.map((vehicle) => (
                            <TableRow key={vehicle.id} className={tableClasses.tableRow}>
                                <TableCell>
                                    <div>{vehicle.data.registrationNumber}</div>
                                </TableCell>
                                <TableCell>
                                    <div>{vehicle.data.vehicleType}</div>
                                </TableCell>
                                <TableCell>
                                    <div>{vehicle.data.city}</div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}

export default Vehicle;
