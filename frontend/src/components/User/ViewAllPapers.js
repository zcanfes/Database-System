import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useHistory } from "react-router-dom";
import TableData from "../Common/TableData"
import { apiUrl } from "../../config.json"
import axios from "axios"

const FieldsOfAllPapers = (props) => {
  const history = useHistory();

const [isTable, setIsTable] = useState(false); 
const handleUnview = () => {
  setIsTable(false)
}
const [tableData, setTableData] = useState([]) 

const handlePapers = async () => {
  const response = await axios.get(`${apiUrl}/list/paper`)
  setTableData(response.data.data)
  setIsTable((isTable) => !isTable)
}

  return (
    <div className="container" style={{marginTop: 50}}>
      <div className="row justify-content-center">
      {!isTable &&
        <>
            <div className="col-11 justify-content-center d-flex mt-4 mb-4">  
                <Button onClick={handlePapers}  size="large" variant="contained" color="primary">
                view the DOI of papers and contributors.
                </Button>      

            </div>
        </>
      }
      {isTable && 
        <>
            <Button className="my-4 col-6" onClick={handleUnview}  size="large" variant="contained" color="default">
            Unview
            </Button>
            <TableData data={tableData} />       
        </>
      }                  
      </div>
    </div>
  );
}

export default FieldsOfAllPapers;