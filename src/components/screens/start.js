import React, { useState } from 'react';
import {
    Box,
    Heading,
    Text,
    Button,
    FormLabel,
    Tooltip,
    Flex,
} from '@chakra-ui/react';
import lvls from '../../levels';

const Start = ({ setDiffLvl, setLiveGame }) => {
    const [pickedLvl, setPickedLvl] = useState(null);

    const startGame = () => {
        setDiffLvl(pickedLvl);
        setLiveGame(true);
    };

    return (
        <Box>
            <Heading>Math Game!</Heading>
            <Text my={2}>
                When you start the game, numbers will appear at a certine pace.
                <br />
                You must sum them all and answer the RIGHT guess at the end.
            </Text>
            <FormLabel mt={3}>Pick your pace:</FormLabel>
            <Flex flexDirection={'column'}>
                <Flex justify={'center'} gap={4}>
                    {Object.keys(lvls).map((key, index) => (
                        <Tooltip
                            label={lvls[key].tooltip}
                            key={index}
                            rounded={'md'}
                        >
                            <Button
                                _hover={{
                                    backgroundColor: lvls[key].color,
                                    color: 'white',
                                }}
                                bg={
                                    pickedLvl === key
                                        ? lvls[key].color
                                        : 'gray.100'
                                }
                                color={pickedLvl === key && 'white'}
                                onClick={() => setPickedLvl(lvls[key])}
                            >
                                {lvls[key].label}
                            </Button>
                        </Tooltip>
                    ))}
                </Flex>
                <Text as={'small'} color={'gray.500'}>
                    (Tip: Hover on each diffculty level to see it's settings.)
                </Text>
            </Flex>
            {pickedLvl && (
                <Button
                    onClick={startGame}
                    mt={5}
                    colorScheme={pickedLvl.color}
                >
                    Start Game @ {pickedLvl.label}
                </Button>
            )}
        </Box>
    );
};

export default Start;
