import React, { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { DateRangePickerProps } from "react-date-range";
import EachDate from "./EachDate";
import classnames from "classnames/bind";
import styles from "./DateCourse.module.css";
import axiosInstance from "@/lib/axiosInstance";

const cx = classnames.bind(styles);

interface Props {
  title: string;
  dateRange: DateRangePickerProps["ranges"];
  dateData: { [date: string]: any[] };
  setDateData: React.Dispatch<React.SetStateAction<{ [date: string]: any[] }>>;
  setIsDateConfirmed: React.Dispatch<React.SetStateAction<{}>>;
  setIsSaved: React.Dispatch<
    React.SetStateAction<{ [placeId: string]: boolean }>
  >;
  token: string | null;
  setTitleInvalid: React.Dispatch<React.SetStateAction<boolean>>;
  titleRef: React.RefObject<HTMLInputElement>;
}

const DateCourse = ({
  title,
  dateRange,
  dateData,
  setDateData,
  setIsDateConfirmed,
  setIsSaved,
  token,
  setTitleInvalid,
  titleRef,
}: Props) => {
  const router = useRouter();
  const [dates, setDates] = useState<Date[]>([]);
  const [description, setDescription] = useState("");

  //get all the dates from startDate to endDate
  const getDatesBetween = (startDate: Date, endDate: Date): Date[] => {
    const dates: any = [];

    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const formatDate = (date: Date) => {
    //format date
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const dateFormatted = date.getDate();
    return `${year}년 ${month}월 ${dateFormatted}일`;
  };

  //get dates between startDate and endDate at the first render
  useEffect(() => {
    if (dateRange && dateRange.length > 0) {
      const startDate = dateRange[0]?.startDate;
      const endDate = dateRange[0]?.endDate;

      if (startDate && endDate) {
        const getDates = getDatesBetween(startDate, endDate);
        setDates(getDates);
      }
    }
  }, [dateRange]);

  const descriptionChangeHandler = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    const textareaValue = event.target.value;
    setDescription(textareaValue);
  };

  const transformCategory = (category: string) => {
    if (category === "숙소") {
      return "ACCOMMODATION";
    }
    if (category === "카페") {
      return "CAFE";
    }
    if (category === "음식점") {
      return "RESTAURANT";
    }
    if (category === "명소") {
      return "ATTRACTION";
    }
    return "ETC";
  };

  const handleCourseSave = () => {
    if (title.trim().length <= 1) {
      setTitleInvalid(true);
      window.scrollTo({top: 0, behavior: "smooth"})
      titleRef.current?.focus();
      return;
    }

    if (dateRange && dateRange.length > 0) {
      const startDate = dateRange[0]?.startDate;
      const endDate = dateRange[0]?.endDate;

      const transformedDateData = {
        title: title,
        description: description,
        startAt: startDate?.toISOString().split("T")[0],
        endAt: endDate?.toISOString().split("T")[0],
        days: Object.keys(dateData).map((date) => ({
          day: date,
          places: dateData[date].map((place) => ({
            placeName: place.name,
            placeCategory: transformCategory(place.category),
          })),
        })),
      };

      console.log("tranformedDateData", transformedDateData);

      //axios post 요청
      if (token) {
        axiosInstance
          .post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/routes/add`,
            transformedDateData,
            {
              headers: {
                Authorization: token,
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            console.log("여행 경로 등록 성공", response.status);
            router.push("/my-page");
          })
          .catch((error) => {
            console.error("여행 경로 등록 실패", error);
          });
      }
    }
  };

  return (
    <div className={cx("date-course-container")}>
      {dates.length > 0 &&
        dates.map((date: Date, index: number) => {
          return (
            <div key={index} className={cx("each-date-container")}>
              <div className={cx("date")}>{formatDate(date)}</div>
              <EachDate
                key={index}
                date={date}
                dateData={dateData}
                setDateData={setDateData}
                setIsDateConfirmed={setIsDateConfirmed}
                setIsSaved={setIsSaved}
              />
            </div>
          );
        })}
      <div className={cx("memo-button-container")}>
        <textarea
          className={cx("memo-container")}
          placeholder="이 여행 경로에 대한 메모 작성하기"
          value={description}
          onChange={descriptionChangeHandler}
        ></textarea>
        <div className={cx("button-container")}>
          <button
            className={cx("cancel-button")}
            onClick={() => router.push("/my-page")}
          >
            취소
          </button>
          <button className={cx("save-button")} onClick={handleCourseSave}>
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateCourse;
