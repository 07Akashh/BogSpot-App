import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import Dashboard from './components/Dashboard';
import BlogPage from './components/post/post_component/BlogPostModal';
import UserProfile from './components/profile/UserProfile';
import { AuthProvider } from './components/routes/AuthProvider';
import PrivateRoute from './components/routes/PrivateRoute';
import PublicRoute from './components/routes/PublicRoute';
import BlogPostDetail from './components/post/post_component/BlogPostDetail';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/register" element={<PublicRoute> <Register key={Date.now()}/> </PublicRoute>} />
                    <Route path="/login" element={<PublicRoute> <Login key={Date.now()} /> </PublicRoute>} />
                    <Route path="/" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
                    <Route path="/post/:id" element={<PrivateRoute> <BlogPostDetail/> </PrivateRoute>} />
                    <Route path="/posts" element={<PrivateRoute> <BlogPage /> </PrivateRoute>} />
                    <Route path="/user/:userId" element={<PrivateRoute> <UserProfile /> </PrivateRoute>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;