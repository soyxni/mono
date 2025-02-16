import React from "react";
import "../css/ButtonGrid.css";

const ButtonGrid = ({ onButtonClick }) => {
    const buttons = [
        "상급병실료", "교육상담료", "검체·병리검사료", "기능검사료",
        "내시경, 천자 및 생검료", "초음파", "영상진단 및 방사선치료료", "MRI",
        "주사료", "물리치료", "정신요법료", "처치 및 수술료", "모발 이식술료",
        "시력 교정술료", "치과", "한방", "예방접종료", "치료재료", "보장구", "제증명 수수료",
    ];

    return (
        <div className="button-grid">
            {buttons.map((label) => (
                <button key={label} onClick={() => onButtonClick(label)}>
                    {label}
                </button>
            ))}
        </div>
    );
};

export default ButtonGrid;
