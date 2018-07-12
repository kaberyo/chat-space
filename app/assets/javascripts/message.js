$(function(){
  function buildMessage(message){
    var body = message.body ? `<div class="list">${message.body}</div>` : "";
    var img = message.img ? `<img class="lower-message__image" src="${message.img}">` : "";
    var html = `<div class="message">
                  <ul class="user">
                    <li class="list user__name">
                      ${message.user_name}
                    </li>
                    <li class="list user__date">
                      ${message.created}
                    </li>
                  </ul>
                  <p class="text">
                    ${body}
                  </p>
                  ${img}
                </div>`
    $('.content').append(html)
  }
  function scrollBottom(target){
    target.animate({scrollTop: target[0].scrollHeight},{duration:1000});
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
      buildMessage(data);
      scrollBottom($('.content'))
      $('#new_message')[0].reset();
      $('.form__submit').prop('disabled', false);
    })
    .fail(function(){
      alert('送信できてないで');
      $('.form__submit').prop('disabled', false);
    })
  })
})
