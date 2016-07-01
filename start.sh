sudo mongod --fork --logpath /var/log/mongod.log --dbpath data/db
mongo localhost:27017/travels --quiet populateDb.js
nodemon server.js
