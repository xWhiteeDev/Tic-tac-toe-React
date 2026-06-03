import '../styles/List.css'

export interface IListMember {
  text: string;
  className: string;
  key: string;
  onClick?: (...args: any) => void;
}

interface IList {
  listMembers: IListMember[];
}

export default function List({ listMembers }: IList) {
  return (
    <ul>
      {listMembers.map((element) => (
        <li
          className={element.className}
          onClick={element.onClick}
          key={element.key}
        >
          {element.text}
        </li>
      ))}
    </ul>
  );
}
