package com.monorama.back.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.monorama.back.repository.AdminRepository;
import com.monorama.back.entity.Admin;
import java.util.List;
import java.util.Optional;

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
        Optional<Admin> adminOptional = Optional.ofNullable(adminRepository.findByUsername(loginRequest.getUsername()));

        if(adminOptional.isPresent()){
            Admin admin = adminOptional.get();
            if(admin.getPassword().equals(loginRequest.getPassword())){
                return "로그인 성공";
            }
        }
        return "로그인 실패";
    }
}
