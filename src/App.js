import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '~/routes';
import MainLayout from '~/layouts/MainLayout';
import 'antd/dist/antd.min.css';
import 'react-quill/dist/quill.snow.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import Login from './pages/Login';
import Error from './pages/Error';

function App() {
    const isLogin = false;
    return (
        <Provider store={store}>
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
                        {isLogin
                            ? privateRoutes.map((route, index) => {
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
                            : privateRoutes.map((route, index) => {
                                  return <Route key={index} path={route.path} element={<Login />} />;
                              })}
                        <Route key={28062001} path={'*'} element={<Error />} />
                    </Routes>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
