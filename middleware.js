export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/category",
    "/dashboard/subcategory",
    "/dashboard/product",
  ],
};