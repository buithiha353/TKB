# Hệ thống Xếp Thời Khoá Biểu THCS

Hệ thống hỗ trợ xếp thời khoá biểu cho cấp THCS, được thiết kế chuyên biệt để đáp ứng các yêu cầu phức tạp về phân công giảng dạy, giáo viên chạy show giữa các điểm trường, cũng như các giới hạn về tiết học trong tuần.

## Tính năng nổi bật

- **Quản lý toàn diện**: Dễ dàng thêm, sửa, xoá Điểm trường, Lớp học, Môn học (và số tiết chuẩn), cùng với thông tin Giáo viên.
- **Phân công chuyên môn**: Bảng phân công tiết dạy thông minh, cho phép đối chiếu số tiết đã phân công với số tiết chuẩn (hiển thị cảnh báo đỏ nếu bị lệch).
- **Trình tạo Thời khoá biểu (Tự động & Kéo thả)**:
  - Khả năng **tự động xếp TKB** dựa trên các ràng buộc cơ bản.
  - Chức năng **Kéo & Thả (Drag & Drop)** trực quan để sắp xếp thủ công.
  - **Cảnh báo xung đột (Conflicts)**: Hệ thống theo dõi liên tục toàn bộ TKB và đưa ra danh sách cảnh báo tĩnh trên màn hình nếu có môn học vi phạm quy tắc (VD: xếp quá số tiết/ngày, trùng lịch giáo viên, giáo viên dạy ở ngày đã báo nghỉ...).
- **Đăng nhập nội bộ**: Mọi truy cập vào hệ thống đều được bảo vệ bởi tính năng Đăng nhập. Hệ thống đối chiếu dữ liệu tài khoản và mật khẩu trực tiếp từ danh sách trên Google Sheets (CSV). Trạng thái đăng nhập được lưu trữ, không cần đăng nhập lại khi F5.

## Cài đặt & Khởi chạy (Dành cho Lập trình viên)

Dự án được xây dựng trên bộ công nghệ **TanStack Start (Vite)**, **React**, **Zustand** và **TailwindCSS**.

```bash
# 1. Cài đặt các gói phụ thuộc
npm install

# 2. Khởi chạy máy chủ phát triển cục bộ
npm run dev

# 3. Biên dịch ứng dụng cho môi trường Production (Sử dụng Nitro)
npm run build
```

_Lưu ý: Mọi thiết lập liên quan đến hệ thống quản trị bằng bot Lovable đã được gỡ bỏ hoàn toàn, kho lưu trữ này hoạt động hoàn toàn độc lập và có thể triển khai lên bất kỳ nền tảng Hosting / Server tuỳ chỉnh nào._

## Bảo mật & Quyền truy cập

- Dữ liệu đăng nhập (Tài khoản & Mật khẩu) được kiểm tra trực tiếp từ cấu hình Google Sheets.
- File JSON cấu hình tài khoản cần được tuân thủ định dạng CSV cơ bản để hệ thống đọc hiểu tự động.

## Bản quyền

Phát triển dành riêng cho nghiệp vụ quản lý giáo dục trường THCS.
