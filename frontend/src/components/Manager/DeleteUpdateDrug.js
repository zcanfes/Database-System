import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../config.json"

const DeleteUpdateDrug = (props) => {
  const history = useHistory();

  const [data, setData] = useState({
    reactionId: "",
    drugbankId: "",
    affinity: "",
});

const handleChange = (event) => {
    const target = event.target;
    setData(data => ({ ...data, [target.name]: target.value }));
}

const handleUpdate = async () => {
    await axios.put(`${apiUrl}/drug`, data)
    setData(data => ({ ...data, reactionId: "", affinity: "" }));
}

const handleDelete = async () => {
    await axios.delete(`${apiUrl}/drug`, {data: data})
    setData(data => ({ ...data, drugbankId: "" }));
}

  return (
    <div className="container" style={{marginTop: 50}}>
      <div className="row justify-content-center">
        <div className="col-7 mt-4">
            <TextField className="d-flex" value={data.reactionId} onChange={handleChange} name="reactionId" label="Reaction ID" variant="outlined" />  
        </div>
        <div className="col-7 mt-4">
            <TextField className="d-flex" value={data.affinity} onChange={handleChange} name="affinity" label="Affinity Value" variant="outlined" />  
        </div>
        <div className="col-7 justify-content-center d-flex mt-4">
                    <Button  onClick={handleUpdate} size="large" variant="contained" color="primary">
                        Update Drug
                    </Button>    
        </div>      
        <div className="col-7 mt-4">
            <TextField className="d-flex" value={data.drugbankId} onChange={handleChange} name="drugbankId" label="DrugBank ID" variant="outlined" />  
        </div>
        <div className="col-7 justify-content-center d-flex mt-4">
                    <Button onClick={handleDelete} size="large" variant="contained" color="secondary">
                        Delete Drug
                    </Button>      
        </div>      
      </div>
    </div>
  );
}

export default DeleteUpdateDrug;
