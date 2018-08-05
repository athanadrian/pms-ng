const Property = require('./models/property');

class MockDb {

    constructor() {
        this.properties = [{
            title: "Nice view on ocean",
            city: "San Francisco",
            street: "Main street",
            category: "condo",
            image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
            bedrooms: 4,
            bathrooms: 2,
            shared: true,
            description: "Very nice apartment in center of the city.",
            dailyRate: 43,
            monthlyRate: 430
        },
        {
            title: "Modern apartment in center",
            city: "New York",
            street: "Time Square",
            category: "apartment",
            image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
            bedrooms: 1,
            bathrooms: 1,
            shared: false,
            description: "Very nice apartment in center of the city.",
            dailyRate: 11,
            monthlyRate: 110
        },
        {
            title: "Old house in nature",
            city: "Spisska Nova Ves",
            street: "Banicka 1",
            category: "house",
            image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
            bedrooms: 5,
            bathrooms: 2,
            shared: true,
            description: "Very nice apartment in center of the city.",
            dailyRate: 23,
            monthlyRate: 230
        }]
    }

    pushPropertiesToDb() {
        this.properties.forEach((property) => {
            const newProperty = new Property(property);
            newProperty.save();
        });
    }

   async cleanDb() {
       await Property.remove({});
    }

    seedDb() {
        this.cleanDb();
        this.pushPropertiesToDb();
    }
}

module.exports = MockDb;