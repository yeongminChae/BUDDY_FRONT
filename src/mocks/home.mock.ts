import type { HomeSession } from "../shared/types/home";

export const homeSessionMock: HomeSession[] = [
  {
    sessionId: 1,
    title: "English Tuesday Session",
    dateTime: "5월 10일 오후 7:00",
    place: "잠실 스터디룸",
    participant: "8 / 12",
    joined: true
  },
  {
    sessionId: 2,
    title: "Weekend Free Talking",
    dateTime: "5월 12일 오후 3:00",
    place: "성수 스터디룸",
    participant: "6 / 10",
    joined: false
  },
  {
    sessionId: 3,
    title: "Networking Meetup",
    dateTime: "5월 20일 오후 7:00",
    place: "홍대 카페",
    participant: "10 / 14",
    joined: true
  }
];
