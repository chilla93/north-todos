import { BoxProps } from "@material-ui/core";

export interface IBaseProps extends React.Props<BoxProps> {
    children?: React.ReactNode;
    key?: string;
    className?: string;
}

