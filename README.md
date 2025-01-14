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

In the be directory, create a file named .env and add the following line, replacing ***your-mongodb-uri*** with your actual MongoDB connection string (or you can use our existing mongodb-uri as below):

```
# DATABASE-URL
MONGODB_URL_AUTH="mongodb+srv://baobao12052003:xdBcUvVXUVcJnn8B@cluster0.2sc4z.mongodb.net/auth?retryWrites=true&w=majority&appName=Cluster0"
MONGODB_URL_OTHERSCRAP="mongodb+srv://21120076:123456abc@adweb.7z4om.mongodb.net/people?retryWrites=true&w=majority&appName=ADWEB"
MONGODB_URL_MOVIESSCRAP="mongodb+srv://webadvancedfpj:Y9nxp3oawGOfi29U@groupscraping.ptp9o.mongodb.net/movies?retryWrites=true&w=majority&appName=GroupScraping"

# SECRET
JWT_SECRET="21120041"
GOOGLE_CLIENT_ID="1037537568079-cuu4gk91rl5ohblip69n23ohjcppl99q.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="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"
GOOGLE_CALLBACK_URL="http://localhost:3001/user/google/callback"
DEFAULT_PASSWORD="askdjalskdjalksjdlkasjdklasjdicxic"

CLOUDINARY_CLOUD_NAME="de66mx8mw"
CLOUDINARY_API_KEY="357671819695463"
CLOUDINARY_API_SECRET="b5zmA7I3glaMkNmhdh6XkMOIwmw"
CLOUDINARY_URL="cloudinary://357671819695463:b5zmA7I3glaMkNmhdh6XkMOIwmw@de66mx8mw"

# GEMINI KEY
GEMINI_API_KEY = "AIzaSyABq5UNMbiS539lv_-qpQHVFDvu-mH7XTQ"
MY_RAG_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJleHAiOjE3NDQ1NTc0NDYsImlhdCI6MTczNjc4MTQ0Nn0.FhM8pxVDdRIXbER3nydwEyO9oaGcz4J16eV4i7dMO_M"

API_READ_ACCESS_TOKEN="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZmYwMzk3NDc5YWRkNTBjYTZhN2VhMTRkODg2Y2FhZCIsIm5iZiI6MTczMzczMjY0Mi4yMjgsInN1YiI6IjY3NTZhOTIyZWUzM2IxMDk3YWMwOGZmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7etCBH23LuOEw7hwh9s7Sg6MJVD07ey7n6PSXd3m5nY"
API_KEY_TMDB="bff0397479add50ca6a7ea14d886caad"
BASE_URL_TMDB="https://api.themoviedb.org/3"

# API
FRONTEND_URL="http://localhost:3000"

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=awad.moviedisplay@gmail.com
EMAIL_PASS=lqpnyjbmpdjtuobr
OTP_EXPIRE_SECONDS=60
```

#### Front-end system
In the fe directory, create a file named .env and add the following line
```
NEXT_PUBLIC_BACKEND_URL="http://localhost:3001"
NEXT_PUBLIC_GOOGLE_CLIENT_ID="1037537568079-cuu4gk91rl5ohblip69n23ohjcppl99q.apps.googleusercontent.com"
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