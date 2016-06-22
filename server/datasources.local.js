/**
 * Created by danieldihardja on 06/04/16.
 */
module.exports = {
	mysqlDs : {
		"host": process.env.MYSQL_HOST 			|| '192.168.99.100',
		"port": process.env.MYSQL_PORT 			|| 3306,
		"database": process.env.MYSQL_DB 		|| "chardb",
		"username": process.env.MYSQL_USER 		|| "dev",
		"password": process.env.MYSQL_PASSWORD 	|| "dev123",
		"name": "mysqlDs",
		"connector": "mysql"
	}
};