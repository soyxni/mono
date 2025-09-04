package com.monorama.back.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class SearchRequest {
    private String sidoCdNm;
    private String sgguCdNm;
    private String clCdNm;
    private List<NpayKorNmDTO> npayKorNmList;
}
