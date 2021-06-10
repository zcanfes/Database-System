import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useHistory } from "react-router-dom";
import TableData from "./TableData"

const FieldsOfAllDrugs = (props) => {
  const history = useHistory();

const [isTable, setIsTable] = useState(false); 
const handleInteractions = () => {
    setIsTable((isTable) => !isTable)
}

  return (
    <div className="container" style={{marginTop: 50}}>
      <div className="row justify-content-center">
        <div className="col-11 justify-content-center d-flex mt-4 mb-4">  
                    <Button onClick={handleInteractions}  size="large" variant="contained" color={isTable? "default" : "primary"}>
                        {isTable ? "Un" : "" }view the names, DrugBank IDs, SMILES strings, descriptions, target
names, and side effect names
                    </Button>      
       </div>
       {isTable && <TableData />}                 
      </div>
    </div>
  );
}

export default FieldsOfAllDrugs;
