import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Column } from "@/utils/types";

export interface RenderCellFunction<T> {
  (item: T, columnKey: string): React.ReactNode;
}

export interface TableProps<T> {
  columns: Column[];
  rowsData: T[] | undefined;
  renderCell: RenderCellFunction<T>;
}

const DataTable = <T extends { name: string }, _>({
  columns,
  rowsData,
  renderCell,
}: TableProps<T>): JSX.Element => {
  return (
    <Table isStriped aria-label="Collges table with their info">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody
        items={rowsData}
        emptyContent={rowsData?.length === 0 && "No Data To Display"}
      >
        {(item: T) => (
          <TableRow key={item.name}>
            {(columnKey: any) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
export default DataTable;
