import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { postCreateNewUser } from '../../../service/apiServices'
import { toast } from 'react-toastify';


export default function ModalCreateUser(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
        setEmail('');
        setPassword('');
        setUserName('');
        setRole('USER');
        setSelectedImage(null);
    };
    const handleShow = () => setShow(true);

    //state and customize email
    const [email, setEmail] = useState('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //state and customize password
    const [password, setPassword] = useState('');

    //state and customize user name
    const [userName, setUserName] = useState('');

    //state and customize role
    const [role, setRole] = useState('USER');

    //state and customize image
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const handleImageChange = (e) => {
        if (e.target && e.target.value && e.target.value[0]) {
            const fileImage = e.target.files[0];
            setSelectedImage(fileImage);
            setPreviewImage(URL.createObjectURL(fileImage));
        }
    };
    //SaveChange Click
    const handleCreateNewUser = async () => {
        //validate email
        if (!email.match(emailRegex)) {
            toast.warning(`incorrect email`);
            return;
        };
        //validate password
        if (password.length < 6) return;

        //call api
        let res = await postCreateNewUser(email, password, userName, role, selectedImage);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            await props.tableAllUser();
            handleClose();
        } else {
            toast.error(res.EM);
        };
    }
    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Add New User
            </Button>

            <Modal show={show} onHide={handleClose} size='xl' backdrop="static">

                <Modal.Header closeButton>
                    <Modal.Title>Add New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-2">
                            <Form.Group as={Col}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                        </Row>
                        <Row className='mb-3' style={{ height: "20px" }}>
                            <Form.Group as={Col}>

                            </Form.Group>
                            <Form.Group as={Col}>
                                {password.length < 6 && <span style={{ color: "red" }}>Please enter larger than 6 characters</span>}
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>User Name</Form.Label>
                                <Form.Control
                                    placeholder="Enter User Name"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Role</Form.Label>
                                <Form.Select
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option>USER</option>
                                    <option>ADMIN</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Form.Group>
                            <Form.Label style={{ marginRight: "10px" }}>Image Upload:</Form.Label>
                            <input type="file" onChange={handleImageChange} className='mb-3' />
                            <div className='preview-image' style={{ width: "400px", height: "200px", margin: "0 auto" }}>
                                {previewImage && <img src={previewImage} alt="Preview" style={{ objectFit: "cover", width: "100%", height: "100%" }} />}
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => { handleCreateNewUser() }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}