
import conversations from './raw/conversations'

class DataProvider {

  getConversation(userId = 1) {
    console.log(); 
    return conversations[0];
  }

}

export let data = new DataProvider();