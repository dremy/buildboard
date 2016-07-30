// Dependencies.
var mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

// Defines the property schema.
var LocationSchema = new Schema({
  address: String,
  city: String,
  state: String,
  zip: String,
  lat: Number,
  lng: Number,
});

var propertySchema = new Schema({
  title: {
    type: String
  },
  uid: {
    type: Number,
    required: true
  },
  location: LocationSchema,
  images: Schema.Types.Mixed,
  bedrooms: String,
  bathrooms: String,
  squarefootage: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Sets the createdAt parameter equal to the current time. 
propertySchema.pre('save', function(next) {
  now = new Date();
  
  // Only on creation.
  if (!this.createdAt) {
    this.createdAt = now;    
  }

  // Always update the "updatedAt" property.
  this.updatedAt = now;

  if (!this.title) {
    this.title = this.location.address + ' ';
    this.title += this.location.city + ', ';
    this.title += this.location.state + ' ';
    this.title += this.location.zip;     
  }

  next();
});

propertySchema.pre('findOneAndUpdate', function() {
  //NOTE THAT 'this' in the findOneAndUpdate hook refers to the query, not the document
  //https://github.com/Automattic/mongoose/issues/964
  this.findOneAndUpdate({}, { updatedAt: Date.now() });
});

// Exports property schema for use elsewhere.
module.exports = mongoose.model('property', propertySchema);
