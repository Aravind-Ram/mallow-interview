import { AuthProvider } from './context/AuthContext';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import routes from './routes';
import './App.css';
import { Suspense } from 'react';
import AuthStatus from './components/AuthStatus';
import Login from './pages/Login';
import RequireAuth from './middlewares/RequireAuth';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter future={{ v7_startTransition: true }}>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>              
              <Route path="/" element={<Login/>} />
                {routes.map((route) => <Route
                  key={route.path}
                  path={route.path}
                  element={ route.isProtected ? <RequireAuth><route.component /></RequireAuth> : <route.component />}
                />
                )}              
            </Routes>
          </Suspense>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
