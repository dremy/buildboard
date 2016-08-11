// Dependencies.
var mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

var fileSchema = new Schema({
  filename: {
    type: String,
    required: true
  },
  client: String,
  description: String,
  isWriteable: Boolean,
  mimetype: String,
  size: Number,
  url: {
    type: String,
    required: true
  },
  _tags: [ObjectId],
  _board: {
    type: ObjectId,
    ref: 'board'
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
fileSchema.pre('save', function(next) {
  now = new Date();
  
  // Only on creation.
  if (!this.createdAt) {
    this.createdAt = now;    
  }

  // Always update the "updatedAt" property.
  this.updatedAt = now;

  next();
});

fileSchema.pre('findOneAndUpdate', function() {
  //NOTE THAT 'this' in the findOneAndUpdate hook refers to the query, not the document
  //https://github.com/Automattic/mongoose/issues/964
  this.findOneAndUpdate({}, { updatedAt: Date.now() });
});

// Exports property schema for use elsewhere.
module.exports = mongoose.model('file', fileSchema);
