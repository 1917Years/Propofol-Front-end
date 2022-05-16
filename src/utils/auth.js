import { React, useState } from "react";
import Cookies from 'universal-cookie';
import axios from "axios";
import { SERVER_URL } from "./SRC.js";

const cookies = new Cookies();

export function setRefreshTokenToCookie(refresh_token) {
    cookies.set('refresh_token', refresh_token, { sameSite: 'strict' });
}

export function setAccessTokenToCookie(access_token) {
    cookies.set('access_token', access_token, { sameSite: 'strict' });
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
}

export function getAccessToken() {
    const access_token = cookies.get('access_token');
    if (access_token) {
        return access_token;
    } else {
        return "no access_token";
    }
}

export function getRefreshToken() {
    const refresh_token = cookies.get('refresh_token');
    if (refresh_token) {
        return refresh_token;
    } else {
        return "no refresh_token";
    }
}

export function refreshJWT(originalRequest) { //백으로부터 갱신요청 받았을 시 호출
    axios
        .get(SERVER_URL + "/user-service/auth/refresh",
            {
                headers: { "refresh-token": getRefreshToken() }, // 갱신을 위해 헤더에 refresh-token 첨부
            })
        .then((res) => {
            const at = res.data.data.accessToken;
            console.log("엑세스 토큰 : " + at);
            originalRequest.headers['Authorization'] = at;
            console.log("리프레쉬 토큰 : " + res.data.data.refreshToken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${at}`;
            setRefreshTokenToCookie(res.data.data.refreshToken);
            //return at;
            // 이전 요청 다시 호출해야 함
        })
        .catch((err) => {
            console.log("에러!!!!!!!");
            console.log(err);
            removeJWT();
            //return null;
        });
}

export function removeJWT() { // 갱신 실패 or 로그아웃 시 호출
    axios.defaults.headers.common['Authorization'] = null;
    cookies.remove('refresh_token');
}

export function auth() {

}
