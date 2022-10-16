import React from 'react';
import Confetti from 'react-confetti/';
import { useWindowSize } from 'react-use';
import { Heading, Text, Button, Flex } from '@chakra-ui/react';

const EndGame = ({ winOrLose }) => {
    const { width, height } = useWindowSize();

    if (winOrLose) {
        return (
            <Flex gap={6} flexDirection={'column'}>
                <Confetti width={width} height={height} />
                <Heading fontSize={'6em'}>You Won!</Heading>
                <Text fontSize={'xl'}>
                    Well, it might not be the lottary. But you're pretty smart!{' '}
                    <br />
                    Thank you for playing... Would you might reconsider to...
                </Text>
                <Button
                    variant={'outline'}
                    colorScheme={'green'}
                    fontSize={'1em'}
                    borderRadius={'full'}
                    w={'max-content'}
                    m={'0 auto'}
                    onClick={() => window.location.reload()}
                >
                    Play Again!
                </Button>
            </Flex>
        );
    } else {
        return (
            <Flex gap={6} flexDirection={'column'}>
                <Heading fontSize={'6em'}>You Lost!</Heading>
                <Text fontSize={'xl'}>
                    Well, Sometimes life gives you lemons, but you know what you
                    got to do... <br />
                    <b>KEEP ON PRACTICING</b>. No lemonade will get you
                    anywhere.
                    <br />I really think you should...
                </Text>
                <Button
                    variant={'outline'}
                    colorScheme={'purple'}
                    fontSize={'1em'}
                    borderRadius={'full'}
                    w={'max-content'}
                    m={'0 auto'}
                    onClick={() => window.location.reload()}
                >
                    Try Again!
                </Button>
            </Flex>
        );
    }
};

export default EndGame;
