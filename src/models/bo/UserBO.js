import {Alert, Platform} from 'react-native';
import DbHelper from './DbHelper';
import {UserInfoEntity} from '../entity';
import commons from '../../ui/commons';
// import {AgentType} from '../AppConfigs';

class UserBO extends DbHelper {
  constructor() {
    super(UserInfoEntity);
  }

  clearAllUserInfo() {
    let userInfoData = this.getAll();
    if (userInfoData) {
      this.deleteRow(userInfoData);
      return true;
    }
    return false;
  }

  getUserInfo() {
    try {
      let userInfoData = commons.convertToArray(this.getAll());
      if (userInfoData) {
        return userInfoData[0];
      } else {
        return '';
      }
    } catch (error) {
      return '';
    }
  }
}

export function saveUserInfoData(dataInput) {
  let userBO = new UserBO();
  userBO.clearAllUserInfo();
  if (dataInput) {
    // dataInput.isAuthorized = dataInput.isAuthorized === 1;
    userBO.insertOrUpdate(dataInput, true);
    return true;
  }
  return false;
}

export function clearUserInfo() {
  return new UserBO().clearAllUserInfo();
}

export function getUserInfo() {
  let userInfo = new UserBO().getUserInfo();
  return userInfo;
}
// export async function getUserInfo() {
//   let userInfo = await new UserBO().getUserInfo();
//   console.log('userInfo in BO', userInfo);
//   return userInfo;
// }

// export function isBrocker(userInfo) {
//   return AgentType.Broker_Acount.type === userInfo?.agentType;
// }

// export function isOwner(userInfo) {
//   return AgentType.Owner_Acount.type === userInfo?.agentType;
// }

// export function getAgentName(user) {
//   if (AgentType.Broker_Acount.type === user?.agentType) {
//     return AgentType.Broker_Acount.name;
//   } else if (AgentType.Owner_Acount.type === user?.agentType) {
//     return AgentType.Owner_Acount.name;
//   }
//   return 'Khách';
// }
