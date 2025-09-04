package com.monorama.back.service;

import com.monorama.back.dto.HospitalDetailsDTO;
import com.monorama.back.dto.NpayKorNmDTO;
import com.monorama.back.repository.HospitalDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HospitalDetailsService {

    private final HospitalDetailsRepository repository;

    @Autowired
    public HospitalDetailsService(HospitalDetailsRepository repository) {
        this.repository = repository;
    }

    public List<HospitalDetailsDTO> searchHospitals(String sidoCdNm, String sgguCdNm, String clCdNm, List<NpayKorNmDTO> keywords) {
        String kw1 = null;
        String kw2 = null;
        String kw3 = null;

        if (keywords != null && !keywords.isEmpty()) {
            NpayKorNmDTO item = keywords.get(0);
            kw1 = item.getMiddle();
            kw2 = item.getSmall();
            kw3 = item.getDetail(); // null이어도 괜찮
        }

        List<Object[]> results = repository.searchByFilters(
                sidoCdNm, sgguCdNm, clCdNm, kw1, kw2, kw3
        );

        return results.stream()
                .map(HospitalDetailsDTO::fromObjectArray)
                .collect(Collectors.toList());
    }

}
