
const TableQuiz = (props) => {
    const { tableQuiz, handleClickDeleteQuiz } = props;

    return (
        <table className="table table-success table-hover mt-5">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">NAME</th>
                    <th scope="col">DESCRIPTION</th>
                    <th scope="col">DESIGN</th>
                </tr>
            </thead>
            {tableQuiz && tableQuiz.length > 0 &&
                tableQuiz.map((item, index) => {
                    return (
                        <tbody key={item.id}>
                            <tr>
                                <th scope="row">{item.id}</th>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td style={{ display: "flex", gap: "8px" }}>
                                    <button className="btn btn-success">Update</button>
                                    <button className="btn btn-warning" onClick={() => handleClickDeleteQuiz()}>Delete</button>
                                </td>
                            </tr>
                        </tbody>

                    )
                })
            }
        </table>
    )
}
export default TableQuiz;