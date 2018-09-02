This demo consists of a backend server hosted with now here:
https://shaka-server-jtuabnyqng.now.sh/api/

And a frontend server hosted with netlify here:
https://gallant-cray-5b2a65.netlify.com/

To experiment with pagination and filtering on the frontend client:

simplify attach query parameters, like so:

Filtering Examples:

Will return only users that are admins.
http://localhost:3000/dashboard/users?isAdmin=true

Will return only users that are armenian.
http://localhost:3000/dashboard/users?country=Armenia

Limiting Example:

Will return only the first 50 users .
http://localhost:3000/dashboard/users?limit=50

Pagination Examples:

Will return only the next 50 users after the first 50 .
http://localhost:3000/dashboard/users?limit=50&page=2

Will return only the next 50 users after the first 100 .
http://localhost:3000/dashboard/users?limit=50&page=3

Will return only the next 20 users after the first 40 .
http://localhost:3000/dashboard/users?limit=20&page=3

Etc
