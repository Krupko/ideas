import { useParams } from "react-router-dom";

export const ViewideaPage = () => {
  const { ideaNick } = useParams() as { ideaNick: string };
  return (
    <div>
      <h1>* 2 страница *</h1>
      <h2>{ideaNick}</h2>
      <p>Описание второй страницы</p>
      <div>
        <p>Текст самой идеи</p>
        <p>Описание идеи</p>
        <p>Комментарии к идеи</p>
      </div>
    </div>
  );
};
