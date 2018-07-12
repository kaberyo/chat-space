json.id @message.id
json.user_name current_user.name
json.body @message.body
json.img @message.img.url
json.created @message.created_at.to_s(:default)
