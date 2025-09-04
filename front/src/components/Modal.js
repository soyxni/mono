// Modal.js
import React, { useState, useEffect } from "react";
import "../css/Modal.css";

const Modal = ({ buttonId, onClose, onSearch, modalOptions }) => {
  const modalContent = modalOptions[buttonId] || []; // 현재 선택된 버튼의 항목들

  const [selectedItems, setSelectedItems] = useState([]); // 선택된 항목들: [{ middle, small, detail }]

  // 체크 여부 확인
  const isChecked = (middle, small, detail) => {
    return selectedItems.some(
      (item) =>
        item.middle === middle &&
        item.small === small &&
        item.detail === detail
    );
  };

  // 항목 토글 (선택/해제)
  const toggleItem = (middle, small, detail) => {
    setSelectedItems((prev) => {
      const exists = prev.some(
        (item) =>
          item.middle === middle &&
          item.small === small &&
          item.detail === detail
      );
      if (exists) {
        return prev.filter(
          (item) =>
            !(item.middle === middle &&
              item.small === small &&
              item.detail === detail)
        );
      } else {
        return [...prev, { middle, small, detail }];
      }
    });
  };

  // 하위 항목 전체 선택 여부 확인
  const isGroupAllSelected = (middle, small, items) => {
    return items.every((item) => isChecked(middle, small, item.name));
  };

  // 상위 항목 전체 선택/해제 토글
  const toggleGroup = (middle, small, items) => {
    const allSelected = isGroupAllSelected(middle, small, items);
    setSelectedItems((prev) => {
      const filtered = prev.filter(
        (item) => !(item.middle === middle && item.small === small)
      );
      if (allSelected) {
        return filtered;
      } else {
        const toAdd = items.map((i) => ({
          middle,
          small,
          detail: i.name,
        }));
        return [...filtered, ...toAdd];
      }
    });
  };

  // 검색 버튼 클릭 시 선택 항목 전달
  const handleSubmit = () => {
    onSearch(selectedItems);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>상세분야 선택</h2>
          <button className="close-button" onClick={onClose}>X</button>
        </div>

        <div className="modal-body">
          {modalContent.map((group, idx) => (
            <div key={idx} className="modal-group">
              <h3>{group.category}</h3>
              {group.items.map((item, iidx) => (
                <div key={iidx} className="modal-item-group">
                  <div className="item">
                    <input
                      type="checkbox"
                      checked={
                        item.subItems
                          ? isGroupAllSelected(group.category, item.name, item.subItems)
                          : isChecked(group.category, item.name, null)
                      }
                      onChange={() => {
                        if (item.subItems) {
                          toggleGroup(group.category, item.name, item.subItems);
                        } else {
                          toggleItem(group.category, item.name, null); // ✅ small까지 전달
                        }
                      }}
                    />
                    <label>
                      {item.name}
                      {item.subItems && " (전체)"}
                    </label>
                  </div>

                  {item.subItems && (
                    <ul className="subitem-list">
                      {item.subItems.map((sub, sidx) => (
                        <li key={sidx}>
                          <input
                            type="checkbox"
                            checked={isChecked(group.category, item.name, sub.name)}
                            onChange={() =>
                              toggleItem(group.category, item.name, sub.name) // ✅ 세 값 모두 전달
                            }
                          />
                          <label>{sub.name}</label>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="modal-footer">
          <button className="search-button" onClick={handleSubmit}>
            선택항목 검색
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
