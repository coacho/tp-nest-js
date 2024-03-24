export interface Tetrimino {
    shape: number[][];
    color: string;
}

export const Tetrimino: Tetrimino[] = [
    // {
    //     shape: [
    //         [1, 1, 1, 1]
    //     ],
    //     color: 'cyan'
    // },
    {
        shape: [
            [1, 1, 1],
            [0, 1, 0]
        ],
        color: 'blue'
    }//,
    // {
    //     shape: [
    //         [0, 1, 1],
    //         [1, 1, 0]
    //     ],
    //     color: 'orange'
    // },
    // {
    //     shape: [
    //         [1, 1, 1],
    //         [0, 0, 1]
    //     ],
    //     color: 'yellow'
    // },
    // {
    //     shape: [
    //         [1, 1, 0],
    //         [0, 1, 1]
    //     ],
    //     color: 'green'
    // },
    // {
    //     shape: [
    //         [0, 1, 1],
    //         [1, 1, 0]
    //     ],
    //     color: 'purple'
    // },
    // {
    //     shape: [
    //         [1, 1],
    //         [1, 1]
    //     ],
    //     color: 'red'
    // }
];
