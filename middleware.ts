export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/reservations", "/manage", "/manage/reservations", "/favorites"],
};
