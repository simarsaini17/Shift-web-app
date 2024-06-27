import { Cards } from "./Cards";

interface ApiPerformanceProps {
  responseTime: number | null;
  statusCode: number | undefined;
}

export const ApiPerformanceTracker = ({
  responseTime,
  statusCode,
}: ApiPerformanceProps) => {
  const createCardHeader = (title: string) => {
    return <div>{title}</div>;
  };
  const createCardBody = (content: React.ReactNode) => {
    return <div>{content}</div>;
  };

  return (
    <div className="flex flex-col gap-y-12">
      <h1 className="text-center">API Performance Tracking</h1>
      <Cards
        cardHeader={createCardHeader("Status Code")}
        cardBody={createCardBody(statusCode)}
        className="items-center"
      />
      <Cards
        cardHeader={createCardHeader("Response Time")}
        cardBody={createCardBody(`${responseTime?.toFixed(2)} ms`)}
      ></Cards>
    </div>
  );
};
