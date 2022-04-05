import React, { useState } from 'react';

import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import StationsForm from './StationsForm.jsx';

const DialogPopup = (props) => {
    const { onClose, open } = props;

    const handleClose = () => {
        onClose({});
    }

    const handleFormSubmit = (formState) => {
        onClose(formState)
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Add New Station</DialogTitle>
            <DialogContent>
                <StationsForm onSubmit={handleFormSubmit}/>
            </DialogContent>
        </Dialog>
    );
};

// Make Dialog props required
DialogPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

const StationsDialog = (props) => {
    // Destructure onSubmit functions from props
    const { onSubmit } = props;

    // Keep track of dialog being open
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = (formState) => {
        // If the form is not empty (when user exits form), submit the form
        // data to the server
        if (Object.keys(formState).length > 0) {
            onSubmit(formState);
        }
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleOpen}>
                Add Station
            </Button>
            <DialogPopup
                open={open}
                onClose={handleClose}
            />
        </div>
    );
};

export default StationsDialog;