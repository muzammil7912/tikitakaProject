import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonLoader = ({valuee}) => {
  return (
    <SkeletonTheme baseColor="#ddd" highlightColor="#eee">
    <p>
      <Skeleton count={valuee ?? 5} />
    </p>
  </SkeletonTheme>
  )
}

export default SkeletonLoader