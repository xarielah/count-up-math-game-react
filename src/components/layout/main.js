import React from 'react';
import { Container } from '@chakra-ui/react';

const Main = ({ children }) => {
    return (
        <Container
            maxW='container.xl'
            h='100vh'
            as='main'
            justify='center'
            align='center'
            display='flex'
        >
            {children}
        </Container>
    );
};

export default Main;
