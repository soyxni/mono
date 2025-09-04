package com.monorama.back.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor // 반드시 필요! new DTO() 위해
public class HospitalDetailsDTO {

    private String yadmNm;         // 의료기관명
    private String clCdNm;         // 의료기관규모
    private String sidoCdNm;       // 시도
    private String sgguCdNm;       // 시군구
    private String npayKorNm;      // 비급여항목명
    private String curAmt;         // 현재 금액
    private String minPrc;         // 최저금액
    private String maxPrc;         // 최고금액
    private String medianPrc;      // 중간금액

    public static HospitalDetailsDTO fromObjectArray(Object[] arr) {
        HospitalDetailsDTO dto = new HospitalDetailsDTO();
        dto.setYadmNm((String) arr[0]);
        dto.setClCdNm((String) arr[1]);
        dto.setSidoCdNm((String) arr[2]);
        dto.setSgguCdNm((String) arr[3]);
        dto.setNpayKorNm((String) arr[4]);
        dto.setCurAmt(String.valueOf(arr[5]));
        dto.setMinPrc(String.valueOf(arr[6]));
        dto.setMaxPrc(String.valueOf(arr[7]));
        dto.setMedianPrc(String.valueOf(arr[8]));
        return dto;
    }
}
