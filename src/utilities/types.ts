export type HTMLAttributesAndProps<HTML, Props> = Omit<React.HTMLAttributes<HTML>, keyof Props> & Props
