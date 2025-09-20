export const startOfDay = (d: Date) => {
  const t = new Date(d);
  t.setHours(0, 0, 0, 0);
  return t;
};

export const endOfDay = (d: Date) => {
  const t = new Date(d);
  t.setHours(23, 59, 59, 999);
  return t;
};

// startDay: 0 = Sunday, 1 = Monday
export const startOfWeek = (d: Date, startDay: number = 0) => {
  const cur = new Date(d);
  const day = (cur.getDay() - startDay + 7) % 7;
  const start = new Date(cur);
  start.setDate(cur.getDate() - day);
  start.setHours(0, 0, 0, 0);
  return start;
};

export const endOfWeek = (d: Date, startDay: number = 0) => {
  const start = startOfWeek(d, startDay);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return end;
};

export const isSameDay = (a: Date, b: Date) =>
  startOfDay(a).getTime() === startOfDay(b).getTime();

export const isDateInRange = (d: Date, from: Date, to: Date) =>
  d.getTime() >= from.getTime() && d.getTime() <= to.getTime();