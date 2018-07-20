$(function(){
  function buildHTML(message){
    var img = message.img ? `<img class="lower-message__image" src="${message.img}">` : "";
    var html = `<div class="message" data-message-id="${message.id}">
                  <ul class="user">
                    <li class="list user__name">
                      ${message.user_name}
                    </li>
                    <li class="list user__date">
                      ${message.created}
                    </li>
                  </ul>
                  <p class="text">
                    ${message.body}
                  </p>
                  ${img}
                </div>`
    return html
  }
  function scrollBottom(target){
    $('.content').animate({scrollTop:$('.content')[0].scrollHeight},{duration:1000});
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      $('.content').append(buildHTML(data));
      scrollBottom();
      $('#new_message')[0].reset();
      $('.form__submit').prop('disabled', false);
    })
    .fail(function(){
      alert('メッセージを入力して下さい');
      $('.form__submit').prop('disabled', false);
    })
  })
  var interval = setInterval(function(){
    if(window.location.pathname.match(/\/groups\/\d+\/messages/)){
        $.ajax({
            url: location.pathname,
            type: "GET",
            dataType: 'json',
            processData: false,
            contentType: false
        })
        .done(function(data){
          var id = $('.message').last().data('messageId');
          var insertHTML = '';
          data.messages.forEach(function(message){
            if(message.id > id ){
              insertHTML += buildHTML(message);
              scrollBottom();
            }
          });
          $('.content').append(insertHTML);
        })
        .fail(function(data){
          alert('自動更新に失敗しました')
        });
      }
    else{
      clearInterval(interval);
    }
  },1000 );
});
