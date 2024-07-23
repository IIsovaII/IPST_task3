import React, {useState} from 'react';
import {Modal, Box, Button, Typography} from '@mui/material';
import {deleteFile, deleteFolder, newFolder, showFolder} from "../services/api";
import DeleteIcon from '@mui/icons-material/Delete';

const style = {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3
};



function DeleteModal(data) {
    data = data.data;
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    async function Del(){
        if (data['type'] === 'folder'){
            await deleteFolder(data['id']);
        }
        else{
            await deleteFile(data['id']);
        }
        setOpen(false);
    }

    return (
        <>
            <Button onClick={handleOpen}><DeleteIcon />Delete</Button>

            <Modal open={open} onClose={handleClose}>
                <Box sx={{...style, width: 300}}>
                    <Typography variant='h4'>Do you want to delete this {data.type}?</Typography>

                    <Button onClick={() => Del()}>Ok</Button>
                    <Button onClick={() => setOpen(false)}>Отмена</Button>
                </Box>
            </Modal>
        </>
    );
}


export default DeleteModal;