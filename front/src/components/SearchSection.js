import React, { useState } from "react";
import Modal from "./Modal";
import ButtonGrid from "./ButtonGrid";
import "../css/SearchSection.css";
import axios from "axios";

const modalOptions = {
    "상급병실료": [
        { 
            category: "상급병실료",
            items: [
                {name: "1인실"},
                {name: "2인실"},
                {name: "3인실"},
                {name: "4인실"},
                {name: "5인실"},
            ]
        }
    ],
    "교육상담료": [
        { 
            category: "교육상담료",
            items: [
                {name: "당뇨병교육"},
                {name: "고혈압교육"},
                {name: "치태조절교육"},
                {name: "고지혈증교육"},
                {name: "재생불량성빈혈교육"},
                {name: "유전성대사장애질환교육"},
                {name: "난치성뇌전증교육"},
            ]
        }
    ],
    "검체·병리검사료": [
        { 
            category: "검체검사료",
            items: [
                {name: "호산구양이온단백농도측정검사"},
                {name: "비타민 D1 [RIA법]"},
                {name: "안드로스테네디온"},
                {name: "DHEA(Dehydroepiandrosterone"},
                {name: "성호르몬결합글로불린"},
                {name: "허혈성 변형 알부민 검사"},
                {name: "인플루엔자A·B바이러스항원검사[현장검사]"},
                {name: "항뮬러관호르몬[정밀면역검사]"},
                {name: "비침습적 산전검사(NIPT)"}
            ]
        },
        { 
            category: "병리검사료",
            items: [
                {
                    name: "사람유전자 분자병리검사",
                    subItems: [
                        { name: "비유전성 유전자검사-메틸화특이중합효소연쇄반응" }
                    ]
                },
                {
                    name: "기타검사",
                    subItems: [
                        { name: "중합효소연쇄반응법-MRSA" },
                        { name: "메티실린내성 황색포도알균 유전자검사 [실시간 중합효소연쇄반응]" }
                    ]
                },
                {
                    name: "세포병리검사",
                    subItems: [
                        { name: "일반세포검사-자궁질 세포병리검사" },
                        { name: "액상세포검사-자궁질 세포병리검사" }
                    ]
                },
                {
                    name: "양수염색체검사"
                }
            ]
        }
    ],
    "기능검사료": [
    {
        category: "기능 검사료(호흡기 기능검사)",
        items: [
            { name: "후각기능(인지 및 역치)검사" },
            { name: "호기 산화질소 측정" }
        ]
    },
    {
        category: "기능 검사료(신경계 기능검사)",
        items: [
            { name: "교감신경피부반응검사" },
            { name: "성기능장애평가" },
            { name: "섭식장애평가" },
            { name: "발음 및 발성검사" },
            { name: "언어전반진단검사" },
            { name: "주의력검사" },
            { name: "영유아발달검사(한국판덴버발달검사)" },
            { name: "덴버발달검사" },
            { name: "뮌헨 유소아 기능발달검사" },
            { name: "수면리듬양상검사" },
            { name: "다중수면잠복기검사" },
            {
                name: "정량적감각기능검사사",
                subItems: [
                    { name: "진동역치" },
                    { name: "온도역치" },
                    { name: "전류인지역치" },
                    { name: "전류인지역치(통증역치검사)" }
                ]
            },
            {
                name: "자율신경계이상검사",
                subItems: [
                    { name: "기립성혈압검사" },
                    { name: "발살바법" },
                    { name: "지속적 근긴장에 따른른 혈압검사" },
                    { name: "심박변이도검사" },
                    { name: "피부전도반응검사" }
                ]
            },
            {
                name: "증상 및 행동 평가 척도도",
                subItems: [
                    { name: "우울척도[신경증우울평가]" },
                    { name: "기타[이화방어기제검사]" },
                    { name: "기타[한국판성격평가척도(KPAI)]" }
                ]
            },
            { name: "정량적 발한 축삭 반사검사" },
            { name: "미각검사[인지 및 역치검사]" },
            { name: "초음파를 활용한 뇌혈류 기능검사" }
        ]
    },
    {
        category: "기능 검사료(평형 및 청각 기능검사)",
        items: [
            { name: "동적체평형검사" },
            { name: "회전전검사" },
            { name: "비디오전기안진검사사" }
        ]
    },
    {
        category: "기능 검사료(외피, 근골 기능 검사)",
        items: [
            { name: "관절계를 이용한 무릎관절인대검사" },
            {
                name: "체온열검사",
                subItems: [
                    { name: "전신" },
                    { name: "부분" }
                ]
            },
            { name: "동적 족저압측정" }
        ]
    },
    {
        category: "기능 검사료(시기능검사)",
        items: [
            {
                name: "눈의 계측검사[편측]",
                subItems: [
                    { name: "초음파 이용" },
                    { name: "레이저 간섭계 이용" }
                ]
            },
            { name: "안구광학단층촬영" }
        ]
    },
    {
        category: "기능 검사료(소화기 기능검사)",
        items: [
            { name: "간섬유화검사" },
        ]
    },
    {
        category: "기능 검사료(알레르기 검사)",
        items: [
            { name: "주사제 약물 유발시험" },
            { name: "경구 음식물유발시험과 경구 약물유발시험검사" }
        ]
    },
    {
        category: "기능 검사료(순환기 기능검사)",
        items: [
            { name: "정맥역류검사" },
            { name: "동맥경화도검사(맥파전달속도측정)" },
            { name: "관상동맥내 광학파 단층촬영" },
            { name: "미세전위 T 교대파 검사" }
        ]
    },
    {
        category: "기능 검사료(생식, 임신 및 분만)",
        items: [
            { name: "자궁경부확대촬영검사" }
        ]
    }
    ],
    "내시경, 천자 및 생검료": [
        {
            category: "내시경, 천자 및 생검료",
            items: [
                { name: "약물유도 수면상기도 내시경검사" },
                { name: "입체적 유방절제생검술" },
                {
                    name: "진정내시경환자관리료",
                    subItems: [
                        { name: "I" },
                        { name: "II" },
                        { name: "III" },
                        { name: "IV" },
                    ]
                }
            ]
        },
    ],
    "초음파": [
        {
            category: "초음파검사료(기본초음파)",
            items: [
                {
                    name: "단순초음파",
                    subItems: [
                        { name: "I" },
                        { name: "II" },
                    ]
                }
            ]
        },
        {
            category: "초음파검사료(진단초음파)",
            items: [
                {
                    name: "횡파 탄성 초음파 영상"
                },
                {
                    name: "두경부-안 초음파",
                    subItems: [
                        { name: "안구" },
                        { name: "안와" }
                    ]
                },
                {
                    name: "두경부-경부 초음파",
                    subItems: [
                        { name: "갑상선·부갑상선" },
                        { name: "갑상선·부갑상선 제외한 경부부" }
                    ]
                },
                {
                    name: "진단초음파/두경부-비·부비동 초음파"
                },
                {
                    name: "진단초음파/흉부·유방·액와부 초음파",
                    subItems: [
                        { name: "일반" },
                        { name: "정밀" },
                        { name: "자동유방초음파" }
                    ]
                },
                {
                    name: "흉부-흉벽,흉막,늑골 등 초음파"
                },
                {
                    name: "심장-경흉부 심초음파",
                    subItems: [
                        { name: "단순" },
                        { name: "일반" },
                        { name: "전문" }
                    ]
                },
                {
                    name: "심장-부하 심초음파",
                    subItems: [
                        { name: "약물부하" },
                        { name: "운동부하" }
                    ]
                },
                { name: "심장-태아정밀 심초음파" },
                {
                    name: "복부-복부 초음파",
                    subItems: [
                        { name: "간·담낭·담도·비장·체장-일반" },
                        { name: "간·담낭·담도·비장·체장-정밀" },
                        { name: "충수" },
                        { name: "소장·대장" },
                        { name: "서혜부" },
                        { name: "직장·항문" },
                        { name: "항문" }
                    ]
                },
                {
                    name: "복부-비뇨기계 초음파",
                    subItems: [
                        { name: "신장·부신·방광" },
                        { name: "신장·부신" },
                        { name: "방광" }
                    ]
                },
                {
                    name: "복부-남성생식기 초음파",
                    subItems: [
                        { name: "전립선·정낭" },
                        { name: "전립선·정낭-경복부로 실시" },
                        { name: "음경" },
                        { name: "음낭" }
                    ]
                },
                {
                    name: "복부-여성생식기 초음파",
                    subItems: [
                        { name: "일반" },
                        { name: "일반-자궁내 생리식염수를 주입하여 검사" },
                        { name: "정밀" }
                    ]
                },
                {
                    name: "근골격, 연부-관절 초음파",
                    subItems: [
                        { name: "손가락" },
                        { name: "발가락" },
                        { name: "주관절" },
                        { name: "슬관절" },
                        { name: "고관절" },
                        { name: "견관절" },
                        { name: "손목관절" },
                        { name: "발목관절" },
                        { name: "류마티스성 질환에 의한 다발성 관절염" }
                    ]
                },
                {
                    name: "근골격, 연부-연부조직 초음파",
                    subItems: [
                        { name: "일반" },
                        { name: "정밀" }
                    ]
                },
                {
                    name: "혈관-뇌혈류 초음파",
                },
                {
                    name: "혈관-두개의 혈관 도플러 초음파",
                    subItems: [
                        { name: "경동맥" },
                        { name: "기타동맥" }
                    ]
                },
                {
                    name: "혈관-사지혈관 도플러 초음파",
                    subItems: [
                        { name: "상지-동맥" },
                        { name: "상지-정맥" },
                        { name: "동정맥루의 혈류 및 협착 측정 시" },
                        { name: "하지-동맥" },
                        { name: "하지-정맥" },
                        { name: "하지정맥류" }
                    ]
                },
                {
                    name: "혈관-대동맥 도플러 초음파",
                },
                {
                    name: "신경-중추신경계 초음파",
                    subItems: [
                        { name: "경천문 뇌" },
                        { name: "척수" }
                    ]
                },
                {
                    name: "신경-말초신경 초음파",
                    subItems: [
                        { name: "편측" },
                        { name: "사지신경 모두를 종합적으로 검사" }
                    ]
                },
                {
                    name: "임산부 초음파",
                    subItems: [
                        { name: "제1삼분기-일반" },
                        { name: "제1삼분기-정밀" },
                        { name: "제2,3삼분기-일반" },
                        { name: "제2,3삼분기-정밀" }
                    ]
                }
            ]
        },
        {
            category: "초음파검사료(유도 초음파)",
            items: [
                { name: "수술 중 초음파" },
                { name: "분만기간 초음파" },
                { name: "진공보조 유방 생검시 유도 초음파" },
                {
                    name: "유도초음파",
                    subItems: [
                        { name: "I" },
                        { name: "II" },
                        { name: "III" },
                        { name: "IV" }
                    ]
                }
            ]
        },
        {
            category: "초음파검사료(특수 초음파)",
            items: [
                {
                    name: "기관지내시경초음파[가이드시스를 이용한 경우 포함]",
                    subItems: [
                        { name: "기관지내시경초음파" },
                        { name: "기관지내시경초음파[가이드시스를 이용한 경우]" }
                    ]
                },
                { name: "내시경초음파" },
                { name: "관강내초음파" },
                { name: "혈관내초음파" },
                { name: "심장-경식도 심초음파" },
                { name: "심장-심장내 초음파" }
            ]
        }
    ],    
    "영상진단 및 방사선치료료": [
        {
            category: "영상진단 및 방사선 치료료",
            items: [
                {
                    name: "디지털 단층영상합성촬영술",
                    subItems: [
                        { name: "유방" }
                    ]
                },
                {
                    name: "뇌혈관 정량적 자기공명혈관조영술 [동 행위를 위해 실시한 MRA 포함]",
                }
            ]
        }
    ],
    "MRI": [
        {
            category: "자기공명영상진단료(MRI-기본검사)",
            items: [
                {
                    name: "뇌",
                    subItems: [
                        { name: "일반" }
                    ]
                },
                {
                    name: "두정부-안면",
                    subItems: [
                        { name: "일반" }
                    ]
                },
                {
                    name: "두정부-부비동",
                    subItems: [
                        { name: "일반" }
                    ]
                },
                {
                    name: "두정부-안와",
                    subItems: [
                        { name: "일반" }
                    ]
                },
                {
                    name: "두정부-측두골",
                    subItems: [
                        { name: "일반" }
                    ]
                },
                {
                    name: "두정부-측두하악관절",
                    subItems: [
                        { name: "일반" }
                    ]
                },
                {
                    name: "두정부-경부",
                    subItems: [
                        { name: "일반" }
                    ]
                },
                {
                    name: "척추-경추",
                    subItems: [
                        { name: "일반" }
                    ]
                },
                {
                    name: "척추-흉추",
                    subItems: [
                        { name: "일반" }
                    ]
                },
                {
                    name: "척추-요천추",
                    subItems: [
                        { name: "일반" }
                    ]
                },
                {
                    name: "척추-척추강",
                    subItems: [
                        { name: "일반" }
                    ]
                },
                {
                    name: "척추-전척추",
                    subItems: [
                        { name: "일반" }
                    ]
                },
                {
                    name: "근골격계-견관절",
                    subItems: [
                        { name: "일반" },
                        { name: "조영제 주입 전·후 촬영 판독" },
                        { name: "제한적 MRI(방사선 치료범위 및 위치결정 등)" },
                        { name: "3차원자기공명영상을 실시한 경우" }
                    ]
                },
                {
                    name: "근골격계-주관절",
                    subItems: [
                        { name: "일반" },
                        { name: "조영제 주입 전·후 촬영 판독" },
                        { name: "제한적 MRI(방사선 치료범위 및 위치결정 등)" },
                        { name: "3차원자기공명영상을 실시한 경우" }
                    ]
                },
                {
                    name: "근골격계-수관절",
                    subItems: [
                        { name: "일반" },
                        { name: "조영제 주입 전·후 촬영 판독" },
                        { name: "제한적 MRI(방사선 치료범위 및 위치결정 등)" },
                        { name: "3차원자기공명영상을 실시한 경우" }
                    ]
                },
                {
                    name: "근골격계-고관절",
                    subItems: [
                        { name: "일반" },
                        { name: "조영제 주입 전·후 촬영 판독" },
                        { name: "제한적 MRI(방사선 치료범위 및 위치결정 등)" },
                        { name: "3차원자기공명영상을 실시한 경우" }
                    ]
                },
                {
                    name: "근골격계-천장골골관절",
                    subItems: [
                        { name: "일반" },
                        { name: "조영제 주입 전·후 촬영 판독" },
                        { name: "제한적 MRI(방사선 치료범위 및 위치결정 등)" },
                        { name: "3차원자기공명영상을 실시한 경우" }
                    ]
                },
                {
                    name: "근골격계-슬관절",
                    subItems: [
                        { name: "일반" },
                        { name: "조영제 주입 전·후 촬영 판독" },
                        { name: "제한적 MRI(방사선 치료범위 및 위치결정 등)" },
                        { name: "3차원자기공명영상을 실시한 경우" }
                    ]
                },
                {
                    name: "근골격계-발목관절",
                    subItems: [
                        { name: "일반" },
                        { name: "조영제 주입 전·후 촬영 판독" },
                        { name: "제한적 MRI(방사선 치료범위 및 위치결정 등)" },
                        { name: "3차원자기공명영상을 실시한 경우" }
                    ]
                },
                {
                    name: "근골격계-관절외 상지",
                    subItems: [
                        { name: "일반" },
                        { name: "조영제 주입 전·후 촬영 판독" },
                        { name: "제한적 MRI(방사선 치료범위 및 위치결정 등)" },
                        { name: "3차원자기공명영상을 실시한 경우" }
                    ]
                },
                {
                    name: "근골격계-관절외 하지",
                    subItems: [
                        { name: "일반" },
                        { name: "조영제 주입 전·후 촬영 판독" },
                        { name: "제한적 MRI(방사선 치료범위 및 위치결정 등)" },
                        { name: "3차원자기공명영상을 실시한 경우" }
                    ]
                },
                {
                    name: "흉부-흉부",
                    subItems: [
                        { name: "일반" }
                    ]
                },
                {
                    name: "흉부-유방",
                    subItems: [
                        { name: "일반" }
                    ]
                },
                {
                    name: "복부-복부",
                    subItems: [
                        { name: "일반" }
                    ]
                },
                {
                    name: "복부-골반",
                    subItems: [
                        { name: "일반" }
                    ]
                },
                {
                    name: "복부-체장",
                    subItems: [
                        { name: "일반" }
                    ]
                },
                {
                    name: "복부-신장 및 부신",
                    subItems: [
                        { name: "일반" }
                    ]
                },
                {
                    name: "복부-음낭 및 음경",
                    subItems: [
                        { name: "일반" }
                    ]
                },
                {
                    name: "복부-간",
                    subItems: [
                        { name: "일반" }
                    ]
                },
                {
                    name: "복부-담체관",
                    subItems: [
                        { name: "일반" }
                    ]
                },
                {
                    name: "복부-전립선",
                    subItems: [
                        { name: "일반" }
                    ]
                },
                {
                    name: "혈관-뇌혈관",
                    subItems: [
                        { name: "일반" }
                    ]
                },
                {
                    name: "혈관-경부혈관",
                    subItems: [
                        { name: "일반" }
                    ]
                },
                {
                    name: "혈관-흉부혈관",
                    subItems: [
                        { name: "일반" }
                    ]
                },
                {
                    name: "혈관-복부혈관",
                    subItems: [
                        { name: "일반" }
                    ]
                },
                {
                    name: "혈관-사지혈관",
                    subItems: [
                        { name: "일반" },
                        { name: "조영제 주입 전·후 촬영 판독" },
                        { name: "3차원자기공명영상을 실시한 경우" }
                    ]
                },
                {
                    name: "혈관-심혈관",
                    subItems: [
                        { name: "일반" }
                    ]
                },
                {
                    name: "전신",
                    subItems: [
                        { name: "일반" }
                    ]
                },
                {
                    name: "심장",
                    subItems: [
                        { name: "일반" }
                    ]
                }
            ]
        },
        {
            category: "자기공명영상진단료(MRI-특수검사)",
            items: [
                { name: "확산" },
                { name: "관류 [3차원자기공명영상 포함]" },
                { name: "분광영상" },
                { name: "영화 [기본검사 및 3차원자기공명영상 포함]" },
                { name: "Dynamic [기본검사 포함]" },
                { name: "이중조영 [기본검사 포함]" },
                { name: "기능적 [기본검사 및 3차원자기공명영상 포함]" }
            ]
        }
    ],
    "주사료": [
        {
            category: "주사료",
            items: [
                { name: "알레르겐 면역요법" }
            ]
        }
    ],
    "물리치료": [
        {
            category: "이학요법료",
            items: [
                { name: "FIMS(Functional Intramuscular Stimulation)" },
                { name: "이명재훈련치료" },
                { name: "언어치료" },
                { name: "신장분사치료" },
                { name: "도수치료" },
                {
                    name: "증식치료",
                    subItems: [
                        { name: "사지관절부위" },
                        { name: "척추부위" }
                    ]
                },
                { name: "체외자기장 요실금치료[1일당]" },
                { name: "전산화 인지재활치료[주의·기억]" },
                { name: "비침습적 무통증 신호요법" }
            ]
        }        
    ],
    "정신요법료":[
        {
            category: "정신요법료",
            items: [
                { name: "광치료" },
                { name: "기타 행동치료",
                    subItems: [
                        { name: "신경발달중재치료" }
                    ]
                 },
                { name: "정신분석적 정신치료" }
            ]
        }
        
    ],
    "처치 및 수술료": [
        {
            category: "처치 및 수술료(피부 및 연부조직)",
            items: [
                { name: "지방흡입기를 이용한 액취증·다한증수술" },
                { name: "레이저를 이용한 손발톱 진균증 치료" }
            ]
        },
        {
            category: "처치 및 수술료(근골)",
            items: [
                { name: "추간판내 고주파 열치료술" },
                { name: "체외충격파치료[근골격계질환]" },
                { name: "자가 골수 줄기세포 치료",
                    subItems: [
                        { name: "연골결손(동 행위를 위해 실시한 골수천자, 미세천공술 및 치료재료대 포함)" }
                    ]
                },
            ]
        },
        {
            category: "처치 및 수술료(코)",
            items: [
                { name: "비밸브재건술" }
            ]
        },
        {
            category: "처치 및 수술료(후두)",
            items: [
                { name: "후두내시경하 펄스다이레이저 후두수술" },
                { name: "성대근내 보툴리눔 독소 주입술" }
            ]
        },
        {
            category: "처치 및 수술료(순환기)",
            items: [
                { name: "고주파정맥내막폐쇄술[유도료료 포함]",
                    subItems: [
                        { name: "교통정맥결찰술을 동반한 경우" },
                        { name: "교통정맥결찰술을 동반하지 않은 경우" },
                    ]
                 },
                { name: "광투시정맥흡입제거술",
                    subItems: [
                        { name: "교통정맥결찰술을 동반한 경우" },
                        { name: "교통정맥결찰술을 동반하지 않은 경우" },
                    ]
                 },
                { name: "시아노아크릴레이트를 이용한 복재정맥 폐색술[유도료 포함]" },
                { name: "레이저정맥폐쇄술[유도료 포함]" },
                { name: "초음파 유도하 혈관경화요법" }
            ]
        },
        {
            category: "처치 및 수술료(입, 이한선)",
            items: [
                { name: "이설근전진술" }
            ]
        },
        {
            category: "처치 및 수술료(비뇨기)",
            items: [
                { name: "고강도 초음파 집속술 [전립선암]" },
                { name: "이식형 결찰사를 이용한 전립선 결찰" }
            ]
        },
        {
            category: "처치 및 수술료(여성생식기, 임신과 분만)",
            items: [
                { name: "고주파 자궁근종용해술" },
                { name: "자기공명영상유도 하 고강도초음파집속술[자궁근종]" },
                { name: "초음파 유도하 고강도초음파집속술[자궁근종, 자궁선근증]" }
            ]
        },
        {
            category: "처치 및 수술료(보조생식술)",
            items: [
                { name: "정자채취 및 처리",
                    subItems: [
                        { name: "정액" },
                        { name: "고환조직 [양측]" }
                    ]
                 },
                {
                    name: "난자채취 및 처리[양측][초음파 유도료료 포함]",
                    subItems: [
                        { name: "성숙난자" },
                        { name: "미성숙난자" }
                    ]
                },
                {
                    name: "수정 및 확인",
                    subItems: [
                        { name: "일반 체외수정" },
                        { name: "세포질내 정자주입술" }
                    ]
                },
                {
                    name: "해동",
                    subItems: [
                        { name: "정자" },
                        { name: "기타(배아, 난자, 난소조직, 고환조직)" }
                    ]
                },
                {
                    name: "배아 배양 및 관찰",
                    subItems: [
                        { name: "수정확인 후 1~2일 배양양" },
                        { name: "수정확인 후 3일이상 배양양" }
                    ]
                },
                {
                    name: "배아 이식[초음파유도료 포함]",
                    subItems: [
                        { name: "자궁경관을 통한 이식" },
                        { name: "난관내 이식 [접합자, 생식세포 포함]" },
                        { name: "경자궁근층 이식" }
                    ]
                },
                {name: "자궁강내 정자주입술[초음파 유도료 포함]"},
                {name: "배아 동결·보존"}
            ]
        },
        {
            category: "처치 및 수술료(내분비기)",
            items: [
                { name: "증상이 있는 갑상선양성결절의 고주파열치료술" }
            ]
        },
        {
            category: "처치 및 수술료(신경)",
            items: [
                { name: "내시경적 경막외강 신경근성형술" },
                { name: "경피적 경막외강 신경성형술" },
                { name: "경피적 풍선확장 경막외강 신경성형" }
            ]
        },
        {
            category: "처치 및 수술료(간)",
            items: [
                { name: "간암의 초음파유도 고강도초음파 집속술" }
            ]
        },
        {
            category: "처치 및 수술료(기타)",
            items: [
                { name: "로봇 보조 수술 [시술시 소요재료 포함]-다빈치 기기",
                    subItems: [
                        { name: "갑상선양성종양근치수술(갑상선암)" },
                        { name: "근치적전립선적출술(전립선암)" }
                    ]
                },
                { name: "경두개자기자극술" }
            ]
        }
    ],    
    "모발 이식술료": [
        {
            category: "모발이식술료",
            items: [
                {
                    name: "모발이식술",
                    subItems: [
                        { name: "500모미만" },
                        { name: "500모~1,000모미만" },
                        { name: "1,000모~2,000모미만" },
                        { name: "2,000모이상" },
                        { name: "1모당" }
                    ]
                }
            ]
        }
    ],    
    "시력 교정술료": [
        {
            category: "시력교정술료",
            items: [
                {name: "레이저각막절삭성형술(라식)"},
                {name: "레이저각막상피절삭성형술(라섹)"}
            ]
        }
    ],
    "치과": [
        {
            category: "치과 처치·수술료",
            items: [
                {
                    name: "인레이(Inlay) 및 온레이(Onlay) 간접충전(금 등을 사용한 충전치료)-인레이",
                    subItems: [
                        {name: "금"},
                        {name: "레진"},
                        {name: "도재-세라믹"},
                        {name: "도재-CAD/CAM 세라믹"}
                    ]
                },
                {
                    name: "인레이(Inlay) 및 온레이(Onlay) 간접충전(금 등을 사용한 충전치료)-온레이",
                    subItems: [
                        {name: "금"},
                        {name: "레진"},
                        {name: "도재-세라믹"},
                        {name: "도재-CAD/CAM 세라믹"}
                    ]
                },
                {
                    name: "광중합형 복합레진 충전",
                    subItems: [
                        {name: "우식-1면"},
                        {name: "우식-2면"},
                        {name: "우식-3면 이상"},
                        {name: "마모"},
                        {name: "파절 등"}
                    ]
                },
                {
                    name: "치석제거",
                    subItems: [
                        {name: "1/3악당"},
                        {name: "상악"},
                        {name: "하악"},
                        {name: "전악"}
                    ]
                },
                {name: "자가치아 이식술"},
                {
                    name: "잇몸웃음교정술",
                    subItems: [
                        {name: "잇몸절제"},
                        {name: "치조골 삭제"}
                    ]
                }
            ]
        },
        {
            category: "치과의 보철료",
            items: [
                {
                    name: "치과임플란트(1치당)",
                    subItems: [
                        {name: "Metal"},
                        {name: "Gold"},
                        {name: "PFM"},
                        {name: "PFG"},
                        {name: "올세라믹"},
                        {name: "Zirconia"},
                        {name: "기타"}
                    ]
                },
                {
                    name: "크라운",
                    subItems: [
                        {name: "Metal"},
                        {name: "Gold"},
                        {name: "PFM"},
                        {name: "PFG"},
                        {name: "올세라믹"},
                        {name: "Zirconia"},
                        {name: "기타"}
                    ]
                }
            ]
        }
    ],    
    "한방": [
        {
            category: "한방검사료",
            items: [
                {name: "골도법검사"},
                {name: "사상체질검사",
                    subItems: [
                        {name:  "QSCCII 설문지에 의한 심성검사"},
                        {name: "QSCCII 설문지에 의한 심성검사 및 상담"}
                    ]
                },
                {name: "혈맥어어혈검사(맥파전달속도측정)"},
                {name: "경근무늬측정검사"},
                {
                    name: "경피온열검사",
                    subItems: [
                        {name: "전신"},
                        {name: "부분"}
                    ]
                }
            ]
        },
        {
            category: "한방 시술 및 처치료",
            items: [
                {name: "약침술",
                    subItems: [
                        {name: "경혈"}
                    ]
                },
                {
                    name: "추나요법",
                    subItems: [
                        {name: "단순추나"},
                        {name: "복잡추나"},
                        {name: "특수(탈구)추나"},
                        {name: "특수(내장기, 두개천골)추나"}
                    ]
                },
                {
                    name: "한방물리요법",
                    subItems: [
                        {name: "경피전기자극요법"},
                        {name: "경근간섭저주파요법"},
                        {name: "기타"}
                    ]
                },
                {name: "한방 향기요법"},
                {name: "자율훈련법"}
            ]
        }
    ],
    "예방접종료": [
        {
            category: "예방접종료",
            items: [
                {
                    name: "대상포진",
                    subItems: [
                        {name: "스카이조스터주"},
                        {name: "조스타박스주"},
                        {name: "싱그릭스주"}
                    ]
                },
                {
                    name: "수두",
                    subItems: [
                        {name: "바리-엘백신"},
                        {name: "스카이바리셀라주"},
                        {name: "수두박스주"},
                        {name: "배리셀라주"}
                    ]
                },
                {
                    name: "수막구균",
                    subItems: [
                        {name: "멘비오"},
                        {name: "메낙트라주"}
                    ]
                },
                {name: "신종후군출혈열", subItems: [{name: "한타박스주 0.5ml"}]},
                {
                    name: "사람유두종바이러스 감염증(HPV 백신)",
                    subItems: [
                        {name: "서바릭스프리필드시린지"},
                        {name: "가다실 프리필드시린지"},
                        {name: "가다실9프리필드시린지"},
                        {name: "가다실 주"},
                        {name: "가다실9주"}
                    ]
                },
                {
                    name: "인플루엔자(독감)",
                    subItems: [
                        {name: "스카이셀플루4가프리필드시린지"},
                        {name: "테라텍트프리필드시린지주"},
                        {name: "비알플루텍I테라백신주"},
                        {name: "지씨플루쿼드리밸런트프리필드시린지주"},
                        {name: "코박스플루4가PF주"},
                        {name: "녹십자플루4가PF주"},
                        {name: "플루아릭스트라프리필드시린지"},
                        {name: "박씨그리프테트라주"},
                        {name: "보령플루 V 테트라백신주"},
                        {name: "보령플루VIII테트라백신주"},
                        {name: "플루아드쿼드프리필드시린지"}
                    ]
                },
                {
                    name: "일본뇌염",
                    subItems: [
                        {name: "녹십자-세포배양일본뇌염백신주 0.4mL"},
                        {name: "녹십자-세포배양일본뇌염백신주 0.7mL"},
                        {name: "보령세포배양일본뇌염백신주 0.4mL"},
                        {name: "보령세포배양일본뇌염백신주 0.7mL"},
                        {name: "씨디.제박스"},
                        {name: "이모젭주"}
                    ]
                },
                {
                    name: "장티푸스",
                    subItems: [
                        {name: "지로티프-주"},
                        {name: "비보티프캡슐"}
                    ]
                },
                {
                    name: "Td(파상풍, 디프테리아)",
                    subItems: [
                        {name: "에스케이티디백신주"},
                        {name: "녹십자티디백신프리필드시린지주"},
                        {name: "티디퓨어주"},
                        {name: "디티부스터주"}
                    ]
                },
                {
                    name: "Tdap(파상풍, 디프테리아, 백일해)",
                    subItems: [
                        {name: "부스트릭스프리필드시린지"},
                        {name: "아다셀주"}
                    ]
                },
                {
                    name: "폐렴구균",
                    subItems: [
                        {name: "프리베나13주"},
                        {name: "신플로릭스프리필드시린지"},
                        {name: "프로디악스-23"},
                        {name: "프로디악스-23프리필드시린지"}
                    ]
                },
                {
                    name: "홍역/유행성이하선염/풍진",
                    subItems: [
                        {name: "엠엠알Ⅱ"},
                        {name: "프리오릭스주"}
                    ]
                },
                {
                    name: "A형간염",
                    subItems: [
                        {name: "하브릭스주 0.5ml"},
                        {name: "하브릭스주 1.0ml"},
                        {name: "박타주 0.5ml"},
                        {name: "박타주 1.0ml"},
                        {name: "박타프리필드 시린지 0.5ml"},
                        {name: "박타프리필드 시린지 1.0ml"},
                        {name: "아박심80U소아용주"},
                        {name: "아박심160U성인용주"},
                        {name: "보령A형간염백신프리필드시린지주 0.5ml"},
                        {name: "보령A형간염백신프리필드시린지주 1.0ml"}
                    ]
                },
                {
                    name: "B형간염",
                    subItems: [
                        {name: "헤파뮨주 0.5mL"},
                        {name: "헤파뮨주 1.0mL"},
                        {name: "헤파뮨프리필드시린지 1.0mL"},
                        {name: "유박스비주 0.5mL"},
                        {name: "유박스비주 1.0mL"},
                        {name: "유박스비 프리필드주 1.0mL"}
                    ]
                },
                {name: "b형헤모필루스인플루엔자", subItems: [{name: "유히브주"}]}
            ]
        }
    ],
    "치료재료": [
        {
            category: "치료재료",
            items: [
                {
                    name: "갑상선 양성결절의 고주파 열치료용",
                    subItems: [
                        { name: "SENS RF ELECTRODE" },
                        { name: "COOL-TIP RF ELECTRODE" },
                        { name: "WELL-POINT RF ELECTRODE" },
                        { name: "RFA ELECTRODE" },
                        { name: "COATHERM ELECTRODE SERIES" },
                        { name: "RFT-ELECTRODE" },
                        { name: "CTI ELECTRODE SERIES" },
                        { name: "THYBLATE-V TM" },
                        { name: "STAR RF ELECTRODE" },
                        { name: "VIVA RF ELECTRODE" },
                        { name: "STAR INJECTABLE RF ELECTRODE" }
                    ]
                },
                {
                    name: "고주파 자궁근종용해술용",
                    subItems: [
                        { name: "SENS RF ELECTRODE" },
                        { name: "COOL-TIP RF ELECTRODE" },
                        { name: "WELL-POINT RF ELECTRODE" },
                        { name: "TCHP시리즈" },
                        { name: "COATHERM ELECTRODE SERIES" },
                        { name: "COOL-TIP E SERIES" },
                        { name: "RF MYOLYSIS BTM ELECTRODE" },
                        { name: "CTI ELECTRODE SERIES" },
                        { name: "VCTM" },
                        { name: "VIVA RF ELECTRODE" }
                    ]
                },
                {
                    name: "고주파 정맥내막폐쇄요법용",
                    subItems: [
                        { name: "VENISTAR" },
                        { name: "VNUS CLOSURE FAST" },
                        { name: "VEINCLEAR" }
                    ]
                },
                {
                    name: "관상동맥내 광학파 단층촬영용용",
                    subItems: [
                        { name: "BENETIS" },
                        { name: "DRAGONFLY CATHETER" },
                        { name: "DRAGONFLY OPSTAR IMAGING CATHETER" }
                    ]
                },
                {
                    name: "유방 생검용",
                    subItems: [
                        { name: "MAMMOTOME SYSTEM(PROBE & VACUUM SET)" },
                        { name: "ATEC(PROBE & VACUUM SET)" },
                        { name: "SB BIOPSY PROBE" },
                        { name: "BEXCORE(PROBE & VACUUM SET)" },
                        { name: "ENCOR BIOPSY PROBES(PROBE + RINSE/VACUUM TUBINHG ASSEMBLY)" },
                        { name: "EVIVA(PROBE & VACUUM SET)" },
                        { name: "MAMMOTOME ELITE BIOPSY SYSTEM(MEH1, MEP13)" },
                        { name: "MAMMOTOME REVOLVE SYSTEM(PROBE & VACUUM SET)" }
                    ]
                },
                {
                    name: "내시경 초음파를 이용한 세침흡인술용",
                    subItems: [
                        { name: "일회용내시경생검용기구" },
                        { name: "PRESHOT" },
                        { name: "EXPECT PULMONARY EBUS-TRAN" },
                        { name: "VIZISHOT" },
                        { name: "ECHOTIP ULTRA ENDOBRONCHIAL HIGH DEFINITION ULTRASOUND NEEDLE" },
                        { name: "SONO TIP" },
                        { name: "VIZISHOT2" },
                        { name: "ECHOTIP PROCORE HD ENDOBRONCHIAL ULTRASOUND BIOPSY NEEDLE" }
                    ]
                },
                {
                    name: "정맥류 제거용",
                    subItems: [
                        { name: "레이저석혈관성형술용카테터" },
                        { name: "광섬유카테타(BJ4311DG)" },
                        { name: "광섬유카테타타(BJ4311RD)" },
                        { name: "볼타입광섬유카테타" }
                    ]
                },
                {
                    name: "조절성 인공수정체",
                    subItems: [
                        { name: "VIVINEX™ GEMETRIC™ TORIC, VIVINEX™ GEMETRIC™ PLUS TORIC" },
                        { name: "INFO IOL" },
                        { name: "ACRYSOF IQ PANOPTIX TORIC PRESBYOPIA CORRECTING IOLS" },
                        { name: "SYNTHESIS PLUS" },
                        { name: "AUROUVE DFINE" },
                        { name: "S-FLEX" },
                        { name: "TECNIS EYHANCE TORIC II IOL, TECNIS EYHANCE TORIC II IOL WITH TECNIS SIMPLICITY DELIVERY SYS" },
                        { name: "FULLRANGE" },
                        { name: "HOYA VIVINEX TORIC" },
                        { name: "IDIFF PLUS" },
                        { name: "VIVINEX™ GEMETRIC™, VIVINEX™ GEMETRIC™ PLUS" },
                        { name: "FIL 611T" },
                        { name: "AKKOMMODATIVE 1CU" },
                        { name: "T-FLEX ASPHERIC TORIC" },
                        { name: "SBL-3" },
                        { name: "FINEVISION, POD F" },
                        { name: "INTENSITY BN /INTENSITY SL" },
                        { name: "AT. LISA 809M" },
                        { name: "TELEON MULTIFOCAL IOL GROUP" },
                        { name: "TECNIS MULTIFOCAL TORIC 1-PIECE INTRAOCULAR LENSE(IOL)" },
                        { name: "HOYA VIVINEX™ TORIC MULTISERT™" },
                        { name: "BI-FLEX M(677MY)" },
                        { name: "HANITA MF IOL(SEELENS MF, BUNNYLENS MF)" },
                        { name: "PRECIZON TORIC 565" },
                        { name: "TRIDIFF TORIC" },
                        { name: "ANKORIS" },
                        { name: "LUCIDIS 108M LUCIDIS 124M" },
                        { name: "FIL 611PV" },
                        { name: "OPTIVIS" },
                        { name: "SULCOFLEX TORIC" },
                        { name: "ARTIS T P.L.E" },
                        { name: "TETRAFLEX HD" }
                    ]
                },
                {
                    name: "척추경막외 유착방지제",
                    subItems: [
                        { name: "ARTQ, COVER SEAL" },
                        { name: "X-AD" },
                        { name: "하이코가드-겔(HYCOGUARD-GEL)" },
                        { name: "서지세이프" },
                        { name: "HYVIXEL" },
                        { name: "PRECOAT" },
                        { name: "디베리아(DBARRIA)" },
                        { name: "OXIPLEX1" },
                        { name: "수술엔(SUSUL N)" },
                        { name: "INTERBLOCK, GUARDIANWRAP PLUS" },
                        { name: "MEDISHIELD ANTI-ADHESION GEL" },
                        { name: "ADCON-GEL(BF0101AY)" },
                        { name: "AMMI GUARD,GUARDIANWRAP,MEGABARRY, MCSHIELD(맥쉴드)" },
                        { name: "하이베리(HIBARRY)" },
                        { name: "큐블럭(QBLOCK)" },
                        { name: "ADCON-GEL(BF0103AY)" },
                        { name: "MEDICLORE" },
                        { name: "GUARDIX-SP PLUS(가딕스-SP PLUS),BARRIX(배릭스)" },
                        { name: "GUARDIX-SP(가딕스-SP),GUARDHEAL(가드힐)" }
                    ]
                },
                {
                    name: "혈관내영상카테타",
                    subItems: [
                        { name: "REVOLUTION CATHETER" },
                        { name: "OPTICROSS CORONARY IMAGING CATHETER" },
                        { name: "OPTICROSS 18 PERIPHERAL IMAGING CATHETER" },
                        { name: "EAGLE EYE IVUS CATHETER" },
                        { name: "OPTICROSS HD CORONARY IMAGING CATHETER" },
                        { name: "PV0.035 IVUS CATHETER" },
                        { name: "REFINITY ST ROTATIONAL IVUS CATHETER" }
                    ]
                },
                {
                    name: "연골 결손 환자에서의 자가 골수 줄기 세포 치료술용",
                    subItems: [
                        { name: "TRICELL BMC KIT" },
                        { name: "CARTISEAL (카티씰)" },
                        { name: "ABMC KIT-A" },
                        { name: "BIOCUE CONCENTRATION SYSTEM" },
                        { name: "BMSC+3 60, BMSC+3 120" },
                        { name: "CHONDRO-GIDE" },
                        { name: "TRICELL BMC PRO" }
                    ]
                },
                {
                    name: "전립선 결찰술용 이식형 결찰사",
                    subItems: [
                        { name: "UROLIFT SYSTEM(BM2020BN)" },
                        { name: "UROLIFT SYSTEM(BM2020NQ)" }
                    ]
                },
                {
                    name: "시아노아크릴레이트를 이용한 복재정맥 폐색술용",
                    subItems: [
                        { name: "VENASEAL CLOSURE SYSTEM" }
                    ]
                },
                {
                    name: "기관지내시경초음파 가이드시스 KIT",
                    subItems: [
                        { name: "GUIDE SHEATH KIT" }
                    ]
                }
            ]
        }
        
    ],
    "보장구": [
        {
            category: "보장구",
            items: [
                {
                    name: "굴절교정렌즈",
                    subItems: [
                        { name: "CONTEX OK™" },
                        { name: "Euclid Systems Orthokeratology(oprifocon A) Contact Lens For Overnight Wear" },
                        { name: "Ortho-K LK®-Lens" },
                        { name: "Ortho-K LK®-Lens PREMIER" },
                        { name: "Ortho-K LK-Lens Toric PREMIER" },
                        { name: "Paragon CRT 100" },
                        { name: "Paragon CRT 100 Dual Axis" },
                        { name: "FARGO 100" },
                        { name: "α Ortho-K" },
                        { name: "White OK" },
                        { name: "Vision" },
                        { name: "myOK" }
                    ]
                }
            ]
        }
        
    ],
    "제증명 수수료": [
        {
            category: "제증명수수료",
            items: [
                {
                    name: "진단서",
                    subItems: [
                        { name: "일반" },
                        { name: "건강" },
                        { name: "근로능력평가용" }
                    ]
                },
                { name: "사망진단서" },
                {
                    name: "장애 정도 심사용 진단서",
                    subItems: [
                        { name: "신체적장애" },
                        { name: "정신적장애" }
                    ]
                },
                { name: "후유장애진단서" },
                { name: "병무용진단서" },
                { name: "국민연금 장애 심사용 진단서" },
                {
                    name: "상해진단서",
                    subItems: [
                        { name: "3주 미만" },
                        { name: "3주 이상" }
                    ]
                },
                {
                    name: "영문진단서",
                    subItems: [
                        { name: "일반" }
                    ]
                },
                {
                    name: "확인서",
                    subItems: [
                        { name: "입퇴원" },
                        { name: "통원" },
                        { name: "진료" }
                    ]
                },
                {
                    name: "향후진료비추정서",
                    subItems: [
                        { name: "천만원 미만" },
                        { name: "천만원 이상" }
                    ]
                },
                { name: "출생증명서" },
                { name: "시체검안서" },
                { name: "장애인증명서" },
                { name: "사산(사태)증명서" },
                { name: "입원사실 증명서" },
                {
                    name: "채용신체 검사서",
                    subItems: [
                        { name: "공무원" },
                        { name: "일반" }
                    ]
                },
                {
                    name: "진료기록사본",
                    subItems: [
                        { name: "1~5매" },
                        { name: "6매 이상" }
                    ]
                },
                {
                    name: "진료기록영상",
                    subItems: [
                        { name: "필름" },
                        { name: "CD" },
                        { name: "DVD" },
                        { name: "USB" }
                    ]
                },
                { name: "제증명서 사본" }
            ]
        }
        
    ]
};

const SearchSection = ({ 
    setSearchResults,
    setSelectedSido,
    setSelectedSggu,
    setSelectedClCd,
    setSelectedNpay
}) => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [districts, setDistricts] = useState([]);
  const [towns, setTowns] = useState([]);
  const [selectedClCdNm, setSelectedClCdNm] = useState("전체");

    const cityDistrictMap = {
        서울 : {
            전체 : ["전체"],
            강남구 : ["전체", "개포동", "논현동", "대치동", "도곡동", "삼성동", "세곡동", "수서동", "신사동", "압구정동", "역삼동","율현동", "일원동", "자곡동", "청담동"],
            강동구 : ["전체", "강일동", "고덕동", "길동", "둔촌동", "명일동", "상일동", "성내동", "암사동", "천호동"],
            강북구 : ["전체", "미아동", "번동", "수유동", "우이동동"],
            강서구 : ["전체", "가야동", "개화동", "공항동", "과해동", "내발산동", "등촌동", "마곡동", "방화동", "염창동", "오곡동", "오쇠동", "외발산동", "화곡동"],
            관악구 : ["전체", "남현동", "봉천동", "신림동"],
            광진구 : ["전체", "광장동", "구의동", "군자동", "능동", "자양동", "중곡동", "화양동"],
            구로구 : ["전체", "가리봉동", "개봉동", "고척동", "구로동", "궁동", "신도림동", "오류동", "온수동", "천왕동", "항동"],
            금천구 : ["전체", "가산동", "독산동", "시흥동"],
            노원구 : ["전체", "공릉동", "상계동", "월계동", "중계동", "하계동"],
            도봉구 : ["전체", "도봉동", "방학동", "쌍문동", "창동"],
            동대문구 : ["전체", "답십리동", "신설동", "용두동", "이문동", "장안동", "전농동", "제기동", "청량리동", "회기동", "휘경동"],
            동작구 : ["전체", "노량진동", "대방동", "동작동", "본동", "사당동", "상도1동", "상도동", "신대방동", "흑석동"],
            마포구 : ["전체", "공덕동", "구수동", "노고산동", "당인동", "대흥동", "도화동", "동교동", "마포동", "망원동", "상수동", "상암동", "서교동", "성산동", "신공덕동", "신수동", "신정동", "아현동", "연남동", "염리동", "용강동", "중동", "창전동", "토정동", "하중동", "합정동", "현석동"],
            서대문구 : ["전체", "남가좌동", "냉천동", "대신동","대현동", "미근동", "봉원동", "북가좌동", "북아현동", "신촌동", "연희동", "영천동", "옥천동", "창천동", "천연동", "충정로2가", "충정로3가", "합동", "현저동", "홍은동", "홍제동"],
            서초구 : ["전체", "내곡동", "반포동", "방배동", "서초동", "신원동", "양재동", "염곡동", "우면동", "원지동", "잠원동"],
            성동구 : ["전체", "금호동1가", "금호동2가", "금호동3가", "금호동4가", "도선동", "마장동", "사근동", "상왕십리동", "성수동1가", "성수동2가", "송정동", "옥수동", "용답동", "응봉동", "하왕십리동", "행당동", "홍익동"],
            성북구 : ["전체", "길음동", "돈암동", "동선동1가", "동선동2가", "동선동3가", "동선동4가", "동선동5가", "동소문동1가", "동소문동2가", "동소문동3가", "동소문동4가", "동소문동5가", "동소문동6가", "동소문동7가", "보문동1가", "보문동2가", "보문동3가", "보문동4가", "보문동5가", "보문동6가", "보문동7가", "삼선동1가", "삼선동2가", "삼선동3가", "삼선동4가", "삼선동5가", "상월곡동", "석관동", "성북동", "성북동1가", "안암동1가", "안암동2가", "안암동3가", "안암동4가", "안암동5가","장위동", "정릉동", "종암동", "하월곡동"],
            송파구 : ["전체", "가락동", "거여동", "마천동", "문정동", "방이동", "삼전동", "석촌동", "송파동", "신천동", "오금동", "잠실동", "장지동", "풍납동"],
            양천구 : ["전체", "목동", "신월동", "신정동"],
            영등포구 : ["전체", "당산동", "당산동1가", "당산동2가", "당산동3가", "당산동4가", "당산동5가", "당산동6가", "대림동", "도림동", "문래동1가", "문래동2가", "문래동3가", "문래동4가", "문래동5가", "문래동6가", "신길동", "양평동", "양평동1가", "양평동2가", "양평동3가", "양평동4가", "양평동5가", "양평동6가", "양화동", "여의도동", "영등포동", "영등포동1가", "영등포동2가", "영등포동3가", "영등포동4가", "영등포동5가", "영등포동6가", "영등포동7가", "영등포동8가"],
            용산구 : ["전체", "갈월동", "남영동", "도원동", "동빙고동", "동자동", "문배동", "보광동", "산천동", "서계동", "서빙고동", "신계동", "신창동","용문동", "용산동1가", "용산동2가", "용산동3가", "용산동4가", "용산동5가", "용산동6가", "원효로1가", "원효로2가", "원효로3가", "원효로4가", "이촌동", "이태원동", "주성동", "청암동", "청파동1가", "청파동2가", "청파동3가", "한강로1가", "한강로2가", "한강로3가", "한남동", "효창동", "후암동"],
            은평구 : ["전체", "갈현동", "구산동", "녹번동", "대조동", "불광동", "수색동", "신사동", "역촌동", "응암동", "증산동", "진관동"],
            종로구 : ["전체", "가회동", "견지동", "계동", "공평동", "관수동", "관철동", "관훈동", "교남동", "교북동", "구기동", "궁정동", "권농동", "낙원동", "내수동", "내자동", "누상동", "누하동", "당주동", "도렴동", "돈의동", "동숭동","명륜1가", "명륜2가", "명륜3가", "명륜4가", "묘동", "무악동", "봉익동", "부암동", "사간동", "사직동", "삼청동", "서린동", "세종로", "소격동", "송월동", "송현동", "수송동", "숭인동", "신교동", "신문로1가", "신문로2가", "신영동", "안국동", "연건동", "연지동", "예지동", "옥인동", "와룡동", "운니동", "원남동", "원서동", "이화동", "익선동", "인사동", "인의동", "장사동", "재동", "적선동", "종로1가", "종로2가", "종로3가", "종로4가", "종로5가", "종로6가", "중학동", "창성동", "창신동", "청운동", "청진동", "체부동", "충신동", "통의동", "통인동", "팔판동", "평동", "평창동", "필운동", "행촌동", "혜화동", "홍지동", "홍파동", "화동", "효자동", "효제동", "훈정동"],
            중구 : ["전체", "광희동1가", "광희동2가", "남대문로1가", "남대문로2가", "남대문로3가", "남대문로4가", "남대문로5가", "남산동1가", "남산동2가", "남산동3가", "남창동", "다동", "만리동1가", "만리동2가", "명동1가", "명동2가", "무교동", "무학동", "묵정동", "방산동", "봉래동1가", "봉래동2가", "북창동", "산림동", "삼각동", "서소문동", "소공동", "수표동", "수하동", "순화동", "신당동", "쌍림동", "예관동", "예장동", "오장동", "을지로1가", "을지로2가", "을지로3가", "을지로4가", "을지로5가", "을지로6가", "을지로7가", "의주로1가","의주로2가", "인현동1가", "인현동2가", "입정동", "장교동", "장충동1가", "장충동2가", "저동1가", "저동2가", "정동", "주교동", "주자동", "중림동", "초동", "충무로1가", "충무로2가", "충무로3가", "충무로4가", "충무로5가", "충정로1가", "태평로1가", "태평로2가", "필동1가", "필동2가", "필동3가", "황학동", "회현동1가", "회현동2가", "회현동3가", "흥인동"],
            중랑구 : ["전체", "망우동", "면목동", "묵동", "상봉동", "신내동", "중화동"],
        },
        부산 : {
            전체 : ["전체"],
            부산강서구 : ["전체", "강동동", "구랑동", "녹산동", "눌차동", "대저1동", "대저2동", "대항동", "동선동", "명지동", "미음동", "범방동", "봉림동", "생곡동", "성북동", "송정동", "식만동", "신호동", "죽동동", "죽림동", "지사동", "천성동", "화전동"],
            부산금정구 : ["전체", "구서동", "금사동", "금성동", "남산동", "노포동", "두구동", "부곡동", "서동", "선동", "오륜동", "장전동", "청룡동", "회동동동"],
            부산기장군 : ["전체", "기장읍", "일광면", "일광읍", "장안읍", "정관읍", "철마면"],
            부산남구 : ["전체", "감만동", "대연동", "문현동", "용당동", "용호동", "우암동"],
            부산동구 : ["전체", "범일동", "수정동", "좌천동", "초량동"],
            부산동래구 : ["전체", "낙민동", "명륜동", "명장동", "복천동", "사직동", "수안동", "안락동", "온천동", "칠산동"],
            부산북구 : ["전체", "구포동", "금곡동", "덕천동", "만덕동", "화명동"],
            부산사상구 : ["전체", "감전동", "괘법동", "덕포동", "모라동", "삼락동", "엄궁동", "주례동", "학장동"],
            부산사하구 : ["전체", "감천동", "괴정동", "구평동", "다대동", "당리동", "신평동", "장림동", "하단동"],
            부산서구 : ["전체", "남부민동", "동대신동1가", "동대신동2가", "동대신동3가", "부민동1가", "부민동2가", "부민동3가", "부용동1가", "부용동2가", "서대신동1가", "서대신동2가", "서대신동3가", "아미동1가", "아미동2가", "암남동", "초장동", "충무동1가", "충무동2가", "충무동3가", "토성동1가", "토성동2가", "토성동3가", "토성동4가", "토성동5가"],
            부산수영구 : ["전체", "광안동", "남천동", "망미동", "민락동", "수영동"],
            부산연제구 : ["전체", "거제동", "연산동"],
            부산영도구 : ["전체", "남항동1가", "남항동2가", "남항동3가", "대교동1가", "대교동2가", "대평동1가", "대평동2가", "동삼동", "봉래동1가", "봉래동2가", "봉래동3가", "봉래동4가", "봉래동5가", "신선동1가", "신선동2가", "신선동3가", "영선동1가", "영선동2가", "영선동3가", "영선동4가" ,"청학동"],
            부산중구 : ["전체", "광복동1가", "광복동2가", "광복동3가", "남포동1가", "남포동2가", "남포동3가", "남포동4가", "남포동5가", "남포동6가", "대창동1가", "대창동2가", "대청동1가", "대청동2가", "대청동3가", "대청동4가", "동광동1가", "동광동2가", "동광동3가", "동광동4가", "동광동5가", "보수동1가", "보수동2가", "보수동3가", "부평동1가", "부평동2가", "부평동3가", "부평동4가", "신창동1가", "신창동2가", "신창동3가", "신창동4가", "영주동", "중앙동1가", "중앙동2가", "중앙동3가", "중앙동4가", "중앙동5가", "중앙동6가", "중앙동7가", "창선동1가", "창선동2가"],
            부산진구 : ["전체", "가야동", "개금동", "당감동", "범전동", "범천동", "부암동", "부전동", "양정동", "연지동", "전포동", "초읍동"],
            부산해운대구 : ["전체", "반송동", "반여동", "석대동", "송정동", "우동", "재송동", "좌동", "중동"],
        },
        인천 : {
            전체 : ["전체"],
            인천강화군 : ["전체", "강화읍", "교동면", "길상면", "내가면", "불은면", "삼산면", "서도면", "선원면", "송해면", "양도면", "양사면", "하점면", "화도면면"], 
            인천계양구 : ["전체", "갈현동", "계산동", "귤현동", "노오지동", "다남동", "동양동", "둑실동", "목상동", "박촌동", "방축동", "병방동", "상야동", "서운동", "선주지동", "오류동", "용종동", "이화동", "임학동", "작전동", "장기동", "평동", "하야동", "효성동"],
            인천남동구 : ["전체", "간석동", "고잔동", "구월동", "남촌동", "논현동", "도림동", "만수동", "서창동", "수산동", "운연동", "장수동"],
            인천동구 : ["전체", "금곡동", "만석동", "송림동", "송현동", "창영동", "화수동", "화평동"],
            인천미추홀구 : ["전체", "관교동", "도화동", "문학동", "숭의동", "용현동", "주안동", "학익동"],
            인천부평구 : ["전체", "갈산동", "구산동", "부개동", "부평동", "산곡동", "삼산동", "십정동", "일신동", "청천동"],
            인천서구 : ["전체", "가정동", "가좌동", "검암동", "경서동", "공촌동", "금곡동", "당하동", "대곡동", "마전동", "백석동", "불로동", "석남동", "시천동", "신현동", "심곡동", "연희동", "오류동", "왕길동", "원당동", "원창동", "청라동"],
            인천연수구 : ["전체", "동춘동", "선학동", "송도동", "연수동", "옥련동", "청학동"],
            인천옹진군 : ["전체", "대청면", "덕적면", "백령면", "북도면", "연평면", "영흥면", "자월면"],
            인천중구 : ["전체", "경동", "관동1가", "관동2가", "관동3가", "남북동", "내동", "답동", "덕교동", "도원동", "무의동", "북성동1가", "북성동2가", "북성동3가", "사동", "선린동", "선화동", "송월동1가", "송월동2가", "송월동3가", "송학동1가", "송학동2가", "송학동3가", "신생동", "신포동", "신흥동1가", "신흥동2가", "신흥동3가", "용동", "운남동", "운북동", "운서동", "유동", "율목동", "을왕동", "인현동", "전동", "중산동", "중앙동1가", "중앙동2가", "중앙동3가", "중앙동4가", "항동1가", "항동2가", "항동3가", "항동4가", "항동5가", "항동6가", "항동7가", "해안동1가", "해안동2가", "해안동3가", "해안동4가"],  
        },
        대구 : {
            전체 : ["전체"],
            대구군위군 : ["전체", "군위읍", "부계면", "산성면", "삼국유사면", "소보면", "우보면", "의흥면", "효령면"],
            대구남구 : ["전체", "대명동", "봉덕동", "이천동"],
            대구달서구 : ["전체", "갈산동", "감삼동", "대곡동", "대천동", "도원동", "두류동", "본동", "본리동", "상인동", "성당동", "송현동", "신당동", "용산동", "월성동", "월암동", "유천동", "이곡동" ,"장기동", "장동", "죽전동", "진천동", "파호동", "호림동", "호산동"],
            대구달성군: ["전체", "가창면", "구지면", "논공읍", "다사읍", "옥포면", "옥포읍", "유가면", "유가읍", "하빈면", "현풍면", "현풍읍", "화원읍"],
            대구동구 : ["전체", "각산동", "검사동", "괴전동", "금강동", "내곡동", "내동", "능성동", "대림동", "덕곡동", "도동" ,"도학동", "동내동", "동호동", "둔산동", "매여동", "미곡동", "미대동", "방촌동", "백안동", "봉무동", "부동", "불로동", "사복동", "상매동", "서호동", "송정동", "숙천동", "신기동", "신무동", "신서동", "신암동", "신용동", "신천동", "신평동", "용계동", "용수동", "율암동", "율하동", "입석동", "중대동", "지묘동", "지저동", "진인동", "평광동", "효목동"],
            대구북구 : ["전체", "검단동", "고성동1가", "고성동2가", "고성동3가", "관음동", "구암동", "국우동", "금호동", "노곡동", "노원동1가", "노원동2가", "노원동3가", "대현동", "도남동", "동변동", "동천동", "동호동", "매천동", "복현동", "사수동", "산격동", "서변동", "연경동", "읍내동", "조야동", "칠성동1가", "칠성동2가", "침산동", "태전동", "팔달동", "학정동"],
            대구서구 : ["전체", "내당동", "비산동", "상리동", "원대동1가", "원대동2가", "원대동3가", "이현동", "중리동", "평리동"],
            대구수성구 : ["전체", "가천동", "고모동", "노변동", "대흥동", "두산동", "만촌동", "매호동", "범물동", "범어동", "사월동", "삼덕동", "상동", "성동", "수성동1가", "수성동2가", "수성동3가", "수성동4가", "시지동", "신매동", "연호동", "욱수동", "이천동", "중동", "지산동", "파동", "황금동"],
            대구중구 : ["전체", "계산동1가", "계산동2가", "공평동", "교동", "남산동", "남성로", "남일동", "달성동", "대봉동", "대신동", "대안동", "덕산동", "도원동", "동문동", "동산동", "동성로1가", "동성로2가", "동성로3가", "동인동1가", "동인동2가", "동인동3가", "동인동4가", "동일동", "문화동", "봉산동", "북내동", "북성로1가", "북성로2가", "사일동", "삼덕동1가", "삼덕동2가", "삼덕동3가", "상덕동", "상서동", "서내동", "서문로1가", "서문로2가", "서성로1가", "서성로2가", "서야동", "수동", "수창동", "시장북로", "완전동", "용덕동", "인교동", "장관동", "전동", "종로1가", "종로2가", "태평로1가", "태평로2가", "태평로3가", "포정동", "하서동", "향촌동", "화전동"],
        },
        광주 : {
            전체 : ["전체"],
            광주광산구 : ["전체", "고룡동", "광산동", "남산동", "내산동", "대산동", "덕림동", "도덕동", "도산동", "도천동", "도호동", "동림동", "동산동", "동호동", "두정동", "등임동", "명도동", "명화동", "박호동", "복룡동", "본덕동", "북산동", "비아동", "사호동", "산막동", "산수동" ,"산월동", "산정동", "삼거동", "삼도동", "서봉동", "선동", "선암동", "소촌동", "송대동", "송산동", "송정동", "송촌동", "송치동", "송학동", "수완동", "신가동", "신동", "신룡동", "신창동", "신촌동", "쌍암동", "안청동", "양동", "양산동", "연산동", "오산동", "오선동", "오운동", "옥동", "왕동", "요기동", "용곡동", "용동", "용봉동", "우산동", "운남동", "운수동", "월계동", "월곡동", "월전동", "유계동", "임곡동", "장덕동", "장록동", "장수동", "지산동", "지정동", "지죽동", "지평동", "진곡동", "하남동", "하산동", "황룡동", "흑석동"],
            광주남구 : ["전체", "구동", "구소동", "노대동", "대지동", "덕남동", "도금동", "방림동", "백운동", "봉선동", "사동", "서동", "석정동", "송하동", "승촌동", "신장동", "압촌동", "양과동", "양림동", "양촌동", "원산동", "월산동", "월성동", "이장동", "임암동", "주월동", "지석동", "진월동", "칠석동", "행암동", "화장동"],
            광주동구 : ["전체", "계림동", "광산동", "궁동", "금남로1가", "금남로2가", "금남로3가", "금남로4가", "금남로5가", "금동", "남동", "내남동", "대의동", "대인동", "동명동", "불로동", "산수동", "서석동", "선교동", "소태동", "수기동", "용산동", "용연동", "운림동", "월남동", "장동", "지산동", "충장로1가", "충장로2가", "충장로3가", "충장로4가", "충장로5가", "학동", "호남동", "황금동"],
            광주북구 : ["전체", "각화동", "금곡동", "누문동", "대촌동", "덕의동", "동림동", "두암동", "망월동", "매곡동", "문흥동", "본촌동", "북동", "삼각동", "생용동", "수곡동", "신안동", "신용동", "양산동", "연제동", "오룡동", "오치동", "용강동", "용두동", "용봉동", "용전동", "우산동", "운암동", "운정동", "월출동", "유동", "일곡동", "임동", "장등동", "중흥동", "지야동", "청풍동", "충효동", "태령동", "풍향동", "화암동", "효령동"],
            광주서구 : ["전체", "광천동", "금호동", "내방동", "농성동", "덕흥동", "동천동", "마륵동", "매월동", "벽진동", "서창동", "세하동", "쌍촌동", "양동", "용두동", "유촌동", "치평동", "풍암동", "화정동"],
        },
        대전 : {
            전체 : ["전체"],
            대전대덕구 : ["전체", "갈전동", "대화동", "덕암동", "목상동", "문평동", "미호동", "법동", "비래동", "삼정동", "상서동", "석봉동", "송촌동", "신대동", "신일동", "신탄진동", "연축동", "오정동", "와동", "용호동", "읍내동", "이현동", "장동", "중리동", "평촌동"],
            대전동구 : ["전체", "가양동", "가오동", "구도동", "낭월동", "내탑동", "대동", "대별동", "대성동", "마산동", "비룡동", "사성동", "삼괴동", "삼성동", "삼정동", "상소동", "성남동", "세천동", "소제동", "소호동", "신상동", "신안동", "신촌동", "신하동", "신흥동", "오동", "용운동", "용전동", "원동", "이사동", "인동", "자양동", "장척동", "정동", "주산동", "주촌동", "중동", "직동", "천동", "추동", "판암동", "하소동", "홍도동", "효동", "효평동"],
            대전서구 : ["전체", "가수원동", "가장동", "갈마동", "관저동", "괴곡동", "괴정동", "내동", "도마동", "도안동", "둔산동", "만년동", "매노동", "변동", "복수동", "봉곡동", "산직동", "오동", "용문동", "용촌동", "우명동", "원정동", "월평동", "장안동", "정림동", "탄방동", "평촌동", "흑석동"],
            대전유성구 : ["전체", "가정동", "갑동", "계산동", "관평동", "교촌동", "구룡동", "구성동", "구암동", "궁동", "금고동", "금탄동", "노은동", "대동", "대정동", "덕명동", "덕진동", "도룡동", "둔곡동", "문지동", "반석동", "방동", "방현동", "복용동", "봉명동", "봉산동", "상대동", "성북동", "세동", "송강동", "송정동", "수남동", "신동", "신봉동", "신성동", "안산동", "어은동", "외삼동", "용계동", "용산동", "원내동", "원신흥동", "원촌동", "자운동", "장대동", "장동", "전민동", "죽동", "지족동", "추목동", "탑립동", "하기동", "학하동", "화암동"],
            대전중구 : ["전체", "구완동", "금동", "대사동", "대흥동", "목달동", "목동", "무수동", "문창동", "문화동", "부사동", "사정동" ,"산성동", "석교동", "선화동", "안영동", "어남동", "오류동", "옥계동", "용두동", "유천동", "은행동", "정생동", "중촌동", "침산동", "태평동", "호동"],
        },
        울산 : {
            전체 : ["전체"],
            울산남구 : ["전체", "고사동", "남화동", "달동", "두왕동", "매암동", "무거동", "부곡동", "삼산동", "상개동", "선암동", "성암동", "신정동", "야음동", "여천동", "옥동", "용연동", "용잠동", "장생포동", "황성동"], 
            울산동구 : ["전체", "동부동", "미포동", "방어동", "서부동", "일산동", "전하동", "주전동", "화정동"],
            울산북구 : ["전체", "가대동", "구유동", "달천동", "당사동", "대안동", "매곡동", "명촌동", "무룡동", "산하동", "상안동", "송정동", "시례동", "신명동", "신천동", "신현동", "양정동", "어물동", "연암동", "염포동", "정자동", "중산동", "진장동", "창평동", "천곡동", "호계동", "화봉동", "효문동"],
            울산울주군 : ["전체", "두동면", "두서면", "범서읍", "삼남면", "삼남읍", "삼동면", "상북면", "서생면", "언양읍", "온산읍", "온양읍", "웅촌면", "청량면", "청량읍"],
            울산중구 : ["전체", "교동", "남외동", "다운동", "동동", "반구동", "복산동", "북정동", "서동", "성남동", "성안동", "약사동", "옥교동", "우정동", "유곡동", "장현동", "태화동", "학산동", "학성동"],
        },
        경기 : {
            전체 : ["전체"],
            가평군 : ["전체", "가평읍", "북면", "상면", "설악면", "조종면", "청평면", "하면"],
            고양덕양구 : ["전체", "강매동", "고양동", "관산동", "내곡동", "내유동", "대자동", "대장동", "덕은동", "도내동", "동산동", "벽제동", "북한동", "삼송동", "선유동", "성사동", "신원동", "신평동", "오금동", "용두동", "원당동", "원흥동", "주교동", "지축동", "토당동", "행신동", "행주내동", "행주외동", "향동동", "현천동", "화전동", "화정동", "효자동"],
            고양일산동구 : ["전체", "마두동", "문봉동" ,"백석동", "사리현동", "산황동", "설문동", "성석동", "식사동", "장항동", "정발산동", "중산동", "지영동" ,"풍동"],
            고양일산서구 : ["전체", "가좌동", "구산동", "대화동", "덕이동", "법곳동", "일산동", "주엽동", "탄현동"],
            과천시 : ["전체", "갈현동", "과천동", "관문동", "막계동", "문원동", "별양동", "부림동", "원문동", "주암동", "중앙동"],
            광명시 : ["전체", "가학동", "광명동", "노온사동", "소하동", "옥길동", "일직동", "철산동", "하안동"],
            광주시 : ["전체", "경안동", "고산동", "곤지암읍", "남종면", "남한산성면", "능평동", "도척면", "매산동", "목동", "목현동", "문형동", "삼동", "송정동", "신현동", "쌍령동", "양벌동", "역동", "오포읍", "장지동", "중대동", "중부면", "직동", "초월읍", "추자동", "탄벌동", "태전동", "퇴촌면", "회덕동"],
            구리시 : ["전체", "갈매동", "교문동", "사노동", "수택동", "아천동", "인창동", "토평동"],
            군포시 : ["전체", "금정동", "당동", "당정동", "대야미동", "도마교동", "둔대동", "부곡동", "산본동", "속달동"],
            김포시 : ["전체", "감정동", "걸포동", "고촌읍", "구래동", "대곶면", "마산동", "북변동", "사우동", "양촌읍", "운양동", "월곶면", "장기동", "통진읍", "풍무동", "하성면"],
            남양주시 : ["전체", "가운동", "금곡동", "다산동", "도농동", "별내동", "별내면", "삼패동", "수동면", "수석동", "오남읍", "와부읍", "이패동", "일패동", "조안면", "지금동", "진건읍", "진접읍", "퇴계원면", "퇴계원읍", "평내동", "호평동", "화도읍"],
            동두천시 : ["전체", "걸산동", "광암동", "동두천동", "보산동", "상봉암동", "상패동", "생연동", "송내동", "안흥동", "지행동", "탑동동", "하봉암동"],
            부천소사구 : ["전체", "계수동", "괴안동", "범박동", "소사본동", "송내동", "심곡본동", "옥길동"],
            부천오정구 : ["전체", "고강동", "내동", "대장동", "삼정동", "여월동", "오정동", "원종동", "작동"],
            부천원미구 : ["전체", "도당동", "상동", "소사동", "심곡동", "약대동", "역곡동", "원미동", "중동", "춘의동"],
            성남분당구 : ["전체", "구미동", "궁내동", "금곡동", "대장동", "동원동", "백현동", "분당동", "삼평동", "서현동", "석운동", "수내동", "야탑동", "운중동", "율동", "이매동", "정자동", "판교동", "하산운동"],
            성남수정구 : ["전체", "고등동", "금토동", "단대동", "둔전동", "복정동", "사송동", "산성동", "상적동", "수진동", "시흥동", "신촌동", "신흥동", "심곡동", "양지동", "오야동", "창곡동", "태평동"],
            성남중원구 : ["전체", "갈현동", "금광동", "도촌동", "상대원동", "성남동", "여수동", "은행동", "중앙동", "하대원동"],
            수원권선구 : ["전체", "고색동", "곡반정동", "구운동", "권선동", "금곡동", "당수동", "대황교동", "서둔동", "세류동", "오목천동", "입북동", "장지동", "탑동", "평동", "평리동", "호매실동"],
            수원영통구 : ["전체", "망포동", "매탄동", "신동", "영통동", "원천동", "이의동", "하동"],
            수원장안구 : ["전체", "상광교동", "송죽동", "연무동", "영화동", "율전동", "이목동", "정자동", "조원동", "천천동", "파장동", "하광교동"],
            수원팔달구 : ["전체", "고등동", "교동", "구천동", "남수동", "남창동", "매교동", "매산로1가", "매산로2가", "매산로3가", "매향동", "북수동", "신풍동", "영동", "우만동", "인계동", "장안동", "중동", "지동", "팔달로1가", "팔달로2가", "팔달로3가", "화서동"],
            시흥시 : ["전체", "거모동", "계수동", "과림동", "광석동", "군자동", "금이동", "논곡동", "능곡동", "대야동", "도창동", "매화동", "목감동", "무지내동", "물왕동", "미산동", "방산동", "배곧동", "산현동", "신천동", "안현동", "월곶동", "은행동", "장곡동", "장현동", "정왕동", "조남동", "죽율동", "포동", "하상동", "하중동", "화정동"],
            안산단원구 : ["전체", "고잔동", "대부남동", "대부동동", "대부북동", "목내동", "선감동", "선부동", "성곡동", "신길동", "와동", "원곡동", "원시동", "초지동", "풍도동", "화정동"],
            안산상록구 : ["전체", "건건동", "본오동", "부곡동", "사동", "사사동", "성포동", "수암동", "양상동", "월피동", "이동", "일동", "장상동", "장하동", "팔곡이동", "팔곡일동"],
            안성시 : ["전체", "가사동", "가현동", "계동", "고삼면", "공도읍", "구포동", "금광면", "금산동", "금석동", "낙원동", "당왕동", "대덕면", "대천동", "도기동", "동본동", "명륜동", "미양면", "발화동", "보개면", "봉남동", "봉산동", "사곡동", "삼죽면", "서운면", "서인동", "석정동", "성남동", "숭인동", "신건지동", "신모산동", "신소현동", "신흥동", "아양동", "양성면", "연지동", "영동", "옥산동", "옥천동", "원곡면", "인지동", "일죽면", "죽산면", "중리동", "창전동", "현수동"],
            안양동안구 : ["전체", "관양동", "비산동", "평촌동", "호계동"],
            안양만안구 : ["전체", "박달동", "석수동", "안양동"],
            양주시 : ["전체", "고암동", "고읍동", "광사동", "광적면", "남면", "남방동", "덕계동", "덕정동", "마전동", "만송동", "백석읍", "봉양동", "산북동", "삼숭동", "어둔동", "옥정동", "유양동", "율정동", "은현면", "장흥면", "회암동", "회정동"],
            양평군 : ["전체", "강상면", "강하면", "개군면", "단월면", "서종면", "양동면", "양서면", "양평읍", "옥천면", "용문면", "지평면", "청운면"],
            여주시 : ["전체", "가남읍", "가업동", "강천면", "교동", "금사면", "능서면", "능현동", "단현동", "대신면", "매룡동", "멱곡동", "북내면", "산북면", "삼교동", "상거동", "상동", "세종대왕면", "신진동", "연라동", "연양동", "오금동", "오학동", "우만동", "월송동", "점동면", "점봉동", "창동" ,"천송동", "하거동", "하동", "현암동", "홍문동", "흥천면"],
            연천군 : ["전체", "군남면", "미산면", "백학면", "신서면", "연천읍", "왕징면", "장남면", "전곡읍", "중면", "청산면"],
            오산시 : ["전체", "가수동", "가장동", "갈곶동", "고현동", "궐동", "금암동", "내삼미동", "누읍동", "두곡동", "벌음동", "부산동", "서동", "서랑동", "세교동", "수청동", "양산동", "오산동", "외삼미동", "원동", "은계동", "지곶동", "청학동", "청호동", "탑동"],
            용인기흥구 : ["전체", "고매동", "공세동", "구갈동", "농서동", "동백동", "마북동", "보라동", "보정동", "상갈동", "상하동", "서천동", "신갈동", "언남동", "양덕동", "중동", "지곡동", "청덕동", "하갈동"],
            용인수지구 : ["전체", "고기동", "동천동", "상현동", "성복동", "신봉동", "죽전동", "풍덕천동"],
            용인처인구 : ["전체", "고림동", "김량장동", "남동", "남사면", "남사읍", "마평동", "모현면", "모현읍", "백암면", "삼가동", "양지면", "역북동", "운학동", "원삼면", "유방동", "이동면", "이동읍", "포곡읍", "해곡동", "호동"],
            의왕시 : ["전체"],
            의정부시 : ["전체"],
            이천시 : ["전체"],
            파주시 : ["전체"],
            평택시 : ["전체"],
            포천시 : ["전체", ],
            하남시 : ["전체", ],
            화성시 : ["전체", ],
        },
        강원 : {
            전체 : ["전체"],
            강릉시 : ["전체", ],
            고성군 : ["전체", ],
            동해시 : ["전체", ],
            삼척시 : ["전체", ],
            속초시 : ["전체", ],
            양구군 : ["전체", ],
            양양군 : ["전체", ],
            영월군 : ["전체", ],
            원주시 : ["전체", ],
            인제군 : ["전체", ],
            정선군 : ["전체", ],
            철원군 : ["전체", ],
            춘천시 : ["전체", ],
            태백시 : ["전체", ],
            평창군 : ["전체", ],
            홍천군 : ["전체", ],
            화천군 : ["전체", ],
            횡성군 : ["전체", ],
        },
        충북 : {
            전체 : ["전체"],
            괴산군 : ["전체", ],
            단양군 : ["전체", ],
            보은군 : ["전체", ],
            영동군 : ["전체", ],
            옥천군 : ["전체", ],
            음성군 : ["전체", ],
            제천시 : ["전체", ],
            증평군 : ["전체", ],
            진천군 : ["전체", ],
            청주상당구 : ["전체", ],
            청주서원구 : ["전체", ],
            청주청원구 : ["전체", ],
            청주흥덕구 : ["전체", ],
            충주시 : ["전체", ],
        },
        충남 : {
            전체 : ["전체"],
            계룡시 : ["전체", ],
            공주시 : ["전체", ],
            금산군 : ["전체", ],
            논산시 : ["전체", ],
            당진시 : ["전체", ],
            보령시 : ["전체", ],
            부여군 : ["전체", ],
            서산시 : ["전체", ],
            서천군 : ["전체", ],
            아산시 : ["전체", ],
            예산군 : ["전체", ],
            천안동남구 : ["전체", ],
            천안서북구 : ["전체", ],
            청양군 : ["전체", ],
            태안군 : ["전체", ],
            홍성군 : ["전체", ],
        },
        전북 : {
            전체 : ["전체"],
            고창군 : ["전체", ],
            군산시 : ["전체", ],
            김제시 : ["전체", ],
            남원시 : ["전체", ],
            무주군 : ["전체", ],
            부안군 : ["전체", ],
            순창군 : ["전체", ],
            완주군 : ["전체", ],
            익산시 : ["전체", ],
            임실군 : ["전체", ],
            장수군 : ["전체", ],
            전주덕진구 : ["전체", ],
            전주완산구 : ["전체", ],
            정읍시 : ["전체", ],
            진안군 : ["전체", ],
        },
        전남 : {
            전체 : ["전체"],
            강진군 : ["전체", ],
            고흥군 : ["전체", ],
            곡성군 : ["전체", ],
            광양시 : ["전체", ],
            구례군 : ["전체", ],
            나주시 : ["전체", ],
            담양군 : ["전체", ],
            목포시 : ["전체", ],
            무안군 : ["전체", ],
            보성군 : ["전체", ],
            순천시 : ["전체", ],
            신안군 : ["전체", ],
            여수시 : ["전체", ],
            영광군 : ["전체", ],
            영암군 : ["전체", ],
            완도군 : ["전체", ],
            장성군 : ["전체", ],
            장흥군 : ["전체", ],
            진도군 : ["전체", ],
            함평군 : ["전체", ],
            해남군 : ["전체", ],
            화순군 : ["전체", ],
        },
        경북 : {
            전체 : ["전체"],
            경산시 : ["전체", ],
            경주시 : ["전체", ],
            고령군 : ["전체", ],
            구미시 : ["전체", ],
            김천시 : ["전체", ],
            문경시 : ["전체", ],
            봉화군 : ["전체", ],
            상주시 : ["전체", ],
            성주군 : ["전체", ],
            안동시 : ["전체", ],
            영덕군 : ["전체", ],
            영양군 : ["전체", ],
            영주시 : ["전체", ],
            영천시 : ["전체", ],
            예천군 : ["전체", ],
            울릉군 : ["전체", ],
            울진군 : ["전체", ],
            의성군 : ["전체", ],
            청도군 : ["전체", ],
            청송군 : ["전체", ],
            칠곡군 : ["전체", ],
            포항남구 : ["전체", ],
            포항북구 : ["전체", ],
        },
        경남 : {
            전체 : ["전체"],
            거제시 : ["전체", ],
            거창군 : ["전체", ],
            고성군 : ["전체", ],
            김해시 : ["전체", ],
            남해군 : ["전체", ],
            밀양시 : ["전체", ],
            사천시 : ["전체", ],
            산청군 : ["전체", ],
            양산시 : ["전체", ],
            의령군 : ["전체", ],
            진주시 : ["전체", ],
            창녕군 : ["전체", ],
            창원마산합포구 : ["전체", ],
            창원마산회원구 : ["전체", ],
            창원성산구 : ["전체", ],
            창원의창구 : ["전체", ],
            창원진해구 : ["전체", ],
            통영시 : ["전체", ],
            하동군 : ["전체", ],
            함안군 : ["전체", ],
            함양군 : ["전체", ],
            합천군 : ["전체", ],
        },
        제주 : {
            전체 : ["전체"],
            서귀포시 : ["전체", ],
            제주시 : ["전체", ],
        },
        세종 : {
            전체 : ["전체"],
            세종시 : ["전체", ],
        }
    }

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    setSelectedSido?.(city || "");
    setSelectedDistrict("");
    setSelectedSggu?.("");
    setTowns([]);
    setDistricts(cityDistrictMap[city] ? Object.keys(cityDistrictMap[city]) : []);
  };

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    setSelectedSggu?.(district || "");
    setTowns(cityDistrictMap[selectedCity]?.[district] || []);
  };

  const handleClcdChange = (e) => {
    const v = e.target.value;                // "전체" 포함
    setSelectedClCdNm(v);
    setSelectedClCd?.(v || "");              // 🔹 부모에 반영
  };

  const handleSearchFromModal = (npayKorNmList) => {
    const npayLabel = 
        Array.isArray(npayKorNmList) && npayKorNmList.length > 0
        ? (npayKorNmList.length === 1
            ? npayKorNmList[0]
            : `${npayKorNmList[0]} 외 ${npayKorNmList.length - 1}건`)
        : "";

    setSelectedNpay?.(npayLabel);

    const requestData = {
      sidoCdNm: selectedCity === "전체" ? null : selectedCity,
      sgguCdNm: selectedDistrict === "전체" ? null : selectedDistrict,
      clCdNm: selectedClCdNm === "전체" ? null : selectedClCdNm,
      npayKorNmList: npayKorNmList // 배열로 넘김
    };

    console.log("\u{1F4E1} 보내는 요청:", requestData);

    axios
      .post("http://localhost:8080/api/search/items", requestData)
      .then((res) => {
        console.log("\u2705 검색 결과:", res.data);
        setSearchResults(res.data);
      })
      .catch((err) => {
        console.error("\u274C API 호출 실패:", err);
      });
  };

  return (
    <section className="search-section">
      <div className="navbar">
        <h2>비급여 진료비용 상세 검색</h2>
      </div>

      <div className="search-item">
        <label>병·의원으로 조회하기</label>
        <div className="input-with-icon">
          <input type="text" placeholder="병·의원 이름 또는 도로명 주소 입력" />
        </div>
      </div>

      <div className="search-item">
        <h3>1. 지역</h3>
        <select value={selectedCity} onChange={handleCityChange}>
          <option value="" disabled hidden>시/도 선택</option>
          {Object.keys(cityDistrictMap).map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

        <select value={selectedDistrict} onChange={handleDistrictChange} disabled={!selectedCity}>
          <option value="" disabled hidden>{selectedCity ? "시/군/구 선택" : "먼저 시/도를 선택하세요"}</option>
          {districts.map((district) => (
            <option key={district} value={district}>{district}</option>
          ))}
        </select>
      </div>

      <div className="search-item">
        <h3>2. 의료기관 규모</h3>
        <select value={selectedClCdNm} onChange={(e) => setSelectedClCdNm(e.target.value)}>
          <option value="전체">전체</option>
          <option value="상급종합병원">상급종합병원</option>
          <option value="종합병원">종합병원</option>
          <option value="병원">병원</option>
          <option value="요양병원">요양병원</option>
          <option value="정신병원">정신병원</option>
          <option value="치과병원">치과병원</option>
          <option value="한방병원">한방병원</option>
          <option value="의원">의원</option>
          <option value="치과의원">치과의원</option>
          <option value="한의원">한의원</option>
        </select>
      </div>

      <div className="search-item">
        <h3>3. 비급여 진료비 항목</h3>
        <div className="button-grid-container">
          <ButtonGrid onButtonClick={setSelectedButton} />
          {selectedButton !== null && (
            <Modal
              buttonId={selectedButton}
              onClose={() => setSelectedButton(null)}
              onSearch={handleSearchFromModal}
              modalOptions={modalOptions} // 필요 시 상위에서 import 전달
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
