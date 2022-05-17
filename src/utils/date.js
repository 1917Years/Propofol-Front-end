export function leafYear(year) {
    if (year % 4 == 0) {
        if (year % 100 == 0) {
            if (year % 400 == 0) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return true;
        }
    }
    else return false;
}


export function dateToNumber(IsLeafYear, date) {
    if (IsLeafYear) {
        if (date.slice(-5, -3) == 1) {
            let tmpnum = 0;
            tmpnum = date.slice(-2) * 1;
            return tmpnum;
        }
        else if (date.slice(-5, -3) == 2) {
            let tmpnum = 0;
            tmpnum = date.slice(-2) * 1 + 31;
            return tmpnum;
        }
        else if (date.slice(-5, -3) == 3) {
            let tmpnum = 0;
            tmpnum = date.slice(-2) * 1 + 60;
            return tmpnum;
        }
        else if (date.slice(-5, -3) == 4) {
            let tmpnum = 0;
            tmpnum = date.slice(-2) * 1 + 91;
            return tmpnum;
        }
        else if (date.slice(-5, -3) == 5) {
            let tmpnum = 0;
            tmpnum = date.slice(-2) * 1 + 121;
            return tmpnum;
        }
        else if (date.slice(-5, -3) == 6) {
            let tmpnum = 0;
            tmpnum = date.slice(-2) * 1 + 152;
            return tmpnum;
        }
        else if (date.slice(-5, -3) == 7) {
            let tmpnum = 0;
            tmpnum = date.slice(-2) * 1 + 182;
            return tmpnum;
        }
        else if (date.slice(-5, -3) == 8) {
            let tmpnum = 0;
            tmpnum = date.slice(-2) * 1 + 213;
            return tmpnum;
        }
        else if (date.slice(-5, -3) == 9) {
            let tmpnum = 0;
            tmpnum = date.slice(-2) * 1 + 244;
            return tmpnum;
        }
        else if (date.slice(-5, -3) == 10) {
            let tmpnum = 0;
            tmpnum = date.slice(-2) * 1 + 274;
            return tmpnum;
        }
        else if (date.slice(-5, -3) == 11) {
            let tmpnum = 0;
            tmpnum = date.slice(-2) * 1 + 305;
            return tmpnum;
        }
        else if (date.slice(-5, -3) == 12) {
            let tmpnum = 0;
            tmpnum = date.slice(-2) * 1 + 335;
            return tmpnum;
        }
    } else {
        if (date.slice(-5, -3) == 1) {
            let tmpnum = 0;
            tmpnum = date.slice(-2) * 1;
            return tmpnum;
        }
        else if (date.slice(-5, -3) == 2) {
            let tmpnum = 0;
            tmpnum = date.slice(-2) * 1 + 31;
            return tmpnum;
        }
        else if (date.slice(-5, -3) == 3) {
            let tmpnum = 0;
            tmpnum = date.slice(-2) * 1 + 59;
            return tmpnum;
        }
        else if (date.slice(-5, -3) == 4) {
            let tmpnum = 0;
            tmpnum = date.slice(-2) * 1 + 90;
            return tmpnum;
        }
        else if (date.slice(-5, -3) == 5) {
            let tmpnum = 0;
            tmpnum = date.slice(-2) * 1 + 120;
            return tmpnum;
        }
        else if (date.slice(-5, -3) == 6) {
            let tmpnum = 0;
            tmpnum = date.slice(-2) * 1 + 151;
            return tmpnum;
        }
        else if (date.slice(-5, -3) == 7) {
            let tmpnum = 0;
            tmpnum = date.slice(-2) * 1 + 181;
            return tmpnum;
        }
        else if (date.slice(-5, -3) == 8) {
            let tmpnum = 0;
            tmpnum = date.slice(-2) * 1 + 212;
            return tmpnum;
        }
        else if (date.slice(-5, -3) == 9) {
            let tmpnum = 0;
            tmpnum = date.slice(-2) * 1 + 243;
            return tmpnum;
        }
        else if (date.slice(-5, -3) == 10) {
            let tmpnum = 0;
            tmpnum = date.slice(-2) * 1 + 273;
            return tmpnum;
        }
        else if (date.slice(-5, -3) == 11) {
            let tmpnum = 0;
            tmpnum = date.slice(-2) * 1 + 304;
            return tmpnum;
        }
        else if (date.slice(-5, -3) == 12) {
            let tmpnum = 0;
            tmpnum = date.slice(-2) * 1 + 334;
            return tmpnum;
        }
    }
}


export function numberToDate(year, IsLeafYear, number) {
    if (IsLeafYear) {
        switch (number) {
            case 1 <= number <= 31:
                return year + "-" + 1 + "-" + number;
                break;
            case 32 <= number <= 60:
                return year + "-" + 2 + "-" + number;
                break;
            case 61 <= number <= 91:
                return year + "-" + 3 + "-" + number;
                break;
            case 92 <= number <= 121:
                return year + "-" + 4 + "-" + number;
                break;
            case 122 <= number <= 152:
                return year + "-" + 5 + "-" + number;
                break;
            case 153 <= number <= 182:
                return year + "-" + 6 + "-" + number;
                break;
            case 183 <= number <= 213:
                return year + "-" + 7 + "-" + number;
                break;
            case 214 <= number <= 244:
                return year + "-" + 8 + "-" + number;
                break;
            case 245 <= number <= 274:
                return year + "-" + 9 + "-" + number;
                break;
            case 275 <= number <= 305:
                return year + "-" + 10 + "-" + number;
                break;
            case 306 <= number <= 335:
                return year + "-" + 11 + "-" + number;
                break;
            case 336 <= number <= 366:
                return year + "-" + 12 + "-" + number;
                break;
        }
    }
    else {
        if (1 <= number && number <= 31) {
            //console.log("아니 왜? 왜? 왜? 왜? 웨? 웨지감자 ");
            //console.log(year + "-" + 1 + "-" + number);
            return (year + "-" + 1 + "-" + number).toString();
        }
        else if (32 <= number && number <= 59) {
            return (year + "-" + 2 + "-" + (number - 31)).toString();
        }
        else if (60 <= number && number <= 90) {
            return (year + "-" + 3 + "-" + (number - 59)).toString();
        }
        else if (91 <= number && number <= 120) {
            return (year + "-" + 4 + "-" + (number - 90)).toString();
        }
        else if (121 <= number && number <= 151) {
            return (year + "-" + 5 + "-" + (number - 120)).toString();
        }
        else if (152 <= number && number <= 181) {
            return (year + "-" + 6 + "-" + (number - 151)).toString();
        }
        else if (182 <= number && number <= 212) {
            return (year + "-" + 7 + "-" + (number - 181)).toString();
        }
        else if (213 <= number && number <= 243) {
            return (year + "-" + 8 + "-" + (number - 212)).toString();
        }
        else if (244 <= number && number <= 273) {
            return (year + "-" + 9 + "-" + (number - 243)).toString();
        }
        else if (274 <= number && number <= 304) {
            return (year + "-" + 10 + "-" + (number - 273)).toString();
        }
        else if (305 <= number && number <= 334) {
            return (year + "-" + 11 + "-" + (number - 304)).toString();
        }
        else if (335 <= number && number <= 365) {
            return (year + "-" + 12 + "-" + (number - 334)).toString();
        }
    }
}