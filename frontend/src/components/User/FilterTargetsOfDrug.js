import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useHistory } from "react-router-dom";
import TableData from "../Common/TableData"

const InteractionsOfDrug = (props) => {
  const history = useHistory();

  const [data, setData] = useState({
    measurementType: "",
    minAffinity: 0,
    maxAffinity: 0
});

const handleChange = (event) => {
    const target = event.target;
    setData(data => ({ ...data, [target.name]: target.value }));
}

const [isTable, setIsTable] = useState(false); 
const handleInteractions = () => {
    setIsTable((isTable) => !isTable)
}

  return (
    <div className="container" style={{marginTop: 50}}>
      <div className="row justify-content-center">
        <div className="col-7 mt-4">
        <TextField className="d-flex mb-3" value={data.measurementType} onChange={handleChange} name="measurementType" label="Measurement Type" variant="outlined" />  
        </div>
        <div className="col-7 mt-4 row justify-content-between
            ">
                <TextField className="col-5" value={data.maxAffinity} onChange={handleChange} name="maxAffinity" label="minimum affinity value" variant="outlined" />  
                <TextField className="col-5" value={data.minAffinity} onChange={handleChange} name="minAffinity" label="maximum affinity value" variant="outlined" />  
        </div>
        <div className="col-11 justify-content-center d-flex mt-4 mb-4">  
                    <Button onClick={handleInteractions}  size="large" variant="contained" color={isTable? "default" : "primary"}>
                        {isTable ? "Unview" : "View" } Filter
                    </Button>      
       </div>
       {isTable && <TableData />}                 
      </div>
    </div>
  );
}

export default InteractionsOfDrug;
