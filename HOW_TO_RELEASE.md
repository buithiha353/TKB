# Hướng dẫn Phát hành Bản cập nhật (Auto-Updater)

Dự án này đã được cấu hình tính năng Tự động Cập nhật (Auto-Updater) thông qua GitHub Releases. Để đưa một phiên bản mới lên và cho phép ứng dụng tự động báo người dùng tải về, bạn làm theo các bước sau:

## 1. Nâng phiên bản (Bắt buộc)
Mở file `package.json` và `src-tauri/tauri.conf.json`, thay đổi số version.
Ví dụ: Từ `1.1.0` lên `1.1.1`

## 2. Build ứng dụng
Chạy lệnh biên dịch quen thuộc:
```bash
npm run desktop:build:win
```
Quá trình này sẽ tạo ra 2 file quan trọng trong thư mục `src-tauri/target/release/bundle/nsis/`:
- `TKB THCS_1.1.1_x64-setup.nsis.zip` (hoặc .exe tùy cấu hình)
- `TKB THCS_1.1.1_x64-setup.nsis.zip.sig` (Đây là file chữ ký bảo mật rất quan trọng)

> **Lưu ý:** Tauri yêu cầu bạn cung cấp biến môi trường `TAURI_PRIVATE_KEY` và `TAURI_KEY_PASSWORD` khi build trên máy tính khác. Vì máy bạn đã cài và sinh key từ đầu nên bước build này sẽ tự động sinh file `.sig` bằng private key lưu trên máy bạn. Không được làm mất private key này (`C:\Users\<Tên_Bạn>\.tauri\`).

## 3. Upload lên GitHub Releases
1. Truy cập vào kho lưu trữ GitHub của bạn: `https://github.com/buithiha353/TKB/releases`
2. Bấm nút **Draft a new release**.
3. Điền tag version mới (ví dụ `v1.1.1`), chọn nhánh `main`.
4. Viết vài dòng về cập nhật mới (Release notes).
5. **Kéo thả cả 2 file** (`.zip` và `.zip.sig`) vào khung Attach binaries.
6. Bấm **Publish release**.

## 4. Cập nhật file `updates/latest.json`
Ứng dụng đang đọc file `https://raw.githubusercontent.com/buithiha353/TKB/main/updates/latest.json` để kiểm tra bản mới. Do đó bạn cần tạo hoặc sửa file này trên thư mục gốc Github của bạn:
`TKB/updates/latest.json`

Nội dung file phải có dạng:
```json
{
  "version": "v1.1.1",
  "notes": "Mô tả ngắn gọn về các tính năng mới trong bản 1.1.1",
  "pub_date": "2026-07-06T00:00:00Z",
  "platforms": {
    "windows-x86_64": {
      "signature": "NỘI_DUNG_CỦA_FILE_.SIG_DÁN_VÀO_ĐÂY",
      "url": "https://github.com/buithiha353/TKB/releases/download/v1.1.1/TKB.THCS_1.1.1_x64-setup.nsis.zip"
    }
  }
}
```
**Lưu ý cực kỳ quan trọng:**
- Mở file `.sig` bằng Notepad, copy nội dung văn bản bên trong và dán vào trường `"signature"` ở trên.
- Sửa đường dẫn `"url"` thành link tải file `.zip` thật trong mục Release của bạn.

Sau khi bạn commit file `latest.json` này lên nhánh `main`, người dùng mở ứng dụng lên sẽ ngay lập tức nhận được thông báo "Có bản cập nhật mới!".
