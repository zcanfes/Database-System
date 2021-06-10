import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useHistory } from "react-router-dom";



const Login = (props) => {
    const history = useHistory();

    const [data, setData] = useState({
        username: "",
        instituteName: "",
        password: ""
    });

    const handleChange = (event) => {
        const target = event.target;
        setData(data => ({ ...data, [target.name]: target.value }));
    }

    const handleLogin = () => {
        if (props.type == "user") {
            history.push('/userHome')
        }
        else if(props.type == "manager") {
            history.push('/managerHome')
        }
    }



  console.log(data)

  return (
    <div className="container" style={{marginTop: 100}}>
        <form className="row justify-content-center" noValidate autoComplete="off">
                <div className="col-7 justify-content-center d-flex mt-4">
                    <ButtonGroup className="d-flex" size="large" color="primary" aria-label="large outlined primary button group">
                        <Button className="d-flex" onClick={() => props.setType('user')} >Database User</Button>
                        <Button className="d-flex" onClick={() => props.setType('manager')}>Database Manager</Button>
                    </ButtonGroup>
                </div>
                <div className="col-7 mt-4">
                    <TextField className="d-flex" value={data.username} onChange={handleChange} name="username" label="Username" variant="outlined" />  
                </div>
                {props.type == "user" && 
                    <div className="col-7 mt-4">
                        <TextField className="d-flex" value={data.instituteName} onChange={handleChange} name="instituteName" label="Institute Name" variant="outlined" />  
                    </div>
                }
                <div className="col-7 mt-4">
                    <TextField className="d-flex" value={data.password} onChange={handleChange} name="password" label="Password" variant="outlined" />  
                </div> 
                <div className="col-7 justify-content-center d-flex mt-4">
                    <Button onClick={handleLogin} size="large" variant="contained" color="primary">
                        Login
                    </Button>    
                </div>                 
  
        </form>
    </div>
  );
}

export default Login;
