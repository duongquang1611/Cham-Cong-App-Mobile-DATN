let msgWarning = {
  network:
    'Bạn cần kết nối tới kết nối mạng hợp lệ tại công ty để có thể Chấm công. Nếu bạn có bất cứ thắc mắc nào vui lòng liên hệ quản trị viên để biết thêm chi tiết.',
  faceNotCorrect:
    'Khuôn mặt không trùng khớp. Vui lòng cập nhật thêm dữ liệu khuôn mặt để cải thiện kết quả.',
  faceInvalid: 'Khuôn mặt không hợp lệ. Vui lòng thử lại.',
  faceNotFound: (name) =>
    `Người dùng ${name} chưa có dữ liệu khuôn mặt. Vui lòng liên hệ quản trị viên để biết thêm chi tiết.`,
};
export default msgWarning;
