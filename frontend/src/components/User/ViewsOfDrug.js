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
    drugbankId: "",
  });

  const [tableData, setTableData] = useState([]) 

const handleChange = (event) => {
    const target = event.target;
    setData(data => ({ ...data, [target.name]: target.value }));
}

const [isTable, setIsTable] = useState(false); 
const handleUnview = () => {
    setIsTable(false)
}

const handleAllInteractions = async () => {
    const response = await axios.get(`${apiUrl}/drug/interactions/${data.drugbankId}`)
    setTableData(response.data.data)
    setIsTable((isTable) => !isTable)
}

const handleAllSideEffects = async () => {
    const response = await axios.get(`${apiUrl}/drug/side_effects/${data.drugbankId}`)
    setTableData(response.data.data)
    setIsTable((isTable) => !isTable)
}

const handleInteractingTargets = async () => {
    const response = await axios.get(`${apiUrl}/drug/interacting_targets/${data.drugbankId}`)
    setTableData(response.data.data)
    setIsTable((isTable) => !isTable)
}

const handleProteins = async () => {
    const response = await axios.get(`${apiUrl}/drug/interacting_targets_list`)
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

  return (
    <div className="container" style={{marginTop: 50}}>
      <div className="row justify-content-center">
        <div className="col-7 mt-4">
            <TextField className="d-flex" value={data.drugbankId} onChange={handleChange} name="drugbankId" label="DrugBank ID" variant="outlined" />  
        </div>
        {!isTable &&
            <>
                <div className="col-11 justify-content-between d-flex mt-4 mb-4">  
                    <Button onClick={handleAllInteractions}  size="large" variant="contained" color="primary">
                        View all interactions
                    </Button>      
                    <Button onClick={handleAllSideEffects}  size="large" variant="contained" color="primary">
                    View all side effects
                    </Button>      
                    <Button onClick={handleInteractingTargets}  size="large" variant="contained" color="primary">
                    View all interacting targets
                    </Button>      
                    <Button onClick={handleProteins}  size="large" variant="contained" color="primary">
                    View proteins that bind the same drug
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
