$(function () {
    var socket = io();
    $('form').submit(function(){
      socket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;
    });
    socket.on('chat message', function(msg){
      $('#messages').append($('<li>').text(msg));
      window.scrollTo(0, document.body.scrollHeight);
    });
  });



  function foo() {
    var user = $( "#myText" ).val();
    var pass = $( "#myText2" ).val();

          $.post("/test",{user: user,password: pass}, function(data){
            console.log(data);
            if(data==='yes')
              {
                alert("login success");
              }
          });
      
  }


  
 