// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/rest-crud
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {
  defineModelClass,
  Entity,
  model,
  ModelDefinition,
  property,
} from '@loopback/repository';
import {getModelSchemaRef} from '@loopback/rest';

describe('defineCrudRestController', () => {
  it('should generate controller based on Model name', async () => {
    @model()
    class Product extends Entity {
      @property({id: true})
      id: number;
    }

    const srA = getModelSchemaRef(Product);
    console.log(srA); // <-- full schema ref

    // const CrudRestControllerA = defineCrudRestController<
    //   Product,
    //   typeof Product.prototype.id,
    //   'id'
    // >(Product, {basePath: '/products'});

    // -----------------------------------

    const bookDef = new ModelDefinition({
      name: 'Book',
      properties: {
        id: {
          type: 'Number',
          required: true,
        },
      },
    });

    const Book = defineModelClass<typeof Entity, {id: number}>(Entity, bookDef);

    const srB = getModelSchemaRef(Book);
    console.log(srB); // <-- {}

    // const CrudRestControllerB = defineCrudRestController<
    //   Book, // <-- Book is not a "real" Class
    //   typeof Book.prototype.id,
    //   'id'
    // >(Book, {basePath: '/books'});

    // const CrudRestControllerB = defineCrudRestController(Book, {
    //   basePath: '/books',
    // });
  });
});
