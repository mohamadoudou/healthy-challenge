const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
} as const;

export const formatDate = (date: string) =>
  new Date(Number(date)).toLocaleDateString("en-US", options);
