import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from "axios";
import { apiUrl } from "../config.json"

const Paper = (props) => {

  const initialData = {
    reactionId: "",
    username: "",
    authorName: "",
    password: ""    
  }
  const [data, setData] = useState(initialData);

const handleChange = (event) => {
    const target = event.target;
    setData(data => ({ ...data, [target.name]: target.value }));
}

const handleUpdate = async () => {
  const response = await axios.put(`${apiUrl}/paper`, data)
  console.log(response)
  setData(initialData);
}


  return (
    <div className="container" style={{marginTop: 50}}>
      <div className="row justify-content-center">
        <div className="col-7 mt-4">
            <TextField className="d-flex" value={data.reactionId} onChange={handleChange} name="reactionId" label="Reaction ID" variant="outlined" />  
        </div>
            <div className="col-7 mt-4 row justify-content-between
            ">
                <TextField value={data.authorName} onChange={handleChange} name="authorName" label="Author Name" variant="outlined" />  
            </div>
            <div className="col-7 mt-4 row justify-content-between
            ">
                <TextField className="col-5" value={data.username} onChange={handleChange} name="username" label="Username" variant="outlined" />  
                <TextField className="col-5" value={data.password} onChange={handleChange} type="password" name="password" label="Password" variant="outlined" />  
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
