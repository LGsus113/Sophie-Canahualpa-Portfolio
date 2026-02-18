export interface TitleProps {
  title: string;
}

export interface LayoutProps extends TitleProps {
  description: string;
  clasName: string;
  variant: "default" | "main";
}

interface ListProps {
  label: string;
  href: string;
  image: any;
  target?: string;
}
export interface ItemsProps {
  items: ListProps[];
  vertical?: boolean;
}

export interface ImageCarousel {
  images: { src: string }[];
  selector?: string;
  interval?: number;
  className?: string;
  pauseOnHover? : boolean,
}
