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
            <TextField className="d-flex" value={data.id} onChange={handleChange} name="id" label="UniProt ID" variant="outlined" />  
        </div>
        <div className="col-9 justify-content-between d-flex mt-4 mb-4">  
                    <Button onClick={handleInteractions}  size="large" variant="contained" color={isTable? "default" : "primary"}>
                        {isTable ? "Un" : "" }View interacting drugs of a specific protein
                    </Button>      
                    <Button onClick={handleInteractions}  size="large" variant="contained" color={isTable? "default" : "primary"}>
                    {isTable ? "Un" : "" }View drugs that affect the same protein
                    </Button>      
       </div>
       <div className="col-9 justify-content-between d-flex mt-4 mb-4">  
                    <Button onClick={handleInteractions}  size="large" variant="contained" color={isTable? "default" : "primary"}>
                        {isTable ? "Un" : "" }view the drug(s) with the least amount of side effects that interact with a specific protein.
                    </Button>      
       </div>
       {isTable && <TableData />}                 
      </div>
    </div>
  );
}

export default InteractionsOfDrug;
