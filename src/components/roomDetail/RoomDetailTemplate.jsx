import React, { useState, useEffect } from 'react';
import Photos from './Photos';
import Introduction from './Introduction';
import Title from './Title';
import Icons from './Icons';
import Description from './Description';
import CalendarDetail from './CalendarDetail';
import Payment from './Payment';
import Beds from './Beds';
import Reviews from './Reviews';
import Map from './Map';
import Host from './Host';
import ThingsToKnow from './ThingsToKnow';
import RoomDetailHeader from './RoomDetailHeader';
import RoomDetailReviewModal from './RoomDetailReviewModal';
import RoomDetailSafetyModal from './RoomDetailSafetyModal';
import RoomDetailRefundModal from './RoomDetailRefundModal';
import RoomDetailGuestEditPopup from './RoomDetailGuestEditPopup';
import RoomDetailDateEditPopup from './RoomDetailDateEditPopup';
import AccommodationHeaderContainer from '../../containers/AccommodationContainer';
import CommonFooter from '../common/CommonFooter';

const RoomDetailTemplate = ({
  accommodation,
  loading,
  postBookmark,
  deleteBookmark,
}) => {
  const {
    gu,
    address,
    title,
    bathroomNum,
    bedroomNum,
    bedNum,
    capacity,
    price,
    latitude,
    longitude,
    transportationDesc,
    accommodationDesc,
    rating,
    reviewNum,
    accommodationType,
    buildingType,
    hostName,
    hostDesc,
    hostReviewNum,
    reviews,
    accommodationPictures,
    bookedDateDtos,
    bookmarked,
  } = accommodation;

  // 숙박 인원 수 상태관리
  const [count, setCount] = useState({
    adultNum: 0,
    childNum: 0,
    infantNum: 0,
  });

  // 모달, 팝업창 상태관리
  const [visible, setVisible] = useState({
    state: false,
    scroll: true,
    type: null,
  });

  // 스크롤 헤더 상태관리
  const [scrollHeader, setScrollHeader] = useState({
    visible: false,
    button: false,
  });

  // 타입에 맞는 모달창을 보여줌
  const onShowModal = type =>
    setVisible({
      ...visible,
      state: true,
      scroll: false,
      type,
    });

  // 타입에 맞는 Payment 관련 팝업창을 보여줌
  const onShowPopup = type =>
    setVisible({
      ...visible,
      state: true,
      type,
    });

  // 타입에 맞는 모달창을 닫음
  const onCloseModal = ({ target }) => {
    if (target.dataset.name === 'close') {
      setVisible({
        ...visible,
        state: false,
        scroll: true,
      });
    }
  };

  // // 검색 시작 하기 눌렀을 시 모달 초기 상태
  // 유저 메뉴 -> 로그인, 회원가입 모달 초기상태,
  // 하나의 모달 회원가입 폼 모달 띄우는것 때문에 생각정리안된게있어서 일단 객체 상태로 냅둠!
  const [authVisible, setAuthVisible] = useState({
    // 'login' or 'register'
    type: null,
  });

  // 스크롤 시 Photos 컴포넌트를 지나면 navigation header 보이기
  // 스크롤 시 후기 컴포넌트를 지나면 navigation header에 예약하기 버튼 보이기
  window.onscroll = () => {
    const pageY = window.pageYOffset;
    if (pageY < 600) {
      setScrollHeader({ ...scrollHeader, visible: false });
    } else if (600 < pageY && pageY < 2900) {
      setScrollHeader({ ...scrollHeader, visible: true, button: false });
    } else if (pageY > 2900) {
      setScrollHeader({ ...scrollHeader, visible: true, button: true });
    }
  };

  // 모달창 팝업시 body 스크롤 방지
  useEffect(() => {
    if (!visible.scroll) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [visible.scroll]);

  return (
    <>
      {visible.type === 'review' && visible.state && (
        <RoomDetailReviewModal
          onCloseModal={onCloseModal}
          rating={rating}
          reviewNum={reviewNum}
          reviews={reviews}
        />
      )}
      {visible.type === 'safety' && visible.state && (
        <RoomDetailSafetyModal onCloseModal={onCloseModal} />
      )}
      {visible.type === 'refund' && visible.state && (
        <RoomDetailRefundModal onCloseModal={onCloseModal} />
      )}
      {scrollHeader.visible === false && (
        <AccommodationHeaderContainer
          authVisible={authVisible}
          setAuthVisible={setAuthVisible}
        />
      )}
      {scrollHeader.visible && (
        <RoomDetailHeader
          scrollHeader={scrollHeader}
          authVisible={authVisible}
          setAuthVisible={setAuthVisible}
        />
      )}
      {loading === false && (
        <div className="max-w-full mt-32" id="photos">
          <div className="mx-48 px-32">
            <Title
              title={title}
              rating={rating}
              reviewNum={reviewNum}
              address={address}
              bookmarked={bookmarked}
              postBookmark={postBookmark}
              deleteBookmark={deleteBookmark}
            />
            <Photos accommodationPictures={accommodationPictures} />
          </div>
          <div className="mx-48 px-32 mt-4.8rem flex justify-between">
            <div className="w-3/5">
              <Introduction
                hostName={hostName}
                buildingType={buildingType}
                capacity={capacity}
                bedroomNum={bedroomNum}
                bedNum={bedNum}
                bathroomNum={bathroomNum}
              />
              <Icons
                accommodationType={accommodationType}
                buildingType={buildingType}
              />
              <Description accommodationDesc={accommodationDesc} />
              <Beds bedroomNum={bedroomNum} bedNum={bedNum} />
              <CalendarDetail gu={gu} bookedDateDtos={bookedDateDtos} />
            </div>
            <div className="w-1/3 h-full sticky top-44">
              <Payment
                rating={rating}
                reviewNum={reviewNum}
                price={price}
                visible={visible}
                onShowPopup={onShowPopup}
                onCloseModal={onCloseModal}
                count={count}
                authVisible={authVisible}
                setAuthVisible={setAuthVisible}
              />
              {visible.type === 'calendar' && visible.state && (
                <RoomDetailDateEditPopup
                  onCloseModal={onCloseModal}
                  setVisible={setVisible}
                  visible={visible}
                  bookedDateDtos={bookedDateDtos}
                />
              )}
              {visible.type === 'guest' && visible.state && (
                <RoomDetailGuestEditPopup
                  onCloseModal={onCloseModal}
                  setVisible={setVisible}
                  visible={visible}
                  count={count}
                  setCount={setCount}
                />
              )}
            </div>
          </div>
          <div className="mx-48 px-32">
            <Reviews
              rating={rating}
              reviewNum={reviewNum}
              reviews={reviews}
              onShowModal={onShowModal}
            />
            <Map
              address={address}
              latitude={latitude}
              longitude={longitude}
              transportationDesc={transportationDesc}
            />
            <Host
              hostName={hostName}
              hostDesc={hostDesc}
              hostReviewNum={hostReviewNum}
            />
            <ThingsToKnow onShowModal={onShowModal} />
          </div>
        </div>
      )}
      <CommonFooter />
    </>
  );
};

export default RoomDetailTemplate;
