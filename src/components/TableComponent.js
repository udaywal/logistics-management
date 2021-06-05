import React from 'react';

import { muiTableStyle } from "../utils/theme";

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';


function TableComponent({ heading, content }) {

    const tableClasses = muiTableStyle();

    return (
        <TableContainer component={Paper} className={tableClasses.tableContainer}>
            <Table>
                <TableHead>
                    <TableRow>
                        {heading.map(h => (
                            <TableCell key={h} className={tableClasses.tableHeaderCell}>{h}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {content.map((c) => (
                        <TableRow key={c.id} className={tableClasses.tableRow}>
                            <TableCell>
                                <div>{c.data.registrationNumber}</div>
                            </TableCell>
                            <TableCell>
                                <div>{c.data.vehicleType}</div>
                            </TableCell>
                            <TableCell>
                                <div>{c.data.city}</div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TableComponent
