package com.monorama.back.dto;

import java.util.List;

public class DownloadRequest {
    private List<HospitalDetailsDTO> results;
    private String sidoCdNm;
    private String sgguCdNm;
    private String clCdNm;
    private String npayKorNm;

    public List<HospitalDetailsDTO> getResults() { return results; }
    public void setResults(List<HospitalDetailsDTO> results) { this.results = results; }
    public String getSidoCdNm() { return sidoCdNm; }
    public void setSidoCdNm(String sidoCdNm) { this.sidoCdNm = sidoCdNm; }
    public String getSgguCdNm() { return sgguCdNm; }
    public void setSgguCdNm(String sgguCdNm) { this.sgguCdNm = sgguCdNm; }
    public String getClCdNm() { return clCdNm; }
    public void setClCdNm(String clCdNm) { this.clCdNm = clCdNm; }
    public String getNpayKorNm() { return npayKorNm; }
    public void setNpayKorNm(String npayKorNm) { this.npayKorNm = npayKorNm; }
}
