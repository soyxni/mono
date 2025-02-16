import React, { useState } from "react";
import SearchSection from "../components/SearchSection";
import SearchResults from "../components/SearchResults";
import "../css/MainPage.css"; // MainPage 스타일

const MainPage = () => {
    const [isSearchTabOpen, setIsSearchTabOpen] = useState(false); // 검색 섹션 열림 상태 관리

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
                {isSearchTabOpen && <SearchSection />} {/* 탭이 열렸을 때만 렌더링 */}
            </div>

            {/* 메인 페이지 */}
            <div className="main-content" style={{ marginLeft: isSearchTabOpen ? "40%" : "0" }}>
                <h1>비급여 진료비용 정보</h1>
                <SearchResults />
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
