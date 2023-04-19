
    
    export default function computerTurn(grid:[0 | 'X' | 'O', 0 | 'X' | 'O', 0 | 'X' | 'O'][]) {
      //Find zeros indexes from grid

      let zeroIndexes:number[][]= []

      grid.filter((row, rowIndex) => {
        row.filter((item, index) => {
          if (item === 0) {
            zeroIndexes.push([rowIndex, index])
          }
        })
      })

      const randomElement = zeroIndexes[Math.floor(Math.random() * zeroIndexes.length)]

      return randomElement
    }
    
    