import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [userid, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:8080/api/admin/login", {id:userid, password});
            if (res.data === "로그인 성공"){
                localStorage.setItem("isAdmin", "true");
                navigate("/");
            } else {
                alert("로그인 실패");
            }
        }catch (err){
            alert("에러");
        }
    };

    return (
        <div className="admin-login">
            <h2>관리자 로그인</h2>
            <input
                type="text"
                placeholder="아이디"
                value={userid}
                onChange={(e) => setUserId(e.target.value)}
            />
            <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>로그인</button>
        </div>
    );
};

export default LoginPage;