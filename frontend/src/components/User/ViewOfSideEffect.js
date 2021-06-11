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
    umlscui: "",
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

const handleDrugs = async () => {
  const response = await axios.get(`${apiUrl}/side_effect/drugs/${data.umlscui}`)
  setTableData(response.data.data)
  setIsTable((isTable) => !isTable)
}

  return (
    <div className="container" style={{marginTop: 50}}>
      <div className="row justify-content-center">
        <div className="col-7 mt-4">
            <TextField className="d-flex" value={data.umlscui} onChange={handleChange} name="umlscui" label="Umlscui" variant="outlined" />  
        </div>
        {!isTable &&
          <>
              <div className="col-9 justify-content-center d-flex mt-4 mb-4">  
                  <Button onClick={handleDrugs}  size="large" variant="contained" color="primary">
                  View drugs
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