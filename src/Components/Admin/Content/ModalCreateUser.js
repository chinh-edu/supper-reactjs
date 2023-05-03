import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postCreateNewUser } from '../../../service/apiServices'

const ModalCreateUser = (props) => {
    const { show, setShow, fetchListUsersWithPaginate, setCurrentPage } = props;

    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('USER')

    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState('')
    const handleUploadImg = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setImagePreview(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0])
        }
    }

    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(false);
    const handleOnChangeEmail = (event) => {
        setEmail(event.target.value)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValid(emailRegex.test(event.target.value));
    }


    const handleClose = (event) => {
        setShow(false);
        setEmail('');
        setPassword('');
        setUsername('');
        setRole('USER');
        setImage('')
        setIsValid(false)
    }

    const handleSave = async (props) => {
        // if (isValid === false) {
        //     toast.error("Your email invalid");
        //     return;
        // }
        if (password.length <= 5) {
            toast.warning('Please enter your password');
            return;
        }
        let data = await postCreateNewUser(email, password, username, role, image)
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            setCurrentPage(1);
            await fetchListUsersWithPaginate(1);
        } else {
            toast.error(data.EM);
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size='xl'
                backdrop='static'
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(event) => handleOnChangeEmail(event)}
                            />
                            {
                                isValid === true ? <p style={{ color: 'green' }}>Email valid</p> : email.length > 0 ? <p style={{ color: 'red' }}>Email is invalid</p> : null
                            }
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            Please enter 6 or more characters
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select className="form-select" value={role} onChange={(event) => setRole(event.target.value)}>
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                        <div className='col-md-12'>
                            <label className="form-label label-upload" htmlFor='labelUpload' >
                                <FcPlus />Upload File Image
                            </label>
                            <input
                                type='file'
                                id='labelUpload'
                                hidden
                                onChange={(event) => handleUploadImg(event)}
                            />
                        </div>
                        <div className='col-md-12 img-review'>
                            {image ?
                                <img src={imagePreview} alt="nice" />
                                :
                                <span>Preview image</span>
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSave()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    )
}
export default ModalCreateUser;