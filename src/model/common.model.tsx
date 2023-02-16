export interface blog {
    title: string,
    photo: string,
    details: string,
    type: string,
    id?: number
}

//When a component receives only children in the prop
export type ElementAsChildren = {
    children?: React.ReactNode;
  };