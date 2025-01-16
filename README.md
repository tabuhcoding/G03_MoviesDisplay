# HCMUS Advanced Web App Programming - CQ2021/3

## Final Project - Movie recommendation website

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

#### Back-end system
Database used: MongoDB
Set up the environment variables for the backend

In the be directory, create a file named .env and add the following line, replacing ***your-mongodb-uri*** with your actual MongoDB connection string (you can use our existing mongodb-uri as in Lab Final Project Report.pdf or you can pm **dattantruong.work@gmail.com** for more details).:

```
# DATABASE-URL
MONGODB_URL_AUTH=""
MONGODB_URL_OTHERSCRAP=""
MONGODB_URL_MOVIESSCRAP=""

# SECRET
JWT_SECRET=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GOOGLE_CALLBACK_URL=""
DEFAULT_PASSWORD=""

CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
CLOUDINARY_URL="

# GEMINI KEY
GEMINI_API_KEY = ""
MY_RAG_TOKEN = ""

API_READ_ACCESS_TOKEN=""
BASE_URL_TMDB="https://api.themoviedb.org/3"

# API
FRONTEND_URL=""

EMAIL_HOST=
EMAIL_PORT=
EMAIL_USER=
EMAIL_PASS=
OTP_EXPIRE_SECONDS=60
```

#### Front-end system
In the fe directory, create a file named .env and add the following in Lab Final Project Report.pdf (or you can pm **dattantruong.work@gmail.com** for more details)

```
NEXT_PUBLIC_BACKEND_URL=""
NEXT_PUBLIC_GOOGLE_CLIENT_ID=""
```

### Running the project
#### Start the back-end server
```
npm run start:dev
```

#### Start the front-end server
```
npm run dev
```

The frontend should now be running on [http://localhost:3000](http://localhost:3000)