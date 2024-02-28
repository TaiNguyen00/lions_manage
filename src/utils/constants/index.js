let ROOT_URL_API;
if ('localhost' == window.location.hostname) {
  ROOT_URL_API = import.meta.env.VITE_API_DEV;
} else {
  ROOT_URL_API = import.meta.env.VITE_API_PRODUCTION;
}
export { ROOT_URL_API };

export const ROOM_TYPES = {
  ROOM_ALL: "Tất cả",
  ROOM_EMPTY: "Phòng trống",
  ROOM_HAVE_USER: "Phòng đang ở"
}