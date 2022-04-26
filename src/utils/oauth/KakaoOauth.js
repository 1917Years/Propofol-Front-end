import React, { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import { SERVER_URL } from "../SRC";
//import { getCookie, deleteCookie, setCookie } from "../cookie";
import { getMemberInfoOauth } from "../ApiConfig";

function KakaoOauth(props) {
    /*
    const queryObj = queryString.parse(props.location.search);
    const { code } = queryObj;
*/
    const pathname = useLocation().search;
    const code = pathname.substring(6, pathname.length);
    useEffect(() => {
        console.log("왜안와!!!!!!!");
        console.log(pathname);
        console.log(code);

        axios
            .get(SERVER_URL + "/oauth2/kakao/login?code=" + code)
            .then((res) => {
                console.log(res);

                /*
                setCookie("token", "Bearer " + res.data.accessToken, {
                    path: "/",
                    secure: true,
                    sameSite: "none",
                });
*/
                //              getMemberInfoOauth({ props });
            })
            .catch((err) => {
                console.error(err);
            });

    }, []);

    return (
        <div className="loading-container">
            <div className="loading"></div>
            <div id="loading-text">loading</div>
        </div>
    );
}

export default KakaoOauth;