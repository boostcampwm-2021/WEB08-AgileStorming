import React, { useRef, useState } from 'react';
import { DropdownList, StyledInput, TStyle, Wrapper } from './style';
import { isNumber } from 'utils/form';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onValueChange?: (arg: string | number) => void;
  dropdownStyle?: TStyle;
  items?: Record<string | number, string>;
  margin?: string;
}

const Dropdown: React.FC<IProps> = ({ onValueChange, dropdownStyle = 'normal', items = {}, margin = '0', ...props }) => {
  const activatorRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClickDropdown = () => setIsOpen(!isOpen);
  const handleClickItem = (id: string) => {
    if (activatorRef.current) {
      activatorRef.current.value = items[id];
    }
    if (onValueChange) {
      if (isNumber(id)) {
        onValueChange(Number(id));
      } else {
        onValueChange(id);
      }
    }
    setIsOpen(false);
  };
  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (listRef.current!.contains(target) || activatorRef.current!.contains(target)) {
      return;
    }
    setIsOpen(false);
  };

  React.useEffect(() => {
    if (isOpen) {
      window.addEventListener('click', handleClickOutside);
    } else {
      window.removeEventListener('click', handleClickOutside);
    }
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <Wrapper margin={margin}>
      <StyledInput dropdownStyle={dropdownStyle} onClick={handleClickDropdown} ref={activatorRef} {...props} readOnly={true} />
      <DropdownList dropdownStyle={dropdownStyle} visible={isOpen} ref={listRef}>
        {Object.keys(items).map((id) => (
          <li key={id} onClick={() => handleClickItem(id)}>
            {items[id]}
          </li>
        ))}
      </DropdownList>
    </Wrapper>
  );
};

export default Dropdown;
