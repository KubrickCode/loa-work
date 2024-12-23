import dayjs from "dayjs";

export const formatDateTime = (date?: Date | null) =>
  date ? dayjs(date).format("YYYY-MM-DD HH:mm") : "정보 없음";
