// 这里包含所有插件导出的函数及变量声明，声明的函数会在类型标注中标注到core上

type Ref<T> = {
    value: T;
};

type DragFn = (x: number, y: number, e: MouseEvent | TouchEvent) => void;

type CanParseCss = keyof {
    [P in keyof CSSStyleDeclaration as CSSStyleDeclaration[P] extends string
        ? P extends string
            ? P
            : never
        : never]: CSSStyleDeclaration[P];
};

interface PluginDeclaration {}

type Forward<T> = {
    [K in keyof T as T[K] extends Function
        ? K extends `_${string}`
            ? never
            : K
        : never]: T[K];
};

type ForwardKeys<T> = keyof Forward<T>;

declare const Mota: import('../index.d.ts').IMota;
interface Window {
    Mota: import('../index.d.ts').IMota;
}