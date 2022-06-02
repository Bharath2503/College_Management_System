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



const ejsMate = require('ejs-mate');
const { release } = require('os');

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
app.get('/view', (req, res) => {
    res.render('view')
})
//----------------------------------------------------------------------------------------------------------------------------------
//STUDENT VIEW
app.get('/viewstudent', (req, res) => {
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
//STUDENT INSERT
app.post('/student', (req, res) => {
    let { stu_id, f_name, l_name, gender, email, p_num, dep,course, age, address, year } = req.body
    pool.getConnection((err, result) => {
        if (err) console.log(err.message)
        else {
            console.log('student connected')
            console.log(result)
            var sql = `INSERT INTO test (student_id,first_name,last_name,gender,email,department,course,ph_no,age,address,year) VALUES ('${stu_id}','${f_name}','${l_name}','${gender}','${email}','${dep}','${course}',${p_num},${age},'${address}','${year}');`
            result.query(sql, (err, rows, fiels) => {
                if (err) console.log(err)
                else {
                    console.log(rows)
                    result.release()
                    res.redirect('student')
                }
            })
        }

    })
})
//STUDENT DELETE
app.post('/deletestudent', (req, res) => {
    pool.getConnection((err, result) => {
        if (err) console.log(err.message)
        else {
            console.log('STUDENT DELETED')
            console.log(req.body.stu_id)
            var sql = `DELETE FROM test  WHERE student_id='${req.body.stu_id}';`
            result.query(sql, (err, rows, fields) => {
                if (err) console.log(err)
                else {
                    console.log(rows)
                    result.release()
                    res.redirect('viewstudent')
                }
            })
        }
    })
})
//STUDENT UPDATE
app.post('/updatestudent', (req, res) => {
    pool.getConnection((err, result) => {
        if (err) console.log(err.message)
        else {
            console.log('STUDENT UPDATE')
            console.log(req.body.stu_id)
            var sql = `UPDATE  test SET ph_no=${req.body.p_num},address='${req.body.address}',year='${req.body.year}'  WHERE student_id='${req.body.stu_id}';`
            result.query(sql, (err, rows, fields) => {
                if (err) console.log(err)
                else {
                    console.log(rows)
                    result.release()
                    res.redirect('viewstudent')

                }
            })
        }
    })
})
//------------------------------------------------------------------------------------------------------------------------------------

//STAFF VIEW
app.get('/viewstaff', (req, res) => {
    pool.getConnection((err, result) => {
        if (err) console.log(err.message)
        else {
            console.log('View Staff')
            console.log(result)
            var sql = `SELECT * FROM staff;`
            result.query(sql, (err, rows, fields) => {
                if (err) console.log(err)
                else {
                    console.log(rows)
                    result.release()
                    res.render('viewstaff', { rows })

                }
            })
        }
    })
})
// STAFF INSERT
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
                    res.redirect('staff')
                }
            })
        }
    })
})
//STAFF DELETE
app.post('/deletestaff', (req, res) => {
    pool.getConnection((err, result) => {
        if (err) console.log(err.message)
        else {
            console.log('STAFF DELETED')
            console.log(req.body.fid)
            var sql = `DELETE FROM staff  WHERE F_id='${req.body.fid}';`
            result.query(sql, (err, rows, fields) => {
                if (err) console.log(err)
                else {
                    console.log(rows)
                    result.release()
                    res.redirect('viewstaff')

                }
            })
        }
    })
})
//STAFF UPDATE
app.post('/updatestaff', (req, res) => {
    pool.getConnection((err, result) => {
        if (err) console.log(err.message)
        else {
            console.log('STAFF UPDATE')
            console.log(req.body.fid)
            var sql = `UPDATE  staff SET course='${req.body.cname}',salary=${req.body.sal}  WHERE F_id='${req.body.fid}';`
            result.query(sql, (err, rows, fields) => {
                if (err) console.log(err)
                else {
                    console.log(rows)
                    result.release()
                    res.redirect('viewstaff')
                }
            })
        }
    })
})
// ---------------------------------------------------------------------------------------------------------------------------------------
// MARKS INSERT
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
                    res.redirect('marks')
                }
            })
        }
    })
})
//MARKS VIEW
app.get('/viewmarks', (req, res) => {
    pool.getConnection((err, result) => {
        if (err) console.log(err.message)
        else {
            console.log("Marks View")
            console.log(result.body)
            var sql = `SELECT * FROM marks;`
            result.query(sql, (err, rows, fields) => {
                if (err) console.log(err)
                else {
                    console.log(rows)
                    result.release()
                    res.render('viewmarks', { rows })
                }
            })
        }
    })
})
//MARK DELETE
app.post('/deletemarks', (req, res) => {
    pool.getConnection((err, result) => {
        if (err) console.log(err.message)
        else {
            console.log("Marks View")
            console.log(req.body.rollno)
            var sql = `DELETE FROM marks where student_id='${req.body.rollno}'`;
            result.query(sql, (err, rows, fields) => {
                if (err) console.log(err)
                else {
                    console.log(rows)
                    result.release()
                    res.render('marks', { rows })
                    res.redirect('viewmarks')
                }
            })
        }
    })
})
//MARKS UPADATE
app.post('/updatemarks', (req, res) => {
    pool.getConnection((err, result) => {
        if (err) console.log(err.message)
        else {
            console.log("Marks Upadate")
            console.log(req.body.rollno)
            var sql = `UPDATE marks SET CGPA=${req.body.cgpa},backlogs=${req.body.arrear} WHERE student_id='${req.body.rollno}'`;
            result.query(sql, (err, rows, fields) => {
                if (err) console.log(err)
                else {
                    console.log(rows)
                    result.release()
                    res.render('marks', { rows })
                    res.redirect('viewmarks')
                }
            })
        }
    })
})
//--------------------------------------------------------------------------------------------------------------------------
//JOIN OPERATION
app.get('/joinstudent', (req, res) => {
    pool.getConnection((err, result) => {
        if (err) console.log(err.message)
        else {
            console.log('student connected')
            console.log(result)
            var sql = `select s.student_id,s.first_name,m.CGPA from test as s JOIN marks as m ON (s.student_id=m.student_id);`
            result.query(sql, (err, rows, fiels) => {
                if (err) console.log(err)
                else {
                    console.log(rows)
                    result.release()
                    res.render('joinstudent', { rows })

                }
            })
        }
    })
})
//CGPA
app.post('/greater_cgpa', (req, res) => {
    pool.getConnection((err, result) => {
        if (err) console.log(err.message)
        else {
             console.log("Greater CGPA")
            console.log(req.body.rollno)
            var sql = `SELECT *  FROM marks WHERE  CGPA>${req.body.greater};`
            result.query(sql, (err, rows, fields) => {
                if (err) console.log(err)
                else {
                    console.log(rows)
                    result.release()
                    res.render('greater_mark', { rows })
                    
                }
            })
        }
    })
})

app.listen(port, function () {
    console.log("Started")
})
