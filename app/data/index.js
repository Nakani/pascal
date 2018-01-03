import conversations from './raw/conversations'
import users from './raw/users'

class DataProvider {

  getUser(id = 1) {
  	console.log(users[0]);
    return users[0];
  }

  getConversation(userId = 1) {
    return conversations[0];
  }

}

export let data = new DataProvider();