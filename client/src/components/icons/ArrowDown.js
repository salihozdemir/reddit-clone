import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function SvgArrowDown(props) {
  return (
    <Svg
      width={22}
      height={22}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className=""
      {...props}
    >
      <Path d="M12 5v14M19 12l-7 7-7-7" />
    </Svg>
  )
}

export default SvgArrowDown
