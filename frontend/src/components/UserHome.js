import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useHistory, Link } from "react-router-dom";



const UserHome = (props) => {
  const history = useHistory();


  return (
    <div className="container" style={{marginTop: 50}}>
      <div className="row justify-content-center">
      <div className="col-3 mb-4" >
          <Link to="/fieldsOfAllDrugs">
            <Button variant="contained" color="primary">
            Fields of All Drugs
            </Button>    
          </Link> 
        </div>
        <div className="col-3" >
          <Link to="/viewsOfDrug">
            <Button variant="contained" color="primary">
            Views of Drugs
            </Button>    
          </Link> 
        </div>
        <div className="col-3" >
          <Link to="/viewsOfProtein">
            <Button variant="contained" color="primary">
            Views of Protein
            </Button>    
          </Link> 
        </div>
        <div className="col-3" >
          <Link to="/keywordForDrug">
            <Button variant="contained" color="primary">
            Keyword search for drug
            </Button>    
          </Link> 
        </div>
        <div className="col-3" >
          <Link to="/fieldsOfAllPapers">
            <Button variant="contained" color="primary">
            Fields of All Papers
            </Button>    
          </Link> 
        </div>
        <div className="col-3" >
          <Link to="/rankInstitutes">
            <Button variant="contained" color="primary">
            rank institutes
            </Button>    
          </Link> 
        </div>
        <div className="col-3" >
          <Link to="/filterTargetsOfDrug">
            <Button variant="contained" color="primary">
            filter interacting targets of a specific drug
            </Button>    
          </Link> 
        </div>
      </div>

    </div>
  );
}

export default UserHome;
