export interface SignUpNewUserProps {
  email: string;
  nickname: string;
  password: string;
}

export interface DuplicateDataProps {
  field: string;
  value: string;
}

export interface SignInUserProps {
  email: string;
  password: string;
}
