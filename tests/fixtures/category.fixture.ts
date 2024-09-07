import {faker} from "@faker-js/faker";
import { Types } from "mongoose";
import { generateRandomElement } from "../../src/helpers/generate.helper";

export const category = {
    _id: new Types.ObjectId(),
    title: faker.commerce.productName(),
    thumbnail: faker.image.url(), 
    description: faker.lorem.paragraph(),
    deleted: faker.datatype.boolean(),
    slug: faker.helpers.slugify(),
    status: generateRandomElement('active','inactive'),
    parentCategory: new Types.ObjectId()
}