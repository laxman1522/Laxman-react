
export interface userDetails {
    isUserLoggedIn: boolean,
    userName: string
  }

export interface button {
  buttonName: string,
  disabled?: boolean,
  className?: string,
  buttonClickHandler: Function,
}
