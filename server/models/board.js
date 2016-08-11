// Dependencies.
var mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

var boardSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  _tags: [Schema.Types.Mixed],
  _relationship: {
    type: ObjectId,
    ref: 'relationship',
    required: true
  },
  _files: [{
    type: ObjectId,
    ref: 'file'
  }],
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
boardSchema.pre('save', function(next) {
  now = new Date();
  
  // Only on creation.
  if (!this.createdAt) {
    this.createdAt = now;    
  }

  // Always update the "updatedAt" property.
  this.updatedAt = now;

  next();
});

boardSchema.pre('findOneAndUpdate', function() {
  //NOTE THAT 'this' in the findOneAndUpdate hook refers to the query, not the document
  //https://github.com/Automattic/mongoose/issues/964
  this.findOneAndUpdate({}, { updatedAt: Date.now() });
});

// Exports property schema for use elsewhere.
module.exports = mongoose.model('board', boardSchema);
