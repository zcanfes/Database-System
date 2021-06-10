import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useHistory } from "react-router-dom";

const Paper = (props) => {
  const history = useHistory();

  const [data, setData] = useState({
    id: "",
    contributerName: "",
    contributerInstituteName: "",
});

const handleChange = (event) => {
    const target = event.target;
    setData(data => ({ ...data, [target.name]: target.value }));
}

const handleUpdate = () => {
    
}



  return (
    <div className="container" style={{marginTop: 50}}>
      <div className="row justify-content-center">
        <div className="col-7 mt-4">
            <TextField className="d-flex" value={data.id} onChange={handleChange} name="id" label="DrugBank ID" variant="outlined" />  
        </div>
            <div className="col-7 mt-4 row justify-content-between
            ">
                <TextField className="col-5" value={data.contributerName} onChange={handleChange} name="contributerName" label="Contributor Username" variant="outlined" />  
                <TextField className="col-5" value={data.contributerInstituteName} onChange={handleChange} name="contributerInstituteName" label="Contributor Institute Name" variant="outlined" />  
            </div>
        <div className="col-7 justify-content-center d-flex mt-4">
                    <Button  onClick={handleUpdate} size="large" variant="contained" color="primary">
                        Update Paper
                    </Button>    
        </div>                 
      </div>
    </div>
  );
}

export default Paper;
