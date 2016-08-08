// Dependencies.
var mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

var propertySchema = new Schema({
  title: {
    type: String,
    unique: true
  },
  uid: {
    type: String,
    required: true
  },
  location: {
    address: String,
    city: String,
    state: String,
    zip: String,
    formatted: String,
    lat: Number,
    lng: Number,
  },
  images: {
    type: Schema.Types.Mixed,
    default: [
      {
        0:'/images/default-avatar-gradient-sm.jpg'
      }
    ]
  },
  bedrooms: String,
  bathrooms: String,
  FIPScounty: String,
  finishedSqFt: String,
  lotSizeSqFt: String,
  yearBuilt: String,
  zpid: String,
  useCode: String,
  numFloors: String,
  parkingType: String,
  lastSold: {
    date: String,
    price: String
  },
  taxAssessment: {
    value: String,
    year: String
  },
  zestimate: {
    lastUpdated: String,
    amount: String,
    valuationRange: {
      high: String,
      low: String
    },
    valuationChange: {
      duration: String,
      value: String
    }
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
