/// <reference types="vite/client" />

declare module '*.svg?react' {
	import type { FunctionComponent } from 'react';
	const ReactComponent: FunctionComponent<React.SVGProps<SVGSVGElement>>;
	export default ReactComponent;
}

declare module '*.svg' {
	const src: string;
	export default src;
}

declare module '*.png' {
	const content: any;
	export default content;
}

declare module '*.jpg' {
	const content: any;
	export default content;
}

declare module '*.json' {
	const content: any;
	export default content;
}

declare module '*.module.css' {
	const classes: { [key: string]: string };
	export default classes;
}

declare module '*.module.scss' {
	const classes: { [key: string]: string };
	export default classes;
}

declare module '*.module.sass' {
	const classes: { [key: string]: string };
	export default classes;
}
