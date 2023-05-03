function isValidEmail(email) {
  // 验证电子邮件地址长度
  if (email.length > 50 || email.length < 5) return false;
  // 使用正则表达式检查电子邮件地址格式
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidUsername(username) {
  // 验证用户名长度
  if (username.length > 50 || username.length < 3) {
    return false;
  }
  // 验证用户名是否包含空格
  if (username.indexOf(" ") !== -1) {
    return false;
  }
  // 验证用户名是否包含非法字符
  const usernameRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
  return usernameRegex.test(username);
}

function isValidPassword(password) {
  const passwordRegex = /^[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{6,}$/;
  return passwordRegex.test(password);
}

export { isValidEmail, isValidUsername, isValidPassword };
