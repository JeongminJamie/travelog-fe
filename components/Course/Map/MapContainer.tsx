import React, { useState } from "react";
import { DateRangePickerProps } from "react-date-range";
import { useLoadScript } from "@react-google-maps/api";

import Map from "./Map";
import Places from "./Places";

import classnames from "classnames/bind";
import styles from "./MapContainer.module.css";

const cx = classnames.bind(styles);
const LIBRARIES: any[] = ["places", "geometry"];

interface Props {
  dateData: { [date: string]: any[] };
  dateRange: DateRangePickerProps["ranges"];
  isDateConfirmed: {};
  isSaved: { [placeId: string]: boolean };
  setIsSaved: React.Dispatch<
    React.SetStateAction<{ [placeId: string]: boolean }>
  >;
  setDateData: React.Dispatch<React.SetStateAction<{ [date: string]: any[] }>>;
}
const MapContainer = ({
  dateData,
  dateRange,
  isDateConfirmed,
  isSaved,
  setIsSaved,
  setDateData,
}: Props) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: LIBRARIES,
  });

  const [selected, setSelected] = useState<any>(null);
  const [placeDetails, setPlaceDetails] = useState<any[]>([]);
  const [isNewSelection, setIsNewSelection] = useState(true);

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div className={cx("entire-map-container")}>
      <input className={cx("course-title")} placeholder="제목" required />
      <div className={cx("place-map-container")}>
        <Places
          dateData={dateData}
          dateRange={dateRange}
          isDateConfirmed={isDateConfirmed}
          setDateData={setDateData}
          setSelected={setSelected}
          placeDetails={placeDetails}
          setIsNewSelection={setIsNewSelection}
          isSaved={isSaved}
          setIsSaved={setIsSaved}
        />
        <Map
          selected={selected}
          setPlaceDetails={setPlaceDetails}
          placeDetails={placeDetails}
          isNewSelection={isNewSelection}
        />
      </div>
    </div>
  );
};

export default MapContainer;
