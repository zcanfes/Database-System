import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useHistory } from "react-router-dom";
import axios from "axios";
import cogoToast from 'cogo-toast';
import { apiUrl } from "../../config.json"

const Protein = (props) => {
  const history = useHistory();

  const [data, setData] = useState({
    uniprotId: "",
});

const handleChange = (event) => {
    const target = event.target;
    setData(data => ({ ...data, [target.name]: target.value }));
}

const handleDelete = async () => {
  await axios.delete(`${apiUrl}/protein`, {data: data})
  setData({uniprotId: ""});
}
  return (
    <div className="container" style={{marginTop: 50}}>
      <div className="row justify-content-center">
        <div className="col-7 mt-4">
            <TextField className="d-flex" value={data.uniprotId} onChange={handleChange} name="uniprotId" label="UniProt ID" variant="outlined" />  
        </div>
        <div className="col-7 justify-content-end d-flex mt-4">  
                    <Button onClick={handleDelete} size="large" variant="contained" color="secondary">
                        Delete Protein
                    </Button>      
        </div>                 
      </div>
    </div>
  );
}

export default Protein;
