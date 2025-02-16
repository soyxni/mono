import React from "react";
import "../css/Modal.css";

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
                { name: "후두내시경하 펄스다이레이저저 후두수술" },
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

const RenderItems = ({ items }) => {
    if (!items) return null; // items가 없으면 아무것도 렌더링하지 않도록

    return (
        <ul>
            {items.map((item, index) => (
                <li key={index}>
                    <div className="item">
                        <input
                            type="checkbox"
                            id={item.name || item.category}
                            name={item.name || item.category}
                        />
                        <label htmlFor={item.name || item.category}>
                            {item.name || item.category}
                        </label>
                    </div>
                    {item.subItems && <RenderItems items={item.subItems} />}
                </li>
            ))}
        </ul>
    );
};

const Modal = ({ buttonId, onClose }) => {
    const modalContent = modalOptions[buttonId] || [];

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div clasName="modal-header">
                    <h2>상세분야 선택</h2>
                    <button className="close-button" onClick={onClose}>
                        X
                    </button>
                </div>
                <div className="modal-body">
                    {modalContent.map((group, index) => (
                        <div key={index}>
                            <h3>{group.category}</h3>
                            <RenderItems items={group.items} />
                        </div>
                    ))}
                </div>
                <div className="modal-footer">
                    <button className="search-button">선택항목 검색</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;