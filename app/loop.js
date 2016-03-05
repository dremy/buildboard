var loopCorporation = {
  "loop": {
    "id": "14894", 
    "title": "drēmy Investments, LLC",
    "logo": "http://photos1.zillowstatic.com/p_d/ISp98yfgbxdzrt0000000000.jpg",
    "acquisition": {
      "date": null,
      "currency": "USD",
      "invested": 22000, //sum of each(investment.details.payments[0].amount);       
    },
    "exit": {
      "date": null,
      "amount": 20000,
    },
    "type": "corporation", //investment.loop.type
    "corporationType": "LLC",
    "totalShares": 1000,
    "users": {
      "singular": "member", //investment.loop.users.singular
      "plural": "members",
      "count": "4",
      "user": [
        {
          "uid": "2", //investment.loop.users.user[0].uid
          "share": .25,
          "payment": 5500 //Maybe change to payment ID
        },
        {
          "uid": "527",
          "share": .25,
          "payment": 5500
        },            
        {
          "uid": "793",
          "share": .25,           
          "payment": 5500
        },
        {
          "uid": "1416",
          "share": .25,
          "payment": 5500
        },
      ]
    }
  }
}

function (loop) {
    // Set User Count.
    for (var i = 0; i < this.membership.users.user.length; i++) {
      this.membership.users.count = i;
    };
    // If the Loop type is...
    switch (this.type) {
      case "casual":
        // Set the language to use for users.
        this.loop.users.singular = "person";
        this.loop.users.plural = "people";        
        break;
      case "corporation":
        var incorporationType = ["LLC", "S-Corps", "C-Corps"];
        this.loop.users.singular = "member";
        this.loop.users.plural = "members";
        break;
      case "partnership":
        var incorporationType = ["LP", "LLP", "GP"];
        this.loop.users.singular = "partner";
        this.loop.users.plural = "partners";
        break;
    }
  };  
}

/* ADD INVESTMENT - LOOP
loop
  .title = "Dremy Investments, LLC"
  .logo = "http://photos1.zillowstatic.com/p_d/ISp98yfgbxdzrt0000000000.jpg"
  .type = casual, sole propertiership, corporation, partnership
  .incorporationType = LLC, S-Corps, C-Corps, LP, LLP
  .user
    .singular = person, member, partner
    .plural = people, members, partners
    .count = 4
      .users[0]  
 */