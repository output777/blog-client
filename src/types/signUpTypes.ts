// export interface InputWithDuplicateCheackProps {
//   id: string;
//   name: string;
//   type: string;
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   onDuplicateCheck: (e: React.MouseEvent<HTMLButtonElement>, field: string, value: string) => void;
//   duplicateStatus: boolean;
//   duplicateMessage: string;
//   placeholder: string;
//   label: string;
// }

export interface InputWithDuplicateCheackProps {
  id: string;
  name: string;
  type: string;
  onDuplicateCheck: (e: React.MouseEvent<HTMLButtonElement>, field: string, value: string) => void;
  duplicateStatus: boolean;
  duplicateMessage: string;
  placeholder: string;
  label: string;
}

export interface DuplicateProp {
  email: boolean;
  nickname: boolean;
}

export interface DuplicateTextProp {
  email: string;
  nickname: string;
}
