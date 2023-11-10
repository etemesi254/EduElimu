import DataTable from 'react-data-table-component';
import React, {useEffect, useState} from 'react';
import {useUserContext} from "../../context/UserContext";
import ReactPlayer from "react-player";
import { toast } from 'react-toastify';
import { BsDownload } from 'react-icons/bs';
import {downloadCSV, customStyles, FilterComponent} from './tableUtils';


async function setStatus(id, status) {
    const url = `https://api.gimply.org/videos/update-status?id=` + id + "&status=" + status;
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
        toast.success('Status Changed successfully');
        return result.data;

    } else {
        throw new Error("Failed to fetch user details");

    }
}

const columns = [
    {
        name: "Id",
        selector: row => row.id,
        width: "100px"
    },

    {
        name: 'Name',
        selector: row => row.name,
        width: "130px"

    },
   
    {
        name: 'Channel ID',
        selector: row => row.channel_id,
        width: "140px"

    },
    {
        name: "View Count",
        selector: row => row.view_count,
        width: "140px"

    },
    {
        name: "Description",
        selector: row => row.description,
        wrap:true
    },

    {
        name: "Enabling",
        cell: row => row.status == 1 ?  <div>
            <button onClick={() => {
                setStatus(row.id, '0')
            }}>Disable
            </button>
        </div> : <div>
            <button onClick={() => {
                setStatus(row.id, '1')

            }}>Enable
            </button>
        </div>,
        width: "100px"
    },
    {
        name: 'Status',
        selector: row => row.status,
        width: "130px"
    },

];


const ExpandedComponent = ({data}) => {

    return <div style={{

        margin: "10px 20px"
    }}>
       
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
    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

    const filteredItems = videos.filter(
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


    const keys = ["id", "name", "channel_id", "description", "view_count"];

    const Export = ({onExport}) => <button onClick={e => onExport(e.target, keys)}>Export
        </button>
    ;

    const actionsMemo = <Export onExport={() => downloadCSV(videos, keys, "videos.csv")}/>;

    return <>
    <div class="head-title">
				<div class="left">
					<h1>Videos</h1>
					<ul class="breadcrumb">
						<li>
							<a href="#">Dashboard</a>
						</li>
						<li><i class='bx bx-chevron-right' ></i></li>
						<li>
							<a class="active" href="#">Home</a>
						</li>
					</ul>
				</div>
				<a href="#" class="btn-download">
					<BsDownload/>
					<span class="text">Download PDF</span>
				</a>
			</div>
    <DataTable
        pagination
        columns={columns}
        data={filteredItems}
        actions={actionsMemo}
        expandableRows
        expandableRowsComponent={ExpandedComponent}
        customStyles={customStyles}
        paginationResetDefaultPage={resetPaginationToggle}
        highlightOnHover
        pointerOnHover
        subHeader
        subHeaderComponent={subHeaderComponentMemo}

    />
    </>
}

export default VideosTables;
