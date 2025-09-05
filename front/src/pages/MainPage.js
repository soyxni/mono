import React, { useState, useEffect } from "react";
import SearchSection from "../components/SearchSection";
import SearchResults from "../components/SearchResults";
import axios from "axios";
import "../css/MainPage.css"; // MainPage 스타일
import { useNavigate } from "react-router-dom";

const MainPage = () => {
    const [isSearchTabOpen, setIsSearchTabOpen] = useState(false); // 검색 섹션 열림 상태 관리
    const [searchResults, setSearchResults] = useState([]);

    const [selectedSido, setSelectedSido] = useState("");   
    const [selectedSggu, setSelectedSggu] = useState("");   
    const [selectedClCd, setSelectedClCd] = useState("");  
    const [selectedNpay, setSelectedNpay] = useState("");
    
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const id = localStorage.getItem("userId");
        const password = localStorage.getItem("userPw");

        if (id && password) {
            setIsLoggedIn(true);

            axios.post("http://localhost:8080/api/admin/check", {id, password})
                .then(res => setIsAdmin(res.data === true))
                .catch(err => {
                    console.error("관리자 확인 실패", err);
                    setIsAdmin(false);
                });
        } else {
            setIsLoggedIn(false);
            setIsAdmin(false);
        }
    }, []);

    const toggleSearchTab = () => {
        setIsSearchTabOpen((prevState) => !prevState); // 상태 반전
    };

    return (
        <div className="main-page">
            {/* 검색 섹션 */}
            <div
                className={`search-tab ${isSearchTabOpen ? "visible" : "hidden"}`}
                style={{
                    width: isSearchTabOpen ? "40%" : "0",
                    transition: "width 0.3s ease",
                }}
            >
                {isSearchTabOpen && 
                <SearchSection 
                    setSearchResults={setSearchResults}
                    setSelectedSido={setSelectedSido}
                    setSelectedSggu={setSelectedSggu}
                    setSelectedClCd={setSelectedClCd}
                    setSelectedNpay={setSelectedNpay}
                />} {/* 탭이 열렸을 때만 렌더링 */}
            </div>

            <div style={{ position: "absolute", top: "20px", right: "30px" }}>
                {isAdmin ? (
                    <button
                        onClick={() => {
                            localStorage.removeItem("userId");
                            localStorage.removeItem("userPw");
                            setIsAdmin(false);
                            navigate("/");
                        }}
                    >
                        로그아웃
                    </button>
                ) : (
                    <button onClick={() => navigate("/admin-login")}>관리자 로그인</button>
                )}
            </div>


            {/* 메인 페이지 */}
            <div className="main-content" style={{ marginLeft: isSearchTabOpen ? "40%" : "0" }}>
                <h1>비급여 진료비용 정보</h1>
                <SearchResults 
                    results={searchResults}
                    selectedSido={selectedSido}
                    selectedSggu={selectedSggu}
                    selectedClCd={selectedClCd}
                    selectedNpay={selectedNpay}
                    isAdmin={isAdmin}
                />
            </div>

            {/* 탭 토글 버튼 */}
            <button
                className={`toggle-button ${isSearchTabOpen ? "open" : "close"}`}
                onClick={toggleSearchTab}
            >
                {isSearchTabOpen ? "❮" : "❯"}
            </button>
        </div>
    );
};

export default MainPage;
