
import './addPromotion.css';
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from "@material-ui/core/styles";
import Swal from 'sweetalert2'

const useStyles = makeStyles((theme) => ({
    input: {
        textAlign: 'center',
    },
    root: {
        "& .MuiTextField-root": {
            background: "red",
        },
    },
    box: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#fff',
        width: '100%',
        borderRadius: '10px',
        "@media only screen and (max-width: 500px) ": {
            backgroundColor: "rgb(232, 241, 250)"
        }
    }
}));

function AddPormotion() {
    const classes = useStyles();
    const [message, setMessage] = useState('');
    const [image, setImage] = useState('');
    const [url, setUrl] = useState('');
    const [buttonSave, setButtonSave] = useState(true);

    const handleMessageChange = event => {
        setMessage(event.target.value);
        chk();
    };
    const handleImageChange = event => {
        setImage(event.target.value);
        chk();
    };
    const handleUrlChange = event => {
        setUrl(event.target.value);
        chk();
    };

    const chk = () => {
        if (message && image && url) {
            setButtonSave(false);
        } else {
            setButtonSave(true);
        }
    }

    const save = async () => {
        try {
            const rawResponse = await fetch('https://api-line-promotion.onrender.com/api/v1/promotion', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ image: image, message: message, url: url, active: true })
            });
            const content = await rawResponse.json();
            if (content.statusCode == '200') {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                })
                setMessage('')
                setImage('')
                setUrl('')
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: content.message,
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })
            }
        } catch (e) {
            Swal.fire({
                title: 'Error!',
                text: e.message,
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }

    }
    return (
        <>
            {/* <div className='main'> */}
            <Box
                component="form"
                className={classes.box}
                sx={{
                    '& > :not(style)': {
                        m: 1,
                        width: '50%',
                        backgroundColor: '#fff',
                        textAlign: 'center',
                        margin: '15px 0'

                    },
                }}
                noValidate
                autoComplete="off"
            >
                <p>Add Promotion</p>
                <TextField
                    className={classes.root}
                    InputProps={{ className: classes.input }}
                    id="outlined-basic"
                    label="message"
                    variant="outlined"
                    value={message}
                    onChange={handleMessageChange}
                />
                <TextField
                    className={classes.root}
                    InputProps={{ className: classes.input }}
                    id="outlined-basic"
                    label="image"
                    variant="outlined"
                    value={image}
                    onChange={handleImageChange}
                />
                <TextField
                    className={classes.root}
                    InputProps={{ className: classes.input }}
                    id="outlined-basic"
                    label="url"
                    variant="outlined"
                    value={url}
                    onChange={handleUrlChange}
                />
                <Button
                    variant="outlined"
                    style={{
                        fontSize: "12px",
                        width: "100px"
                    }}
                    disabled={buttonSave}
                    onClick={save}
                >
                    Save
                </Button>
            </Box>
            {/* </div> */}
        </>
    );
}

export default AddPormotion;
