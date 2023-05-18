export interface blog {
    blogData: any
    id?: number
    selected?: boolean,
    updateBlogList: any
}

//When a component receives only children in the prop
export type ElementAsChildren = {
    children?: React.ReactNode;
  };

  export interface buttonProps {
    className: string,
    buttonName: string,
    buttonClicked: Function,
  }

  export interface userCard {
    name: string,
    company: string,
    photo: string,
    id: number
  }