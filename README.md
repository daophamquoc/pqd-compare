# PQD Drawing Comparison

So sánh 2 bản vẽ PDF ngay trên trình duyệt: tô màu nét thêm/bớt, đánh dấu mây sai khác, căn chỉnh bằng 3 điểm pin, vẽ mây và ghi chú, xuất PDF/PNG.

- Bản GitHub Pages: https://daophamquoc.github.io/pqd-compare/
- Bản Google Apps Script: có thêm nút lưu PDF vào Google Drive.

## Cấu trúc

| Tệp | Vai trò |
|---|---|
| `Index.html` | Toàn bộ ứng dụng (dùng chung cho cả hai bản) |
| `Mã.js` | Phần máy chủ Apps Script: trả trang, lưu PDF vào Drive |
| `appsscript.json` | Cấu hình Apps Script |
| `.github/workflows/pages.yml` | Đăng `Index.html` lên GitHub Pages với tên `index.html` |

## Cập nhật

```
clasp push        # Apps Script (sau đó tạo version và cập nhật deployment)
git push          # GitHub Pages tự đăng lại
```

Lưu ý: trong thẻ `<script>` của `Index.html` không được có hai dấu gạch chéo liên tiếp (kể cả trong URL). Apps Script xóa từ đó đến cuối dòng và làm hỏng trang.
