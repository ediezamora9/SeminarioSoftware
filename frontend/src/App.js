import { Switch, Route, Redirect } from 'react-router-dom';

// Hoc
import PrivateRoute from './components/hoc/privateRoute/index';
import IsAdmin from './components/hoc/isAdmin/index';
import Layout from './components/hoc/layout/index';

// Public
import Login from './components/public/loginPage/index';
import BrandsPage from './components/public/brandsPage/index';
import YearsPage from './components/public/yearsPage/index';
import ModelPage from './components/public/modelPage/index';
import EnginePage from './components/public/enginePage/index';
import ComponentPage from './components/public/componentsPage/index';
import SubComponentPage from './components/public/subComponentsPage/index';
import PartsPage from './components/public/partsPage/index';
import PartPage from './components/public/partPage/index';
import SearchPage from './components/public/searchPage/index';

// Private

import MainPage from './components/private/mainPage/index';

import AdminUSerPage from './components/private/adminPages/adminUserPage/index';
import AddUserPage from './components/private/addUserPage/index';

import AdminBrandPage from './components/private/adminPages/adminBrandPage/index';
import AdminYearPage from './components/private/adminPages/adminYearPage/index';
import AdminModelPage from './components/private/adminPages/adminModelPage/index';
import AdminEnginePage from './components/private/adminPages/adminEnginePage/index';
import AdminComponentPage from './components/private/adminPages/adminComponentPage/index';
import AdminSubComponentPage from './components/private/adminPages/adminSubComponentPage/index';
import AdminPartPage from './components/private/adminPages/adminPartPage/index';

import AddBrandPage from './components/private/addBrandPage/index';
import AddYearPage from './components/private/addYearPage/index';
import AddModelPage from './components/private/addModelPage/index';
import AddEnginePage from './components/private/addEnginePage/index';
import AddCategoryPage from './components/private/addComponentPage/index';
import AddSubComponentPage from './components/private/addSubComponentPage/index';
import AddPartPage from './components/private/addPartPage/index';
import EditPartPage from './components/private/EditPartPage';

function App() {
	return (
		<div>
      <Switch>
        <Route exact path="/" exact render={() => (<Redirect to="/info"/>)}/>

        <Route path='/login' exact component={Login} />

        <PrivateRoute exact path="/search" exact component={Layout(SearchPage)}/>

        <PrivateRoute path='/info' exact component={Layout(BrandsPage)} />
        <PrivateRoute path='/info/:brandID/:year/:modelID/:engineID/:category/:subComponentID/:partID' component={Layout(PartPage)} />
        <PrivateRoute path='/info/:brandID/:year/:modelID/:engineID/:category/:subComponentID' component={Layout(PartsPage)} />
        <PrivateRoute path='/info/:brandID/:year/:modelID/:engineID/:category' component={Layout(SubComponentPage)} />
        <PrivateRoute path='/info/:brandID/:year/:modelID/:engineID' component={Layout(ComponentPage)} />
        <PrivateRoute path='/info/:brandID/:year/:modelID' component={Layout(EnginePage)} />
        <PrivateRoute path='/info/:brandID/:year' component={Layout(ModelPage)} />
        <PrivateRoute path='/info/:brandID' component={Layout(YearsPage)} />

        <PrivateRoute path='/admin' exact component={IsAdmin(Layout(MainPage))} />
        
        <PrivateRoute path='/admin/user' exact component={IsAdmin(Layout(AdminUSerPage))} />
        <PrivateRoute path='/admin/user/add' exact component={IsAdmin(Layout(AddUserPage))} />

        <PrivateRoute path='/admin/main/add' exact component={IsAdmin(Layout(AddBrandPage))} />
        <PrivateRoute path='/admin/main/add/:brandID/:year/:modelID/:engineID/:category/:subComponentID' component={IsAdmin(Layout(AddPartPage))} />
        <PrivateRoute path='/admin/main/add/:brandID/:year/:modelID/:engineID/:category' component={IsAdmin(Layout(AddSubComponentPage))} />
        <PrivateRoute path='/admin/main/add/:brandID/:year/:modelID/:engineID' component={IsAdmin(Layout(AddCategoryPage))} />
        <PrivateRoute path='/admin/main/add/:brandID/:year/:modelID' component={IsAdmin(Layout(AddEnginePage))} />
        <PrivateRoute path='/admin/main/add/:brandID/:year' component={IsAdmin(Layout(AddModelPage))} />
        <PrivateRoute path='/admin/main/add/:brandID' component={IsAdmin(Layout(AddYearPage))} />

        <PrivateRoute path='/admin/main/edit/:brandID/:year/:modelID/:engineID/:category/:subComponentID/:partID' component={IsAdmin(Layout(EditPartPage))} />
        
        <PrivateRoute path='/admin/main' exact component={IsAdmin(Layout(AdminBrandPage))} />
        <PrivateRoute path='/admin/main/:brandID/:year/:modelID/:engineID/:category/:subComponentID' component={IsAdmin(Layout(AdminPartPage))} />
        <PrivateRoute path='/admin/main/:brandID/:year/:modelID/:engineID/:category' component={IsAdmin(Layout(AdminSubComponentPage))} />
        <PrivateRoute path='/admin/main/:brandID/:year/:modelID/:engineID' component={IsAdmin(Layout(AdminComponentPage))} />
        <PrivateRoute path='/admin/main/:brandID/:year/:modelID' component={IsAdmin(Layout(AdminEnginePage))} />
        <PrivateRoute path='/admin/main/:brandID/:year' component={IsAdmin(Layout(AdminModelPage))} />
        <PrivateRoute path='/admin/main/:brandID' component={IsAdmin(Layout(AdminYearPage))} />


        <Route path='*' render={() => <h1>Página No Encontrada</h1>} />
      </Switch>
		</div>
	);
}

export default App;
