import DataTable from 'react-data-table-component';
import React, { useEffect, useState } from 'react';
import { downloadCSV, customStyles } from "./tableUtils.js"
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


const HOST = "http://127.0.0.1:8000"


async function setStatus(id, status) {
    const url = `https://api.gimply.org/categories/update-status?id=` + id + "&status=" + status;
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

    },
    {
        cell: row => <div><img style={{borderRadius: "10%", width: "150px"}} src={HOST + "/storage/" + row.banner}/>
        </div>,
        name: 'Banner',
    },
    {
        name: 'Name',
        selector: row => row.name,
        sortable: true,

    },
    {
        name: 'Description',
        selector: row => row.description,
        sortable: true,

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
    {
        name: "Edit",
        cell: row => <div>
            <a href={`/admin/edit-category/${encodeURIComponent(JSON.stringify(row))}`}>Edit
            </a>
        </div>,
        width: "100px"
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

];

//get category deetails
async function getVideoCategories() {
    const url = `https://api.gimply.org/categories/all`;

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

const VideoCategoriesTable = ({}) => {
    const [videoCategories, setVideoCategories] = useState([])

    const fetchData = () => {
        getVideoCategories()
            .then(data => {
                setVideoCategories(data)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    const csvKeys = ["id", "name", "description", "banner"];

    const Export = ({ onExport }) => <button onClick={e => onExport(e.target, csvKeys)}>Export</button>;

    const actionsMemo = <Export onExport={() => downloadCSV(videoCategories, csvKeys, "video_categories.csv")} />;


    return <>
    <div class="head-title">
        <div class="left">
            <h1>Video Categories</h1>
            <ul class="breadcrumb">
                <li>
                    <a href="#">Video Categories</a>
                </li>
                <li><i class='bx bx-chevron-right' ></i></li>
                <Link to={"/admin/add-category"}>
                <li>
                    <a class="active" href="#">Add Category</a>
                </li>
                </Link>
            </ul>
        </div>
        <a href="#" class="btn-download">
            <span class="text">Download PDF</span>
        </a>
    </div>

    <DataTable
        pagination
        columns={tableColumns}
        data={videoCategories}
        actions={actionsMemo}
        customStyles={customStyles}
        highlightOnHover
        pointerOnHover

    />
    </>
};

export default VideoCategoriesTable;