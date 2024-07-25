import React, {useState} from 'react';
import {Modal, Box, TextField, Button, Typography} from '@mui/material';
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

export default function AddFolderModal(data) {
    const open = data.open;
    const setOpen = data.setOpen;
    const Id = data.Id;

    const [nameVal, setName] = useState("");

    async function AddFolder(name, id){
        await setNewFolder(name, id);
        setOpen(false);
    }

    return (
        <Modal open={open} onClose={() => {setOpen(false)}}>
            <div>
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

                    <Button onClick={() => AddFolder(nameVal, Id)}>Ok</Button>
                    <Button onClick={() => setOpen(false)}>Отмена</Button>
                </Box>
            </div>
        </Modal>
    );

}