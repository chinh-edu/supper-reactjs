import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DeleteQuiz = (props) => {
    const { show, setShow } = props;
    const handleClose = () => {
        setShow(false)
    }
    return (
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title>Delete User</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure delete User with EMAIL: </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleClose()}>
                    No
                </Button>
                <Button variant="primary" onClick={() => handleClose()}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>

    )
}
export default DeleteQuiz