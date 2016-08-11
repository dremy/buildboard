// Dependencies.
var mongoose = require('mongoose'),
      Schema = mongoose.Schema;

var relationshipSchema = new Schema({
  _user: { // Users in this relationship.
    type: Schema.Types.Mixed,
    required: true
  },
  _property: { // Property in the relationship.
    type: Schema.Types.ObjectId,
    ref: 'property', //Tie the knot.
    required: true
  },
  status: {
    interested: { // Are they interested in it?
      value: String,
      updatedAt: Date
    },
    own: { // Do they own it?
      value: String,
      updatedAt: Date
    },
    sold: { // Did they sell it?
      value: String,
      updatedAt: Date // When was this marked?
      // If so:
      // - for how much
      // - why
      // - how
      // - what was the condition
      // - who was involved
    }
  },
  _boards: [{ // Boards.
    type: Schema.Types.ObjectId,
    ref: 'board'
  }],
  _plans: [Schema.Types.Mixed], // Plans.
  tags: Schema.Types.Mixed, // Tags.
  createdAt: { // How long ago was relationship created.
    type: Date,
    default: Date.now
  },
  updatedAt: { // How recently was it updated.
    type: Date,
    default: Date.now
  }
});

// Sets the createdAt parameter equal to the current time. 
relationshipSchema.pre('save', function(next) {
  now = new Date();
  
  // Only on creation.
  if (!this.createdAt) {
    this.createdAt = now;    
  }

  // Always update the "updatedAt" property.
  this.updatedAt = now;

  next();
});

relationshipSchema.pre('findOneAndUpdate', function() {
  //NOTE THAT 'this' in the findOneAndUpdate hook refers to the query, not the document
  //https://github.com/Automattic/mongoose/issues/964
  this.findOneAndUpdate({}, { updatedAt: Date.now() });
});

// Exports property schema for use elsewhere.
module.exports = mongoose.model('relationship', relationshipSchema);
