require('dotenv').config()
const knex = require('knex')
const knexInstance = knex({
	client: 'pg',
	connection: process.env.DB_URL
})
console.log('knex and driver working correctly')

function searchByName(searchTerm) {
	knexInstance
		.select('*')
		.from('shopping_list')
		.where('name', 'ILIKE', `%${searchTerm}%`)
		.then(result => {
			console.log(result)
		})
}

searchByName('fish')

function paginateShoppingList(page){
	let itemsPerPage = 6
	let offset = itemsPerPage * (page - 1)
	knexInstance
		.select('*')
		.from('shopping_list')
		.limit(itemsPerPage)
		.offset(offset)
		.then(result =>{
			console.log(result)
		})
}

paginateShoppingList(2)

function getShoppingListByDate(daysAgo) {
	knexInstance
		.select('*')
		.from('shopping_list')
		.where(
				'date_added',
				'>',
				knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
			)
		.then(result=>{
			console.log(result)
		})
}

getShoppingListByDate(2)

function getCostPerCategory(){
	knexInstance
		.select('category')
		.sum('price as total')
		.from('shopping_list')
		.groupBy('category')
		.then(result=>{
			console.log(result)
		})
}

getCostPerCategory()
