import '../styles/Text.css'

interface ITextComponent {
    text?:string
}

export default function Text(props: ITextComponent) {
    return <span>{props.text}</span>
}
