
import { Route, Routes } from 'react-router-dom';
import './App.css';
import FormBuilderPage from './Pages/FormBuilderPage/FormBuilderPage';
import { Toaster } from "react-hot-toast";
import Navbar from './components/Navbar/Navbar';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<FormBuilderPage/>} />
        <Route path='/forms' element={<FormBuilderPage/>} />
        
      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff"
          },
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black"
            }
          }
        }}
      />
    </div>
  );
}

export default App;
