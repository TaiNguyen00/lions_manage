
import { BrowserRouter } from 'react-router-dom'
import Router from './router'
import './App.css'
import { AuthProvider } from "./context";
function App() {


  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
