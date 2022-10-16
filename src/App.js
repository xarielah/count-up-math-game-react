import React, { useState } from 'react';
import { Start, Game, EndGame } from './components/screens';
import { Flex, useToast } from '@chakra-ui/react';

function App() {
    const [live, setLive] = useState(false);
    const [end, setEnd] = useState(false);
    const [diffLvl, setDiffLvl] = useState(null);
    const [winOrLose, setWinOrLose] = useState(false); // False = lose || True = win

    const toast = useToast();

    const stopReset = () => {
        setLive(false);
        setEnd(false);
        setDiffLvl(null);
        toast({
            title: 'Stopped & Reset',
            description: 'Game has been stopped and reset.',
            variant: 'left-accent',
            position: 'top',
            colorScheme: 'red',
            status: 'error',
        });
    };

    const applyStatus = (boolean) => {
        setLive(false);
        setEnd(true);
        if (boolean === true) {
            setWinOrLose(true); // win
        } else {
            setWinOrLose(false); // lose
        }
    };

    return (
        <Flex justify={'center'} align={'center'} w='100vw'>
            {!live && !end && (
                <Start
                    setDiffLvl={(lvl) => setDiffLvl(lvl)}
                    setLiveGame={(boolean) => setLive(boolean)}
                />
            )}
            {live && !end && (
                <Game
                    toast={toast}
                    applyStatus={applyStatus}
                    stopReset={stopReset}
                    diffLvl={diffLvl}
                />
            )}
            {end && !live && <EndGame winOrLose={winOrLose} />}
        </Flex>
    );
}

export default App;
