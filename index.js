const express = require('express')
const app = express();
const port = 3000;
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'attendancedb'
});

connection.connect();


// connection.query('select * from times', function(err, rows, fields){
// 	if (!err){
// 		console.log("times", rows);
// 	}
// 	else
// 		console.log("Error ", err);
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
	res.send("second hello world");
})


app.get('/courses/:instructorNo', function (req, res) {
	var instructorNo = req.params.instructorNo;
	connection.query('select * from courses where instructorNo = ?', instructorNo, function (err, result) {
		if (!err)
			res.send(result);
		else
			console.log(err);

	});
});


app.get('/time/:groupSectionId', function (req, res) {
	var groupSectionId = req.params.groupSectionId;
	connection.query('select * from sectionsdates where groupSectionId = ?', groupSectionId, function (err, result) {
		if (!err)
			res.send(result);
		else
			console.log(err);

	});
});

app.get('/lecturers', function (req, res) {
	connection.query('select * from lecturers', function (err, result) {
		if (!err)
			res.json(result);
	})
})

app.get('/times', function (req, res) {
	connection.query('select * from times', function (err, result) {
		if (!err)
			res.json(result);
	})
})


app.get('/attendances', function (req, res) {
	connection.query('select * from attendances', function (err, result) {
		if (!err)
			res.json(result);
	})
})


app.get('/days', function (req, res) {
	connection.query('select * from days', function (err, result) {
		if (!err)
			res.json(result);
	})
})


app.get('/building', function (req, res) {
	connection.query('select * from building', function (err, result) {
		if (!err)
			res.json(result);
	})
})


app.get('/courses', function (req, res) {
	connection.query('select * from courses', function (err, result) {
		if (!err)
			res.json(result);
	})
})

app.get('/rooms', function (req, res) {
	connection.query('select * from rooms', function (err, result) {
		if (!err)
			res.json(result);
	})
})




app.post('/login', function (req, res) {

	connection.query('select * from lecturers where supervisorArabicName = ? and supervisorNo = ?', [req.body.supervisorArabicName,req.body.supervisorNo], function (err, result) {
		if (err) {
			throw new Error("Error inserting " + err);
		}
		else
			res.json(result);
	})
})



app.get('/students/:courseNo/:sectionNo', function (req, res) {
	var courseNo = req.params.courseNo;
	var sectionNo = req.params.sectionNo;
	connection.query('select * from students where courseNo = ? and sectionNo = ?', [courseNo, sectionNo], function (err, result) {
		if (!err)
			res.json(result);
	})
})


app.get('/sectionsdates', function (req, res) {
	connection.query('select * from sectionsdates', function (err, result) {
		if (!err)
			res.json(result);
	})
})


app.post('/attendancestudents/add', function (req, res) {
	console.log(req.body);
	console.log(req.range);
	req.body = JSON.stringify(req.body);
	req.body = JSON.parse(req.body);
	console.log(req.body);
	let finalResult;
	for (const element in req.body) {

		connection.query('insert into attendancestudent set ?', req.body[element], function (err, result) {
			if (err) {
				throw new Error("Error inserting " + err);
			}
			finalResult = result;
		})
	}
	res.json(finalResult);
})



app.post('/attendance/add', function (req, res) {

	connection.query('insert into attendance set ?', req.body, function (err, result) {
		if (err) {
			throw new Error("Error inserting " + err);
		}
		else
			res.json(result);
	})
})

app.get('/attendance/last', function (req, res) {
	connection.query('select * from attendance where id = LAST_INSERT_ID()', function (err, result) {
		if (!err)
			res.json(result);
		else
			console.log(err);
	})
})

app.get('/attendances/:lecturerId/:courseNo/:sectionNo', function (req, res) {
	var courseNo = req.params.courseNo;
	var sectionNo = req.params.sectionNo;
	var lecturerId = req.params.lecturerId;
	connection.query('select * from attendance where courseId = ? and sectionId = ? and lecturerId = ?', [courseNo, sectionNo, lecturerId], function (err, result) {
		if (!err)
			res.json(result);
		else
			console.log(err);
	})
})
app.get('/attendancestudent/:id', function (req, res) {
	var id = req.params.id;
	connection.query('select * from attendancestudent where attendanceId = ?', id, function (err, result) {
		if (!err)
			res.json(result);
	})
})

app.get('/quizzes', function (req, res) {
	connection.query('select * from quizzes', function (err, result) {
		if (!err)
			res.send(result);
		else
			console.log(err);

	});
});

app.post('/quize/add', function (req, res) {

	connection.query('insert into quizzes set ?', req.body, function (err, result) {
		if (err) {
			throw new Error("Error inserting " + err);
		}
		else
			res.json(result);
	})
})


app.get('/quize/last', function (req, res) {
	connection.query('select * from quizzes where id = LAST_INSERT_ID()', function (err, result) {
		if (!err)
			res.json(result);
		else
			console.log(err);
	})
})

app.get('/quize/:id', function (req, res) {
	var id = req.params.id;
	connection.query('select * from quizzes where id = ?', id, function (err, result) {
		if (!err)
			res.json(result);
	})
})

app.get('/quizzes/:lecturerId/:courseNo/:sectionNo', function (req, res) {
	var courseNo = req.params.courseNo;
	var sectionNo = req.params.sectionNo;
	var lecturerId = req.params.lecturerId;
	connection.query('select * from quizzes where courseId = ? and sectionId = ? and lecturerId = ?', [courseNo, sectionNo, lecturerId], function (err, result) {
		if (!err)
			res.json(result);
		else
			console.log(err);
	})
})


app.get('/quize/count/:lecturerId/:courseNo/:sectionNo', function (req, res) {
	var courseNo = req.params.courseNo;
	var sectionNo = req.params.sectionNo;
	var lecturerId = req.params.lecturerId;
	connection.query('select count(*) AS count from quizzes where courseId = ? and sectionId = ? and lecturerId = ?', [courseNo, sectionNo, lecturerId], function (err, result) {
		if (!err)
			res.json(result);
		else
			console.log(err);
	})
})
app.post('/quize/update/:id', function (req, res) {
	var id = req.params.id;

	connection.query('UPDATE quizzes SET ? WHERE id = ?', [req.body,id], function (err, result)  {
		if (err) {
			throw new Error("Error inserting " + err);
		}
		else
			res.json(result);
	})
})
app.post('/studentquize/add', function (req, res) {
	console.log(req.body);
	console.log(req.range);
	req.body = JSON.stringify(req.body);
	req.body = JSON.parse(req.body);
	console.log(req.body);
	let finalResult;
	for (const element in req.body) {

		connection.query('insert into studentquize set ?', req.body[element], function (err, result) {
			if (err) {
				throw new Error("Error inserting " + err);
			}
			finalResult = result;
		})
	}
	res.json(finalResult);
})

app.post('/studentquize/update', function (req, res) {
	console.log(req.body);
	console.log(req.range);
	req.body = JSON.stringify(req.body);
	req.body = JSON.parse(req.body);
	console.log(req.body);
	let finalResult;
	for (const element in req.body) {
		connection.query(' UPDATE studentquize SET ? WHERE id = ?',[ req.body[element],req.body[element].id], function (err, result) {
			if (err) {
				throw new Error("Error inserting " + err);
			}
			finalResult = result;
		})
	}
	res.json(finalResult);
})


app.get('/studentquize/:id', function (req, res) {
	var id = req.params.id;
	connection.query('select * from studentquize where quizeId = ?', id, function (err, result) {
		if (!err)
			res.json(result);
	})
})

app.get('/student/:id', function (req, res) {
	var id = req.params.id;
	connection.query('select * from students where studentNo = ?', id, function (err, result) {
		if (!err)
			res.json(result);
	})
})

app.post('/note/add', function (req, res) {

	connection.query('insert into notes set ?', req.body, function (err, result) {
		if (err) {
			throw new Error("Error inserting " + err);
		}
		else
			res.json(result);
	})
})

app.get('/note/:id', function (req, res) {
	var id = req.params.id;
	connection.query('select * from notes where id = ?', id, function (err, result) {
		if (!err)
			res.json(result);
	})
})

app.get('/notes/:id', function (req, res) {
	var id = req.params.id;
	connection.query('select * from notes where lecturerId = ?', id, function (err, result) {
		if (!err)
			res.json(result);
	})
})


app.post('/note/update/:id', function (req, res) {
	var id = req.params.id;

	connection.query('UPDATE notes SET ? WHERE id = ?', [req.body,id], function (err, result)  {
		if (err) {
			throw new Error("Error inserting " + err);
		}
		else
			res.json(result);
	})
})
app.get('/notes', function (req, res) {
	connection.query('select * from notes', function (err, result) {
		if (!err)
			res.json(result);
	})
})

app.get('/note/delete/:id', function (req, res) {
	var id_ = req.params.id;
	connection.query('DELETE FROM notes WHERE id =?', id_, function (err, result) {
		if (!err)
			res.json(result);
	})
})


app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`)
});