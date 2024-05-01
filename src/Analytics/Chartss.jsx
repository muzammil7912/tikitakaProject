import React, { useEffect, useState } from 'react'
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Chartss = ({datass,typee}) => {
  const [persentage, setPersentage] = useState("")
  useEffect(() => {
 if(datass) {
  setPersentage(datass)
 }
  }, [datass])
  if(!persentage) return "NO Data";
  let target = persentage
  let per = target[`${typee}_percentage`]?.split("%")[0] ?? "0"
  let lossgan = target[`${typee}_percentage_ratio`]?.split("")[0] ?? "+"
  return (
    <div  className='chartt_ relative'>
   <CircularProgressbar
            value={per}
            circleRatio={0.5}
            
            styles={{
              root: {
                transform: "rotate(0.75turn)"
              },
              path: { stroke: "#ED2656" },
              trailColor: "grey",
              backgroundColor: "red"
            }}
          />

          <div className='chartt_Box '>
            <div className="h5">{per}%</div>
            <div className="chartt_Box-" style={{"background": `${lossgan === "+" ? "#007e2e96" : "#ffd6e0"}`,"color":`${lossgan === "+" ? "#003a15" : "#ed2656"}`}}>
            {target[`${typee}_percentage_ratio`] ?? "0"}
            </div>
          </div>
    </div>
  )
}

export default Chartss