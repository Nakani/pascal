let images = [
  require('../img/Image 10.png'),
  require('../img/Image 11.png'),
  require('../img/Image 2.png'),
  require('../img/Image 3.png'),
  require('../img/Image 4.png'),
  require('../img/Image 1.png'),
  require('../img/Image 12.png'),
  require('../img/Image 8.png'),
  require('../img/Image 6.png'),
  require('../img/Image 9.png'),
  require('../img/Image 5.png'),
  require('../img/Image 7.png'),
];

const users = [{
  id: 1,
  firstName: 'Helen',
  lastName: 'Gilbert',
  phone: '+1 415 670 90 34',
  country: 'Belarus',
  email: 'h.gilbert@akveo.com',
  password: '123456',
  newPassword: '12345678',
  confirmPassword: '12345678',
  photo: require('../img/avatars/Image 9.png'),
  postCount: 86,
  followersCount: 22102,
  followingCount: 536,
  images: images

},
{
  id: 2,
  firstName: 'Emilie',
  lastName: 'McDiarmid',
  email: 'emcdiarmid1@yale.edu',
  country: 'China',
  password: 'YyKgJ8A3b4b',
  newPassword: 'DpCRPYW7Fgy',
  confirmPassword: 'DpCRPYW7Fgy',
  postCount: 95,
  phone: '86-(261)670-4133',
  followingCount: 975,
  followersCount: 1703,
  images: images,
  photo: require('../img/avatars/Image 1.png'),
}
];

export default users