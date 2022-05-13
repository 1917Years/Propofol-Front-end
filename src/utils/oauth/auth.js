import { React, useState } from "react";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export function setRefreshTokenToCookie(refresh_token) {
    cookies.set('refresh_token', refresh_token, { sameSite: 'strict' });
}

export function getRefreshToken() {
    const refresh_token = cookies.get('refresh_token');
    if (refresh_token) {
        return refresh_token;
    } else {
        return "no refresh_token";
    }
}

export function auth() {

}
