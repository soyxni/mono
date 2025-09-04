package com.monorama.back.controller;

import com.monorama.back.dto.NpayKorNmDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.monorama.back.service.HospitalDetailsService;
import com.monorama.back.dto.HospitalDetailsDTO;
import com.monorama.back.dto.SearchRequest;
import java.util.List;

@RestController
@RequestMapping("/api/search")
public class SearchController {

    private final HospitalDetailsService service;

    @Autowired
    public SearchController(HospitalDetailsService service) {
        this.service = service;
    }

    @PostMapping("/items") //해당 api 요청이 오면 여기로 받음
    public List<HospitalDetailsDTO> searchItems(@RequestBody SearchRequest request) {

        // 🔍 전달된 값 로그 출력
        System.out.println("🟡 sidoCdNm: " + request.getSidoCdNm());
        System.out.println("🟡 sgguCdNm: " + request.getSgguCdNm());
        System.out.println("🟡 clCdNm: " + request.getClCdNm());

        List<NpayKorNmDTO> keywords = request.getNpayKorNmList();
        System.out.println("🟡 키워드 리스트 size: " + keywords.size());
        for (int i = 0; i < keywords.size(); i++) {
            System.out.println("🟡 keyword[" + i + "]: " + keywords.get(i));
        }

        return service.searchHospitals(
                request.getSidoCdNm(),
                request.getSgguCdNm(),
                request.getClCdNm(),
                request.getNpayKorNmList()
        );
    }
}
