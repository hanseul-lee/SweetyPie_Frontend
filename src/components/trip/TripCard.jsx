import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const TripCard = ({
  accomodationPicture,
  checkInDate,
  checkoutDate,
  title,
  city,
  gu,
  isWrittenReview,
  showModal,
  tab,
}) => {
  // // 쿼리 스트링
  // const location = useLocation();
  // const { tab } = queryStirng.parse(location.search);

  return (
    <li className="px-6 w-1/3">
      <div className="mt-6 mb-8 rounded-2xl shadow-before hover:transition-shadow hover:shadow-after">
        <Link to="/room">
          <div>
            <img
              src={accomodationPicture}
              alt="#"
              className="h-72 w-full rounded-t-2xl object-cover"
            />
          </div>
        </Link>
        <div className="flex flex-col flex-grow mt-10">
          <div className="text-1.2rem text-#717171 px-10">
            {`${checkInDate} - ${checkoutDate}`}
          </div>
          <p className="text-2.2rem font-semibold my-2 px-10 truncate">
            {gu && `${gu}`} {city && `,${city}`}
          </p>
          <div className="mt-2 flex flex-col flex-1">
            <div className="flex flex-row items-center h-24 px-10">
              <img
                src={accomodationPicture}
                alt="#"
                className="h-16 w-16 rounded-xl mr-6"
              />
              <p className="text-1.4rem truncate flex-1">{title}</p>
            </div>
            {tab === 'past' ? (
              <div
                onClick={showModal}
                className="text-1.4rem h-24 flex flex-row items-center rounded-b-2xl justify-center border-t border-gray-300 font-semibold cursor-pointer hover:transition-all hover:bg-#f7f7f7"
              >
                {isWrittenReview ? '리뷰 쓰기' : '내 리뷰 보기'}
              </div>
            ) : (
              <Link to="/booking">
                <div className="text-1.4rem h-24 flex flex-row items-center rounded-b-2xl justify-center border-t border-gray-300 font-semibold cursor-pointer hover:transition-all hover:bg-#f7f7f7">
                  예약 내역 수정하기
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default TripCard;
