const Property = require('./models/property');
const User = require('./models/user');

class MockDb {

    constructor() {
        this.properties = [{
            title: "Nice view on ocean",
            city: "San Francisco",
            street: "Main street",
            category: "condo",
            image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
            floor: "0",
            depNo: "12",
            code: "c012",
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
            floor: "2",
            depNo: "8",
            code: "a28",
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
            floor: "",
            depNo: "",
            code: "h",
            bedrooms: 5,
            bathrooms: 2,
            shared: true,
            description: "Very nice apartment in center of the city.",
            dailyRate: 23,
            monthlyRate: 230
        },
        {
            title: "Nice office downtown.",
            city: "Athens",
            street: "Mesogeion 304",
            category: "office",
            image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
            floor: "2",
            depNo: "9",
            code: "o28",
            bedrooms: 5,
            bathrooms: 2,
            shared: true,
            description: "Very nice apartment in center of the city.",
            dailyRate: 230,
            monthlyRate: 2300
        },
        {
            title: "Nice apartment in chios harbor.",
            city: "Chios",
            street: "Livanou 27",
            category: "apartment",
            image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
            floor: "3",
            depNo: "1",
            code: "a31",
            bedrooms: 1,
            bathrooms: 1,
            shared: true,
            description: "Very nice apartment in center of the city.",
            dailyRate: 20,
            monthlyRate: 200
        }],
            this.users = [{
                username: 'Test user',
                email: 'test@gmail.com',
                password: 'testtest'
            }]
    }

    pushDataToDb() {
        const user = new User(this.users[0]);

        this.properties.forEach((property) => {
            const newProperty = new Property(property);
            newProperty.user = user;
            user.properties.push(newProperty);
            newProperty.save();
        });
        user.save();
    }

    async cleanDb() {
        await User.remove({});
        await Property.remove({});
    }

    async seedDb() {
        await this.cleanDb();
        await this.pushDataToDb();
    }
}

module.exports = MockDb;