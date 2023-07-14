import DataTable from 'react-data-table-component';
import React, {useEffect, useState} from 'react';
import { BsDownload } from 'react-icons/bs';
import {downloadCSV, customStyles} from "./tableUtils.js"


const HOST = "http://127.0.0.1:8000"


const tableColumns = [
    {
        name: "Id",
        selector: row => row.id,
        sortable: true,
        width: "100px"

    },
    {
        cell: row => <div><img style={{borderRadius: "10%", width: "150px"}} src={HOST + "/storage/" + row.banner}/>
        </div>,
        name: 'Banner',
        width: "330px"
    },
    {
        name: 'Name',
        selector: row => row.name,
        sortable: true,
        width: "330px"
    },
    {
        name: 'Subscribers',
        selector: row => row.subscribers,
        sortable: true,
        width: "200px"
    },
    {
        name: 'Description',
        selector: row => row.description,
        sortable: true,
        wrap: true,
    },


];

//get category deetails
async function getChannels() {
    const url = `http://127.0.0.1:8000/api/channels/all`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    console.log(response);
    if (response.status === 200) {
        const jsonResp = await response.json();
        return jsonResp.data;
    } else {
        throw new Error("Failed to fetch video categories");
    }

}

const VideoChannelsTable = ({}) => {
    const [channels, setChannels] = useState([])

    const fetchData = () => {
        getChannels()
            .then(data => {
                setChannels(data)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    const csvKeys = ["id", "name", "description", "subscribers", "banner"];

    const Export = ({onExport}) => <button onClick={e => onExport(e.target, csvKeys)}>Export</button>;

    const actionsMemo = <Export onExport={() => downloadCSV(channels, csvKeys, "videos.csv")}/>;


    return <>
    <div class="head-title">
				<div class="left">
					<h1>Channels</h1>
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
        columns={tableColumns}
        data={channels}
        actions={actionsMemo}
        customStyles={customStyles}
        highlightOnHover
        pointerOnHover

    />
    </>
   
};

export default VideoChannelsTable;