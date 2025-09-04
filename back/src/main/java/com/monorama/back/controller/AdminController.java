package com.monorama.back.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.monorama.back.repository.AdminRepository;
import com.monorama.back.entity.Admin;
import com.monorama.back.dto.HospitalDetailsDTO;

import java.util.List;
import java.util.Optional;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.http.*;
import org.springframework.core.io.ByteArrayResource;

import javax.print.attribute.standard.Media;
import java.io.ByteArrayOutputStream;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminRepository adminRepository;

    @Autowired
    public AdminController(AdminRepository adminRepository){
        this.adminRepository = adminRepository;
    }

    @GetMapping("/list") //관리자 목록 조회
    public List<Admin> getAdmins(){
        return adminRepository.findAll();
    }

    @PostMapping("/login")
    public String login(@RequestBody Admin loginRequest){
        Optional<Admin> adminOptional = adminRepository.findById(loginRequest.getId());

        if (adminOptional.isPresent()) {
            Admin admin = adminOptional.get();
            if (admin.getPassword().equals(loginRequest.getPassword())) {
                return "로그인 성공";
            }
        }

        return "로그인 실패";
    }

    @PostMapping("/excel-download")
    public ResponseEntity<ByteArrayResource> downloadCsv(@RequestBody com.monorama.back.dto.DownloadRequest req){
        try{
            List<HospitalDetailsDTO> results = req.getResults();
            if (results == null) results = java.util.Collections.emptyList();

            String[] headers = {
                    "의료기관명", "의료기관규모", "소재지", "중분류", "소분류", "상세분류", "가격정보구분", "금액", "특이사항", "해당의료기관(최저금액~최고금액)", "해당지역동일규모의중간금액"
            };

            java.util.function.Function<String, String> csv = v -> {
                if (v==null) v = "";
                boolean needQuote = v.contains(",") || v.contains("\"") || v.contains("\n") || v.contains("\r");
                String val = v.replace("\"", "\"\"");
                return needQuote ? "\"" + val + "\"" : val;
            };

            StringBuilder sb = new StringBuilder();
            sb.append('\uFEFF');

            for (int i=0; i < headers.length; i++){
                if (i>0) sb.append(',');
                sb.append(csv.apply(headers[i]));
            }
            sb.append('\n');

            for (HospitalDetailsDTO dto : results){
                String[] parts = (dto.getNpayKorNm() != null ? dto.getNpayKorNm() : "").split("/");
                String middle = parts.length > 0 ? parts[0] : "";
                String small  = parts.length > 1 ? parts[1] : "";
                String detail = parts.length > 2 ? parts[2] : "";

                String yadmNm = dto.getYadmNm();
                String clCdNm = dto.getClCdNm();
                String location = (dto.getSidoCdNm() == null ? "" : dto.getSidoCdNm())
                        + " "
                        + (dto.getSgguCdNm() == null ? "" : dto.getSgguCdNm());
                String priceRange = (dto.getMinPrc() == null ? "" : dto.getMinPrc())
                        + " ~ "
                        + (dto.getMaxPrc() == null ? "" : dto.getMaxPrc());

                String[] row = {
                        yadmNm,
                        clCdNm,
                        location,
                        middle,
                        small,
                        detail,
                        "",                              // 가격정보
                        dto.getCurAmt() == null ? "" : dto.getCurAmt().toString(),
                        "",                              // 특이사항
                        priceRange,
                        dto.getMedianPrc() == null ? "" : dto.getMedianPrc().toString()
                };

                for ( int i = 0; i < row.length; i++){
                    if (i>0) sb.append(',');
                    sb.append(csv.apply(row[i]));
                }
                sb.append('\n');
            }

            // ===== 파일명: 오늘날짜_조회조건(비급여명칭).csv =====
            String today = java.time.LocalDate.now(java.time.ZoneId.of("Asia/Seoul"))
                    .format(java.time.format.DateTimeFormatter.ofPattern("yyyy-MM-dd"));

            // 1) 프론트에서 온 선택값 그대로 사용 (전체도 유지!)
            String sSido = java.util.Optional.ofNullable(req.getSidoCdNm()).orElse("").trim();    // "", "서울", "전체"
            String sSggu = java.util.Optional.ofNullable(req.getSgguCdNm()).orElse("").trim();    // "", "강남구", "전체"
            String sClcd = java.util.Optional.ofNullable(req.getClCdNm()).orElse("").trim();      // "", "종합병원", "전체"

            // 좌측(시/군/구) 조합: 값 있는 것만 '-' 연결 (여기엔 "전체"도 포함 가능)
            java.util.List<String> leftParts = new java.util.ArrayList<>();
            if (!sSido.isEmpty()) leftParts.add(sSido);
            if (!sSggu.isEmpty()) leftParts.add(sSggu);
            String left = String.join("-", leftParts);

            // 우측(기관규모): 있으면 '_'로 붙임 (여기에도 "전체" 허용)
            String cond = left;
            if (!sClcd.isEmpty()) {
                cond = cond.isEmpty() ? sClcd : cond + "_" + sClcd;
            }

            // 전부 비어있으면 '전체'
            if (cond.isEmpty()) cond = "전체";

            // 2) 비급여명칭: 요청값 우선 → 결과에서 첫 번째 비어있지 않은 값 → 기본값
            String npay = req.getNpayKorNm();
            if (npay == null || npay.trim().isEmpty()) {
                npay = results.stream()
                        .map(HospitalDetailsDTO::getNpayKorNm)
                        .filter(java.util.Objects::nonNull)
                        .map(String::trim)
                        .filter(s -> !s.isEmpty())
                        .findFirst()
                        .orElse("검색결과");
            }

            // 3) 파일명 안전화 & 최종 조립
            java.util.function.Function<String,String> safe = s -> {
                if (s == null) return "";
                s = s.replace("/", "-")
                        .replaceAll("[\\\\:*?\"<>|]", "")
                        .replaceAll("[\\r\\n\\t]", " ")
                        .trim();
                return s.length() > 80 ? s.substring(0, 80) : s;
            };

            String baseName = today + "_" + safe.apply(cond) + "(" + safe.apply(npay) + ")";
            String fileName = baseName + ".csv";

            byte[] bytes = sb.toString().getBytes(java.nio.charset.StandardCharsets.UTF_8);
            ByteArrayResource resource = new ByteArrayResource(bytes);

            HttpHeaders headersOut = new HttpHeaders();
            String encoded = java.net.URLEncoder.encode(fileName, java.nio.charset.StandardCharsets.UTF_8)
                    .replace("+", "%20");
            headersOut.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename*=UTF-8''" + encoded);
            headersOut.setContentType(new MediaType("text","csv", java.nio.charset.StandardCharsets.UTF_8));
            headersOut.setContentLength(bytes.length);

            return ResponseEntity.ok().headers(headersOut).body(resource);
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
