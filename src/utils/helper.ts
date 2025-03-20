import {
  rexBirth,
  rexEamil,
  rexName,
  rexPhoneNumber,
  rexPostcode,
} from './validation';

export function toBodyStyleHidden(onOff: boolean) {
  const body = document.querySelector('body') as HTMLElement;

  if (onOff) {
    body.style.overflow = 'hidden';
    body.style.position = 'relative';
    body.style.height = '100%';
  } else {
    body.removeAttribute('style');
  }
}

export function validateEmail(email: string) {
  const re = rexEamil;
  return re.test(email);
}

export function validatePhoneNumber(phoneNumber: string) {
  const re = rexPhoneNumber;
  return re.test(phoneNumber);
}

export function validatePostcode(validatePostcode: string) {
  const re = rexPostcode;
  return re.test(validatePostcode);
}

export function checkBirth(str: string) {
  const regExp = rexBirth;
  if (regExp.test(str)) {
    return true;
  } else {
    false;
  }
}

export function checkName(str: string) {
  const regExp = rexName;
  if (regExp.test(str)) {
    return true;
  } else {
    false;
  }
}
