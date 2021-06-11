import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useHistory } from "react-router-dom";
import TableData from "../Common/TableData"
import { apiUrl } from "../../config.json"
import axios from "axios"

const InteractionsOfDrug = (props) => {
  const history = useHistory();

  const [data, setData] = useState({
    measurementType: "",
    minAffinity: 0,
    maxAffinity: 0,
    drugbankId: ""
});

const handleChange = (event) => {
    const target = event.target;
    setData(data => ({ ...data, [target.name]: target.value }));
}

const [tableData, setTableData] = useState([]) 
const [isTable, setIsTable] = useState(false); 
const handleUnview = () => {
  setIsTable(false)
}

const handleFilter = async () => {
  console.log(data)
  const response = await axios.get(`${apiUrl}/drug/filter/interacting_targets/${data.drugbankId}-${data.measurementType}-${data.minAffinity}-${data.maxAffinity}`)
  console.log(response)
  setTableData(response.data.data)
  setIsTable((isTable) => !isTable)
}

  return (
    <div className="container" style={{marginTop: 50}}>
      <div className="row justify-content-center">
        <div className="col-7 mt-4">
        <TextField className="d-flex mb-3" value={data.drugbankId} onChange={handleChange} name="drugbankId" label="Drugbank ID" variant="outlined" />  
        <TextField className="d-flex mb-3" value={data.measurementType} onChange={handleChange} name="measurementType" label="Measurement Type" variant="outlined" />  
        </div>
        <div className="col-7 mt-4 row justify-content-between
            ">
                <TextField className="col-5" value={data.minAffinity} onChange={handleChange} name="minAffinity" label="minimum affinity value" variant="outlined" />  
                <TextField className="col-5" value={data.maxAffinity} onChange={handleChange} name="maxAffinity" label="maximum affinity value" variant="outlined" />  
        </div>
        {!isTable &&
  <>
      <div className="col-11 justify-content-center d-flex mt-4 mb-4">  
          <Button onClick={handleFilter}  size="large" variant="contained" color="primary">
          Filter
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

export default InteractionsOfDrug;
