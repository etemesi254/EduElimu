import DataTable from 'react-data-table-component';
import React, {useEffect, useState} from 'react';
import {useUserContext} from "../../context/UserContext";
import ReactPlayer from "react-player";
import { downloadCSV,customStyles } from './tableUtils';
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




const ExpandedComponent = ({data}) => {

    return <div style={{

        margin: "10px 20px"
    }}>
        <div style={{height:"50px"}}>
            <div style={{display:"flex",height:"40px", justifyContent:"end"}}>
                <button>
                    Disable
                </button>
                <div style={{width:"50px"}}></div>
                <button>
                    Disable
                </button>

            </div>
            
        </div>
        <div style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "space-between",
            width: "100%",
            height: "400px",
        }}>
            <div><img style={{objectFit: 'contain', maxHeight: "360px"}}
                      src={'http://0.0.0.0:8000/storage/' + data.banner_url}></img></div>
            <div>
                <ReactPlayer style={{width: "600px", height: "400px", objectFit: "fill"}}
                             controls={true}
                             url={'http://0.0.0.0:8000/storage/' + data.file_url}></ReactPlayer>
            </div>
        </div>
    </div>
}


const VideosTables = ({}) => {

    const user = useUserContext();

    const [videos, setVideos] = useState([])

    const fetchData = () => {
        user.getAllVideos()
            .then(response => {
                return response;
            })
            .then(data => {
                setVideos(data)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])


    const keys = ["id","name","channel_id","description","view_count"];

    const Export = ({onExport}) => <button onClick={e => onExport(e.target, keys)}>Export
        </button>
    ;

    const actionsMemo =  <Export onExport={() => downloadCSV(videos,keys,"videos.csv")}/>;

    return <DataTable
        pagination
        columns={columns}
        data={videos}
        actions={actionsMemo}
        expandableRows
        expandableRowsComponent={ExpandedComponent}
        customStyles={customStyles}
        highlightOnHover
        pointerOnHover

    />
}

export default VideosTables;
