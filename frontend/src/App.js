import React, { useState } from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./components/Login"
import NewUser from "./components/NewUser"
import Navbar from "./components/Navbar"
import DeleteUpdateDrug from "./components/DeleteUpdateDrug"
import DeleteProtein from "./components/DeleteProtein"
import UpdateContributorsOfPaper from "./components/UpdateContributorsOfPaper"
import ManagerHome from './components/ManagerHome';
import UserHome from './components/UserHome';
import ViewsOfDrug from './components/ViewsOfDrug';
import ViewsOfProtein from './components/ViewsOfProtein';
import KeywordForDrug from './components/KeywordForDrug';
import FieldsOfAllDrugs from './components/FieldsOfAllDrugs';
import FieldsOfAllPapers from './components/FieldsOfAllPapers';
import RankInstitutes from './components/RankInstitutes';
import FilterTargetsOfDrug from './components/FilterTargetsOfDrug';

function App() {
  const [type, setType] = useState('user') // user or manager


  return (
    <>
      <Navbar type={type} />
      <Switch>
      <Route path="/filterTargetsOfDrug" component={FilterTargetsOfDrug} />
      <Route path="/rankInstitutes" component={RankInstitutes} />
      <Route path="/fieldsOfAllPapers" component={FieldsOfAllPapers} />
      <Route path="/fieldsOfAllDrugs" component={FieldsOfAllDrugs} />
      <Route path="/keywordForDrug" component={KeywordForDrug} />
       <Route path="/viewsOfProtein" component={ViewsOfProtein} />
        <Route path="/viewsOfDrug" component={ViewsOfDrug} />
        <Route path="/updateContributorsOfPaper" component={UpdateContributorsOfPaper} />
        <Route path="/deleteProtein" component={DeleteProtein} />
        <Route path="/deleteUpdateDrug" component={DeleteUpdateDrug} />
        <Route path="/newUser" component={NewUser} />
        <Route path="/managerHome" component={ManagerHome} />
        <Route path="/userHome" component={UserHome} />
        <Route path="/login">
          <Login type={type} setType={setType} />
        </Route>
        <Redirect from="/" to="/login" />
      </Switch>
    </>
  );
}

export default App;
