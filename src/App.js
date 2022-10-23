import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import MainLayout from '~/layouts/MainLayout';
import 'antd/dist/antd.min.css';
import 'react-quill/dist/quill.snow.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import { useSelector } from 'react-redux';

function App() {
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
                    </Routes>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
