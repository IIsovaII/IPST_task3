import React, {useState} from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import App from "../App";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import {newFolder, showFolder} from "../services/api";

const style = {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3
};

async function setNewFolder(name, parentId= 'root'){
    await newFolder(parentId,name);
    showFolder(parentId).then(console.log);
}

function AddFolderModal(Id) {
    const [nameVal, setName] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button onClick={handleOpen}><CreateNewFolderIcon />Add folder</Button>
            <Modal open={open} onClose={handleClose}>
                <Box sx={{...style, width: 300}}>
                    <h2>Add folder</h2>

                    <TextField
                        autoFocus
                        required //обязательно для заполнения
                        margin="dense"
                        id="name"
                        name="title"
                        label="Folder name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={nameVal}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <Button onClick={() => {setOpen(false); setNewFolder(nameVal, Id.Id)}}>Ok</Button>
                    <Button onClick={() => setOpen(false)}>Отмена</Button>
                </Box>
            </Modal>
        </>
    );
}


export default AddFolderModal;