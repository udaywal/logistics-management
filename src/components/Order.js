import React, { useState, useEffect } from 'react';

import firebase from 'firebase';
import db from '../firebase';
import TableComponent from './TableComponent';
import TopBar from './TopBar';

import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';

import { useFormik } from 'formik';
import * as Yup from 'yup';

function Order() {

    const [orders, setOrders] = useState([]);
    const [availableVehicles, setAvailableVehicles] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [items, setItems] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const OrderForm = {
        itemId: '',
        price: '',
        customerId: '',
        deliveryVehicleId: '',
    }

    const OrderSchema = Yup.object().shape({
        itemId: Yup.string().required('Item is required'),
        price: Yup.number().required('Price is required'),
        customerId: Yup.string().required('Customer is required'),
        deliveryVehicleId: Yup.string().required('Delivery vehicle is required'),
    });

    const formik = useFormik({
        initialValues: OrderForm,
        validationSchema: OrderSchema,
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            db.collection("orders").add({
                ...values,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
            setIsFormOpen(false);
            resetForm();
        },
    });

    const handleItem = (e) => {
        formik.values.price = items.filter(i=> i.id === e.target.value)[0].data.price;
        formik.handleChange(e);
    }

    useEffect(() => {
        db.collection("orders").orderBy("timestamp", "desc").onSnapshot(snapshot => {
            setOrders(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
        })
        db.collection("items").orderBy("timestamp", "desc").onSnapshot(snapshot => {
            setItems(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
        })
        db.collection("customers").orderBy("timestamp", "desc").onSnapshot(snapshot => {
            setCustomers(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
        })
    }, [])

    useEffect(() => {
        db.collection("vehicles").orderBy("timestamp", "desc").onSnapshot(snapshot => {
            setVehicles(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
            setAvailableVehicles(vehicles.filter(v => !(orders.map(o => o.data.deliveryVehicleId).includes(v.id))))
        })
    }, [orders, vehicles])

    return (
        <div>
            
            <TopBar as="order" handleAdd={() => setIsFormOpen(true)}/>

            <Dialog open={isFormOpen} onClose={() => setIsFormOpen(false)} >
                <DialogTitle id="alert-dialog-title">{"Add Order Details"}</DialogTitle>
                <DialogContent>
                <div className="forms">
                    <form onSubmit={formik.handleSubmit}>
                        <label>Select Item</label>
                        <select id="itemId" name="itemId" onChange={handleItem} value={formik.values.itemId}>
                            <option value="" hidden />
                            {items.map(i=> <option key={i.id} value={i.id}>{i.data.name}</option> )}
                        </select>
                        {formik.errors.itemId && formik.touched.itemId ? <div className="formerror">{formik.errors.itemId}</div> : null}
                        
                        <label>Price</label>
                        <input id="price" name="price" type="number" disabled
                            onChange={formik.handleChange} value={formik.values.price}
                        />
                        {formik.errors.price && formik.touched.price ? <div className="formerror">{formik.errors.price}</div> : null}
                        
                        <label>Select Customer</label>
                        <select id="customerId" name="customerId" onChange={formik.handleChange} value={formik.values.customerId}>
                            <option value="" hidden />
                            {customers.map(c=> <option key={c.id} value={c.id}>{c.data.name}</option>)}
                        </select>
                        {formik.errors.customerId && formik.touched.customerId ? <div className="formerror">{formik.errors.customerId}</div> : null}
                        
                        <label>Select vehicle</label>
                        <select id="deliveryVehicleId" name="deliveryVehicleId" onChange={formik.handleChange} value={formik.values.deliveryVehicleId}>
                            <option value="" hidden />
                            {
                                availableVehicles.length > 0
                                ?
                                availableVehicles.map(v=><option key={v.id} value={v.id}>{v.data.registrationNumber}</option>)
                                :
                                <option value="" disabled >Vehicle unavailable</option>
                            }
                        </select>
                        {formik.errors.deliveryVehicleId && formik.touched.deliveryVehicleId ? <div className="formerror">{formik.errors.deliveryVehicleId}</div> : null}

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
                content={orders} 
            />

        </div>
    )
}

export default Order
