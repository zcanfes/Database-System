import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useHistory, Link } from "react-router-dom";



const ManagerHome = (props) => {
  const history = useHistory();


  return (
    <div className="container" style={{marginTop: 50}}>
      <div className="row justify-content-center">
        <div className="col-3 mb-4" >
          <Link to="/newUser">
            <Button variant="contained" color="primary">
              Add New User to the System
            </Button>    
          </Link> 
        </div>
        <div className="col-3" >
          <Link to="/deleteUpdateDrug">
            <Button variant="contained" color="primary">
              Update or Delete Drug
            </Button>    
          </Link> 
        </div>
        <div className="col-3" >
          <Link to="/deleteProtein">
            <Button variant="contained" color="primary">
              Delete Protein
            </Button>    
          </Link> 
        </div>
        <div className="col-3" >
          <Link to="/updateContributorsOfPaper">
            <Button variant="contained" color="primary">
              update contributors of paper
            </Button>    
          </Link> 
        </div>
        <div className="col-3" >
          <Link to="/managerView">
            <Button variant="contained" color="primary">
              View Database Items
            </Button>    
          </Link> 
        </div>
      </div>
    </div>
  );
}

export default ManagerHome;
