import React, {useEffect, useState} from "react";
import {Typography, Grid, Container, Button, Box, Stack} from "@mui/material";
import {showFolder} from "../services/api";
import AddFolderModal from "./AddFolderModal";
import {Folder} from "@mui/icons-material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteModal from "./DeleteModal";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditModal from "./EditModal";
import MoveModal from "./movingFolderModal";
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import AddFileModal from "./AddFileModal2";

export default function Workplace() {
    const [path, setPath] = useState([["root", "root"]]);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openNewFileModal, setOpenNewFileModal] = useState(false);
    const [openNewFolderModal, setOpenNewFolderModal] = useState(false);
    const [openMoveModal, setOpenMoveModal] = useState(false);
    const [currentData, setCurrentData] = useState({});
    const [selectedItem, setSelectedItem] = useState();

    useEffect(() => {
        const loadData = async () => {
            try {
                if (localStorage.getItem("login")) {
                    getData();
                }
            } catch (error) {
                console.error("Error in workplace:", error);
            }
        };
        loadData();
    }, [path]);

    function getData() {
        setSelectedItem({});
        showFolder(path[path.length - 1][0]).then((data) =>
            setCurrentData(data),
        );
    }

    const styleBox = {
        boxShadow: 1,
        borderRadius: 2,
        height: 150,
        width: 120,
        textAlign: "center",
        alignContent: "center",
    };

    function openFolder() {
        setPath([...path, [selectedItem.id, selectedItem.name]]);
    }

    function goBack() {
        if (path.length > 1) {
            setPath(path.slice(0, path.length - 1));
        }
    }

    function setOpenDelete(b) {
        setOpenDeleteModal(b);
        if (!b) {
            getData();
        }
    }

    function setOpenEdit(b) {
        setOpenEditModal(b);
        if (!b) {
            getData();
        }
    }

    function setOpenNewFile(b) {
        setOpenNewFileModal(b);
        if (!b) {
            getData();
        }
    }

    function setOpenMove(b) {
        setOpenMoveModal(b);
        if (!b) {
            getData();
        }
    }

    function setOpenNewFolder(b) {
        setOpenNewFolderModal(b);
        if (!b) {
            getData();
        }
    }

    let Item = (data) => {
        data = data.data;

        return (
            <Grid
                sx={styleBox}
                onMouseDown={() => {
                    setSelectedItem(data);
                }}
                onDoubleClick={openFolder}
            >
                {data.type === "folder" ? (
                    <Folder fontSize="large"/>
                ) : (
                    <InsertDriveFileIcon fontSize="large"/>
                )}

                <Typography
                    variant="h5"
                    style={{
                        textDecoration:
                            selectedItem && selectedItem.id === data.id
                                ? "underline"
                                : "none",
                    }}
                >
                    {data.type ==='folder'? data.name: data.file.name}
                </Typography>
            </Grid>
        );
    };

    let FuncMenu = () => {
        try {
            return (
                <Grid margin={2}>
                    {path[path.length - 1][0] !== "root" && (
                        <Button
                            onClick={goBack}
                            variant="outlined"
                            startIcon={<ArrowBackIcon/>}
                        >
                            Back
                        </Button>
                    )}
                    <Button
                        variant="outlined"
                        onClick={() => setOpenNewFile(true)}
                        startIcon={<NoteAddIcon/>}

                    >
                        Add File
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            setOpenNewFolder(true);
                        }}
                        startIcon={<CreateNewFolderIcon/>}
                    >
                        Add Folder
                    </Button>
                    {selectedItem !== {} && selectedItem.type && (
                        <Button
                            variant="outlined"
                            onClick={() => {
                                setOpenDelete(true);
                            }}
                            startIcon={<DeleteIcon/>}

                        >
                            Delete
                        </Button>
                    )}
                    {selectedItem !== {} && selectedItem.type === "folder" && (
                        <Button
                            variant="outlined"
                            onClick={() => {
                                setOpenEdit(true);
                            }}
                            startIcon={<ModeEditIcon/>}

                        >
                            Edit
                        </Button>
                    )}
                    {selectedItem !== {} && selectedItem.type === "folder" && (
                        <Button
                            variant="outlined"
                            onClick={() => {
                                setOpenMove(true);
                            }}
                            startIcon={<DriveFileMoveIcon/>}
                        >
                            Moving
                        </Button>
                    )}
                </Grid>
            );
        } catch (error) {
            return (
                <Grid margin={2}>
                    {path[path.length - 1][0] !== "root" && (
                        <Button
                            onClick={goBack}
                            variant="outlined"
                            startIcon={<ArrowBackIcon/>}
                        >
                            Back
                        </Button>
                    )}
                    <Button
                        variant="outlined"
                        onClick={() => setOpenNewFile(true)}
                        startIcon={<NoteAddIcon/>}
                    >
                        Add File
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            setOpenNewFolder(true);
                        }}
                        startIcon={<CreateNewFolderIcon/>}

                    >
                        Add Folder
                    </Button>
                </Grid>
            );
        }
    };

    if (localStorage.getItem("login")) {
        let listItems = <Typography>Empty folder.</Typography>;
        if (currentData["children"]) {
            listItems = currentData["children"].map((value) => (
                <Item data={value}/>
            ));
        }

        let listPath = path.map((value) => <text>{value[1]}/ </text>);

        return (
            <Container maxWidth={"md"}>
                <Box
                    component="section"
                    sx={{p: 1, borderBottom: "1px solid", margin: "10px"}}
                >
                    PATH: {listPath}
                </Box>
                <FuncMenu/>

                <DeleteModal
                    data={selectedItem}
                    open={openDeleteModal}
                    setOpen={setOpenDelete}
                />
                <AddFolderModal
                    Id={path[path.length - 1][0]}
                    open={openNewFolderModal}
                    setOpen={setOpenNewFolder}
                />
                <EditModal
                    item={selectedItem}
                    path={path}
                    open={openEditModal}
                    setOpen={setOpenEdit}
                />
                <MoveModal
                    item={selectedItem}
                    open={openMoveModal}
                    setOpen={setOpenMove}
                />
                <AddFileModal
                    Id={path[path.length - 1][0]}
                    open={openNewFileModal}
                    setOpen={setOpenNewFile}
                />

                <Grid
                    container
                    maxWidth="sm"
                    marginLeft="auto"
                    marginRight="auto"
                    gap="10px"
                    justifyContent="center"
                >
                    {listItems}
                </Grid>
            </Container>
        );
    } else {
        return <Typography>Please log in.</Typography>;
    }
}
