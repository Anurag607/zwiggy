declare module '*.tsx'
declare module '*.mts'
declare module '*.module.css'
declare module '*.jpg'
declare module '*.png'
declare module '*.webp'
declare module '*.svg' {
    const content: any;
    export default content;
}