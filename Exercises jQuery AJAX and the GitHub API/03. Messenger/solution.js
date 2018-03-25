function attachEvents() {
    $('#refresh').click(attachRefresh)
    $('#submit').click(attachSend)
    function attachSend() {
        let messageJson = {
            "author": $('#author').val(),
            "content": $('#content').val(),
            "timestamp": Date.now()
        }
        let sendMessageRequest =  {
            url:'https://messanger-13246.firebaseio.com/messanger/.json',
            method: 'POST',
            data: JSON.stringify(messageJson),
            success: attachRefresh
        }
        $.ajax(sendMessageRequest)
    }
    function attachRefresh() {
        $.get('https://messanger-13246.firebaseio.com/messanger/.json')
            .then(displayMessages)
    }
    function displayMessages(messages) {
        let output = $('#messages')
        let messagesStr= ''
        for(let key in messages) {
            messagesStr += `${messages[key]["author"]}: ${messages[key]["content"]}\n`
        }
        output.text(messagesStr)
    }
}