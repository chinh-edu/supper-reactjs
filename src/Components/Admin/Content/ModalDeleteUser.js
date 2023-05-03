import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUsers } from '../../../service/apiServices';
import { toast } from 'react-toastify';

const ModalDeleteUser = (props) => {
    const { show, setShow, dataDelete, fetchListUsersWithPaginate, setCurrentPage } = props;
    const handleClose = () => setShow(false);

    const handleSubmitDeleteUser = async () => {
        let data = await deleteUsers(dataDelete.id)
        console.log(`check data:`, data)
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            setCurrentPage(1)
            await fetchListUsersWithPaginate(1);
        } else {
            toast.error(data.EM);
        }
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure delete User with EMAIL: <b>{dataDelete && dataDelete.email ? dataDelete.email : ""}</b></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={() => { handleClose(); handleSubmitDeleteUser() }}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalDeleteUser;