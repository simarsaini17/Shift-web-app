import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

interface CardProps {
  children?: React.ReactNode;
  cardHeader?: React.ReactNode;
  className?: string;
  cardBody?: React.ReactNode;
}

export const Cards: React.FC<CardProps> = ({
  className,
  children,
  cardBody,
  cardHeader,
}): JSX.Element => {
  return (
    <div className={`rounded-full shadow-xl w-80 lg:w-full ${className}`}>
      <Card>
        <div className="flex flex-col">
          {cardHeader && (
            <CardHeader className="items-center justify-center">
              {cardHeader}
            </CardHeader>
          )}
          {cardBody && <CardBody className="items-center">{cardBody}</CardBody>}
        </div>
      </Card>
      {children}
    </div>
  );
};
