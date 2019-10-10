const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^\d{10}$/;
/////////////////////////////////////////////////////////////////////////
export function validateEmail(email) {
   return emailRegex.test(email)
}
/////////////////////////////////////////////////////////////////////////
export function validatePhone(phone) {
   return phoneRegex.test(phone)
}
/////////////////////////////////////////////////////////////////////////
//accepts nested array of objects(arr), selected Id, and the key for another array of object
//inside the arr
//returns the array of object of the input key
export const filterArray = (arr, itemId, key) => {
   const filteredArr = arr.filter(e => e.id === itemId);
   const newArray = filteredArr[0] && filteredArr[0][key];
   return newArray
};
