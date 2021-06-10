import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useHistory } from "react-router-dom";
import TableData from "./TableData"

const InteractionsOfDrug = (props) => {
  const history = useHistory();

  const [data, setData] = useState({
    id: "",
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
            <TextField className="d-flex" value={data.id} onChange={handleChange} name="id" label="DrugBank ID" variant="outlined" />  
        </div>
        <div className="col-11 justify-content-between d-flex mt-4 mb-4">  
                    <Button onClick={handleInteractions}  size="large" variant="contained" color={isTable? "default" : "primary"}>
                        {isTable ? "Un" : "" }View all interactions
                    </Button>      
                    <Button onClick={handleInteractions}  size="large" variant="contained" color={isTable? "default" : "primary"}>
                    {isTable ? "Un" : "" }View all side effects
                    </Button>      
                    <Button onClick={handleInteractions}  size="large" variant="contained" color={isTable? "default" : "primary"}>
                    {isTable ? "Un" : "" }View all interacting targets
                    </Button>      
                    <Button onClick={handleInteractions}  size="large" variant="contained" color={isTable? "default" : "primary"}>
                    {isTable ? "Un" : "" }View proteins that bind the same drug
                    </Button>      
       </div>
       <div className="col-11 justify-content-between d-flex mt-4 mb-4">  
       <Button onClick={handleInteractions}  size="large" variant="contained" color={isTable? "default" : "primary"}>
          {isTable ? "Un" : "" }view drugs that have a specific side effect
        </Button>             
       </div>
       {isTable && <TableData />}                 
      </div>
    </div>
  );
}

export default InteractionsOfDrug;
