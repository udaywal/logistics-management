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
                            <TableCell key={h.name} className={tableClasses.tableHeaderCell}>{h.name}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {content.map((c) => (
                        <TableRow key={c.id} className={tableClasses.tableRow}>
                            {heading.map(h => (
                                <TableCell key={h.value}>
                                    <div>{c.data[h.value]}</div>
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TableComponent
