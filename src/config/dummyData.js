import faker from 'faker';

class User {
  constructor() {
    this.email = faker.internet.email();
    this.password = faker.internet.password();
    this.username = faker.internet.userName();
    this.role = [ 'rentee', 'renter' ][Math.floor(Math.random() * 2)];
    this.avatar = faker.internet.avatar();
  }
}

const users = [
  {
    username: 'maman',
    password: 'password',
    email: 'maman@mail.co',
    role: 'renter',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/adobi/128.jpg',
    firstName: 'maman',
    isVerified: true,
    otp: 1234,
    lastName: 'suparman'
  },
  {
    username: 'adinda',
    password: 'password',
    email: 'adinda@mail.co',
    role: 'rentee',
    isVerified: true,
    avatar: 'https://source.unsplash.com/128x128/?woman',
    firstName: 'diana',
    otp: 4321,
    lastName: 'netanyahu'
  },
  {
    username: 'nikochan',
    password: 'password',
    email: 'niko@mail.co',
    role: 'rentee',
    isVerified: false,
    avatar: 'https://source.unsplash.com/128x128/?man',
    firstName: 'nikolas',
    otp: 4321,
    lastName: 'saputra'
  }
];

// for (let i = 0; i < 10; i++) {
//   users.push(new User());
// }

class Venue {
  constructor() {
    this.name = faker.company.companyName();
    this.address = faker.address.streetAddress();
    this.location = {
      type: 'Point',
      coordinates: [ faker.address.longitude(), faker.address.latitude() ]
    };
    this.imageUrl = `https://picsum.photos/seed/${Math.random()}/320/160`;
    this.userId = [ 9, 10 ][Math.floor(Math.random() * 2)];
    // TODO: this is cringe
    this.rating = Math.round(faker.random.number({ min: 0, max: 5, precision: 0.1 }) * 100) / 100;
  }
}

export const venues = [
  {
    name: 'Kamaya Bali',
    city: 'bali',
    address: 'Jl. Pantai Suluban - Uluwatu, Bali - Indonesia 80361',
    location: {
      type: 'Point',
      coordinates: [ -8.816237, 115.088825 ]
    },
    imageUrl: `https://london.bridestory.com/images/c_fill,dpr_2.0,f_auto,fl_progressive,pg_1,q_80,w_680/v1/assets/kamaya-4-ry0xpiuj8/kamaya-bali_kamaya-bali-weddings1590373599_1.jpg`,
    userId: 1
  },
  {
    name: 'Sheraton Grand Jakarta Gandaria City Hotel',
    address: 'Jl. Sultan Iskandar Muda, Kebayoran Jakarta, Jakarta 12240 Indonesia 12240',
    city: 'jakarta',
    location: {
      type: 'Point',
      coordinates: [ -6.244197, 106.782606 ]
    },
    imageUrl: `https://london.bridestory.com/images/c_fill,dpr_2.0,f_auto,fl_progressive,pg_1,q_80,w_680/v1/assets/WEDDING_4_yayotg/sheraton-grand-jakarta-gandaria-city-hotel_sheraton-grand-gandaria-city-grand-ballroom_1.jpg`,
    userId: 1
  },
  {
    name: 'The papandayan',
    address: 'The Papandayan Hotel - Jl. Gatot Subroto 83, Bandung. Jawa Barat - Indonesia 40262',
    city: 'bandung',
    location: {
      type: 'Point',
      coordinates: [ -6.9230042, 107.6237907 ]
    },
    imageUrl: `https://london.bridestory.com/images/c_fill,dpr_2.0,f_auto,fl_progressive,pg_1,q_80,w_680/v1/assets/chappel-BkRQNkgMU/papandayan_hb-grill-garden_2.jpg`,
    userId: 1
  }
];
// for (let i = 0; i < 5; i++) {
//   venues.push(new Venue());
// }

// class Package {
//   constructor() {
//     this.name = faker.lorem.words(5);
//     this.slotTimeStarts = '13:00';
//     this.slotTimeEnds = '18:00';
//     this.pricePerPax = faker.random.number({ min: 500000, max: 1350000 });
//     this.description = faker.lorem.sentence(5);
//     this.venueId = [ 1, 2 ][Math.floor(Math.random() * 2)];
//   }
// }

export const packages = [
  {
    name: 'Morning Bliss',
    slotTimeStarts: '07:00',
    slotTimeEnds: '12:00',
    pricePerPax: 200000,
    description: `### Overview
For min 30 guests - Time Slot: 07 am - 12pm
at Kamayajaya (Upper Chapel) or Kamaratih (Lower Chapel)

### Package Include: 
* Blessing ceremony at Kamajaya Chapel (Upper Chapel) or Kamaratih Chapel (Lower Chapel with water stage).
* 5 hours exclusive usage of the entire Kamaya’s Property (7am – 12noon).
  `,
    venueId: 1
  },
  {
    name: 'Stunning Sunset Package',
    slotTimeStarts: '14:00',
    slotTimeEnds: '24:00',
    pricePerPax: 300000,
    description: `### overview
Minimum Spending Applied
Time Slot: 2 pm - 12 midnight

### Package Include:
* Blessing ceremony at Kamajaya Chapel (Upper Chapel) or Kamaratih Chapel (Lower Chapel with water stage).
* 10 hours exclusive usage of the entire Kamaya’s property (2pm – 12midnight).
* 10 hours usage of 2 preparation suites for bride and groom (2pm – 12midnight).
  `,
    venueId: 1
  },
  {
    name: 'Exquisite Package',
    slotTimeStarts: '07:00',
    slotTimeEnds: '24:00',
    pricePerPax: 170000,
    description: `### This Package inclusive of:
* Complimentary stay at Bridal Suite for wedding couple
* Complimentary rooms for family on the day of event 
* Hospitality or blessing venue for use on the day of event
* Early Dinner for family members
* Refreshment during the blessing ceremony
* International Buffet Dinner
* Signature food stalls from our chef
  `,
    venueId: 2
  },
  {
    name: 'Royal Package',
    slotTimeStarts: '07:00',
    slotTimeEnds: '24:00',
    pricePerPax: 170000,
    description: `### This Package inclusive of:
* Complimentary stay at Bridal Suite for wedding couple
* Complimentary rooms for family on the day of event 
* Hospitality or blessing venue for use on the day of event
* Early Dinner for family members
* Refreshment during the blessing ceremony
* International Buffet Dinner
* Signature food stalls from our chef
  `,
    venueId: 2
  },
  {
    name: 'CLASSIC WEDDING PACKAGE',
    slotTimeStarts: '07:00',
    slotTimeEnds: '24:00',
    pricePerPax: 195000,
    description: `### This Package inclusive of:
* lorem Id nisi velit nisi nisi incididunt.
* Lorem culpa do id exercitation exercitation in officia nisi dolor minim veniam culpa velit eu.
* Elit eu officia nulla dolor duis pariatur irure Lorem veniam labore.
* Aute ullamco elit officia incididunt consectetur.
* Irure amet cillum elit incididunt amet dolor sunt velit aute ex labore.
* Magna ad do consequat ea tempor.
* Signature food stalls from our chef
  `,
    venueId: 3
  },
  {
    name: 'HURUBATU WEDDING PACKAGE',
    slotTimeStarts: '07:00',
    slotTimeEnds: '24:00',
    pricePerPax: 442300,
    description: `### includes:
* 2 (two) kinds of appetizer selections (for 50% equal to minimum guaranteed)
* 1 (one) kind of soup (for 50% equal to minimum guaranteed)
* 6 (six) kinds of main dishes (chicken, fish, beef, vegetables, noodles & steamed rice)
* 2 (two) kinds of dessert
* 1 (one) kind of food stall (for 30% equal to minimum guaranteed)
  `,
    venueId: 3
  },
];

// for (let i = 0; i < 4; i++) {
//   packages.push(new Package());
// }
export default users;
