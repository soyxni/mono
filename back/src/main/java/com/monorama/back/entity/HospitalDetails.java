package com.monorama.back.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "hosp_details") // 기존 테이블명 유지
public class HospitalDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String ykiho; // 기관 코드 (기본키로 설정)

    private String yadmNm;  // 의료기관명
    private String clCd;  // 의료기관 코드
    private String clCdNm;  // 의료기관 규모명
    private String sidoCd; // 시/도 코드
    private String sidoCdNm; // 시/도 명
    private String sgguCd; // 시/군/구 코드
    private String sgguCdNm; // 시/군/구 명
    private String urlAddr; // 기관 URL
    private String sno; // 병원 번호
    private String npayCd; // 비급여 코드
    private String npayKorNm; // 비급여 항목명
    private String yadmNpayCdNm; // 의료기관별 비급여 코드명
    @Column(name = "adtFrDd")
    private String adtFrDd;
    @Column(name = "adtEndDd")
    private String adtEndDd;
    private String curAmt; // 현재 금액
}
