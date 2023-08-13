import { useState } from "react";
import { Text } from "@chakra-ui/react";
const Progress = ({ done, votes }) => {
  const [style, setStyle] = useState({});

  setTimeout(() => {
    const newStyle = {
      opacity: 1,
      width: `${done}%`,
    };

    setStyle(newStyle);
  }, 200);

  return (
    <>
      <div className="progress">
        <div className="progress-done" style={style}></div>
      
      <Text justifySelf={"center"} position={'absolute'} left={'25%'} bottom={'-1.8px'}>
        {votes} votes ({isNaN(done)?0:done}%)
      </Text>
	  </div>
    </>
  );
};
export default Progress;
