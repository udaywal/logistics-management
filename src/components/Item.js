import React, { useState, useEffect } from 'react';

import firebase from 'firebase';
import db from '../firebase';
import TableComponent from './TableComponent';
import TopBar from './TopBar';

import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';

import { useFormik } from 'formik';
import * as Yup from 'yup';

function Item() {

    const [items, setItems] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const ItemForm = {
        name: '',
        price: ''
    }

    const ItemSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        price: Yup.number().required('Price is required')
    });

    const formik = useFormik({
        initialValues: ItemForm,
        validationSchema: ItemSchema,
        onSubmit: (values, { resetForm }) => {
            db.collection("items").add({
                ...values,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
            setIsFormOpen(false);
            resetForm();
        },
      });

    useEffect(() => {
        db.collection("items").orderBy("timestamp", "desc").onSnapshot(snapshot => {
            setItems(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
        })
    }, [])

    return (
        <div>
            
            <TopBar as="item" handleAdd={() => setIsFormOpen(true)}/>

            <Dialog open={isFormOpen} onClose={() => setIsFormOpen(false)} >
                <DialogTitle id="alert-dialog-title">{"Add Item Details"}</DialogTitle>
                <DialogContent>
                <div className="forms">
                    <form onSubmit={formik.handleSubmit}>
                        <label>Name</label>
                        <input id="name" name="name" type="text"
                            onChange={formik.handleChange} value={formik.values.name}
                        />
                        {formik.errors.name && formik.touched.name ? <div className="formerror">{formik.errors.name}</div> : null}

                        <label>Price</label>
                        <input id="price" name="price" type="number"
                            onChange={formik.handleChange} value={formik.values.price}
                        />
                        {formik.errors.price && formik.touched.price ? <div className="formerror">{formik.errors.price}</div> : null}

                        <button type="submit">Submit</button>
                    </form>
                </div>
                </DialogContent>
            </Dialog>

            <TableComponent heading={[{ name: "Name", value: "name" }, { name: "Price", value: "price" }]} content={items} />

        </div>
    )
}

export default Item
