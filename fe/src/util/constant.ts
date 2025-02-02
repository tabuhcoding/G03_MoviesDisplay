export class END_POINT_URL_LIST {
  // api-v2
  static V2_LOGIN = "api-v2/login";
  static V2_GOOGLE_LOGIN = "api-v2/login/google";
  static V2_REGISTER = "api-v2/register";
  static V2_FORGOT_PASSWORD = "api-v2/forgot-password";
  static V2_RESET_PASSWORD = "api-v2/reset-password";
  static V2_VERIFY_OTP = "api-v2/verify-otp";
  static V2_UPDATE_AVATAR = "api-v2/update-avatar";

  // ME
  static FORGOT_PASSWORD = "/user/forgot-password";
  static GOOGLE_LOGIN = "/user/google";
  static LOGIN = "/user/login";
  static REGISTER = "/user/register";
  static PROFILE = "/user/profile";
  static RESET_PASSWORD = "/user/reset-password";
  static VERIFY_OTP = "/otp/verify";
  static UPDATE_AVATAR = "/user/update-avatar";
  static SEND_OTP = "/user/send-otp";

  // IMAGE
  static IMAGE = "/image";

  // MOVIES
  static MOVIES_LIST = "/movies/list";
  static MOVIES_GENRES = "/movies/genres";
  static MOVIES_TRENDING = "/movies/trending";
  static MOVIES_SEARCH = "/movies/search";
  static MOVIES_NOW_PLAYING = "/movies/now-playing";
  static MOVIES_POPULAR = "/movies/popular";
  static MOVIES_TOP_RATED = "/movies/top-rated";
  static MOVIES_UPCOMING = "/movies/upcoming";
  static LASTEST_TRAILER = "/movies/lastest-trailers";
  // MOVIES DETAIL
  static MOVIES = "/movies"; // /movies/:id
  static MOVIES_RECOMMENDATIONS = "/recommendations"; // /movies/:id/recommendations
  static USER_RECOMMENDATION = "movies/recommendations"; // /movies/recommendations?email=email
  
  // PEOPLE
  static PEOPLE = "/people";
  static PEOPLE_LIST = "/people/list";
  static PEOPLE_SEARCH = "/people/search";
  static PEOPLE_TRENDING = "/people/trending"
  static PEOPLEPOPULAR = "/people/popular";

  // ACTION
  static favorite = "user/action/favorite-list";
  static watchlist = "user/action/watch-list";
  static rating = "user/action/rating";

  // AI
  static NAVIGATE = "/navigate";
  static RETRIEVE = "/retrieve";
}