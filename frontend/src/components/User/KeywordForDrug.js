import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useHistory } from "react-router-dom";
import TableData from "../Common/TableData"
import { apiUrl } from "../../config.json"
import axios from "axios"

const KeywordForDrug = (props) => {
  const history = useHistory();

  const [data, setData] = useState({
    keyword: "",
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
  const response = await axios.get(`${apiUrl}/drug/search/${data.keyword}`)
  setTableData(response.data.data)
  setIsTable((isTable) => !isTable)
}

  return (
    <div className="container" style={{marginTop: 50}}>
      <div className="row justify-content-center">
        <div className="col-7 mt-4">
            <TextField className="d-flex" value={data.keyword} onChange={handleChange} name="keyword" label="Keyword" variant="outlined" />  
        </div>
        {!isTable &&
          <>
              <div className="col-11 justify-content-center d-flex mt-4 mb-4">  
                  <Button onClick={handleDrugs}  size="large" variant="contained" color="primary">
                  view the drugs
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

export default KeywordForDrug;
