import React, { useState } from "react";
import "../css/MainPage.css"; // 필요한 스타일 포함

const SearchResults = () => {
  const [results, setResults] = useState([
    {
      id: 1,
      name: "(사)인구보건복지협회 서울지회 가족보건의원",
      size: "의원",
      location: "서울 광진구",
      category: "예방접종료",
      subcategory: "인플루엔자(독감)",
      detail: "보령플루V테트라백신주",
      price_category: "독감_4가",
      price:"23,000",
      price_specific:"",
      price_maxmin:"23,000~23,000",
      price_mid:"40,000"
    },
    {
      id: 2,
      name: "sample2",
      size: "",
      location: "",
      category: "",
      subcategory: "",
      detail: "",
      price_category: "",
      price:"",
      price_specific:"",
      price_maxmin:"",
      price_mid:""
    },
    {
      id: 3,
      name: "sample3",
      size: "",
      location: "",
      category: "",
      subcategory: "",
      detail: "",
      price_category: "",
      price:"",
      price_specific:"",
      price_maxmin:"",
      price_mid:""
    },
    {
      id: 4,
      name: "sample4",
      size: "",
      location: "",
      category: "",
      subcategory: "",
      detail: "",
      price_category: "",
      price:"",
      price_specific:"",
      price_maxmin:"",
      price_mid:""
    },
    {
      id: 5,
      name: "sample5",
      size: "",
      location: "",
      category: "",
      subcategory: "",
      detail: "",
      price_category: "",
      price:"",
      price_specific:"",
      price_maxmin:"",
      price_mid:""
    },
    {
      id: 6,
      name: "sample6",
      size: "",
      location: "",
      category: "",
      subcategory: "",
      detail: "",
      price_category: "",
      price:"",
      price_specific:"",
      price_maxmin:"",
      price_mid:""
    },
    {
      id: 7,
      name: "sample7",
      size: "",
      location: "",
      category: "",
      subcategory: "",
      detail: "",
      price_category: "",
      price:"",
      price_specific:"",
      price_maxmin:"",
      price_mid:""
    },
    {
      id: 8,
      name: "sample8",
      size: "",
      location: "",
      category: "",
      subcategory: "",
      detail: "",
      price_category: "",
      price:"",
      price_specific:"",
      price_maxmin:"",
      price_mid:""
    },
    {
      id: 9,
      name: "sample9",
      size: "",
      location: "",
      category: "",
      subcategory: "",
      detail: "",
      price_category: "",
      price:"",
      price_specific:"",
      price_maxmin:"",
      price_mid:""
    },
    {
      id: 10,
      name: "sample10",
      size: "",
      location: "",
      category: "",
      subcategory: "",
      detail: "",
      price_category: "",
      price:"",
      price_specific:"",
      price_maxmin:"",
      price_mid:""
    },
    {
      id: 11,
      name: "sample11",
      size: "",
      location: "",
      category: "",
      subcategory: "",
      detail: "",
      price_category: "",
      price:"",
      price_specific:"",
      price_maxmin:"",
      price_mid:""
    },
    {
      id: 12,
      name: "sample12",
      size: "",
      location: "",
      category: "",
      subcategory: "",
      detail: "",
      price_category: "",
      price:"",
      price_specific:"",
      price_maxmin:"",
      price_mid:""
    },
    {
      id: 13,
      name: "sample13",
      size: "",
      location: "",
      category: "",
      subcategory: "",
      detail: "",
      price_category: "",
      price:"",
      price_specific:"",
      price_maxmin:"",
      price_mid:""
    },
    {
      id: 14,
      name: "sample14",
      size: "",
      location: "",
      category: "",
      subcategory: "",
      detail: "",
      price_category: "",
      price:"",
      price_specific:"",
      price_maxmin:"",
      price_mid:""
    },
    {
      id: 15,
      name: "sample15",
      size: "",
      location: "",
      category: "",
      subcategory: "",
      detail: "",
      price_category: "",
      price:"",
      price_specific:"",
      price_maxmin:"",
      price_mid:""
    },
    {
      id: 16,
      name: "sample16",
      size: "",
      location: "",
      category: "",
      subcategory: "",
      detail: "",
      price_category: "",
      price:"",
      price_specific:"",
      price_maxmin:"",
      price_mid:""
    },
    {
      id: 17,
      name: "sample17",
      size: "",
      location: "",
      category: "",
      subcategory: "",
      detail: "",
      price_category: "",
      price:"",
      price_specific:"",
      price_maxmin:"",
      price_mid:""
    },
  ]);

  const [sortOption, setSortOption] = useState("정렬기준 선택");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(results.length / itemsPerPage);

  // 현재 페이지에 표시할 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = results.slice(indexOfFirstItem, indexOfLastItem);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // 페이지 변경 시 첫 페이지로 초기화
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="search-results">
      <div className="results-header">
        <span>검색결과 총 {results.length}건</span>
        <button className="excel-download-btn">검색 결과 Excel 다운받기</button>
        <div className="controls">
          <select value={sortOption} onChange={handleSortChange}>
            <option>정렬기준 선택</option>
            <option>의료기관명↑</option>
            <option>의료기관명↓</option>
          </select>
          <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
            <option value={10}>10개씩 보기</option>
            <option value={15}>15개씩 보기</option>
            <option value={20}>20개씩 보기</option>
          </select>
        </div>
      </div>

      <table className="results-table">
        <thead>
          <tr>
            <th>의료기관명</th>
            <th>의료기관규모</th>
            <th>소재지</th>
            <th>증분류</th>
            <th>소분류</th>
            <th>상세분류</th>
            <th>가격정보 구분</th>
            <th>금액</th>
            <th>특이사항</th>
            <th>해당의료기관(최저금액~최고금액)</th>
            <th>해당지역 동일규모의 중간금액</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((result) => (
            <tr key={result.id}>
              <td>{result.name}</td>
              <td>{result.size}</td>
              <td>{result.location}</td>
              <td>{result.category}</td>
              <td>{result.subcategory}</td>
              <td>{result.detail}</td>
              <td>{result.price_category}</td>
              <td>{result.price}</td>
              <td>{result.price_specific}</td>
              <td>{result.price_maxmin}</td>
              <td>{result.price_mid}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          {"<<"}
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
};

export default SearchResults;