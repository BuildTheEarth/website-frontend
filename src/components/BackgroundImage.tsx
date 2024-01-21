import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';

export default function Background({
	src,
	children,
	...props
}: {
	src: string | StaticImport;
	children?: any;
	[k: string]: any;
}) {
	return (
		<>
			<div
				style={{ position: 'relative', overflow: 'hidden', ...props.rootStyle }}
				onClick={props.onClick}
			>
				<Image
					// {...props} //@ts-ignore
					// rootStyle={undefined}
					alt="Mountains"
					src={src}
					placeholder={typeof src != 'string' || !!props.blurDataURL ? 'blur' : undefined}
					// fill={typeof src == 'string'}
					fill
					sizes="100vw"
					style={{
						objectFit: 'cover',
						width: '100%',
						height: '100%',
						...props.style,
					}}
					blurDataURL={props.blurDataURL}
				/>
				{children}
			</div>
		</>
	);
}
