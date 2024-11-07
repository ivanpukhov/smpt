import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Main from "./Pages/Main";
import { AfishaItemPage } from "./Pages/AfishaPage";
import Header from "./components/Header";
import String from "./components/String";
import HouseDetailsPage from "./Pages/HouseDetailsPage";
import React, { useEffect, useState } from "react";
import "./App.scss";
import { AdtPage } from "./Pages/AdtPage";
import { AfishasPage } from "./Pages/AfishasPage";
import { ForumPage } from "./Pages/ForumPage";
import { HousePage } from "./Pages/HousePage";
import { SosPage } from "./Pages/SosPage";
import { Footer } from "./components/Footer";
import AuthPage from "./Pages/AuthPage";
import { setAuthToken } from "./api";
import { SravkaPage } from "./Pages/SravkaPage";
import ProfilePage from "./Pages/ProfilePage";
import EmergencyServiceRequestsPage from "./Pages/EmergencyRequestsPage";
import AdminPage from "./Pages/AdminPage";
import SendEmergencyAlertPage from "./Pages/SendEmergencyAlertPage";
import AddEventPage from "./Pages/AddEventPage";
import AddDiscussionPage from "./Pages/AddDiscussionPage";
import EditProfilePage from "./Pages/EditProfilePage"; // добавьте ваш компонент профиля

const App = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuthToken(token);
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <Router>
            <Header isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
            <String />
            <div className="pop">
                <Routes>
                    <Route
                        path="/auth"
                        element={isAuthenticated ? <Navigate to="/profile" /> : <AuthPage setIsAuthenticated={setIsAuthenticated} />}
                    />
                    <Route
                        path="/profile"
                        element={isAuthenticated ? <ProfilePage /> : <Navigate to="/auth" />}
                    />
                    <Route path="/" element={<Main isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />} />
                    <Route path="/afisha/:eventId" element={<AfishaItemPage />} />
                    <Route path="/house/:directoryServiceId" element={<HouseDetailsPage />} />
                    <Route path="/events" element={<AfishasPage />} />
                    <Route path="/forum" element={<ForumPage />} />
                    <Route path="/spravka" element={<SravkaPage />} />
                    <Route path="/houses" element={<HousePage />} />
                    <Route path="/sos" element={<SosPage />} />
                    <Route path="/adt" element={<AdtPage />} />
                    <Route path="/emergency-services/:phoneNumber/requests" element={<EmergencyServiceRequestsPage />} /> {/* Новый маршрут */}
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/send-emergency-alert" element={<SendEmergencyAlertPage />} /> {/* Новый маршрут */}
                    <Route path="/discussions/add" element={<AddDiscussionPage />} />
                    <Route path="/events/add" element={<AddEventPage />} />
                    <Route path="/profile/edit" element={<EditProfilePage />} />

                </Routes>
            </div>
            <Footer />
        </Router>
    );
};

export default App;
