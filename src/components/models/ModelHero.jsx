import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function ModelHero(props) {
  const { nodes } = useGLTF('/model/model1-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.mesh_0.geometry} material={nodes.mesh_0.material} />
    </group>
  )
}

useGLTF.preload('/model/model1-transformed.glb')