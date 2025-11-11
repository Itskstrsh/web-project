import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Box } from "@mui/material";
import { store } from './store/store';
import Header from './components/Header/Header';
import HeroBanner from './components/HeroBanner/HeroBanner';
import Footer from "./components/footer/Footer";
import WhyChooseUsScreen from "./screens/why-choose-us-screen/WhyChooseUsScreen";
import Assortment from "./screens/assortment/Assortment";
import CategoryPage from "./screens/category-page/CategoryPage";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh'
                }}>
                    <Header />
                    <Box sx={{ flex: 1 }}> {/* Контент растягивается */}
                        <Routes>
                            <Route path="/" element={
                                <>
                                    <HeroBanner />
                                    <Assortment />
                                    <WhyChooseUsScreen />
                                </>
                            } />
                            <Route path="/category/:categoryId" element={<CategoryPage />} />
                        </Routes>
                    </Box>
                    <Footer />
                </Box>
            </Router>
        </Provider>
    )
}

export default App;