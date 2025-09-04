import React, { useState, useEffect} from "react";
import "../css/MainPage.css"; // 필요한 스타일 포함
import axios from "axios";

const SearchResults = ({
  results = [],
  selectedSido = "",
  selectedSggu = "",
  selectedClCd = "",
  selectedNpay = ""
}) => {

  const [sortOption, setSortOption] = useState("정렬기준 선택");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedResults, setSortedResults] = useState(results);

  useEffect(() => {
    setSortedResults(results);
  }, [results]);

  // 현재 페이지에 표시할 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedResults.slice(indexOfFirstItem, indexOfLastItem); // ✅ 수정
  const totalPages = Math.ceil(sortedResults.length / itemsPerPage);

  const handleSortChange = (event) => {
    const selected = event.target.value;
    setSortOption(selected);

    let sorted = [...results];
    if (selected === "의료기관명↑") {
      sorted.sort((a, b) => a.yadmNm.localeCompare(b.yadmNm));
    } else if (selected === "의료기관명↓") {
      sorted.sort((a, b) => b.yadmNm.localeCompare(a.yadmNm));
    }

    setSortedResults(sorted);
    setCurrentPage(1);
  }; 

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // 페이지 변경 시 첫 페이지로 초기화
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const handleExcelDownload = async () => {
    try {
      const payload = {
        results,                  // 기존 결과 배열
        sidoCdNm: selectedSido || "전체",   
        sgguCdNm: selectedSggu || "전체",   
        clCdNm: selectedClCd || "전체",     
        npayKorNm: selectedNpay || "",  
      };
  
      const res = await axios.post(
        "http://localhost:8080/api/admin/excel-download",
        payload,
        { responseType: "blob" }
      );
  
      // 서버가 filename*=만 주므로 굳이 복잡한 파싱 필요 없음 (있어도 OK)
      const cd = res.headers["content-disposition"] || "";
      const m = /filename\*=UTF-8''([^;]+)/i.exec(cd);
      const filename = m ? decodeURIComponent(m[1]) : "download.csv";
  
      const blob = new Blob([res.data], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename; // 서버 파일명 그대로 저장
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("엑셀 다운로드 실패");
    }
  };

  return (
    <div className="search-results">
      <div className="results-header">
        <span>검색결과 총 {results.length}건</span>
        {isAdmin && (
          <button className="excel-download-btn" onClick={handleExcelDownload}>
            검색 결과 Excel 다운받기
          </button>
        )}
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
            <th>중분류</th>
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
          {currentItems.map((result, index) => {
            const [middle, small = "", detail = ""] = result.npayKorNm.split("/");
            return (
              <tr key={index}>
                <td>{result.yadmNm}</td>
                <td>{result.clCdNm}</td>
                <td>{`${result.sidoCdNm} ${result.sgguCdNm}`}</td>
                <td>{middle}</td>
                <td>{small}</td>
                <td>{detail || "-"}</td>
                <td></td>
                <td>{result.curAmt}</td>
                <td></td>
                <td>{`${result.minPrc} ~ ${result.maxPrc}`}</td>
                <td>{result.medianPrc}</td>
              </tr>
            );
          })}
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

        {(() => {
          const visibleRange = 5;
          const half = Math.floor(visibleRange / 2);
          let startPage = Math.max(1, currentPage - half);
          let endPage = startPage + visibleRange - 1;

          if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - visibleRange + 1);
          }

          const pages = [];
          for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
          }

          return pages.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={currentPage === page ? "active" : ""}
            >
              {page}
            </button>
          ));
        })()}

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