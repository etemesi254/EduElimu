import DataTable from 'react-data-table-component';
import React, {useEffect, useState} from 'react';
import {downloadCSV, customStyles, FilterComponent} from "./tableUtils.js"
import {BsDownload} from "react-icons/bs";
import { toast } from 'react-toastify';


const HOST = "http://127.0.0.1:8000"


async function setStatus(id, status) {
    const url = `https://api.gimply.org/channels/update-status?id=` + id + "&status=" + status;
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
        width: "130px"
    },
    {
        name: 'Subscribers',
        selector: row => row.subscribers,
        sortable: true,
        width: "130px"
    },
    {
        name: 'Description',
        selector: row => row.description.slice(0,50),
        sortable: true,
        wrap: true,
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
        width: "330px"
    },
];

//get category deetails
async function getChannels() {
    const url = `https://api.gimply.org/channels/all`;

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

    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

    const filteredItems = channels.filter(
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

    const actionsMemo = <Export onExport={() => downloadCSV(channels, csvKeys, "channel.csv")}/>;


    return <>
        <div class="head-title">
            <div class="left">
                <h1>Channels</h1>
                <ul class="breadcrumb">
                    <li>
                        <a href="#">Dashboard</a>
                    </li>
                    <li><i class='bx bx-chevron-right'></i></li>
                    <li>
                        <a class="active" href="#">Home</a>
                    </li>
                </ul>
            </div>
            <a href="#" class="btn-download">
                <span class="text">Download PDF</span>
            </a>
        </div>

        <DataTable
            pagination
            columns={tableColumns}
            data={filteredItems}
            actions={actionsMemo}
            customStyles={customStyles}
            highlightOnHover
            pointerOnHover
            subHeader
            subHeaderComponent={[subHeaderComponentMemo]}

        />
    </>
};

export default VideoChannelsTable;