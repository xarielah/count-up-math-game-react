import React, { useEffect, useState } from 'react';
import { Box, Text, Input, Flex, Heading, Button } from '@chakra-ui/react';

const Game = ({ diffLvl, stopReset, toast, applyStatus }) => {
    // Stop and reset logic
    // Make numbers pop and fade out at the correct time by diffLvl.duration
    // End after count reaches diffLvl.count

    const [arrNums, setArrNums] = useState([]);
    const [sum, setSum] = useState(0);
    const [count, setCount] = useState(0);
    const [countDown, setCountDown] = useState(diffLvl.count);
    const [done, setDone] = useState(false);
    const [guessValue, setGuessValue] = useState('');
    const [tries, setTries] = useState(3);
    const [areYouReady, setAreYouReady] = useState(true);

    const toastTemplate = (props) =>
        toast({
            ...props,
            variant: 'left-accent',
            position: 'bottom',
            duration: 1500,
            status: 'warning',
        });

    const sumAll = (arr) => {
        arr.forEach((num) => setSum((prev) => prev + num));
    };

    const resetGame = () => {
        setArrNums([]);
        setSum(0);
        setCount(0);
        setDone(false);
        setGuessValue('');
        setTries(3);
        stopReset();
    };

    useEffect(() => {
        if (areYouReady) {
            setTimeout(() => {
                setAreYouReady(false);
            }, 3000);
        }

        if (arrNums.length === 0) {
            let arr = [];
            while (arr.length !== diffLvl.count) {
                const rnd = Math.floor(Math.random() * 10);
                arr.push(rnd);
            }

            setArrNums(arr);
        }

        if (!areYouReady && count < diffLvl.count && sum === 0) {
            setTimeout(() => {
                if (count === diffLvl.count - 1) {
                    sumAll(arrNums);
                    setDone(true);
                } else {
                    setCount((prev) => prev + 1);
                    setCountDown(countDown - 1);
                }
            }, diffLvl.duration);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count, areYouReady]);

    const checkGuess = () => {
        const onlyNums = new RegExp(/^\d+$/);
        if (onlyNums.test(guessValue)) {
            const intValue = parseInt(guessValue);
            if (intValue === sum) {
                applyStatus(true); // true === win
            } else {
                setTries(tries - 1);
                if (tries - 1 !== 0) {
                    toastTemplate({
                        title: 'Wrong guess, sorry',
                        description: `You got ${tries - 1} more to go.`,
                    });
                }
                if (tries - 1 === 0) {
                    applyStatus(false); // false === lose
                }
            }
        } else {
            if (guessValue === '') {
                toastTemplate({
                    title: 'Input Error',
                    description: 'Input cannot be empty.',
                });
            } else {
                toastTemplate({
                    title: 'Input Error',
                    description: 'Only numbers please and thank you!',
                });
            }
        }
    };

    if (areYouReady) return <Heading fontSize={'4em'}>Ready?</Heading>;
    if (arrNums.length !== diffLvl.count) return <div>Loading...</div>;
    if (!done) {
        return (
            <Flex
                flexDirection={'column'}
                w={'100%'}
                h={'300px'}
                justify={'center'}
                align={'center'}
                position={'relative'}
            >
                <Button
                    onClick={resetGame}
                    variant='link'
                    color={'red.500'}
                    fontWeight={'normal'}
                    position='absolute'
                    top={0}
                >
                    Stop and Reset
                </Button>
                <Box>
                    <Heading fontSize={'12em'}>{arrNums[count]}</Heading>
                </Box>
                {countDown > 0 && (
                    <Text as={'small'}>
                        There {countDown === 1 ? 'is' : 'are'} {countDown} more{' '}
                        {countDown === 1 ? 'number' : 'numbers'} to go.
                    </Text>
                )}
            </Flex>
        );
    } else
        return (
            <Flex gap={10} flexDirection={'column'}>
                <Heading>Do you have any guess?</Heading>

                <Box>
                    <Input
                        type={'number'}
                        borderRadius={'full'}
                        boxShadow={'0 5px 15px #3e3e3e22'}
                        mt={1}
                        placeholder={'Number only please :)'}
                        onChange={(e) => setGuessValue(e.target.value)}
                        onKeyDown={(evt) =>
                            evt.key === 'e' && evt.preventDefault()
                        }
                    />
                    <Text as={'small'} color={'purple.300'}>
                        You have {tries} tries left.
                    </Text>
                </Box>
                <Flex flexDirection={'column'} gap={2}>
                    <Button
                        borderRadius={'full'}
                        colorScheme={'purple'}
                        variant={'outline'}
                        w={'max-content'}
                        m={'0 auto'}
                        onClick={checkGuess}
                    >
                        Check my guess
                    </Button>
                    <Button
                        onClick={resetGame}
                        variant='link'
                        color={'red.500'}
                        fontWeight={'normal'}
                    >
                        Reset Game
                    </Button>
                </Flex>
            </Flex>
        );
};

export default Game;
