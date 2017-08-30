// 验证还没有加上 TODO
import { FormControl } from '@angular/forms';

const EMAIL_REGEXP = /^[0-9A-Z]+@[0-9A-Z]+.com$/;
const TEL_REGEXP = /^1[0,9]{10}$/;

export function validateEmail(c:FormControl){
    return EMAIL_REGEXP.test(c.value) ? null : {
        valid: false,
        errorMsg: '邮箱格式不正确'
    }
}

export function validateTel(c:FormControl){
    return TEL_REGEXP.test(c.value) ? null : {
        valid: false,
        errorMsg: '电话格式不正确'
    }
}
