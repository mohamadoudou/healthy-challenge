export function validateUsernameEmail(field: string) {
  // CHeck if email
  if (/\@/.test(field)) {
    // Validate email address
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(field)) {
      return "You have entered an invalid email address!";
    }
  } else {
    // Validate username
    let stripped = field.replace(/[\(\)\.\-\ ]/g, "");

    if (stripped.length <= 6) {
      return "Username much be greater than 6 characters";
    }
  }
}

export function validatePassword(field: string) {
  return field.length <= 6 && "Password must be more than 6 characters";
}
