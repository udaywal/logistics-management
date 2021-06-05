import React, { useState, useEffect } from 'react';

import firebase from 'firebase';
import db from '../firebase';
import TableComponent from './TableComponent';
import TopBar from './TopBar';

import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';

import { useFormik } from 'formik';
import * as Yup from 'yup';

function Customer() {

    const [customers, setCustomers] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const CustomerForm = {
        name: '',
        price: ''
    }

    const CustomerSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        city: Yup.string().required('City is required')
    });

    const formik = useFormik({
        initialValues: CustomerForm,
        validationSchema: CustomerSchema,
        onSubmit: (values, { resetForm }) => {
            db.collection("customers").add({
                ...values,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
            setIsFormOpen(false);
            resetForm();
        },
      });

    useEffect(() => {
        db.collection("customers").orderBy("timestamp", "desc").onSnapshot(snapshot => {
            setCustomers(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
        })
    }, [])

    return (
        <div>
            
            <TopBar as="customer" handleAdd={() => setIsFormOpen(true)}/>

            <Dialog open={isFormOpen} onClose={() => setIsFormOpen(false)} >
                <DialogTitle id="alert-dialog-title">{"Add Customer Details"}</DialogTitle>
                <DialogContent>
                <div className="forms">
                    <form onSubmit={formik.handleSubmit}>
                        <label>Name</label>
                        <input id="name" name="name" type="text"
                            onChange={formik.handleChange} value={formik.values.name}
                        />
                        {formik.errors.name && formik.touched.name ? <div className="formerror">{formik.errors.name}</div> : null}

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
                    { name: "Name", value: "name" }, 
                    { name: "City", value: "city" }
                ]} 
                content={customers} 
            />

        </div>
    )
}

export default Customer
