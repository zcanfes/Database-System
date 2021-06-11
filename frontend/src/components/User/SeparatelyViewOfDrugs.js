import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useHistory } from "react-router-dom";
import TableData from "../Common/TableData"

const SeparatelyViewofDrug = (props) => {
  const history = useHistory();

const [isTable, setIsTable] = useState(false); 
const handleInteractions = () => {
    setIsTable((isTable) => !isTable)
}

  return (
    <div className="container" style={{marginTop: 50}}>
      <div className="row justify-content-center">
        <div className="col-12 justify-content-between d-flex mt-4 mb-4">  
                    <Button onClick={handleInteractions}  size="large" variant="contained" color={isTable? "default" : "primary"}>
                        {isTable ? "Un" : "" }view the names
                    </Button>      
                    <Button onClick={handleInteractions}  size="large" variant="contained" color={isTable? "default" : "primary"}>
                        {isTable ? "Un" : "" }view DrugBank IDs
                    </Button>      
                    <Button onClick={handleInteractions}  size="large" variant="contained" color={isTable? "default" : "primary"}>
                        {isTable ? "Un" : "" }view SMILES strings
                    </Button>      
                    <Button onClick={handleInteractions}  size="large" variant="contained" color={isTable? "default" : "primary"}>
                        {isTable ? "Un" : "" }view descriptions
                    </Button>      
                    <Button onClick={handleInteractions}  size="large" variant="contained" color={isTable? "default" : "primary"}>
                        {isTable ? "Un" : "" }view target names
                    </Button>      
                    <Button onClick={handleInteractions}  size="large" variant="contained" color={isTable? "default" : "primary"}>
                        {isTable ? "Un" : "" }view side effect names
                    </Button>      
       </div>
       {isTable && <TableData />}                 
      </div>
    </div>
  );
}

export default SeparatelyViewofDrug;

{!isTable &&
  <>
      <div className="col-11 justify-content-center d-flex mt-4 mb-4">  
          <Button onClick={handlePapers}  size="large" variant="contained" color="primary">
          view the DOI of papers and contributors.
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