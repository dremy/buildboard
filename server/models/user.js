// Dependencies.
var mongoose = require('mongoose'),
      Schema = mongoose.Schema;

// Schema
var LocationSchema = new Schema({
  address: String,
  city: String,
  state: String,
  zip: String,
  lat: Number,
  lng: Number,
});

var userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  mail: {
    type: String,
    required: true
  },
  firstName: String,
  lastName: String,
  roles: Schema.Types.Mixed,
  picture: {
    type: Schema.Types.Mixed,
    default: '/images/avatar_silhouette.png'
  },
  createdAt: Date,
  updatedAt: Date,
  location: LocationSchema,
  markets: [LocationSchema]
});

// Sets the createdAt parameter equal to the current time. 
userSchema.pre('save', function(next) {
  now = new Date();
  
  // Only on creation.
  if (!this.createdAt) {
    this.createdAt = now;    
  }
  
  // Always update the "updatedAt" property.
  this.updatedAt = now;

  next();
});

userSchema.pre('findOneAndUpdate', function() {
  //NOTE THAT 'this' in the findOneAndUpdate hook refers to the query, not the document
  //https://github.com/Automattic/mongoose/issues/964
  this.findOneAndUpdate({}, { updatedAt: Date.now() });
});

// Exports property schema for use elsewhere.
module.exports = mongoose.model('user', userSchema);
