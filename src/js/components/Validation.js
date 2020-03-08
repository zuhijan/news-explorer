export default class Validation {
  constructor() {
  }
  isEmpty(field) {
    return !field.value;
  }
  isWrongLength(field) {
    return (field.value.trim().length < 2 || field.value.trim().length > 30) && field.type === 'text';
  }
  isNotEmail(field) {
    return field.validity.typeMismatch && field.type == 'email';
  }
  isWrongPassword(field) {
    return (field.value.trim().length < 8 || field.value.trim().length > 30) && field.type == 'password';
  }

}
