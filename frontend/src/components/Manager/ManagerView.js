import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useHistory } from "react-router-dom";
import TableData from "../Common/TableData"
import { apiUrl } from "../../config.json"
import axios from "axios"

const View = (props) => {
  const history = useHistory();

const [isTable, setIsTable] = useState(false); 
const handleInteractions = () => {
    setIsTable((isTable) => !isTable)
}
const handleUnview = () => {
  setIsTable(false)
}
const [tableData, setTableData] = useState([]) 

const handleNames = async () => {
  const response = await axios.get(`${apiUrl}/drug/all`)
  setTableData(response.data.data)
  setIsTable((isTable) => !isTable)
}
const handleIds = async () => {
  const response = await axios.get(`${apiUrl}/protein/all`)
  setTableData(response.data.data)
  setIsTable((isTable) => !isTable)
}
const handleSmiles = async () => {
  const response = await axios.get(`${apiUrl}/side_effect/all`)
  setTableData(response.data.data)
  setIsTable((isTable) => !isTable)
}
const handleDesc = async () => {
  const response = await axios.get(`${apiUrl}/reaction/list`)
  setTableData(response.data.data)
  setIsTable((isTable) => !isTable)
}
const handleTarget = async () => {
  const response = await axios.get(`${apiUrl}/user/all`)
  setTableData(response.data.data)
  setIsTable((isTable) => !isTable)
}

  return (
    <div className="container" style={{marginTop: 50}}>
      <div className="row justify-content-center">
      {!isTable &&
  <>
      <div className="col-12 justify-content-between d-flex mt-4 mb-4">  
          <Button onClick={handleNames}  size="large" variant="contained" color="primary">
          view all drugs
          </Button>      
          <Button onClick={handleIds}  size="large" variant="contained" color="primary">
          view all protiens
          </Button>      
          <Button onClick={handleSmiles}  size="large" variant="contained" color="primary">
          view all side effects
          </Button>      
          <Button onClick={handleDesc}  size="large" variant="contained" color="primary">
          view all interactions and all papers
          </Button>      
          <Button onClick={handleTarget}  size="large" variant="contained" color="primary">
          view all users
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

export default View;
