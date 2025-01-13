/* Package System */
import axios from "axios";

/* Package Application */
import Loading from "@/src/components/loading";
import { Suspense } from "react";
import { ErrorData, ErrorHandling } from "@components/errorHandling";
import { END_POINT_URL_LIST } from "@/src/util/constant";
import PeopleDetail from "./_components/detail";

interface PeoplePageProps {
  params: Promise<{
    id: string;
  }>;
}

async function fetchPeopleDetails(id: string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}${END_POINT_URL_LIST.PEOPLE}/${id}`
    )

    if (response.data.statusCode === 200) {
      return response.data.data;
    }
  } catch (error) {
    console.error('Error fetching people details:', error);
    const err = error as any;
    throw {
      message: err.response?.data?.message?.message as string || 'Failed to fetch people details',
      detail: 'Backend Error: ' + err.response?.data?.message?.details || 'Unknown error occurred',
      statusCode: err.response?.data?.message?.statusCode?.toString() as string || '500' as string
    };
  }
}

async function PeopleContent({ id }: { id: string }) {
  try {
    const peopleDetails = await fetchPeopleDetails(id);
    return <PeopleDetail peopleDetails={peopleDetails} />;
  } catch (error) {
    const err = error as ErrorData;
    return <ErrorHandling error={err} callback={() => fetchPeopleDetails(id)} />;
  }
}

export default async function People({ params }: PeoplePageProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<Loading />}>
      <PeopleContent id={id} />
    </Suspense>
  )
}