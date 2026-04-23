import _ from 'lodash';

interface Idea {
  name: string;
  nick: string;
  description: string;
  isActive: boolean;
  email: string;
  text: string;
}
export let ideas: Idea[] = _.times(30, (i) => ({
  name: `Анна Смирнова ${i}`,
  nick: `${i}`,
  description: `${i} Igor`,
  isActive: true,
  email: `${i} anna.s@example.com`,
  text: _.times(30, (j) => `<p>Основной текст раздела ${j} от кандидата ${i}...</p>`).join('\n'),
}));
