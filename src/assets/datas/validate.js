export const validateEmail = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('請輸入E-mail'))
    }
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(value).toLowerCase())){
        callback()
    }else{
        callback(new Error('請輸入E-mail正確格式'))
    }
}
// export const checkAge = (rule, value, callback) => {
//     if (!value) {
//       return callback(new Error('年龄不能为空'));
//     }
//     setTimeout(() => {
//       if (!Number.isInteger(value)) {
//         callback(new Error('請輸入数字值'));
//       } else {
//         if (value < 18) {
//           callback(new Error('必须年满18岁'));
//         } else {
//           callback();
//         }
//       }
//     }, 1000);
// }
export const validatePass = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('請輸入密碼'))
    }
    callback()
}
