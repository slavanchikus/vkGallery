export const unixstampConverter = (stamp) => {
  const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  const date = new Date(stamp * 1000);
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();
  return `${day} ${month} ${year}`;
};
