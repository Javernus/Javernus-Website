declare module '*.scss'

declare module '*.module.scss' {
  interface IClassNames {
    [className: string]: string
  }

  const classNames: IClassNames

  export = classNames
}
