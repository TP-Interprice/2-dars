import React, { useState } from "react";
import "./Game.css";

const Game = () => {
    const [turn, setTurn] = useState('x')
    const [cells, setCells] = useState(Array(9).fill(''))
    const [winner, setWinner] = useState()

    const checkForWinner = (squares) => {
        let matrices = {
            accros: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
            ],
            down: [
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
            ],
            diagnol: [
                [0, 4, 8],
                [2, 4, 6],
            ],
        }

        for(let matrix in matrices) {
            matrices[matrix].forEach(element => {
                if(
                    squares[element[0]] === '' ||
                    squares[element[1]] === '' ||
                    squares[element[2]] === ''
                ) {
                    // empty
                } else if(
                    squares[element[0]] === squares[element[1]] && 
                    squares[element[1]] === squares[element[2]]
                ) {
                    setWinner(squares[element[0]])
                }
            });
        }
    }

    const click = (num) => {
        if(cells[num] !== '') {
            alert('already clicked')
            return
        }

        let squares = [...cells]

        if(turn === 'x'){
            squares[num] = 'x'
            setTurn('o')
        } else {
            squares[num] = 'o'
            setTurn('x')
        }

        checkForWinner(squares)
        setCells(squares)
    }
    
    const Cell = ({ num }) => {
        return <td onClick={() => click(num)}>{cells[num]}</td>
    }

    const replay = () => {
        setWinner(null)
        setCells(Array(9).fill(''))
    } 

    return (
        <div className="container">
            <table>
                <div className="winner">
                    {winner && (
                        <>
                            <p>{winner} is the winner!</p>
                        </>
                    )}
                    <p className="secret">asas</p>
               </div>
                <tbody>
                    <tr>
                        <Cell num={0}/>
                        <Cell num={1}/>
                        <Cell num={2}/>
                    </tr>
                    <tr>
                        <Cell num={3}/>
                        <Cell num={4}/>
                        <Cell num={5}/>
                    </tr>
                    <tr>
                        <Cell num={6}/>
                        <Cell num={7}/>
                        <Cell num={8}/>
                    </tr>
                </tbody>
            </table>
            {winner && (
                <>
                    <button onClick={() => replay()}>Replay</button>
                </>
            )}
        </div>
    );
};

export default Game;