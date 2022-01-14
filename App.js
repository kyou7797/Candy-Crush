import { useEffect, useState } from 'react'
import Score from './component/score'
import pic1 from './image/5.png'
import pic2 from './image/6.png'
import pic3 from './image/7.png'
import pic4 from './image/8.png'
import pic5 from './image/9.png'
import pic6 from './image/10.png'
import blank from './image/blank.png'

import { Container, Row, Col, Button, Badge } from 'react-bootstrap'

const width = 8
const candyColor = [
  pic1,
  pic2,
  pic3,
  pic4,
  pic5,
  pic6
]
const time = 30 // จำนวนจาที่เดินได้

function App() {
  const [currentColorArr, setCurrentColorArr] = useState([])
  const [squareDrag, setSquareDrag] = useState(null)
  const [squareReplace, setSquareReplace] = useState(null)
  const [scoreDisplay, setScoreDisplay] = useState(0)
  const [maxScore, setMaxScore] = useState(0)
  const [timing, setTiming] = useState(time)

  //************  การนับแต้ม  ************ 
  const fiveColCh = () => {
    for (let i = 0; i < width * 4; i++) {
      const columnFour = [i, i + width, i + width * 2, i + width * 3, i + width * 4]
      const colorPick = currentColorArr[i];
      const isBlank = currentColorArr[i] === blank

      if (columnFour.every(e => currentColorArr[e] === colorPick) && !isBlank) {
        if (timing !== time) setScoreDisplay((score) => score + 5)
        columnFour.forEach(e => currentColorArr[e] = blank)
        return true
      }
    }
  }

  const fourColCh = () => {
    for (let i = 0; i < width * 5; i++) {
      const columnFour = [i, i + width, i + width * 2, i + width * 3]
      const colorPick = currentColorArr[i];
      const isBlank = currentColorArr[i] === blank

      if (columnFour.every(e => currentColorArr[e] === colorPick) && !isBlank) {
        if (timing !== time) setScoreDisplay((score) => score + 4)
        columnFour.forEach(e => currentColorArr[e] = blank)
        return true
      }
    }
  }

  const threeColCh = () => {
    for (let i = 0; i < width * 6; i++) {
      const columnThree = [i, i + width, i + width * 2]
      const colorPick = currentColorArr[i];
      const isBlank = currentColorArr[i] === blank

      if (columnThree.every(e => currentColorArr[e] === colorPick) && !isBlank) {
        if (timing !== time) setScoreDisplay((score) => score + 3)
        columnThree.forEach(e => currentColorArr[e] = blank)
        return true
      }
    }
  }

  const fiveRowCh = () => {
    for (let i = 0; i < width * width; i++) {
      const RowFour = [i, i + 1, i + 2, i + 3, i + 4]
      const prohibit = [4, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31, 36, 37, 38, 39, 44, 45, 46, 47, 52, 53, 54, 55, 60, 61, 62, 63]
      const colorPick = currentColorArr[i]
      const isBlank = currentColorArr[i] === blank

      if (prohibit.includes(i)) continue

      if (RowFour.every(e => currentColorArr[e] === colorPick) && !isBlank) {
        if (timing !== time) setScoreDisplay((score) => score + 5)
        RowFour.forEach(e => currentColorArr[e] = blank)
        return true

      }
    }
  }

  const fourRowCh = () => {
    for (let i = 0; i < width * width; i++) {
      const RowFour = [i, i + 1, i + 2, i + 3]
      const prohibit = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 61, 62, 63]
      const colorPick = currentColorArr[i]
      const isBlank = currentColorArr[i] === blank

      if (prohibit.includes(i)) continue

      if (RowFour.every(e => currentColorArr[e] === colorPick) && !isBlank) {
        if (timing !== time) setScoreDisplay((score) => score + 4)
        RowFour.forEach(e => currentColorArr[e] = blank)
        return true

      }
    }
  }

  const threeRowCh = () => {
    for (let i = 0; i < width * width; i++) {
      const RowThree = [i, i + 1, i + 2]
      const prohibit = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63]
      const colorPick = currentColorArr[i]
      const isBlank = currentColorArr[i] === blank

      if (prohibit.includes(i)) continue

      if (RowThree.every(e => currentColorArr[e] === colorPick) && !isBlank) {
        if (timing !== time) setScoreDisplay((score) => score + 3)
        RowThree.forEach(e => currentColorArr[e] = blank)
        return true

      }
    }
  }
  //************************************ 

  // ใช้จัดบอร์ด -> ทำให้ blank หายไป
  const moveIntoSquareBelow = () => {
    for (let i = 0; i < 64 - width; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && currentColorArr[i] === blank) {
        currentColorArr[i] = candyColor[Math.floor(Math.random() * candyColor.length)]
      }

      if (currentColorArr[i + width] === blank) {
        currentColorArr[i + width] = currentColorArr[i]
        currentColorArr[i] = blank
      }
    }
  }

  // การขยับบล็อก
  const dragStart = (e) => {
    setSquareDrag(e.target)
  }

  const dragDrop = (e) => {
    setSquareReplace(e.target)
  }

  const dragEnd = (e) => {
    const squareBeingDragId = parseInt(squareDrag.getAttribute('data-id'))
    const squareBeingReplaceId = parseInt(squareReplace.getAttribute('data-id'))

    const validMove = [
      squareBeingDragId + 1,
      squareBeingDragId - 1,
      squareBeingDragId + width,
      squareBeingDragId - width
    ]

    const validMoving = validMove.includes(squareBeingReplaceId)

    if (validMoving) {
      currentColorArr[squareBeingReplaceId] = squareDrag.getAttribute('src')
      currentColorArr[squareBeingDragId] = squareReplace.getAttribute('src')
    }

    const isfiveRowCh = fiveRowCh()
    const isfiveColCh = fiveColCh()
    const isfourRowCh = fourRowCh()
    const isfourColCh = fourColCh()
    const isthreeColCh = threeColCh()
    const isthreeRowCh = threeRowCh()
    const checkCon = isfourRowCh || isfourColCh || isthreeColCh || isthreeRowCh || isfiveColCh || isfiveRowCh


    if (checkCon === false) {
      currentColorArr[squareBeingReplaceId] = squareReplace.getAttribute('src')
      currentColorArr[squareBeingDragId] = squareDrag.getAttribute('src')
      setCurrentColorArr([...currentColorArr])
    }

    if (validMoving && squareBeingReplaceId && checkCon) {
      setSquareReplace(null)
      setSquareDrag(null)
      if (timing === time) {
        if (isfiveRowCh || isfiveColCh) setScoreDisplay((score) => score + 5)
        if (isfourRowCh || isfourColCh) setScoreDisplay((score) => score + 4)
        if (isthreeRowCh || isthreeColCh) setScoreDisplay((score) => score + 3)
      }
      setTiming((e) => e - 1)
    } else {
      currentColorArr[squareBeingReplaceId] = squareReplace.getAttribute('src')
      currentColorArr[squareBeingDragId] = squareDrag.getAttribute('src')
      setCurrentColorArr([...currentColorArr])
    }
  }

  const createBoard = () => {
    const randomColorArr = []
    for (let i = 0; i < width * width; i++) {
      const randomColor = candyColor[Math.floor(Math.random() * candyColor.length)]
      randomColorArr.push(randomColor)
    }
    setCurrentColorArr(randomColorArr)
  }

  const Newgame = () => {
    createBoard()
    setScoreDisplay(0)
    setTiming(time)
  }

  const maxScoreCheck = () => {
    if (scoreDisplay > maxScore) {
      setMaxScore(scoreDisplay)
    }
  }

  const checkTime = () => {
    if (timing === 0) {
      Newgame()
    }
  }

  useEffect(() => {
    createBoard()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      checkTime()
      fiveRowCh()
      fiveColCh()
      fourRowCh()
      fourColCh()
      threeColCh()
      threeRowCh()
      moveIntoSquareBelow()
      setCurrentColorArr([...currentColorArr])
      maxScoreCheck()
    }, 100)
    return () => clearInterval(timer)

  }, [threeColCh, currentColorArr, fourRowCh, fourColCh, threeRowCh, moveIntoSquareBelow, fiveColCh, fiveRowCh])


  return (
    <div className='Body'>
      <Container fluid>
        <Row sm={12}>
          <center>
            <Col className='meow' sm={6}>
              <Badge bg="warning" text="white">
                Max: <Score score={maxScore} />
              </Badge>{' '}
              <Badge bg="light" text="dark">
                <Score score={scoreDisplay} /> Your Score:
              </Badge>{' '}
              <Button variant="info text-white" onClick={Newgame}><strong>New Game</strong></Button>{' '}
            </Col>
            <div className="app">
              <Col >
                <div className='game'>
                  {currentColorArr.map((candyColor, index) => (
                    <img
                      key={index}
                      alt={candyColor}
                      src={candyColor}
                      data-id={index}
                      draggable={true}
                      onDragStart={dragStart}
                      onDragOver={(e) => e.preventDefault()}
                      onDragEnter={(e) => e.preventDefault()}
                      onDragLeave={(e) => e.preventDefault()}
                      onDrop={dragDrop}
                      onDragEnd={dragEnd}
                    />
                  ))}
                </div>
              </Col>
            </div>
          </center>
        </Row>
      </Container>
      <div className="time">
        <span>Time: </span>
        <div className='time-board '>{timing} </div>
        <div className='footage'>Copyright © MawinS17</div>
      </div>
    </div>
  );
}

export default App;
