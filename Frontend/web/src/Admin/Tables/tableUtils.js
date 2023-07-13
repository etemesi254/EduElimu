
function convertArrayOfObjectsToCSV(array, keys) {
    let result;
    const columnDelimiter = ',';
    const lineDelimiter = '\n';

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
function downloadCSV(array,keys,filename) {
    const link = document.createElement('a');
    let csv = convertArrayOfObjectsToCSV(array,keys);
    if (csv == null) return;


    if (!csv.match(/^data:text\/csv/i)) {
        csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
}


const customStyles = {
    headRow: {

    },
    headCells: {
        style: {
            color: '#202124',
            fontSize: '14px',
        },
    },
    rows: {
        highlightOnHoverStyle: {
            backgroundColor: 'rgba(255, 199, 0,0.2)',
            borderBottomColor: '#FFFFFF',
            outline: '1px solid #FFFFFF',
        },
        padding: '10px'
    },
    pagination: {
        style: {
            border: 'none',
        },
    },
};

export  {customStyles,downloadCSV}