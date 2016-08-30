**Meteor** is an amazing full-stack framework which integrates MongoDB into it's DDP model. However, Meteor is closely integrated between it's different components, which makes it hard to modify its stack sometimes. Today, I'm going to demonstrate a simple trick to allow you to use your Meteor app with an external Mongo database, making it easier to integrate your Meteor app with other apps and data processing functions. This tutorial will even work with Meteor's regular DDP model, allowing for the continuation of the usual hot-reload upon data changes.

## Server-Side
First, we need to set up the database on the server side. If you are using Meteor 1.3, you should place this code inside the `/server` directory of your app. It will be automatically loaded into the server. 

```javascript
var database = new MongoInternals.RemoteCollectionDriver('mongodb://user:password@localhost:27017/myapp')
Posts = new Mongo.Collection("posts", { _driver: database })
Meteor.publish('posts', function() {
  return Posts.find()
})
```

We simply create a new `RemoteCollectionDriver` which is attached to our external Mongo database, then we create a new Mongo collection using that driver. Finally, we publish that collection to the Meteor app as usual.

## Client-Side
All we need to do on the client side is create a new collection, and subscribe to it, so that we can use it as normal.

```javascript
Posts = new Mongo.Collection("posts")
Meteor.subscribe('posts')
```

Now you're done, and you can use your external Mongo database in your Meteor app!