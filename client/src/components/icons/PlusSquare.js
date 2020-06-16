import * as React from 'react'
import Svg, { Rect, Path } from 'react-native-svg'

function SvgPlusSquare(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className=""
      {...props}
    >
      <Rect x={3} y={3} width={18} height={18} rx={2} ry={2} />
      <Path d="M12 8v8M8 12h8" />
    </Svg>
  )
}

export default SvgPlusSquare
