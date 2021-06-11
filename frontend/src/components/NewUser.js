import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useHistory } from "react-router-dom";
import axios from "axios"
import {apiUrl} from "../config.json"
import cogoToast from 'cogo-toast';

const NewUser = (props) => {
  const history = useHistory();

  const [data, setData] = useState({
    username: "",
    instituteName: "",
    password: "",
    authorName: ""
});

const handleChange = (event) => {
    const target = event.target;
    setData(data => ({ ...data, [target.name]: target.value }));
}

const handleAdd = async () => {
  try {
    const response = await axios.post(`${apiUrl}/user`, data)
    setData({
      username: "",
      instituteName: "",
      password: "",
      authorName: ""
    })
  } catch (e) {
    console.log(e)
    cogoToast.error("Error")
  }
}

  return (
    <div className="container" style={{marginTop: 50}}>
      <div className="row justify-content-center">
        <div className="col-7 mt-4">
            <TextField className="d-flex" value={data.username} onChange={handleChange} name="username" label="Username" variant="outlined" />  
        </div>
            <div className="col-7 mt-4">
                <TextField className="d-flex" value={data.instituteName} onChange={handleChange} name="instituteName" label="Institute Name" variant="outlined" />  
            </div>
            <div className="col-7 mt-4">
                <TextField className="d-flex" value={data.authorName} onChange={handleChange} name="authorName" label="Author Name" variant="outlined" />  
            </div>
        <div className="col-7 mt-4">
            <TextField className="d-flex" value={data.password} onChange={handleChange} type="password" name="password" label="Password" variant="outlined" />  
        </div> 
        <div className="col-7 justify-content-center d-flex mt-4">
                    <Button onClick={handleAdd} size="large" variant="contained" color="primary">
                        Add New User
                    </Button>    
        </div>                 
      </div>
    </div>
  );
}

export default NewUser;
