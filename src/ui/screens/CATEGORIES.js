export const SORT_COME_LEAVE = [
  {id: 0, name: 'Thời gian xin mới nhất', type: 'updatedAt', value: -1},
  {id: 1, name: 'Thời gian xin cũ nhất', type: 'updatedAt', value: 1},
  {id: 2, name: 'Ngày công mới nhất', type: 'dayWork', value: -1},
  {id: 1, name: 'Ngày công cũ nhất', type: 'dayWork', value: 1},
];

export const SORT_DAY_OFF = [
  {id: 0, name: 'Thời gian xin mới nhất', type: 'updatedAt', value: -1},
  {id: 1, name: 'Thời gian xin cũ nhất', type: 'updatedAt', value: 1},
];
const CATEGORIES = {
  SORT_COME_LEAVE,
  SORT_DAY_OFF,
};

export default CATEGORIES;
