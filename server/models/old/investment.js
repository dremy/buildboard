var investment = {
  "investment": {
    "title": "914 S Warsaw St Seattle, WA", // = investment.property.address
    "iid": "213141", //Investment ID = NID
    "type": "property",
    "tags": "yr1, burien, ",
    "status": "Closed", //Interested, Active, Pending, Closed, Owned, Project In Progress, Listed      
    "loops": [
      {
        "lid": "25814", //Loop ID = NID
        "title": "Dremy Investments, LLC" //investment.details.loop[0].title
        "logo": "http://photos1.zillowstatic.com/p_d/ISp98yfgbxdzrt0000000000.jpg"
      }
    ],
    "acquisition": {
      "type": "Construction Loan",
      "principal": 125000, //investment.details.financing.principal
      "currency": "USD",
      "invested": 12000, //sum of each(investment.details.payments[0].amount);
      "down": 0.16,
      "earnestMoneyDown": 5000,
      "terms": 360, //investment.details.financing.terms in months
      "targetCloseDate": "1990-11-14T00:39:54.081Z",       
    },
    "exit": {
      "targetExitDate": "1990-11-14T00:39:54.081Z",
      "listPrice": 320000,
      "listDate": "1990-11-14T00:39:54.081Z",
      "date": null,
      "amount": 329000,
      "targetValue": 32000,
      "targetTakeHome": 45000,
      "closingPercent": 0.06,
      "closingCosts": null,
      "takeHome": 83000,
    },
    "payments": [
      {
        "pid": "12058",
        "type": "Earnest Money Down",
        "amount": 5000, //investment.details.payments[0].amount
        "currency": "USD",
        "date": "1990-11-14T00:39:54.081Z"          
      },
      {
        "pid": "89473",
        "type": "Down",
        "amount": 7000,
        "currency": "USD",
        "date": "1990-11-14T00:39:54.081Z"
      }
    ],
    "documents": {
      "count": "4",
      "documentId": [
        "391231",
        "13231",
        "42342",
        "76824"
      ]
    },
    "lot": { //investment.lotDetails.lotAreaSqFt
      "AreaSqFt": "1088",
      "Width": "25",
      "Depth": "40"
    },
    "property": {
      "zpid": 48822168,
      "address": { 
        "street": "914 S Warsaw St", //investment.propertyDetails.address.street
        "zipcode": "98108",
        "city": "Seattle",
        "state": "WA",
        "latitude": "47.544309",
        "longitude": "-122.320457"
      },
      "photos": {
        "count": "5",
        "url": [
          "http://photos3.zillowstatic.com/p_d/ISxfaaymf5mwrt0000000000.jpg", //investment.propertyDetails.photos.url[0]
          "http://photos1.zillowstatic.com/p_d/ISp98yfgbxdzrt0000000000.jpg",
          "http://photos3.zillowstatic.com/p_d/ISxbb4jqxtzizt0000000000.jpg",
          "http://photos2.zillowstatic.com/p_d/ISh36mx97p52st0000000000.jpg",
          "http://photos1.zillowstatic.com/p_d/ISp59s0ktlrlzt0000000000.jpg"
        ]
      },
      "use": "Single Family", //investment.propertyDetails.use
      "units": {
        "count": "2",
        "ids": [
          "23142",
          "65786"
        ],
      },
      "areaSqFt": "1188",
      "bedrooms": "2",
      "bathrooms": "1.0",
      "garage": "0",
      "finishedSqFt": "1188",
      "foundation": "Slab",
      "roof": "tile",
      "cooling": "N/A",
      "heating": "Radiant Heat",
      "view": "Water",
      "yearBuilt": "1902",
      "numFloors": "1",
      "parkingType": "Off-street",
      "recentListDate": "1990-11-14T00:39:54.081Z",
       "taxes": {
        "taxAssessmentYear": "2014",
        "taxAssessmentAmount": "128000.0"
      }
    }
  }
}

/* ADD INVESTMENT - PROPERTY
investment
  .type = [property], note, loop



  
 */

/* ADD INVESTMENT - NOTE
investment
  .type = property, [note], loop



  
 */

// Conditional logic to set in the event
function (investment) {
  switch (this.type) {
    // If its a property.
    case "property":
      break;
    // If its a note.
    case "note":
      break;
    }
}

/* LIST INVESTMENT
investment
  .title
  .iid
  .type
  .tags
  .status
  .targetValue
  .acquisition // Proposal
    .invested
    // If status = Pending
    .targetClose | countdown in days {"option for weeks, months"}
  .exit  
    // If status = Owned, Project In Progess, Closed
    .targetExit | countdown in days {"option for weeks, months"}
    // If status = Listed
    .targetValue
    .targetTakeHome
    .listPrice
    .listDate // In days since
    // If status = Sold
    .exitAmount
    .takeHome
    .targetTakeHome 
  .notifications
    .count
  .documents //Paper Icon
    .count
  .property
    .address
      .street
      .city
      .state
      zipcode
    .photo
      .count
      .url[0]
    .areaSqFt
    .units.count
  .lot
    .areaSqFt
*/

/* Activity Streams

Actions - Investment
  Post
  - status
  - document
  - image

  Updated
  - tags
  - investmentStatus
  - {model}

  Added
  - To loop

Actions - Loop
  Added
  - Invesment

  Updated
  - Title
  - Type
  - Logo
  - {model}

  Invited
  - member, partner, person

  Accepted
  - member, partner, person


 */

var activityPost = {
  "activityPost": {
    "type": "post"
    "uid":"24",
    "message": "All demo was completed today. Things are looking great."
    "photos": [ // New request
    {
      "phid": "1535415184" // activityPost.photos[0].phid
    },
    {
      "phid": "6165087384"
    }
    ]
  }
}

var photo = {
  "photo": {
    "phid": "6165087384",
    "uid": "5127845",
    "postDate": "1990-11-14T00:39:54.081Z",
    "url": "http://photos1.zillowstatic.com/p_d/ISp98yfgbxdzrt0000000000.jpg",
    "title": "914 S Warsaw St Rear View",
    "caption": "914 S Warsaw St Rear View",
    "alt": "914 S Warsaw St Rear View"
  }
}
