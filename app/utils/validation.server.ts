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

    if (stripped.length <= 4) {
      return "Username much be greater than 4 characters";
    }
  }
}

export function validatePassword(field: string) {
  return field.length <= 4 && "Password must be more than 4 characters";
}
