"use client";
import EditList from "@/components/PostEdit/editList";
import { Editor } from "@/components/PostEdit/editor";
import EditTitle from "@/components/PostEdit/editTitle";
import React from "react";
import dynamic from "next/dynamic";

// const Editor = dynamic(() => import("@/components/PostEdit/editor"), {
//   ssr: false,
// });

const data = [
  {
    board: {
      id: 1,
      title: "짧은 경주여행",
      summary: "낯선사람과 떠나는 경주 여행은 어떠세요?",
      content: "1일차부터 3일차까지 정말 여유로운 코스로 계획했습니다.",
      category: "COMPANION",
      author: "John Doe",
      likeCount: 1,
      images: [
        "/png/travel1.png",
        "/png/travel2.png",
        "/png/travel3.png",
        "/png/travel4.png",
        "/png/travel5.png",
        "/png/travel6.png",
        "/png/travel7.png",
      ],
    },
    route: {
      startAt: "2024-07-24",
      endAt: "2024-07-26",
      routeDetails: {
        "2024-07-26": [
          {
            placeName: "경주 국밥 맛집",
            placeCategory: "RESTAURANT",
          },
          {
            placeName: "서울역",
            placeCategory: "ATTRACTION",
          },
        ],
        "2024-07-25": [
          {
            placeName: "경주 돈까스 맛집",
            placeCategory: "RESTAURANT",
          },
          {
            placeName: "루프탑 카페",
            placeCategory: "CAFE",
          },
          {
            placeName: "경주 황리단길 한옥펜션",
            placeCategory: "HOTEL",
          },
          {
            placeName: "경주 돈까스 맛집",
            placeCategory: "RESTAURANT",
          },
          {
            placeName: "루프탑 카페",
            placeCategory: "CAFE",
          },
          {
            placeName: "경주 황리단길 한옥펜션",
            placeCategory: "HOTEL",
          },
        ],
        "2024-07-24": [
          {
            placeName: "파스타",
            placeCategory: "RESTAURANT",
          },
          {
            placeName: "신상카페",
            placeCategory: "CAFE",
          },
          {
            placeName: "경주 5성급 호텔",
            placeCategory: "HOTEL",
          },
        ],
      },
    },
    trip: {
      ageMin: 20,
      ageMax: 30,
      targetNumber: 4,
      participantCount: 0,
      gender: "ALL",
    },
  },
];

const clientComponent = () => {
  return (
    <div className="px-20 py-10">
      <EditTitle />
      {/* <EditTitle initialData={initialData} /> */}
      <EditList data={data[0]} />
      <Editor />
    </div>
  );
};

export default clientComponent;
