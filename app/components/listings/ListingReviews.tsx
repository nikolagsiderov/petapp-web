"use client";

import { Review } from "pawpal-fe-types";
import Avatar from "../Avatar";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { format } from "date-fns";

interface ListingReviewsProps {
  reviews?: Review[] | null | undefined;
}

const ListingReviews: React.FC<ListingReviewsProps> = ({ reviews }) => {
  // TODO: Handle calculation logic in BE
  // When requesting current listing to API, the Listing object should have an array property Reviews[]
  // The Listing object should also have a property for: TotalReviewsScore as type double
  // In the Listing object array property Reviews[]:
  // Each Review object should have a property of TotalScore as type double, the value of this property
  // Should be equal to (review.accuracyScore + review.communicationScore + review.someOtherKindOfScore + etc...) / n
  const calculateTotalScore = () => {
    let result = 0;

    if (reviews) {
      for (let index = 0; index < reviews.length; index++) {
        const review = reviews[index];
        let currentReviewScore =
          (review.accuracyScore + review.communicationScore) / 2;
        result += currentReviewScore;
      }
    }

    return result;
  };

  const totalScoreView = () => {
    const totalScore = calculateTotalScore();

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
  };

  const getCreatedAtDateFormatted = (review: Review) => {
    if (!review.createdAt) {
      return null;
    }

    return `${format(new Date(review.createdAt), "PPpp")}`;
  };

  return (
    <>
      {reviews && (
        <div className="flex flex-col gap-8">
          <hr />
          {reviews.length > 0 ? (
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
                  {totalScoreView()}
                </div>
                <div>
                  Обща оценка от {reviews.length}{" "}
                  {reviews.length > 1 ? "отзива" : "отзив"}
                </div>
              </div>
              {reviews.map((review: Review) => (
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
                        {review.user.name}
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
