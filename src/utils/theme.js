import { createMuiTheme, makeStyles } from "@material-ui/core";

export const muiTheme = createMuiTheme({
    typography: {
      fontFamily: `'Poppins', 'Helvetica', 'Arial', sans-serif`,
    }
});

export const muiTableStyle = makeStyles((theme) => ({
    tableContainer: {
        fontFamily: "'Poppins', sans-serif",
        maxWidth: 800,
    },
    tableHeaderCell: {
        fontWeight: 'bold',
    },
    tableRow: {
        padding: '0 px',
        margin: '0 px'
    },
}));