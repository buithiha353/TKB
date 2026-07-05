# Manifest Cập Nhật Desktop

Thư mục này chứa manifest public để Tauri updater kiểm tra bản cập nhật desktop.

Endpoint đang dùng trong `src-tauri/tauri.conf.json`:

```text
https://cdn.jsdelivr.net/gh/buithiha353/TKB@main/updates/latest.json
```

## Khi Có Bản Desktop Mới

1. Tăng version trong `src-tauri/tauri.conf.json`.
2. Tăng version trong `src-tauri/Cargo.toml`.
3. Build bản desktop có ký update.
4. Upload installer và file `.sig` lên GitHub Releases.
5. Sửa `updates/latest.json`:
   - `version`: version mới, ví dụ `0.2.0`
   - `notes`: ghi chú phát hành
   - `pub_date`: thời điểm phát hành theo ISO
   - `platforms.windows-x86_64.signature`: nội dung file `.sig`
   - `platforms.windows-x86_64.url`: URL tải installer trong GitHub Release

Không commit private key trong `.tauri/`.
