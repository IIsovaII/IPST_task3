import React, {useState} from 'react';
import {Modal, Box, Button, Typography, TextField} from '@mui/material';
import {editFolder, showFolder} from "../services/api";
import ModeIcon from '@mui/icons-material/Mode';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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


export default function EditModal(data) {
    data = data.data;
    const [open, setOpen] = useState(false);
    const [nameVal, setName] = useState("");

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    async function Edit(nameVal) {
        await editFolder(data['id'], data['parentId'], nameVal);
        console.log(data['parentId']);
        showFolder(data['parentId']).then(console.log);
        setOpen(false);
    }

    return (
        <>
            <Button onClick={handleOpen}><ModeIcon/>Edit</Button>

            <Modal open={open} onClose={handleClose}>
                <Box sx={{...style, width: 300}}>
                    <Typography variant='h4'>Enter a new folder name</Typography>

                    <TextField
                        autoFocus
                        required //обязательно для заполнения
                        margin="dense"
                        id="name"
                        name='text'
                        type="text"
                        label={data.name}
                        fullWidth
                        variant="standard"
                        value={nameVal}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <Button onClick={() => Edit(nameVal)}>Edit</Button>
                    <Button onClick={() => setOpen(false)}>Отмена</Button>
                </Box>
            </Modal>
        </>
    );
}