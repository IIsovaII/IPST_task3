import React, {useEffect, useState} from "react";
import {Typography, Grid, Container, Button} from "@mui/material";
import {showFolder} from "../services/api";
import AddFolderModal from "./AddFolderModal";
import AddFileModal from "./AddFileModal";
import {Folder} from "@mui/icons-material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditFolderModal";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Workplace() {
    const [currentId, setCurrentId] = useState('root');
    const [currentData, setCurrentData] = useState({});
    const [selectedItem, setSelectedItem] = useState({});
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        const loadData = async () => {
            try {
                if (localStorage.getItem('login')) {
                    getData(currentId);

                }
            } catch (error) {
                console.error('Error in workplace:', error);
            }
        }
        loadData();
    }, []);

    function changeOpenModal(){
        if (openModal){
            getData(currentId);
        }
        setOpenModal(!openModal);
    }


    function getData(id) {
        showFolder(id)
            .then((data) =>
                setCurrentData(data)
            )
    }

    const style = {
        boxShadow: 1,
        borderRadius: 2,
        height: 150,
        width: 120,
        textAlign: 'center',
        alignContent: 'center'
    }

    function openFolder(){
        setCurrentId(selectedItem.id);

        getData(selectedItem.id)
        console.log(selectedItem);
        if (selectedItem.type === 'folder'){
            setCurrentId(selectedItem.id);
            getData(selectedItem.id)
        }
    }

    function Item(data) {
        data = data.data;
        return (
            <Grid
                sx={style}
                onMouseDown={() => {setSelectedItem(data); console.log(data)}}
                onDoubleClick={openFolder}
            >
                {data.type === 'folder' ? <Folder fontSize='large'/> : <InsertDriveFileIcon fontSize='large'/>}

                <Typography variant='h5' style={{
                    textDecoration: selectedItem && selectedItem.id === data.id ? 'underline ' : 'none',
                }}>{data.name}</Typography>
            </Grid>
        );
    }

    if (localStorage.getItem('login')) {
        let listItems = <Typography>Loading...</Typography>;
        if (currentData['children']) {
            listItems = currentData['children'].map((value) => <Item data={value}/>);
        }

        return (
            <Container>
                <Typography>{currentData['name']}</Typography>


                <Button onClick={() => {
                    setCurrentId('root');
                    getData('root')
                }}><ArrowBackIcon/>Root</Button>

                <AddFileModal Id={currentId}/>
                <AddFolderModal Id={currentId}/>
                <DeleteModal data={selectedItem}/>
                <EditModal data={selectedItem}/>


                <Button onClick={() => getData(currentId)}>Reload files</Button>

                <Grid
                    container
                    maxWidth="sm"
                    marginLeft='auto'
                    marginRight='auto'
                    gap='10px'
                    justifyContent='center'
                >
                    {listItems}
                </Grid>
            </Container>
        )
    } else {
        return (<Typography>Please log in.</Typography>)
    }
}