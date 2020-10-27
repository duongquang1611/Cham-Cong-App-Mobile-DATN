export default class UserDTO {
  parserData = (userInfoReturn) => {
    if (userInfoReturn && userInfoReturn.length > 0) {
      //   let userInfoData = [];
      //   userInfoReturn.forEach((itemData) => {
      //     let itemUserInfoData = new UserDTO();
      //     itemUserInfoData.id = itemData.id;
      //     itemUserInfoData.login = itemData.login;
      //     itemUserInfoData.name = itemData.name;
      //     itemUserInfoData.email = itemData.email;
      //     itemUserInfoData.imgPath = itemData.imgPath;
      //     itemUserInfoData.activated = itemData.activated;
      //     itemUserInfoData.langKey = itemData.langKey;
      //     itemUserInfoData.phoneNumber = itemData.phoneNumber;
      //     itemUserInfoData.address = itemData.address;
      //     itemUserInfoData.dateOfBirth = itemData.dateOfBirth;
      //     itemUserInfoData.createdBy = itemData.createdBy;
      //     itemUserInfoData.createdDate = itemData.createdDate;
      //     itemUserInfoData.lastModifiedBy = itemData.lastModifiedBy;
      //     itemUserInfoData.lastModifiedDate = itemData.lastModifiedDate;
      //     itemUserInfoData.authorities = itemData.authorities;
      //     itemUserInfoData.status = itemData.status;
      //     itemUserInfoData.agentId = itemData.agentId;
      //     itemUserInfoData.isAuthorized = itemData.isAuthorized;

      // });
      return userInfoReturn;
    }
    return null;
  };
}
