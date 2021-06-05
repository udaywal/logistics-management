import React, { useState, useEffect } from 'react';

import firebase from 'firebase';
import db from '../firebase';
import TableComponent from './TableComponent';
import TopBar from './TopBar';

import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';

import { useFormik } from 'formik';
import * as Yup from 'yup';

function Vehicle() {

    const [vehicles, setVehicles] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const VehicleForm = {
        registrationNumber: '',
        vehicleType: '',
        city: '',
    }

    const VehicleSchema = Yup.object().shape({
        registrationNumber: Yup.string().required('Registration number is required').test(
            "unique",
            "Duplicate registration number",
            (value) => value ? !(vehicles.map(v => v.data.registrationNumber).includes(value.toUpperCase())) : null
          ),
        vehicleType: Yup.string().required('Vehicle type is required'),
        city: Yup.string().required('City is required'),
    });

    const formik = useFormik({
        initialValues: VehicleForm,
        validationSchema: VehicleSchema,
        onSubmit: (values, { resetForm }) => {
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

            <TopBar as="vehicle" handleAdd={() => setIsFormOpen(true)}/>

            <Dialog open={isFormOpen} onClose={() => setIsFormOpen(false)} >
                <DialogTitle id="alert-dialog-title">{"Add Vehicle Details"}</DialogTitle>
                <DialogContent>
                <div className="forms">
                    <form onSubmit={formik.handleSubmit}>
                        <label>Registration Number</label>
                        <input id="registrationNumber" name="registrationNumber" type="text"
                            onChange={formik.handleChange} value={formik.values.registrationNumber}
                        />
                        {formik.errors.registrationNumber && formik.touched.registrationNumber ? <div className="formerror">{formik.errors.registrationNumber}</div> : null}

                        <label>Vehicle Type</label>
                        <select id="vehicleType" name="vehicleType" onChange={formik.handleChange} value={formik.values.vehicleType}>
                            <option value="" hidden />
                            <option value="bike">Bike</option>
                            <option value="truck">Truck</option>
                        </select>
                        {formik.errors.vehicleType && formik.touched.vehicleType ? <div className="formerror">{formik.errors.vehicleType}</div> : null}

                        <label>City</label>
                        <input id="city" name="city" type="text"
                            onChange={formik.handleChange} value={formik.values.city}
                        />
                        {formik.errors.city && formik.touched.city ? <div className="formerror">{formik.errors.city}</div> : null}

                        <button type="submit">Submit</button>
                    </form>
                </div>
                </DialogContent>
            </Dialog>

            <TableComponent 
                heading={[
                    { name: "Registration Number", value: "registrationNumber" }, 
                    { name: "Vehicle Type", value: "vehicleType" },
                    { name: "City", value: "city" },
                ]}
                content={vehicles} 
            />
            
        </div>
    )
}

export default Vehicle;
