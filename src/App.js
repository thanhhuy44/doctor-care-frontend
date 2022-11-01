import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, adminRoutes, doctorRoutes } from '~/routes';
import MainLayout from '~/layouts/MainLayout';
import 'antd/dist/antd.min.css';
import 'react-quill/dist/quill.snow.css';
import Login from './pages/Login';
import Error from './pages/Error';
import { useSelector } from 'react-redux';

function App() {
    const isLogin = useSelector((state) => state.doctorCare.isLogin);
    const roleLogin = useSelector((state) => state.doctorCare.roleLogin);
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        let Layout;
                        if (!route.layout) {
                            Layout = MainLayout;
                        } else {
                            Layout = route.layout;
                        }
                        let Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                    {isLogin === true && roleLogin === 'admin'
                        ? adminRoutes.map((route, index) => {
                              let Layout;
                              if (!route.layout) {
                                  Layout = MainLayout;
                              } else {
                                  Layout = route.layout;
                              }
                              let Page = route.component;
                              return (
                                  <Route
                                      key={index}
                                      path={route.path}
                                      element={
                                          <Layout>
                                              <Page />
                                          </Layout>
                                      }
                                  />
                              );
                          })
                        : adminRoutes.map((route, index) => {
                              return <Route key={index} path={route.path} element={<Login />} />;
                          })}

                    {isLogin === true && roleLogin === 'doctor'
                        ? doctorRoutes.map((route, index) => {
                              let Layout;
                              if (!route.layout) {
                                  Layout = MainLayout;
                              } else {
                                  Layout = route.layout;
                              }
                              let Page = route.component;
                              return (
                                  <Route
                                      key={index}
                                      path={route.path}
                                      element={
                                          <Layout>
                                              <Page />
                                          </Layout>
                                      }
                                  />
                              );
                          })
                        : doctorRoutes.map((route, index) => {
                              return <Route key={index} path={route.path} element={<Login />} />;
                          })}
                    <Route key={28062001} path={'*'} element={<Error />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
