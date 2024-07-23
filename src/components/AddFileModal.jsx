import React, {useState} from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import App from "../App";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import {newFile, newFolder, showFolder} from "../services/api";

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

async function setNewFile(file, parentId){
    await newFile(parentId,file);
    showFolder(parentId).then(console.log);
}

function AddFileModal(Id) {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState();
    let reader = new FileReader();

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    async function fileToBinary(file){
        console.log(typeof file);
        reader.readAsBinaryString(file);
        await setNewFile(file, Id.Id);
    }



    return (
        <>
            <Button onClick={handleOpen}><UploadFileIcon />Add file</Button>
            <Modal open={open} onClose={handleClose}>
                <Box sx={{...style, width: 300}}>
                    <h2>Add file</h2>

                    <TextField
                        autoFocus
                        required //обязательно для заполнения
                        margin="dense"
                        id="name"
                        name="file"
                        type="file"
                        fullWidth
                        variant="standard"
                        value={file}
                        onChange={(e) => setFile(e.target.value)}
                    />

                    <Button onClick={() => {fileToBinary(file); setOpen(false)}}>Ok</Button>
                    <Button onClick={() => setOpen(false)}>Отмена</Button>
                </Box>
            </Modal>
        </>
    );
}


export default AddFileModal;