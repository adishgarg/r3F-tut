import { Canvas, events, useFrame } from '@react-three/fiber'
import './App.css'
import { useRef, useState } from 'react'
import { MeshDistortMaterial, MeshWobbleMaterial, OrbitControls } from '@react-three/drei'

const Cube = ({ color , position}) => { //Create a component of an object (cube)
  const ref = useRef() 
  useFrame((state, delta) => { //useFrame is a hook that runs a function on every frame
    ref.current.rotation.x += delta //rotate the object on the x-axis
    ref.current.rotation.y += delta * 2 //rotate the object on the y-axis
    ref.current.position.y = Math.sin(state.clock.elapsedTime)*2 // move it up and down
  })

  return (
    <mesh position={position} ref={ref}>
      <boxGeometry />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

const Sphere = ({ color, position, size }) => { // Create a component of an object (sphere)
  return (
    <mesh position={position}>
      <sphereGeometry args={size}/>
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

const Torus = ({ color, position, size }) => { // Create a component of an object (torus)
  return (
    <mesh position={position}>
      <torusGeometry args={size}/>
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

const TorusKnot = ({ color, position, size }) => { // Create a component of an object (torus knot)
  const ref = useRef()
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsclicked] = useState(false)
  
  // useFrame((state, delta) => {
  //   const speed = isHovered ? 2 : 0.2
  //   // ref.current.rotation.x += delta * speed
  // })
  
  return (
    <mesh position={position} ref={ref} onPointerEnter={(event) => (event.stopPropagation(), setIsHovered(true))}
    onPointerLeave={() => setIsHovered(false)}
    onClick={() => setIsclicked(!isClicked)}
    scale={isClicked ? 1.5 : 1}
    >
      <torusKnotGeometry args={size}/>
      {/* <meshStandardMaterial color={isHovered? "teal" : "hotpink"} /> */}
      <MeshWobbleMaterial color={color} speed={4} factor={1} />
      {/* <MeshDistortMaterial color={color} speed={4} factor={3} /> */}
    </mesh>
  )
}


const App = () => {
  return (
    <Canvas>
      {/* add lights like this*/}
      <directionalLight position={[0, 0, 2]} />
      <ambientLight />
      {/*form a group of objects like this
      add objects like this*/ }
      {/* <group position={[0,0,0]}>
      <Cube color={"teal"} position={[1,0,0]} /> 
      <Cube color={"hotpink"} position={[-1,0,0]} />
      </group> */}
      {/* <Sphere color={"teal"} position={[1,0,0]} size={[1,30,30]} /> add a sphere */}
      {/* <Torus color={"hotpink"} position={[-1,0,0]} size={[0.8,0.15,30,30]} /> add a torus */}
      <TorusKnot color={"hotpink"} position={[0,0,0]} size={[0.8,0.15,100,20]} /> {/* add a torus knot */}
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

export default App
