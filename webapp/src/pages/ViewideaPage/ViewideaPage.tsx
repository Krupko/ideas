import './ViewIdeaPage.scss';
import { useParams } from 'react-router-dom';
import { LinkButton } from '../../components/Button/Button';
import { getEditIdeaRoute, type ViewIdeaRouteParams } from '../../lib/routes';
import { trpc } from '../../lib/trpc';
import { Segment } from '../../components/Segment/Segment';
import { format } from 'date-fns/format';
import { withPageWrapper } from '../../lib/pageWrapper';

export const ViewideaPage = withPageWrapper({
  useQuery: () => {
    const { ideaNick } = useParams() as ViewIdeaRouteParams;
    return trpc.getIdea.useQuery({
      ideaNick,
    });
  },

  checkExists: ({ queryResult }) => !!queryResult.data.idea,
  checkExistsMessage: 'ИДЕЯ НЕ НАЙДЕНА',
  setProps: ({ queryResult, ctx }) => ({
    idea: queryResult.data.idea!,
    me: ctx.me,
  }),
})(({ idea, me }) => (
  <Segment title="* 2 страница *" description={idea.name}>
    {/* <p>{data.idea.nick}</p> */}
    <div>
      <p className="title-view2">Дата поста: {format(idea.createdAt, 'dd-MM-yyyy')}</p>
      <p className="author-name">Автор: {idea.author.nick}</p>
      <p className="text-view">{idea.email}</p>
      <p>Описание идеи</p>
      <p dangerouslySetInnerHTML={{ __html: idea.text }} />
    </div>

    {me?.id === idea.authorId && (
      <div>
        <LinkButton to={getEditIdeaRoute({ ideaNick: idea.nick })}>РЕДАКТИРОВАТЬ ИДЕЮ</LinkButton>
      </div>
    )}
  </Segment>
));
