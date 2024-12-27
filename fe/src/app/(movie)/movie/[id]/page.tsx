// /* Package System */
// import React, { useState, useCallback } from "react";
// import { useRouter } from "next/router";
// import axios from "axios";

// /* Package Application */
// import MovieDetail from "../components/detail";
// import { ErrorData, ErrorHandling } from "@components/errorHandling";

// export default function Movie() {
//   const router = useRouter();
//   const [movieDetails, setMovieDetails] = useState(null);
//   const [error, setError] = useState<ErrorData>({} as ErrorData);
//   const [loading, setLoading] = useState(false);

//   const fetchMovieDetails = useCallback(async () => {
//     setLoading(true);
//     setError({} as ErrorData);
//     try {
//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/movies/${router.query.id}`
//       );
//       if (response.status === 200) {
//         setMovieDetails(response.data);
//       }
//     } catch (err: any) {
//       console.error("Error fetching movie details:", err);
//       const errorData = {
//         message: err.response?.data?.message?.message as string || "Failed to fetch movie details",
//         detail: "Backend Error: " + err.response?.data?.message?.details || "Unknown error occurred",
//         statusCode: err.response?.data?.message?.statusCode?.toString() as string || "500" as string
//       };
//       setError(errorData);
//       console.error("Error fetching movie details:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [router.query.id]);

//   React.useEffect(() => {
//     fetchMovieDetails();
//   }, [fetchMovieDetails]);

//   return (
//     <div>
//       {error && (
//         <div>
//           <ErrorHandling error={error} callback={fetchMovieDetails} />
//         </div>
//       )}
//       {loading && (
//         <div className="loading-container">
//           <div className="loading-spinner"></div>
//         </div>
//       )}
//       {movieDetails && <MovieDetail movieDetails={movieDetails} />}
//     </div>
//   );
// }

/* Package System */
import axios from "axios";

/* Package Application */
import MovieDetail from "./components/detail";
import Loading from "../../../../components/loading";
import { Suspense } from "react";
import { ErrorData, ErrorHandling } from "@components/errorHandling";

interface MoviePageProps {
  params: Promise<{
    id: string;
  }>;
}

async function fetchMovieDetails(id: string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/movies/${id}`
    )

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error('Error fetching movie details:', error);
    const err = error as any;
    throw {
      message: err.response?.data?.message?.message as string || 'Failed to fetch movie details',
      detail: 'Backend Error: ' + err.response?.data?.message?.details || 'Unknown error occurred',
      statusCode: err.response?.data?.message?.statusCode?.toString() as string || '500' as string
    };
  }
}

async function MovieContent({ id }: { id: string }) {
  try {
    const movieDetails = await fetchMovieDetails(id);
    return <MovieDetail movieDetails={movieDetails} />;
  } catch (error) {
    const err = error as ErrorData;
    return <ErrorHandling error={err} callback={() => fetchMovieDetails(id)} />;
  }
}

export default async function Movie({ params }: MoviePageProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<Loading />}>
      <MovieContent id={id} />
    </Suspense>
  )
}