import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function SimpleSnackbar({ keyProp, error, onClose }) {
    const [open, setOpen] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    React.useEffect(() => {
        setErrorMessage(error || "Note archived");
        setOpen(true);
    }, [error, keyProp]); // Include keyProp in the dependency array

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        if (onClose) {
            onClose();
        }
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <Snackbar
            key={keyProp}  
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={errorMessage}
            action={action}
        />
    );
}
