db.trips.drop()
db.createCollection( "trips",
   {
      validator: { $or:
         [
            { name: { $type: "string" } },
            { images: { $type: "string" } },
            { texts: { $type: "string" } }
         ]
      }
   }
);
db.trips.insert({name:"dominikanska", images:"data/images/dominikanska/", texts: "data/texts/dominikanska"});
db.trips.insert({name:"thailand", images:"data/images/thailand/", texts: "data/texts/thailand"});
db.trips.insert({name:"indonesien", images:"data/images/indonesien/", texts: "data/texts/indonesien"});
db.trips.insert({name:"badgastein", images:"data/images/badgastein/", texts: "data/texts/badgastein"});

