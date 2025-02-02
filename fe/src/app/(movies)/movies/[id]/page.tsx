/* Package System */
import axios from "axios";

/* Package Application */
import MovieDetail from "./_components/detail";
import Loading from "../../../../components/loading";
import { Suspense } from "react";
import { ErrorData, ErrorHandling } from "@components/errorHandling";
import { END_POINT_URL_LIST } from "@/src/util/constant";

interface MoviePageProps {
  params: Promise<{
    id: string;
  }>;
}

async function fetchMovieDetails(id: string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}${END_POINT_URL_LIST.MOVIES}/${id}`
    )
    if (response.data.statusCode === 200) {
      return response.data.data;
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
    if (movieDetails) {
      return <MovieDetail movieDetails={movieDetails} />;
    }
    return <p style={{marginTop:'60px'}}>Movie {id} has no data</p>
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