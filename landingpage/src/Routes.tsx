import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AboutUs from './containers/AboutUs/AboutUs';
import Careers from './containers/Careers/Careers';
import ContactUs from './containers/ContactUs/ContactUs';
import Landing from './containers/Landing/Landing';
import Privacy from './containers/Privacy/Privacy';
import { ROUTES } from './shared/constants';

const Routess: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LANDING} element={<Landing />} />
        <Route path={ROUTES.ABOUT_US} element={<AboutUs />} />
        <Route path={ROUTES.CAREERS} element={<Careers />} />
        <Route path={ROUTES.CONTACT_US} element={<ContactUs />} />
        <Route path={ROUTES.PRIVACY} element={<Privacy />} />
        {/* <Redirect to={ROUTES.LANDING} /> */}
        {/* <Route render={() => <Route path={ROUTES.LANDING} />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Routess;
