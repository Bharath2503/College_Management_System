const express = require('express')
const path = require("path")
const bodyParser = require('body-parser');
const { createPool } = require('mysql');
const mysql = require('mysql')


const pool = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "miniproject",
    connectionLimit: 20
})



const ejsMate = require('ejs-mate')

const port = 3000


const app = express()
app.use(express.static(path.join(__dirname, "/public")))
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: true }));

app.get('/home', (req, res) => {
    res.render('home')
})
app.get('/student', (req, res) => {
    res.render('student')
})
app.get('/staff', (req, res) => {
    res.render('staff')
})
app.get('/marks', (req, res) => {
    res.render('marks')
})
app.get('/viewstd', (req, res) => {
    pool.getConnection((err, result) => {
        if (err) console.log(err.message)
        else {
            console.log('student connected')
            console.log(result)
            var sql = `select * from test;`
            result.query(sql, (err, rows, fiels) => {
                if (err) console.log(err)
                else {
                    console.log(rows)
                    result.release()
                    res.render('viewstudent', { rows })

                }
            })
        }


    })
})

app.get('/view', (req, res) => {
    pool.getConnection((err, result) => {
        if (err) console.log(err.message)
        else {
            console.log('student connected')
            console.log(result)
            var sql = `select * from test;`
            result.query(sql, (err, rows, fiels) => {
                if (err) console.log(err)
                else {
                    console.log(rows)
                    result.release()
                    res.render('view', { rows })

                }
            })
        }


    })

})
app.post('/student', (req, res) => {
    let { stu_id, f_name, l_name, gender, email, p_num, dep, age, address, year } = req.body
    pool.getConnection((err, result) => {
        if (err) console.log(err.message)
        else {
            console.log('student connected')
            console.log(result)
            var sql = `INSERT INTO test (student_id,first_name,last_name,gender,email,department,ph_no,age,address,year) VALUES ('${stu_id}','${f_name}','${l_name}','${gender}','${email}','${dep}',${p_num},${age},'${address}','${year}');`
            result.query(sql, (err, rows, fiels) => {
                if (err) console.log(err)
                else {
                    console.log(rows)
                    result.release()
                }
            })
        }

    })
})

app.get('/studelete', (req, res) => {
    let {stu_id} = req.body
    pool.getConnection((err, result) => {
        if (err) console.log(err.message)
        else {
            console.log('student Delete')
            console.log(result)
            var sql = "delete from test where '20itr014';"
            result.query(sql,  (err, rows, fiels) => {
                if (err) console.log(err)
                else {
                    console.log(rows)
            
                    result.release()
                    res.render('student',{rows})
                }
            })
        }

    })
})


app.post('/staff', (req, res) => {
    let { fid, fname, cname, gender, dep, sal } = req.body
    pool.getConnection((err, result) => {
        if (err) console.log(err.message)
        else {
            console.log('faculty connected')
            console.log(result.body)
            var sql = `INSERT INTO staff (F_id,F_name,course,gender,department,salary) VALUES ("${fid}","${fname}","${cname}","${gender}","${dep}",${sal});`
            result.query(sql, (err, rows, fields) => {
                if (err) console.log(err)
                else {
                    console.log(rows)
                    result.release()

                }
            })
        }
    })
})
app.post('/marks', (req, res) => {
    let { rollno, cgpa, arrear } = req.body
    pool.getConnection((err, result) => {
        if (err) console.log(err.message)
        else {
            console.log("Marks connected")
            console.log(result.body)
            var sql = `INSERT INTO marks (student_id,CGPA,backlogs) VALUES ('${rollno}','${cgpa}','${arrear}');`
            result.query(sql, (err, rows, fields) => {
                if (err) console.log(err)
                else {
                    console.log(rows)
                    result.release()
                }
            })
        }
    })
})



app.listen(port, function () {
    console.log("Started")
})
