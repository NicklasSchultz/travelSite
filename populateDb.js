db.trips.drop()
db.createCollection( "trips",
   {
      validator: { $or:
         [
         	{ id: { $type: "string" } },
            { name: { $type: "string" } },
            { images: { $type: "string" } },
            { texts: { $type: "string" } }
         ]
      }
   }
);
db.trips.insert({id: "dominikanska", name:"Dominikanska", images:"data/images/dominikanska/", texts: "data/texts/dominikanska/contentPage.html"});
db.trips.insert({id: "thailand", name:"Thailand", images:"data/images/thailand/", texts: "data/texts/thailand/contentPage.html"});
db.trips.insert({id: "indonesien", name:"Indonesien", images:"data/images/indonesien/", texts: "data/texts/indonesien/contentPage.html"});
db.trips.insert({id: "badgastein", name:"Bad Gastein", images:"data/images/badgastein/", texts: "data/texts/badgastein/contentPage.html"});

