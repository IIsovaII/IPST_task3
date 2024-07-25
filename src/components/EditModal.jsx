import React, {useState} from 'react';
import {Modal, Box, TextField, Button} from '@mui/material';
import {editFolder} from "../services/api";

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
    const [newName, setName] = useState('');


    async function Edit(newName) {
        await editFolder(data.item.id, data.path[data.path.length - 1][0], newName);
        data['setOpen'](false);
    }


    return (
        <Modal open={data['open']} onClose={() => {
            data['setOpen'](false)
        }}>
            <div>
                <Box sx={{...style, width: 300}}>
                    <h2>Edit folder</h2>

                    <TextField
                        autoFocus
                        required //обязательно для заполнения
                        margin="dense"
                        id="name"
                        name="title"
                        label='enter new label'
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newName}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <Button onClick={() => Edit(newName)}>Ok</Button>
                    <Button onClick={() => data['setOpen'](false)}>Отмена</Button>
                </Box>
            </div>
        </Modal>
    );
}