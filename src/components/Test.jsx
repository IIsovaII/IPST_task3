import React, {useEffect, useState} from "react";
import {Typography, Grid, Container, Button, Box} from "@mui/material";
import {showFolder} from "../services/api";
import AddFolderModal from "./AddFolderModal";
import AddFileModal from "./AddFileModal";
import {Folder} from "@mui/icons-material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteModal from "./DeleteModal2";
import EditModal from "./EditFolderModal";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Workplace() {
    const [path, setPath] = useState([['root', 'root']]);
    // const [pathName, setPathName] = useState(['root']);
    const [openModal, setOpenModal] = useState(false);
    const [currentData, setCurrentData] = useState({});
    const [selectedItem, setSelectedItem] = useState();

    useEffect(() => {
        const loadData = async () => {
            try {
                if (localStorage.getItem('login')) {
                    getData();
                }
            } catch (error) {
                console.error('Error in workplace:', error);
            }
        }
        loadData();
    }, [path]);



    function getData(){
        setSelectedItem({});
        showFolder(path[path.length - 1][0])
            .then((data) =>
                setCurrentData(data)
            )
    }

    const styleBox = {
        boxShadow: 1,
        borderRadius: 2,
        height: 150,
        width: 120,
        textAlign: 'center',
        alignContent: 'center'
    }

    function openFolder(){
        setPath([...path, [selectedItem.id, selectedItem.name]]);
        // setPathName([...pathName, selectedItem.name]);
        getData();
    }

    function goBack(){
        if (path.length > 1){
            setPath(path.slice(0, path.length - 1));
            // setPathName(pathName.slice(0, pathName.length - 1));
        }
    }

    function setOpen(b){
        setOpenModal(b);
        if (!b){
            getData();
        }
    }

    let Item = (data) => {
        data = data.data;

        return (<Grid
           sx={styleBox}
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

    let FuncMenu = () => {
        try {
            return(
                <>
                    {path[path.length - 1][0]!=='root' && <Button onClick={goBack}><ArrowBackIcon/>Back</Button>}
                    <Button>Add File</Button>
                    <Button>Add Folder</Button>
                    {selectedItem !== {} && selectedItem.type && <Button onClick={() => {setOpen(true); console.log(selectedItem)}}>Delete</Button>}
                    {selectedItem !== {} && selectedItem.type === 'folder' && <Button>Edit</Button>}
                </>
            )
        } catch (error){
            return(
                <>
                    {path[path.length - 1][0]!=='root' && <Button onClick={goBack}><ArrowBackIcon/>Back</Button>}
                    <Button>Add File</Button>
                    <Button>Add Folder</Button>
                </>
            )
        }
    }


    if (localStorage.getItem('login')) {
        let listItems = <Typography>Empty folder.</Typography>;
        if (currentData['children']) {
            listItems = currentData['children'].map((value) => <Item data={value}/>);
        }

        let listPath = path.map((value) => <text>{value[1]}/ </text>)

        return (
            <Container maxWidth={'md'}>

                <Box component="section" sx={{ p: 1, borderBottom: '1px solid', margin: '10px' }} >PATH: {listPath}</Box>
                <FuncMenu/>

                <DeleteModal data={selectedItem} open={openModal} setOpen={setOpen}/>

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
    }
    else{
        return (<Typography>Please log in.</Typography>)
    }

}