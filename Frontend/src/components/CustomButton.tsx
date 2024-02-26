import React, { ReactNode, FC, MouseEvent } from "react";

interface CustomButtonProps {
  title: string;
  containerStyles?: string;
  iconRight?: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const CustomButton: FC<CustomButtonProps> = ({title,
                                               containerStyles,
                                               iconRight,
                                               type = "button",
                                               onClick,
                                             }) => {
  return (
      <button
          onClick={onClick}
          type={type}
          className={`inline-flex items-center ${containerStyles || ""}`}
      >
        {title}

        {iconRight && <div className="ml-2">{iconRight}</div>}
      </button>
  );
};

export default CustomButton;
