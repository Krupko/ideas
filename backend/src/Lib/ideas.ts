import _ from 'lodash';

export const ideas = _.times(30, (i) => ({
  name: `Анна Смирнова ${i}`,
  nick: `${i}`,
  isActive: true,
  email: `${i} anna.s@example.com`,
  text: _.times(30, (j) => `<p>Основной текст раздела ${j} от кандидата ${i}...</p>`).join('\n'),
}));
