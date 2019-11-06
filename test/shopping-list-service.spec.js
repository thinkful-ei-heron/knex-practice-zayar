const ShoppingService = require('../src/shopping-list-service')
const knex = require('knex')

describe(`shopping service object`, () => {
  let db
  let testShoppingItems = [
      //name, price, category, checked, date_added
      //('Fish tricks', 13.10, 'Main',false,now() - '21 days'::INTERVAL),
    {
      id: 1,
      name: 'TestProduct',
      price: '12.00',
      category: 'Main',
      date_added: new Date('2029-01-22T16:28:32.615Z')
    },
    {
      id: 2,
      name: 'Second test item!',
      date_added: new Date('2100-05-22T16:28:32.615Z'),
      price: '21.00',
      category: 'Snack'
    },
  ]
  before(() => {
    db = knex({
      client: 'pg',
      connection:process.env.TEST_DB_URL,
    })
  })
  before(()=>db('shopping_list').truncate())
  before(() => {
    return db
      .into('shopping_list')
      .insert(testShoppingItems)
  })
  after(()=>db.destroy())
  describe('getAllItems', () => {
    it('ShoppingService.getAllItems gets data from table', () => {
      const expectedItems = testShoppingItems.map(item => ({
        ...item,
        checked:false,
      }))
      return ShoppingService.getAllItems(db)
        .then(actual => {
          expect(actual).to.eql(expectedItems)
        })
    })
  })
})
