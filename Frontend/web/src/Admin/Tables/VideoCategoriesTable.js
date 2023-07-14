import DataTable from 'react-data-table-component';
import React, { useEffect, useState } from 'react';
import { BsDownload } from 'react-icons/bs';
import { downloadCSV, customStyles } from "./tableUtils.js"
import { Link } from 'react-router-dom';


const HOST = "http://127.0.0.1:8000"


const tableColumns = [
    {
        name: "Id",
        selector: row => row.id,
        sortable: true,

    },
    {
        cell: row => <div><img style={{ borderRadius: "10%", width: "150px" }} src={HOST+"/storage/" + row.banner} /></div>,
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

];

//get category deetails
async function getVideoCategories() {
        const url = `http://127.0.0.1:8000/api/categories/all`;

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

const VideoCategoriesTable = ({ }) => {
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

    const actionsMemo = <Export onExport={() => downloadCSV(videoCategories, csvKeys, "videos.csv")} />;


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
            <BsDownload/>
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