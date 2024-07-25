import React, {useEffect, useState} from 'react';
import {Modal, Box, Button, Typography, Grid} from '@mui/material';
import {editFolder, showFolder} from "../services/api";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FolderIcon from '@mui/icons-material/Folder';

const style = {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    backgroundColor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3
};

export default function MoveModal(data) {
    const [path, setPath] = useState([["root", "root"]]);
    const [selectedItem, setSelectedItem] = useState();
    const [currentData, setCurrentData] = useState({});

    useEffect(() => {
        const loadData = async () => {
            try {
                if (localStorage.getItem("login")) {
                    getData();
                }
            } catch (error) {
                console.error("Error in moving modal:", error);
            }
        };
        loadData();
    }, [path]);

    function openFolder() {
        setPath([...path, [selectedItem.id, selectedItem.name]]);
    }

    let Item = (data) => {
        data = data.data;

        return (
            <Button
                fullWidth
                startIcon={<FolderIcon/>}
                style={{
                    textDecoration:
                        selectedItem && selectedItem.id === data.id
                            ? "underline"
                            : "none",
                }}
                onMouseDown={() => setSelectedItem(data)}
                onDoubleClick={openFolder}
            >
                {data.name}
            </Button>
        );
    };

    function goBack() {
        if (path.length > 1) {
            setPath(path.slice(0, path.length - 1));
        }
    }


    function getData() {
        setSelectedItem({});
        showFolder(path[path.length - 1][0]).then((data) =>
            setCurrentData(data),
        );
    }

    let listItems = <Typography>Empty folder.</Typography>;
    if (currentData["children"]) {
        listItems = currentData["children"].map((value) => (
            (value.type === 'folder' && value.id !== data.item.id) ? <Item data={value}/> : <text/>
        ));
    }

    let listPath = path.map((value) => <text>{value[1]}/ </text>);

    async function Edit() {
        await editFolder(data.item.id, path[path.length -1][0], data.item.name);
        data['setOpen'](false);
    }

    return (
        <Modal open={data['open']} onClose={() => {data['setOpen'](false)}}>
            <div>
                <Box sx={{...style, width: 300}}>
                    <h2>Move folder to...</h2>

                    <Box
                        component="section"
                        sx={{p: 1, borderBottom: "1px solid", margin: "5px"}}
                    >
                        PATH: {listPath}
                    </Box>

                    {path[path.length - 1][0] !== "root" && (
                        <Button
                            onClick={goBack}
                            variant="outlined"
                            startIcon={<ArrowBackIcon/>}
                        >
                            Back
                        </Button>
                    )}

                    <Grid
                        container
                        maxWidth="sm"
                        marginLeft="auto"
                        marginRight="auto"
                        gap="10px"
                        justifyContent="center"
                        border='1px solid grey'
                        margin='5px'
                    >
                        {listItems}
                    </Grid>

                    <Button onClick={() => {Edit()}}>Ok</Button>
                    <Button onClick={() => data['setOpen'](false)}>Отмена</Button>
                </Box>
            </div>
        </Modal>
    );
}