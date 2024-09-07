
import { Types} from 'mongoose';
import { faker } from '@faker-js/faker'; 
import { generateRandomElement } from '../../src/helpers/generate.helper';


export const product = {
    _id:new Types.ObjectId().toHexString(),
    title: faker.commerce.productName(),
    categoryId: new Types.ObjectId().toHexString(),
    description: faker.lorem.paragraph(),
    highlighted: generateRandomElement('0','1'),
    position: faker.number.int({min: 1, max: 100}),
    thumbnail: faker.image.url(), 
    price: faker.commerce.price(),
    discountPercentage: faker.number.int({min: 1, max: 100}),
    deleted: faker.datatype.boolean(),
    slug: faker.helpers.slugify(faker.commerce.productName()),
    status: generateRandomElement('active','inactive')
} 