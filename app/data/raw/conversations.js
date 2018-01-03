  import HttpService from "../../utils/http";

  _chat = async(newChatBot) => {
    const repoCall = await fetch(`http://pascal-app.herokuapp.com/api/chatbot`);
    const response = await repoCall.json();
    console.log('response');
}

const Conversations = [
  {
    withUserId: 1,
    messages: [
      {
        id: 0,
        type: 'in',
        from: {
            picture: require('../../assets/images/logoPascal.png'),
            name: 'Pascal'
        },
        time: -300,
        text: 'Oi, O que posso ajudar?',
        media: {
          type: 'photo',
          url: require('../../assets/images/logoPascal.png'),
          width: 500,
          height: 281
        }
      }
      ]
  }
];




export default Conversations;