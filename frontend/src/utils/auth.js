export function setToken(token) {
  localStorage.setItem("yolo_token", token);
}

export function getToken() {
  return localStorage.getItem("yolo_token");
}

export function logout() {
  localStorage.removeItem("yolo_token");
}
