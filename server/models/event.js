// Dependencies.
var mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

var eventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  _relationship: { //Tie events to a relationship & property
    type: ObjectId,
    ref: 'relationship',
    required: true
  },
  // References.
  _eventLabel: Schema.Types.Mixed,
  _files: [{ //Tie files to an event, pull from relatoinship.
    type: ObjectId,
    ref: 'file'
  }],
  _invitees: [{ //Tie files to an event, pull from relatoinship.
    type: ObjectId,
    ref: 'user'
  }],
  // Details.
  description: String,
  location: {
    address: String,
    city: String,
    state: String,
    zip: String,
    formatted: String,
    lat: Number,
    lng: Number,
  },
  url: String,
  // Dates.
  allDay: Boolean,
  start: {
    type: Date,
    required: true,
    default: Date.now
  },
  end: Date,
  alert: Date,
  // TO DO determine recurring structure
/*repeat: {
    type: String,
  },*/
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
eventSchema.pre('save', function(next) {
  now = new Date();
  
  // Only on creation.
  if (!this.createdAt) {
    this.createdAt = now;    
  }

  // Always update the "updatedAt" property.
  this.updatedAt = now;

  next();
});

eventSchema.pre('findOneAndUpdate', function() {
  //NOTE THAT 'this' in the findOneAndUpdate hook refers to the query, not the document
  //https://github.com/Automattic/mongoose/issues/964
  this.findOneAndUpdate({}, { updatedAt: Date.now() });
});

// Exports property schema for use elsewhere.
module.exports = mongoose.model('event', eventSchema);
