import { useState } from 'react';
import './FormPage';
import { Segment } from '../../components/Segment/Segment';
import { Input } from '../../components/Input/Input';
import { Textarea } from '../../components/Textaria/Textaria';

export function FormPage() {
  const [state, setState] = useState<Record<string, string>>({
    name: '',
    nick: '',
    description: '',
    text: '',
  });

  return (
    <Segment title="СТРАНИЦА ФОРМЫ" size={2} description="">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.info('Submitted', state);
        }}
      >
        <Input name="name" label="Name" state={state} setState={setState} />
        <Input name="nick" label="Nick" state={state} setState={setState} />
        <Input name="description" label="description" state={state} setState={setState} />
        <Textarea name="text" label="text" state={state} setState={setState} />

        <button type="submit">Create Idea</button>
      </form>
    </Segment>
  );
}
