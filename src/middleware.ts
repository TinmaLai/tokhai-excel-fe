import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value; // Lấy token từ cookie

    if (!token) {
        // Nếu không có token, redirect về trang đăng nhập
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next(); // Cho phép truy cập nếu có token
}

// Chỉ áp dụng middleware cho các route cần bảo vệ
export const config = {
    matcher: ["/","/list"], // Chỉ bảo vệ các trang này
};
