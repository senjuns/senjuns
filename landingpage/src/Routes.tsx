import { FC } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { ROUTES } from 'shared/constants';
import Landing from 'containers/Landing/Landing';
import AboutUs from 'containers/AboutUs/AboutUs';
import Careers from 'containers/Careers/Careers';
import ContactUs from 'containers/ContactUs/ContactUs';
import Privacy from 'containers/Privacy/Privacy';

const Routes: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={ROUTES.LANDING} component={Landing} />
        <Route exact path={ROUTES.ABOUT_US} component={AboutUs} />
        <Route exact path={ROUTES.CAREERS} component={Careers} />
        <Route exact path={ROUTES.CONTACT_US} component={ContactUs} />
        <Route exact path={ROUTES.PRIVACY} component={Privacy} />
        <Redirect to={ROUTES.LANDING} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
