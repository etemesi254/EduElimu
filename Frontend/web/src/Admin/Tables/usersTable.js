
import DataTable from 'react-data-table-component';
import React, { useEffect, useState } from 'react';
import {downloadCSV, customStyles, FilterComponent} from "./tableUtils.js"



const tableColumns = [
    {
        name: "Id",
        selector: row => row.id,
        sortable: true,

    },
    {
        cell: row => <div><img style={{ borderRadius: "50%", width: "50px" }} src={row.profile_image} /></div>,
        name: 'Profile Picture',
    },
    {
        name: 'Name',
        selector: row => row.name,
        sortable: true,

    },
    {
        name: 'Email',
        selector: row => row.email,
        sortable: true,

    },
    {
        name: "Phone number",
        selector: row => row.phone_number,
        sortable: true,

    },
    {
        name: "Date of Birth ",
        selector: row => row.DOB,
        sortable: true,
    },
    {
        name: "Firebase ID",
        selector: row => row.firebase_id,
    },
];


async function getAllUsers() {
    const url = `http://127.0.0.1:8000/api/users/all`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const result = await response.json();
    console.log(result.message);
    console.log(response);
    if (response.status === 200) {
        return result.data;

    } else {
        throw new Error("Failed to fetch user details");

    }
}
const UsersTable = ({ }) => {
    const csvKeys = ["id", "profile_image", "name", "email", "phone_number", "DOB", "firebase_id"];

    const [users, setUsers] = useState([])

    const fetchData = () => {
        getAllUsers()
            .then(response => {
                return response;
            })
            .then(data => {
                setUsers(data)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])


    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

    const filteredItems = users.filter(
        item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
    );
    const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear}
                             filterText={filterText}/>
        );
    }, [filterText, resetPaginationToggle]);

    const Export = ({onExport}) => <button onClick={e => onExport(e.target, csvKeys)}>Export</button>;

    const actionsMemo = <Export onExport={() => downloadCSV(users, csvKeys,"users.csv")} />;

    return <DataTable
        pagination
        columns={tableColumns}
        data={users}
        actions={actionsMemo}
        customStyles={customStyles}
        highlightOnHover
        pointerOnHover
        subHeader
        subHeaderComponent={[subHeaderComponentMemo,actionsMemo]}

    />
}

export default UsersTable;