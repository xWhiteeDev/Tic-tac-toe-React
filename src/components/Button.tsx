import "../styles/Button.css";

type TButtonType = "NORMAL" | "GAME" | "RESET";

export interface IButtonComponent {
  text?: string;
  onclick?: (...args: any[]) => void;
  key?: string;
  disabled?: boolean;
  type?: TButtonType;
  isWinner?: boolean;
}

export default function MyButton(props: IButtonComponent) {
  return (
    <button
      key={props.key}
      disabled={props.disabled}
      className={`btn-${props.type ? props.type.toLocaleLowerCase() : "normal"}`}
      onClick={props.onclick}
      style={props.isWinner ? {color:'green', borderColor:"green"} : {}}
    >
      {props.text}
    </button>
  );
}
