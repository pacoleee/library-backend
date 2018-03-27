//routes
module.exports = function(app) {  
    app.route('/librarybook')
        .post(addLibraryBook)
        .put(updateLibraryBook);

    app.route('/librarybook/filter')
        .post(getLibraryBooks);

    app.route('/librarybook/:bookid')
        .get(getLibraryBook)
        .delete(deleteLibraryBook);
}

var connection = require('../server').connection;

function getLibraryBooks(request, response) {
    var branchNum = request.body.branchNum;
    var status = request.body.status;
    var query = 'SELECT * FROM LibraryBook';

    if(branchNum || status) {
        query += ' WHERE ';
        
        if(branchNum) {
            branchNumFilter = 'branchNum = "' +branchNum +'" AND ';
            query += branchNumFilter;
        }

        else if(status) {
            statusFilter = 'status = "' +status +'"';
            query += statusFilter;
        }

        if(query.substring(query.length - 4, query.length - 1) == 'AND') {
            query = query.substring(0, query.length - 4);
        }
    }

    connection.query(query, function(error, rows, fields){
        if(!!error) {
            console.log('Error in the query\n');
            response.status(422);
            response.send('422 Unprocessable Entity');
        }

        console.log('query SUCCESS!\n')
        response.send(rows);
    });
}

function addLibraryBook(request, response) {
    var bookID = request.body.bookid;
    var isbn = request.body.isbn;
    var branchNum = request.body.branchNum;
    var status = request.body.status;
    var query = 'INSERT INTO LibraryBook (bookID, isbn, branchNum, status) \
    Values ("' +bookID +'", "' +isbn +'", "' +branchNum +'", "' +status +'")';

    connection.query(query, function(error, rows, fields){
        if(!!error) {
            console.log('Error in the query\n');

            response.status(422);
            response.send('422 Unprocessable Entity');
        }

        console.log('query SUCCESS!\n')
        response.send();
    });
}

function updateLibraryBook(request, response) {
    var bookID = request.body.bookid;
    var isbn = request.body.isbn;
    var branchNum = request.body.branchNum;
    var status = request.body.status;

    var query = 'UPDATE LibraryBook \
    Set isbn="' +isbn +'", branchNum="' +branchNum +'",\
    status="' +status +'" \
    WHERE bookid = "' +bookID +'"';

    connection.query(query, function(error, rows, fields){
        if(!!error) {
            console.log('Error in the query\n');

            response.status(422);
            response.send('422 Unprocessable Entity');
        }

        console.log('query SUCCESS!\n')
        response.send();
    });
}

function getLibraryBook(request, response) {
    var isbn = request.params.bookID;
    var query = 'SELECT * FROM LibraryBook \
    WHERE bookID="' +bookID +'"';

    connection.query(query, function(error, rows, fields){
        if(!!error) {
            console.log('Error in the query\n');

            response.status(422);
            response.send('422 Unprocessable Entity');
        }

        console.log('query SUCCESS!\n')
        response.send(rows);
    });
}

function deleteLibraryBook(reqest, response) {
    var isbn = request.params.bookID;
    var query = 'DELETE FROM LibraryBook \
    WHERE bookID="' +bookID +'"';

    connection.query(query, function(error, rows, fields){
        if(!!error) {
            console.log('Error in the query\n');

            response.status(422);
            response.send('422 Unprocessable Entity');
        }

        console.log('query SUCCESS!\n')
        response.send();
    });
}