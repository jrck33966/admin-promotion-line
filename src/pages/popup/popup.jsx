import React, { useState, useEffect } from 'react';
import "./popup.css";
import Swal from 'sweetalert2'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { makeStyles } from "@material-ui/core/styles";
import { useCookies } from 'react-cookie';

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


export const Popup = ({ type, data, closePopup }) => {
    const classes = useStyles();
    const [message, setMessage] = useState('');
    const [image, setImage] = useState('');
    const [url, setUrl] = useState('');
    const [active, setActive] = useState('ture');
    const [title, setTitle] = useState('');
    const [cookies, removeCookie] = useCookies(['token']);

    const handleMessageChange = event => {
        setMessage(event.target.value);
    };
    const handleImageChange = event => {
        setImage(event.target.value);

    };
    const handleUrlChange = event => {
        setUrl(event.target.value);

    };

    const handleActiveChange = event => {
        setActive(event.target.value);

    };

    useEffect(() => {
        if (type === 'edit') {
            setMessage(data.message)
            setImage(data.image)
            setUrl(data.url)
            setActive(data.active)
            setTitle('Edit Promotion')
        } else {
            setTitle('Add Promotion')
        }

    }, []);

    const edit = async () => {
        try {
            const rawResponse = await fetch('https://api-promotion-line-production.up.railway.app/api/v1/promotion', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authentication': `Bearer ${cookies.token}`
                },
                body: JSON.stringify({
                    id: data.id,
                    update: {
                        message: message,
                        image: image,
                        url: url,
                        active: active
                    }
                })
            });
            const content = await rawResponse.json();
            if (content.statusCode === '200') {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                })
                closePopup();
            } else if (content.statusCode === '401') {
                removeCookie('token')
                Swal.fire({
                    title: 'Error!',
                    text: content.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            } else {
                removeCookie('token')
                Swal.fire({
                    title: 'Error!',
                    text: content.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
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

    const save = async () => {
        try {
            const rawResponse = await fetch('https://api-promotion-line-production.up.railway.app/api/v1/promotion', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authentication': `Bearer ${cookies.token}`
                },
                body: JSON.stringify({ image: image, message: message, url: url, active: true })
            });
            const content = await rawResponse.json();
            if (content.statusCode === '200') {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                })
                closePopup();
            } else if (content.statusCode === '401') {
                removeCookie('token')
                Swal.fire({
                    title: 'Error!',
                    text: content.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }
            else {
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
        <div className="popup-container">
            <div className="popup-body">
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
                        <p>{title}</p>
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
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Active</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignContent: 'center'
                                }}
                                value={active}
                                onChange={handleActiveChange}
                            >
                                <FormControlLabel value="true" control={<Radio />} label="true" />
                                <FormControlLabel value="false" control={<Radio />} label="false" />

                            </RadioGroup>
                        </FormControl>
                        <div className='button'>
                            <Button
                                variant="contained"
                                color="success"
                                style={{
                                    fontSize: "12px",
                                    width: "100px"
                                }}
                                onClick={type === 'add' ? save : edit}
                            >
                                Save
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                style={{
                                    fontSize: "12px",
                                    width: "100px"
                                }}
                                onClick={closePopup}
                            >
                                Close
                            </Button>
                        </div>

                    </Box>
                    {/* </div> */}
                </>
            </div>
        </div>
    );
};