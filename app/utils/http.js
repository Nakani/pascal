
let HttpService = {

    apiURL: 'http://pascal-app.herokuapp.com/api',

    extractGetParams: function (params, token){
        let extractedParams = "?";
        for(let i=0; i<params.length; i++){
            if(i!==0){
                extractedParams += "&"
            }
            extractedParams += params[i].key+"="+params[i].value;
        }
        return extractedParams;
    },

    get: function(endpoint, callbackSuccess, callbackError){
        try {
            let url = this.apiURL + endpoint;
            // let headers = {};
            // headers.Authorization = "Bearer " + token;
            // fetch('/users.json')  
            //   .then(function(response) {
            //     return response.json()
            //   })



            fetch(url)
            .then((responseJson) => {
                console.log(responseJson);
                callbackSuccess(responseJson);
            }).catch((error) => {
                console.log(error);
                throw error;
            });
        }catch(e){
            if (callbackError && typeof(callbackError) === "function"){
                callbackError(e);
            }
        }
    },

    post: function (endpoint, token, params = {}, callbackSuccess, callbackError) {
        try {
            let url = this.apiURL + endpoint;
            let headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',};
            if(token !== null) {
                headers.Authorization = "Bearer " + token;
            }
            let body = JSON.stringify(params);
            fetch(url, {
                method: 'POST',
                headers: headers,
                body: body
            }).then((response) => response.json()).then((responseJson) => {
                if (callbackSuccess && typeof(callbackSuccess) === "function"){
                    console.log(responseJson, params, headers);
                    callbackSuccess(responseJson);
                }
            }).catch((error) => {
                console.log(url, headers, body);
                throw error;
            });
        }catch(e){
            if (callbackError && typeof(callbackError) === "function"){
                callbackError(e);
            }
        }
    },

    chatbot: function(){
        fetch('http://pascal-app.herokuapp.com/api/chatbot')  
          .then(function(response) {
            return response.json()
          })
    }

};

export default HttpService;