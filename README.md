# DB設計

## users table

|Column|Type|Option|
|------|----|------|
|name|string|index:true, null:false, unique:true|
|email|string|null:false, unique:true|
|password|string|null:false|

### Association
- has_many:groups, through: members
- has_many:messages
- has_many:members

## groups table
|Column|Type|Option|
|------|----|------|
|name|string|null:false|

### Association
- has_many:users, through: members
- has_many:members
- has_many:mesages

## messages table
|Column|Type|Option|
|------|----|------|
|user_id|integer|null:false|
|group_id|integer|null:false|
|body|text||
|img|string||

### Association
- belongs_to:members

## members table

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
