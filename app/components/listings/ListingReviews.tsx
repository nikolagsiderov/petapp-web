"use client";

import Avatar from "../Avatar";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { getListingReviews } from "pawpal-fe-common/reviews";

interface ListingReviewsProps {
  targetItemId: string;
}

const ListingReviews: React.FC<ListingReviewsProps> = ({ targetItemId }) => {
  const [reviewsData, setReviewsData] = useState<any>(null);

  useEffect(() => {
    const fetchReviewsDataAsync = async () => {
      const reviewsData = await getListingReviews(targetItemId);
      setReviewsData(reviewsData);
    };

    fetchReviewsDataAsync();
  }, []);

  const totalScoreView = useMemo(() => {
    const totalScore = reviewsData?.totalScore ?? 0;

    if (totalScore === 1) {
      return <FaStar size={32} className="fill-amber-500" />;
    } else if (totalScore >= 1 && totalScore < 2) {
      return (
        <>
          <FaStar size={32} className="fill-amber-500" />
          <FaStarHalfAlt size={32} className="fill-amber-500" />
        </>
      );
    } else if (totalScore === 2) {
      return (
        <>
          <FaStar size={32} className="fill-amber-500" />
          <FaStar size={32} className="fill-amber-500" />
        </>
      );
    } else if (totalScore >= 2 && totalScore < 3) {
      return (
        <>
          <FaStar size={32} className="fill-amber-500" />
          <FaStar size={32} className="fill-amber-500" />
          <FaStarHalfAlt size={32} className="fill-amber-500" />
        </>
      );
    } else if (totalScore === 3) {
      return (
        <>
          <FaStar size={32} className="fill-amber-500" />
          <FaStar size={32} className="fill-amber-500" />
          <FaStar size={32} className="fill-amber-500" />
        </>
      );
    } else if (totalScore >= 3 && totalScore < 4) {
      return (
        <>
          <FaStar size={32} className="fill-amber-500" />
          <FaStar size={32} className="fill-amber-500" />
          <FaStar size={32} className="fill-amber-500" />
          <FaStarHalfAlt size={32} className="fill-amber-500" />
        </>
      );
    } else if (totalScore === 4) {
      return (
        <>
          <FaStar size={32} className="fill-amber-500" />
          <FaStar size={32} className="fill-amber-500" />
          <FaStar size={32} className="fill-amber-500" />
          <FaStar size={32} className="fill-amber-500" />
        </>
      );
    } else if (totalScore >= 4 && totalScore < 5) {
      return (
        <>
          <FaStar size={32} className="fill-amber-500" />
          <FaStar size={32} className="fill-amber-500" />
          <FaStar size={32} className="fill-amber-500" />
          <FaStar size={32} className="fill-amber-500" />
          <FaStarHalfAlt size={32} className="fill-amber-500" />
        </>
      );
    }

    return (
      <>
        <FaStar size={32} className="fill-amber-500" />
        <FaStar size={32} className="fill-amber-500" />
        <FaStar size={32} className="fill-amber-500" />
        <FaStar size={32} className="fill-amber-500" />
        <FaStar size={32} className="fill-amber-500" />
      </>
    );
  }, [reviewsData]);

  const getCreatedAtDateFormatted = (review: any) => {
    if (!review.createdAt) {
      return null;
    }

    return `${format(new Date(review?.createdAt), "PPpp")}`;
  };

  return (
    <>
      {reviewsData?.success && reviewsData?.reviews && (
        <div className="flex flex-col gap-8">
          <hr />
          {reviewsData?.reviews.length > 0 ? (
            <>
              <div
                className="
              text-xl
              font-semibold
              flex 
              flex-col 
              items-center
              justify-center
              gap-2
            "
              >
                <div className="flex flex-row gap-1 text-lg font-semibold items-center justify-end">
                  {totalScoreView}
                </div>
                <div>
                  Обща оценка от {reviewsData?.reviewsCount}{" "}
                  {reviewsData?.reviewsCount > 1 ? "отзива" : "отзив"}
                </div>
              </div>
              {reviewsData?.reviews.map((review: any) => (
                <div key={review.id} className="mb-4">
                  <div
                    className="
        text-lg font-light text-neutral-800"
                  >
                    <div className="grid grid-cols-12 mb-2">
                      <div className="col-span-9 flex flex-row gap-4 text-lg font-semibold items-center justify-start">
                        <Avatar
                          width={50}
                          height={50}
                          // src={review.user.image} // TODO: GET user image once images microservice is implemented...
                        />
                        {review.reviewer.firstName} {review.reviewer.lastName}
                      </div>
                      <div className="col-span-3 flex flex-col gap-1 text-lg items-end">
                        <div className="flex flex-row gap-1 text-lg font-semibold items-center">
                          <FaStar size={30} className="fill-amber-500" />
                          <span className="mt-2">
                            {(review.accuracyScore +
                              review.communicationScore) /
                              2}
                            /5
                          </span>
                        </div>
                        <div className="text-xs font-normal items-center">
                          {getCreatedAtDateFormatted(review)}
                        </div>
                      </div>
                    </div>
                    <div className="whitespace-pre-wrap">
                      {review.publicMessage}
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div
              className="
            text-xl
            font-light
            flex 
            flex-col 
            items-center
            justify-center
            gap-2
          "
            >
              Тази обява все още няма отзиви.
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ListingReviews;
