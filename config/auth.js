import moment from 'moment';
import Cookies from 'js-cookie';

export const auth = (userAuthenticationInfo) => {
    if (userAuthenticationInfo) {
        try {
            const parsedAuthInfo = JSON.parse(userAuthenticationInfo);
            if (parsedAuthInfo && parsedAuthInfo.tokenExpiration) {
                const tokenExpirationDate = moment(parsedAuthInfo.tokenExpiration);
                const isTokenExpired = moment().diff(moment(tokenExpirationDate), 'minute') < 0;
                if (isTokenExpired) {
                    return true
                } else {
                    Cookies.remove("authenticationInfo");
                    return false
                }
            } else {
                console.error("tokenExpiration property does not exist in the parsed authentication info.");
            }
        } catch (error) {
            console.error("Error parsing authentication info:", error);
        }
    } else {
        console.error("No authentication info found in cookies.");
    }
}