import { graphql } from 'graphql';
import { schema } from '../index';

function gql(s: TemplateStringsArray): string {
  return s.join('');
}

describe('test query', () => {
  it('check hello query', async () => {
    const res = await graphql({
      schema,
      source: gql`
        query {
          hello
        }
      `,
      contextValue: { ip: '123' },
    });
    expect(res).toEqual({ data: { hello: 'Hello, 123' } });
  });

  it('check user query', async () => {
    const res = await graphql({
      schema,
      source: gql`
        query($id: Int!) {
          user(id: $id) {
            name
            ip
          }
        }
      `,
      contextValue: { ip: '123' },
      variableValues: { id: 789 },
    });
    expect(res).toEqual({ data: { user: { ip: '123', name: 'User789' } } });
  });
});
