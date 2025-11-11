import Footer from "./components/footer/Footer";
import {Box} from "@mui/material";
import WhyChooseUsScreen from "./screens/why-choose-us-screen/WhyChooseUsScreen";
import Assortment from "./screens/assortment/Assortment";

function App() {
    return (
        <Box>
            <Assortment />
            <WhyChooseUsScreen />
            <Footer />
        </Box>
    )
}

export default App;