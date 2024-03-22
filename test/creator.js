import { faker } from '@faker-js/faker';
import { buildServer } from '../src/server.js';

const app = buildServer();

const createUserResponse = await app.inject({
  url: '/users',
  method: 'POST',
  body: { username: faker.person.fullName() },
});

if (createUserResponse.statusCode !== 201) throw new Error('User creation error');

const user = JSON.parse(createUserResponse.body).result;

const itemsNumber = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
const createdItems = [];
let createdItemsCount = 0;

const interval = setInterval(async () => {
  const [auctionStartDate, auctionEndDate] = faker.date.betweens({
    from: new Date(),
    to: new Date(Date.now() + 2 * 60 * 1000),
  });
  const item = {
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    auctionStartDate,
    auctionEndDate,
  };
  const createItemResponse = await app.inject({
    url: '/items',
    method: 'POST',
    body: item,
    headers: {
      'X-User-ID': user.id,
    },
  });

  if (createItemResponse.statusCode !== 201) throw new Error('Item creation error');

  createdItems.push(JSON.parse(createItemResponse.body).result);

  createdItemsCount += 1;

  if (createdItemsCount >= itemsNumber) {
    console.log(createdItems);

    app.close();
    clearInterval(interval);
    process.exit(1);
  }
}, 1000 * 60 * 5 / itemsNumber);
