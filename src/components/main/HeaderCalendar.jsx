import React from 'react';
import { DayPickerRangeController } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import 'moment/locale/ko';
import SVG from '../../assets/svg';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const HeaderCalendar = ({dateRange, handleOnDateChange, focus, setFocus}) => {
  const { startDate, endDate } = dateRange;
  // moment-range를 통해 moment 생성 함수를 받아온다 -> moment() 호출 시 moment객체 생성
  const moment = extendMoment(Moment);

  // 오늘 이전 날짜 비활성화
  const isOutsideRange = (day = moment()) => {
    return moment().diff(day, 'days') > 0;
  };

  return (
    <>
      <DayPickerRangeController
        isOutsideRange={isOutsideRange} // 이전 날짜 비활성화
        startDate={startDate} // 체크인 날짜
        onDatesChange={handleOnDateChange} // 날짜 변경
        endDate={endDate} // 체크아웃 날짜
        numberOfMonths={2}
        focusedInput={focus}
        onFocusChange={focus => setFocus(focus || 'startDate')} // 포커스 변경
        minimumNights={0}
        monthFormat="YYYY년 MMMM"
        navPrev={
          <div className="DayPickerNavigation_button__horizontalDefault DayPickerNavigation_leftButton__horizontalDefault">
            <SVG name="prev" width="10px" height="10px" viewBox="0 0 18 18" />
          </div>
        }
        navNext={
          <div className="DayPickerNavigation_button__horizontalDefault DayPickerNavigation_rightButton__horizontalDefault">
            <SVG name="next" width="10px" height="10px" viewBox="0 0 18 18" />
          </div>
        }
      />
    </>
  );
};
export default HeaderCalendar;
