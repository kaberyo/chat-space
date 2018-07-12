$(function(){
  function buildHTML(message){
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
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    console.log(this)
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
      var html = buildHTML(data);
      $('.content').append(html)
      $('.textbox').val('')
      $('#new_message')[0].reset();
      $('.form__submit').prop('disabled', false);
      })
    .fail(function(){
      alert('送信できてないで');
      $('.form__submit').prop('disabled', false);
    })
  })
})
