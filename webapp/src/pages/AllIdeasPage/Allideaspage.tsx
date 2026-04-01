import "./Allideaspage.scss";
import { getViewIdeaRoute } from "../../lib/routes";
import { trpc } from "../../lib/trpc";
import { Link } from "react-router-dom";

export const AllIdeasPage = () => {
  const { data, error, isLoading, isError } = trpc.getIdeas.useQuery();

  if (isLoading) {
    return <span>Loading.....</span>;
  }

  if (isError) {
    return <span>Error:{error.message}</span>;
  }

  return (
    <div>
      <h1 className="title">Просто вывод списка</h1>
      {data?.ideas?.map((idea) => (
        <div key={idea.nick}>
          <h2 className="title2">
            <Link to={getViewIdeaRoute({ ideaNick: idea.nick })}>
              {idea.name}
            </Link>
          </h2>
          <p className="title3">{idea.email}</p>
        </div>
      ))}
    </div>
  );
};
