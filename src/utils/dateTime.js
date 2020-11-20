import format from 'date-fns/format';
import parse from 'date-fns/parse';

const dateTimeFormat = ({date, formatIn, formatOut}) => {
  if (date) {
    const parts = date.split('.');
    const normalized = parts[0].replace('T', ' ').replace('Z', '');

    const parsedDate = parse(normalized, formatIn, new Date());

    return format(parsedDate, formatOut);
  }

  return date;
};

export default dateTimeFormat;
