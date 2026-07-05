# Audit Desktop

## Trạng Thái

- Kiến trúc desktop offline phù hợp với app này vì tần suất sử dụng thấp và dữ liệu có thể chuyển giữa các máy bằng file JSON sao lưu.
- Chức năng nhập/xuất dữ liệu trên desktop đã dùng hộp thoại file native của Windows thông qua Tauri.
- Bản desktop bỏ qua đăng nhập nội bộ, còn bản web vẫn giữ bảo vệ route như hiện tại.
- Build web/Vercel đã chạy được mà không cần wrapper Vite bên thứ ba cũ.
- Không còn chuỗi branding nền tảng cũ trong working tree, ngoài các thư mục ignored/generated.
- Tự động cập nhật đã trỏ về repo GitHub `buithiha353/TKB` qua `updates/latest.json`.
- Artifact build thành công trước khi thêm updater vẫn còn: `tkb-thcs.exe` khoảng 11.5 MB và installer NSIS khoảng 2.5 MB.

## Đã Xác Minh

```bash
npx tsc --noEmit
npm run build
npm run desktop:web:build
npm run lint
```

Tất cả đều pass sau khi đổi endpoint updater sang GitHub. Lint còn 6 warning Fast Refresh cũ trong các component UI, không có error.

## Blocker Hiện Tại

Sau khi thêm Tauri updater, lệnh `npm run desktop:build:win` đang bị chặn trên máy này:

```text
An Application Control policy has blocked this file. (os error 4551)
```

Đây là Windows Application Control chặn build script do Cargo sinh ra cho `tauri-plugin-updater`, không phải lỗi TypeScript của ứng dụng.

## Cần Làm Trước Khi Phát Hành

1. Build installer trên máy hoặc CI runner cho phép Cargo chạy build script.
2. Giữ kín `.tauri/tkb-thcs.key`; key này bắt buộc để ký các gói cập nhật sau này.
3. Tăng version release trong `src-tauri/tauri.conf.json` và `src-tauri/Cargo.toml`.
4. Upload installer và file `.sig` lên GitHub Releases của `buithiha353/TKB`.
5. Cập nhật `updates/latest.json` với version, URL asset và chữ ký thật.
6. Quyết định có giữ `security.csp` là `null` hay không; cấu hình này tiện khi phát triển, nhưng nên siết CSP trước khi phát hành rộng.

## Việc Tối Ưu Nên Làm Tiếp

- Bundle chính của desktop khoảng 626 kB sau minify; phần export Excel khoảng 937 kB nhưng đã được lazy-load.
- Có thể lazy-load thêm các màn ít dùng như thiết lập ban đầu/quản trị.
- Chỉ nên thay `exceljs` nếu kích thước tải hoặc tốc độ mở app thật sự trở thành vấn đề.
- `npm audit --omit=dev` đang báo 2 cảnh báo mức moderate qua chuỗi `exceljs -> uuid`; không nên chạy `npm audit fix --force` nếu chưa test kỹ vì npm đề xuất downgrade `exceljs` có thể gây breaking change.
