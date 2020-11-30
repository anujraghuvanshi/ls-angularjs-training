angular.module('myApp', ['ngRoute'])
	.config(function($routeProvider) {
		

		// $stateProvider
		// 	.state('home', {
		// 		url: '/home',
		// 		templateUrl: 'pages/home.html',
		// 		controller: 'appController as ctrl'
		// 	})
		// 	.state('apply-leave', {
		// 		url: '/apply-leave?id?name',
		// 		templateUrl: 'pages/apply-leave.html',	
		// 		controller: 'appController as ctrl'
		// 	})
		// 	.state('leaves-listing', {
		// 		url: '/leaves-listing?id?name',
		// 		templateUrl: 'pages/leaves-listing.html',	
		// 		controller: 'appController as ctrl'
		// 	})

		$routeProvider
			.when('/home', {
				templateUrl: 'pages/home.html',
				controller: 'appController as ctrl'
			})
			.when('/apply-leave', {
				templateUrl: 'pages/apply-leave.html',	
				controller: 'appController as ctrl'
			})
			.when( '/leaves-listing', {
				templateUrl: 'pages/leaves-listing.html',	
				controller: 'appController as ctrl'
			})
			.otherwise({
				redirectTo: '/apply-leave'
			});


	})
	.factory('sqlDB', function() {
		// https://github.com/reduardo7/angular-sqlite
		// https://www.tutorialspoint.com/html5/html5_web_sql.htm
		// var db = openDatabase(dbCfg.name, dbCfg.version, dbCfg.description, ((dbCfg.size || 10) * 1024 * 1024))
		var _db = window.openDatabase('trainings', '1.0', 'This is training DB', 10 * 1024 * 1024)


		this.createTable = function(tableName) {
			_db.transaction(function (tx) {
				var sql = 'CREATE TABLE IF NOT EXISTS logiciels (id INTEGER unique, name TEXT, division TEXT)';
				var q = tx.executeSql(sql, [], function(scss, rslt) {
					console.log(scss, rslt);
				}, function(er, err) {
					console.log(er, err);
				});
				console.log(q);
			})
		}


		this.insertUser = function(id, name, division) {
			_db.transaction(function (tx) {
				var sql = 'INSERT INTO logiciels (id, name, division) VALUES ('+id+',"'+name+'","'+division+'")';
				console.log(sql);
				var q = tx.executeSql(sql, [], function(scss, rslt) {
					console.log(scss, rslt);
				}, function(er, err) {
					console.log(er, err);
				});
				console.log(q);
			})
		}


		this.getAllDBUsers = function(argument) {
			_db.transaction(function (tx) {
				var sql = 'SELECT * FROM logiciels';
				console.log(sql);
				var q = tx.executeSql(sql, [], function(scss, rslt) {
					console.log(scss, rslt);
					return rslt;
				}, function(er, err) {
					console.log(er, err);
				});
				console.log(q);
			})
		}

		return {
			createTable: this.createTable,
			insertUser: this.insertUser,
			getAllDBUsers: this.getAllDBUsers
		}

	})
	.controller('appController', function(sqlDB) {
		var viewdata = this;
		viewdata.myName = 'Anuj Singh';

		viewdata.setSessionStorage = function() {
			sessionStorage.setItem("FirstName", "Smith");
		}

		viewdata.setLocalstorage = function() {
			localStorage.setItem("LastName", "Smith");
		}

		viewdata.setCookie = function() {
			document.cookie = "username=John Doe";
		}

		viewdata.navigate = function(state) {
			// $state.go(state, {id: '1', name: 'anuj'})
		}

		// sqlDB.createTable('logiciel-emps');
		sqlDB.insertUser(3, 'Singga', 'Defaulter');
		var data = sqlDB.getAllDBUsers();

		console.log(data);
	});