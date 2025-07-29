import Sidebar from './Pages/SideBar/Sidebar.jsx';
import ActivityForm from './Pages/ActivityForm/ActivityForm.jsx';
import Login from './Pages/Login/Login.jsx';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


const App = () => (

  <BrowserRouter>
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/ActivityForm" element={
              <div>
              { <Sidebar /> } 
              { <ActivityForm /> }
            </div>
        } />
    </Routes>

  </BrowserRouter>
);

export default App;
