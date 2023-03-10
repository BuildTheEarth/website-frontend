import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Stats } from '@react-three/drei';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Suspense } from 'react';

export const Model = (props: { file: string; options?: any }) => {
	const gltf = useLoader(GLTFLoader, props.file);
	return <primitive object={gltf.scene} scale={0.01} position={[0, 2, 0]} {...props.options} />;
};

const ModelCanvas = (props: { children: any; lightIntensity?: number; stats?: boolean; controls?: boolean }) => {
	return (
		<Canvas className="canvas">
			{props.stats && <Stats />}
			<ambientLight intensity={props.lightIntensity || 0.5} />
			{props.controls && <OrbitControls />}
			<Suspense>{props.children}</Suspense>
		</Canvas>
	);
};
//position={[0, -10, -30]} rotation={[0, 30, 0]}
export default ModelCanvas;
