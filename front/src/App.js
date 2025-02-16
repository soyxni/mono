import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import "./App.css"; // 공통 스타일 파일
const TestPage = () => <div>테스트 페이지</div>;

const App = () => {
    return (
        <Router>
            <div className="app">
                <Routes>
                    {/* "/" 경로에 MainPage 렌더링 */}
                    <Route path="/" element={<MainPage />} />
                    <Route path="/test" element={<TestPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
