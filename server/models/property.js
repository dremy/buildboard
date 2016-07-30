// Dependencies.
var mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

// Defines the property schema.
var propertySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  uid: {
    type: ObjectId,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true
  },
  images: {
    type: Schema.Types.Mixed,
    default: ''
  },
  bedrooms: {
    type: String,
    required: true
  },
  bathrooms: {
    type: String,
    required: true
  },
  squarefootage: {
    type: String,
    required: true
  },
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

  next();
});

// Exports property schema for use elsewhere.
module.exports = mongoose.model('property', propertySchema);
