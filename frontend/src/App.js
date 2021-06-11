import React, { useState } from 'react';
import { Redirect, Route, Switch } from "react-router-dom";

import Login from "./components/Common/Login"
import Navbar from "./components/Common/Navbar"

import NewUser from "./components/Manager/NewUser"
import DeleteUpdateDrug from "./components/Manager/DeleteUpdateDrug"
import DeleteProtein from "./components/Manager/DeleteProtein"
import UpdateContributorsOfPaper from "./components/Manager/UpdateContributorsOfPaper"
import ManagerHome from './components/Manager/ManagerHome';
import ManagerView from './components/Manager/ManagerView';

import UserHome from './components/User/UserHome';
import ViewsOfDrug from './components/User/ViewsOfDrug';
import ViewsOfProtein from './components/User/ViewsOfProtein';
import KeywordForDrug from './components/User/KeywordForDrug';
import SeparatelyViewOfDrugs from './components/User/SeparatelyViewOfDrugs';
import ViewAllPapers from './components/User/ViewAllPapers';
import RankInstitutes from './components/User/RankInstitutes';
import FilterTargetsOfDrug from './components/User/FilterTargetsOfDrug';

function App() {
  const [type, setType] = useState('user') // user or manager


  return (
    <>
      <Navbar type={type} />
      <Switch>
        <Route path="/filterTargetsOfDrug" component={FilterTargetsOfDrug} />
        <Route path="/rankInstitutes" component={RankInstitutes} />
        <Route path="/viewAllPapers" component={ViewAllPapers} />
        <Route path="/separatelyViewOfDrugs" component={SeparatelyViewOfDrugs} />
        <Route path="/keywordForDrug" component={KeywordForDrug} />
        <Route path="/viewsOfProtein" component={ViewsOfProtein} />
        <Route path="/viewsOfDrug" component={ViewsOfDrug} />
       
        <Route path="/managerView" component={ManagerView} />
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
