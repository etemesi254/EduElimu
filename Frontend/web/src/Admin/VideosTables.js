import DataTable from 'react-data-table-component';
import React, {useEffect, useState} from 'react';
import {useUserContext} from "../context/UserContext";

const columns = [
    {
        name: "Id",
        selector: row => row.id,
    },
    {
        name: 'Name',
        selector: row => row.name,
    },
    {
        name: 'Channel ID',
        selector: row => row.channel_id,
    },
    {
        name: "Description",
        selector: row => row.description,
    },
    {
        name: "View Count",
        selector: row => row.view_count,

    },
];


// Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
function convertArrayOfObjectsToCSV(array, data) {
    let result;
    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    const keys = Object.keys(data[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach(item => {
        let ctr = 0;
        keys.forEach(key => {
            if (ctr > 0) result += columnDelimiter;

            result += item[key];

            ctr++;
        });
        result += lineDelimiter;
    });

    return result;
}

// Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
function downloadCSV(array) {
    const link = document.createElement('a');
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    const filename = 'videos_edu_elimu.csv';

    if (!csv.match(/^data:text\/csv/i)) {
        csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
}

const ExpandedComponent = ({data}) => {
    return <div style={{display: "flex",alignContent:"center",justifyContent:"space-between",width:"100%"}}>
        <div><img style={{width: '30%'}} src={'http://0.0.0.0:8000/storage/' + data.banner_url}></img></div>
        <div style={{width:"50%"}}><video  src={'http://0.0.0.0:8000/storage/'+data.file_url}></video></div>
    </div>
}


const VideosTables = ({}) => {

    const user = useUserContext();

    const [users, setUsers] = useState([])

    const fetchData = () => {
        user.getAllVideos()
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


    const Export = ({onExport}) => <button onClick={e => onExport(e.target.value, users)}>Export
        </button>
    ;

    const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV(users)}/>, []);

    return <DataTable
        pagination
        columns={columns}
        data={users}
        actions={actionsMemo}
        expandableRows
        expandableRowsComponent={ExpandedComponent}

    />
}

export default VideosTables;
