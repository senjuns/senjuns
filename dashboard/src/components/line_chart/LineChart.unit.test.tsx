import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as ShallowRenderer from 'react-test-renderer/shallow';
import config from '../../shared/config';
import LineChart from './LineChart';

const httpLink = createHttpLink({
  uri: config.aws_hasura_graphqlEndpoint,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'x-hasura-admin-secret':
        process.env.REACT_APP_HASURA_GRAPHQL_ADMIN_SECRET,
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

describe('<LineChart />', () => {
  it('renders correctly.', async () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(
      <ApolloProvider client={client}>
        <LineChart systemId={2} />
      </ApolloProvider>
    );

    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
