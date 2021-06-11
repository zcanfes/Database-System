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
    uniprotId: "",
});

const handleChange = (event) => {
    const target = event.target;
    setData(data => ({ ...data, [target.name]: target.value }));
}

const [isTable, setIsTable] = useState(false); 
const handleUnview = () => {
  setIsTable(false)
}
const [tableData, setTableData] = useState([]) 

const handleInteractingDrugs = async () => {
  const response = await axios.get(`${apiUrl}/protein/interacting_drugs/${data.uniprotId}`)
  setTableData(response.data.data)
  setIsTable((isTable) => !isTable)
}

const handleDrugs = async () => {
  const response = await axios.get(`${apiUrl}/protein/interacting_drugs_list`)
  console.log(response)
  const temp = response.data.data
  console.log(temp)
  const tableData = []
  if (temp) {
      for (const key in temp) {
          tableData.push({drugbank_id: key, uniprot_ids: temp[key].join(", ")})
      }
  }
  setTableData(tableData)
  setIsTable((isTable) => !isTable)
}

const handleDrugsWithLeast = async () => {
  const response = await axios.get(`${apiUrl}/protein/interacting_drugs_least_side_effects/${data.uniprotId}`)
  setTableData(response.data.data)
  setIsTable((isTable) => !isTable)
}

  return (
    <div className="container" style={{marginTop: 50}}>
      <div className="row justify-content-center">
        <div className="col-7 mt-4">
            <TextField className="d-flex" value={data.uniprotId} onChange={handleChange} name="uniprotId" label="UniProt ID" variant="outlined" />  
        </div>
        {!isTable &&
          <>
              <div className="col-9 justify-content-between d-flex mt-4 mb-4">  
                  <Button onClick={handleInteractingDrugs}  size="large" variant="contained" color="primary">
                  View interacting drugs of a specific protein
                  </Button>      
                  <Button onClick={handleDrugs}  size="large" variant="contained" color="primary">
                  View drugs that affect the same protein
                  </Button>      
              </div>
              <div className="col-9 justify-content-between d-flex mt-4 mb-4">  
                  <Button onClick={handleDrugsWithLeast}  size="large" variant="contained" color="primary">
                  view the drug(s) with the least amount of side effects that interact with a specific protein.
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