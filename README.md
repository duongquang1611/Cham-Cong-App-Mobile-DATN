# cham-cong-app-mobile
## App Mobile Chấm Công Đồ án tốt nghiệp

#### Link file APK app Chấm công: [Google Drive](https://drive.google.com/drive/folders/1Yw_kMLRfZw1ba6V9HSiEZXFMMXJWwcYI?usp=sharing)
Mã nguồn Mobile được đặt trong Folder “cham-cong-app-mobile”.

Link Source Github: [Source Github](https://github.com/duongquang1611/cham-cong-app-mobile).

Ứng dụng được xây dựng bằng React Native version 0.63.3.

IDE lập trình: Visual Studio Code.

Cấu hình môi trường theo React Native CLI trên trang chủ: [Environment Setup](https://reactnative.dev/docs/environment-setup)
#### Các bước chạy ứng dụng Mobile từ Mã nguồn:
1.	Mở Folder ```cham-cong-app-mobile``` bằng ```Visual Studio Code```
2.	Chạy lệnh import thư viện
    ```sh 
    $ npm install hoặc yarn 
    ```
3.	Chạy lệnh clean lại source code: 
    ```sh 
    $ npm run clean hoặc yarn clean
    ```
    (Khi đó hệ thống sẽ thực hiện các câu lệnh ```cd android && gradlew clean && cd ..```)
    
4.	Việc chạy Project trên thiết bị Android thật thì sẽ thực hiện các bước theo [Running On Device - Trang chủ](https://reactnative.dev/docs/running-on-device)
5.	Kết nối Android với Máy tính và chạy lệnh: 
	```sh 
	$ npx react-native run-android
	```
    (Có thể trong lúc chạy lệnh trên thì trên Android sẽ hiển thị thông báo ủy quyền tin cậy đối với máy tính => Chọn ```Đồng ý```)

#### Tài khoản Demo với từng nhóm người dùng
| Người dùng | Tài khoản | Mật khẩu | Lưu ý |
| ------ | ------ | ------ | ------ |
| Nhóm Nhân viên | staff_100 | 123456 | Người quản lý trực tiếp: manager_100 |
| Nhóm Quản lý (Trưởng phòng ban)  | manager_100 | 123456 | Người quản lý trực tiếp: director_100 |
| Nhóm Quản trị viên công ty (Quản lý nhân sự, Giám đốc) | admin_company_100 director_100 | 123456 | Người quản lý trực tiếp là người sẽ duyệt các yêu cầu đơn xin như: đi muộn, nghỉ, về sớm |
| Nhóm Quản trị viên hệ thống | admin | 123456 |
