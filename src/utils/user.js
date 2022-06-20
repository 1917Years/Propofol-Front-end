import { React, useState } from "react";
import Cookies from 'universal-cookie';
import axios from "axios";
import { SERVER_URL } from "./SRC.js";

const cookies = new Cookies();

export function setUserDataCookie(data) {
    cookies.set('user_data', data, { sameSite: 'strict' });
}

export function getUserDataToken() {
    const user_data = cookies.get('user_data');
    if (user_data) {
        return user_data;
    } else {
        return null;
    }
}

export function deleteUserData() {
    cookies.remove('user_data');
}