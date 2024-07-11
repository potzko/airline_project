This is a REST API for the SQL database.

Each relevant object has a set of functions in the 'thin SQL wrapper' file.
These are then wrapped in one of the files in the sql_wrappers folder as a relevant set of functions.
From these functions, we create a controller in the db_wrapper folder.
We then map each controller individually in the routes folder.
Finally, we combine all of the routes inside app.js.

