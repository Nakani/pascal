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
  photo: require('../../assets/images/logoPascal.png'),
  postCount: 86,
  followersCount: 22102,
  followingCount: 536,
  images: images

}

];

export default users