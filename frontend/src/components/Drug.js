import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useHistory } from "react-router-dom";

const Drug = (props) => {
  const history = useHistory();

  const [data, setData] = useState({
    id: "",
    value: "",
});

const handleChange = (event) => {
    const target = event.target;
    setData(data => ({ ...data, [target.name]: target.value }));
}

const handleUpdate = () => {
    
}

const handleDelete = () => {
    
}

  return (
    <div className="container" style={{marginTop: 50}}>
      <div className="row justify-content-center">
        <div className="col-7 mt-4">
            <TextField className="d-flex" value={data.id} onChange={handleChange} name="id" label="DrugBank ID" variant="outlined" />  
        </div>
            <div className="col-7 mt-4">
                <TextField className="d-flex" value={data.value} onChange={handleChange} name="value" label="Affinity Value" variant="outlined" />  
            </div>
        <div className="col-7 justify-content-between d-flex mt-4">
                    <Button  onClick={handleUpdate} size="large" variant="contained" color="primary">
                        Update Drug
                    </Button>    
                    <Button onClick={handleDelete} size="large" variant="contained" color="secondary">
                        Delete Drug
                    </Button>      
        </div>                 
      </div>
    </div>
  );
}

export default Drug;
