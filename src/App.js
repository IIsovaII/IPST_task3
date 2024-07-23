import "./App.css"
import Login from "./components/Login";
import ResponsiveAppBar from "./components/NavBar";
import {
    BrowserRouter as Router,
    Route,
    Routes
} from 'react-router-dom';
import Workplace from "./components/Test";
export const App = () => {
    const ClearLocalStorage = () => localStorage.clear();

    return (
        <>
            <ClearLocalStorage/>
            <Router>
                <div>
                    <ResponsiveAppBar />
                    <Routes>
                        <Route path="/" element={<Workplace/>} />
                        <Route path="/login" element={ <Login />} />
                    </Routes>
                </div>
            </Router>
        </>

    );
};
export default App;