import { Alert } from '../Alert/Alert';
import { Segment } from '../Segment/Segment';

export const ErrorPageComponent = ({
  title = 'Ой, ошибка',
  message = 'Что то пошло не так',
}: {
  title?: string;
  message?: string;
}) => {
  return (
    <Segment title={title}>
      <Alert color="red">{message}</Alert>
    </Segment>
  );
};
