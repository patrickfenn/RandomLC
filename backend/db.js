class DB {
    constructor(){
        console.log("Creating connection to database...");
        let mysql = require('mysql2');
        let dbConfig = require('./db.config.js');
        this.conn = mysql.createConnection({
            host: dbConfig.HOST,
            port: dbConfig.PORT,
            user: dbConfig.USER,
            password: dbConfig.PASSWORD,
            database: dbConfig.DATABASE
        });
        this.conn.connect(error => {
            if (error) throw error;
            console.log("Populating database with data...");
            this.createTables();
            this.populateUnique();
            this.populateTag();
            this.populatePremium();
        });

        //let uniqueResult = this.getRandomUnique(["Easy"],["30.0%"])
        //let tagResult = this.getRandomTag(["Hard"], ["50.0%"],["Array"]);
    }

    addUnique (title, difficulty, acceptance, link) {
        let query = "INSERT INTO problems_unique (title, difficulty, acceptance, link) VALUES (\'"+title+"\', \'"+difficulty+"\', " + acceptance + ", \'" + link + "\')";
        //console.log(query);
        this.conn.query(query);
        
    }

    addTag (title, difficulty, acceptance, link, tag) {
        let query = "INSERT INTO problems_tags (title, difficulty, acceptance, link, tag) VALUES (\'"+title+"\', \'"+difficulty+"\', " + acceptance + ", \'" + link + "\', \'" + tag + "\')";
        //console.log(query);
        this.conn.query(query);
    }

    addPremium (title) {
        title = title.replace(/'/g,'');
        let query = "INSERT INTO problems_premium (title) VALUES (\'" + title + "\')";
        //console.log(query)
        this.conn.query(query)
    }

    populateUnique () {
        this.conn.query("DELETE FROM problems_unique");
        let file = "./problems_unique.json";
        let json = require(file);
        for (const [ignore, value1] of Object.entries(json)) {
            for (const [key, value3] of Object.entries(value1)) {
                let title =  JSON.parse(JSON.stringify(value3))['title'];
                title = title.replace(/'/g,'');
                let difficulty =  JSON.parse(JSON.stringify(value3))['difficulty'];
                let acceptance =  JSON.parse(JSON.stringify(value3))['acceptance'];
                acceptance = acceptance.substring(0, acceptance.length-1);
                let link = JSON.parse(JSON.stringify(value3))['link'];
                this.addUnique(title,difficulty,parseFloat(acceptance),link);
            }
        }
    }

    populateTag () {
        this.conn.query("DELETE FROM problems_tags");
        let file = "./problems_tags.json";
        let json = require(file);
        for (const [ignore, value1] of Object.entries(json)) {
            for (const [topic, value2] of Object.entries(value1)) {
                for (const [key, value3] of Object.entries(value2)) {
                    let title =  JSON.parse(JSON.stringify(value3))['title'];
                    title = title.replace(/'/g,'');
                    let difficulty =  JSON.parse(JSON.stringify(value3))['difficulty'];
                    let acceptance =  JSON.parse(JSON.stringify(value3))['acceptance'];
                    acceptance = acceptance.substring(0, acceptance.length-1);
                    let link = JSON.parse(JSON.stringify(value3))['link'];
                    this.addTag(title,difficulty,parseFloat(acceptance),link,topic);
                }
            }
        }
    }

    populatePremium () {
        this.conn.query("DELETE FROM problems_premium");
        let file = "./problems_premium.txt";
        const fs = require('fs');
        fs.readFile(file, 'utf8', (err, data) => {
          if (err) {
            console.error(err);
            return;
          }
          var lines = data.trim().split('\n');
          for(let i = 0; i < lines.length; i++){
            this.addPremium(lines[i]);
          }
        });
      
    }
    buildString (lst) {
        let str = "";
        lst = lst.split(',');
        for (let i = 0; i < lst.length; i++) {
            str += '\'' + lst[i] + "\', ";
        }
        if (str.length){
            return str.substring(0, str.length-2);
        }
        else{
            return str;
        }
    }

    getRandomUnique(difficulty, acceptance, premium) {
        var query = "";

        if (difficulty.length == 0 && acceptance.length == 0) {
            query = "SELECT * FROM problems_unique";
        }
        else if (difficulty.length > 0 && acceptance.length > 0) {
            query = "SELECT * FROM problems_unique WHERE difficulty in (" + this.buildString(difficulty) + ") AND acceptance >= \'" + acceptance + '\'';
        }
        else if(difficulty.length == 0) {
            query = "SELECT * FROM problems_unique WHERE acceptance >= \'" + acceptance + '\'';
        }
        else if(acceptance.length == 0) {
            query = "SELECT * FROM problems_unique WHERE difficulty in (" + this.buildString(difficulty) + ")";
        }
        if (premium == false) {
            query += " AND title not in (SELECT * from problems_premium)";
        }
        if (query.length > 0) {
            query += " ORDER BY RAND() LIMIT 1";
            return new Promise((resolve, reject) => {
                this.conn.query(query, (err, result) => {
                    if(err){
                        // The equivalent of throwing the error
                        reject(err);
                    } else {
                        // The equivalent of returning a value for getAll
                        resolve(result[0]);
                    }
                })
            });
            
        }
        else{
            return [{}];
        }
    }

    getRandomTag(difficulty, acceptance, tag, premium) {
        var query = "";
        if (difficulty.length == 0 && acceptance.length == 0) {
            query = "SELECT * FROM problems_tags";
        }
        else if (difficulty.length > 0 && acceptance.length > 0) {
            query = "SELECT * FROM problems_tags WHERE difficulty in (" + this.buildString(difficulty) + ") AND acceptance >= " + acceptance;
        }
        else if(difficulty.length == 0) {
            query = "SELECT * FROM problems_tags WHERE acceptance >= \'" + acceptance + '\'';
        }
        else if(acceptance.length == 0) {
            query = "SELECT * FROM problems_tags WHERE difficulty in (" + this.buildString(difficulty) + ")";
        }
        if (premium == false) {
            query += " AND title not in (SELECT * from problems_premium)";
        }
        if(tag.length > 0){
            if (difficulty.length > 0 || acceptance.length > 0) {
                query += " AND tag in (" + this.buildString(tag) + ")";
            }
            else{
                query += " WHERE tag in (" + this.buildString(tag) + ")";
            }
        }
        if (query.length > 0) {
            
            query += " ORDER BY RAND() LIMIT 1";
            console.log(query);
            return new Promise((resolve, reject) => {
                this.conn.query(query, (err, result) => {
                    if(err){
                        // The equivalent of throwing the error
                        reject(err);
                    } else {
                        // The equivalent of returning a value for getAll
                        resolve(result[0]);
                    }
                })
            });
        }
        else{
            return [{}];
        }
    }

    createTables(){
        //Tables and their schemas.
        var tables = [
            ["problems_unique", "(title VARCHAR(255))"], ["problems_tags", "(title VARCHAR(255), acceptance VARCHAR(255), difficulty VARCHAR(255), link VARCHAR(255))"],
            ["problems_premium", "(title VARCHAR(255), acceptance VARCHAR(255), difficulty VARCHAR(255), link VARCHAR(255), tag VARCHAR(255))"]
        ];
        var query;
        for(var i = 0; i < table_names.length; i++){
            var [tableName, schema] = tables[i];
            query = "DROP TABLE IF EXISTS " + tableName;
            this.conn.query(query);
            query = "CREATE TABLE IF NOT EXISTS " + tableName + schema;
            this.conn.query(query);
        }
        console.log(query);
        this.conn.query(query);

    }
}

module.exports = DB;
