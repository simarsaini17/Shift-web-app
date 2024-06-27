import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";

interface DropDownProps {
  dropDownItems: { key: string; label: string }[];
  handleSelectedDropDown: (key: string) => void;
  selectedCountry: string[];
  className?: string;
}

export const DropDown: React.FC<DropDownProps> = ({
  dropDownItems,
  handleSelectedDropDown,
  selectedCountry,
  className,
}): JSX.Element => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="z-0" color="primary" variant="flat">
          Filter Menu
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Static Actions"
        items={dropDownItems}
        selectionMode="single"
        selectedKeys={selectedCountry}
        onAction={(key) => handleSelectedDropDown(key as string)}
        className="h-80 overflow-auto"
      >
        {(item) => (
          <DropdownItem className={className} key={item.label}>
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};
