import teasers from "../components/Teasers/teasers"

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

export interface customInput {
  type: string,
  placeholder?: string,
  ref?: any,
  maxLength?: number ,
  onKeyUp?: any,
  onKeyDown?: any,
  className?: string ,
  name?: string
}

export interface teaser {
  title: string,
  videoSrc: string,
  key?: string
}

export interface teaserDetails {
  teaser: teaser,
  className?: string,
  startedPlaying: Function,
  message: string,
  timer: number | string
  showAd: boolean,
  showAdImage: boolean,
  showingAd: Function
}

export interface movieList {
  updatedMovie: any
}

export interface movieDetails {
  timer : number,
  message: string,
  startedPlaying?: any,
  showAd: boolean, 
  showAdImage: boolean, 
  showingAd?:any,
  updateLikes: any
}

export interface movieCard {
  movieDetails: {
    movie: string,
    link: string
  },
  likes: string,
  updateMovie?:any
}

export interface errorBoundaryState {
  hasError: boolean
}

export interface lotteryProps {
  errorOccured: Function,
  error: boolean,
}