# HCMUS Advanced Web App Programming - CQ2021/3

## G03 - Trending movies, movie details, and search functionality

<table className="table table-bordered mt-3">
  <thead className="table-light">
    <tr>
      <th>STT</th>
      <th>Fullname</th>
      <th>ID</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Dương Ngọc Thái Bảo</td>
      <td>21120041</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Trương Tấn Đạt</td>
      <td>21120050</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Nguyễn Thanh Huệ</td>
      <td>21120076</td>
    </tr>
  
  </tbody>
</table>


Develop a website utilizing the TMDB API to display trending movies, movie details, and implement a search functionality. The website should mimic TMDB’s features for showing trending movies and allow users to explore details and search for specific content.

### How to use
#### Go into the back-end repository

```
cd be
```

#### Install back-end's dependencies

```
npm install
```

#### Go into the front-end repository

```
cd ../fe
```

#### Install front-end's dependencies

```
npm install
```

### Setup environment variables
Database used: MongoDB
Set up the environment variables for the backend

In the backend directory, create a file named .env and add the following line, replacing ***your-mongodb-uri*** with your actual MongoDB connection string:

```
MONGODB_URL="mongodb+srv://baobao12052003:xdBcUvVXUVcJnn8B@cluster0.2sc4z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
JWT_SECRET="21120041"
FRONTEND_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="1037537568079-cuu4gk91rl5ohblip69n23ohjcppl99q.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="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"
GOOGLE_CALLBACK_URL="http://localhost:3001/user/google/callback"
DEFAULT_PASSWORD="askdjalskdjalksjdlkasjdklasjdicxic"

API_READ_ACCESS_TOKEN="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZmYwMzk3NDc5YWRkNTBjYTZhN2VhMTRkODg2Y2FhZCIsIm5iZiI6MTczMzczMjY0Mi4yMjgsInN1YiI6IjY3NTZhOTIyZWUzM2IxMDk3YWMwOGZmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7etCBH23LuOEw7hwh9s7Sg6MJVD07ey7n6PSXd3m5nY"
API_KEY_TMDB="bff0397479add50ca6a7ea14d886caad"
BASE_URL_TMDB="https://api.themoviedb.org/3"
```

### Running the project
#### Start the back-end server
```
npm start
```

#### Start the front-end server
```
npm run start
```

The frontend should now be running on [http://localhost:3000](http://localhost:3000)

### Public host deployment:
Front-end server: https://g03-movies-display-415076.vercel.app </br>

### Requirements
<table className="table table-bordered mt-3">
  <thead className="table-light">
    <tr>
      <th>Criteria</th>
      <th>Point</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Home Page Functionality</td>
      <td>2</td>
      <td>&#10004;</td>
    </tr>
    <tr>
      <td>Movie Detail Page</td>
      <td>2</td>
      <td>&#10004;</td>
    </tr>
    <tr>
      <td>Search Functionality</td>
      <td>2</td>
      <td>&#10004;</td>
    </tr>
    <tr>
      <td>Design & Usability</td>
      <td>1</td>
      <td>&#10004;</td>
    </tr>
    <tr>
      <td>API Integration</td>
      <td>1</td>
      <td>&#10004;</td>
    </tr>
    <tr>
      <td>Code Quality</td>
      <td>1</td>
      <td>&#10004;</td>
    </tr>
    <tr>
      <td>Public hosting</td>
      <td>1</td>
      <td>&#10004;</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th colSpan="2">Total</th>
      <th>10</th>
    </tr>
  </tfoot>
</table>