import faker from "faker";

class User {
  constructor() {
    this.email = faker.internet.email();
    this.password = faker.internet.password();
    this.username = faker.internet.userName();
    this.role = ["rentee", "renter"][Math.floor(Math.random() * 2)];
  }
}

const users = [
  {
    username: "maman",
    password: "password",
    email: "maman@mail.co",
    role: "renter",
  },
];
for (let i = 0; i < 10; i++) {
  users.push(new User());
}

class Venue {
  constructor() {
    this.name = faker.company.companyName();
    this.address = faker.address.streetAddress();
    this.location = {
      type: "Point",
      coordinates: [faker.address.longitude(), faker.address.latitude()],
    };
    this.imageUrl = faker.image.imageUrl(),
    this.userId = [9, 10][Math.floor(Math.random() * 2)]
  }
}

export const venues = [];
for (let i = 0; i < 10; i++) {
  venues.push(new Venue());
}

class Package {
  constructor() {
    this.name = faker.lorem.words(5);
    this.slotTimeStarts = "13:00";
    this.slotTimeEnds = "18:00";
    this.description = faker.lorem.sentence(5);
    this.venueId = [9, 10][Math.floor(Math.random() * 2)];
  }
}

export const packages = [];
for (let i = 0; i < 4; i++) {
    packages.push(new Package());
  }
export default users;
