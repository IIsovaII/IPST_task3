import React, {useState} from 'react';
import {Modal, Box, TextField, Button, Typography} from '@mui/material';
import {newFile, showFolder} from "../services/api";


export default function AddFileModal(data) {
    const open = data.open;
    const setOpen = data.setOpen;
    const Id = data.Id;

    const [loafFile, setFile] = useState();

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

    async function setNewFile(file, parentId= 'root'){
        console.log('FileModal', file);
        await newFile(parentId,file);
        showFolder(parentId).then(console.log);
    }

    async function AddFile(file){
        await setNewFile(file, Id);
        setOpen(false);
        setFile();
    }
    
    return (
        <Modal open={open} onClose={() => {setOpen(false)}}>
            <div>
                <Box sx={{...style, width: 300}}>
                    <h2>Add folder</h2>

                    <input
                        autoFocus
                        required //обязательно для заполнения
                        // margin="dense"
                        id="file"
                        name="title"
                        // label="File"
                        type="file"
                        // fullWidth
                        // variant="standard"
                        // value={loafFile}
                        onChange={(e) => setFile(e.target.files[0])}
                    />

                    <Button onClick={() => AddFile(loafFile)}>Ok</Button>
                    <Button onClick={() => setOpen(false)}>Отмена</Button>
                </Box>
            </div>
        </Modal>
    );

}