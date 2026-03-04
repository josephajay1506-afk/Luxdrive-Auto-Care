// ================= SAVE LOGIN =================
export const loginUser = (data) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
};

// ================= GET TOKEN =================
export const getToken = () => {
  return localStorage.getItem("token");
};

// ================= GET USER =================
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// ================= LOGOUT =================
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
