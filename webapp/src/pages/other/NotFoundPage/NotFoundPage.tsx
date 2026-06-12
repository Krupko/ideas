import { ErrorPageComponent } from '../../../components/ErrorPageComponent/ErrorPageComponent';

export const NotFoundPage = ({
  title = 'Не найдено',
  message = 'Этой страницы не существует - 404',
}: {
  title?: string;
  message?: string;
}) => <ErrorPageComponent title={title} message={message} />;
