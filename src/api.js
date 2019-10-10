import { SERVER_500 } from './constants';
import baseURL from './baseUrl';

const makeHeader = () => {
   const user = JSON.parse(localStorage.getItem("authenticated"));
   const header = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
   }
   if (user) {
      header['X-User-Token'] = user.authentication_token;
      header['X-User-Email'] = user.email;
   }
   return header
};
////////////////////////////////////////////////////////////////////////////////////
const apiRequest = async (url, method = 'GET', body, setErrorMessage) => {
   const response = await fetch(baseURL + url, {
      method: method,
      headers: makeHeader(),
      body: (body === undefined) ? undefined : JSON.stringify(body)
   });
   if (response.status >= 500) {
      alert(SERVER_500);
   } else if ((url === "sign_in") && (response.status === 403)) {
      const responseObject = await response.json();
      const errorObject = { error: true, responseObject };
      return errorObject
   } else if ((response.status >= 200) && (response.status < 300)) {
      const responseObject = await response.json();
      return responseObject
   } else {
      const errorObject = await response.json();
      if (typeof errorObject.error == "string") {
         setErrorMessage(errorObject.error)
      } else {
         const errors = errorObject.error.map(err => err + ', ')
         setErrorMessage(errors)
      }
   }
}

export default apiRequest;