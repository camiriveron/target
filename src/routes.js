import routesPaths from 'constants/routesPaths';
import HomePage from 'containers/HomePage';
import LoginPage from 'containers/LoginPage';
import SignUpPage from 'containers/SignUpPage';
import NotFoundPage from 'containers/NotFoundPage';
import EditProfilePage from 'containers/EditProfilePage';

const routes = [
  {
    path: routesPaths.index,
    component: HomePage,
    exact: true,
    private: true
  },
  {
    path: routesPaths.editProfile,
    component: EditProfilePage,
    exact: true,
    private: true
  },
  {
    path: routesPaths.login,
    component: LoginPage
  },
  {
    path: routesPaths.signUp,
    component: SignUpPage
  },
  {
    component: NotFoundPage
  }
];

export default routes;
