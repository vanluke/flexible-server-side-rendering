import * as React from 'react';
import styled from 'styled-components';

const Header = styled.header`
  color: green;
`;

const Home: React.FunctionComponent = () => {
  return (
    <Header>
      <h3>Home</h3>
    </Header>
  );
};

export default Home;
