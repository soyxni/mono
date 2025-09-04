package com.monorama.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

import com.monorama.back.entity.HospitalDetails;

import java.util.List;

@Repository
public interface HospitalDetailsRepository extends JpaRepository<HospitalDetails, Long> {

    @Query(value = """
    SELECT h.yadmNm, h.clCdNm, h.sidoCdNm, h.sgguCdNm, h.npayKorNm, h.curAmt,
           s.minPrc, s.maxPrc,
           (SELECT curAmt FROM (
               SELECT d.curAmt,
                      ROW_NUMBER() OVER (ORDER BY d.curAmt) AS row_num,
                      COUNT(*) OVER () AS total_rows
               FROM hosp_details d
               WHERE d.sidoCdNm = h.sidoCdNm
                 AND d.sgguCdNm = h.sgguCdNm
                 AND d.clCdNm = h.clCdNm
                 AND d.npayKorNm = h.npayKorNm
           ) sub WHERE row_num = FLOOR(total_rows / 2) + 1) AS medianPrc
    FROM hosp_details h
    LEFT JOIN hosp_summary s ON h.yadmNm = s.yadmNm AND h.npayKorNm = s.npayKorNm
    WHERE (:sidoCdNm IS NULL OR h.sidoCdNm = :sidoCdNm)
      AND (:sgguCdNm IS NULL OR h.sgguCdNm = :sgguCdNm)
      AND (:clCdNm IS NULL OR h.clCdNm = :clCdNm)
      AND (:kw1 IS NULL OR h.npayKorNm LIKE CONCAT('%', :kw1, '%'))
      AND (:kw2 IS NULL OR h.npayKorNm LIKE CONCAT('%', :kw2, '%'))
      AND (:kw3 IS NULL OR h.npayKorNm LIKE CONCAT('%', :kw3, '%'))
""", nativeQuery = true)
    List<Object[]> searchByFilters(
            @Param("sidoCdNm") String sidoCdNm,
            @Param("sgguCdNm") String sgguCdNm,
            @Param("clCdNm") String clCdNm,
            @Param("kw1") String kw1,
            @Param("kw2") String kw2,
            @Param("kw3") String kw3
    );
}
